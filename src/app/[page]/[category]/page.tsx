import React from 'react'

type RouteParams = {
  category: string
}

export default async function Category({ params }: { params: RouteParams }) {
  return <div>params category: {params.category}</div>
}
