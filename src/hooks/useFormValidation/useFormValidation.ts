import { useCallback } from 'react';
import { FormValidatorFactory, Form } from '../../types'

export const useFormValidation: FormValidatorFactory = (form: Form<any>) => {
  return useCallback(() => {
    return !form.some(input => !input.isValid)
  }, [form])
}