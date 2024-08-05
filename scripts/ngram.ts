const word = 'die'
const isoLang = 'de'

const ngram = await fetch(`https://books.google.com/ngrams/json?content=${word}&year_start=2021&year_end=2022&corpus=${isoLang}&smoothing=3&case_insensitive=true`)
const ngramJson = await ngram.json()
// [{"ngram": "ist", "parent": "", "type": "NGRAM", "timeseries": [0.005935249617323279, 0.005935249617323279]}]

export const score = ngramJson[0].timeseries[1]
console.log('ngramJson', ngramJson, score)

