import { useState, useRef, useEffect } from 'react';

// Video URLs
const BUNT_VIDEO_URL = 'https://8ww34dvlu65vostd.public.blob.vercel-storage.com/buntmovie.mp4';
const BUNT_PREVIEW_URL = 'https://8ww34dvlu65vostd.public.blob.vercel-storage.com/buntthumb.mp4';
const BUNT_THUMBNAIL = 'https://8ww34dvlu65vostd.public.blob.vercel-storage.com/thumb.png';

// Data
const profiles = [
  { id: 1, name: 'Valued Bunter', avatar: 'https://8ww34dvlu65vostd.public.blob.vercel-storage.com/received_1507682280388007%20-%20Copy.jpeg' },
  { id: 2, name: 'Tidyman', avatar: 'https://8ww34dvlu65vostd.public.blob.vercel-storage.com/received_510312090726219.jpeg' },
  { id: 3, name: 'Add Profile', isAdd: true },
];

const buntMovie = {
  id: 'bunt-the-movie',
  title: 'Bunt: The Movie',
  year: 2025,
  rating: 'B',
  ratingFull: 'Rated B - for Bunt',
  seasons: 1,
  match: 98,
  synopsis: 'A groundbreaking docuseries following the elite feminist think-tank known globally as "The Bunt Boys". From shady busines tactics to moments of unexpected brilliance, witness the raw, unfiltered journey of the legendary yet controversial Bunt Boys.',
  genres: ['Docuseries', 'Reality', 'Exposé', 'Drama'],
  tags: ['Chaotic', 'Heartwarming', 'Unhinged', 'Australian'],
  cast: ['Ricky Capo', 'Neville Bunt', 'Callum Russell', 'Tax Bracket Page'],
  episodes: [
    { id: 1, episode: 1, title: 'The Beginning', synopsis: 'Meet the legendary Bunt Boys as their chaotic journey begins.', duration: '45m' },
    { id: 2, episode: 2, title: 'Episode 2', synopsis: 'Meet the Bunt Boys and learn their message.', duration: '42m' },
    { id: 3, episode: 3, title: 'Episode 3', synopsis: 'Why do they appear so shady - and is it actually as bad as it looks?', duration: '48m' },
  ],
  videoUrl: BUNT_VIDEO_URL,
};

const contentRows = [
  { id: 'continue', title: 'Continue Watching for', hasProfileName: true, showProgress: true },
  { id: 'trending', title: 'Trending Now' },
  { id: 'top10', title: 'Top 10 in Australia Today', isTop10: true },
  { id: 'new', title: 'New Releases' },
  { id: 'originals', title: 'Bunt Originals', isOriginals: true },
  { id: 'because', title: 'Because You Watched Bunt: The Movie' },
];

// Icons
const PlayIcon = ({ size = 24, fill = false, color = 'white' }) => (
  <svg width={size} height={size} fill={fill ? color : "none"} viewBox="0 0 24 24" stroke={color} strokeWidth={fill ? 0 : 2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
  </svg>
);

const InfoIcon = ({ size = 24, color = 'white' }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
  </svg>
);

const PlusIcon = ({ size = 24, color = 'white' }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const ChevronDown = ({ size = 24, color = 'white' }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const HomeIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
  </svg>
);

const SearchIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);

const ClockIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);

const UserIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
);

const ThumbsUpIcon = ({ size = 20, color = 'white' }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
  </svg>
);

