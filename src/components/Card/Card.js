import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

function Card({ code }) {
  return (
    <li className={ClassNames(styles.Card, 'animate__fadeInDownBig')}>
      <img className={styles.Image} src={`${process.env.PUBLIC_URL}/assets/cards/${code}.svg`} alt="" />
    </li>
  );
};

Card.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Card;
