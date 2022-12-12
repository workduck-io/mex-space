/// <reference lib="dom" />
import { AbstractedWorkerAPI } from '../types/worker'

interface WorkerGlobalScope {
  addEventListener(eventName: string, listener: (event: Event) => void): void
  postMessage(message: any): void
  removeEventListener(eventName: string, listener: (event: Event) => void): void
  porter?: WorkerGlobalScope & { start?: () => void }
}

declare const self: WorkerGlobalScope

const isWorkerRuntime: AbstractedWorkerAPI['isWorkerRuntime'] = function isWorkerRuntime() {
  const isWindowContext = typeof self !== 'undefined' && typeof Window !== 'undefined' && self instanceof Window
  return typeof self !== 'undefined' && !isWindowContext ? true : false
}

const postMessageToMaster: AbstractedWorkerAPI['postMessageToMaster'] = function postMessageToMaster(data) {
  const porter = self.porter

  console.log('Trying to send a message: ', { data, porter })
  porter?.postMessage(data)
}

const subscribeToMasterMessages: AbstractedWorkerAPI['subscribeToMasterMessages'] = function subscribeToMasterMessages(
  onMessage,
  port?: MessagePort
) {
  const messageHandler = (messageEvent: MessageEvent) => {
    onMessage(messageEvent.data)
  }

  if (port) {
    self.porter = port
    console.log('Subscribing to master messages; Inside of a shared worker')
    port.addEventListener('message', messageHandler as EventListener)
    port.start()
  } else {
    console.log('Subscribing to master messages; Inside of a normal worker')
    self.addEventListener('message', messageHandler as EventListener)
    self.porter = self
  }

  const unsubscribe = () => {
    self.porter?.removeEventListener('message', messageHandler as EventListener)
  }

  return unsubscribe
}

export default {
  isWorkerRuntime,
  postMessageToMaster,
  subscribeToMasterMessages
}
