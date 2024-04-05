import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { PAGE_ROUTES } from './utils/pageRoutes';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <BrowserRouter>
          <NavBar />
          <main className="flex bg-white justify-center items-center w-full">
              <Routes>
                  {PAGE_ROUTES.map((page) => (
                      <Route key={page.key} path={page.pathname} element={<page.component />} />
                  ))}
              </Routes>
          </main>
      </BrowserRouter>
    </>
  );
}

export default App;
