import "./reset.css";
import "./App.css";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import initialize from "./thunks/initialize";
import selectInit from "./selectors/select-init";
import Preloader from "./common/Preloader/Preloader";

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector(selectInit);
  useEffect(() => {
    dispatch(initialize());
  }, []);
  if (!initialized) {
    return <Preloader />;
  }
  return (
    <div className="App">
      <ControlPanel />
      <Main />
      <Sidebar />
    </div>
  );
}

export default App;
