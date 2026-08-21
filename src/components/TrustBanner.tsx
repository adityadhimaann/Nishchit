'use client';

import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { soundEngine } from '@/utils/sound';
import { Language, TRANSLATIONS } from '@/data/translations';

interface TrustBannerProps {
  lang: Language;
  onOpenTechModal: () => void;
}

export const TrustBanner: React.FC<TrustBannerProps> = ({ lang, onOpenTechModal }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="trust-banner-wrapper">
      <div className="trust-banner">
        <div className="trust-pipeline">
          <span className="trust-title">
            <Shield size={15} />
            <span>{t.trustBanner.title}</span>
          </span>
          <span className="trust-step">{t.trustBanner.step1}</span>
          <ArrowRight size={12} className="trust-arrow" />
          <span className="trust-step">{t.trustBanner.step2}</span>
          <ArrowRight size={12} className="trust-arrow" />
          <span className="trust-step">{t.trustBanner.step3}</span>
          <ArrowRight size={12} className="trust-arrow" />
          <span className="trust-step" style={{ background: '#EAF7EF', color: '#14532D' }}>
            {t.trustBanner.step4}
          </span>
        </div>

        <button
          className="trust-details-btn"
          onClick={() => {
            soundEngine.playTone('click');
            onOpenTechModal();
          }}
        >
          {t.trustBanner.howItWorks}
        </button>
      </div>
    </div>
  );
};
