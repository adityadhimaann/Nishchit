'use client';

import React from 'react';
import { Cpu, Languages } from 'lucide-react';
import { soundEngine } from '@/utils/sound';
import { Language, TRANSLATIONS } from '@/data/translations';

interface HeaderProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
  onGoHome: () => void;
  onOpenTechModal: () => void;
  isTechModalOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onGoHome,
  onOpenTechModal,
  isTechModalOpen,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="app-header">
      <div className="header-container">
        <button
          className="brand-area"
          onClick={() => {
            soundEngine.playTone('click');
            onGoHome();
          }}
          title={lang === 'en' ? 'Go to Home' : 'होम स्क्रीन पर जाएं'}
        >
          <div className="brand-logo-badge">नि</div>
          <div className="brand-text">
            <div className="brand-title">
              <span className="brand-name-en" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                Nishchit
              </span>
              <span className="brand-name-hi" style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)' }}>
                निश्चित
              </span>
            </div>
            <div className="brand-tagline">
              <span>{t.brand.tagline}</span>
              <span className="pill-en">{t.brand.subTagline}</span>
            </div>
          </div>
        </button>

        <div className="header-actions">
          {/* Language Switcher in Navbar */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--color-surface-subtle)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              padding: '2px',
              gap: '2px',
            }}
          >
            <button
              onClick={() => {
                soundEngine.playTone('click');
                onToggleLang('en');
              }}
              style={{
                border: 'none',
                background: lang === 'en' ? 'var(--color-primary)' : 'transparent',
                color: lang === 'en' ? '#fff' : 'var(--color-text-main)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
              }}
            >
              English
            </button>
            <button
              onClick={() => {
                soundEngine.playTone('click');
                onToggleLang('hi');
              }}
              style={{
                border: 'none',
                background: lang === 'hi' ? 'var(--color-primary)' : 'transparent',
                color: lang === 'hi' ? '#fff' : 'var(--color-text-main)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
              }}
            >
              हिन्दी
            </button>
          </div>

          {/* Offline badge */}
          <div className="status-badge-offline">
            <span className="status-dot" />
            <span>{t.brand.offlineStatus}</span>
          </div>

          {/* System view */}
          <button
            className={`btn-tech-mode ${isTechModalOpen ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playTone('click');
              onOpenTechModal();
            }}
            title={lang === 'en' ? 'View Technical Architecture' : 'तकनीकी आर्किटेक्चर देखें'}
          >
            <Cpu size={16} />
            <span>{t.brand.systemView}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
