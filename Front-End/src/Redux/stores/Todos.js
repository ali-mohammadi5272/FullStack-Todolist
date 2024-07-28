import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosFromServer = createAsyncThunk(
  "Todos/getTodosFromServer",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/todos`
    );
    return response.data;
  }
);
export const addTodoToServer = createAsyncThunk(
  "Todos/addTodoToServer",
  async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/todos`,
      data
    );
    return response.data;
  }
);

export const removeTodoFromServer = createAsyncThunk(
  "Todos/removeTodoFromServer",
  async (todoId) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/todos/${todoId}`
    );
    return response.data;
  }
);

export const sendCompleteTodoToServer = createAsyncThunk(
  "Todos/sendCompleteTodoToServer",
  async (payload) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/todos/${payload._id}`,
      { isCompleted: payload.isCompleted }
    );
    return response.data;
  }
);

const slice = createSlice({
  name: "Todos",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodosFromServer.fulfilled, (_, action) => action.payload)
      .addCase(addTodoToServer.fulfilled, (state, action) => {
        const arrayDatas = JSON.parse(JSON.stringify(state));
        arrayDatas.push(action.payload.todo);
        return arrayDatas;
      })
      .addCase(removeTodoFromServer.fulfilled, (state, action) => {
        return state.filter((todo) => todo._id !== action.payload.todo._id);
      })
      .addCase(sendCompleteTodoToServer.fulfilled, (state, action) => {
        const arrayDatas = JSON.parse(JSON.stringify(state));
        arrayDatas.forEach((todo) => {
          if (todo._id === action.payload.todo._id) {
            todo.isCompleted = action.payload.todo.isCompleted;
          }
        });
        return arrayDatas;
      });
  },
});

export default slice.reducer;