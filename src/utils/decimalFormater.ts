export function addDecimalSeparator(number: number): string {
    const numberStr: string = number.toString();

    if (numberStr.includes(',')) {
        return numberStr.replace(',', '.');
    }
    return numberStr;
}