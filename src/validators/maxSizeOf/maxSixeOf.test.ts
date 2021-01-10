import { maxSizeOf } from './maxSixeOf'

describe('maxSizeOf validator', () => {

  it('should return true and no validation message if given value is within the size limite', async() => {
    const maxSize = 5
    const valueToBeValidated = '12345'
  
    const validate = maxSizeOf(maxSize)
    const [ isValid, validationMessage ] = validate(valueToBeValidated)

    expect(isValid).toBe(true)
    expect(validationMessage).not.toBeDefined()
  })

  it('should return false and validation message if given value exceeds size limite', async() => {
    const maxSize = 5
    const valueToBeValidated = '123456'
  
    const validate = maxSizeOf(maxSize)
    const [ isValid, validationMessage ] = validate(valueToBeValidated)

    expect(isValid).toBe(false)
    expect(validationMessage).toBeDefined()
  })

  it('should return true and undefined in case given value is undefined', async() => {
    const maxSize = 5
    const valueToBeValidated = undefined
  
    const validate = maxSizeOf(maxSize)
    const [ isValid, validationMessage ] = validate(valueToBeValidated)

    expect(isValid).toBe(true)
    expect(validationMessage).not.toBeDefined()
  })
})