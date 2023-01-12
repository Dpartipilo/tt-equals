import {
  createContext,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react";
import * as TYPES from "../types";
import axios from "axios";

type TContext = {
  isLoading: boolean;
  contacts: TYPES.ContactProps[];
  selectedContact: TYPES.ContactProps | undefined;
  serverError: unknown;
  fetchData: (method: string, url: string, body?: {}) => void;
  selectContact: (id: string) => void;
};

export const ContactsContext = createContext<TContext>({
  isLoading: false,
  contacts: [],
  selectedContact: undefined,
  serverError: null,
  fetchData: () => null,
  selectContact: () => null,
});

type ContactsProviderProps = { children?: ReactElement };

export const ContactsProvider = ({ children }: ContactsProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contacts, setContacts] = useState<TYPES.ContactProps[]>([]);
  const [selectedContact, setSelectedContact] = useState<TYPES.ContactProps>();
  const [serverError, setServerError] = useState<unknown>(null);

  const fetchData = useCallback(
    async (method: string, url: string, body?: {}) => {
      setIsLoading(true);
      try {
        const resp = await axios({
          method,
          url,
          data: body,
        });

        const data = await resp?.data;

        setContacts(data);
      } catch (error) {
        console.log(error);
        setServerError(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

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
      contacts,
      selectedContact,
      serverError,
      fetchData,
      selectContact,
    };
  }, [
    isLoading,
    contacts,
    selectedContact,
    serverError,
    fetchData,
    selectContact,
  ]);

  return (
    <ContactsContext.Provider value={providerValue}>
      {children}
    </ContactsContext.Provider>
  );
};
