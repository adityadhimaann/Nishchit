'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, ArrowLeft, Volume2 } from 'lucide-react';
import { SCENARIOS, Scenario } from '@/data/scenarios';
import { soundEngine } from '@/utils/sound';
import { Language, TRANSLATIONS } from '@/data/translations';

interface VoiceScreenProps {
  lang: Language;
  scenario: Scenario;
  onSelectScenario: (scenarioId: string) => void;
  onRecordingComplete: () => void;
  onBack: () => void;
}

export const VoiceScreen: React.FC<VoiceScreenProps> = ({
  lang,
  scenario,
  onSelectScenario,
  onRecordingComplete,
  onBack,
}) => {
  const t = TRANSLATIONS[lang];
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [streamedText, setStreamedText] = useState(scenario.speechTranscript);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setStreamedText(scenario.speechTranscript);
  }, [scenario]);

  const startWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
    canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);

    let phase = 0;
    const barCount = 32;
    const barWidth = canvas.width / (barCount * 1.6);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      phase += 0.08;

      for (let i = 0; i < barCount; i++) {
        const x = i * (canvas.width / barCount) + (canvas.width / barCount - barWidth) / 2;
        const wave = Math.sin(phase + i * 0.35) * Math.cos(phase * 0.5 + i * 0.2);
        const noise = (Math.random() - 0.5) * 0.3;
        const normalizedHeight = Math.max(0.15, Math.min(0.95, (wave + 1) / 2 + noise));
        const barH = normalizedHeight * (canvas.height * 0.75);
        const y = (canvas.height - barH) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barH);
        grad.addColorStop(0, '#B84A1A');
        grad.addColorStop(1, '#E07A5F');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, 4);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(render);
    };

    if (animRef.current) cancelAnimationFrame(animRef.current);
    render();
  };

  const stopWaveform = () => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setElapsed(0);
    soundEngine.playTone('start');
    startWaveform();

    const words = scenario.speechTranscript.split(' ');
    setStreamedText('...');

    let count = 0;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      count++;
      setElapsed(count);

      const wordsToShow = Math.min(
        words.length,
        Math.ceil((count / (scenario.speechAudioSimulatedDuration || 6)) * words.length)
      );
      setStreamedText(words.slice(0, wordsToShow).join(' ') + '...');

      if (count >= (scenario.speechAudioSimulatedDuration || 6)) {
        stopRecording();
      }
    }, 1000);
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    stopWaveform();
    soundEngine.playTone('click');
    onRecordingComplete();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => {
            soundEngine.playTone('click');
            onBack();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-primary)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <ArrowLeft size={18} />
          <span>{t.voice.back}</span>
        </button>
      </div>

      <div className="workflow-layout">
        <div className="workflow-main">
          {/* Main Voice Panel */}
          <div className="voice-active-panel">
            <div>
              <h2 className="voice-heading hindi-lead">{t.voice.heading}</h2>
              <p className="voice-subtext">{t.voice.subheading}</p>
              <div className="sub-english">Speak naturally in Hindi / Hinglish / English without pauses.</div>
            </div>

            {/* Mic Button */}
            <div className="mic-interactive-wrapper">
              <button
                className={`mic-giant-button ${isRecording ? 'recording' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
                title={isRecording ? 'Stop' : 'Start'}
              >
                {isRecording ? <Square size={44} /> : <Mic size={52} />}
              </button>
              <div className="mic-pulse-ring" />
            </div>

            {/* Status & Timer */}
            <div className="voice-status-indicator">
              <span>{isRecording ? t.voice.micListening : t.voice.micStart}</span>
              {isRecording && (
                <span style={{ color: 'var(--color-danger)', fontFamily: 'monospace', fontSize: 'var(--text-2xl)' }}>
                  {formatTime(elapsed)}
                </span>
              )}
            </div>

            {/* Waveform Canvas */}
            <div className="waveform-canvas-box">
              <canvas ref={canvasRef} className="waveform-canvas" />
            </div>

            {/* Live Transcript Box */}
            <div className="voice-live-transcript-card">
              <div className="transcript-label">
                <span>{t.voice.spokenTranscriptLabel}</span>
                <button
                  onClick={() => soundEngine.speakHindi(scenario.speechTranscript)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-primary)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Volume2 size={15} />
                  <span>{t.voice.playAudio}</span>
                </button>
              </div>
              <div className="transcript-speech-bubble">
                &ldquo;{streamedText}&rdquo;
              </div>
            </div>

            {/* Stop Action if Recording */}
            {isRecording && (
              <button
                onClick={stopRecording}
                style={{
                  background: 'var(--color-danger)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 2rem',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Square size={20} />
                <span>{t.voice.micStop}</span>
              </button>
            )}
          </div>

          {/* Hackathon Demo Scenarios Picker */}
          <div className="demo-scenarios-panel">
            <div className="demo-scenario-header">
              <span>{t.voice.scenariosTitle}</span>
              <span style={{ fontSize: '0.75rem', color: '#78350F' }}>{t.voice.fiveScenarios}</span>
            </div>
            <div className="scenarios-button-row">
              {Object.keys(SCENARIOS).map((key) => {
                const s = SCENARIOS[key];
                return (
                  <button
                    key={key}
                    className={`scenario-chip ${scenario.id === key ? 'active' : ''}`}
                    onClick={() => {
                      soundEngine.playTone('click');
                      onSelectScenario(key);
                    }}
                  >
                    {lang === 'en' ? s.nameEn : s.nameHindi}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Villager Photo Context */}
        <div className="workflow-sidebar">
          <div className="context-villager-card">
            <img
              src="/images/villager_speaking.jpg"
              alt="Rural Indian citizen interacting at desk"
            />
            <div className="context-villager-content">
              <div className="context-villager-title">{t.voice.citizenContextTitle}</div>
              <div className="context-villager-sub">
                &ldquo;{t.voice.citizenContextSub}&rdquo;
              </div>
            </div>
          </div>

          <div style={{ background: '#FFFDF9', border: '1.5px solid var(--color-border)', borderRadius: '14px', padding: '1rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
            <strong style={{ color: 'var(--color-text-main)', display: 'block', marginBottom: '0.25rem' }}>
              ● Zero AI Hallucination Policy
            </strong>
            When inputs are ambiguous, Nishchit stops and requests human operator confirmation instead of predicting.
          </div>
        </div>
      </div>
    </div>
  );
};
