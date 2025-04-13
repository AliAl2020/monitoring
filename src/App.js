
import './App.css';

import GreenWindow from './component/windows/green/GreenWindow';
function App() {
  return (
    <div className="App">
     <GreenWindow datas={[{"A":1,"B":2},{"A":2,"B":4}]} headers={["A","B"]}></GreenWindow>
    </div>
  );
}

export default App;
