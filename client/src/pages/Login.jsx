import styled from '@emotion/styled';
import { Button, Container, Grid, Hidden, Typography } from '@mui/material';

export const Login = () => {
  return (
    <SignUpContainer id="signup-container" maxWidth="fit-content">
      <Grid container spacing={3}>
        <Hidden smDown>
          <ImageContainer item md={6}>
            {/* TODO: Add Image and update background color for sign up container*/}
            {/* <Image /> */}
          </ImageContainer>
        </Hidden>

        <ContentContainer item xs={12} md={6}>
          <SignUpBox>
            <Typography variant="h4" gutterBottom>
              Welcome to AI Wardrobe
            </Typography>
            {/* TODO: ADD LOGO HERE */}
            <Typography variant="body1" gutterBottom>
              Please sign in to continue.
            </Typography>
            <Button variant="contained">Sign Up</Button>
          </SignUpBox>
        </ContentContainer>
      </Grid>
    </SignUpContainer>
  );
};
export default Login;

const SignUpContainer = styled(Container)`
  background-color: #f0f0f0;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 0% 10% !important;
  align-items: center;
`;

const ImageContainer = styled(Grid)`
  text-align: center;
`;

// const Image = styled.img`
//   max-width: 100%;
//   max-height: 100%;
// `;

const ContentContainer = styled(Grid)`
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const SignUpBox = styled(Container)`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  min-height: 30vh;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
