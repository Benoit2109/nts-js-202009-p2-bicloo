import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import CardList from './CardList';

import styles from '../css/listSlider.module.css';

function ListSlider({
  bikesIsChecked,
  standsIsChecked,
  bankingIsChecked,
  stations,
  handleRoutingControl,
}) {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
  };

  return (
    <div className={styles.container}>
      <Slider className={styles.slider} {...settings}>
        {stations
          .filter((station) => {
            if (bankingIsChecked) {
              return station.banking === 'True';
            }
            return station;
          })
          .filter((station) => {
            if (bikesIsChecked) {
              return station.availableBikes > 0;
            }
            return station;
          })
          .filter((station) => {
            if (standsIsChecked) {
              return station.availableBikeStand > 0;
            }
            return station;
          })
          .map((station) => {
            return (
              <CardList
                key={station.id}
                station={station}
                handleRoutingControl={handleRoutingControl}
              />
            );
          })}
      </Slider>
    </div>
  );
}

ListSlider.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
  handleRoutingControl: PropTypes.func.isRequired,
};

export default ListSlider;
