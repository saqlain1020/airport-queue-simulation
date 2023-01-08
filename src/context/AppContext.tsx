import React from "react";

export const AppContext = React.createContext({
  numberOfCustomers: 1,
  speed: 1,
  numberOfServers: 1,
  setNumberOfCustomers: (value: number) => {},
  setSpeed: (value: number) => {},
  setNumberOfServers: (value: number) => {},
});

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [numberOfCustomers, setNumberOfCustomers] = React.useState(1);
  const [speed, setSpeed] = React.useState(1);
  const [numberOfServers, setNumberOfServers] = React.useState(1);

  return (
    <AppContext.Provider
      value={{
        numberOfCustomers,
        setNumberOfCustomers,
        speed,
        setSpeed,
        numberOfServers,
        setNumberOfServers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
