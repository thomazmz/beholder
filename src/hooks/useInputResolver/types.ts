import { Input } from '../useInput'

export type InputResolver<T> = (key: string, value?: T) => Input<T>