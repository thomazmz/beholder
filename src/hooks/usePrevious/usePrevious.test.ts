import { renderHook } from '@testing-library/react-hooks'
import { usePrevious } from './usePrevious'

describe('usePrevious', () => {

  const initialValue = 1

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return previous value as undefined', () => {
    const { result } = renderHook(() => usePrevious<number>(initialValue));
    expect(result.current).toBe(undefined);
  })
}) 