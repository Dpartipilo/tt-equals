import { useContext } from "react";
import { ContactsContext } from "../../Providers/Contactsprovider";
import * as TYPES from "../../types";
import styles from "./ContactCard.module.scss";

export const ContactCard = (props: TYPES.ContactProps) => {
  const { selectContact } = useContext(ContactsContext);
  const { name, avatar, id } = props;
  return (
    <button className={styles.main} onClick={() => selectContact(id)}>
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
