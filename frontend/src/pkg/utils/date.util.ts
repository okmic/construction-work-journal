export const formatDate = (date: Date | string): string => {
  try {
    let dateObj: Date

    if (date instanceof Date) {
      dateObj = date
    } else if (typeof date === 'string') {
      const parts = date.split('T')
      const datePart = parts[0]
      const [year, month, day] = datePart.split('-')
      dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    } else {
      return ''
    }

    if (isNaN(dateObj.getTime())) {
      return ''
    }

    const day = dateObj.getDate().toString().padStart(2, '0')
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObj.getFullYear()

    return `${day}.${month}.${year}`
  } catch {
    return ''
  }
}
