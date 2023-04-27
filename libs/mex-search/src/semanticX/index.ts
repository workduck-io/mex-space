import '@tensorflow/tfjs'

import * as use from '@tensorflow-models/universal-sentence-encoder'
import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder'
//@ts-ignore
import sim from 'compute-cosine-similarity'

import { VectorEmbedding } from './types'

export class SemanticX {
  private documents: Record<string, VectorEmbedding>
  private model: UniversalSentenceEncoder

  async init() {
    this.documents = {}
    this.model = await use.load()
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

  async search(content: string, n = 3, condition?: (data?: Record<string, any>) => boolean) {
    const q = new Array<Record<string, any>>(n).fill({ id: '', score: 0 })
    let lowestScore = 0
    let lowestScoreIndex = 0
    const item = (await this.model.embed([content])).arraySync()[0]
    Object.values(this.documents).forEach((e) => {
      if (e.id && (!condition || condition(e.metadata))) {
        const simScore = sim(e.embedding, item)
        if (simScore < 0.4) return //minimum thershold for similarity
        if (lowestScore < simScore) {
          q[lowestScoreIndex] = { id: e.id, score: simScore }
          let newLowest = 1 //Highest possible cosine similarity value
          q.forEach((item, i) => {
            if (newLowest > item['score']) {
              newLowest = item['score']
              lowestScoreIndex = i
            }
          })
          lowestScore = newLowest
          console.log(q, lowestScore, lowestScoreIndex)
        }
      }
    })
    return q
  }
}
