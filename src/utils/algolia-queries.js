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

const recipesQuery = `
{
  recipes: allMongodbRecipes {
    nodes {
      _id
      name
      area
      categories {
        name
      }
      author {
        organisation {
          name
        }
        partnership {
          name
        }
      }
      costCategory {
        name
      }
      difficulty {
        name
      }
      seasonality {
        name
      }
      description {
        short {
          markdown
        }
      }
      cookTime
      prepTime
      totalTime
      ingredientList {
        name
      }
    }
  }
}
`;

const sessionsQuery = `
{
  sessions: allMongodbSessions {
    nodes {
      _id
      name
      manager {
        activity {
          name
        }
        organisation {
          name
        }
        partnership {
          name
        }
      }
      description {
        short {
          markdown
        }
        long {
          markdown
        }
      }
      timeRange {
        from
        to
      }
      place {
        title
        address {
          street
          locality
        }
      }
      profiles {
        type
        localKey
        key
        link
      }
      categories {
        name
      }
    }
  }
}
`;

const addContentDigest = (obj) => {
  const content = JSON.stringify(obj);
  const digest = crypto.createHash("md5").update(content).digest("hex");
  obj.internal = {
    contentDigest: digest,
  };
  return obj;
};

const indexBaseSettings = {
  queryLanguages: ["fr"],
  indexLanguages: ["fr"],
  removeStopWords: true,
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
      ...indexBaseSettings,
      attributesForFaceting: [
        "searchable(categories.name)",
        "type",
        "searchable(place.address.locality)",
        "searchable(place.within.name)",
      ],
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
      ...indexBaseSettings,
      attributesForFaceting: ["searchable(categories.name)"],
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
      ...indexBaseSettings,
      attributesForFaceting: [
        "searchable(categories.name)",
        "searchable(producer.organisation.name)",
        "searchable(owner.organisation.name)",
      ],
    },
  },
  {
    query: recipesQuery,
    transformer: ({ data }) =>
      data.recipes.nodes.map((n) => {
        n.objectID = n._id;
        delete n._id;
        return addContentDigest(n);
      }),
    indexName: "recipe",
    settings: {
      ...indexBaseSettings,
    },
  },
  {
    query: sessionsQuery,
    transformer: ({ data }) =>
      data.sessions.nodes.map((n) => {
        n.objectID = n._id;
        delete n._id;
        return addContentDigest(n);
      }),
    indexName: "event",
    settings: {
      ...indexBaseSettings,
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
      ...indexBaseSettings,
      attributesForFaceting: [
        "searchable(type)",
        "searchable(marketplace.name)",
        "searchable(manager.organisation.name)",
        "searchable(place.address.locality)",
        "searchable(place.within.name)",
      ],
    },
  },
];

module.exports = queries;
