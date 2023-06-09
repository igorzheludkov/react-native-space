const constants = {
  navCategory: 15,
  siteName: 'React Native Space',
  siteUrl: 'https://react-native.space',
}

const api = {
  categories: `${process.env.BASE_URL}/categories?per_page=100`,
  posts: `${process.env.BASE_URL}/posts?per_page=100`,
  pages: `${process.env.BASE_URL}/pages?per_page=100`,
}

export { constants, api }
