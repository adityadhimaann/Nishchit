'use client';

import React from 'react';
import { Building2, CheckCircle2, AlertTriangle, ShieldCheck, ArrowLeft, ArrowRight, Sparkles, Zap, ShieldAlert } from 'lucide-react';
import { AmbiguityOption, Scenario } from '@/data/scenarios';
import { soundEngine } from '@/utils/sound';
import { Language, TRANSLATIONS } from '@/data/translations';

interface FormScreenProps {
  lang: Language;
  scenario: Scenario;
  resolvedAmbiguity: boolean;
  selectedOption: string | null;
  onResolveAmbiguity: (option: AmbiguityOption) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const FormScreen: React.FC<FormScreenProps> = ({
  lang,
  scenario,
  resolvedAmbiguity,
  selectedOption,
  onResolveAmbiguity,
  onSubmit,
  onBack,
}) => {
  const t = TRANSLATIONS[lang];
  const isAmbiguous = Boolean(scenario.ambiguousItem && !resolvedAmbiguity);
  const totalFields = scenario.fields.length + (scenario.ambiguousItem ? 1 : 0);

  return (
    <div className="animate-fade-in form-view-container">
      {/* Top Header & Status Bar */}
      <div className="form-header-bar">
        <div className="form-title-group">
          <div className="form-badge-icon">
            <Building2 size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: '#FFFFFF' }}>
              {t.form.title}
            </h2>
            <div className="sub-english">{t.form.subtitle}</div>
          </div>
        </div>

        <div className="form-status-summary-pill">
          {isAmbiguous ? (
            <>
              <span style={{ color: 'var(--neon-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} />
                <span>{scenario.fields.length} {t.form.fieldsFilled}</span>
              </span>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <span style={{ color: 'var(--neon-amber)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textShadow: '0 0 8px var(--neon-amber-glow)' }}>
                <AlertTriangle size={16} />
                <span>1 {t.form.reviewRemaining}</span>
              </span>
            </>
          ) : (
            <span style={{ color: 'var(--neon-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textShadow: '0 0 10px var(--neon-emerald-glow)' }}>
              <CheckCircle2 size={18} />
              <span>{totalFields} {t.form.allCompleted} {totalFields} {t.form.allCompletedEnd}</span>
            </span>
          )}
        </div>
      </div>

      {/* Verified Personal Details Section */}
      <div className="form-section-card">
        <div className="form-section-title">
          <Sparkles size={20} color="var(--neon-cyan)" />
          <span>{t.form.personalDetails}</span>
        </div>

        <div className="fields-two-column">
          {scenario.fields.map((field) => (
            <div key={field.id} className="form-field-group">
              <label className="field-label">
                <span>{lang === 'en' ? field.labelEn : field.labelHindi}</span>
                <span className="verification-tag">
                  <CheckCircle2 size={13} />
                  <span>{t.form.verifiedTag}</span>
                </span>
              </label>
              <div className="field-value-box verified">
                <span>{field.value}</span>
                <span style={{ color: 'var(--neon-emerald)', fontSize: '1.25rem' }}>✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          THE HERO MOMENT: FUTURISTIC AMBER AMBIGUITY WARNING MATRIX
          ========================================================================= */}
      {scenario.ambiguousItem && (
        <div className="form-section-card" style={{ padding: '0', border: 'none', background: 'none' }}>
          {!resolvedAmbiguity ? (
            <div className="hero-ambiguity-panel">
              {/* Header */}
              <div className="ambiguity-header-row">
                <div className="ambiguity-icon-box">
                  <ShieldAlert size={36} />
                </div>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--neon-amber)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                    <Zap size={13} />
                    <span>HUMAN-IN-THE-LOOP DISAMBIGUATION REQUIRED</span>
                  </div>
                  <h3 className="ambiguity-title-text">{t.form.ambiguityHeader}</h3>
                  <div className="sub-english">{t.form.ambiguitySub}</div>
                </div>
              </div>

              {/* Number Spotlight */}
              <div className="ambiguity-number-spotlight">
                <div className="number-quote-context">
                  {t.form.citizenSaid} <strong>&ldquo;{scenario.ambiguousItem.spokenSnippet}&rdquo;</strong>
                </div>
                <div className="number-giant-badge">
                  {scenario.ambiguousItem.rawNumber}
                </div>
              </div>

              {/* Question */}
              <div className="ambiguity-question-prompt">
                <span>{lang === 'en' ? scenario.ambiguousItem.promptQuestionEn : scenario.ambiguousItem.promptQuestionHindi}</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-medium)' }}>
                  {t.form.questionSub}
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
                    <span className="option-label-hindi">{lang === 'en' ? opt.labelEn : opt.labelHindi}</span>
                    <span className="option-label-en">{lang === 'en' ? opt.labelHindi : opt.labelEn}</span>
                  </button>
                ))}
              </div>

              {/* Reassurance Footer */}
              <div className="ambiguity-footer-reassurance">
                <div className="reassurance-tag">
                  <ShieldCheck size={18} color="var(--neon-amber)" />
                  <span>{t.form.reassuranceText}</span>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: '#FDE68A' }}>
                  {t.form.reassuranceSub}
                </div>
              </div>
            </div>
          ) : (
            /* Resolved State */
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.8) 0%, rgba(6, 44, 34, 0.9) 100%)',
                border: '2px solid var(--neon-emerald)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 0 35px var(--neon-emerald-glow)',
                animation: 'fadeIn 300ms ease',
              }}
            >
              <div style={{ fontSize: '2.8rem', color: 'var(--neon-emerald)', marginBottom: '0.35rem', textShadow: '0 0 20px var(--neon-emerald)' }}>✓</div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                {t.form.resolvedSuccessTitle}
              </div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: '#A7F3D0' }}>
                {selectedOption}: <strong style={{ fontFamily: 'var(--font-family-mono)', background: 'rgba(0,0,0,0.4)', padding: '3px 12px', borderRadius: '6px', border: '1px solid var(--neon-emerald)' }}>1234</strong>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-medium)', marginTop: '0.75rem' }}>
                {t.form.resolvedSuccessSub}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1.25rem' }}>
        <button
          className="btn-form-action-secondary"
          onClick={() => {
            soundEngine.playTone('click');
            onBack();
          }}
        >
          <ArrowLeft size={18} />
          <span>{t.form.reRecord}</span>
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
          <span>{isAmbiguous ? t.form.resolveFirst : t.form.proceed}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
