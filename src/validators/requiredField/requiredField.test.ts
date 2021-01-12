import { requiredField } from './requiredField'

describe('requiredField validator', () => {

  it('should return true and no validation message if given value is present', async() => {
    const someValueToBeValidated = '12345'
    const anotherValueToBeValidated = 1000
  
    const [ isSomeValueValid, someValidationMessage ] = requiredField(someValueToBeValidated);

    expect(isSomeValueValid).toBe(true);
    expect(someValidationMessage).not.toBeDefined();

    const [ isAnotherValueValid, anotherValidationMessage ] = requiredField(anotherValueToBeValidated);

    expect(isAnotherValueValid).toBe(true);
    expect(anotherValidationMessage).not.toBeDefined();
  });

  it('should return false and no validation message if given value is not present', async() => {
    const someValueToBeValidated = '';
  
    const [ isSomeValueValid, someValidationMessage ] = requiredField(someValueToBeValidated);

    expect(isSomeValueValid).toBe(false);
    expect(someValidationMessage).toBeDefined();
  });

  it('should return false and validation message in case given value is undefined', async() => {
    const someValueToBeValidated = undefined;
  
    const [ isValid, validationMessage ] = requiredField(someValueToBeValidated);

    expect(isValid).toBe(false);
    expect(validationMessage).toBeDefined();
  });
});