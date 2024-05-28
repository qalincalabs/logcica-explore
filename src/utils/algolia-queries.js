const activitiesQuery = `
  {
    pages: allMongodbActivities {
      nodes {
        _id
        name
        type
        description {
          short {
            markdown
          }
        }
      }
    }
  }
`;

const queries = [
  {
    query: activitiesQuery,
    transformer: ({ data }) => data.pages.nodes.map(n => ({
        objectID: n?._id,
        frontmatter: {
            title: n?.name
        },
        fields: {
            type: n?.type
        },
        excerpt: n?.description?.short?.markdown
    })),
    indexName: "Activities",
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

module.exports = queries;
