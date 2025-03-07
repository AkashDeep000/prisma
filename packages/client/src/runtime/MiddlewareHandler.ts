import type { Action } from './getPrismaClient'
import type { Document } from './query'

export type QueryMiddleware = (
  params: QueryMiddlewareParams,
  next: (params: QueryMiddlewareParams) => Promise<unknown>,
) => Promise<unknown>

export type QueryMiddlewareParams = {
  /** The model this is executed on */
  model?: string
  /** The action that is being handled */
  action: Action
  /** TODO what is this */
  dataPath: string[]
  /** TODO what is this */
  runInTransaction: boolean
  /** TODO what is this */
  args: any // TODO remove any, does this make sense, what is args?
}

export type Namespace = 'all' | 'engine'

export class MiddlewareHandler<M extends Function> {
  private _middlewares: M[] = []

  use(middleware: M) {
    this._middlewares.push(middleware)
  }

  get(id: number): M | undefined {
    return this._middlewares[id]
  }

  has(id: number) {
    return !!this._middlewares[id]
  }

  length() {
    return this._middlewares.length
  }
}
