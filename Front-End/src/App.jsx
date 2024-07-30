import { ToastContainer } from "react-toastify";
import styles from "./App.module.css";
import Todolist from "./components/Todolist/Todolist";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className={styles.app}>
      <Todolist />
      <ToastContainer />
    </div>
  );
}

export default App;
