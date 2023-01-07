import { mog } from '../utils'
import { Worker as WorkerImplementation } from './index'
;(window as any).Worker = WorkerImplementation

if (!('SharedWorker' in globalThis)) {
  mog('Could not find SharedWorker; Polyfilling SharedWorker with WebWorker')
  ;(window.SharedWorker as any) = WorkerImplementation
}
