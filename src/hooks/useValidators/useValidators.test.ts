import { renderHook } from '@testing-library/react-hooks'
import { useValidators } from './useValidators'
import { Validator } from './types'

describe('useValidator', () => {

  const someValue = 'someValue';
  const validationMessage = 'someMessage';

  const someValidator = jest.fn() as jest.MockedFunction<Validator<string>>;
  const anotherValidator = jest.fn() as jest.MockedFunction<Validator<string>>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a function', () => {
    const { result } = renderHook(() => useValidators());
    expect(typeof result.current).toBe('function');
  })

  it('should return true and undefined validation message if no validator function is passed', () => {
    const { result } = renderHook(() => useValidators());
    expect(result.current(someValue)).toEqual([true]);
  })

  it('should return false if the validation function return false', () => {
    someValidator.mockReturnValue([false]);

    const { result } = renderHook(() => useValidators([someValidator]));
    expect(result.current(someValue)).toEqual([false]);
  })

  it('should return true and validation message if the validation function return fase', () => {
    someValidator.mockReturnValue([false, validationMessage]);

    const { result } = renderHook(() => useValidators([someValidator]));
    expect(result.current(someValue)).toEqual([false, validationMessage]);
  })

  it('should return false if one of many validator functions return false', () => {
    someValidator.mockReturnValue([false]);
    anotherValidator.mockReturnValue([true]);

    const { result } = renderHook(() => useValidators([someValidator, anotherValidator]));
    expect(result.current(someValue)).toEqual([false]);
  })

  it('should return true if one of all validator functions return true', () => {
    someValidator.mockReturnValue([true]);
    anotherValidator.mockReturnValue([true]);

    const { result } = renderHook(() => useValidators([someValidator, anotherValidator]));
    expect(result.current(someValue)).toEqual([true]);
  })

  it('should return first validation message when many validator functions return false', () => {
    someValidator.mockReturnValue([false, validationMessage]);
    anotherValidator.mockReturnValue([false, 'anotherMessage']);

    const { result } = renderHook(() => useValidators([someValidator, anotherValidator]));
    expect(result.current(someValue)).toEqual([false, validationMessage]);
  });
}) 