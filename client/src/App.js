import styled from '@emotion/styled';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { PAGE_ROUTES } from './utils/pageRoutes';
import { Box } from '@mui/material';
import NavigationbarEd from './components/NavigationbarEd';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationbarEd />
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
