'use client';

import React from 'react';
import { Building2, CheckCircle2, AlertTriangle, ShieldCheck, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { AmbiguityOption, Scenario } from '@/data/scenarios';
import { soundEngine } from '@/utils/sound';

interface FormScreenProps {
  scenario: Scenario;
  resolvedAmbiguity: boolean;
  selectedOption: string | null;
  onResolveAmbiguity: (option: AmbiguityOption) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const FormScreen: React.FC<FormScreenProps> = ({
  scenario,
  resolvedAmbiguity,
  selectedOption,
  onResolveAmbiguity,
  onSubmit,
  onBack,
}) => {
  const isAmbiguous = Boolean(scenario.ambiguousItem && !resolvedAmbiguity);
  const totalFields = scenario.fields.length + (scenario.ambiguousItem ? 1 : 0);
  const filledCount = scenario.fields.length + (resolvedAmbiguity ? 1 : 0);

  return (
    <div className="animate-fade-in form-view-container">
      {/* Top Header & Status Bar */}
      <div className="form-header-bar">
        <div className="form-title-group">
          <div className="form-badge-icon">
            <Building2 size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-text-main)' }}>
              बैंक खाता आवेदन
            </h2>
            <div className="sub-english">Bank Account Application Form (Kisan Jan-Dhan Seva)</div>
          </div>
        </div>

        <div className="form-status-summary-pill">
          {isAmbiguous ? (
            <>
              <span style={{ color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={16} />
                <span>{scenario.fields.length} जानकारी भर गई</span>
              </span>
              <span>·</span>
              <span style={{ color: 'var(--color-warning)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <AlertTriangle size={16} />
                <span>1 की पुष्टि बाकी</span>
              </span>
            </>
          ) : (
            <span style={{ color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={18} />
              <span>{totalFields} में से {totalFields} जानकारी पूरी (100% सत्यापित)</span>
            </span>
          )}
        </div>
      </div>

      {/* Verified Personal Details Section */}
      <div className="form-section-card">
        <div className="form-section-title">
          <span>व्यक्तिगत विवरण (Personal Details)</span>
        </div>

        <div className="fields-two-column">
          {scenario.fields.map((field) => (
            <div key={field.id} className="form-field-group">
              <label className="field-label">
                <span>{field.labelHindi}</span>
                <span className="verification-tag">✓ सही जानकारी मिली</span>
              </label>
              <div className="field-value-box verified">
                <span>{field.value}</span>
                <span style={{ color: 'var(--color-success)', fontSize: '1.25rem' }}>✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          THE HERO MOMENT: AMBER AMBIGUITY WARNING PANEL
          ========================================================================= */}
      {scenario.ambiguousItem && (
        <div className="form-section-card" style={{ padding: '0', border: 'none', background: 'none' }}>
          {!resolvedAmbiguity ? (
            <div className="hero-ambiguity-panel">
              {/* Header */}
              <div className="ambiguity-header-row">
                <div className="ambiguity-icon-box">
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <h3 className="ambiguity-title-text">⚠ इस जानकारी की पुष्टि जरूरी है</h3>
                  <div className="sub-english">Operator Verification Required</div>
                </div>
              </div>

              {/* Number Spotlight */}
              <div className="ambiguity-number-spotlight">
                <div className="number-quote-context">
                  ग्राहक ने कहा: <strong>&ldquo;{scenario.ambiguousItem.spokenSnippet}&rdquo;</strong>
                </div>
                <div className="number-giant-badge">
                  {scenario.ambiguousItem.rawNumber}
                </div>
              </div>

              {/* Question */}
              <div className="ambiguity-question-prompt">
                <span>{scenario.ambiguousItem.promptQuestion}</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                  आपको बस सही विकल्प चुनना है
                </span>
              </div>

              {/* Option Selection Grid */}
              <div className="ambiguity-options-grid">
                {scenario.ambiguousItem.options.map((opt) => (
                  <button
                    key={opt.id}
                    className="btn-ambiguity-option"
                    onClick={() => {
                      soundEngine.playTone('verified');
                      onResolveAmbiguity(opt);
                    }}
                  >
                    <span className="option-label-hindi">{opt.labelHindi}</span>
                    <span className="option-label-en">{opt.labelEn}</span>
                  </button>
                ))}
              </div>

              {/* Reassurance Footer */}
              <div className="ambiguity-footer-reassurance">
                <div className="reassurance-tag">
                  <ShieldCheck size={18} color="#B45309" />
                  <span>Nishchit ने अनुमान नहीं लगाया।</span>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: '#78350F' }}>
                  The system could not safely determine the field and refused to hallucinate.
                </div>
              </div>
            </div>
          ) : (
            /* Resolved State */
            <div
              style={{
                background: 'var(--color-success-bg)',
                border: '2px solid var(--color-success-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.75rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ fontSize: '2.5rem', color: 'var(--color-success)', marginBottom: '0.25rem' }}>✓</div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-success-text)', marginBottom: '0.25rem' }}>
                जानकारी सुरक्षित रूप से जोड़ दी गई!
              </div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text-main)' }}>
                {selectedOption}: <strong style={{ fontFamily: 'monospace' }}>1234</strong>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                ✓ ऑपरेटर द्वारा सत्यापित • Verified by Operator without model hallucination
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          className="btn-form-action-secondary"
          onClick={() => {
            soundEngine.playTone('click');
            onBack();
          }}
        >
          <ArrowLeft size={18} />
          <span>आवाज फिर से सुनें (Re-record)</span>
        </button>

        <button
          className="btn-form-action-primary"
          disabled={isAmbiguous}
          style={{ opacity: isAmbiguous ? 0.6 : 1, cursor: isAmbiguous ? 'not-allowed' : 'pointer' }}
          onClick={() => {
            if (!isAmbiguous) {
              soundEngine.playTone('verified');
              onSubmit();
            }
          }}
        >
          <span>{isAmbiguous ? 'पहले अस्पष्ट जानकारी चुनें ⚠' : 'आवेदन आगे बढ़ाएं ✓'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
