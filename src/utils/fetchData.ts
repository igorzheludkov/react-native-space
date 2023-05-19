export default async function fetchData(url: string) {
  const response = await fetch(url, { cache: 'no-store' })
  const data = await response.json()
  return data
}
