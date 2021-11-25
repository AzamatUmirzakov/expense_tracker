import { createSlice } from "@reduxjs/toolkit";
import selectDaily from "../selectors/select-daily";

const initialState = {
  initialized: false,
  currency: "USD",
  categories: {},
  budget: {
    value: 500,
    spent: 0,
  },
  monthly: [],
  daily: {
    [new Date().toDateString()]: {
      entries: [],
    },
    [new Date(2021, 10, 19).toDateString()]: {
      entries: [
        {
          name: "Test",
          type: "expense",
          value: 5,
          timestamp: new Date(2021, 11, 19, 19, 0),
        },
      ],
    },
  },
  history: {
    date: new Date(),
    entries: [],
  },
};

const rootReducer = createSlice({
  name: "history",
  initialState,
  reducers: {
    setInitializationStatus: (state, action) => {
      const newState = {
        ...state,
        initialized: action.payload,
      };
      return newState;
    },
    createNewDailyHistory: (state, action) => {
      const newState = { ...state };
      newState.daily = {...state.daily};
      newState.daily[action.payload] = {
        date: new Date(),
        entries: [],
      };
      return newState;
    },
    switchHistory: (state, action) => {
      const daily = selectDaily(state);
      if (!daily[action.payload]) {
        return state;
      }
      const newState = { ...state };
      newState.history = {
        date: action.payload,
        entries: [...selectDaily(state)[action.payload].entries],
      };
      return newState;
    },
    addEntry: (state, action) => {
      const newState = { ...state };
      const entry = {
        name: action.payload.title,
        category: action.payload.category,
        timestamp: new Date(),
        value: action.payload.value,
        type: action.payload.type,
      };
      const date = new Date(
        entry.timestamp.getFullYear(),
        entry.timestamp.getMonth()
      );
      let newMonth = null;
      let newMonthIndex = -1;
      for (let i = 0; i < newState.monthly.length; i++) {
        const month = newState.monthly[i];
        if (
          month.date.getFullYear() === date.getFullYear() &&
          month.date.getMonth() === date.getMonth()
        ) {
          newMonth = {
            ...month,
            income: month.income + (entry.type === "income" ? entry.value : 0),
            expense:
              month.expense + (entry.type === "expense" ? entry.value : 0),
          };
          newMonthIndex = i;
        }
      }
      newState.history = { ...state.history };
      const currentDate = new Date().toDateString();
      newState.daily = {
        ...state.daily,
      };
      newState.daily[currentDate] = {
        ...state.daily[currentDate],
      };
      newState.daily[currentDate].entries = [
        ...newState.daily[currentDate].entries,
        entry,
      ];
      newState.history = {
        date: currentDate,
        entries: [...newState.daily[currentDate].entries],
      }
      newState.monthly = [...state.monthly];
      newState.categories = { ...state.categories };
      newState.budget = { ...state.budget };
      if (newMonthIndex === -1) {
        newState.monthly.push({
          income: entry.type === "income" ? entry.value : 0,
          expense: entry.type === "expense" ? entry.value : 0,
          date: new Date(),
        });
      } else {
        newState.monthly.splice(newMonthIndex, 1, newMonth);
      }
      if (!newState.categories[entry.category]) {
        newState.categories[entry.category] = 0;
      }
      if (entry.type === "expense") {
        newState.budget.spent = newState.budget.spent + entry.value;
        newState.categories[entry.category] += entry.value;
      }
      return newState;
    },
    setMontlyBudget: (state, action) => {
      const newState = { ...state };
      newState.budget = { ...state.budget };
      newState.budget.value = action.payload;
      return newState;
    },
    setCurrency: (state, action) => {
      const newState = { ...state };
      newState.currency = action.payload;
      return newState;
    },
    changeCurrency: (state, action) => {
      const { coefficients, next, previous } = action.payload;
      for (let entry of state.history.entries) {
        entry.value = Math.round(
          entry.value * coefficients.results[`${previous}_${next}`].val
        );
      }
      for (let month of state.monthly) {
        month.income = Math.round(
          month.income * coefficients.results[`${previous}_${next}`].val
        );
        month.expense = Math.round(
          month.expense * coefficients.results[`${previous}_${next}`].val
        );
      }
      state.budget.spent = Math.round(
        state.budget.spent * coefficients.results[`${previous}_${next}`].val
      );
      state.budget.value = Math.round(
        state.budget.value * coefficients.results[`${previous}_${next}`].val
      );
      for (let category in state.categories) {
        state.categories[category] = Math.round(
          state.categories[category] *
            coefficients.results[`${previous}_${next}`].val
        );
      }
    },
  },
});

export const {
  setInitializationStatus,
  createNewDailyHistory,
  switchHistory,
  addEntry,
  setMontlyBudget,
  setCurrency,
  changeCurrency,
} = rootReducer.actions;

export default rootReducer.reducer;
