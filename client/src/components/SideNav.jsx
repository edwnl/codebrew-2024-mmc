import React, { useRef, useState } from 'react';
import { Hidden, Slide } from '@mui/material';
import styled from '@emotion/styled';
import Hamburger from 'hamburger-react';
import useOnClickAway from '../hooks/useOnClickAway';
import { NavText, ScrollLink } from './NavLinks';
import { NAV_ROUTES } from '../utils/navRoutes';

export const SideNav = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const modalRef = useRef();
  useOnClickAway(modalRef, () => setDrawerOpen(false), 'hamburger-react');

  const handleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Hidden mdUp>
      <Hamburger
        color="black"
        label="show menu"
        toggled={isDrawerOpen}
        toggle={setDrawerOpen}
        duration={0.8}
        size={24}
      />
      <Slide
        id="mobile-navigation-bar"
        direction="left"
        in={isDrawerOpen}
        mountOnEnter
        unmountOnExit
      >
        <Modal open={isDrawerOpen} ref={modalRef}>
          <MobileNav>
            {/* TODO: replace this with NavLinks component  */}
            {NAV_ROUTES.map((item) => (
              <NavText
                onClick={handleDrawer}
                key={item.id}
                fontSize={{ xs: '2rem', sm: '1.75rem', md: '1.5rem', lg: '1.75rem' }}
              >
                <ScrollLink to={item.to} tabIndex={1}>
                  {item.text}
                </ScrollLink>
              </NavText>
            ))}
          </MobileNav>
        </Modal>
      </Slide>
    </Hidden>
  );
};

const MobileNav = styled.nav`
  gap: 10vh;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
`;

const Modal = styled.aside`
  &&& {
    right: 0;
    z-index: -1;
    width: 100%;
    height: 100vh;
    display: flex;
    position: fixed;
    overflow-x: hidden;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-bg-color);
    box-shadow: -10px 0px 30px -10px var(--primary-bg-color-dark);

    @media (min-width: 465px) {
      width: 60%;
    }
  }
`;
