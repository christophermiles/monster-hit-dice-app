export default function getPluralPhrase(count: number, nouns: [string, string, string], locale: Intl.Locale = new Intl.Locale('en')) {
    const pluralRules = new Intl.PluralRules(locale.toString())
    switch (pluralRules.select(count)) {
        case 'zero':
            return `0 ${nouns[0]}`
        case 'one':
            return `1 ${nouns[1]}`
        case 'other':
        default:
            return `${count} ${nouns[2]}`
    }
}