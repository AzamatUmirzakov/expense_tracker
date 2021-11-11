import './reset.css';
import './App.css';
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <ControlPanel/>
      <Main/>
      <Sidebar/>
    </div>
  );
}

export default App;
