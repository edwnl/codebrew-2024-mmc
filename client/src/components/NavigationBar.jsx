import React from 'react';
import { AppBar, Box, Container } from '@mui/material';
import styled from '@emotion/styled';
import { SideNav } from './SideNav';
import NavLinks from './NavLinks';
import PropTypes from 'prop-types';

const NavigationBar = () => {
  return (
    <React.Fragment>
      <NavBar id="navigation-bar" position="fixed" component="header">
        <NavContainer maxWidth="inherit">
          <NavTextBox
            id="navigation-text-box"
            sx={{ display: { xs: 'none', md: 'flex' }, gap: '1.5vw' }}
          >
            <NavLinks />
          </NavTextBox>
          <SideNav />
        </NavContainer>
      </NavBar>
    </React.Fragment>
  );
};

NavLinks.propTypes = {
  handleDrawer: PropTypes.func
};

export default NavigationBar;

const NavBar = styled(AppBar)`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: none;
    background-color: transparent;

    @media (min-width: 900px) {
      padding: 24px 24px;
      box-shadow: 0 10px 30px -10px var(--secondary-bg-color);
      background-color: var(--nav-bg-color);
      backdrop-filter: blur(1px);
      background-filter: none;
    }
  }
`;

const NavContainer = styled(Container)`
  && {
    display: flex;
    height: fit-content;
    justify-content: space-between;
  }
`;

const NavTextBox = styled(Box)`
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
`;
