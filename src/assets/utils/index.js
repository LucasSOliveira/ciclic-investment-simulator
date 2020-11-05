export default function currencyFormat(value, locale = 'pt-BR') {
    if (!value && value !== 0) { return '' }
    return parseFloat(value).toLocaleString(locale, { style: 'currency', currency: 'BRL' })
  }
