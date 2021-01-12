import { Validator } from '../../types'

export const requiredField: Validator<any> = (value: any) => {
  if(!value) {
    return [false, `Required field`]
  }
  return [true]
}