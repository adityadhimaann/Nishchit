'use client';

import React from 'react';
import { Cpu, ShieldCheck } from 'lucide-react';
import { soundEngine } from '@/utils/sound';

interface HeaderProps {
  onGoHome: () => void;
  onOpenTechModal: () => void;
  isTechModalOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  onOpenTechModal,
  isTechModalOpen,
}) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <button
          className="brand-area"
          onClick={() => {
            soundEngine.playTone('click');
            onGoHome();
          }}
          title="होम स्क्रीन पर जाएं"
        >
          <div className="brand-logo-badge">नि</div>
          <div className="brand-text">
            <div className="brand-title">
              <span className="brand-name-hi">निश्चित</span>
              <span className="brand-name-en">Nishchit</span>
            </div>
            <div className="brand-tagline">
              <span>सही जानकारी, सही फैसला।</span>
              <span className="pill-en">AI that knows when not to act</span>
            </div>
          </div>
        </button>

        <div className="header-actions">
          <div className="status-badge-offline">
            <span className="status-dot" />
            <span>● सेवा केंद्र ऑफलाइन मोड में (Local AI Active)</span>
          </div>

          <button
            className={`btn-tech-mode ${isTechModalOpen ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playTone('click');
              onOpenTechModal();
            }}
            title="तकनीकी आर्किटेक्चर देखें (Judges View)"
          >
            <Cpu size={16} />
            <span>सिस्टम व्यू (System View)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
