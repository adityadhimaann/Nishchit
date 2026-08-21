'use client';

import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { soundEngine } from '@/utils/sound';

interface TrustBannerProps {
  onOpenTechModal: () => void;
}

export const TrustBanner: React.FC<TrustBannerProps> = ({ onOpenTechModal }) => {
  return (
    <div className="trust-banner-wrapper">
      <div className="trust-banner">
        <div className="trust-pipeline">
          <span className="trust-title">
            <Shield size={15} />
            <span>Nishchit Safety Check:</span>
          </span>
          <span className="trust-step">1. AI Proposal</span>
          <ArrowRight size={12} className="trust-arrow" />
          <span className="trust-step">2. Independent Critic</span>
          <ArrowRight size={12} className="trust-arrow" />
          <span className="trust-step">3. Schema Constraints</span>
          <ArrowRight size={12} className="trust-arrow" />
          <span className="trust-step" style={{ background: '#EAF7EF', color: '#14532D' }}>
            ✓ Safe Action / Operator Escalate
          </span>
        </div>

        <button
          className="trust-details-btn"
          onClick={() => {
            soundEngine.playTone('click');
            onOpenTechModal();
          }}
        >
          सुरक्षा तंत्र समझें (How it works)
        </button>
      </div>
    </div>
  );
};
