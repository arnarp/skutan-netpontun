export const isKennitala = (value: string) => {
  value = value || ''

  if (value.length === 0) {
    return true
  }

  // if value is not the length of 10 or not only numbers
  if (value.length !== 10 || value.match(/^[0-9]+$/) === null) {
    return false
  }

  // Modulus 11 check the 9th number
  const sequence = [3, 2, 7, 6, 5, 4, 3, 2]

  let sum = 0
  for (let i = 0; i < 8; i++) {
    sum += +value[i] * sequence[i]
  }

  const modulus11 = sum % 11
  const calculatedNumber = modulus11 > 0 ? 11 - modulus11 : 0

  const passedModularCheck = calculatedNumber === +value[8]

  return passedModularCheck
}

export const isOnlyDigits = (value: string) => /^\d+$/.test(value)

export const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
