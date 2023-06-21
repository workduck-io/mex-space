import '@tensorflow/tfjs-backend-wasm'

import * as tf from '@tensorflow/tfjs'
import { load, UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder'
import * as Hora from 'horajs/pkg/horajs'

import { VectorEmbedding } from './types'

export class SemanticX {
  private documents: Record<string, VectorEmbedding>
  private model: UniversalSentenceEncoder
  private dimension = 512
  private bruteForceIndex: Hora.HNSWIndexUsize
  private documentIndex = 0

  async init() {
    this.documents = {}
    await tf.setBackend('webgl').then(async (res) => {
      if (res) this.model = await load()
    })
    await Hora.default()
    Hora.init_env()
    this.bruteForceIndex = Hora.HNSWIndexUsize.new(this.dimension, 1000000, 32, 64, 20, 16, false)
  }

  async addDocument(id: string, content: string, metadata?: Record<string, any>) {
    if (content) {
      const embedding = (await (await this.model.embed([content])).array())[0]
      const idx = this.documentIndex++
      this.documents[idx] = {
        id,
        metadata
      }
      this.bruteForceIndex.add(new Float32Array(embedding), idx)
    }
  }

  removeDoc(id: string) {
    delete this.documents[id]
  }

  async searchDoc(content: string, n = 5, condition?: (data?: Record<string, any>) => boolean) {
    this.bruteForceIndex.build('euclidean')
    const item = (await this.model.embed([content])).arraySync()[0]
    const results = this.bruteForceIndex.search(new Float32Array(item), n)
    const search: any[] = []
    results.map((item) => search.push(this.documents[item]))
    return search
  }
}
