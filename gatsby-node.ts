import { flatten } from "flattenjs";
import fs from "fs";
import _ from "lodash";

const path = require("path");
const { collections } = require("./collections");

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
        productionCategories: [mongodbCategories] @link(by: "mongodb_id")
        distributionsCategories: [mongodbCategories] @link(by: "mongodb_id")
        catalogs: [mongodbCatalogs] @link(by:"seller.activity", from: "mongodb_id")
        mainImage: mongodbMedia @link(by: "mongodb_id")
        mainVideo: mongodbMedia @link(by: "mongodb_id")
        contributions: [mongodbContributions] @link(by:"contributor.activity.mongodb_id", from: "mongodb_id")
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
        mainImage: mongodbMedia @link(by: "mongodb_id")
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
        mainImage: mongodbMedia @link(by: "mongodb_id")
        contacts: [mongodbContacts] @link(by: "mongodb_id")
        categories: [mongodbCategories] @link(by: "mongodb_id")
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
        partnership: mongodbPartnerships @link(by: "mongodb_id")
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
        mainImage: mongodbMedia @link(by: "mongodb_id")
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
        mainImage: mongodbMedia @link(by: "mongodb_id")
        profiles: [mongodbProfiles] @link(by: "mongodb_id")
      }

      type mongodbContributions implements Node  {
        categories: [mongodbCategories] @link(by: "mongodb_id")
      }

      type mongodbContributionsSubject{
        partnership: mongodbPartnerships @link(by: "mongodb_id")
        activity: mongodbActivities @link(by: "mongodb_id")
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
      type mongodbCategories {
        classification: mongodbClassifications @link(by: "mongodb_id")
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

  const { data: areaQuery } = await graphql(`
    {
      areas: allMongodbPlaces(
        filter: { categories: { eq: "67238cab1301320f7e145427" } }
      ) {
        nodes {
          _id
          name
        }
      }
    }
  `);

  areaQuery.areas.nodes.forEach((node: any) => {
    const _id = node._id;
    const component = path.resolve(`./src/templates/v2/index.tsx`);

    const filter = { place: { within: { elemMatch: { _id: { eq: _id } } } } };

    actions.createPage({
      path: "/v2/area/" + _id,
      component: component,
      context: { areaId: _id, filter: filter },
    });
  });

  const { data: partnershipQuery } = await graphql(`
    {
      partnerships: allMongodbPartnerships(
        filter: {
          categories: { elemMatch: { _id: { eq: "674483572284c187dce347cb" } } }
        }
      ) {
        nodes {
          _id
          name
          area {
            _id
          }
        }
      }
    }
  `);

  partnershipQuery.partnerships.nodes.forEach((node: any) => {
    const _id = node._id;
    const component = path.resolve(`./src/templates/v2/index.tsx`);

    const filter = {
      contributions: {
        elemMatch: {
          subject: { partnership: { _id: { eq: _id } } },
        },
      },
    };

    actions.createPage({
      path: "/v2/partnership/" + _id + "/map",
      component: component,
      context: { areaId: node.area?._id, filter: filter },
    });

    actions.createRedirect({
      fromPath: `/v2/`,
      toPath: `/v2/area/6509bb9a94bcb52b76132d6a/`,
      isPermanent: true,
      force: true,
      redirectInBrowser: true,
    });
  });
};

exports.onPostBuild = async function ({ graphql }: any) {
  console.log("Create geojson");
  await generateGeoJsonApi(graphql);
};

function flattenCategories(data: any) {
  if (!data.categories) return data;

  const classificationKeys = [
    ...new Set(
      data.categories
        .map((c: any) => c.classification.key)
        .filter((k: any) => k)
    ),
  ];

  if (classificationKeys.length == 0) return data;

  for (const k of classificationKeys) {
    const cat = data.categories.filter((c: any) => c.classification?.key == k);
    cat.forEach((c: any) => delete c.classification);
    data["categories." + k] = cat;
  }

  delete data.categories;

  return data;
}

function flattenProfiles(data: any) {
  if (!data.profiles) return data;

  const typeKeys = [
    ...new Set(data.profiles.map((p: any) => p.type).filter((t: any) => t)),
  ];

  if (typeKeys.length == 0) return data;

  for (const k of typeKeys) {
    const p = data.profiles.find((p: any) => p.type == k);
    delete p.type;
    data["profiles." + k] = p;
  }

  delete data.profiles;

  return data;
}

function writeGeoJson({ conceptName, data }: any) {
  console.log("Start writing geojson for " + conceptName);
  const geojson = {
    type: "FeatureCollection",
    features: data.map((c: any) => {
      const f = {
        type: "Feature",
        geometry: {
          type: c.place.center.type,
          coordinates: [...c.place.center.coordinates],
        },
        properties: {},
      };

      delete c.place.center;
      f.properties = _.omitBy(
        flatten(flattenProfiles(flattenCategories(c))),
        _.isNil
      );
      return f;
    }),
  };

  const geojsonPath = "./public/" + conceptName;

  if (!fs.existsSync(geojsonPath)) fs.mkdirSync(geojsonPath);

  fs.writeFileSync(`${geojsonPath}.geojson`, JSON.stringify(geojson));
}

async function generateGeoJsonApi(graphql: any) {
  const { data: countersGeojsonQuery } = await graphql(`
    {
      counters: allMongodbCounters(
        filter: { place: { center: { coordinates: { ne: null } } } }
      ) {
        nodes {
          _id
          createdAt
          updatedAt
          catalog {
            name
            description {
              short {
                markdown
              }
            }
          }
          availabilityStatement {
            short {
              markdown
            }
          }
          name
          type
          place {
            _id
            center {
              coordinates
              type
            }
            gmaps {
              id
            }
            address {
              street
              postalCode
              locality
              municipality
            }
          }
          manager {
            activity {
              _id
              name
              description {
                short {
                  markdown
                }
              }
            }
            organisation {
              _id
              name
              number
              legalFormShort
            }
            partnership {
              _id
              name
            }
          }
          marketplace {
            _id
            name
          }
          categories {
            _id
            name
            classification {
              _id
              key
              name
            }
          }
          profiles {
            _id
            type
            localKey
            key
            link
          }
        }
      }
    }
  `);

  const counters = countersGeojsonQuery.counters.nodes;
  writeGeoJson({ conceptName: "counters", data: counters });

  const { data: activitiesGeojsonQuery } = await graphql(`
    {
      activities: allMongodbActivities(
        filter: { place: { center: { coordinates: { ne: null } } } }
      ) {
        nodes {
          _id
          createdAt
          updatedAt
          name
          type
          place {
            _id
            center {
              coordinates
              type
            }
            gmaps {
              id
            }
            address {
              street
              postalCode
              locality
              municipality
            }
          }
          manager {
            organisation {
              _id
              name
              number
              legalFormShort
            }
          }
          categories {
            _id
            name
            classification {
              _id
              key
              name
            }
          }
          profiles {
            _id
            type
            localKey
            key
            link
          }
        }
      }
    }
  `);

  const activities = activitiesGeojsonQuery.activities.nodes;
  writeGeoJson({ conceptName: "activities", data: activities });
}
