import { useDictionary } from './useDictionary';
import { renderHook, act } from '@testing-library/react-hooks/dom';

describe('useInputDataMounter', () => {

  type TestType = {
    name: string
    lastName: string,
    age: number
  }

  const someInstanceOfTestType: TestType = {
    name: 'someName',
    lastName: 'someLastName',
    age: 10
  }

  const anotherInstanceOfTestType: TestType = {
    name: 'anotherName',
    lastName: 'anotherLastName',
    age: 11
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize empty dictionary', () => {
    const { result } = renderHook(() => useDictionary<TestType>('name'))
    expect(result.current.dictionary).toEqual({});
  })

  it('should be initialized with an array of values', () => {
    const initialValues = [someInstanceOfTestType, anotherInstanceOfTestType]
    const { result } = renderHook(() => useDictionary<TestType>('name', initialValues))
    expect(result.current.dictionary).toEqual({
      someName: someInstanceOfTestType,
      anotherName: anotherInstanceOfTestType
    });
  })

  it('should be initialized with an object representation of the dictionary', () => {
    const initialValues = { someName: someInstanceOfTestType, anotherName: anotherInstanceOfTestType }
    const { result } = renderHook(() => useDictionary<TestType>('name', initialValues))
    expect(result.current.dictionary).toEqual({
      someName: someInstanceOfTestType,
      anotherName: anotherInstanceOfTestType
    });
  })

  it('should add value into dictionary using initialization key', () => {
    const { result } = renderHook(() => useDictionary<TestType>('name'))
    act(() => result.current.add(someInstanceOfTestType))
    expect(result.current.dictionary).toEqual({[someInstanceOfTestType.name]: someInstanceOfTestType })
  })

  it('should clear all the values on the dictionary', () => {
    const { result } = renderHook(() => useDictionary<TestType>('name'))
    act(() => result.current.add(someInstanceOfTestType))
    act(() => result.current.reset())
    expect(result.current.dictionary).toEqual({});
  })

  it('should remove value from dictionary', () => {
    const { result } = renderHook(() => useDictionary<TestType>('name'))
    act(() => result.current.add(someInstanceOfTestType))
    act(() => result.current.add(anotherInstanceOfTestType))
    act(() => result.current.remove(someInstanceOfTestType.name))
    expect(result.current.dictionary).toEqual({
      [anotherInstanceOfTestType.name]: anotherInstanceOfTestType
    })
  })
})