'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function StyledAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Waveform bars configuration
  const bars = [0.3, 0.6, 0.4, 0.8, 0.5, 0.9, 0.4, 0.7, 0.5, 0.6, 0.8, 0.4, 0.7, 0.3, 0.6];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        {/* Audio element */}
        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />

        {/* Player controls */}
        <div className="flex items-center gap-4">
          {/* Play/Pause button */}
          <button
            onClick={togglePlay}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-colors shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white fill-white" />
            ) : (
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            )}
          </button>

          {/* Waveform visualization */}
          <div className="flex items-center gap-1 flex-1 h-12">
            {bars.map((height, index) => {
              const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
              const barProgress = (index / bars.length) * 100;
              const isActive = barProgress <= progress;
              
              return (
                <div
                  key={index}
                  className="flex-1 flex items-center justify-center"
                >
                  <div
                    className={`w-full rounded-full transition-all duration-150 ${
                      isActive
                        ? 'bg-purple-600'
                        : 'bg-gray-300'
                    } ${isPlaying && isActive ? 'animate-pulse' : ''}`}
                    style={{
                      height: `${height * 100}%`,
                      maxHeight: '32px',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Time display */}
          <div className="flex-shrink-0 text-sm font-medium text-gray-700 min-w-[40px]">
            {formatTime(currentTime)}
          </div>

          {/* Volume control */}
          <button
            onClick={toggleMute}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-purple-600 transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Volume slider (hidden by default, can be shown on hover) */}
        <div className="mt-4 opacity-0 hover:opacity-100 transition-opacity">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>
      </div>
    </div>
  );
}