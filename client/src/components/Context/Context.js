import React, { createContext, useState } from 'react';

export const AppContext = createContext({});
const AppProvider = ({ children }) => {
  const [isToggled, setToggled] = useState(false);

  const toggleDisplay = () => {
    setToggled(() => !isToggled);
  };

  const value = { isToggled, toggleDisplay };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
