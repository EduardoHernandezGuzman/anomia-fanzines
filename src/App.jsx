import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Products, About, Contact, Error } from "./pages";
import { Header } from "./components";

const App = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
