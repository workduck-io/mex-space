import '@tensorflow/tfjs-backend-wasm'

import { setBackend } from '@tensorflow/tfjs'
import { load, UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder'
//@ts-ignore
import sim from 'compute-cosine-similarity'

import { VectorEmbedding } from './types'

export class SemanticX {
  private documents: Record<string, VectorEmbedding>
  private model: UniversalSentenceEncoder

  async init() {
    this.documents = {}
    await setBackend('wasm')
    this.model = await load()
  }

  async addDocument(id: string, content: string, metadata?: Record<string, any>) {
    if (content) {
      const embedding = (await (await this.model.embed([content])).array())[0]
      this.documents[id] = {
        id,
        embedding,
        metadata
      }
    }
  }

  removeDoc(id: string) {
    delete this.documents[id]
  }

  async search(content: string, n = 5, condition?: (data?: Record<string, any>) => boolean) {
    const q = new Array(n)
    let lowestScore = 0
    let initialItemCount = 0
    const item = (await this.model.embed([content])).arraySync()[0]
    Object.values(this.documents).forEach((e, i) => {
      if (e.id && (!condition || condition(e.metadata))) {
        const simScore = sim(e.embedding, item)
        if (simScore < 0.25) return //minimum thershold for similarity
        if (initialItemCount < n) {
          q[initialItemCount++] = { id: e.id, score: simScore }
          return
        }
        lowestScore = q.sort()[0].score
        if (lowestScore < simScore) {
          q[0] = { id: e.id, score: simScore }
          let newLowest = 1 //Highest possible cosine similarity value
          q.forEach((item, i) => {
            if (newLowest > item['score']) {
              newLowest = item['score']
            }
          })
          lowestScore = newLowest
        }
      }
    })
    return q
  }
}
