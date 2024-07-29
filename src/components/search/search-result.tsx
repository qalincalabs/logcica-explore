import { Link } from "gatsby";
import React from "react";
import {
  Highlight,
  Hits,
  Index,
  PoweredBy,
  Snippet,
  useStats,
} from "react-instantsearch";

const HitCount = () => {
  const { nbHits } = useStats();

  return nbHits > 0 ? (
    <span className="HitCount">
      {nbHits} résultat{nbHits !== 1 ? "s" : ""}
    </span>
  ) : null;
};

const PageHit = ({ hit, indexName }: any) => {
  return (
    <div>
      <Link
        to={
          indexName === "product"
            ? `/activity/${hit.producer?.activity?._id}/#${hit.objectID}`
            : `/${indexName}/${hit.objectID}`
        }
      >
        <h4>
          <Highlight attribute="name" hit={hit} />
        </h4>
      </Link>
      <Snippet attribute="description.short.markdown" hit={hit} />
    </div>
  );
};

const HitsInIndex = ({ index }: any) => (
  <Index indexName={index.name}>
    <div className="HitHeader">
      <h2>
        {index.name === "activity"
          ? "Producteurs"
          : index.name === "partnership"
            ? "Groupements"
            : index.name === "product"
              ? "Produits"
              : index.name === "marketplace"
                ? "Marchés"
                : "aucune valeur"}
      </h2>
      <HitCount />
    </div>
    <Hits
      className="Hits"
      hitComponent={({ hit }) => <PageHit hit={hit} indexName={index.name} />}
    />
  </Index>
);

const SearchResult = ({ indices, className }: any) => (
  <div className={className}>
    {indices.map((index: any) => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </div>
);

export default SearchResult;