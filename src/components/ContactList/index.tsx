import { ContactCard } from "../ContactCard";
import styles from "./ContactList.module.scss";
import * as TYPES from "../../types";

type ContactsListProps = {
  contacts: TYPES.ContactProps[];
};

export const ContactList = (props: ContactsListProps) => {
  const { contacts } = props;
  return (
    <div className={styles.main}>
      <h2>Contacts</h2>
      <div className={styles.contactsContainer}>
        {contacts.map((contact: TYPES.ContactProps) => (
          <ContactCard key={contact.id} {...contact} />
        ))}
      </div>
    </div>
  );
};
