import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import * as AWS from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers"; // ES6 import

import { authAsCognitoUser } from "./authAsCognitoUser";
import { createKey } from "./createKey";

const path = require("path");
const { collections } = require("./collections");

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getCredentials() {
  const session = await authAsCognitoUser(
    process.env.PAYLOAD_CLOUD_PROJECT_ID as string,
    process.env.PAYLOAD_CLOUD_COGNITO_PASSWORD as string
  );

  const cognitoIdentity = new CognitoIdentityClient({
    credentials: fromCognitoIdentityPool({
      clientConfig: {
        region: "us-east-1",
      },
      identityPoolId: process.env
        .PAYLOAD_CLOUD_COGNITO_IDENTITY_POOL_ID as string,
      logins: {
        [`cognito-idp.us-east-1.amazonaws.com/${process.env.PAYLOAD_CLOUD_COGNITO_USER_POOL_ID}`]:
          session.getIdToken().getJwtToken(),
      },
    }),
  });

  const c = await cognitoIdentity.config.credentials();

  console.log(c);

  const s3 = new AWS.S3({
    credentials: c,
    region: process.env.PAYLOAD_CLOUD_BUCKET_REGION,
  });

  const key = createKey({
    collection: "media",
    filename: "WhatsApp Image 2024-07-03 at 14.51.40.jpg",
    // @ts-expect-error
    identityID: c.identityId,
  });

  console.log(key);

  const object = await s3.getObject({
    Bucket: process.env.PAYLOAD_CLOUD_BUCKET,
    Key: key,
  });

  console.log(object);

  return c;
}

exports.onPreInit = async ({ actions, store }: any) => {
  const { setPluginStatus } = actions;
  const state = store.getState();

  const plugin = state.flattenedPlugins.find(
    (plugin: any) => plugin.name === "gatsby-source-s3"
  );
  if (plugin) {
    const credentials = await getCredentials();
    plugin.pluginOptions = {
      ...plugin.pluginOptions,
      ...{ aws: { credentials: credentials } },
    };
    setPluginStatus({ pluginOptions: plugin.pluginOptions }, plugin);
  }
};

exports.createSchemaCustomization = ({ actions }: any) => {
  const { createTypes } = actions;

  const mongoIdTypeDefs = collections
    .map(
      (c: string) =>
        `type mongodb${capitalizeFirstLetter(c)} implements Node {
            _id: String @proxy(from: "mongodb_id")
        }`
    )
    .join("\n");

  createTypes(mongoIdTypeDefs);

  const typeDefs1 = `
      type mongodbActivities implements Node {
        place: mongodbPlaces @link(by: "mongodb_id")
        profiles: [mongodbProfiles] @link(by: "mongodb_id")
        contacts: [mongodbContacts] @link(by: "mongodb_id")
        categories: [mongodbCategories] @link(by: "mongodb_id")
        distributionsCategories: [mongodbCategories] @link(by: "mongodb_id")
        catalogs: [mongodbCatalogs] @link(by:"seller.activity", from: "mongodb_id")
      }
      type mongodbActivitiesManager implements Node {
        organisation: mongodbOrganisations @link(by: "mongodb_id")
        workspace: mongodbWorkspaces @link(by: "mongodb_id")
        activity: mongodbActivities @link(by: "mongodb_id")
      }
      type mongodbSessions implements Node {
        place: mongodbPlaces @link(by: "mongodb_id")
        categories: [mongodbCategories] @link(by: "mongodb_id")
        profiles: [mongodbProfiles] @link(by: "mongodb_id")
      }
      type mongodbSessionsManager implements Node {
        organisation: mongodbOrganisations @link(by: "mongodb_id")
        activity: mongodbActivities @link(by: "mongodb_id")
        partnership: mongodbPartnerships @link(by: "mongodb_id")
      }
      type mongodbCatalogs implements Node {
        productCategories: [mongodbCategories] @link(by: "mongodb_id")
      }
      type mongodbCounters implements Node {
        catalog: mongodbCatalogs @link(by: "mongodb_id")
        marketplace: mongodbCounters @link(by: "mongodb_id")
        place: mongodbPlaces @link(by: "mongodb_id")
        profiles: [mongodbProfiles] @link(by: "mongodb_id")
        actions: [mongodbActions] @link(by:"subject.counter", from: "mongodb_id")
      }
      type mongodbProductsOwner implements Node {
        organisation: mongodbOrganisations @link(by: "mongodb_id")
        workspace: mongodbWorkspaces @link(by: "mongodb_id")
        activity: mongodbActivities @link(by: "mongodb_id")
      }
      type mongodbProductsProducer implements Node {
        organisation: mongodbOrganisations @link(by: "mongodb_id")
        workspace: mongodbWorkspaces @link(by: "mongodb_id")
        activity: mongodbActivities @link(by: "mongodb_id")
      }
      type mongodbCountersManager implements Node {
        organisation: mongodbOrganisations @link(by: "mongodb_id")
        workspace: mongodbWorkspaces @link(by: "mongodb_id")
        activity: mongodbActivities @link(by: "mongodb_id")
      }
      type mongodbReferences implements Node {
        system: mongodbInformation_systems @link(by: "mongodb_id")
      }
      type mongodbProducts implements Node {
        categories: [mongodbCategories] @link(by: "mongodb_id")
        availabilities: [mongodbAvailabilities] @link(by: "mongodb_id")
        references: [mongodbReferences] @link(by:"target", from: "mongodb_id")
      }
      type mongodbAvailabilities implements Node {
        season: mongodbSeason_availabilities @link(by: "mongodb_id")
      }
      type mongodbOrganisations implements Node {
        place: mongodbPlaces @link(by: "mongodb_id")
      }
      type mongodbProductsAllergenList implements Node {
        allergen: mongodbCodes @link(by: "mongodb_id")
        containmentLevel: mongodbCodes @link(by: "mongodb_id")
      }
      type mongodbProductsNutrientList {
        nutrient: mongodbCodes @link(by: "mongodb_id")
      }
      type mongodbProductsNetContent {
        unit: mongodbUnits @link(by: "mongodb_id")
      }
      type mongodbContributionsContributor {
        activity: mongodbActivities @link(by: "mongodb_id")
        partnership: mongodbPartnerships @link(by: "mongodb_id")
      }
      type mongodbPartnerships implements Node {
        categories: [mongodbCategories] @link(by: "mongodb_id")
        mainOrganisation: mongodbOrganisations @link(by: "mongodb_id")
        area: mongodbPlaces @link(by: "mongodb_id")
        profiles: [mongodbProfiles] @link(by:"subject.partnership", from: "mongodb_id")
        workspaces: [mongodbWorkspaces] @link(by:"manager.partnership", from: "mongodb_id")
        contacts: [mongodbContacts] @link(by: "mongodb_id")
        counters: [mongodbCounters] @link(by:"manager.partnership", from: "mongodb_id")
      }
      type mongodbRecipesAuthor implements Node {
        organisation: mongodbOrganisations @link(by: "mongodb_id")
        partnership: mongodbPartnerships @link(by: "mongodb_id")
      }
      type mongodbRecipesNutrientList{
        nutrient: mongodbCodes @link(by: "mongodb_id")
      }
      type mongodbRecipesAllergenList implements Node {
        allergen: mongodbCodes @link(by: "mongodb_id")
        containmentLevel: mongodbCodes @link(by: "mongodb_id")
      }

      type mongodbRecipesIngredientListQuantity implements Node {
        unit: mongodbUnits @link(by: "mongodb_id")
      }

      type mongodbRecipes implements Node {
        difficulty: mongodbCategories @link(by: "mongodb_id")
        seasonality: mongodbCategories @link(by: "mongodb_id")
        costCategory: mongodbCategories @link(by: "mongodb_id")
        categories: [mongodbCategories] @link(by: "mongodb_id")
      }
      type mongodbContributionsSubject{
        partnership: mongodbPartnerships @link(by: "mongodb_id")
      }
      type mongodbWorkspaces {
        place: mongodbPlaces @link(by: "mongodb_id")
      }
      type mongodbPlaces {
        within: [mongodbPlaces] @link(by: "mongodb_id")
      }
      type mongodbProfiles implements Node {
        name: String
      }
    `;
  createTypes(typeDefs1);
};

