import React, { createContext, useContext, useState, ReactNode } from 'react';
import { College } from '@/components/ui/college-dropdown';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedCollege: College | null;
  referralId: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationContextType {
  data: RegistrationData;
  updateData: (updates: Partial<RegistrationData>) => void;
  resetData: () => void;
}

const defaultData: RegistrationData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  selectedCollege: null,
  referralId: '',
  password: '',
  confirmPassword: '',
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<RegistrationData>(defaultData);

  const updateData = (updates: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(defaultData);
  };

  return (
    <RegistrationContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}
