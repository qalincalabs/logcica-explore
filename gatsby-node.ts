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
];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.createSchemaCustomization = ({ actions }) => {
  
  const { createTypes } = actions;

  
  const mongoIdTypeDefs = mongoCollections.map((c) =>
    `type mongodb${capitalizeFirstLetter(c)} implements Node {
            _id: String @proxy(from: "mongodb_id")
        }`
  ).join("\n");
  
  createTypes(mongoIdTypeDefs);
  
  const typeDefs1 = 
  //mongoIdTypeDefs +
    `
      type mongodbProductProducer implements Node {
        organisation: mongodbOrganisation @link(by: "mongodb_id")
        workspace: mongodbWorkspace @link(by: "mongodb_id")
        activity: mongodbActivity @link(by: "mongodb_id")
      }
      type mongodbProduct implements Node {
        categories: [mongodbCategory] @link(by: "mongodb_id")
      }
    `;
  createTypes(typeDefs1);
};
