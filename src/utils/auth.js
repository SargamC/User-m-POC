
export const isAuthenticated = () => {
  
  return localStorage.getItem('token') !== null;
};

export const login = (username, password) => {
 
  localStorage.setItem('token', 'yourAuthTokenHere');
};

export const logout = () => {
  
  localStorage.removeItem('token');
};