const ArrowLeftIcon = ({ size = 24, color = 'white' }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const PauseIcon = ({ size = 24, color = 'white' }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
);

const MaximizeIcon = ({ size = 24, color = 'white' }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
  </svg>
);

const VolumeIcon = ({ size = 24, muted = false, color = 'white' }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    {muted ? (
      <><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></>
    ) : (
      <><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></>
    )}
  </svg>
);

const Logo = ({ size = 'default' }) => {
  const sizes = { small: '1.2rem', default: '1.5rem', large: '2.5rem' };
  return (
    <span style={{ fontWeight: '600', letterSpacing: '0.08em', color: '#E50914', fontFamily: "'Bebas Neue', Arial, sans-serif", fontSize: sizes[size] }}>
      BUNTFLIX
    </span>
  );
};

const BlackFade = ({ visible }) => (
  <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 9998, opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none', transition: 'opacity 0.4s ease' }} />
);

const useResponsivePadding = () => {
  const [padding, setPadding] = useState('16px');
  useEffect(() => {
    const updatePadding = () => setPadding(window.innerWidth >= 768 ? '48px' : '16px');
    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);
  return padding;
};

const ProfileSelection = ({ onSelect }) => {
  const padding = useResponsivePadding();
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#141414', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: `24px ${padding}` }}><Logo size="large" /></header>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '-64px', padding: `0 ${padding}` }}>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: 'white', marginBottom: '40px', fontWeight: '400', textAlign: 'center' }}>Who's Bunting?</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', maxWidth: '600px' }}>
          {profiles.map((profile, idx) => (
            <button key={profile.id} onClick={() => !profile.isAdd && onSelect(profile)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0, animation: `fadeSlideIn 0.5s ease ${idx * 0.1}s forwards` }}>
              <div style={{ width: 'clamp(100px, 28vw, 140px)', height: 'clamp(100px, 28vw, 140px)', borderRadius: '4px', overflow: 'hidden', background: profile.isAdd ? '#333' : 'linear-gradient(135deg, #E50914, #831010)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 0 4px white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                {profile.isAdd ? <PlusIcon size={48} color="#808080" /> : profile.avatar ? <img src={profile.avatar} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 'bold', color: 'white' }}>{profile.name.charAt(0)}</span>}
              </div>
              <span style={{ marginTop: '12px', color: '#808080', fontSize: '14px' }}>{profile.name}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

const Navbar = ({ profile, onProfileClick }) => {
  const padding = useResponsivePadding();
  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `16px ${padding}`, background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 4vw, 40px)' }}>
          <Logo />
          <div style={{ display: 'flex', gap: 'clamp(12px, 3vw, 24px)', fontSize: '14px' }}>
            <span style={{ color: 'white', fontWeight: '500', cursor: 'pointer' }}>Home</span>
            <span style={{ color: '#B3B3B3', cursor: 'pointer' }}>Bunt TV</span>
          </div>
        </div>
        <button onClick={onProfileClick} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'linear-gradient(135deg, #E50914, #831010)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {profile?.avatar ? <img src={profile.avatar} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>{profile?.name?.charAt(0) || 'V'}</span>}
          </div>
          <ChevronDown size={16} />
        </button>
      </nav>
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, background: '#141414', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
        {[{ Icon: HomeIcon, label: 'Home', active: true }, { Icon: SearchIcon, label: 'Search' }, { Icon: ClockIcon, label: 'Coming Soon' }, { Icon: UserIcon, label: 'My Bunt' }].map(({ Icon, label, active }, i) => (
          <button key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', color: active ? 'white' : '#808080', padding: '8px 16px' }}>
            <Icon /><span style={{ fontSize: '10px' }}>{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

const Hero = ({ onMoreInfo, onPlay }) => {
  const padding = useResponsivePadding();
  return (
    <section style={{ position: 'relative', height: '85vh', minHeight: '550px', width: '100%', overflow: 'hidden' }}>
      <video src={BUNT_PREVIEW_URL} autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #141414 0%, rgba(20,20,20,0.6) 20%, transparent 50%, rgba(20,20,20,0.3) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.5) 35%, transparent 60%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
        <div style={{ padding: `0 ${padding}`, paddingTop: '60px', maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#E50914', borderRadius: '4px', padding: '2px 8px' }}>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>TOP</span>
              <span style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', marginLeft: '4px' }}>10</span>
            </div>
            <span style={{ color: 'white', fontSize: 'clamp(12px, 3vw, 16px)', fontWeight: '500' }}>#1 in Australia Today</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', fontWeight: '600', color: 'white', marginBottom: '20px', letterSpacing: '0.05em', fontFamily: "'Bebas Neue', Arial, sans-serif", lineHeight: 0.95 }}>BUNT: THE MOVIE</h1>
          <p style={{ color: 'white', fontSize: 'clamp(14px, 3vw, 18px)', marginBottom: '28px', lineHeight: 1.5, maxWidth: '550px', opacity: 0.9 }}>{buntMovie.synopsis}</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={onPlay} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: 'black', fontWeight: '600', padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 28px)', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: 'clamp(14px, 3vw, 18px)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
              <PlayIcon size={22} fill color="black" />Play
            </button>
            <button onClick={onMoreInfo} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(109,109,110,0.7)', color: 'white', fontWeight: '600', padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 28px)', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: 'clamp(14px, 3vw, 18px)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(109,109,110,0.5)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(109,109,110,0.7)'}>
              <InfoIcon size={22} />More Info
            </button>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '15%', right: padding, display: 'flex', alignItems: 'center', background: 'rgba(51,51,51,0.6)', borderLeft: '3px solid white', padding: '6px 16px' }}>
        <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{buntMovie.ratingFull}</span>
      </div>
    </section>
  );
};

const ContentRow = ({ row, profile, onCardClick }) => {
  const padding = useResponsivePadding();
  const title = row.hasProfileName ? `${row.title} ${profile?.name || 'Valued Bunter'}` : row.title;
  const itemCount = row.isTop10 ? 10 : 6;
  return (
    <section style={{ marginBottom: '40px', padding: `0 ${padding}` }}>
      <h2 style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: '600', color: 'white', marginBottom: '16px' }}>{title}</h2>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px' }} className="hide-scrollbar">
        {Array(itemCount).fill(null).map((_, i) => {
          const isRealShow = i === 0;
          return (
            <div key={i} style={{ position: 'relative', flexShrink: 0, paddingLeft: row.isTop10 ? '48px' : 0 }}>
              {row.isTop10 && <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', fontSize: 'clamp(4rem, 12vw, 6rem)', fontWeight: '600', color: 'transparent', WebkitTextStroke: '2px #666', lineHeight: 1, zIndex: 5, fontFamily: "'Bebas Neue', Arial, sans-serif" }}>{i + 1}</span>}
              <button onClick={isRealShow ? onCardClick : undefined} style={{ position: 'relative', width: row.isOriginals ? 'clamp(100px, 30vw, 140px)' : 'clamp(140px, 40vw, 180px)', aspectRatio: row.isOriginals ? '2/3' : '16/9', borderRadius: '4px', overflow: 'hidden', border: 'none', cursor: isRealShow ? 'pointer' : 'default', transition: 'transform 0.3s ease, box-shadow 0.3s ease', background: '#1a1a1a' }}
                onMouseEnter={(e) => { if (isRealShow) { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.zIndex = '10'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.6)'; }}}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.zIndex = '1'; e.currentTarget.style.boxShadow = 'none'; }}>
                {isRealShow ? (
                  <>
                    <img src={BUNT_THUMBNAIL} alt="Bunt: The Movie" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px' }}><span style={{ fontSize: '11px', color: 'white', fontWeight: '600' }}>Bunt: The Movie</span></div>
                  </>
                ) : (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)' }}><span style={{ fontSize: '11px', color: '#444', textAlign: 'center', padding: '8px', fontWeight: '500' }}>Coming Soon</span></div>
                )}
                {row.showProgress && isRealShow && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: '#4a4a4a' }}><div style={{ height: '100%', width: '35%', background: '#E50914' }} /></div>}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const TitleDetail = ({ onBack, onPlay }) => {
  const padding = useResponsivePadding();
  return (
    <div style={{ minHeight: '100vh', background: '#141414' }}>
      <button onClick={onBack} style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 100, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}>
        <ArrowLeftIcon size={24} />
      </button>
      <div style={{ position: 'relative', width: '100%', height: '50vh', minHeight: '300px' }}>
        <video src={BUNT_PREVIEW_URL} autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #141414 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => onPlay(1)} style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '3px solid white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s, background 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; }}>
            <PlayIcon size={30} fill />
          </button>
        </div>
        <div style={{ position: 'absolute', bottom: '24px', left: padding, right: padding }}>
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', fontWeight: '600', color: 'white', marginBottom: '16px', fontFamily: "'Bebas Neue', Arial, sans-serif", letterSpacing: '0.03em' }}>BUNT: THE MOVIE</h1>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => onPlay(1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: 'black', fontWeight: '600', padding: '10px 24px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '16px', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
              <PlayIcon size={20} fill color="black" />Play
            </button>
            <button style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.7)', background: 'rgba(42,42,42,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlusIcon size={24} /></button>
            <button style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.7)', background: 'rgba(42,42,42,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ThumbsUpIcon size={22} /></button>
          </div>
        </div>
      </div>
      <div style={{ padding: `24px ${padding}`, paddingBottom: '120px' }}>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ color: '#46d369', fontWeight: '700', fontSize: '15px' }}>{buntMovie.match}% Match</span>
              <span style={{ color: '#bcbcbc', fontSize: '14px' }}>{buntMovie.year}</span>
              <span style={{ border: '1px solid #808080', padding: '2px 8px', fontSize: '12px', color: '#bcbcbc' }}>{buntMovie.ratingFull}</span>
              <span style={{ color: '#bcbcbc', fontSize: '14px' }}>{buntMovie.seasons} Season</span>
              <span style={{ border: '1px solid #808080', padding: '1px 6px', fontSize: '12px', color: '#bcbcbc' }}>HD</span>
            </div>
            <p style={{ color: 'white', fontSize: '15px', lineHeight: 1.7 }}>{buntMovie.synopsis}</p>
          </div>
          <div style={{ width: '260px', fontSize: '14px' }}>
            <p style={{ marginBottom: '10px', lineHeight: 1.6 }}><span style={{ color: '#777' }}>Cast: </span><span style={{ color: '#ddd' }}>{buntMovie.cast.join(', ')}</span></p>
            <p style={{ marginBottom: '10px', lineHeight: 1.6 }}><span style={{ color: '#777' }}>Genres: </span><span style={{ color: '#ddd' }}>{buntMovie.genres.join(', ')}</span></p>
            <p style={{ lineHeight: 1.6 }}><span style={{ color: '#777' }}>This show is: </span><span style={{ color: '#ddd' }}>{buntMovie.tags.join(', ')}</span></p>
          </div>
        </div>
        <div style={{ marginTop: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: '600', color: 'white' }}>Episodes</h2>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#242424', border: '1px solid #555', borderRadius: '4px', color: 'white', cursor: 'pointer', fontSize: '14px' }}>Season 1 <ChevronDown size={16} /></button>
          </div>
          {buntMovie.episodes.map((ep) => (
            <button key={ep.id} onClick={() => onPlay(ep.episode)} style={{ width: '100%', display: 'flex', gap: '16px', padding: '16px 0', borderRadius: '4px', background: 'transparent', border: 'none', borderBottom: '1px solid #333', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#333'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <span style={{ width: '28px', color: '#808080', fontSize: '22px', fontWeight: '500', flexShrink: 0, display: 'flex', alignItems: 'center' }}>{ep.episode}</span>
              <div style={{ width: 'clamp(100px, 25vw, 160px)', aspectRatio: '16/9', flexShrink: 0, borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                {ep.episode === 1 ? <img src={BUNT_THUMBNAIL} alt="Bunt: The Movie" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '10px', color: '#444' }}>Coming Soon</span></div>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', gap: '8px' }}>
                  <span style={{ color: 'white', fontWeight: '500', fontSize: '15px' }}>{ep.title}</span>
                  <span style={{ color: '#808080', fontSize: '14px', flexShrink: 0 }}>{ep.duration}</span>
                </div>
                <p style={{ color: '#9a9a9a', fontSize: '13px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ep.synopsis}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const VideoPlayer = ({ episode, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeout = useRef(null);
  const ep = buntMovie.episodes[episode - 1];

  useEffect(() => {
    if (containerRef.current?.requestFullscreen) containerRef.current.requestFullscreen().catch(() => {});
    return () => { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); };
  }, []);

  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    resetControlsTimer();
    return () => { if (controlsTimeout.current) clearTimeout(controlsTimeout.current); };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => { setCurrentTime(video.currentTime); setProgress((video.currentTime / video.duration) * 100); };
    const handleLoadedMetadata = () => setDuration(video.duration);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => { video.removeEventListener('timeupdate', handleTimeUpdate); video.removeEventListener('loadedmetadata', handleLoadedMetadata); };
  }, []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  const handleBack = () => { if (document.fullscreenElement) document.exitFullscreen().then(onBack).catch(onBack); else onBack(); };
  const handlePlayPause = (e) => { e.stopPropagation(); if (videoRef.current) { isPlaying ? videoRef.current.pause() : videoRef.current.play(); setIsPlaying(!isPlaying); }};
  const handleSkipBack = (e) => { e.stopPropagation(); if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10); };
  const handleSkipForward = (e) => { e.stopPropagation(); if (videoRef.current) videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10); };
  const handleMuteToggle = (e) => { e.stopPropagation(); if (videoRef.current) { videoRef.current.muted = !isMuted; setIsMuted(!isMuted); }};
  const handleProgressClick = (e) => { e.stopPropagation(); const rect = e.currentTarget.getBoundingClientRect(); if (videoRef.current) videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration; };
  const handleFullscreen = (e) => { e.stopPropagation(); document.fullscreenElement ? document.exitFullscreen() : containerRef.current?.requestFullscreen(); };

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'black', cursor: showControls ? 'default' : 'none' }} onMouseMove={resetControlsTimer}>
      <video ref={videoRef} src={BUNT_VIDEO_URL} autoPlay playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: 'black' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: showControls ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: showControls ? 'auto' : 'none' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px 24px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'center' }}>
          <button onClick={(e) => { e.stopPropagation(); handleBack(); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginRight: '20px' }}><ArrowLeftIcon size={32} /></button>
          <p style={{ color: 'white', fontSize: '16px', fontWeight: '500' }}>Bunt: The Movie</p>
          <span style={{ color: '#999', margin: '0 12px' }}>•</span>
          <p style={{ color: '#ccc', fontSize: '15px' }}>S1:E{episode} "{ep?.title}"</p>
        </div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '60px' }}>
          <button onClick={handleSkipBack} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.9 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
            <span style={{ fontSize: '14px', marginTop: '4px' }}>10</span>
          </button>
          <button onClick={handlePlayPause} style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.9)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            {isPlaying ? <PauseIcon size={40} /> : <PlayIcon size={40} fill />}
          </button>
          <button onClick={handleSkipForward} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.9 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
            <span style={{ fontSize: '14px', marginTop: '4px' }}>10</span>
          </button>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
          <div style={{ height: '5px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px', marginBottom: '16px', cursor: 'pointer', position: 'relative' }} onClick={handleProgressClick}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${progress}%`, background: '#E50914', borderRadius: '3px', transition: 'width 0.1s' }} />
            <div style={{ position: 'absolute', top: '50%', left: `${progress}%`, transform: 'translate(-50%, -50%)', width: '14px', height: '14px', background: '#E50914', borderRadius: '50%' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button onClick={handlePlayPause} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>{isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} fill />}</button>
              <button onClick={handleSkipBack} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg></button>
              <button onClick={handleSkipForward} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg></button>
              <button onClick={handleMuteToggle} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><VolumeIcon size={28} muted={isMuted} /></button>
              <span style={{ color: 'white', fontSize: '14px' }}>{formatTime(currentTime)} / {formatTime(duration || 0)}</span>
            </div>
            <button onClick={handleFullscreen} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><MaximizeIcon size={28} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Browse = ({ profile, onProfileClick, onShowDetail, onPlay }) => {
  const padding = useResponsivePadding();
  return (
    <div style={{ minHeight: '100vh', background: '#141414', paddingBottom: '80px' }}>
      <Navbar profile={profile} onProfileClick={onProfileClick} />
      <Hero onMoreInfo={onShowDetail} onPlay={onShowDetail} />
      <div style={{ position: 'relative', zIndex: 10, marginTop: '-120px' }}>
        {contentRows.map((row) => <ContentRow key={row.id} row={row} profile={profile} onCardClick={onShowDetail} />)}
      </div>
      <footer style={{ padding: `40px ${padding}`, textAlign: 'center' }}><p style={{ color: '#4a4a4a', fontSize: '12px' }}>© 2025 BUNTFLIX</p></footer>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState('profiles');
  const [profile, setProfile] = useState(null);
  const [playingEp, setPlayingEp] = useState(null);
  const [fadeVisible, setFadeVisible] = useState(false);

  const navigate = (newPage) => {
    setFadeVisible(true);
    setTimeout(() => { setPage(newPage); setTimeout(() => setFadeVisible(false), 50); }, 400);
  };

  if (playingEp) return <VideoPlayer episode={playingEp} onBack={() => setPlayingEp(null)} />;

  return (
    <>
      <BlackFade visible={fadeVisible} />
      {page === 'profiles' && <ProfileSelection onSelect={(p) => { setProfile(p); navigate('browse'); }} />}
      {page === 'browse' && <Browse profile={profile} onProfileClick={() => navigate('profiles')} onShowDetail={() => navigate('detail')} onPlay={(ep) => setPlayingEp(ep)} />}
      {page === 'detail' && <TitleDetail onBack={() => navigate('browse')} onPlay={(ep) => setPlayingEp(ep)} />}
    </>
  );
}
