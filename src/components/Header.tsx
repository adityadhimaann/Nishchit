'use client';

import React from 'react';
import { Cpu } from 'lucide-react';
import { soundEngine } from '@/utils/sound';
import { Language, TRANSLATIONS } from '@/data/translations';
import { Logo } from './Logo';

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
          <Logo size={36} />
          <div className="brand-text">
            <div className="brand-title">
              <span className="brand-name-en">Nishchit</span>
              <span className="brand-name-hi">निश्चित</span>
            </div>
            <div className="brand-tagline">
              <span>{t.brand.tagline}</span>
              <span className="pill-en">{t.brand.subTagline}</span>
            </div>
          </div>
        </button>

        <div className="header-actions">
          {/* Monochrome Language Switcher */}
          <div className="lang-switcher-pill">
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => {
                soundEngine.playTone('click');
                onToggleLang('en');
              }}
            >
              English
            </button>
            <button
              className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
              onClick={() => {
                soundEngine.playTone('click');
                onToggleLang('hi');
              }}
            >
              हिन्दी
            </button>
          </div>

          {/* Clean Offline Badge */}
          <div className="status-badge-offline">
            <span className="status-dot" />
            <span>{t.brand.offlineStatus}</span>
          </div>

          {/* System Telemetry View */}
          <button
            className={`btn-tech-mode ${isTechModalOpen ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playTone('click');
              onOpenTechModal();
            }}
            title={lang === 'en' ? 'View Technical Architecture' : 'तकनीकी आर्किटेक्चर देखें'}
          >
            <Cpu size={14} />
            <span>{t.brand.systemView}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
