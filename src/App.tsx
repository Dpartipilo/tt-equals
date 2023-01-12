import { ContactList } from "./components/ContactList";
import { useFetch } from "./hooks/useFetch";
import styles from "./App.module.scss";
import { Header } from "./components/Header";

const baseURL = "https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts";

function App() {
  const { contacts, isLoading, serverError } = useFetch("get", baseURL);

  console.log(contacts);
  return (
    <div className={styles.main}>
      <Header />
      {!isLoading && serverError ? (
        <span>serverError</span>
      ) : isLoading ? (
        <span>is loading...</span>
      ) : (
        <ContactList contacts={contacts} />
      )}
    </div>
  );
}

export default App;
