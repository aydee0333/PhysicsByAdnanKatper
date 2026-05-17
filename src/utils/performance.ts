export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  const mem = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 2;
  return mem < 4 || cores < 4;
}

export function getAnimationQuality(): 'high' | 'low' {
  return isLowEndDevice() ? 'low' : 'high';
}