import { Validator } from '../../types';

export const singleString: Validator<string> = (value) => {
  if(value && value.trim().split(" ").length > 1) {
    return [false, `Space characters are not allowed`];
  }
  return [true];
}