'use client';

import React from 'react';
import { Mic, Edit3, Building2, FileCheck2, ShieldCheck, Sprout, CheckCircle2, Clock, PauseCircle, Layers, ArrowUpRight, Sparkles } from 'lucide-react';
import { soundEngine } from '@/utils/sound';
import { Language, TRANSLATIONS } from '@/data/translations';

interface HomeScreenProps {
  lang: Language;
  onStartVoice: () => void;
  onStartManual: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  lang,
  onStartVoice,
  onStartManual,
  onSelectCategory,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="animate-fade-in">
      {/* Operator HUD Today's Status */}
      <div className="operator-stats-card">
        <div className="stats-title-group">
          <div className="stats-icon-badge">
            <Layers size={22} />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: '#FFFFFF' }}>{t.home.dailyWorkTitle}</div>
            <div className="sub-english">{t.home.dailyWorkSub}</div>
          </div>
        </div>

        <div className="stats-metrics-grid">
          <div className="stat-pill total">
            <span className="stat-count">12</span>
            <span>{t.home.totalApps}</span>
          </div>
          <div className="stat-pill success">
            <CheckCircle2 size={18} color="var(--neon-emerald)" />
            <span className="stat-count">8</span>
            <span>{t.home.completed}</span>
          </div>
          <div className="stat-pill warning">
            <Clock size={18} color="var(--neon-amber)" />
            <span className="stat-count">3</span>
            <span>{t.home.pendingReview}</span>
          </div>
          <div className="stat-pill paused">
            <PauseCircle size={18} color="var(--text-muted)" />
            <span className="stat-count">1</span>
            <span>{t.home.paused}</span>
          </div>
        </div>
      </div>

      {/* Futuristic Hero Section */}
      <div className="hero-grid">
        {/* Left Side: Welcoming Futuristic Voice Terminal */}
        <div className="hero-card-left">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.3)', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--neon-cyan)', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
              <Sparkles size={13} />
              <span>NEXT-GEN CSC OPERATOR ASSISTANT</span>
            </div>
            <h1 className="hero-heading hindi-lead">{t.home.heroHeading}</h1>
            <p className="hero-subtitle">
              {t.home.heroSub}
              <span className="sub-english">{t.home.heroSubSmall}</span>
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
              <Mic size={38} />
              <div className="btn-giant-content">
                <span className="btn-giant-text">{t.home.btnStartVoice}</span>
                <span className="btn-giant-sub">{t.home.btnStartVoiceSub}</span>
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
              <span>{t.home.btnManual}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Authentic Rural CSC Photo with Cyber Holographic Frame */}
        <div className="hero-card-right">
          <img
            src="/images/csc_counter_hero.jpg"
            alt="Rural Indian CSC operator assisting an elderly villager"
            className="hero-csc-image"
          />
          <div className="hero-image-overlay">
            <div className="hero-image-badge">
              <span className="status-dot" />
              <span>{t.home.cscBadge}</span>
            </div>
            <div className="hero-image-caption">
              {t.home.cscCaption}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <div className="section-header-row">
          <div>
            <h2 className="section-title hindi-lead">{t.home.servicesTitle}</h2>
            <div className="sub-english">{t.home.servicesSub}</div>
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
            <div className="active-demo-pill">{t.home.bankActiveDemo}</div>
            <div className="service-tile-icon">
              <Building2 size={32} />
            </div>
            <div>
              <div className="service-tile-title">{t.home.bankTileTitle}</div>
              <div className="sub-english">{t.home.bankTileSub}</div>
            </div>
            <div className="service-tile-desc">
              {t.home.bankTileDesc}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--neon-orange)', fontSize: '0.85rem', fontWeight: 800, marginTop: 'auto' }}>
              <span>Launch Workflow</span>
              <ArrowUpRight size={16} />
            </div>
          </div>

          {/* Service 2: Government Applications */}
          <div
            className="service-tile"
            onClick={() => {
              soundEngine.playTone('click');
              onSelectCategory('gov');
            }}
          >
            <div className="service-tile-icon">
              <FileCheck2 size={32} />
            </div>
            <div>
              <div className="service-tile-title">{t.home.govTileTitle}</div>
              <div className="sub-english">{t.home.govTileSub}</div>
            </div>
            <div className="service-tile-desc">
              {t.home.govTileDesc}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-medium)', fontSize: '0.85rem', fontWeight: 700, marginTop: 'auto' }}>
              <span>View Schemes</span>
              <ArrowUpRight size={16} />
            </div>
          </div>

          {/* Service 3: Pension & Insurance */}
          <div
            className="service-tile"
            onClick={() => {
              soundEngine.playTone('click');
              onSelectCategory('pension');
            }}
          >
            <div className="service-tile-icon">
              <ShieldCheck size={32} />
            </div>
            <div>
              <div className="service-tile-title">{t.home.pensionTileTitle}</div>
              <div className="sub-english">{t.home.pensionTileSub}</div>
            </div>
            <div className="service-tile-desc">
              {t.home.pensionTileDesc}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-medium)', fontSize: '0.85rem', fontWeight: 700, marginTop: 'auto' }}>
              <span>Check Eligibility</span>
              <ArrowUpRight size={16} />
            </div>
          </div>

          {/* Service 4: Farmer Services */}
          <div
            className="service-tile"
            onClick={() => {
              soundEngine.playTone('click');
              onSelectCategory('farmer');
            }}
          >
            <div className="service-tile-icon">
              <Sprout size={32} />
            </div>
            <div>
              <div className="service-tile-title">{t.home.farmerTileTitle}</div>
              <div className="sub-english">{t.home.farmerTileSub}</div>
            </div>
            <div className="service-tile-desc">
              {t.home.farmerTileDesc}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-medium)', fontSize: '0.85rem', fontWeight: 700, marginTop: 'auto' }}>
              <span>Farmer Portal</span>
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
