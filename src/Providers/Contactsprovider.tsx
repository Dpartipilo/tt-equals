import {
  createContext,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react";
import * as TYPES from "../types";
import axios from "axios";

export const baseURL =
  "https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts";

type TContext = {
  editMode: boolean;
  addNewContactMode: boolean;
  isLoading: boolean;
  contacts: TYPES.ContactProps[];
  selectedContact: TYPES.ContactProps | undefined;
  serverError: unknown;
  getContacts: () => void;
  createContact: (body: TYPES.ContactProps) => void;
  editContact: (id: string, body?: {}) => void;
  deleteContact: (id: string) => void;
  selectContact: (id: string) => void;
  toggleEditMode: (isEditMode?: boolean) => void;
  toggleAddNewContact: (isCreateMode?: boolean) => void;
};

export const ContactsContext = createContext<TContext>({
  editMode: false,
  addNewContactMode: false,
  isLoading: false,
  contacts: [],
  selectedContact: undefined,
  serverError: null,
  getContacts: () => null,
  createContact: () => null,
  editContact: () => null,
  deleteContact: () => null,
  selectContact: () => null,
  toggleEditMode: () => null,
  toggleAddNewContact: () => null,
});

type ContactsProviderProps = { children?: ReactElement };

export const ContactsProvider = ({ children }: ContactsProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [addNewContactMode, setAddNewContactMode] = useState<boolean>(false);
  const [contacts, setContacts] = useState<TYPES.ContactProps[]>([]);
  const [selectedContact, setSelectedContact] = useState<TYPES.ContactProps>();
  const [serverError, setServerError] = useState<unknown>(null);

  const makeRequest = useCallback(
    async (method: string, url: string, body?: {}) => {
      setIsLoading(true);

      try {
        const resp = await axios({
          method,
          url,
          data: body,
        });

        const data = await resp?.data;
        return data;
      } catch (error) {
        console.log(error);
        setServerError(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getContacts = useCallback(async () => {
    const contacts = await makeRequest("get", baseURL);
    setContacts(contacts);
  }, [makeRequest]);

  const editContact = useCallback(
    async (id: string, body?: {}) => {
      const editedContact = await makeRequest("put", `${baseURL}/${id}`, body);
      const index = contacts.findIndex((c) => c.id === editedContact.id);
      const newContacts = [...contacts];
      newContacts[index] = editedContact;

      setSelectedContact(editedContact);
      setContacts(newContacts);
    },
    [makeRequest, contacts]
  );

  const createContact = useCallback(
    async (body: TYPES.ContactProps) => {
      const newContact = await makeRequest("post", baseURL, body);
      const newContacts = [...contacts, newContact];

      setContacts(newContacts);
    },
    [contacts, makeRequest]
  );

  const deleteContact = useCallback(
    async (id: string) => {
      await makeRequest("delete", `${baseURL}/${id}`);
      const index = contacts.findIndex((c) => c.id === id);
      const newContacts = [...contacts];
      newContacts.splice(index, 1);

      setSelectedContact(undefined);
      setContacts(newContacts);
    },
    [makeRequest, contacts]
  );

  const toggleEditMode = useCallback((isEditMode?: boolean) => {
    setEditMode(isEditMode || false);
  }, []);

  const toggleAddNewContact = useCallback((isCreateMode?: boolean) => {
    setAddNewContactMode(isCreateMode || false);
  }, []);

  const selectContact = useCallback(
    (id: string) => {
      const selectedContact = contacts.find((contact) => contact.id === id);
      setSelectedContact(selectedContact);
    },
    [contacts]
  );

  const providerValue = useMemo(() => {
    return {
      isLoading,
      editMode,
      addNewContactMode,
      contacts,
      selectedContact,
      serverError,
      getContacts,
      createContact,
      editContact,
      deleteContact,
      selectContact,
      toggleEditMode,
      toggleAddNewContact,
    };
  }, [
    isLoading,
    editMode,
    addNewContactMode,
    contacts,
    selectedContact,
    serverError,
    getContacts,
    createContact,
    editContact,
    deleteContact,
    selectContact,
    toggleEditMode,
    toggleAddNewContact,
  ]);

  return (
    <ContactsContext.Provider value={providerValue}>
      {children}
    </ContactsContext.Provider>
  );
};
