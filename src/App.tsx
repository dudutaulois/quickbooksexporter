import React, { useState } from 'react';
import { Header } from './components/Header';
import { WelcomeStep } from './components/WelcomeStep';
import { AuthStep } from './components/AuthStep';
import { DataSelectionStep } from './components/DataSelectionStep';
import { PlatformSelectionStep } from './components/PlatformSelectionStep';
import { MigrationStep } from './components/MigrationStep';
import { CompletionStep } from './components/CompletionStep';
import { ProgressBar } from './components/ProgressBar';

export type MigrationStep = 'welcome' | 'auth' | 'data-selection' | 'platform-selection' | 'migration' | 'completion';
export type TargetPlatform = 'notion' | 'airtable';
export type DataType = 'customers' | 'invoices';

interface MigrationData {
  selectedData: DataType[];
  targetPlatform: TargetPlatform | null;
  isAuthenticated: boolean;
}

function App() {
  const [currentStep, setCurrentStep] = useState<MigrationStep>('welcome');
  const [migrationData, setMigrationData] = useState<MigrationData>({
    selectedData: [],
    targetPlatform: null,
    isAuthenticated: false,
  });

  const steps: MigrationStep[] = ['welcome', 'auth', 'data-selection', 'platform-selection', 'migration', 'completion'];
  const currentStepIndex = steps.indexOf(currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const updateMigrationData = (updates: Partial<MigrationData>) => {
    setMigrationData(prev => ({ ...prev, ...updates }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep onNext={handleNext} />;
      case 'auth':
        return (
          <AuthStep
            onNext={handleNext}
            onBack={handleBack}
            onAuthenticate={() => updateMigrationData({ isAuthenticated: true })}
            isAuthenticated={migrationData.isAuthenticated}
          />
        );
      case 'data-selection':
        return (
          <DataSelectionStep
            onNext={handleNext}
            onBack={handleBack}
            selectedData={migrationData.selectedData}
            onDataChange={(data) => updateMigrationData({ selectedData: data })}
          />
        );
      case 'platform-selection':
        return (
          <PlatformSelectionStep
            onNext={handleNext}
            onBack={handleBack}
            selectedPlatform={migrationData.targetPlatform}
            onPlatformChange={(platform) => updateMigrationData({ targetPlatform: platform })}
          />
        );
      case 'migration':
        return (
          <MigrationStep
            onNext={handleNext}
            onBack={handleBack}
            migrationData={migrationData}
          />
        );
      case 'completion':
        return <CompletionStep onRestart={() => setCurrentStep('welcome')} />;
      default:
        return <WelcomeStep onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {currentStep !== 'welcome' && (
          <div className="max-w-4xl mx-auto mb-8">
            <ProgressBar currentStep={currentStepIndex} totalSteps={steps.length - 1} />
          </div>
        )}
        <div className="max-w-4xl mx-auto">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}

export default App;