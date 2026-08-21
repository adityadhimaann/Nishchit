'use client';

import React, { useState } from 'react';
import { Printer, PlusCircle, FileText } from 'lucide-react';
import { Scenario } from '@/data/scenarios';
import { ReceiptModal } from './ReceiptModal';
import { soundEngine } from '@/utils/sound';
import { Language, TRANSLATIONS } from '@/data/translations';

interface CompletionScreenProps {
  lang: Language;
  scenario: Scenario;
  resolvedField: string;
  onNewApplication: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  lang,
  scenario,
  resolvedField,
  onNewApplication,
}) => {
  const t = TRANSLATIONS[lang];
  const [showReceipt, setShowReceipt] = useState(true);

  const nameVal = scenario.fields.find((f) => f.id === 'name')?.value || 'Ramesh Kumar (रमेश कुमार)';
  const villageVal = scenario.fields.find((f) => f.id === 'address')?.value || 'Rampur, UP';
  const incomeVal = scenario.fields.find((f) => f.id === 'income')?.value || '₹5,00,000';

  const totalFields = scenario.fields.length + (scenario.ambiguousItem ? 1 : 0);
  const aiAutoFilled = scenario.fields.length;
  const operatorConfirmed = scenario.ambiguousItem ? 1 : 0;

  return (
    <div className="animate-fade-in">
      <div className="completion-panel">
        <div className="completion-hero-row">
          <div>
            <div className="completion-badge-circle">✓</div>
            <h2 className="completion-title hindi-lead">{t.completion.title}</h2>
            <div className="sub-english" style={{ fontSize: 'var(--text-base)', marginBottom: '1rem' }}>
              {t.completion.sub}
            </div>

            <div className="completion-stats-list">
              <div className="completion-stat-chip" style={{ background: '#EAF7EF', borderColor: '#A3D8B4', color: '#134B26' }}>
                ✓ {totalFields} / {totalFields} {t.completion.allVerifiedTag}
              </div>
              <div className="completion-stat-chip">
                🤖 {aiAutoFilled} {t.completion.aiFilledTag}
              </div>
              {operatorConfirmed > 0 && (
                <div className="completion-stat-chip" style={{ background: '#FFF8E6', borderColor: '#FFD27D', color: '#7A3D00' }}>
                  👤 {operatorConfirmed} {t.completion.operatorConfirmedTag}
                </div>
              )}
            </div>
          </div>

          <div className="completion-photo-box">
            <img
              src="/images/completion_interaction.jpg"
              alt="CSC Operator showing printed verified form to rural Indian family"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="completion-actions-bar">
          <button
            className="btn-form-action-primary"
            onClick={() => {
              soundEngine.playTone('click');
              setShowReceipt(!showReceipt);
            }}
          >
            <FileText size={18} />
            <span>{showReceipt ? t.completion.hideReceipt : t.completion.viewReceipt}</span>
          </button>

          <button
            className="btn-form-action-secondary"
            onClick={() => {
              soundEngine.playTone('start');
              window.print();
            }}
          >
            <Printer size={18} />
            <span>{t.completion.printReceipt}</span>
          </button>

          <button
            className="btn-form-action-secondary"
            style={{ marginLeft: 'auto', background: '#F1ECE3' }}
            onClick={() => {
              soundEngine.playTone('click');
              onNewApplication();
            }}
          >
            <PlusCircle size={18} />
            <span>{t.completion.newApplication}</span>
          </button>
        </div>

        {/* Printable Customer Receipt Preview */}
        {showReceipt && (
          <ReceiptModal
            lang={lang}
            name={nameVal}
            village={villageVal}
            income={incomeVal}
            resolvedField={resolvedField}
            onClose={() => setShowReceipt(false)}
          />
        )}
      </div>
    </div>
  );
};
