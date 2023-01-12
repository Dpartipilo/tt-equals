import { ContactCard } from "../ContactCard";
import styles from "./ContactList.module.scss";
import * as TYPES from "../../types";
import { useContext, useEffect } from "react";
import { ContactsContext, baseURL } from "../../Providers/Contactsprovider";
import { ContactDetails } from "../ContactDetails";

export const ContactList = () => {
  const { isLoading, contacts, serverError, selectedContact, getContacts } =
    useContext(ContactsContext);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  return (
    <>
      {!isLoading && serverError ? (
        <span>serverError</span>
      ) : isLoading ? (
        <span>is loading...</span>
      ) : (
        <div className={styles.main}>
          <h2>Contacts</h2>
          <div className={styles.contactsContainer}>
            {contacts.map((contact: TYPES.ContactProps) => (
              <ContactCard key={contact.id} {...contact} />
            ))}
          </div>
        </div>
      )}

      {selectedContact && (
        <div>
          <ContactDetails />
        </div>
      )}
    </>
  );
};
