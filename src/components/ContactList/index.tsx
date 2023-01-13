import { ContactCard } from "../ContactCard";
import styles from "./ContactList.module.scss";
import * as TYPES from "../../types";
import { useContext, useEffect, useState } from "react";
import { ContactsContext } from "../../Providers/Contactsprovider";
import { ContactDetails } from "../ContactDetails";
import { AddContactForm } from "../AddContactForm";

export const ContactList = () => {
  const {
    isLoading,
    contacts,
    serverError,
    selectedContact,
    getContacts,
    toggleAddNewContact,
    addNewContactMode,
  } = useContext(ContactsContext);

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
          <div className={styles.buttonContainer}>
            <h2>{`Contacts (${contacts.length})`}</h2>
            <button onClick={() => toggleAddNewContact(true)}>
              Add contact
            </button>
          </div>
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
      {addNewContactMode && <AddContactForm />}
    </>
  );
};
