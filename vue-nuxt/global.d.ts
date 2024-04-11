export {}

declare global {
  interface Window {
    abp: any,
    DateTime: any 
  }

  interface NuxtBus {
    $bus: emitter,
    $emit(event: string, payload?: any): void;
    $on(event: string, callback: Function): void;
  }
}