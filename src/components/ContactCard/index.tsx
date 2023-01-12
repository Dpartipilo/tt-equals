import * as TYPES from "../../types";
import styles from "./ContactCard.module.scss";

export const ContactCard = (props: TYPES.ContactProps) => {
  const { name, avatar } = props;
  return (
    <button className={styles.main} onClick={() => console.log("hello")}>
      {/* <div className={styles.equalSymbol}>
        <span className={styles.rectangle} />
        <span className={styles.rectangle} />
      </div> */}

      <div className={styles.avatarContainer}>
        <span className={styles.avatar}>
          <img src={avatar} alt="contact avatar" />
        </span>
      </div>
      <div className={styles.name}>
        <span>{name}</span>
      </div>
    </button>
  );
};
