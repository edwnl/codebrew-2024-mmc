import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { PAGE_ROUTES } from './utils/pageRoutes';
import NavBar from './components/NavBar';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Clothes from "./pages/Clothes";
import Fit from "./pages/Fit";
import NoPage from "./pages/NoPage";
import {AuthenticatedElement, UnauthenticatedElement} from "./auth/AuthElements";

function App() {
  return (
    <>
      <BrowserRouter>
          <NavBar />
          <main className="flex bg-white justify-center items-center w-full">
              <Routes>
                  <Route key="home" path="/" element={<Home/>}/>
                  <Route key="login" path="/login" element={<UnauthenticatedElement element={<Login />} />} />
                  <Route key="clothes" path="/clothes" element={<AuthenticatedElement element={<Clothes />} />} />
                  <Route key="fit" path="/fit" element={<AuthenticatedElement element={<Fit />} />} />
                  <Route key="404" path="/*" element={<NoPage />} />
              </Routes>
          </main>
      </BrowserRouter>
    </>
  );
}

export default App;
