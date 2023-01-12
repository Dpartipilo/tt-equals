import { ContactCard } from "../ContactCard";
import styles from "./ContactList.module.scss";
import * as TYPES from "../../types";
import { useContext, useEffect } from "react";
import { ContactsContext } from "../../Providers/Contactsprovider";

// type ContactsListProps = {
//   contacts: TYPES.ContactProps[];
// };

const baseURL = "https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts";

export const ContactList = () => {
  const { isLoading, contacts, serverError, fetchData } =
    useContext(ContactsContext);

  useEffect(() => {
    fetchData("get", baseURL);
  }, [fetchData]);

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
    </>
  );
};
