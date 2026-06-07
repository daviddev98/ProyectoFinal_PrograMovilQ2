const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9]{8,15}$/;

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const cleaned = value.replace(/[\s()-]/g, '');
  return PHONE_REGEX.test(cleaned);
}

export function isValidPassword(value: string, minLength = 8): boolean {
  return value.length > minLength;
}

export function hasValidDomain(
  email: string,
  domains: string[] = ['@gmail.com', '@unitec.edu', '@hotmail.com', '@outlook.com']
): boolean {
  return domains.some((domain) => email.trim().endsWith(domain));
}
