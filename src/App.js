import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Farewell2024 from "./farewell2024";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Farewell2024 />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;