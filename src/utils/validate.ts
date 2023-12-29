const validateEmail = (email: string) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  
  const isJwtToken = (token: string) => {
    return token.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/);
  };
  
  const validateUsernameLength = (username: string) => {
    return username.match(/^([A-Za-z0-9_.]).{3,10}$/);
  };
   
  const validatePassword = (password: string) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
  
    return (
      typeof password === 'string' &&
      password.length >= 8 &&
      password.length <= 25 &&
      password.match(passwordPattern) !== null
    );
  };
  
  export {
    validateEmail,
    validateUsernameLength,
    validatePassword,
    isJwtToken,
  };
  