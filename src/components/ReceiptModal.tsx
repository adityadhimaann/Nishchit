'use client';

import React from 'react';
import { Printer, CheckCircle } from 'lucide-react';
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
  const currentDate = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="receipt-card animate-fade-in">
      <div className="receipt-header">
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '1px' }}>
          {t.receipt.headerBadge}
        </div>
        <div className="receipt-title">{t.receipt.title}</div>
        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
          {t.receipt.sub}
        </div>
      </div>

      <div className="receipt-grid">
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>{t.receipt.applicantName}</span>
          <strong>{name}</strong>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>{t.receipt.receiptNo}</span>
          <strong style={{ fontFamily: 'monospace' }}>{receiptId}</strong>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>{t.receipt.villageAddress}</span>
          <strong>{village}</strong>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>{t.receipt.annualIncome}</span>
          <strong>{income}</strong>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>{t.receipt.verifiedRef}</span>
          <strong style={{ color: 'var(--color-success)' }}>1234 ({resolvedField})</strong>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>{t.receipt.dateTime}</span>
          <strong>{currentDate}</strong>
        </div>
      </div>

      <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.8rem', color: '#334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--color-success)', marginBottom: '0.2rem' }}>
          <CheckCircle size={15} />
          <span>{t.receipt.auditTitle}</span>
        </div>
        <div>{t.receipt.auditDesc}</div>
      </div>

      <div className="receipt-footer">
        <div>{t.receipt.operatorSignature}</div>
        <button
          onClick={() => {
            soundEngine.playTone('click');
            window.print();
          }}
          style={{
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            padding: '0.4rem 0.85rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <Printer size={14} />
          <span>{t.receipt.btnPrint}</span>
        </button>
      </div>
    </div>
  );
};
