import path from "path";

const mongoCollections: string[] = [
  "product",
  "organisation",
  "workspace",
  "activity",
  "category",
  "availability",
  "seasonAvailability",
  "code",
  "codeList",
  "place",
  "unit",
  "informationSystem",
  "reference",
  "counter",
  "catalog",
  "profile",
  "partnership",
  "contribution",
  "action"
];

function capitalizeFirstLetter(string: String) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.createSchemaCustomization = ({ actions }: any) => {
  const { createTypes } = actions;

  const mongoIdTypeDefs = mongoCollections
    .map(
      (c) =>
        `type mongodb${capitalizeFirstLetter(c)} implements Node {
            _id: String @proxy(from: "mongodb_id")
        }`
    )
    .join("\n");

  createTypes(mongoIdTypeDefs);

  // TODO rename allergenKey to allergen and containmentLevel ...
  const typeDefs1 = `
      type mongodbActivity implements Node {
        place: mongodbPlace @link(by: "mongodb_id")
        profiles: [mongodbProfile] @link(by: "mongodb_id")
      }
      type mongodbCounter implements Node {
        catalog: mongodbCatalog @link(by: "mongodb_id")
        place: mongodbPlace @link(by: "mongodb_id")
        profiles: [mongodbProfile] @link(by: "mongodb_id")
        actions: [mongodbAction] @link(by:"subject.counter", from: "mongodb_id")
      }
      type mongodbProductOwner implements Node {
        organisation: mongodbOrganisation @link(by: "mongodb_id")
        workspace: mongodbWorkspace @link(by: "mongodb_id")
        activity: mongodbActivity @link(by: "mongodb_id")
      }
      type mongodbCounterManager implements Node {
        organisation: mongodbOrganisation @link(by: "mongodb_id")
        workspace: mongodbWorkspace @link(by: "mongodb_id")
        activity: mongodbActivity @link(by: "mongodb_id")
      }
      type mongodbReference implements Node {
        system: mongodbInformationSystem @link(by: "mongodb_id")
      }
      type mongodbProduct implements Node {
        categories: [mongodbCategory] @link(by: "mongodb_id")
        availabilities: [mongodbAvailability] @link(by: "mongodb_id")
        references: [mongodbReference] @link(by:"target", from: "mongodb_id")
      }
      type mongodbAvailability implements Node {
        season: mongodbSeasonAvailability @link(by: "mongodb_id")
      }
      type mongodbOrganisation implements Node {
        place: mongodbPlace @link(by: "mongodb_id")
      }
      type mongodbProductAllergenList implements Node {
        allergenKey: mongodbCode @link(by: "mongodb_id")
        containmentLevelKey: mongodbCode @link(by: "mongodb_id")
      }
      type mongodbProductNutrientList{
        nutrientKey: mongodbCode @link(by: "mongodb_id")
      }
      type mongodbProductNetContent{
        unit: mongodbUnit @link(by: "mongodb_id")
      }
      type mongodbContributionContributor{
        activity: mongodbActivity @link(by: "mongodb_id")
      }
      type mongodbPartnership implements Node {
        categories: [mongodbCategory] @link(by: "mongodb_id")
      }
      type mongodbContributionSubject{
        partnership: mongodbPartnership @link(by: "mongodb_id")
      }
    `;
  createTypes(typeDefs1);
};

exports.createPages = async function ({ actions, graphql }: any) {
  const { data: marketplacesQuery } = await graphql(`
    query {
      allMongodbCounter(filter: { type: { eq: "marketplace" } }) {
        nodes {
          _id
          name
        }
      }
    }
  `);
  marketplacesQuery.allMongodbCounter.nodes.forEach((node: any) => {
    const _id = node._id;
    const component = path.resolve(`./src/templates/marketplace.tsx`);

    actions.createPage({
      path: "/marketplace/" + _id,
      component: component,
      context: { id: _id },
    });
  });

  const { data } = await graphql(`
    query {
      allMongodbPartnership {
        nodes {
          _id
          name
        }
      }
    }
  `);
  data.allMongodbPartnership.nodes.forEach((node: any) => {
    const _id = node._id;
    const component = path.resolve(`./src/templates/partnership.tsx`);

    actions.createPage({
      path: "/partnership/" + _id,
      component: component,
      context: { id: _id },
    });
  });
};
