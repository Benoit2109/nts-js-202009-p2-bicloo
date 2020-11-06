import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useWindowSize } from 'react-use';
import L from 'leaflet';
import 'leaflet-routing-machine';

import ListSlider from './ListSlider';
import BikesMap from './BikesMap';
import StationsList from './StationsList';
import Button from './Button';
import logoMap from '../assets/icons/map.svg';
import logoList from '../assets/icons/list.svg';
import styles from '../css/WrapperStation.module.css';
import buttonStyles from '../css/Button.module.css';

const WrapperStation = ({
  stations,
  bikesIsChecked,
  standsIsChecked,
  bankingIsChecked,
}) => {
  const [display, setdisplay] = useState(true);
  const zoom = 13;
  const [coords, setCoords] = useState([47.214938, -1.556287]);
  const [stationCoords, setstationCoords] = useState(null);

  const { width } = useWindowSize();
  const mapRef = useRef();
  let routingControl = null;

  const handleDisplay = () => {
    setdisplay(!display);
  };

  const handleOnLocationFound = (e) => {
    const { current } = mapRef;
    const { leafletElement: map } = current;

    const { latlng } = e;
    const marker = L.marker(latlng);
    marker.addTo(map);
    setCoords(latlng);
  };

  /*
    supprimer un itinéraire:
    si routingControl n'est pas nul
    je supprime l'itinéraire
    et remet routingControl à nul
  */
  const removeRoutingControl = () => {
    const { current } = mapRef;
    const { leafletElement: map } = current;

    map.removeControl(routingControl);
    routingControl = null;
  };

  /*
    ajouter un itinéraire:
    je vérifie qu'il n'y a pas déjà un itinéraire
    si oui, j'appel removeRoutingCnotrol()
    sinon je le créer et l'ajoute à la carte
  */
  const addRoutingControl = (waypoints) => {
    const { current } = mapRef;
    const { leafletElement: map } = current;
    if (routingControl != null) {
      removeRoutingControl();
    }
    routingControl = L.Routing.control({
      waypoints: [L.latLng(coords), L.latLng(waypoints)],
      lineOptions: {
        styles: [{ color: 'lightgreen', opacity: 1, weight: 5 }],
      },
    }).addTo(map);
  };

  /*
    dans CardList, au click
    je créer un itinéraire
    entre ma position et la position de la station
  */
  const handleRoutingControl = (position) => {
    setstationCoords(position);
  };

  useEffect(() => {
    const { current } = mapRef;
    const { leafletElement: map } = current;
    map.locate({ setView: true });
    map.on('locationfound', handleOnLocationFound);
  }, []);

  useLayoutEffect(() => {
    addRoutingControl(stationCoords);
    return () => {
      removeRoutingControl();
    };
  }, [stationCoords]);

  return (
    <main>
      <nav className={styles.nav}>
        <Button
          value="Carte"
          logo={logoMap}
          className={
            display ? buttonStyles.buttonActive : buttonStyles.buttonDisable
          }
          handleDisplay={handleDisplay}
        />
        <Button
          value="Liste"
          logo={logoList}
          className={
            display ? buttonStyles.buttonDisable : buttonStyles.buttonActive
          }
          handleDisplay={handleDisplay}
        />
      </nav>
      {display && width < 768 ? (
        <BikesMap
          ref={mapRef}
          zoom={zoom}
          coords={coords}
          stations={stations}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
          handleRoutingControl={handleRoutingControl}
          display={display}
        />
      ) : (
        <StationsList
          stations={stations}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
          display={display}
        />
      )}
      <div className={styles.desktop}>
        <BikesMap
          ref={mapRef}
          zoom={zoom}
          coords={coords}
          stations={stations}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
          handleRoutingControl={handleRoutingControl}
          display={display}
        />
        <ListSlider
          stations={stations}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
          handleRoutingControl={handleRoutingControl}
          display={display}
        />
      </div>
    </main>
  );
};

export default WrapperStation;

WrapperStation.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
};
