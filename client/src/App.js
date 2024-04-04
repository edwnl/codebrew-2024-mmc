import styled from '@emotion/styled';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { PAGE_ROUTES } from './utils/pageRoutes';
import NavigationBar from './components/NavigationBar';
import { Box } from '@mui/material';

function App() {
  return (
    <AppContainer className="App">
      <BrowserRouter>
        <NavigationBar />
        <MainContainer id="main div">
          <Routes>
            {PAGE_ROUTES.map((page) => (
              <Route key={page.key} path={page.pathname} element={<page.component />} />
            ))}
          </Routes>
        </MainContainer>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContainer = styled(Box)`
  display: flex;
  background-color: white;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  align-items: center;
`;
