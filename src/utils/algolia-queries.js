const crypto = require("crypto");

const catalogFieldsFragment = `
fragment CatalogFields on mongodbCatalogs {
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
`;

const placeFieldsFragment = `
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
        ...CatalogFields
      }
    }
  }
}

${catalogFieldsFragment}
${placeFieldsFragment}
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
      categories {
        name
      }
      producer {
        activity {
          _id
          name
        }
        organisation {
          name
        }
      }
      owner {
        activity {
          name
        }
        organisation {
          name
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
    }
  }
}
`;

const countersQuery = `
{
  counters: allMongodbCounters(filter: { type: { eq: "marketplace" } }) {
    nodes {
      _id
      name
      type
      marketplace {
        name
      }
      place {
        ...PlaceFields
      }
      catalog {
        ...CatalogFields
      }
      description {
        short {
          markdown
        }
      }
      manager {
        organisation {
          name
        }
      }
    }
  }
}

${placeFieldsFragment}
${catalogFieldsFragment}
`;

const addContentDigest = (obj) => {
  const content = JSON.stringify(obj);
  const digest = crypto.createHash("md5").update(content).digest("hex");
  obj.internal = {
    contentDigest: digest,
  };
  return obj;
};

const queries = [
  {
    query: activitiesQuery,
    transformer: ({ data }) =>
      data.activities.nodes.map((n) => {
        n.objectID = n._id;
        delete n._id;
        if (n.place?.center?.coordinates) {
          n._geoloc = {
            lat: n.place.center.coordinates[1],
            lng: n.place.center.coordinates[0],
          };
          delete n.place.center;
        }
        return addContentDigest(n);
      }),
    indexName: "activity",
    settings: {
      queryLanguages: ['fr'],
      removeStopWords: true,
      attributesForFaceting: ['searchable(categories.name)', 'type', 'place.address.locality', 'catalogs.productCategories.name'],
    },
  },
  {
    query: partnershipsQuery,
    transformer: ({ data }) =>
      data.partnerships.nodes.map((n) => {
        n.objectID = n._id;
        delete n._id;
        return addContentDigest(n);
      }),
    indexName: "partnership",
    settings: {
      queryLanguages: ['fr'],
      removeStopWords: true,
      attributesForFaceting: ['searchable(categories.name)', 'mainOrganisation.name'],
    },
  },
  {
    query: productsQuery,
    transformer: ({ data }) =>
      data.products.nodes.map((n) => {
        n.objectID = n._id;
        delete n._id;
        return addContentDigest(n);
      }),
    indexName: "product",
    settings: {
      queryLanguages: ['fr'],
      removeStopWords: true,
      attributesForFaceting: ['searchable(categories.name)', 'producer.organisation.name', 'owner.organisation.name'],
    },
  },
  {
    query: countersQuery,
    transformer: ({ data }) =>
      data.counters.nodes.map((n) => {
        n.objectID = n._id;
        delete n._id;
        if (n.place?.center?.coordinates) {
          n._geoloc = {
            lat: n.place.center.coordinates[1],
            lng: n.place.center.coordinates[0],
          };
          delete n.place.center;
        }
        return addContentDigest(n);
      }),
    indexName: "marketplace",
    settings: {
      queryLanguages: ['fr'],
      removeStopWords: true,
      attributesForFaceting: ['searchable(type)', 'marketplace.name', 'manager.organisation.name', 'place.address.locality', 'catalog.productCategories.name'],
    },
  },
];

module.exports = queries;
