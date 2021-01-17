export type Validator<T> = (value: T | undefined) => [boolean, string? ]

export type ValidatorFactory<T> = (...args: any[]) => Validator<T>

export type ValidationHandler<T> = (value: T | undefined) => [ boolean, string? ]