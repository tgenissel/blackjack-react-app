module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/blackjack',
          permanent: true,
        },
      ]
    },
  }