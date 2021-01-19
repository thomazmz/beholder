import { useState, useEffect, useCallback } from 'react'
import { InputHandler, Input } from '../useInput'
import { Validator } from '../useValidators'
import { useInputResolver } from '../useInputResolver'

export const useInput = <T>(
  key: string,
  value?: T,
  validators?: Validator<T>[],
  inputDataHandler?: InputHandler
): [ Input<T>, (value: T | undefined) => void ] => {

  const resolveInputData = useInputResolver<T>(validators)
  const [input, setInput] = useState<Input<T>>(resolveInputData(key, value))

  const setValue = useCallback((newValue?: T | undefined) => {
    setInput(resolveInputData(key, newValue))
  }, [resolveInputData, key])

  useEffect(() => {
    if(inputDataHandler) inputDataHandler(input)
  }, [input, inputDataHandler])

  return [ input, setValue ];
}