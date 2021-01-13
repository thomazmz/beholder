export type StringValidator<T> = (value: T | undefined) => [boolean, string? ]

export type StringValidationHandler<T> = (value: T | undefined) => [ boolean, string? ]