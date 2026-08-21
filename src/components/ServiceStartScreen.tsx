'use client';

import React from 'react';
import { Mic, ArrowLeft, Building2, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { soundEngine } from '@/utils/sound';

interface ServiceStartScreenProps {
  onProceedToVoice: () => void;
  onBack: () => void;
}

export const ServiceStartScreen: React.FC<ServiceStartScreenProps> = ({
  onProceedToVoice,
  onBack,
}) => {
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
          <span>मुख्य पृष्ठ पर वापस जाएं (Back to Home)</span>
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
                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>बैंक खाता आवेदन</h2>
                <div className="sub-english">Bank Account Application Form</div>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1.5px solid var(--color-border)', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
                किसकी जानकारी भरनी है?
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                ग्राहक को कोई फॉर्म पढ़ने या अंग्रेजी जानने की आवश्यकता नहीं है। वे सीधे अपनी सामान्य बोलचाल में नाम, पता, आय बता सकते हैं।
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
                  <span className="btn-giant-text">बोलकर जानकारी भरें</span>
                  <span className="btn-giant-sub">Start Voice Input (Hindi / Hinglish)</span>
                </div>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
              <Sparkles size={18} color="var(--color-primary)" />
              <span>ऑपरेटर को फॉर्म फील्ड का क्रम याद रखने की जरूरत नहीं है।</span>
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
              <div className="context-villager-title">ग्राहक संदर्भ (Citizen Context)</div>
              <div className="context-villager-sub">
                &ldquo;ग्राहक को फॉर्म पढ़ने की जरूरत नहीं है। वे बस अपनी बात सहज रूप से कह सकते हैं।&rdquo;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
