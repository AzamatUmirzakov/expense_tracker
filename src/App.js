import "./reset.css";
import "./App.css";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import selectCurrency from "./selectors/select-currency";
import initialize from "./thunks/initialize";
import selectInit from "./selectors/select-init";
import Preloader from "./common/Preloader/Preloader";
import {changeFilter, setMontlyBudget} from "./reducers/root-reducer";
import setNewCurrency from "./thunks/set-new-currency";
import selectCurrentFilter from "./selectors/select-current-filter";
import menuIcon from "./assets/menu.svg";
import selectCategories from "./selectors/select-categories";
import selectHistory from "./selectors/select-history";
import selectEntries from "./selectors/select-entries";

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
    console.log('Errors below can be ignored, I think, because they are caused because app stores Date class instances as values for entries, and not strings, and that makes Redux angry. They dont cause any troubles, and I will fix them anyway soon.')
    dispatch(initialize());
  }, [dispatch]);

  const handleCurrencyChange = (currency) => {
    dispatch(setNewCurrency(currentCurrency, currency));
  }
  const handleMonthlyBudgetChange = (budget) => {
    dispatch(setMontlyBudget(budget));
  }

  const [controlPanelState, setControlPanelState] = useState(false);
  const toggleControlPanel = () => {
    setControlPanelState(!controlPanelState);
  }

  const [sidebarState, setSidebarState] = useState(false);
  const toggleSidebar = () => {
    setSidebarState(!sidebarState);
  }
  // data for control panel
  const categories = useSelector(selectCategories);

  // for main component
  const { entries } = useSelector(selectHistory);
  const searchEntries = useSelector(selectEntries);

  if (!initialized) {
    return <Preloader />;
  }
  return (
    <div className="App">
      <div className='sidebarButtons'>
        <button onClick={toggleControlPanel}><img src={menuIcon} alt="Open control panel"/></button>
        <button onClick={toggleSidebar}><img src={menuIcon} alt="Open sidebar"/></button>
      </div>
      <ControlPanel categories={categories} currentCurrency={currentCurrency} currentFilter={currentFilter} controlPanelState={controlPanelState} handleCurrencyChange={handleCurrencyChange} handleFilterChange={handleFilterChange}/>
      <Main currentFilter={currentFilter} entries={entries} searchEntries={searchEntries}/>
      <Sidebar sidebarState={sidebarState} handleMonthlyBudgetChange={handleMonthlyBudgetChange}/>
    </div>
  );
}

export default App;
