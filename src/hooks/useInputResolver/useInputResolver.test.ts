import { renderHook } from '@testing-library/react-hooks'
import { useInputResolver } from './useInputResolver'
import { Validator } from '../useValidators'

describe('useInputResolver', () => {

  const someKey = 'someKey';
  const someValue = 'someValue';
  const someMessage = 'someMessage';

  const someValidator = jest.fn() as jest.MockedFunction<Validator<string>>;
  const anotherValidator = jest.fn() as jest.MockedFunction<Validator<string>>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return given key and value', () => {
    const { result } = renderHook(() => useInputResolver<string>());
    const { key, value } = result.current(someKey, someValue);
    expect(key).toBe(someKey);
    expect(value).toBe(someValue);
  });

  it('should return isValid as true and message as undefined when validators are not passed', () => {
    const { result } = renderHook(() => useInputResolver<string>());
    const { isValid, message } = result.current(someKey, someValue);
    expect(isValid).toBe(true);
    expect(message).toBe(undefined);
  });

  it('should return isValid false if some validator returns false', () => {
    someValidator.mockReturnValue([true]);
    someValidator.mockReturnValue([false, someMessage]);

    const { result } = renderHook(() => useInputResolver<string>([someValidator, anotherValidator]));
    expect(result.current(someKey, someValue).isValid).toEqual(false);
  });

  it('should return isValid true if all validators returns true', () => {
    someValidator.mockReturnValue([true]);
    anotherValidator.mockReturnValue([true]);
    const { result } = renderHook(() => useInputResolver<string>([someValidator, anotherValidator]));
    expect(result.current(someKey, someValue).isValid).toEqual(true);
  });

  it('should return message accordingly to validators return', () => {
    const someValidator = jest.fn() as jest.MockedFunction<Validator<string>>;
    someValidator.mockReturnValue([false, someMessage]);
    const { result } = renderHook(() => useInputResolver<string>([someValidator]));
    expect(result.current(someKey, someValue).message).toEqual(someMessage);
  });
});