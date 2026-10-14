import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary, Header } from "./components";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Error = lazy(() => import("./pages/Error"));

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Header />
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-[60vh]">
                <p className="text-primary">Cargando...</p>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </div>
  );
};

export default App;
