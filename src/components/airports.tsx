import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { useSearchBox, useGeoSearch } from 'react-instantsearch';
import type { GeoHit } from 'react-instantsearch';

type Airport = {
  name: string;
};

export function Airports() {
  const { query, refine: refineQuery } = useSearchBox();
  const {
    items,
    refine: refineItems,
    currentRefinement,
    clearMapRefinement,
  } = useGeoSearch<Airport>();

  const [previousQuery, setPreviousQuery] = useState(query);
  const [skipViewEffect, setSkipViewEffect] = useState(false);

  // When the user moves the map, we clear the query if necessary to only
  // refine on the new boundaries of the map.
  const onViewChange = ({ target }: any) => {
    setSkipViewEffect(true);

    if (query.length > 0) {
      refineQuery('');
    }

    refineItems({
      northEast: target.getBounds().getNorthEast(),
      southWest: target.getBounds().getSouthWest(),
    });
  };

  const map = useMapEvents({
    zoomend: onViewChange,
    dragend: onViewChange,
  });

  // When the query changes, we remove the boundary refinement if necessary and
  // we center the map on the first result.
  if (query !== previousQuery) {
    if (currentRefinement) {
      clearMapRefinement();
    }

    // `skipViewEffect` allows us to bail out of centering on the first result
    // if the query has been cleared programmatically.
    if (items.length > 0 && !skipViewEffect) {
      map.setView(items[0]._geoloc);
    }

    setSkipViewEffect(false);
    setPreviousQuery(query);
  }

  return (
    <>
      {items.map((item) => (
        <Marker
          key={item.objectID}
          position={item._geoloc}
          icon={createAirportIcon(item)}
        >
          <Popup>
            <strong>{item.name}</strong>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function createAirportIcon(item: GeoHit<Airport>) {
  return new DivIcon({
    html: `<div class="marker">${item.name}</div>`,
    popupAnchor: [0, -15],
  });
}