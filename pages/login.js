import { Button } from "@mui/material";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src="https://cdn.dribbble.com/users/1196390/screenshots/2835899/pokemon_go_cellphone.jpg" />
        <Button onClick={signIn} variant="outlined">
          Sign in with Google!
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgb(0, 0, 0);
`;

const Logo = styled.img`
  height: 300px;
  width: 400px;
  margin-bottom: 50px;
`;
