export const validators = {
  required: (value: string, fieldName: string): string | null =>
    !value || value.trim() === '' ? `${fieldName} is required` : null,

  email: (value: string): string | null =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : null,

  minLength: (value: string, min: number): string | null =>
    value.length < min ? `Must be at least ${min} characters` : null,

  zipCode: (value: string): string | null =>
    !/^\d{5}$/.test(value) ? 'Zip code must be 5 digits' : null,
};

export type ValidationErrors = Record<string, string>;

export function validateForm<T extends Record<string, string>>(
  data: T,
  rules: Record<keyof T, ((value: string) => string | null)[]>
): ValidationErrors {
  const errors: ValidationErrors = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field as keyof T] || '';
    for (const rule of fieldRules as ((value: string) => string | null)[]) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }

  return errors;
}
