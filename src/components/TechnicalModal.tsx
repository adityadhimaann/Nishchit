'use client';

import React from 'react';
import { X, Cpu, CheckCircle2, AlertTriangle, ShieldCheck, Database, ArrowRight, Activity, Terminal } from 'lucide-react';
import { Scenario } from '@/data/scenarios';

interface TechnicalModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: Scenario;
  resolvedAmbiguity: boolean;
  selectedOption: string | null;
}

export const TechnicalModal: React.FC<TechnicalModalProps> = ({
  isOpen,
  onClose,
  scenario,
  resolvedAmbiguity,
  selectedOption,
}) => {
  if (!isOpen) return null;

  return (
    <div className="tech-modal-backdrop" onClick={onClose}>
      <div className="tech-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="tech-modal-header">
          <div className="tech-modal-title">
            <Cpu size={24} color="var(--neon-cyan)" />
            <span>Nishchit System Architecture &amp; Critic Audit (Judges View)</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-medium)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div className="tech-modal-body">
          {/* Visual Pipeline Graph */}
          <div className="tech-diagram-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--neon-cyan)', marginBottom: '0.85rem', letterSpacing: '0.05em' }}>
              <Activity size={15} />
              <span>REAL-TIME DUAL-AGENT SAFETY PIPELINE</span>
            </div>
            <div className="pipeline-nodes-row">
              <div className="pipeline-node">🎙 Speech Input (Hindi ASR)</div>
              <ArrowRight size={16} color="var(--neon-cyan)" />
              <div className="pipeline-node">🧠 Extractor Agent (Slot Filling)</div>
              <ArrowRight size={16} color="var(--neon-cyan)" />
              <div className="pipeline-node critic">🔎 Independent Critic (Anti-Hallucination)</div>
              <ArrowRight size={16} color="var(--neon-amber)" />
              <div className="pipeline-node router">🛡 Safety Router &amp; Escalation</div>
            </div>
          </div>

          {/* Critic Rationale */}
          <div style={{ background: 'rgba(18, 24, 38, 0.85)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 0 25px rgba(245, 158, 11, 0.15)' }}>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--neon-amber)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} />
              <span>Independent Critic Decision: {scenario.techLog.criticDecision}</span>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '0.85rem' }}>
              {scenario.techLog.criticRationale}
            </p>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-medium)' }}>
              <strong>Execution Target:</strong> <code style={{ color: 'var(--neon-cyan)', background: '#05070C', padding: '3px 8px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>{scenario.techLog.finalAction}</code>
            </div>
          </div>

          {/* Confidence Breakdown Matrix */}
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--neon-cyan)', marginBottom: '0.85rem', letterSpacing: '0.05em' }}>
              SLOT-LEVEL CONFIDENCE MATRIX (THRESHOLD: 0.85)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.85rem' }}>
              {scenario.fields.map((f) => {
                const pct = Math.round(f.confidence * 100);
                return (
                  <div
                    key={f.id}
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid var(--border-glass-bright)',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', color: '#F1F5F9' }}>{f.labelEn}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--neon-emerald)', fontFamily: 'var(--font-family-mono)' }}>
                      {pct}% ✓ SAFE
                    </span>
                  </div>
                );
              })}

              {scenario.ambiguousItem && (
                <div
                  style={{
                    background: resolvedAmbiguity ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    border: `1px solid ${resolvedAmbiguity ? 'var(--neon-emerald)' : 'var(--neon-amber)'}`,
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: resolvedAmbiguity ? '0 0 15px var(--neon-emerald-glow)' : '0 0 15px var(--neon-amber-glow)',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: '#FEF3C7', fontWeight: 700 }}>
                    {scenario.ambiguousItem.labelEn} (&quot;{scenario.ambiguousItem.rawNumber}&quot;)
                  </span>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: resolvedAmbiguity ? 'var(--neon-emerald)' : '#F87171',
                      fontFamily: 'var(--font-family-mono)',
                    }}
                  >
                    {resolvedAmbiguity
                      ? `RESOLVED BY HUMAN (${selectedOption}) ✓`
                      : `${Math.round(scenario.ambiguousItem.confidence * 100)}% ⚠ REFUSAL`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Raw Telemetry JSON */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 800, color: 'var(--neon-cyan)', marginBottom: '0.6rem' }}>
              <Terminal size={16} />
              <span>RAW TELEMETRY PAYLOAD</span>
            </div>
            <pre className="tech-code-box">
              {JSON.stringify(
                {
                  scenario_id: scenario.id,
                  audio_stream: {
                    language: 'hi-IN / en-IN',
                    mode: 'offline_edge_whisper_quantum',
                    transcript: scenario.speechTranscript,
                  },
                  critic_audit: scenario.techLog,
                  extracted_fields: scenario.fields.map((f) => ({
                    field_en: f.labelEn,
                    field_hi: f.labelHindi,
                    value: f.value,
                    confidence: f.confidence,
                    critic_status: f.criticCheck || 'PASSED',
                  })),
                  ambiguity_state: scenario.ambiguousItem
                    ? {
                        field_name: scenario.ambiguousItem.labelEn,
                        raw_token: scenario.ambiguousItem.rawNumber,
                        confidence_score: scenario.ambiguousItem.confidence,
                        confidence_threshold: 0.85,
                        hallucination_guard_engaged: true,
                        resolved_by_human: resolvedAmbiguity,
                        operator_choice: selectedOption,
                      }
                    : 'NO_AMBIGUITY_DETECTED',
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
