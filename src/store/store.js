import {configureStore} from "@reduxjs/toolkit";
import historyReducer from "../reducers/root-reducer";

const state = localStorage.getItem('expense_tracker_state');
let preloaded = null;
if (state) {
  preloaded = JSON.parse(state);
}
let store = null;

if (preloaded) {
  store = configureStore({
    reducer: historyReducer,
    preloadedState: preloaded ? preloaded : null,
  })
} else {
  store = configureStore({
    reducer: historyReducer,
  })
}

window.store = store;

store.subscribe(() => localStorage.setItem('expense_tracker_state', JSON.stringify(store.getState())));

export default store;