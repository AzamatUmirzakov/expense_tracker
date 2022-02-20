import { createSlice } from "@reduxjs/toolkit";
import selectDaily from "../selectors/select-daily";

const initialState = {
  initialized: false,
  currency: "USD",
  categories: {},
  filter: "",
  budget: {
    value: 500,
    spent: 0,
  },
  monthly: [],
  daily: {
  },
  history: {
    date: new Date(),
    entries: [],
  },
  entries: [],
};

const rootReducer = createSlice({
  name: "history",
  initialState,
  reducers: {
    setInitializationStatus: (state, action) => {
      state.initialized = action.payload;
    },
    createNewDailyHistory: (state, action) => {
      state.daily[action.payload] = {
        date: new Date(),
        entries: [],
      }
    },
    switchHistory: (state, action) => {
      const daily = selectDaily(state);
      if (daily[action.payload]) {
        state.history = {
          date: action.payload,
          entries: [...selectDaily(state)[action.payload].entries],
        };
      }
    },
    addEntry: (state, action) => {
      const entry = {
        name: action.payload.title,
        category: action.payload.category,
        timestamp: new Date(),
        value: action.payload.value,
        type: action.payload.type,
      };
      state.entries.push(entry);
      const date = new Date(
        entry.timestamp.getFullYear(),
        entry.timestamp.getMonth()
      );
      let newMonth = null;
      let newMonthIndex = -1;
      for (let i = 0; i < state.monthly.length; i++) {
        const month = state.monthly[i];
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
      const currentDate = new Date().toDateString();
      state.daily[currentDate].entries.push(entry);
      state.history = {
        date: currentDate,
        entries: [...state.daily[currentDate].entries],
      }
      if (newMonthIndex === -1) {
        state.monthly.push({
          income: entry.type === "income" ? entry.value : 0,
          expense: entry.type === "expense" ? entry.value : 0,
          date: new Date(),
        });
      } else {
        state.monthly.splice(newMonthIndex, 1, newMonth);
      }
      if (!state.categories[entry.category]) {
        state.categories[entry.category] = 0;
      }
      if (entry.type === "expense") {
        state.budget.spent = state.budget.spent + entry.value;
        state.categories[entry.category] += entry.value;
      }
    },
    setMontlyBudget: (state, action) => {
      state.budget.value = action.payload
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
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
    changeFilter: (state, action) => {
      state.filter = action.payload;
    }
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
  changeFilter,
} = rootReducer.actions;

export default rootReducer.reducer;