exports.createPages = async function ({ actions, graphql }: any) {
  const { data: marketplacesQuery } = await graphql(`
    query {
      allMongodbCounters(filter: { type: { eq: "marketplace" } }) {
        nodes {
          _id
          name
        }
      }
    }
  `);
  marketplacesQuery.allMongodbCounters.nodes.forEach((node: any) => {
    const _id = node._id;
    const component = path.resolve(`./src/templates/marketplace.tsx`);

    actions.createPage({
      path: "/marketplace/" + _id,
      component: component,
      context: { id: _id },
    });
  });

  const { data: partnershipsQuery } = await graphql(`
    query {
      allMongodbPartnerships {
        nodes {
          _id
          name
        }
      }
    }
  `);
  partnershipsQuery.allMongodbPartnerships.nodes.forEach((node: any) => {
    const _id = node._id;
    const component = path.resolve(`./src/templates/partnership.tsx`);

    actions.createPage({
      path: "/partnership/" + _id,
      component: component,
      context: { id: _id },
    });
  });

  const { data: activitiesQuery } = await graphql(`
    query {
      allMongodbActivities {
        nodes {
          _id
          name
        }
      }
    }
  `);
  activitiesQuery.allMongodbActivities.nodes.forEach((node: any) => {
    const _id = node._id;
    const component = path.resolve(`./src/templates/activity.tsx`);

    actions.createPage({
      path: "/activity/" + _id,
      component: component,
      context: { id: _id },
    });
  });

  const { data: recipesQuery } = await graphql(`
    query {
      allMongodbRecipes {
        nodes {
          _id
          name
        }
      }
    }
  `);
  recipesQuery.allMongodbRecipes.nodes.forEach((node: any) => {
    const _id = node._id;
    const component = path.resolve(`./src/templates/recipe.tsx`);

    actions.createPage({
      path: "/recipe/" + _id,
      component: component,
      context: { id: _id },
    });
  });

  const { data: sessionsQuery } = await graphql(`
    query {
      allMongodbSessions {
        nodes {
          _id
        }
      }
    }
  `);
  sessionsQuery.allMongodbSessions.nodes.forEach((node: any) => {
    const _id = node._id;
    const component = path.resolve(`./src/templates/event.tsx`);

    actions.createPage({
      path: "/event/" + _id,
      component: component,
      context: { id: _id },
    });
  });
};
