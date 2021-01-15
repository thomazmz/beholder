export type StringValidator = (value: string | undefined) => [boolean, string? ]

export type StringValidationHandler = (value: string | undefined) => [ boolean, string? ]