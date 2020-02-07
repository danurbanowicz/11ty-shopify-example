const fetch = require('node-fetch')

const productsQuery = `
  {
    products(first: 100) {
      edges {
        node {
          id
          collections(first: 20) {
            edges{
              node {
                id
                handle
                title
                descriptionHtml
              }
            }
          }
          title
          handle
          availableForSale
          description
          descriptionHtml
          productType
          tags
          vendor
          updatedAt
          priceRange {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
          images(first: 20) {
            edges {
              node {
                altText
                originalSrc
                transformedSrc(maxWidth: 300, maxHeight:300, crop: CENTER, scale: 1)
              }
            }
          }
          variants(first: 30) {
            edges {
              node {
                id
                availableForSale
                priceV2 {
                  amount
                }
                image(maxWidth: 64, maxHeight: 64, crop: CENTER, scale: 1) {
                  originalSrc
                }
                sku
                title
                weight
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`

module.exports = function () {
  console.log('GETTING PRODUCTS')

  return fetch(`https://chromika.myshopify.com/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Shopify-Storefront-Access-Token': '07abed2fd466657ce36462123ee0099a'
    },
    body: JSON.stringify({ query: productsQuery })
  })
    .then(r => r.json())
    .then(data => data.data.products.edges)
    .then(data => {
      const nodes = data.map((node) => node.node)
      console.log(`Building ${nodes.length} products`)
      return nodes
    })
}
