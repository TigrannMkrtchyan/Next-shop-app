import React from 'react';
import LoginLayout from '@/components/loginLayout';
import RegisterForm from '@/components/regiserForm';

const Register: React.FC = () => {
  return (
    <div>
      <LoginLayout title='Create A New Account'>
        <RegisterForm/>
      </LoginLayout>
    </div>
  );
};

export default Register;
