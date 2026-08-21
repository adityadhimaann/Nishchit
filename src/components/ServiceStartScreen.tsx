'use client';

import React from 'react';
import { Mic, ArrowLeft, Building2, Sparkles } from 'lucide-react';
import { soundEngine } from '@/utils/sound';
import { Language, TRANSLATIONS } from '@/data/translations';

interface ServiceStartScreenProps {
  lang: Language;
  onProceedToVoice: () => void;
  onBack: () => void;
}

export const ServiceStartScreen: React.FC<ServiceStartScreenProps> = ({
  lang,
  onProceedToVoice,
  onBack,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => {
            soundEngine.playTone('click');
            onBack();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-primary)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <ArrowLeft size={18} />
          <span>{t.serviceStart.backToHome}</span>
        </button>
      </div>

      <div className="workflow-layout">
        <div className="workflow-main">
          <div className="form-section-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="form-badge-icon">
                <Building2 size={26} />
              </div>
              <div>
                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{t.serviceStart.formTitle}</h2>
                <div className="sub-english">{t.serviceStart.formSub}</div>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1.5px solid var(--color-border)', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
                {t.serviceStart.whoIsThisFor}
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {t.serviceStart.instructions}
              </p>

              <button
                className="btn-primary-giant"
                style={{ width: '100%' }}
                onClick={() => {
                  soundEngine.playTone('start');
                  onProceedToVoice();
                }}
              >
                <Mic size={32} />
                <div className="btn-giant-content">
                  <span className="btn-giant-text">{t.serviceStart.btnStartVoice}</span>
                  <span className="btn-giant-sub">{t.serviceStart.btnStartVoiceSub}</span>
                </div>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
              <Sparkles size={18} color="var(--color-primary)" />
              <span>{t.serviceStart.operatorHint}</span>
            </div>
          </div>
        </div>

        {/* Sidebar with Villager Photo Context */}
        <div className="workflow-sidebar">
          <div className="context-villager-card">
            <img
              src="/images/villager_speaking.jpg"
              alt="Rural Indian villager speaking at desk"
            />
            <div className="context-villager-content">
              <div className="context-villager-title">{t.serviceStart.citizenContextTitle}</div>
              <div className="context-villager-sub">
                &ldquo;{t.serviceStart.citizenContextSub}&rdquo;
              </div>
            </div>
          </div>

          <div style={{ background: '#FFFDF9', border: '1.5px solid var(--color-border)', borderRadius: '14px', padding: '1rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
            <strong style={{ color: 'var(--color-text-main)', display: 'block', marginBottom: '0.25rem' }}>
              {t.serviceStart.antiHallucinationTitle}
            </strong>
            {t.serviceStart.antiHallucinationDesc}
          </div>
        </div>
      </div>
    </div>
  );
};
