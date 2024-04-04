import styled from '@emotion/styled';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { pageRoutes } from './utils/pageRoutes';

function App() {
  return (
    <AppContainer className="App">
      <BrowserRouter>
        <Routes>
          {pageRoutes.map((page) => (
            <Route key={page.key} path={page.pathname} element={<page.component />} />
          ))}
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: fit-content;
`;
