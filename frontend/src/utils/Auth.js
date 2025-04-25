
export const login = () => {
    sessionStorage.setItem("isAdmin", "true");
  };
  
  export const logout = () => {
    sessionStorage.removeItem("isAdmin");
  };
  
  export const isAuthenticated = () => {
    return sessionStorage.getItem("isAdmin") === "true";
  };
  