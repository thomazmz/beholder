import { InputOf } from '../useInput'

export type Form<T> = InputOf<T>[]

export type FormHandler = (form: Form<any>) => void