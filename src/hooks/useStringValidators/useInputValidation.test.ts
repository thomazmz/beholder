import { renderHook } from '@testing-library/react-hooks'
import { useStringValidators } from './useStringValidators'
import { StringValidator } from './types'

describe('useStringValidators', () => {

  const someValue = 'someValue';
  const validationMessage = 'someMessage';

  const someValidator = jest.fn() as jest.MockedFunction<StringValidator<string>>;
  const anotherValidator = jest.fn() as jest.MockedFunction<StringValidator<string>>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a function', () => {
    const { result } = renderHook(() => useStringValidators<string>());
    expect(typeof result.current).toBe('function');
  })

  it('should return true and undefined validation message if no validator function is passed', () => {
    const { result } = renderHook(() => useStringValidators<string>());
    expect(result.current(someValue)).toEqual([true]);
  })

  it('should return false if the validation function return false', () => {
    someValidator.mockReturnValue([false]);

    const { result } = renderHook(() => useStringValidators<string>([someValidator]));
    expect(result.current(someValue)).toEqual([false]);
  })

  it('should return true and validation message if the validation function return fase', () => {
    someValidator.mockReturnValue([false, validationMessage]);

    const { result } = renderHook(() => useStringValidators<string>([someValidator]));
    expect(result.current(someValue)).toEqual([false, validationMessage]);
  })

  it('should return false if one of many validator functions return false', () => {
    someValidator.mockReturnValue([false]);
    anotherValidator.mockReturnValue([true]);

    const { result } = renderHook(() => useStringValidators<string>([someValidator, anotherValidator]));
    expect(result.current(someValue)).toEqual([false]);
  })

  it('should return true if one of all validator functions return true', () => {
    someValidator.mockReturnValue([true]);
    anotherValidator.mockReturnValue([true]);

    const { result } = renderHook(() => useStringValidators<string>([someValidator, anotherValidator]));
    expect(result.current(someValue)).toEqual([true]);
  })

  it('should return first validation message when many validator functions return false', () => {
    someValidator.mockReturnValue([false, validationMessage]);
    anotherValidator.mockReturnValue([false, 'anotherMessage']);

    const { result } = renderHook(() => useStringValidators<string>([someValidator, anotherValidator]));
    expect(result.current(someValue)).toEqual([false, validationMessage]);
  });
}) 