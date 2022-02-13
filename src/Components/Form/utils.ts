export const emailValidator = (email: string): string => {
  const re = /\S+@\S+\.\S+/
  if (!email) {
    return 'signIn.form.errors.required'
  }
  if (!re.test(email)) {
    return 'signIn.form.errors.format'
  }
  return ''
}
export const passwordValidator = (password: string): string => {
  if (!password) {
    return 'signIn.form.errors.required'
  }
  if (password.length < 5) {
    return 'signIn.form.errors.format||signIn.form.fields.password.condition'
  }
  return ''
}
export const repasswordValidator = (
  password: string,
  oldPass?: string,
): string => {
  if (!password) {
    return 'signIn.form.errors.required'
  }
  if (password !== oldPass) {
    return 'Passwords does not match'
  }
  return ''
}
export function usernameValidator(username: string) {
  if (!username) return 'signIn.form.errors.required'
  return ''
}
