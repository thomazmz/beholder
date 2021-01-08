import { useState, useCallback } from 'react';

type StringKeysOf<T> = {
  [K in keyof T]-?: T[K] extends string ? K : never
}[keyof T];

type DictionatyInitialValues<T> = T[] | {[key: string]: T}

type DictionaryKeys<T> = StringKeysOf<T>

export const useDictionary = <T extends { [K in keyof T]: any }>(
  key: DictionaryKeys<T>,
  initialValues?: DictionatyInitialValues<T>
) => {

  const resolveInitialValues = useCallback((values: DictionatyInitialValues<T>) => {
    return Object.values(values).reduce((accumulator, value) => {
      return { ...accumulator, [value[key]]: value }
    }, {})
  }, [key])

  const [ values, setValues] = useState<{[key: string] : T}>(initialValues ? resolveInitialValues(initialValues) : {});

  const add = useCallback((value: T) => {
    setValues(previousValues => {
       return { ...previousValues, [value[key]]: value }
    })
  }, [key]);

  const put = useCallback((dictionaryKey: string, value:T) => {
    setValues({ ...values, [dictionaryKey]: value });
  }, [values])

  const remove = useCallback((dictionaryKey: string) => {
    let { [dictionaryKey]: valuesToRemove, ...valuesToKeep } = values;
    setValues(valuesToKeep);
  }, [values]);

  const reset = useCallback(() => {
    setValues({});
  }, []);

  return { dictionary: values, put, add, remove, reset };
}