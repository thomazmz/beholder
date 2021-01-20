import { useCallback } from 'react'
import { Validator, useValidators } from '../useValidators'
import { InputResolver } from './types'

export const useInputResolver = <T>(
  validators?: Validator<T>[]
): InputResolver<T> => {

  const inputValidationHandler = useValidators<T>(validators)

  const mountInputData = useCallback((key: string, value?: T) => {
    const [ isValid, message ] = inputValidationHandler(value)
    return { key, value, isValid, message }
  }, [inputValidationHandler])

  return mountInputData
}