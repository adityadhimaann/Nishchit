'use client';

import React from 'react';
import Image from 'next/image';
import { Mic, Edit3, Building2, FileCheck2, ShieldCheck, Sprout, Sparkles, CheckCircle2, Clock, PauseCircle, Layers } from 'lucide-react';
import { soundEngine } from '@/utils/sound';

interface HomeScreenProps {
  onStartVoice: () => void;
  onStartManual: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartVoice,
  onStartManual,
  onSelectCategory,
}) => {
  return (
    <div className="animate-fade-in">
      {/* Operator Dashboard Today's Status */}
      <div className="operator-stats-card">
        <div className="stats-title-group">
          <div className="stats-icon-badge">
            <Layers size={22} />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>आज का काम</div>
            <div className="sub-english">Operator Daily Work Summary</div>
          </div>
        </div>

        <div className="stats-metrics-grid">
          <div className="stat-pill total">
            <span className="stat-count">12</span>
            <span>कुल आवेदन</span>
          </div>
          <div className="stat-pill success">
            <CheckCircle2 size={18} color="var(--color-success)" />
            <span className="stat-count">8</span>
            <span>पूरे हुए</span>
          </div>
          <div className="stat-pill warning">
            <Clock size={18} color="var(--color-warning)" />
            <span className="stat-count">3</span>
            <span>जांच बाकी</span>
          </div>
          <div className="stat-pill paused">
            <PauseCircle size={18} color="var(--color-text-muted)" />
            <span className="stat-count">1</span>
            <span>रुका हुआ</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-grid">
        {/* Left Side: Welcoming Rural UX */}
        <div className="hero-card-left">
          <div>
            <h1 className="hero-heading hindi-lead">बोलिए, फॉर्म हम संभालेंगे।</h1>
            <p className="hero-subtitle">
              ग्राहक अपनी स्थानीय भाषा में बोल सकते हैं। Nishchit बिना किसी अनुमान या गलती के फॉर्म सुरक्षित रूप से भरता है।
              <span className="sub-english">Speak naturally. Nishchit helps fill the form safely without guessing.</span>
            </p>
          </div>

          <div className="hero-actions-group">
            <button
              className="btn-primary-giant"
              onClick={() => {
                soundEngine.playTone('start');
                onStartVoice();
              }}
            >
              <Mic size={36} />
              <div className="btn-giant-content">
                <span className="btn-giant-text">बोलना शुरू करें</span>
                <span className="btn-giant-sub">Start Voice Assisted Form</span>
              </div>
            </button>

            <button
              className="btn-secondary-giant"
              onClick={() => {
                soundEngine.playTone('click');
                onStartManual();
              }}
            >
              <Edit3 size={20} />
              <span>लिखकर भरें (Manual Entry)</span>
            </button>
          </div>
        </div>

        {/* Right Side: Authentic Rural CSC Photo */}
        <div className="hero-card-right">
          <img
            src="/images/csc_counter_hero.jpg"
            alt="Rural Indian CSC operator assisting an elderly villager"
            className="hero-csc-image"
          />
          <div className="hero-image-overlay">
            <div className="hero-image-badge">
              <span className="status-dot" />
              <span>डिजिटल सेवा केंद्र • ग्राम पंचायत</span>
            </div>
            <div className="hero-image-caption">
              ऑपरेटर और नागरिक के बीच सीधा और सरल संवाद
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <div className="section-header-row">
          <div>
            <h2 className="section-title hindi-lead">आज की सेवाएं</h2>
            <div className="sub-english">Available CSC Digital Services</div>
          </div>
        </div>

        <div className="services-grid">
          {/* Active Demo Tile: Bank Account Application */}
          <div
            className="service-tile active-demo"
            onClick={() => {
              soundEngine.playTone('start');
              onSelectCategory('bank');
            }}
          >
            <div className="active-demo-pill">डेमो चालू है • Active Demo</div>
            <div className="service-tile-icon">
              <Building2 size={30} />
            </div>
            <div>
              <div className="service-tile-title">🏦 बैंक फॉर्म</div>
              <div className="sub-english">Bank Account Application</div>
            </div>
            <div className="service-tile-desc">
              नया जन-धन / बचत खाता आवेदन बोलकर तुरंत भरें।
            </div>
          </div>

          {/* Service 2 */}
          <div
            className="service-tile"
            onClick={() => {
              soundEngine.playTone('click');
              onSelectCategory('gov');
            }}
          >
            <div className="service-tile-icon">
              <FileCheck2 size={30} />
            </div>
            <div>
              <div className="service-tile-title">📄 सरकारी आवेदन</div>
              <div className="sub-english">Government Applications</div>
            </div>
            <div className="service-tile-desc">
              राशन कार्ड, आयुष्मान कार्ड एवं मूल निवास प्रमाण पत्र।
            </div>
          </div>

          {/* Service 3 */}
          <div
            className="service-tile"
            onClick={() => {
              soundEngine.playTone('click');
              onSelectCategory('pension');
            }}
          >
            <div className="service-tile-icon">
              <ShieldCheck size={30} />
            </div>
            <div>
              <div className="service-tile-title">💰 पेंशन / बीमा</div>
              <div className="sub-english">Pension &amp; Insurance</div>
            </div>
            <div className="service-tile-desc">
              वृद्धावस्था पेंशन, सुरक्षा बीमा योजना एवं जीवन ज्योति।
            </div>
          </div>

          {/* Service 4 */}
          <div
            className="service-tile"
            onClick={() => {
              soundEngine.playTone('click');
              onSelectCategory('farmer');
            }}
          >
            <div className="service-tile-icon">
              <Sprout size={30} />
            </div>
            <div>
              <div className="service-tile-title">🌾 किसान सेवाएं</div>
              <div className="sub-english">Farmer Services (KCC / PM-Kisan)</div>
            </div>
            <div className="service-tile-desc">
              पीएम-किसान e-KYC, फसल बीमा एवं मृदा स्वास्थ्य कार्ड।
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
