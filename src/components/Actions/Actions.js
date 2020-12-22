import PropTypes from 'prop-types';
import Button, { buttonColors } from '../Button/Button'
import styles from './Actions.module.scss';

function Actions({ playerHit, playerStand, disabled}) {
  return (
    <div className={styles.Actions}>
      <Button
        disabled={disabled}
        onClick={playerStand}
        color={buttonColors.WARNING}
        emoji="🖐"
      >
        Stand
      </Button>
      <Button
        disabled={disabled}
        onClick={playerHit}
        color={buttonColors.SUCCESS}
        emoji="👉"
      >
        Hit
      </Button>
    </div>
  );
}

Actions.propTypes = {
  playerHit: PropTypes.func.isRequired,
  playerStand: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Actions;
