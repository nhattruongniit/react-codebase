import React, { useEffect } from 'react';
import { Container, Message } from './styles';

const LoginPage = ({ requestLogin, setLoginError }) => {
  useEffect(() => {    
    requestLogin();
  }, []);

  return (
    <Container>      
      <Message>
        Redirecting to login page...
      </Message>
    </Container>
  )
}

export default LoginPage;
