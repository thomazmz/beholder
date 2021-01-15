export type InputHandler<T> = (input: Input<T>) => void

export type Input<T> = {
  key: string
  value?: T
  isValid?: boolean
  message?: string
}
