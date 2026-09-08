import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink } from 'lucide-react';

const HERO_IMG =
  'https://images.pexels.com/photos/31737860/pexels-photo-31737860.jpeg?auto=compress&cs=tinysrgb&w=1260';

const DRIVE_FILE_ID = '1pVPt2OiwNyaHO1aYyd-Uov5eQ0CsjE0l';
// Direct download URL — works as a <video> source (no iframe needed)
const VIDEO_SRC = `https://drive.google.com/uc?export=download&confirm=t&id=${DRIVE_FILE_ID}`;
// Fallback share link
const DRIVE_SHARE_URL = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/view`;

const TYPED_FULL = 'THE OBSIDIAN RESIDENCES | LEKKI PHASE 1';

function useTypewriter(text: string, speed = 70, startDelay = 600) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(timer);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [text, speed, startDelay]);
  return { out, done };
}

export default function Hero() {
  const { out, done } = useTypewriter(TYPED_FULL);
  const [loaded, setLoaded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v || videoError) return;
    if (v.paused) {
      v.play().catch(() => setVideoError(true));
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen?.();
    }
  };

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-obsidian">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={HERO_IMG}
          alt="The Obsidian Residences at dusk"
          className="h-full w-full object-cover opacity-50"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/40 to-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.12),transparent_55%)]" />
      </div>

      {/* Vertical 9:16 cinematic video block */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-4 pt-28 pb-12 sm:pt-32">
        <div className="relative w-full max-w-[min(92vw,420px)] animate-fade-up">
          {/* Gold frame */}
          <div className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-gold/50 via-gold/10 to-gold/30 opacity-70 blur-[2px]" />
          <div
            ref={containerRef}
            className="relative aspect-[9/16] overflow-hidden rounded-[26px] border border-gold/30 bg-obsidian-100 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)]"
          >
            {/* Native video player — streams directly from Google Drive */}
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={HERO_IMG}
              muted={muted}
              loop
              playsInline
              preload="metadata"
              onCanPlay={() => setLoaded(true)}
              onError={() => setVideoError(true)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (v.duration) setProgress((v.currentTime / v.duration) * 100);
              }}
              onClick={togglePlay}
              className={[
                'h-full w-full cursor-pointer object-cover transition-opacity duration-700',
                loaded && !videoError ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            />

            {/* Poster / fallback when video not loaded yet or errored */}
            {!loaded && (
              <img
                src={HERO_IMG}
                alt="The Obsidian Residences at dusk"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* Fallback: Watch on Google Drive button */}
            {videoError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-obsidian/90 p-6 text-center">
                <p className="text-sm font-light text-white/60">
                  This video is hosted on Google Drive.
                </p>
                <a
                  href={DRIVE_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  <ExternalLink className="h-4 w-4" />
                  Watch on Google Drive
                </a>
              </div>
            )}

            {/* Cinematic vignette + grain */}
            {!videoError && (
              <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-obsidian/40" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(0,0,0,0.6),transparent_60%)]" />

                {/* Play / pause control */}
                <button
                  onClick={togglePlay}
                  className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  aria-label={playing ? 'Pause cinematic walkthrough' : 'Play cinematic walkthrough'}
                >
                  <span className={`absolute inset-0 rounded-full ${!playing ? 'animate-pulse-gold' : 'opacity-0'}`} />
                  <span className="relative grid h-16 w-16 place-items-center rounded-full border border-gold/60 bg-obsidian/60 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    {playing ? (
                      <Pause className="h-6 w-6 fill-gold text-gold" />
                    ) : (
                      <Play className="h-6 w-6 translate-x-0.5 fill-gold text-gold" />
                    )}
                  </span>
                </button>
              </>
            )}

            {/* Top overlay caption */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-obsidian/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                4K Cinematic Reel
              </span>
            </div>

            {/* Bottom controls bar */}
            {!videoError && (
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-obsidian/50 text-white/80 backdrop-blur-md transition-colors hover:text-gold"
                    aria-label={muted ? 'Unmute' : 'Mute'}
                  >
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <div className="h-1 w-24 overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-gold transition-[width] duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-obsidian/50 text-white/80 backdrop-blur-md transition-colors hover:text-gold"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Open in Google Drive link — always visible below player */}
          <div className="mt-3 flex justify-center">
            <a
              href={DRIVE_SHARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-light text-white/40 transition-colors hover:text-gold"
            >
              <ExternalLink className="h-3 w-3" />
              Open in Google Drive
            </a>
          </div>
        </div>

        {/* Typing overlay title */}
        <div className="mt-10 text-center">
          <h1 className="font-serif text-2xl font-semibold leading-tight tracking-wide text-white sm:text-4xl md:text-5xl">
            <span className={done ? 'gold-shimmer' : 'text-white'}>{out}</span>
            <span className={`ml-1 inline-block h-[1em] w-0.5 -translate-y-[2px] bg-gold align-middle transition-opacity ${done ? 'animate-pulse' : ''}`} />
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-sm font-light leading-relaxed text-white/60 sm:text-base">
            An off-plan address of distinction. Limited waterfront penthouses and terraces
            now releasing in the heart of Lekki Phase 1.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#booking" className="btn-gold w-full sm:w-auto">
              Book Private Inspection
            </a>
            <a href="#prospectus" className="btn-ghost w-full sm:w-auto">
              View Prospectus
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-ultra">Scroll</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 p-1">
            <span className="h-2 w-1 animate-bounce rounded-full bg-gold" />
          </span>
        </div>
      </div>
    </section>
  );
}
