import { AppHeader } from "./cmps/AppHeader.jsx";
import { Home } from "./pages/Home.jsx";
import { BugIndex } from "./pages/BugIndex.jsx";
import { BugDetails } from "./pages/BugDetails.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bug" element={<BugIndex />} />
              <Route path="/bug/:bugId" element={<BugDetails />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}
