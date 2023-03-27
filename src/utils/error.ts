/* eslint-disable no-redeclare */
import { isString } from './types'

class ZthError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'ZthError'
  }
}

export function throwError(scope: string, m: string): never {
  throw new ZthError(`[${scope}] ${m}`)
}

export function debugWarn(err: Error): void
export function debugWarn(scope: string, message: string): void
export function debugWarn(scope: string | Error, message?: string): void {
  if (import.meta.env.NODE_ENV !== 'production') {
    const error: Error = isString(scope) ? new ZthError(`[${scope}] ${message}`) : scope
    // eslint-disable-next-line no-console
    console.warn(error)
  }
}
