import type { AdapterInit, GatsbyConfig } from "gatsby";
import { collections } from "./collections";

const noOpAdapter: AdapterInit = () => ({
  name: `gatsby-adapter-noop`,
  adapt() {
    // noop
  },
})

require("dotenv").config({
  path: `.env`, // ${process.env.NODE_ENV}
});

module.exports = {
  //pathPrefix: "/logcica-discover",
 
  adapter: noOpAdapter(),
  plugins: [
    /*
     * Gatsby's data processing layer begins with “source” plugins. Here we
     * setup the site to pull data from the "documents" collection in a local
     * MongoDB instance
     */
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        typePrefix: "",
        dbName: process.env.MONGO_DB_NAME,
        collection: collections,
        connectionString: process.env.MONGO_CONNECTION_STRING,
        query: {},
        preserveObjectIds: false,
      },
      
      //query: { documents: { as_of: { $gte: 1604397088013 } } },
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: false // (default: true) Enable/disable loading stylesheets via CDN
      }
    }
  ],
};

const config: GatsbyConfig = {
  siteMetadata: {
    title: `logCiCa explore`,
    siteUrl: `https://explore.logcica.org`,
    menuLinks: [
      {
        name: `Produits`,
        url: `/product`,
      },
      {
        name: `Marchés`,
        url: `/marketplace`,
      },
    ],
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-styled-components"],
};

export default config;
