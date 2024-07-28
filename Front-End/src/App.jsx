import styles from "./App.module.css";
import Todolist from "./components/Todolist/Todolist";

function App() {
  return (
    <div className={styles.app}>
      <Todolist />
    </div>
  );
}

export default App;
