import type { AdapterInit, GatsbyConfig } from "gatsby";
import { collections } from "./collections";

const noOpAdapter: AdapterInit = () => ({
  name: `gatsby-adapter-noop`,
  adapt() {
    // noop
  },
});

require("dotenv").config({
  path: `.env`, // ${process.env.NODE_ENV}
});

console.log(process.env.PAYLOAD_CLOUD_BUCKET_REGION);

module.exports = {
  adapter: noOpAdapter(),
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-s3`,
      options: {
        aws: {
          region: process.env.PAYLOAD_CLOUD_BUCKET_REGION,
        },
        buckets: [process.env.PAYLOAD_CLOUD_BUCKET],
        expiration: 120,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries"),
        //dryRun: true
      },
    },
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        typePrefix: "",
        dbName: process.env.MONGO_DB_NAME,
        collection: collections,
        connectionString: process.env.MONGO_CONNECTION_STRING,
        extraParams: {
          appName: "Cluster0",
        },
        query: {},
        preserveObjectIds: false,
      },

      //query: { documents: { as_of: { $gte: 1604397088013 } } },
    },
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: false, // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
  ],
};

const config: GatsbyConfig = {
  siteMetadata: {
    title: `logCiCa explore`,
    siteUrl: `https://explore.logcica.org`,
    menuLinks: [
      { name: "PRODUCTEURS", url: "/" },
      { name: "GROUPEMENTS", url: "/partnership" },
      { name: "MARCHÉS", url: "/marketplace" },
      { name: "PRODUITS", url: "/product" },
      { name: "RECIPE", url: "/recipe" },
      { name: "ÉVÉNEMENTS", url: "/event" },
    ],
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-styled-components"],
};

export default config;
