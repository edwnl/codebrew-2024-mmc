import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Clothes from './pages/Clothes';
import Fit from './pages/Fit';
import NoPage from './pages/NoPage';
import { AuthenticatedElement, UnauthenticatedElement } from './auth/AuthElements';
import NavigationBar from './components/NavigationBar';

function App() {
  // Hiding Nav Bar for specific routes - Login and 404
  const location = useLocation();
  const showNavBarPaths = ['/', '/clothes', '/fit'];
  const shouldNavDisplay = showNavBarPaths.includes(location.pathname);

  return (
    <>
      {shouldNavDisplay && <NavigationBar />}
      <main className="flex bg-white justify-center items-center w-full">
        <Routes>
          <Route key="home" path="/" element={<Home />} />
          <Route
            key="login"
            path="/login"
            element={<UnauthenticatedElement element={<Login />} />}
          />
          <Route
            key="clothes"
            path="/clothes"
            element={<AuthenticatedElement element={<Clothes />} />}
          />
          <Route key="fit" path="/fit" element={<AuthenticatedElement element={<Fit />} />} />
          <Route key="404" path="/*" element={<NoPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
