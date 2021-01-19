export type Input<T> = {
  key: string
  value?: T
  isValid?: boolean
  message?: string
}

export type InputOf<T> = Input<T[keyof T]> & {
  [K in keyof T]: {
    key: K
    value: T[K]
  } 
}[keyof T]

export type InputHandler = <T>(input: Input<T>) => void