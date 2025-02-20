
export function isValidInput (val: string) {
    const lastSymbol = val.charAt(val.length - 1)

    const isComma = lastSymbol === ','
    const isWhitespace = lastSymbol === ' '
    const isNan = isNaN(Number(lastSymbol))
    
    if ((isComma || !isNan) && !isWhitespace) return true
    return false
}