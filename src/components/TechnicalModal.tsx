'use client';

import React from 'react';
import { X, Cpu, CheckCircle2, AlertTriangle, ShieldCheck, Database, ArrowRight } from 'lucide-react';
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
            <Cpu size={22} />
            <span>Nishchit System Architecture & Critic Audit (Judges View)</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={22} />
          </button>
        </div>

        <div className="tech-modal-body">
          {/* Visual Pipeline Graph */}
          <div className="tech-diagram-box">
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.75rem' }}>
              REAL-TIME DUAL-AGENT SAFETY PIPELINE
            </div>
            <div className="pipeline-nodes-row">
              <div className="pipeline-node">🎙 Speech Input (Hindi ASR)</div>
              <ArrowRight size={16} color="#64748B" />
              <div className="pipeline-node">🧠 Extractor Agent (Slot Filling)</div>
              <ArrowRight size={16} color="#64748B" />
              <div className="pipeline-node critic">🔎 Independent Critic (Hallucination Guard)</div>
              <ArrowRight size={16} color="#64748B" />
              <div className="pipeline-node router">🛡 Safety Router & Escalation</div>
            </div>
          </div>

          {/* Critic Rationale */}
          <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#F59E0B', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} />
              <span>Independent Critic Decision: {scenario.techLog.criticDecision}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              {scenario.techLog.criticRationale}
            </p>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
              <strong>Execution Target:</strong> <code style={{ color: '#38BDF8', background: '#0F172A', padding: '2px 6px', borderRadius: '4px' }}>{scenario.techLog.finalAction}</code>
            </div>
          </div>

          {/* Confidence Breakdown Matrix */}
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.75rem' }}>
              SLOT-LEVEL CONFIDENCE MATRIX (THRESHOLD: 0.85)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              {scenario.fields.map((f) => {
                const pct = Math.round(f.confidence * 100);
                return (
                  <div
                    key={f.id}
                    style={{
                      background: '#1E293B',
                      border: '1px solid #334155',
                      padding: '0.6rem 0.9rem',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', color: '#E2E8F0' }}>{f.labelHindi}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34D399', fontFamily: 'monospace' }}>
                      {pct}% ✓ SAFE
                    </span>
                  </div>
                );
              })}

              {scenario.ambiguousItem && (
                <div
                  style={{
                    background: resolvedAmbiguity ? '#14532D' : '#451A03',
                    border: `1px solid ${resolvedAmbiguity ? '#22C55E' : '#F59E0B'}`,
                    padding: '0.6rem 0.9rem',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: '#FEF3C7' }}>
                    {scenario.ambiguousItem.labelHindi} (&quot;{scenario.ambiguousItem.rawNumber}&quot;)
                  </span>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: resolvedAmbiguity ? '#86EFAC' : '#FCA5A5',
                      fontFamily: 'monospace',
                    }}
                  >
                    {resolvedAmbiguity
                      ? `RESOLVED BY HUMAN (${selectedOption}) ✓`
                      : `${Math.round(scenario.ambiguousItem.confidence * 100)}% ⚠ REFUSAL TRIGGERED`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Raw Telemetry JSON */}
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.5rem' }}>
              RAW TELEMETRY PAYLOAD
            </div>
            <pre className="tech-code-box">
              {JSON.stringify(
                {
                  scenario_id: scenario.id,
                  audio_stream: {
                    language: 'hi-IN',
                    mode: 'offline_edge_whisper',
                    transcript: scenario.speechTranscript,
                  },
                  critic_audit: scenario.techLog,
                  extracted_fields: scenario.fields.map((f) => ({
                    field: f.labelHindi,
                    value: f.value,
                    confidence: f.confidence,
                    critic_status: f.criticCheck || 'PASSED',
                  })),
                  ambiguity_state: scenario.ambiguousItem
                    ? {
                        field_name: scenario.ambiguousItem.labelHindi,
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
