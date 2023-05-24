export default async function fetchData(url: string) {
  const response = await fetch(url, {
    next: { revalidate: 10 },
    headers: {
      Accept: 'application/json'
    }
  })
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const data = await response.json()
  return data
}
