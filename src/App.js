import "./reset.css";
import "./App.css";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import selectCurrency from "./selectors/select-currency";
import initialize from "./thunks/initialize";
import selectInit from "./selectors/select-init";
import Preloader from "./common/Preloader/Preloader";
import {changeFilter, setMontlyBudget} from "./reducers/root-reducer";
import setNewCurrency from "./thunks/set-new-currency";
import selectCurrentFilter from "./selectors/select-current-filter";

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector(selectInit);
  const currentCurrency = useSelector(selectCurrency);
  const currentFilter = useSelector(selectCurrentFilter);
  const handleFilterChange = (category) => {
    if (currentFilter === category) {
      dispatch(changeFilter(''));
    } else {
      dispatch(changeFilter(category));
    }
  }

  useEffect(() => {
    dispatch(initialize());
  }, []);
  if (!initialized) {
    return <Preloader />;
  }

  const handleCurrencyChange = (currency) => {
    dispatch(setNewCurrency(currentCurrency, currency));
  }
  const handleMonthlyBudgetChange = (budget) => {
    dispatch(setMontlyBudget(budget));
  }
  return (
    <div className="App">
      <ControlPanel handleCurrencyChange={handleCurrencyChange} handleFilterChange={handleFilterChange}/>
      <Main />
      <Sidebar handleMonthlyBudgetChange={handleMonthlyBudgetChange}/>
    </div>
  );
}

export default App;
