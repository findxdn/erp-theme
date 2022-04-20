const regex = {
  formatMoney: /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
  isNumber: /^\d+$/,
  isOnlyDecimals: /^\.\d+/, // ex: .1
}

export default regex;
