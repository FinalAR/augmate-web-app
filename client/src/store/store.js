import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers/Reducers";

export const store = configureStore({
  reducer: { data: rootReducer },
});
