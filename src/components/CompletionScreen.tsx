'use client';

import React, { useState } from 'react';
import { CheckCircle2, Printer, PlusCircle, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { Scenario } from '@/data/scenarios';
import { ReceiptModal } from './ReceiptModal';
import { soundEngine } from '@/utils/sound';

interface CompletionScreenProps {
  scenario: Scenario;
  resolvedField: string;
  onNewApplication: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  scenario,
  resolvedField,
  onNewApplication,
}) => {
  const [showReceipt, setShowReceipt] = useState(true);

  const nameVal = scenario.fields.find((f) => f.id === 'name')?.value || 'रमेश कुमार';
  const villageVal = scenario.fields.find((f) => f.id === 'address')?.value || 'रामपुर';
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
            <h2 className="completion-title hindi-lead">आवेदन तैयार है</h2>
            <div className="sub-english" style={{ fontSize: 'var(--text-base)', marginBottom: '1rem' }}>
              Bank Account Application Ready for Final Processing
            </div>

            <div className="completion-stats-list">
              <div className="completion-stat-chip" style={{ background: '#EAF7EF', borderColor: '#A3D8B4', color: '#134B26' }}>
                ✓ {totalFields} में से {totalFields} जानकारी पूरी
              </div>
              <div className="completion-stat-chip">
                🤖 {aiAutoFilled} AI द्वारा सुरक्षित रूप से भरी गई
              </div>
              {operatorConfirmed > 0 && (
                <div className="completion-stat-chip" style={{ background: '#FFF8E6', borderColor: '#FFD27D', color: '#7A3D00' }}>
                  👤 {operatorConfirmed} ऑपरेटर द्वारा पुष्टि की गई
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
            <span>{showReceipt ? 'पावती रसीद छिपाएं' : 'पावती रसीद देखें (View Receipt)'}</span>
          </button>

          <button
            className="btn-form-action-secondary"
            onClick={() => {
              soundEngine.playTone('start');
              window.print();
            }}
          >
            <Printer size={18} />
            <span>रसीद प्रिंट करें (Print Slip)</span>
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
            <span>नया आवेदन (New Application)</span>
          </button>
        </div>

        {/* Printable Customer Receipt Preview */}
        {showReceipt && (
          <ReceiptModal
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
