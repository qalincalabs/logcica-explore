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

module.exports = {
  adapter: noOpAdapter(),
  plugins: [
    `gatsby-plugin-styled-components`,
    /*
     * Gatsby's data processing layer begins with “source” plugins. Here we
     * setup the site to pull data from the "documents" collection in a local
     * MongoDB instance
     */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `logCiCa Explore`,
        short_name: `Explore`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#ffcb01`,
        display: `standalone`,
        icon: `src/images/favicon.svg`,
        screenshots: [
          {
            src: "/img/explore-v2-large.png",
            sizes: "800x385",
            type: "image/png",
            //form_factor: "wide" -> not working
            label: "Application",
          },
        ],
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
        preserveObjectIds: true,
      },

      //query: { documents: { as_of: { $gte: 1604397088013 } } },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: false, // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`fr`, `en`],
        defaultLanguage: `fr`,
        siteUrl: `https://explore.logcica.org/`,
        // if you are using trailingSlash gatsby config include it here, as well (the default is 'always')
        trailingSlash: "always",
        // you can pass any i18next options
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
          defaultNS: "common",
        },
        pages: [
          {
            matchPath: "/v2",
            languages: ["fr", "en"],
          },
          {
            matchPath: "/:any",
            languages: ["fr"],
          },
          {
            matchPath: "/:any/:any1",
            languages: ["fr"],
          },
          {
            matchPath: "/:any/:any1/:any2",
            languages: ["fr"],
          },
        ],
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
