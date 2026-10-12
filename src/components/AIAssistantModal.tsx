import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Radio } from 'lucide-react';
import { pcmFloat32ToBase64, LiveAudioPlayer } from '../utils/audioUtils';
import '../styles/components/AIAssistant.css';

const NUM_WAVE_BARS = 14;

export const HoldToTalkVoiceWidget: React.FC = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'replying' | 'speaking' | 'error'>('idle');
  const [statusText, setStatusText] = useState('Hold to speak');

  const isHoldingRef = useRef(false);
  const wsRef = useRef<WebSocket | null>(null);
  const audioPlayerRef = useRef<LiveAudioPlayer | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const micAnalyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const waveBarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Audio wave rendering loop
  const startWaveAnimation = useCallback(() => {
    const micData = new Uint8Array(new ArrayBuffer(32));
    const speakerData = new Uint8Array(new ArrayBuffer(32));

    const updateWaves = () => {
      if (waveBarsRef.current.length > 0) {
        let isSpeaking = false;

        if (audioPlayerRef.current && audioPlayerRef.current.isPlaying) {
          isSpeaking = true;
          audioPlayerRef.current.getFrequencyData(speakerData);
        } else if (micAnalyserRef.current) {
          micAnalyserRef.current.getByteFrequencyData(micData);
        }

        const dataArray = isSpeaking ? speakerData : micData;

        waveBarsRef.current.forEach((bar, index) => {
          if (!bar) return;
          const centerDist = Math.abs(index - (NUM_WAVE_BARS - 1) / 2);
          const dataIdx = Math.min(Math.floor(centerDist * 2), dataArray.length - 1);
          const rawVal = dataArray[dataIdx] || 0;

          if (isSpeaking) {
            // AI speaking (sky-blue frequencies)
            const height = Math.max(12, Math.min(95, (rawVal / 255) * 90 + 10));
            bar.style.height = `${height}%`;
            bar.style.background = 'linear-gradient(to top, #0284C7, #38BDF8)';
            bar.style.boxShadow = '0 0 8px rgba(56, 189, 248, 0.6)';
            bar.style.opacity = '1';
          } else if (isHoldingRef.current && micAnalyserRef.current) {
            // User holding & speaking (emerald frequencies)
            const activeInput = rawVal > 15;
            const height = activeInput
              ? Math.max(14, Math.min(95, (rawVal / 255) * 85 + 15))
              : 12 + Math.sin(Date.now() / 350 + index) * 6;
            bar.style.height = `${height}%`;
            bar.style.background = 'linear-gradient(to top, #059669, #34D399)';
            bar.style.boxShadow = activeInput ? '0 0 8px rgba(52, 211, 153, 0.6)' : 'none';
            bar.style.opacity = activeInput ? '1' : '0.4';
          } else {
            // Idle breathing
            const height = 10 + Math.sin(Date.now() / 500 + index) * 3;
            bar.style.height = `${height}%`;
            bar.style.background = 'rgba(255, 255, 255, 0.2)';
            bar.style.boxShadow = 'none';
            bar.style.opacity = '0.35';
          }
        });
      }

      animFrameRef.current = requestAnimationFrame(updateWaves);
    };

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(updateWaves);
  }, []);

  // Initialize Audio & WebSocket connections
  const ensureConnected = async () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && mediaStreamRef.current) {
      return true;
    }

    try {
      if (!audioPlayerRef.current) {
        audioPlayerRef.current = new LiveAudioPlayer();
        audioPlayerRef.current.onPlaybackEnd = () => {
          setVoiceStatus('idle');
          setStatusText('Ready • Hold to talk again');

          // Schedule auto-close after playback completes
          if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
          autoCloseTimerRef.current = setTimeout(() => {
            if (!isHoldingRef.current) {
              setIsPopoverOpen(false);
            }
          }, 3500);
        };
      }

      if (!mediaStreamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            sampleRate: 16000,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        mediaStreamRef.current = stream;

        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const inputCtx = new AudioCtx({ sampleRate: 16000 });
        audioContextRef.current = inputCtx;

        const source = inputCtx.createMediaStreamSource(stream);

        const micAnalyser = inputCtx.createAnalyser();
        micAnalyser.fftSize = 64;
        micAnalyser.smoothingTimeConstant = 0.75;
        source.connect(micAnalyser);
        micAnalyserRef.current = micAnalyser;

        const processor = inputCtx.createScriptProcessor(4096, 1, 1);
        scriptProcessorRef.current = processor;

        processor.onaudioprocess = (e) => {
          // Stream audio only while the user is actively pressing/holding
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && isHoldingRef.current) {
            const inputData = e.inputBuffer.getChannelData(0);
            const base64Audio = pcmFloat32ToBase64(inputData);
            wsRef.current.send(JSON.stringify({ audio: base64Audio }));
          }
        };

        source.connect(processor);
        processor.connect(inputCtx.destination);
      }

      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/live`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          startWaveAnimation();
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.audio) {
              setVoiceStatus('speaking');
              setStatusText('Naren AI is speaking...');
              if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
              audioPlayerRef.current?.playChunk(data.audio);
            } else if (data.interrupted) {
              audioPlayerRef.current?.stopAll();
              setVoiceStatus('listening');
              setStatusText('Listening...');
            }
          } catch (err) {
            console.error('WebSocket live message parse error:', err);
          }
        };

        ws.onerror = (err) => {
          console.error('WebSocket live error:', err);
          setVoiceStatus('error');
          setStatusText('Microphone / Connection error');
        };

        ws.onclose = () => {
          setVoiceStatus('idle');
          setStatusText('Session closed');
        };
      }

      return true;
    } catch (err) {
      console.error('Failed to initialize live voice:', err);
      setVoiceStatus('error');
      setStatusText('Mic access required');
      return false;
    }
  };

  // User presses and holds
  const handleHoldStart = async (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);

    isHoldingRef.current = true;
    setIsHolding(true);
    setIsPopoverOpen(true);
    setVoiceStatus('listening');
    setStatusText('Listening... Speak now');

    // Stop any ongoing playback when user begins speaking new query
    if (audioPlayerRef.current) {
      audioPlayerRef.current.stopAll();
    }

    await ensureConnected();
  };

  // User releases hold
  const handleHoldEnd = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    if (!isHoldingRef.current) return;

    isHoldingRef.current = false;
    setIsHolding(false);

    // If we were listening, transition to replying state while AI processes and generates response
    if (voiceStatus === 'listening') {
      setVoiceStatus('replying');
      setStatusText('AI Replying...');
    }
  };

  // Close / dismiss popover
  const handleClosePopover = () => {
    handleHoldEnd();
    setIsPopoverOpen(false);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.stopAll();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      if (scriptProcessorRef.current) scriptProcessorRef.current.disconnect();
      if (micAnalyserRef.current) micAnalyserRef.current.disconnect();
      if (audioContextRef.current) audioContextRef.current.close().catch(() => {});
      if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      if (wsRef.current) wsRef.current.close();
      if (audioPlayerRef.current) audioPlayerRef.current.close();
    };
  }, []);

  return (
    <div className="ai-voice-floating-container">
      {/* Transparent Hover / Press Tooltip Popover */}
      <AnimatePresence>
        {isPopoverOpen && (
          <motion.div
            className="ai-voice-popover-card"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Popover Header Row */}
            <div className="ai-popover-header">
              <div className={`ai-popover-status-badge ${voiceStatus}`}>
                <span className="pulse-mini-dot"></span>
                {voiceStatus === 'listening' && 'Listening...'}
                {voiceStatus === 'replying' && 'Thinking...'}
                {voiceStatus === 'speaking' && 'AI Speaking'}
                {voiceStatus === 'idle' && 'Hold to Talk'}
                {voiceStatus === 'error' && 'Error'}
              </div>

              <button
                className="ai-popover-close-btn"
                onClick={handleClosePopover}
                aria-label="Dismiss popover"
                title="Dismiss"
              >
                <X size={14} />
              </button>
            </div>

            {/* Live Soundwave Reactive Bars */}
            <div className={`ai-popover-waves ${voiceStatus}`}>
              {[...Array(NUM_WAVE_BARS)].map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { waveBarsRef.current[i] = el; }}
                  className="popover-wave-bar"
                  style={{ height: '12%' }}
                />
              ))}
            </div>

            {/* Instruction / Status Message */}
            <div className="ai-popover-status-text">
              {isHolding ? (
                <span className="text-emerald">Release to send question</span>
              ) : (
                <span>{statusText}</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circular Floating Icon Button (Hold to Talk) */}
      <button
        className={`ai-voice-icon-btn ${isHolding ? 'holding' : ''} ${voiceStatus === 'speaking' ? 'speaking' : ''}`}
        onMouseDown={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onMouseLeave={handleHoldEnd}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
        onTouchCancel={handleHoldEnd}
        onMouseEnter={() => {
          if (!isPopoverOpen && voiceStatus === 'idle') {
            setIsPopoverOpen(true);
          }
        }}
        aria-label="Hold to talk with Naren AI"
        title="Hold to talk with Naren AI"
      >
        <span className={`ai-voice-status-dot ${isHolding ? 'recording' : ''}`}></span>
        {isHolding ? (
          <Radio size={22} className="ai-btn-icon-pulse" />
        ) : (
          <Mic size={22} className="ai-btn-icon" />
        )}
      </button>
    </div>
  );
};

// Aliases for compatibility
export const AIAssistantFloatingTrigger: React.FC<{ onOpen?: () => void }> = () => {
  return <HoldToTalkVoiceWidget />;
};

export const AIAssistantModal: React.FC<{ isOpen?: boolean; onClose?: () => void }> = () => {
  return null; // Replaced by the transparent hold-to-talk popover
};
