import React, { createContext, useState } from 'react';

export const AppContext = createContext({});
const AppProvider = ({ children, history }) => {
  const [searchValue, setSearchValue] = useState('');

  const setSearch = (value) => {
    setSearchValue(value);
  };

  const value = { searchValue, setSearch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
