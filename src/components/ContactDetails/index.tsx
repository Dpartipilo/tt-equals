import { useContext, useState } from "react";
import { ContactsContext } from "../../Providers/Contactsprovider";
import styles from "./ContactDetails.module.scss";
import { InputText } from "../InputText";

export const ContactDetails = () => {
  const {
    selectedContact,
    selectContact,
    editMode,
    toggleEditMode,
    editContact,
  } = useContext(ContactsContext);
  const { id, avatar, name, email, phone, birthday, createdAt } =
    selectedContact!;

  const [editedName, setEditName] = useState(name);
  const [editedEmail, setEditEmail] = useState(email);
  const [editedPhone, setEditPhone] = useState(phone);
  const [editedBirthday, setEditBirthday] = useState(birthday);

  const handleCancelEdit = () => {
    setEditName(name);
    setEditEmail(email);
    setEditPhone(phone);
    setEditPhone(birthday);
    toggleEditMode(false);
  };

  const handleSaveEdit = () => {
    editContact(id, {
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
      birthday: editedBirthday,
    });
    toggleEditMode(false);
  };

  const handleClose = () => {
    handleCancelEdit();
    selectContact("");
  };

  return (
    <div className={styles.main}>
      <div className={styles.detailsCard}>
        <div className={styles.mainDetails}>
          <div className={styles.nameContainer}>
            <span className={styles.avatar}>
              <img src={avatar} alt="contact avatar" />
            </span>

            {editMode ? (
              <InputText
                id="name-input"
                value={editedName}
                onChange={(e) => setEditName(e.target.value)}
              />
            ) : (
              <span className={styles.name}>{name ? name : "N/A"}</span>
            )}

            {editMode ? (
              <InputText
                id="email-input"
                value={editedEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            ) : (
              <span className={styles.email}>{email ? email : "N/A"}</span>
            )}
          </div>

          <div className={styles.buttonContainer}>
            {!editMode && (
              <button onClick={() => toggleEditMode(true)}>Edit</button>
            )}

            {editMode && (
              <>
                <button onClick={() => handleCancelEdit()}>Cancel</button>
                <button onClick={() => handleSaveEdit()}>Save</button>
              </>
            )}
          </div>
        </div>

        <div className={styles.secondaryDetails}>
          <div className={styles.detailContainer}>
            <label>Phone</label>

            {editMode ? (
              <InputText
                id="phone-input"
                value={editedPhone}
                onChange={(e) => setEditPhone(e.target.value)}
              />
            ) : (
              <span className={styles.phone}>{phone ? phone : "N/A"}</span>
            )}
          </div>

          <div className={styles.detailContainer}>
            <label>Birthday</label>

            {editMode ? (
              <InputText
                id="phone-input"
                type="date"
                value={editedBirthday?.replace(/T.+/g, "")}
                onChange={(e) => setEditBirthday(e.target.value)}
              />
            ) : (
              <span className={styles.birthday}>
                {birthday ? new Date(birthday!).toDateString() : "N/A"}
              </span>
            )}
          </div>
          <div className={styles.detailContainer}>
            <label>Member since</label>
            <span className={styles.createdAt}>
              {createdAt ? new Date(createdAt!).toDateString() : "N/A"}
            </span>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={() => handleClose()}>Close</button>
        </div>
      </div>
    </div>
  );
};
