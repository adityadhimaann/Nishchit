'use client';

import React from 'react';
import { Printer, CheckCircle, FileText } from 'lucide-react';
import { soundEngine } from '@/utils/sound';

interface ReceiptModalProps {
  name: string;
  village: string;
  income: string;
  resolvedField: string;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  name,
  village,
  income,
  resolvedField,
  onClose,
}) => {
  const receiptId = 'CSC-NISH-849201';
  const currentDate = new Date().toLocaleDateString('hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="receipt-card animate-fade-in">
      <div className="receipt-header">
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '1px' }}>
          डिजिटल सेवा केंद्र • COMMON SERVICE CENTRE
        </div>
        <div className="receipt-title">बैंक खाता आवेदन - पावती रसीद (Acknowledgment Slip)</div>
        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
          निश्चित (Nishchit AI) द्वारा सुरक्षित रूप से सत्यापित एवं जनरेट किया गया
        </div>
      </div>

      <div className="receipt-grid">
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>आवेदक का नाम:</span>
          <strong>{name}</strong>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>आवेदन / रसीद क्र.:</span>
          <strong style={{ fontFamily: 'monospace' }}>{receiptId}</strong>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>ग्राम / पता:</span>
          <strong>{village}</strong>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>घोषित वार्षिक आय:</span>
          <strong>{income}</strong>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>सत्यापित खाता / संदर्भ:</span>
          <strong style={{ color: 'var(--color-success)' }}>1234 ({resolvedField})</strong>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>तारीख व समय:</span>
          <strong>{currentDate}</strong>
        </div>
      </div>

      <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.8rem', color: '#334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--color-success)', marginBottom: '0.2rem' }}>
          <CheckCircle size={15} />
          <span>सुरक्षा प्रमाणीकरण: 100% सटीक (Dual AI Critic Audited)</span>
        </div>
        <div>ऑपरेटर ने अस्पष्ट संख्या का सत्यापन मैन्युअल पुष्टि द्वारा किया है।</div>
      </div>

      <div className="receipt-footer">
        <div>ऑपरेटर हस्ताक्षर: _________________</div>
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
          <span>प्रिंट निकालें (Print)</span>
        </button>
      </div>
    </div>
  );
};
