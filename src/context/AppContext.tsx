import React from "react";
import { Customer } from "../interfaces/record";

export const AppContext = React.createContext({
  numberOfCustomers: 1,
  speed: 1,
  numberOfServers: 1,
  customerRecords: [] as Customer[],
  setNumberOfCustomers: (value: number) => {},
  setSpeed: (value: number) => {},
  setNumberOfServers: (value: number) => {},
  setCustomerRecords: (value: Customer[]) => {},
});

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [numberOfCustomers, setNumberOfCustomers] = React.useState(1);
  const [speed, setSpeed] = React.useState(1);
  const [numberOfServers, setNumberOfServers] = React.useState(1);
  const [customerRecords, setCustomerRecords] = React.useState<Customer[]>([]);

  return (
    <AppContext.Provider
      value={{
        numberOfCustomers,
        setNumberOfCustomers,
        speed,
        setSpeed,
        numberOfServers,
        setNumberOfServers,
        setCustomerRecords,
        customerRecords,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
