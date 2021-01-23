import { useFormValidation } from './useFormValidation';
import { renderHook } from '@testing-library/react-hooks';
import { Form } from './types'
import { Input } from '../useInput'

describe('useInputDataMounter', () => {

  const someInvalidInputData: Input<string> = {
    key: 'name',
    value: 'someName',
    isValid: false,
    message: 'someMessage'
  }

  const someValidInputData: Input<number> = {
    key: 'age',
    value: 10,
    isValid: true,
    message: undefined
  }

  const anotherValidInputData: Input<string[]> = {
    key: 'friends',
    value: ['john', 'mary'],
    isValid: true,
    message: undefined
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false in case some input is not valid', () => {
    const form = [someInvalidInputData, someValidInputData] as Form<any>
    const { result } = renderHook(() => useFormValidation(form));
    const validate = result.current;
    const isValid = validate();
    expect(isValid).toBe(false);
  });

  it('should return true in case all inputs are valid', () => {
    const form = [someValidInputData, anotherValidInputData] as Form<any>
    const { result } = renderHook(() => useFormValidation(form));
    const validate = result.current;
    const isValid = validate();
    expect(isValid).toBe(true);
  });
});