type UnsubscribeFn = () => void

export interface AbstractedWorkerAPI {
  isWorkerRuntime(): boolean
  postMessageToMaster(message: any): void
  subscribeToMasterMessages(onMessage: (data: any) => void, e?: MessagePort): UnsubscribeFn
}

export type WorkerFunction = ((...args: any[]) => any) | (() => any)

export type WorkerModule<Keys extends string> = {
  [key in Keys]: WorkerFunction
}
