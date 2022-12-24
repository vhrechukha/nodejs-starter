export const getOrDefault = <TValue, TDefaultValue>(
  value: TValue | undefined,
  defaultValue: TDefaultValue
): TValue | TDefaultValue => (value === undefined ? defaultValue : value);
