import { isValidPhoneNumber } from 'libphonenumber-js';
import * as Yup from 'yup';

export const usernameValidation = Yup.object().shape({
  username: Yup.string()
    .min(2, 'INVALID_USERNAME_REG')
    .matches(/^[a-zA-Z0-9_]+$/, 'INVALID_USERNAME_REG')
    .required('requireUsername'),
});
export interface IUsernameValidation {
  username: string;
}

export function isValidPassword(password: string) {
  const messages = [];

  if (password.length < 6) {
    messages.push('At least 6 characters');
  }
  if (!/[a-z]/.test(password)) {
    messages.push('At least one lowercase letter (a-z)');
  }
  if (!/[A-Z]/.test(password)) {
    messages.push('At least one uppercase letter (A-Z)');
  }
  if (!/[0-9]/.test(password)) {
    messages.push('At least one number (0-9)');
  }
  if (!/[@$!%*?&]/.test(password)) {
    messages.push('At least one special character (e.g., @, $, !, %, *, ?, &)');
  }

  return messages;
}

export const phoneNumberValidation = Yup.object().shape({
  phoneNumber: Yup.string()
    .test('is-valid-phone', 'invalidPhoneNumber', (value) => {
      return isValidPhoneNumber(value ?? '');
    })
    .required('requirePhoneNumber'),
});
export interface IPhoneNumberValidation {
  phoneNumber: string;
}
