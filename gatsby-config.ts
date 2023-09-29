import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env`, // ${process.env.NODE_ENV}
})

module.exports = {
  pathPrefix: "/logcica-discover",
}

module.exports = {
  plugins: [
    /*
     * Gatsby's data processing layer begins with “source” plugins. Here we
     * setup the site to pull data from the "documents" collection in a local
     * MongoDB instance
     */
    {
      resolve: `gatsby-source-mongodb`,
      options: { 
        dbName: process.env.MONGO_DB_NAME, 
        collection: `product`,
        connectionString: process.env.MONGO_CONNECTION_STRING,
        query: {}
      },
      //query: { documents: { as_of: { $gte: 1604397088013 } } },
      },
  ],
}

const config: GatsbyConfig = {
  siteMetadata: {
    title: `logCiCa discover`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-styled-components"]
};

export default config;
