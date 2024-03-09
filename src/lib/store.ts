import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./features/userSlice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
  });

  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
