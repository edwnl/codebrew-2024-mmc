import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { NAV_ROUTES } from '../utils/navRoutes';
import { Link } from 'react-router-dom';

const NavLinks = () => (
  <>
    {NAV_ROUTES.map((item) => (
      <NavText key={item.id} fontSize={{ xs: '2rem', sm: '1.75rem', md: '1.5rem', lg: '1.75rem' }}>
        <ScrollLink to={item.to} tabIndex={1}>
          {item.text}
        </ScrollLink>
      </NavText>
    ))}
  </>
);

export default NavLinks;

export const NavText = styled(Typography)`
  && {
    cursor: pointer;
    color: var(--grey-text);
    &:hover {
      color: var(--primary-text-color);
    }
  }
`;

export const ScrollLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  &:visited {
    color: var(--grey-text);
  }
`;
