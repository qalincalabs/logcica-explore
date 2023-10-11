const mongoCollections: string[] = [
  "product",
  "organisation",
  "workspace",
  "activity",
  "category",
  "reference",
  "availability",
  "seasonAvailability",
  "code",
  "codeList",
  "place",
  "unit"
];

function capitalizeFirstLetter(string: String) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.createSchemaCustomization = ({ actions } : any) => {
  
  const { createTypes } = actions;

  
  const mongoIdTypeDefs = mongoCollections.map((c) =>
    `type mongodb${capitalizeFirstLetter(c)} implements Node {
            _id: String @proxy(from: "mongodb_id")
        }`
  ).join("\n");
  
  createTypes(mongoIdTypeDefs);
  
  // TODO rename allergenKey to allergen and containmentLevel ...
  const typeDefs1 = 
    `
      type mongodbProductOwner implements Node {
        organisation: mongodbOrganisation @link(by: "mongodb_id")
        workspace: mongodbWorkspace @link(by: "mongodb_id")
        activity: mongodbActivity @link(by: "mongodb_id")
      }
      type mongodbProduct implements Node {
        categories: [mongodbCategory] @link(by: "mongodb_id")
        availabilities: [mongodbAvailability] @link(by: "mongodb_id")
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
    `;
  createTypes(typeDefs1);
};
