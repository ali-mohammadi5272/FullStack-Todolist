import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./stores/Todos";

const store = configureStore({
  reducer: todoReducer,
});

export default store;
