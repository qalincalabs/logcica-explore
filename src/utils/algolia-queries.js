const crypto = require('crypto');

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

const partnershipsQuery = `
{
  partnerships: allMongodbPartnerships {
    nodes {
      _id
      name
      categories {
        name
      }
      mainOrganisation {
        name
      }
      profiles {
        name
      }
      contacts {
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
`;

const addContentDigest = obj => {
  const content = JSON.stringify(obj);
  const digest = crypto
    .createHash('md5')
    .update(content)
    .digest('hex');
  obj.internal = {
    contentDigest: digest
  };
  return obj;
};

const queries = [
  {
    query: activitiesQuery,
    transformer: ({ data }) => data.activities.nodes.map(n => {
      n.objectID = n._id;
      delete n._id;
      if (n.place?.center?.coordinates) {
        n._geoloc = {
          lat: n.place.center.coordinates[1],
          lng: n.place.center.coordinates[0]
        };
        delete n.place.center;
      }
      return addContentDigest(n);
    }),
    indexName: "activity",
    settings: { 
      //attributesToSnippet: [`description.short.markdown:20`] 
    },
  },
  {
    query: partnershipsQuery,
    transformer: ({ data }) => data.partnerships.nodes.map(n => {
      n.objectID = n._id;
      delete n._id;
      if (n.place?.center?.coordinates) {
        n._geoloc = {
          lat: n.place.center.coordinates[1],
          lng: n.place.center.coordinates[0]
        };
        delete n.place.center;
      }
      return addContentDigest(n);
    }),
    indexName: "partnership",
    settings: { 
      //attributesToSnippet: [`description.short.markdown:20`] 
    },
  },
];

module.exports = queries;
