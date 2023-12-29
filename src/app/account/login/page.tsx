import React from 'react';
import LoginLayout from '@/components/loginLayout';
import LoginForm from '@/components/loginForm';

const Login: React.FC = () => {
  return (
    <div>
      <LoginLayout title='Login'>
        <LoginForm/>
      </LoginLayout>
    </div>
  );
};

export default Login;
