const activitiesQuery = `
{
    activities: allMongodbActivities {
      nodes {
        _id
        name
        type
        categories {
          name
        }
        distributionsCategories {
          name
        }
        description {
          short {
            markdown
          }
        }
        place {
          ...PlaceFields
        }
        catalogs {
          name
          productCategories {
            name
          }
          description {
            short {
              markdown
            }
          }
        }
      }
    }
  }
  
  fragment PlaceFields on mongodbPlaces {
    center {
      coordinates
    }
    address {
      locality
    }
    within {
      name
    }
  }
`;

const queries = [
  {
    query: activitiesQuery,
    transformer: ({ data }) => data.activities.nodes.map(n => {
        n.objectID = n._id
        delete n._id
        if(n.place?.center?.coordinates){
            n._geoloc = {
              lat: n.place.center.coordinates[1],
              lng: n.place.center.coordinates[0]
            }
            delete n.place.center
        }
        return n
    }),
    indexName: "Activities",
    settings: { 
        //attributesToSnippet: [`description.short.markdown:20`] 
    },
  },
];

module.exports = queries;
