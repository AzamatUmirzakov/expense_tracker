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
      <div className='sidebarButtons'>
        <button onClick={toggleControlPanel}><img src={menuIcon} alt="Open control panel"/></button>
        <button onClick={toggleSidebar}><img src={menuIcon} alt="Open sidebar"/></button>
      </div>
      <ControlPanel controlPanelState={controlPanelState} />
      <Main formatter={formatter} />
      <Sidebar formatter={formatter} sidebarState={sidebarState} />
    </div>
  );
}

export default App;
