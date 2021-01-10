import { ValidatorFactory } from '../../types'

export const maxSizeOf: ValidatorFactory<string> = (length: number, ) => {
  return (value: any) => {
    if(value && value.length > length) {
      return [false, `No more than ${length} characters allowed`]
    }
    return [true]
  }
}