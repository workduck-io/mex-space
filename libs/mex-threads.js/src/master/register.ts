import { Worker as WorkerImplementation } from './index'

;(window as any).Worker = WorkerImplementation
