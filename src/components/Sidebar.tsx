'use client';

import React from 'react';
import { 
  Home, 
  Mic, 
  Building2, 
  FileCheck2, 
  ShieldCheck, 
  Sprout, 
  Cpu, 
  User, 
  Radio,
  FileText
} from 'lucide-react';
import { soundEngine } from '@/utils/sound';
import { Language, TRANSLATIONS } from '@/data/translations';
import { Logo } from './Logo';

interface SidebarProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
  currentScreen: string;
  onNavigate: (screen: 'home' | 'service_start' | 'voice') => void;
  onSelectCategory: (cat: string) => void;
  onOpenTechModal: () => void;
  isTechModalOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  lang,
  onToggleLang,
  currentScreen,
  onNavigate,
  onSelectCategory,
  onOpenTechModal,
  isTechModalOpen,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand-area">
        <button
          className="sidebar-brand-btn"
          onClick={() => {
            soundEngine.playTone('click');
            onNavigate('home');
          }}
        >
          <Logo size={34} />
          <div className="brand-text">
            <div className="brand-title">
              <span className="brand-name-en">Nishchit</span>
              <span className="brand-name-hi">निश्चित</span>
            </div>
            <div className="brand-tagline">
              <span>{t.brand.tagline}</span>
            </div>
          </div>
        </button>
      </div>

      {/* Language Switcher Pill inside Sidebar */}
      <div className="sidebar-lang-container">
        <div className="sidebar-lang-pill">
          <button
            className={`sidebar-lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playTone('click');
              onToggleLang('en');
            }}
          >
            English
          </button>
          <button
            className={`sidebar-lang-btn ${lang === 'hi' ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playTone('click');
              onToggleLang('hi');
            }}
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="sidebar-nav-section">
        <div className="sidebar-section-label">MAIN NAVIGATION</div>

        <nav className="sidebar-nav-list">
          <button
            className={`sidebar-nav-item ${currentScreen === 'home' ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playTone('click');
              onNavigate('home');
            }}
          >
            <Home size={18} />
            <span>{lang === 'en' ? 'Dashboard' : 'डैशबोर्ड'}</span>
          </button>

          <button
            className={`sidebar-nav-item ${['service_start', 'voice', 'processing', 'form', 'completion'].includes(currentScreen) ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playTone('start');
              onNavigate('voice');
            }}
          >
            <Mic size={18} />
            <span>{lang === 'en' ? 'Voice Form' : 'आवाज़ से फॉर्म'}</span>
          </button>
        </nav>
      </div>

      {/* CSC Services Navigation */}
      <div className="sidebar-nav-section">
        <div className="sidebar-section-label">{lang === 'en' ? 'CSC SERVICES' : 'सेवाएं'}</div>

        <nav className="sidebar-nav-list">
          <button
            className="sidebar-nav-item"
            onClick={() => {
              soundEngine.playTone('start');
              onSelectCategory('bank');
            }}
          >
            <Building2 size={18} />
            <span>{lang === 'en' ? 'Bank Account' : 'बैंक खाता'}</span>
          </button>

          <button
            className="sidebar-nav-item"
            onClick={() => {
              soundEngine.playTone('click');
              onSelectCategory('gov');
            }}
          >
            <FileCheck2 size={18} />
            <span>{lang === 'en' ? 'Govt Schemes' : 'सरकारी योजनाएं'}</span>
          </button>

          <button
            className="sidebar-nav-item"
            onClick={() => {
              soundEngine.playTone('click');
              onSelectCategory('pension');
            }}
          >
            <ShieldCheck size={18} />
            <span>{lang === 'en' ? 'Pension / Insurance' : 'पेंशन व बीमा'}</span>
          </button>

          <button
            className="sidebar-nav-item"
            onClick={() => {
              soundEngine.playTone('click');
              onSelectCategory('farmer');
            }}
          >
            <Sprout size={18} />
            <span>{lang === 'en' ? 'Farmer Services' : 'किसान सेवाएं'}</span>
          </button>
        </nav>
      </div>

      {/* System Telemetry & Operator Footer */}
      <div className="sidebar-footer">
        {/* System Architecture Button */}
        <button
          className={`sidebar-tech-btn ${isTechModalOpen ? 'active' : ''}`}
          onClick={() => {
            soundEngine.playTone('click');
            onOpenTechModal();
          }}
        >
          <Cpu size={16} />
          <span>{t.brand.systemView}</span>
        </button>

        {/* Operator Status Card */}
        <div className="sidebar-operator-card">
          <div className="operator-avatar">
            <User size={16} />
          </div>
          <div className="operator-info">
            <div className="operator-name">Gram Panchayat CSC</div>
            <div className="operator-status">
              <span className="status-dot" />
              <span>{t.brand.offlineStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
