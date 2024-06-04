import React, { useEffect, useState } from 'react';
import { GeoHit } from "../../utils/StoreHit";

interface StoreComponentProps {
  store: GeoHit;
  onClick: (store: GeoHit) => void;
  currentStore?: GeoHit | null;
}

const StoreComponent: React.FC<StoreComponentProps> = ({ store, onClick, currentStore }) => {
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    if (store && store.objectID) {
      setSelected(currentStore?.objectID === store.objectID);
    }
  }, [currentStore, store]);

  if (!store || !store.objectID) {
    return null; // ou un autre rendu par défaut pour les données manquantes
  }

  return (
    <article
      className={`${isSelected ? 'bg-purple-100 hover:bg-purple-50 ring ring-purple-800' : 'bg-white hover:bg-gray-50'} overflow-hidden shadow-lg rounded-lg m-0 cursor-pointer m-1 p-4 py-0 flex`}
      onClick={() => onClick(store)}
    >
      
      <div className="sm:p-6">
        <h2 className="font-medium text-lg">{store.name}</h2>
        {store.city && store.country && (
          <p className="font-normal text-sm">
            {store.city} {store.country}
          </p>
        )}
        {store.services && store.services.length > 0 && (
          <div className="flex gap-2 my-2 flex-wrap">
            {store.services.map((service: string) => (
              <span
                key={`${service}-${store.objectID}`}
                className="bg-purple-100 text-sm font-normal text-purple-800 px-2 gap-1 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default StoreComponent;
