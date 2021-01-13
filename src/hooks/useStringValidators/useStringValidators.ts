import { useCallback } from 'react';
import { StringValidator, StringValidationHandler } from './types'

export const useStringValidators = <T>(
  validators?: StringValidator<T>[]
): StringValidationHandler<T> => {
  return useCallback((value): [boolean, string?] => {
    if(!validators) return [true]

    return validators
      .map(validator => validator(value))
      .find(result => !result[0]) || [true]
  }, [validators])
}