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

const HitsInIndex = ({ index }: any) => {
  return (
    <Index indexName={index.name}>
      <MyHits index={index} />
    </Index>
  );
};

const MyHits = ({ index }: any) => {
  const { nbHits } = useStats();

  if (nbHits === 0) return <></>;

  return (
    <>
      <div className="HitHeader">
        <h4>
          {index.name === "activity"
            ? "Producteurs"
            : index.name === "partnership"
              ? "Groupements"
              : index.name === "product"
                ? "Produits"
                : index.name === "marketplace"
                  ? "Marchés"
                  : index.name === "recipe"
                    ? "Recettes"
                    : index.name === "event"
                      ? "Événements"
                      : "aucune valeur"}
        </h4>
        <h4>
          <HitCount />
        </h4>
      </div>

      <Hits
        className="Hits"
        hitComponent={({ hit }) => <PageHit hit={hit} indexName={index.name} />}
      />
    </>
  );
};

const SearchResult = ({ indices, className }: any) => (
  <div className={className}>
    {indices.map((index: any) => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </div>
);

export default SearchResult;
