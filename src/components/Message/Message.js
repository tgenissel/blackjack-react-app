import FocusTrap from 'react-focus-trap';
import { STATUSES } from '../../constants';
import styles from './Message.module.scss';

const {
  BLACKJACK,
  PLAYER_WINS,
  DEALER_WINS,
} = STATUSES;

const Blackjack = () => <div className={styles.Blackjack}>BLACKJACK!</div>;
const YouWin = () => <div className={styles.YouWin}>YOU WIN!</div>;
const YouLose = () => <div className={styles.YouLose}>DEALER WINS...</div>;

function Message({ gameStatus, children }) {
  let Message = null;
  switch (gameStatus) {
    case BLACKJACK:
      Message = Blackjack;
      break;
    case PLAYER_WINS:
      Message = YouWin;
      break
    case DEALER_WINS:
      Message = YouLose;
      break;
    default:
      Message = null;
  }

  if (!Message) return null;

  return (
    <>
      <div className={styles.Overlay}></div>
      <FocusTrap>
          <div
            className={styles.Dialog}
            role="dialog"
            aria-labelledby="dialog1Title"
          >
            <div
              className={styles.Message}
              aria-live="polite"
              id="dialog-message"
            >
              <Message />
            </div>
            {children}
          </div>
      </FocusTrap>
    </>
  );
}

export default Message;
