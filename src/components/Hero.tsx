import React, { useState, useEffect, useRef } from 'react';

const VIDEO_URLS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4',
];

const SWITCHER_ITEMS = [
  { index: 0, number: '01', title: 'WATER WAVE' },
  { index: 1, number: '02', title: 'GRIDWAVE' },
  { index: 2, number: '03', title: 'LIGHT TUNNEL' },
];

interface HeroProps {
  isMobileMenuOpen?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isMobileMenuOpen = false }) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [videoSources, setVideoSources] = useState<string[]>(VIDEO_URLS);
  const [hasRevealed, setHasRevealed] = useState<boolean>(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Preload videos as blobs on mount with fallback to remote URL
  useEffect(() => {
    let isMounted = true;
    const blobUrls: string[] = [];

    VIDEO_URLS.forEach((url, idx) => {
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.blob();
        })
        .then((blob) => {
          if (isMounted) {
            const objectUrl = URL.createObjectURL(blob);
            blobUrls.push(objectUrl);
            setVideoSources((prev) => {
              const updated = [...prev];
              updated[idx] = objectUrl;
              return updated;
            });
          }
        })
        .catch((err) => {
          console.warn(`Could not preload video ${idx}, using direct URL fallback`, err);
        });
    });

    return () => {
      isMounted = false;
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Ensure all videos play looped and muted
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch(() => {
          // Autoplay policy fallback
        });
      }
    });
  }, [videoSources]);

  // IntersectionObserver at 0.35 threshold to trigger reveal animations once
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Fallback: If hero is already in viewport or reduced-motion is requested
    const timer = setTimeout(() => {
      setHasRevealed(true);
    }, 150);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Accent color calculation: Slide 1 (index 0) is pink #F598F2, slides 2-3 are white
  const isPinkAccent = activeIndex === 0;
  const accentPeriodColor = isPinkAccent ? '#F598F2' : '#ffffff';

  return (
    <main
      ref={heroRef}
      id="hero-main"
      className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col justify-end"
    >
      {/* ----------------- Background Video Stack ----------------- */}
      <div
        id="video-background-layer"
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        {videoSources.map((source, index) => {
          const isActive = activeIndex === index;
          return (
            <video
              key={index}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={source}
              autoPlay
              muted
              playsInline
              loop
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                isActive ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
              }`}
            />
          );
        })}

        {/* Semi-transparent overlay above videos */}
        <div
          id="video-overlay"
          className="absolute inset-0 bg-black/10 z-[1] pointer-events-none"
        />
      </div>

      {/* ----------------- Hero Content ----------------- */}
      <div
        id="hero-content-container"
        className={`relative z-[2] w-full max-w-[1340px] mx-auto flex-1 flex flex-col justify-end items-start min-[810px]:items-end px-[18px] min-[1200px]:px-[15px] pt-[140px] min-[1200px]:pt-[190px] transition-all duration-300 ${
          isMobileMenuOpen
            ? 'max-[809px]:gap-6 min-[810px]:gap-[72px]'
            : 'gap-[72px]'
        } min-[1200px]:gap-[150px]`}
      >
        {/* Section 1: Video Switcher + Availability */}
        <section
          id="hero-controls-section"
          aria-label="Experience Switcher and Status"
          className={`w-full flex flex-col min-[810px]:flex-row min-[810px]:items-center justify-between gap-7 min-[810px]:gap-8 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-[809px]:opacity-0 max-[809px]:invisible max-[809px]:h-0 max-[809px]:pointer-events-none max-[809px]:overflow-hidden max-[809px]:my-0'
              : 'opacity-100 pointer-events-auto'
          }`}
        >
          {/* Left Column (flex-[4]): Video Switcher Buttons */}
          <div
            id="video-switcher"
            role="tablist"
            aria-label="Background Video Switcher"
            className="min-[810px]:flex-[4] flex flex-wrap items-center gap-6 min-[810px]:gap-8 min-[1200px]:gap-12"
          >
            {SWITCHER_ITEMS.map((item) => {
              const isActive = activeIndex === item.index;
              return (
                <button
                  key={item.index}
                  id={`video-switcher-btn-${item.index}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Switch to ${item.title}`}
                  onClick={() => setActiveIndex(item.index)}
                  className={`role-link group cursor-pointer text-left focus:outline-none transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-55 hover:opacity-75'
                  }`}
                >
                  <span className="flex items-baseline gap-2 text-xs min-[810px]:text-[13px] leading-4 tracking-[-0.12px] font-medium uppercase text-white">
                    <span className="text-[9px] tracking-[-0.08px] opacity-80">
                      {item.number} /
                    </span>
                    <span>{item.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column (flex-1): Availability Status */}
          <div
            id="availability-status"
            role="status"
            aria-live="polite"
            className="min-[810px]:flex-1 flex items-center justify-start min-[810px]:justify-end gap-3"
          >
            <span
              className="pulse-dot inline-block w-[7px] h-[7px] rounded-full shrink-0 transition-colors duration-500"
              style={{
                backgroundColor: isPinkAccent ? '#F598F2' : '#ffffff',
                boxShadow: isPinkAccent
                  ? '0 0 10px #F598F2, 0 0 20px #F598F2'
                  : '0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.6)',
              }}
              aria-hidden="true"
            />
            <span className="text-xs min-[810px]:text-sm leading-4 tracking-[-0.12px] font-medium text-white/95 whitespace-nowrap">
              Available for work
            </span>
          </div>
        </section>

        {/* Section 2: Name + CTA */}
        <section
          id="hero-brand-section"
          aria-label="Creator Profile and Call to Action"
          className="w-full flex flex-col min-[810px]:flex-row min-[810px]:items-end justify-between gap-8 min-[810px]:gap-7 min-[1200px]:gap-10 pb-11 min-[810px]:pb-[52px] min-[1200px]:pb-[60px]"
        >
          {/* Left Column (flex-[2]): Brand Name "N STUDIO." */}
          <div
            id="hero-creator-name-wrap"
            className={`min-[810px]:flex-[2] ${
              hasRevealed ? 'animate-reveal-up' : 'opacity-0'
            }`}
          >
            <h1
              id="hero-creator-name"
              className="font-medium uppercase tracking-[-3.5px] min-[810px]:tracking-[-5.5px] min-[1200px]:tracking-[-6px] text-[clamp(54px,16vw,80px)] leading-[96%] min-[810px]:text-[104px] min-[810px]:leading-[96%] min-[1200px]:text-[160px] min-[1400px]:text-[190px] min-[1200px]:leading-[82%]"
            >
              N STUDIO
              <span
                id="hero-name-period"
                className="transition-colors duration-500 inline-block"
                style={{ color: accentPeriodColor }}
              >
                .
              </span>
            </h1>
          </div>

          {/* Right Column (flex-1): Paragraph & CTA Button */}
          <div
            id="hero-bio-cta-wrap"
            className="min-[810px]:flex-1 min-[810px]:pl-6 min-[1200px]:pl-[50px] flex flex-col items-start gap-6 min-[810px]:gap-7"
          >
            {/* Bio Paragraph / Quote */}
            <p
              id="hero-bio-paragraph"
              className={`max-w-[420px] min-[810px]:max-w-none text-base leading-6 tracking-[-0.16px] font-medium text-white/90 ${
                hasRevealed ? 'animate-reveal-right' : 'opacity-0'
              }`}
            >
              “Is it better to speak or to die? We had the stars, you and I,
              and this is given once only.” — Md Nadim Mahmud
            </p>

            {/* Portfolio CTA Button */}
            <div
              className={`${
                hasRevealed ? 'animate-reveal-right' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.08s' }}
            >
              <a
                id="hero-cta-button"
                href="https://md-nadim-mahmud-portfolio1.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                title="Md Nadim Mahmud Portfolio"
                className="cta-button text-xs min-[810px]:text-sm leading-4 tracking-[-0.12px] font-medium px-6 py-3 min-[810px]:px-7 min-[810px]:py-3.5 cursor-pointer no-underline"
              >
                portfolio
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
