import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

const YOUTUBE_VIDEO_ID = '4WTt69YO2VI';

export const BackgroundAudio: React.FC = () => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initializePlayer = () => {
      if (!isMounted || !window.YT || !window.YT.Player) return;

      if (playerRef.current) return;

      playerRef.current = new window.YT.Player('yt-bg-audio-player', {
        height: '1',
        width: '1',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          modestbranding: 1,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            if (!isMounted) return;
            // Attempt autoplay immediately
            try {
              event.target.playVideo();
            } catch (err) {
              // Ignore autoplay restriction errors
            }

            // Fallback for browsers that require first user interaction to play unmuted audio
            const handleFirstInteraction = () => {
              try {
                if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
                  playerRef.current.playVideo();
                }
              } catch (e) {
                // Ignore
              }
              cleanupInteractionListeners();
            };

            const cleanupInteractionListeners = () => {
              window.removeEventListener('pointerdown', handleFirstInteraction);
              window.removeEventListener('touchstart', handleFirstInteraction);
              window.removeEventListener('keydown', handleFirstInteraction);
              window.removeEventListener('click', handleFirstInteraction);
            };

            window.addEventListener('pointerdown', handleFirstInteraction, { once: true, passive: true });
            window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
            window.addEventListener('keydown', handleFirstInteraction, { once: true, passive: true });
            window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
          },
          onStateChange: (event: any) => {
            // Ensure continuous looping when video ends (state 0 is YT.PlayerState.ENDED)
            if (event.data === 0) {
              try {
                event.target.playVideo();
              } catch (e) {
                // Ignore
              }
            }
          },
        },
      });
    };

    // Check if YouTube Iframe API script is already added
    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      const existingScript = document.getElementById('yt-iframe-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') {
          prevCallback();
        }
        initializePlayer();
      };
    }

    return () => {
      isMounted = false;
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Ignore
        }
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: -9999,
      }}
      aria-hidden="true"
    >
      <div id="yt-bg-audio-player" />
    </div>
  );
};
