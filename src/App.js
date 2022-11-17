import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Izdavaci from "./Components/Izdavaci";
import Knjige from "./Components/Knjige";
import Autori from "./Components/Autori";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Knjige />}/>
          <Route path="autori" element={<Autori />}/>
          <Route path="izdavaci" element={<Izdavaci />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
