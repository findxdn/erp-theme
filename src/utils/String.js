import regex from './Regex'

export default class String {
  /**
    @argument: value - string
    @argument: delimiter - string
    @returns: string
    @description: format number to string with comma
  */
  static convertNumberToString = (value, delimiter = ',') => {
    if (value || value === 0) {
      return value.toString().replace(regex.formatMoney, delimiter)
    }
    return '0'
  }

  /**
    @argument: value - string
    @returns: int
    @description: convert money string to number (remove comma)
  */
  static convertStringMoneyToNumber = (value) => {
    try {
      if (value) {
        return Number.parseInt(value.replace(/,/g, ''), 10)
      }
      return 0
    } catch (error) {
      return 0
    }
  }
}
