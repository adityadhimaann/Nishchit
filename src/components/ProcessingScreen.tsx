'use client';

import React, { useEffect, useState } from 'react';
import { Mic, Brain, Search, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Scenario } from '@/data/scenarios';
import { soundEngine } from '@/utils/sound';
import { Language, TRANSLATIONS } from '@/data/translations';

interface ProcessingScreenProps {
  lang: Language;
  scenario: Scenario;
  onProcessingComplete: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  lang,
  scenario,
  onProcessingComplete,
}) => {
  const t = TRANSLATIONS[lang];
  const [step, setStep] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep(2);
      soundEngine.playTone('click');
    }, 700);

    const t2 = setTimeout(() => {
      setStep(3);
      soundEngine.playTone('click');
    }, 1400);

    const t3 = setTimeout(() => {
      setStep(4);
      soundEngine.playTone('click');
    }, 2100);

    const t4 = setTimeout(() => {
      setStep(5);
      if (scenario.ambiguousItem) {
        soundEngine.playTone('warning');
      } else {
        soundEngine.playTone('verified');
      }
    }, 2800);

    const t5 = setTimeout(() => {
      onProcessingComplete();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [scenario, onProcessingComplete]);

  return (
    <div className="animate-fade-in">
      <div className="processing-panel">
        <div className="processing-header">
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
            {t.processing.heading}
          </h2>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto' }}>
            {t.processing.youSaid} &ldquo;{scenario.speechTranscript}&rdquo;
          </p>
        </div>

        <div className="processing-flow-list">
          {/* Step 1: Voice Recorded */}
          <div className={`processing-step-card ${step >= 1 ? 'completed' : ''}`}>
            <div className="step-icon-circle">
              {step >= 1 ? '✓' : <Mic size={20} />}
            </div>
            <div>
              <div className="step-text-title">{t.processing.step1Title}</div>
              <div className="step-text-sub">{t.processing.step1Sub}</div>
            </div>
          </div>

          {/* Step 2: Information Extracted */}
          <div className={`processing-step-card ${step >= 2 ? 'completed' : ''}`}>
            <div className="step-icon-circle">
              {step >= 2 ? '✓' : <Brain size={20} />}
            </div>
            <div>
              <div className="step-text-title">{t.processing.step2Title}</div>
              <div className="step-text-sub">{t.processing.step2Sub}</div>
            </div>
          </div>

          {/* Step 3: Independent Critic Audit */}
          <div className={`processing-step-card ${step >= 3 ? 'completed' : ''}`}>
            <div className="step-icon-circle">
              {step >= 3 ? '✓' : <Search size={20} />}
            </div>
            <div>
              <div className="step-text-title">{t.processing.step3Title}</div>
              <div className="step-text-sub">{t.processing.step3Sub}</div>
            </div>
          </div>

          {/* Step 4: Safe fields verified */}
          <div className={`processing-step-card ${step >= 4 ? 'completed' : ''}`}>
            <div className="step-icon-circle">
              {step >= 4 ? '✓' : <CheckCircle2 size={20} />}
            </div>
            <div>
              <div className="step-text-title">{t.processing.step4Title}</div>
              <div className="step-text-sub">{scenario.fields.length} {t.processing.step4Sub}</div>
            </div>
          </div>

          {/* Step 5: Ambiguity Flag or Full Complete */}
          {scenario.ambiguousItem ? (
            <div className={`processing-step-card ${step >= 5 ? 'warning' : ''}`}>
              <div className="step-icon-circle">
                {step >= 5 ? '⚠' : <AlertTriangle size={20} />}
              </div>
              <div>
                <div className="step-text-title" style={{ color: 'var(--color-warning-text)' }}>
                  {t.processing.step5WarningTitle}
                </div>
                <div className="step-text-sub">{t.processing.step5WarningSub}</div>
              </div>
            </div>
          ) : (
            <div className={`processing-step-card ${step >= 5 ? 'completed' : ''}`}>
              <div className="step-icon-circle">
                {step >= 5 ? '✓' : <CheckCircle2 size={20} />}
              </div>
              <div>
                <div className="step-text-title">{t.processing.step5SuccessTitle}</div>
                <div className="step-text-sub">{t.processing.step5SuccessSub}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
