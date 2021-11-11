import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "USD",
  categories: {
  },
  budget: {
    value: 500,
    spent: 0,
  },
  monthly: [
  ],
  today: {
    date: new Date('Thu Nov 11 2021 15:47:12 GMT+0600 (East Kazakhstan Time)'),
    history: [],
  }
}

const rootReducer = createSlice({
  name: "history",
  initialState,
  reducers: {
    addEntry: (state, action) => {
      const newState = {...state};
      const entry = {
        name: action.payload.title,
        category: action.payload.category,
        timestamp: new Date(),
        value: action.payload.value,
        type: action.payload.type,
      };
      const date = new Date(entry.timestamp.getFullYear(), entry.timestamp.getMonth());
      let newMonth = null;
      let newMonthIndex = -1;
      for (let i = 0; i < newState.monthly.length; i++) {
        const month = newState.monthly[i];
        if (month.date.getFullYear() === date.getFullYear() && month.date.getMonth() === date.getMonth()) {
          newMonth = {
            ...month,
            income: month.income + (entry.type === 'income' ? entry.value : 0),
            expense: month.expense + (entry.type === 'expense' ? entry.value : 0),
          }
          newMonthIndex = i;
        }
      }
      newState.today = {...state.today};
      newState.today.history = [...state.today.history, entry];
      newState.monthly = [...state.monthly];
      newState.categories = {...state.categories};
      newState.budget = {...state.budget}
      if (newMonthIndex === -1) {
        newState.monthly.push({
          income: (entry.type === 'income' ? entry.value : 0),
          expense: (entry.type === 'expense' ? entry.value : 0),
          date: new Date(),
      })
      } else {
        newState.monthly.splice(newMonthIndex, 1, newMonth);
      }
      if (entry.type === 'expense') {
        newState.budget.spent = newState.budget.spent + entry.value;
        if (!newState.categories[entry.category]) {
          newState.categories[entry.category] = 0;
        }
        newState.categories[entry.category] += entry.value;
      }
      return newState;
    },
    setMontlyBudget: (state, action) => {
      const newState = {...state};
      newState.budget = {...state.budget};
      newState.budget.value = action.payload;
      return newState;
    },
    setCurrency: (state, action) => {
      const newState = {...state};
      newState.currency = action.payload;
      return newState;
    },
    changeDailyHistoryCurrency: (state, action) => {
      const {coefficients, next, previous} = action.payload;
      for (let entry of state.today.history) {
        entry.value = Math.round(entry.value * coefficients.results[`${previous}_${next}`].val);
      }
    }
  }
  })

export const { addEntry, setMontlyBudget, setCurrency, changeDailyHistoryCurrency } = rootReducer.actions;

export default rootReducer.reducer;