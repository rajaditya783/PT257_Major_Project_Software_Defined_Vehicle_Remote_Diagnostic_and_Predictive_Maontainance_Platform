import React from 'react';
import { TelemetryProvider } from './context/TelemetryContext';
import { AuthRoleProvider, useAuthRole } from './context/AuthRoleContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LandingOverviewPage } from './pages/LandingOverviewPage';
import { FleetDashboardPage } from './pages/FleetDashboardPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { FaultDetectionPage } from './pages/FaultDetectionPage';
import { PredictiveMaintPage } from './pages/PredictiveMaintPage';
import { AlertsCenterPage } from './pages/AlertsCenterPage';
import { HistoricalTrendsPage } from './pages/HistoricalTrendsPage';
import { SettingsRolePage } from './pages/SettingsRolePage';
import { PresentationSlideDeck } from './components/presentation/PresentationSlideDeck';

const AppContent: React.FC = () => {
  const { activeTab, theme } = useAuthRole();

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'overview':
        return <LandingOverviewPage />;
      case 'fleet':
        return <FleetDashboardPage />;
      case 'cockpit':
        return <VehicleDetailPage />;
      case 'faults':
        return <FaultDetectionPage />;
      case 'predictive':
        return <PredictiveMaintPage />;
      case 'alerts':
        return <AlertsCenterPage />;
      case 'trends':
        return <HistoricalTrendsPage />;
      case 'settings':
        return <SettingsRolePage />;
      case 'presentation':
        return <PresentationSlideDeck />;
      default:
        return <LandingOverviewPage />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'cockpit-grid-bg bg-cockpit-950 text-slate-100' : 'cockpit-grid-bg-light bg-[#F4F6F9] text-[#0F172A]'}`}>
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 max-w-7xl mx-auto w-full">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <TelemetryProvider>
      <AuthRoleProvider>
        <AppContent />
      </AuthRoleProvider>
    </TelemetryProvider>
  );
};

export default App;
