const constants = {
  navCategory: 15,
  siteName: 'React Native Space'
}

const api = {
  categories: `${process.env.BASE_URL}/categories?per_page=100`,
  posts: `${process.env.BASE_URL}/posts?per_page=100`
}

export { constants, api }
