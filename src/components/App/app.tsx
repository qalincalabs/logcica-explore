import React, {useMemo, useState} from 'react';
//import {ReactComponent as Logo} from '../../assets/logo';
//import './App.css';
import {InstantSearch, Hits, Configure, RefinementList} from 'react-instantsearch'
import {indexName, searchClient} from "../../utils/AlgoliaClient";
import {GeoHit} from "../../utils/StoreHit";
import StoreComponent from "../StoreComponent/StoreComponent";
import Header from "../Header/header";
//import Map from "../Map/map"
import {LngLat} from "../../utils/LngLat";
import algoliasearch from 'algoliasearch';


function App() {

  const [currentStore, setCurrentStore] = useState<GeoHit | null>(null)
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )


  return (
    <div className="flex w-full h-full flex-col">

      
      <Header></Header>
      <InstantSearch searchClient={searchClient} indexName="stores">
        <Configure
          aroundLatLngViaIP={!currentStore}
          aroundLatLng={currentStore ? `${currentStore._geoloc.lng},${currentStore._geoloc.lat}` : ''}
          analytics={true}
        />
        <div className={'flex h-full w-full'}>
          <div className={'flex flex-col w-1/4'}>
            <div className={'m-2'}>
              <RefinementList attribute={'services'}/>
            </div>

            <Hits<GeoHit> hitComponent={hit => <StoreComponent store={hit.hit} onClick={(store) => setCurrentStore(store)} currentStore={currentStore}  key={hit.hit.objectID}/>}/>
          </div>
          <div className={'flex flex-col w-full'}>
            {/*<Map currentStore={currentStore ? [currentStore._geoloc.lng, currentStore._geoloc.lat] : null} onClickMarker={(storeCoordinate => {})}/> */}
          </div>
        </div>
      </InstantSearch>

      </div>
  );
}

export default App;