'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { TrustBanner } from '@/components/TrustBanner';
import { HomeScreen } from '@/components/HomeScreen';
import { ServiceStartScreen } from '@/components/ServiceStartScreen';
import { VoiceScreen } from '@/components/VoiceScreen';
import { ProcessingScreen } from '@/components/ProcessingScreen';
import { FormScreen } from '@/components/FormScreen';
import { CompletionScreen } from '@/components/CompletionScreen';
import { TechnicalModal } from '@/components/TechnicalModal';
import { SCENARIOS, AmbiguityOption } from '@/data/scenarios';
import { soundEngine } from '@/utils/sound';

type ScreenType = 'home' | 'service_start' | 'voice' | 'processing' | 'form' | 'completion';

export default function NishchitApp() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [currentScenarioId, setCurrentScenarioId] = useState<string>('ambiguous_number');
  const [resolvedAmbiguity, setResolvedAmbiguity] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTechModalOpen, setIsTechModalOpen] = useState<boolean>(false);

  const scenario = SCENARIOS[currentScenarioId] || SCENARIOS.ambiguous_number;

  const handleSelectScenario = (scenarioId: string) => {
    setCurrentScenarioId(scenarioId);
    setResolvedAmbiguity(false);
    setSelectedOption(null);
  };

  const handleResolveAmbiguity = (option: AmbiguityOption) => {
    setSelectedOption(option.labelHindi);
    setResolvedAmbiguity(true);
  };

  const handleNewApplication = () => {
    setCurrentScenarioId('ambiguous_number');
    setResolvedAmbiguity(false);
    setSelectedOption(null);
    setCurrentScreen('home');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Application Header */}
      <Header
        onGoHome={() => setCurrentScreen('home')}
        onOpenTechModal={() => setIsTechModalOpen(true)}
        isTechModalOpen={isTechModalOpen}
      />

      {/* Trust Indicator Safety Banner */}
      <TrustBanner onOpenTechModal={() => setIsTechModalOpen(true)} />

      {/* Main Content Area */}
      <main className="main-content">
        {currentScreen === 'home' && (
          <HomeScreen
            onStartVoice={() => setCurrentScreen('service_start')}
            onStartManual={() => setCurrentScreen('service_start')}
            onSelectCategory={() => setCurrentScreen('service_start')}
          />
        )}

        {currentScreen === 'service_start' && (
          <ServiceStartScreen
            onProceedToVoice={() => setCurrentScreen('voice')}
            onBack={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'voice' && (
          <VoiceScreen
            scenario={scenario}
            onSelectScenario={handleSelectScenario}
            onRecordingComplete={() => setCurrentScreen('processing')}
            onBack={() => setCurrentScreen('service_start')}
          />
        )}

        {currentScreen === 'processing' && (
          <ProcessingScreen
            scenario={scenario}
            onProcessingComplete={() => setCurrentScreen('form')}
          />
        )}

        {currentScreen === 'form' && (
          <FormScreen
            scenario={scenario}
            resolvedAmbiguity={resolvedAmbiguity}
            selectedOption={selectedOption}
            onResolveAmbiguity={handleResolveAmbiguity}
            onSubmit={() => setCurrentScreen('completion')}
            onBack={() => setCurrentScreen('voice')}
          />
        )}

        {currentScreen === 'completion' && (
          <CompletionScreen
            scenario={scenario}
            resolvedField={selectedOption || 'खाता नंबर'}
            onNewApplication={handleNewApplication}
          />
        )}
      </main>

      {/* System Technical Modal (For Judges / Tech Review) */}
      <TechnicalModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
        scenario={scenario}
        resolvedAmbiguity={resolvedAmbiguity}
        selectedOption={selectedOption}
      />
    </div>
  );
}
