import { singleString } from './singleString'

describe('singleString validator', () => {

  it('should return true and no validation message if given value is single string', async() => {
    const someValueToBeValidated = 'someSingleString'
  
    const [ isSomeValueValid, someValidationMessage ] = singleString(someValueToBeValidated);

    expect(isSomeValueValid).toBe(true);
    expect(someValidationMessage).not.toBeDefined();
  });

  it('should return false and validation message if given value is not a single string', async() => {
    const someValueToBeValidated = 'some not single string'
  
    const [ isSomeValueValid, someValidationMessage ] = singleString(someValueToBeValidated);

    expect(isSomeValueValid).toBe(false);
    expect(someValidationMessage).toBeDefined();
  });

  it('should return true and no validation message if given value is a not trimmed single string', async() => {
    const someValueToBeValidated = ' someNotTrimmedSingleString '
  
    const [ isSomeValueValid, someValidationMessage ] = singleString(someValueToBeValidated);

    expect(isSomeValueValid).toBe(true);
    expect(someValidationMessage).not.toBeDefined();
  });

  it('should return true and not validation message in case given value is undefined', async() => {
    const someValueToBeValidated = undefined;
  
    const [ isValid, validationMessage ] = singleString(someValueToBeValidated);

    expect(isValid).toBe(true);
    expect(validationMessage).not.toBeDefined();
  });
});