import React from 'react';
import PropTypes from 'prop-types';

const CardList = ({ name, bike, stands, address, banking }) => {
  return (
    <li>
      <h2>{name}</h2>
      <p>
        Velos disponibles:
        {bike}
      </p>
      <p>
        Places disponibles:
        {stands}
      </p>
      <p>
        Adresse:
        {address}
      </p>
      <button type="button">Itinéraire</button>
      <p>{banking === 'True' ? 'Avec bornes' : 'Sans bornes'}</p>
    </li>
  );
};

export default CardList;

CardList.propTypes = {
  name: PropTypes.string.isRequired,
  bike: PropTypes.number.isRequired,
  stands: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  banking: PropTypes.string.isRequired,
};
