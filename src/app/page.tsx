'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TrustBanner } from '@/components/TrustBanner';
import { HomeScreen } from '@/components/HomeScreen';
import { ServiceStartScreen } from '@/components/ServiceStartScreen';
import { VoiceScreen } from '@/components/VoiceScreen';
import { ProcessingScreen } from '@/components/ProcessingScreen';
import { FormScreen } from '@/components/FormScreen';
import { CompletionScreen } from '@/components/CompletionScreen';
import { TechnicalModal } from '@/components/TechnicalModal';

import { SCENARIOS, Scenario, AmbiguityOption } from '@/data/scenarios';
import { Language } from '@/data/translations';

type ScreenType = 'home' | 'service_start' | 'voice' | 'processing' | 'form' | 'completion';

export default function App() {
  const [lang, setLang] = useState<Language>('en'); // Default language is English
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [currentScenarioId, setCurrentScenarioId] = useState<string>('scenario_ambiguous');
  const [resolvedAmbiguity, setResolvedAmbiguity] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTechModalOpen, setIsTechModalOpen] = useState<boolean>(false);

  const scenario: Scenario = SCENARIOS[currentScenarioId] || SCENARIOS.scenario_ambiguous;

  const handleToggleLang = (newLang: Language) => {
    setLang(newLang);
  };

  const handleSelectScenario = (id: string) => {
    setCurrentScenarioId(id);
    setResolvedAmbiguity(false);
    setSelectedOption(null);
  };

  const handleResolveAmbiguity = (option: AmbiguityOption) => {
    setResolvedAmbiguity(true);
    setSelectedOption(lang === 'en' ? option.labelEn : option.labelHindi);
  };

  const handleNewApplication = () => {
    setCurrentScenarioId('scenario_ambiguous');
    setResolvedAmbiguity(false);
    setSelectedOption(null);
    setCurrentScreen('home');
  };

  return (
    <div className="app-shell">
      {/* Sleek Modern Sidebar */}
      <Sidebar
        lang={lang}
        onToggleLang={handleToggleLang}
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onSelectCategory={(cat) => {
          if (cat === 'bank') setCurrentScreen('service_start');
          else setCurrentScreen('service_start');
        }}
        onOpenTechModal={() => setIsTechModalOpen(true)}
        isTechModalOpen={isTechModalOpen}
      />

      {/* Main Content Area */}
      <div className="main-viewport-container">
        {/* Trust Safety Pipeline Header */}
        <TrustBanner lang={lang} onOpenTechModal={() => setIsTechModalOpen(true)} />

        {/* View Screens */}
        <main className="main-content">
          {currentScreen === 'home' && (
            <HomeScreen
              lang={lang}
              onStartVoice={() => setCurrentScreen('service_start')}
              onStartManual={() => setCurrentScreen('form')}
              onSelectCategory={(cat) => {
                if (cat === 'bank') setCurrentScreen('service_start');
                else setCurrentScreen('service_start');
              }}
            />
          )}

          {currentScreen === 'service_start' && (
            <ServiceStartScreen
              lang={lang}
              onProceedToVoice={() => setCurrentScreen('voice')}
              onBack={() => setCurrentScreen('home')}
            />
          )}

          {currentScreen === 'voice' && (
            <VoiceScreen
              lang={lang}
              scenario={scenario}
              onSelectScenario={handleSelectScenario}
              onRecordingComplete={() => setCurrentScreen('processing')}
              onBack={() => setCurrentScreen('service_start')}
            />
          )}

          {currentScreen === 'processing' && (
            <ProcessingScreen
              lang={lang}
              scenario={scenario}
              onProcessingComplete={() => setCurrentScreen('form')}
            />
          )}

          {currentScreen === 'form' && (
            <FormScreen
              lang={lang}
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
              lang={lang}
              scenario={scenario}
              resolvedField={selectedOption || 'Aadhaar Last 4 Digits'}
              onNewApplication={handleNewApplication}
            />
          )}
        </main>
      </div>

      {/* System View Telemetry Modal */}
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
