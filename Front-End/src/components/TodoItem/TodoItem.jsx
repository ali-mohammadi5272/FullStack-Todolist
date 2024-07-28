import React from "react";
import styles from "./todoItem.module.scss";
import { useDispatch } from "react-redux";
import {
  removeTodoFromServer,
  sendCompleteTodoToServer,
} from "../../Redux/stores/Todos";

function TodoItem({ title, isCompleted, _id }) {
  const dispatch = useDispatch();
  const completeTodoHandler = () => {
    dispatch(sendCompleteTodoToServer({ _id, isCompleted: !isCompleted }));
  };
  const removeTodoHandler = () => {
    dispatch(removeTodoFromServer(_id));
  };
  return (
    <div className={styles.todoItem}>
      <section className={styles.todoItem__titleSection}>
        <h3
          className={`${styles.todoItem__title} ${
            isCompleted ? styles.todoItem__title_completed : ""
          }`}
        >
          {title}
        </h3>
      </section>
      <section className={styles.todoItem__actions}>
        <button
          onClick={completeTodoHandler}
          className={styles.todoItem__completeBtn}
        >
          {isCompleted ? (
            <span
              className={`${styles.todoItem__completeBtnCheck} ${styles.todoItem__completeBtn_completeBtnCheck}`}
            >
              &#10003;
            </span>
          ) : (
            <span
              className={`${styles.todoItem__completeBtnCross} ${styles.todoItem__completeBtn_completeBtnCross}`}
            >
              &#9587;
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={removeTodoHandler}
          className={styles.todoItem__removeBtn}
        >
          &#128465;
        </button>
      </section>
    </div>
  );
}

export default TodoItem;
