import { ContactList } from "./components/ContactList";
import styles from "./App.module.scss";
import { Header } from "./components/Header";
import { ContactsProvider } from "./Providers/Contactsprovider";

function App() {
  return (
    <div className={styles.main}>
      <Header />
      <ContactsProvider>
        <ContactList />
      </ContactsProvider>
    </div>
  );
}

export default App;
