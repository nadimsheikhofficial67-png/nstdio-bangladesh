import React, { useEffect, useState, useRef } from 'react';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SOCIAL_LINKS = [
  {
    title: 'Facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/nadimmahmud.699?rdid=6mzCyyD9MAbNjUbn&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Enb67qgHk%2F#',
    username: 'nadimmahmud.699',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    title: 'Instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/nadim_sheikh57/',
    username: '@nadim_sheikh57',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    title: 'X (Twitter)',
    label: 'X',
    href: 'https://x.com/nadim_sheikh78',
    username: '@nadim_sheikh78',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    title: 'Pinterest',
    label: 'Pinterest',
    href: 'https://pin.it/dTSqjUaRJ',
    username: 'nadim_mahmud',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.225-.174.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
    ),
  },
];

const NAV_ITEMS = [
  {
    number: '01',
    label: 'Works',
    title: 'N Studio Music',
    href: 'https://n-musicun-download.netlify.app/',
  },
  {
    number: '02',
    label: 'Services',
    title: 'Certificates & Services',
    href: 'https://md-nadim-mahmud-portfolio1.netlify.app/#certificates',
  },
  {
    number: '03',
    label: 'About',
    title: 'Portfolio & About',
    href: 'https://md-nadim-mahmud-portfolio1.netlify.app/',
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [timeString, setTimeString] = useState<string>('');
  const [isDesktopContactOpen, setIsDesktopContactOpen] = useState<boolean>(false);
  const contactDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 24h format in Cupertino time (America/Los_Angeles) using Intl.DateTimeFormat('en-GB')
    const formatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Los_Angeles',
    });

    const updateClock = () => {
      setTimeString(formatter.format(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close desktop contact dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contactDropdownRef.current &&
        !contactDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDesktopContactOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      id="site-header"
      className="absolute top-0 left-0 w-full z-20 text-white select-none"
    >
      <div className="max-w-[1340px] mx-auto w-full py-5 px-4 min-[810px]:py-[30px] min-[1200px]:py-9 min-[810px]:px-[18px] min-[1200px]:px-[15px]">
        <div className="flex items-center justify-between gap-3">
          {/* Left Side: Desktop / Tablet Navigation */}
          <nav
            id="desktop-nav"
            aria-label="Main Navigation"
            className="hidden min-[810px]:flex items-center gap-4 min-[1200px]:gap-8"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.number}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.title}
                id={`nav-link-${item.label.toLowerCase()}`}
                className="nav-link-underline group flex items-baseline gap-1.5 transition-opacity duration-200 hover:opacity-100"
              >
                <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase opacity-75 group-hover:opacity-100">
                  {item.number} /
                </span>
                <span className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase">
                  {item.label}
                </span>
              </a>
            ))}

            {/* 04 / Contact with Dropdown for Facebook, Instagram, and X */}
            <div
              ref={contactDropdownRef}
              className="relative"
              onMouseEnter={() => setIsDesktopContactOpen(true)}
              onMouseLeave={() => setIsDesktopContactOpen(false)}
            >
              <button
                type="button"
                id="nav-link-contact"
                onClick={() => setIsDesktopContactOpen((prev) => !prev)}
                aria-expanded={isDesktopContactOpen}
                aria-haspopup="true"
                className="nav-link-underline group flex items-baseline gap-1.5 transition-opacity duration-200 hover:opacity-100 cursor-pointer bg-transparent border-none text-white p-0"
              >
                <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase opacity-75 group-hover:opacity-100">
                  04 /
                </span>
                <span className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase">
                  Contact
                </span>
              </button>

              {/* Contact Social Dropdown */}
              <div
                className={`absolute left-0 top-full pt-3 transition-all duration-200 ${
                  isDesktopContactOpen
                    ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                    : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="w-60 p-2 rounded-xl bg-black/95 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col gap-1">
                  <div className="px-3 py-1.5 text-[9px] uppercase tracking-wider text-white/50 font-semibold border-b border-white/10 mb-1">
                    Connect With Me
                  </div>
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.title}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.title}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-white/60 group-hover:text-[#F598F2] transition-colors shrink-0">
                          {social.icon}
                        </span>
                        <span className="text-xs font-medium text-white group-hover:text-[#F598F2] transition-colors">
                          {social.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-white/50 group-hover:text-white/80 transition-colors">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="block min-[810px]:hidden shrink-0">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-panel"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase py-1.5 px-3 border border-white/40 hover:border-white transition-colors duration-200 rounded-sm"
            >
              {isMobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>

          {/* Right Side: Email & Live Clock */}
          <div
            id="header-info"
            className="flex flex-col items-end min-[810px]:flex-row min-[810px]:items-center gap-0.5 min-[810px]:gap-8 text-right min-w-0"
          >
            <a
              id="header-email-link"
              href="mailto:nadimmahmudofficial01@gmail.com"
              className="nav-link-underline text-[11px] min-[400px]:text-xs leading-tight tracking-[-0.12px] font-medium text-white hover:opacity-90 truncate max-w-[200px] min-[360px]:max-w-[245px] min-[480px]:max-w-none"
            >
              nadimmahmudofficial01@gmail.com
            </a>

            <div
              id="header-live-clock"
              role="timer"
              aria-live="off"
              aria-label="Cupertino live time"
              className="text-[10px] min-[810px]:text-xs leading-tight tracking-[-0.12px] font-medium uppercase text-white/70 min-[810px]:text-white/90 tabular-nums"
            >
              CUP {timeString || '00:00:00'}
            </div>
          </div>
        </div>

        {/* Mobile Accordion Panel */}
        <div
          id="mobile-nav-panel"
          className={`mobile-menu-grid block min-[810px]:hidden ${
            isMobileMenuOpen ? 'menu-open' : 'menu-closed'
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="overflow-hidden">
            <div className="mt-3 p-5 rounded-2xl bg-black/95 backdrop-blur-md border border-white/15 shadow-2xl">
              <nav
                id="mobile-nav-links"
                aria-label="Mobile Navigation"
                className="flex flex-col gap-4"
              >
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.number}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.title}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-baseline gap-3 text-[26px] leading-8 tracking-[-0.84px] font-medium text-white hover:text-[#F598F2] transition-colors"
                  >
                    <span className="text-sm font-medium text-white/60">
                      {item.number} /
                    </span>
                    <span>{item.label}</span>
                  </a>
                ))}

                {/* 04 / Contact Social Links with Titles on Mobile */}
                <div className="pt-4 border-t border-white/15 flex flex-col gap-2.5">
                  <span className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                    04 / Contact & Socials
                  </span>
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.title}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.title}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-white/70 group-hover:text-[#F598F2] transition-colors shrink-0">
                            {social.icon}
                          </span>
                          <span className="text-sm font-medium text-white">
                            {social.title}
                          </span>
                        </div>
                        <span className="text-xs text-[#F598F2]">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
