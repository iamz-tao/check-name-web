const string = `
Trailers1
Normal Ad
Trailers2
Fix 20-50%
Selected Movied Ad
End Card
Fix 60-100%
Attached Trailer/ Special Promotion
Trailers3
Fix 110-150%
Csr Ad
Function Ad
Social Ad
Sound Check
Rotate Ad
Position 1
Position 2
Position 3
Position 4
`

const makeSlug = (text, k) => {
  const value = text
    .trim()
    .toLowerCase()
    .replace(' ', '-')
    .replace('/', '-')

  return {
    text,
    value,
    key: k + 1,
  }
}
const arr = string
  .trim()
  .split('\n')

const payload = arr.map(makeSlug)

console.log(JSON.stringify(payload))
