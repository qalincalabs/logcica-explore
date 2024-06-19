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

const productsQuery = `
{
  products: allMongodbProducts {
    nodes {
      _id
      name
      dimensions {
        height{
        
          value
        }
        length{
          
          value
        }
        width{
          
          value
        }
      }
      netWeight {
        
        value
      }
      producer {
        activity
        organisation
        workspace
      }
      categories {
        name
      }
      tags
      references {
        id
      }
      availabilities {
        id
      }
      owner {
        activity {
          id
        }
        organisation {
          id
        }
        workspace {
          id
        }
      }
      ownerRoles
      consumerStorageInstructions {
        short {
          markdown
        }
      }
      consumerUsageInstructions {
        short {
          markdown
        }
      }
      description {
        short {
          markdown
        }
      }
      ingredientStatement {
        short {
          markdown
        }
      }
      originStatement {
        short {
          markdown
        }
      }
      mainImage {
        url
      }
      alcoholPercentage
      
      netContent {
       
      
        value
      }
      weight {
        unit
        value
      }
      producerReference
      ownerReference
    }
  }
}
`;

const CountersQuery = `
{
  Counters: allMongodbCounters {
    nodes {
      _id
      key
      name
      workspace
      internalName
      type
      marketplace
      place {
        id
      }
      catalog {
        id
      }
      availabilities
      description {
        short {
          markdown
        }
      }
      manager {
        organisation {
          id
        }
      }
      updatedAt
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
      return addContentDigest(n);
    }),
    indexName: "partnership",
    settings: { 
      //attributesToSnippet: [`description.short.markdown:20`] 
    },
  },
  {
    query: productsQuery,
    transformer: ({ data }) => data.products.nodes.map(n => {
      n.objectID = n._id;
      delete n._id;
      return addContentDigest(n);
    }),
    indexName: "product",
    settings: { 
      //attributesToSnippet: [`description.short.markdown:20`] 
    },
  },
  {
    query: CountersQuery,
    transformer: ({ data }) => data.Counters.nodes.map(n => {
      n.objectID = n._id;
      delete n._id;
      return addContentDigest(n);
    }),
    indexName: "marketplace",
    settings: { 
      //attributesToSnippet: [`description.short.markdown:20`] 
    },
  },
];

module.exports = queries;
