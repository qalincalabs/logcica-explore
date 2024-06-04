import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { GeoHit } from '../utiles/StoreHit';

const MapMarkers = ({ stores, onClick }: { stores: GeoHit[]; onClick: (store: GeoHit) => void }): JSX.Element => {
  return (
    <>
      {stores.map((store) => (
        <Marker
          key={store.objectID}
          position={[store._geoloc.lat, store._geoloc.lng]}
          eventHandlers={{
            click: () => {
              onClick(store);
            },
          }}
        >
          <Popup>
            <div>
              <h2>{store.name}</h2>
              <p>{store.city}, {store.country}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MapMarkers;
