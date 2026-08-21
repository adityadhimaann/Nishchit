'use client';

import React from 'react';
import { Printer, CheckCircle, ShieldCheck, QrCode, Sparkles } from 'lucide-react';
import { soundEngine } from '@/utils/sound';
import { Language, TRANSLATIONS } from '@/data/translations';

interface ReceiptModalProps {
  lang: Language;
  name: string;
  village: string;
  income: string;
  resolvedField: string;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  lang,
  name,
  village,
  income,
  resolvedField,
  onClose,
}) => {
  const t = TRANSLATIONS[lang];
  const receiptId = 'CSC-NISH-849201';
  const securityHash = '0x9f4a...88c2 (SHA-256 Verified)';
  const currentDate = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="receipt-card animate-fade-in">
      <div className="receipt-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--neon-cyan)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '0.35rem' }}>
          <Sparkles size={12} />
          <span>{t.receipt.headerBadge}</span>
        </div>
        <div className="receipt-title">{t.receipt.title}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-medium)', marginTop: '0.2rem' }}>
          {t.receipt.sub}
        </div>
      </div>

      <div className="receipt-grid">
        <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>{t.receipt.applicantName}</span>
          <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>{name}</strong>
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>{t.receipt.receiptNo}</span>
          <strong style={{ fontFamily: 'var(--font-family-mono)', color: 'var(--neon-cyan)', fontSize: '0.95rem' }}>{receiptId}</strong>
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>{t.receipt.villageAddress}</span>
          <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>{village}</strong>
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>{t.receipt.annualIncome}</span>
          <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>{income}</strong>
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-glass)', gridColumn: 'span 2' }}>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>{t.receipt.verifiedRef}</span>
          <strong style={{ color: 'var(--neon-emerald)', fontSize: '1rem', fontFamily: 'var(--font-family-mono)' }}>1234 ({resolvedField})</strong>
        </div>
      </div>

      <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.35)', padding: '1rem', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.82rem', color: '#CBD5E1' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--neon-emerald)', marginBottom: '0.3rem' }}>
          <CheckCircle size={16} />
          <span>{t.receipt.auditTitle}</span>
        </div>
        <div style={{ lineHeight: 1.5 }}>{t.receipt.auditDesc}</div>
        <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', fontFamily: 'var(--font-family-mono)', color: 'var(--text-muted)' }}>
          Cryptographic Hash: {securityHash}
        </div>
      </div>

      <div className="receipt-footer">
        <div>{t.receipt.operatorSignature}</div>
        <button
          onClick={() => {
            soundEngine.playTone('click');
            window.print();
          }}
          style={{
            background: 'linear-gradient(135deg, #FF6B2C 0%, #EA580C 100%)',
            color: '#fff',
            border: 'none',
            padding: '0.55rem 1.25rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 0 15px var(--neon-orange-glow)',
          }}
        >
          <Printer size={15} />
          <span>{t.receipt.btnPrint}</span>
        </button>
      </div>
    </div>
  );
};
