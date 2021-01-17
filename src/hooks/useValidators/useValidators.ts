import { useCallback } from 'react';
import { Validator, ValidationHandler } from './types'

export const useValidators = <T>(
  validators?: Validator<T>[]
): ValidationHandler<T> => {
  return useCallback((value): [boolean, string?] => {
    if(!validators) return [true]

    return validators
      .map(validator => validator(value))
      .find(result => !result[0]) || [true]
  }, [validators])
}