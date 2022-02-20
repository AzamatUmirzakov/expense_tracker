import {configureStore} from "@reduxjs/toolkit";
import historyReducer from "../reducers/root-reducer";

const state = localStorage.getItem('expense_tracker_state');
let preloaded = null;
if (state) {
  preloaded = JSON.parse(state, (key, value) => {
    if (key === 'date' || key === 'timestamp') {
      return new Date(value);
    }
    return value;
  });
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

store.subscribe(() => localStorage.expense_tracker_state = JSON.stringify(store.getState()));

export default store;