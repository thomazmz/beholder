import { useMemo, useEffect, useCallback } from 'react'
import { useFormValidation } from '../useFormValidation'
import { Input, InputOf } from '../useInput'
import { Form, FormHandler } from '../useForm'
import { useDictionary } from '../useDictionary/useDictionary'

export const useForm = <T>(
  onFormChange?: FormHandler,
  initialInputs?: InputOf<T>[]
) => {

  const { dictionary, add, remove, reset } = useDictionary<Input<T[keyof T]>>('key', initialInputs)

  const inputs = useMemo(() => Object.values(dictionary) as Form<T>, [dictionary])

  const validate = useFormValidation(inputs)

  const resolve = useCallback(() => {
    return inputs.reduce((accumulator, input) => ({
      ...accumulator, [input.key]: input.value
    }), {})
  }, [inputs])

  useEffect(() => {
    if(onFormChange) onFormChange(inputs)
  }, [inputs, onFormChange])

  return { inputs, add, resolve, validate, reset, remove } 

}