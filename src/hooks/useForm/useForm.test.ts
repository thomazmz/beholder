import { FormHandler } from './types'
import { InputOf } from '../useInput'
import { useForm } from './useForm'
import { renderHook, act } from '@testing-library/react-hooks'

describe('useInputDataMounter', () => {

  const formHandler = jest.fn() as FormHandler

  const someName = 'someName'
  const someAge = 15

  type FormType = {
    name: string,
    age: number
  }

  const someInput: InputOf<FormType> =  {
    key: 'name',
    value: someName,
    isValid: true
  }

  const anotherInput: InputOf<FormType> = {
    key: 'age',
    value: someAge,
    isValid: false,
    message: 'someMessage'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize inputFormData with given array of inputData', () => {
    const { result } = renderHook(() => useForm<FormType>(formHandler, [someInput, anotherInput]))
    expect(result.current.inputs).toEqual([someInput, anotherInput])
  })

  it('should add input into array of values', () => {
    const { result } = renderHook(() => useForm<FormType>())
    act(() => result.current.add(someInput))
    expect(result.current.inputs.includes(someInput)).toBe(true)
  })

  it('should call formHandler after add input into array of values', () => {
    const { result } = renderHook(() => useForm<FormType>(formHandler))
    act(() => result.current.add(someInput))
    expect(formHandler).toHaveBeenCalled()
  })

  it('should validate data', () => {
    const { result } = renderHook(() => useForm<FormType>())

    act(() => result.current.add(someInput))
    expect(result.current.validate()).toBe(true)

    act(() => result.current.add(anotherInput))
    expect(result.current.validate()).toBe(false)
  })

  it('should resolve form into object', () => {
    const { result } = renderHook(() => useForm<FormType>())
    act(() => result.current.add(someInput))
    expect(result.current.resolve()).toEqual({
      name: someName,
    })
    act(() => result.current.add(anotherInput))
    expect(result.current.resolve()).toEqual({
      name: someName,
      age: someAge
    })
  })
})