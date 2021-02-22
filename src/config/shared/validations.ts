export const existsOrError = (value: any, msg: string) => {
  if (!value) throw msg
  if (Array.isArray(value) && value.length === 0) throw msg
  if (typeof value === 'string' && !value.trim()) throw msg
}

export const notExistsOrError = (value: any, msg: string) => {
  try {
    if (!value) throw msg
    if (Array.isArray(value) && value.length === 0) throw msg
    if (typeof value === 'string' && !value.trim()) throw msg
  } catch (msg) {
    return
  }
  throw msg
}

export const equalsOrError = (valueA: any, valueB: any, msg: string) => {
  if (valueA !== valueB) throw msg
}

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const isValidPassword = (password: string, msg: string = null) => {
  if (password.length < 6) throw (msg || 'Weak password, enter at least 6 characters')
  // eslint-disable-next-line no-useless-escape
  if (password.match(/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/) === null) throw (msg || 'Weak password, enter at least 1 special character')
  if (password.match(/[a-z]+/) === null && password.match(/[A-Z]+/) === null) throw (msg || 'Weak password, enter at least 1 character')
}
