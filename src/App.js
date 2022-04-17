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
import menuIcon from "./assets/menu.svg";
import {Form} from "formik";
import FormatterContext from "./context/formatter-context";

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector(selectInit);
  const currentCurrency = useSelector(selectCurrency);

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  const [controlPanelState, setControlPanelState] = useState(false);
  const toggleControlPanel = () => {
    setControlPanelState(!controlPanelState);
  }

  const [sidebarState, setSidebarState] = useState(false);
  const toggleSidebar = () => {
    setSidebarState(!sidebarState);
  }
  const formatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: currentCurrency,
  })

  if (!initialized) {
    return <Preloader />;
  }
  return (
    <div className="App">
      <FormatterContext.Provider value={formatter}>
        <div className='sidebarButtons'>
          <button onClick={toggleControlPanel}><img src={menuIcon} alt="Open control panel"/></button>
          <button onClick={toggleSidebar}><img src={menuIcon} alt="Open sidebar"/></button>
        </div>
        <ControlPanel controlPanelState={controlPanelState} />
        <Main/>
        <Sidebar sidebarState={sidebarState} />
      </FormatterContext.Provider>
    </div>
  );
}

export default App;
