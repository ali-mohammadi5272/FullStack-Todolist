import React, { useEffect, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./todolist.module.scss";
import { addTodoToServer, getTodosFromServer } from "../../Redux/stores/Todos";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Todolist() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state);
  useEffect(() => {
    dispatch(getTodosFromServer());
  }, []);
  const [addDataObject, setAddDataObject] = useState({ title: "" });
  const addTodoHandler = () => {
    if (addDataObject.title) {
      dispatch(addTodoToServer({ title: addDataObject.title }));
      setAddDataObject({ title: "" });
    } else {
      toast.error("Please insert a title !!");
    }
  };
  return (
    <>
      <h1 className={styles.title}>Todolist</h1>
      <div className={styles.todolist}>
        <div className={styles.todolist__addtodoSection}>
          <div className={styles.todolist__inputSection}>
            <input
              value={addDataObject.title}
              onChange={(e) => {
                setAddDataObject({ title: e.target.value });
              }}
              className={styles.todolist__input}
              type="text"
            />
          </div>
          <div className={styles.todolist__btnSection}>
            <button
              type="button"
              onClick={addTodoHandler}
              className={styles.todolist__btn}
            >
              ADD
            </button>
          </div>
        </div>
        {todos.map((todo, index) => (
          <TodoItem key={index} {...todo} />
        ))}
      </div>
    </>
  );
}

export default Todolist;
