'use client';

import React from 'react';
import { Mic, ArrowLeft, Building2, Sparkles, ShieldCheck, Zap } from 'lucide-react';
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
      <div style={{ marginBottom: '1.75rem' }}>
        <button
          onClick={() => {
            soundEngine.playTone('click');
            onBack();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--neon-cyan)',
            fontSize: 'var(--text-sm)',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <ArrowLeft size={18} />
          <span>{t.serviceStart.backToHome}</span>
        </button>
      </div>

      <div className="workflow-layout">
        <div className="workflow-main">
          <div className="form-section-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
              <div className="form-badge-icon">
                <Building2 size={30} />
              </div>
              <div>
                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: '#FFFFFF' }}>{t.serviceStart.formTitle}</h2>
                <div className="sub-english">{t.serviceStart.formSub}</div>
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid var(--border-glass-bright)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-orange)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                <Zap size={14} />
                <span>ACTIVE INTELLIGENCE PROTOCOL</span>
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 900, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                {t.serviceStart.whoIsThisFor}
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: '#CBD5E1', lineHeight: 1.7, marginBottom: '1.75rem' }}>
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
                <Mic size={36} />
                <div className="btn-giant-content">
                  <span className="btn-giant-text">{t.serviceStart.btnStartVoice}</span>
                  <span className="btn-giant-sub">{t.serviceStart.btnStartVoiceSub}</span>
                </div>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-medium)', fontSize: 'var(--text-sm)' }}>
              <Sparkles size={18} color="var(--neon-cyan)" />
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

          <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '16px', padding: '1.25rem', fontSize: 'var(--text-xs)', color: 'var(--text-medium)', boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)' }}>
            <strong style={{ color: 'var(--neon-cyan)', display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem' }}>
              {t.serviceStart.antiHallucinationTitle}
            </strong>
            {t.serviceStart.antiHallucinationDesc}
          </div>
        </div>
      </div>
    </div>
  );
};
