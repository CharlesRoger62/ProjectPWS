import React from 'react';
export const auth = {
    user : 'user',
    admin : 'admin',
    none : ''
};
  
  export const AuthContext = React.createContext(
    auth.none // valeur par défaut
  );