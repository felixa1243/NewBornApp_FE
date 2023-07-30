export function decimalFormater(number: string): string {
    if (number.includes('.')) {
        return number.replace('.', ',');
    }
    return number;
}