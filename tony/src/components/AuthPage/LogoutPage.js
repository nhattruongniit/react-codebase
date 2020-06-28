import React from 'react';
import Button from '../common/Button';
import { Container, Message } from './styles';

const LogoutPage = ({ requestLogin }) => (
  <Container>
    <div>
      <Message>
        You have been logout. Click login to continue to use this app.
      </Message>
      <Button onClick={requestLogin} gradient>Login</Button>
    </div>

  </Container>
);

export default LogoutPage;
