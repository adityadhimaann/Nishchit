'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, ArrowLeft, Volume2, Radio, Sparkles, Activity } from 'lucide-react';
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
    const barCount = 36;
    const barWidth = canvas.width / (barCount * 1.5);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      phase += 0.09;

      for (let i = 0; i < barCount; i++) {
        const x = i * (canvas.width / barCount) + (canvas.width / barCount - barWidth) / 2;
        const wave = Math.sin(phase + i * 0.4) * Math.cos(phase * 0.6 + i * 0.25);
        const noise = (Math.random() - 0.5) * 0.35;
        const normalizedHeight = Math.max(0.18, Math.min(0.98, (wave + 1) / 2 + noise));
        const barH = normalizedHeight * (canvas.height * 0.85);
        const y = (canvas.height - barH) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barH);
        grad.addColorStop(0, '#00F0FF');
        grad.addColorStop(0.5, '#FF6B2C');
        grad.addColorStop(1, '#8B5CF6');

        ctx.fillStyle = grad;
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 8;
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
      <div style={{ marginBottom: '1.25rem' }}>
        <button
          onClick={() => {
            soundEngine.playTone('click');
            onBack();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--neon-cyan)',
            fontSize: 'var(--text-sm)',
            fontWeight: 800,
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
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--neon-cyan)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                <Activity size={14} />
                <span>NEURAL SPEECH ENCODING ENGINE</span>
              </div>
              <h2 className="voice-heading hindi-lead">{t.voice.heading}</h2>
              <p className="voice-subtext">{t.voice.subheading}</p>
              <div className="sub-english">Speak naturally in Hindi / Hinglish / English without pauses.</div>
            </div>

            {/* Futuristic Mic Button */}
            <div className="mic-interactive-wrapper">
              <button
                className={`mic-giant-button ${isRecording ? 'recording' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
                title={isRecording ? 'Stop' : 'Start'}
              >
                {isRecording ? <Square size={48} /> : <Mic size={56} />}
              </button>
              <div className="mic-pulse-ring" />
            </div>

            {/* Status & Timer */}
            <div className="voice-status-indicator">
              <span>{isRecording ? t.voice.micListening : t.voice.micStart}</span>
              {isRecording && (
                <span style={{ color: '#EF4444', fontFamily: 'var(--font-family-mono)', fontSize: 'var(--text-2xl)', textShadow: '0 0 15px rgba(239, 68, 68, 0.6)' }}>
                  {formatTime(elapsed)}
                </span>
              )}
            </div>

            {/* High-frequency Waveform Canvas */}
            <div className="waveform-canvas-box">
              <canvas ref={canvasRef} className="waveform-canvas" />
            </div>

            {/* Live Streaming Transcript Box */}
            <div className="voice-live-transcript-card">
              <div className="transcript-label">
                <span>{t.voice.spokenTranscriptLabel}</span>
                <button
                  onClick={() => soundEngine.speakHindi(scenario.speechTranscript)}
                  style={{
                    background: 'rgba(0, 240, 255, 0.1)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    color: 'var(--neon-cyan)',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
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
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 2.25rem',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 0 25px rgba(239, 68, 68, 0.5)',
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
              <span style={{ fontSize: '0.75rem', color: 'var(--neon-orange)', fontWeight: 800 }}>{t.voice.fiveScenarios}</span>
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

          <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '16px', padding: '1.25rem', fontSize: 'var(--text-xs)', color: 'var(--text-medium)', boxShadow: '0 0 25px rgba(0, 240, 255, 0.1)' }}>
            <strong style={{ color: 'var(--neon-cyan)', display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem' }}>
              ● Zero AI Hallucination Policy
            </strong>
            When inputs are ambiguous, Nishchit stops and requests human operator confirmation instead of predicting.
          </div>
        </div>
      </div>
    </div>
  );
};
