import { FormEvent, useContext, useState } from "react";
import { ContactsContext } from "../../Providers/Contactsprovider";
import styles from "./AddContactForm.module.scss";
import { InputText } from "../InputText";
import { v4 as uuidv4 } from "uuid";

export const AddContactForm = () => {
  const { toggleAddNewContact, createContact } = useContext(ContactsContext);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newBirthday, setNewBirthday] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      id: uuidv4(),
      name: newName,
      email: newEmail,
      avatar: newAvatar,
      phone: newPhone,
      birthday: newBirthday,
      createdAt: new Date().toISOString(),
    });
    toggleAddNewContact(false);
    createContact({
      id: uuidv4(),
      name: newName,
      email: newEmail,
      avatar: newAvatar,
      phone: newPhone,
      birthday: newBirthday,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.addContact}>
        <h2>New contact</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputText
            id="name-input"
            label="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <InputText
            id="email-input"
            label="Email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <InputText
            id="avatar-input"
            label="Avatar URL"
            // type="url"
            value={newAvatar}
            onChange={(e) => setNewAvatar(e.target.value)}
          />
          <InputText
            id="phone-input"
            label="Phone"
            type="tel"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
          <InputText
            id="birthday-input"
            label="Birthday"
            type="date"
            value={newBirthday}
            onChange={(e) => setNewBirthday(e.target.value)}
          />

          <div className={styles.buttonContainer}>
            <button onClick={() => toggleAddNewContact(false)}>Close</button>
            <button className={styles.create} type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
