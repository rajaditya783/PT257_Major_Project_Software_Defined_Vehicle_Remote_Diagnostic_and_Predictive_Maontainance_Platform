import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '../types/telemetry';

export type NavigationTab =
  | 'overview'
  | 'fleet'
  | 'cockpit'
  | 'faults'
  | 'predictive'
  | 'alerts'
  | 'trends'
  | 'settings'
  | 'presentation';

interface AuthRoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  baudRateProtocol: string;
  setBaudRateProtocol: (proto: string) => void;
  cloudSyncStatus: 'ONLINE' | 'STREAMING' | 'RECONNECTING';
}

const AuthRoleContext = createContext<AuthRoleContextType | undefined>(undefined);

export const AuthRoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('FLEET_MANAGER');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [baudRateProtocol, setBaudRateProtocol] = useState<string>('CAN_FD_500K_2M');
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'ONLINE' | 'STREAMING' | 'RECONNECTING'>('STREAMING');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AuthRoleContext.Provider
      value={{
        role,
        setRole,
        theme,
        setTheme,
        toggleTheme,
        activeTab,
        setActiveTab,
        baudRateProtocol,
        setBaudRateProtocol,
        cloudSyncStatus,
      }}
    >
      {children}
    </AuthRoleContext.Provider>
  );
};

export const useAuthRole = (): AuthRoleContextType => {
  const context = useContext(AuthRoleContext);
  if (!context) {
    throw new Error('useAuthRole must be used within an AuthRoleProvider');
  }
  return context;
};
