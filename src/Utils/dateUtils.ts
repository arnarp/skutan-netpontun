export const addYears = (date: Date, years: number) => {
  const result = new Date(
    date.getUTCFullYear() + years,
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
  )
  if (result.getUTCMonth() > date.getUTCMonth()) {
    result.setUTCDate(0)
  }
  return result
}

/**
 * @param {Date} date - Date to add days to
 * @param {number} days - Number of days to add
 * @returns {Date} A new date, with time set to 00:00:00.000
 */
export const addDays = (date: Date, days: number) =>
  new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + days,
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
  )
