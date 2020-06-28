import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../common/Button';
import { Container, Message } from './styles';

const LoginCallbackPage = ({ user, error, processLoginCallback, history, requestLogin }) => {
  useEffect(() => {
    async function loginCallback() {
      const result = await processLoginCallback();      
      if (result) {
        history.push('/');
      }
    }
    
    loginCallback();
  }, []);

  return (
    <Container>    
      { !user && !error && 
        <Message>Processing login callback, please wait...</Message>
      }
      { error &&
        <div>
          <Message>
            Unable to login, please try again.
          </Message>
          <Button onClick={requestLogin} gradient>Login</Button>
        </div>
      }
    </Container>
  )
}

export default withRouter(LoginCallbackPage);
