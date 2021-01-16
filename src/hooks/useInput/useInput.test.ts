import { useInput } from './useInput';
import { renderHook } from '@testing-library/react-hooks';
import { Input, InputHandler } from './types';
import { StringValidator } from '../useStringValidators'
import { act } from 'react-dom/test-utils';

describe('useInputDataMounter', () => {

  const someKey = 'someKey';
  const someValue = 'someValue'
  const someMessage = 'someMessage';

  const someInputData: Input<string> = { 
    key: someKey,
    value: someValue,
    isValid: false,
    message: someMessage
  }

  const inputDataHandler = jest.fn() as InputHandler<string>;
  const someValidator = jest.fn() as jest.MockedFunction<StringValidator>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call onInputDataChange on initialization with inputData', () => {
    someValidator.mockReturnValue([false, someMessage])
    renderHook(() => useInput<string>(someKey, someValue, [someValidator], inputDataHandler));
    expect(inputDataHandler).toHaveBeenCalledWith(someInputData);
  });

  it('setValue function should call onInputDataChange with given value', () => {
    someValidator.mockReturnValue([false, someMessage])
    const { result } = renderHook(() => useInput<string>(someKey, someValue, [someValidator], inputDataHandler));
    const [ , setValue ] = result.current;
    act(() => setValue('anotherValue'));
    expect(inputDataHandler).toHaveBeenCalledWith({ ...someInputData, ...{ value: 'anotherValue' } });
  });
});