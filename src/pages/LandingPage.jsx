import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from "framer-motion";
import Confetti from "react-confetti";
import { 
  Heart, Download, Share2, Star, Sparkles, Music, Play, Pause, Volume2, VolumeX,
  Gift, X, CheckCircle, ZoomIn, ZoomOut, Sun, Moon, ChevronLeft, ChevronRight,
  Cake, PartyPopper, Mail, Send, Camera, Calendar, MapPin
} from "lucide-react";
import pasfoto from '../assets/pasfoto.jpeg';
import piagam from '../assets/piagam.jpg';
import firstmeet from '../assets/firstmeet.jpeg';
import fs1 from '../assets/fs1.jpeg';
import fs2 from '../assets/fs2.jpeg';
import kaputra1 from '../assets/kaputra1.jpeg';
import kaputra2 from '../assets/kaputra2.jpeg';
import kaputra3 from '../assets/kaputra3.jpeg';
import kaputra4 from '../assets/kaputra4.jpeg';
import kaputra5 from '../assets/kaputra5.jpeg';
import kaputra6 from '../assets/kaputra6.jpeg';
import kaputra7 from '../assets/kaputra7.jpeg';
import kaputra8 from '../assets/kaputra8.jpeg';
import kaputra9 from '../assets/kaputra9.jpeg';
import backgroundMusic from '../assets/music/nadin-ah.mp4';
const loadGoogleFonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@500;600&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

const LuxuryBirthdayPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPersonalizedConfetti, setShowPersonalizedConfetti] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [countdown, setCountdown] = useState(10);
  const [showCountdown, setShowCountdown] = useState(false);
  const [secretMessage, setSecretMessage] = useState('');
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [loadedImages, setLoadedImages] = useState({});

  const audioRef = useRef(null);
  const cheerSoundRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => { loadGoogleFonts(); }, []);
  useEffect(() => {
    const images = [pasfoto, piagam, firstmeet, fs1, fs2, kaputra1, kaputra2, kaputra3, kaputra4, kaputra5, kaputra6, kaputra7, kaputra8, kaputra9];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoadedImages(prev => ({ ...prev, [src]: true }));
    });
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    }
  }, []);
  useEffect(() => {
    if (currentStep === 1) {
      const text = steps[1].personalMessage;
      let index = 0;
      setTypewriterText('');
      const interval = setInterval(() => {
        if (index < text.length) {
          setTypewriterText(prev => prev + text[index]);
          index++;
        } else { clearInterval(interval); }
      }, 70);
      return () => clearInterval(interval);
    }
  }, [currentStep]);
  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && showCountdown) {
      setShowCountdown(false);
      setCountdown(10);
      setShowPersonalizedConfetti(true);
      setTimeout(() => setShowPersonalizedConfetti(false), 5000);
    }
  }, [countdown, showCountdown]);
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const toggleMusic = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
      setIsPlaying(!isPlaying);
    }
  };
  const toggleMute = () => { if (audioRef.current) { audioRef.current.muted = !isMuted; setIsMuted(!isMuted); } };
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const nextStep = () => { if (currentStep === steps.length - 1) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); } else { setCurrentStep(p => p + 1); } };
  const prevStep = () => setCurrentStep(p => Math.max(0, p - 1));
  const zoomIn = () => setImageZoom(p => Math.min(p + 0.2, 3));
  const zoomOut = () => setImageZoom(p => Math.max(p - 0.2, 1));
  const nextImage = () => setCurrentImageIndex(p => (p + 1) % steps[2].images.length);
  const prevImage = () => setCurrentImageIndex(p => (p - 1 + steps[2].images.length) % steps[2].images.length);

  const openCertificateModal = () => {
    setShowCertificateModal(true);
    if (cheerSoundRef.current) cheerSoundRef.current.play().catch(() => {});
    setShowCountdown(true);
    setShowPersonalizedConfetti(true);
    setTimeout(() => setShowPersonalizedConfetti(false), 5000);
  };

  const downloadCertificate = () => {
    const link = document.createElement('a');
    link.href = piagam;
    link.download = 'Birthday-Wish-kaputra.jpg';
    link.click();
    setShowCertificateModal(false);
    setShowDownloadSuccess(true);
    setTimeout(() => setShowDownloadSuccess(false), 3000);
  };

  const shareMessage = () => {
    const text = "🎂 A little birthday surprise for someone special. Check it out!";
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };
  const shareToEmail = () => {
    window.location.href = `mailto:?subject=🎉 Happy Birthday!&body=Just wanted to share something sweet with you.`;
  };
  const shareToSocial = (platform) => {
    const url = window.location.href;
    if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    else if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
  };

  const revealSecretMessage = () => {
    setSecretMessage("Just wanted you to know – you make ordinary days feel special. Happy Birthday. 💙");
    setShowSecretMessage(true);
    setTimeout(() => setShowSecretMessage(false), 5000);
  };

  const steps = [
    {
      type: "opening",
      title: "Hey, it's your day KAAA 🎂",
      message: "Today is all about you. I made something small, just to say I'm glad you're here.",
      image: pasfoto,
      buttonText: "Open this for me",
      personalMessage: "Really happy you were born.",
      music: "soft"
    },
    {
      type: "birthday_wish",
      title: "A note for you",
      message: "Nothing fancy. Just words from the heart.",
      image: piagam,
      personalMessage: "Being around you makes things feel a little lighter.",
      loveNotes: [
        "You have a way of making people feel seen.",
        "Your laugh is genuinely contagious.",
        "You show up, even when it's hard.",
        "The world is better with you in it.",
        "Here's to more quiet moments and loud laughs."
      ],
      music: "warm",
      certificateInfo: {
        from: "From someone who appreciates you.",
        to: "Ka Putra",
        date: "Your special day",
        message: "Wishing you a year that feels as good as you make others feel. No grand promises – just genuine hope for your happiness."
      }
    },
    {
      type: "memories",
      title: "Moments we've had",
      message: "Some snapshots from the story so far.",
      images: [
        { src: firstmeet, caption: "When we first met", description: "Didn't know then what I know now.", date: "2023" },
        { src: fs1, caption: "Coffee & conversations", description: "The simple talks that meant everything.", date: "2023" },
        { src: fs2, caption: "Just being", description: "No agenda. Just us.", date: "2024" },
        { src: kaputra1, caption: "Little adventures", description: "Getting lost together.", date: "Now" },
        { src: kaputra2, caption: "Quiet Sundays", description: "The calm in between.", date: "2023" },
        { src: kaputra3, caption: "You, being you", description: "That's the best part.", date: "2024" },
        { src: kaputra4, caption: "Today", description: "And here we are.", date: "🎂" }
      ],
      music: "nostalgic"
    },
    {
      type: "love_letter",
      title: "What I wanted to say",
      message: "In case I don't say it enough.",
      letter: [
"Heyyooow sayangkuuu ,",
"",
"Today's your day ya kaa. So I'll keep this simple mwehehehe.",
"",
"I notice things about ka putra, alweeyyyss yaa.",
"Like how ka putra listen – really listen.",
"Or how ka putra find humor in the small stuff.",
"",
"Ka putra, don't always see what I see.",
"But I see it.",
"",
"Your kindness isn't performative.",
"Your strength isn't loud.",
"Your presence just... fits.",
"",
"I'm not great with big speeches.",
"So here's the short version:",
"",
"I'm glad you exist.",
"I'm glad I know you.",
"I'm glad today is yours.",
"",
"Happy Birthday yaa kaa.",
"However you spend it,",
"I hope it feels good.",
"",
"– Me"
      ],
      music: "intimate"
    },
    {
      type: "future",
      title: "What's next",
      message: "No predictions. Just hopes.",
      dreams: [
        { icon: "☕", title: "More mornings", description: "Coffee, silence, and the comfort of routine." },
        { icon: "🗺️", title: "New places", description: "Getting lost somewhere unfamiliar, together." },
        { icon: "🌱", title: "Growing", description: "Becoming versions of ourselves we like more." },
        { icon: "💙", title: "This", description: "Whatever this is. Keeping it real." }
      ],
      music: "hopeful"
    }
  ];

  const currentStepData = steps[Math.min(currentStep, steps.length - 1)];

  const theme = {
    light: {
      bg: 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-sky-50',
      card: 'bg-white/80',
      cardBorder: 'border-blue-100',
      text: 'text-slate-800',
      textMuted: 'text-slate-600',
      textLight: 'text-slate-500',
      accent: 'text-blue-600',
      gradient: 'from-blue-500 via-sky-400 to-cyan-400',
      gradientHover: 'from-sky-500 to-blue-500',
      floating: 'bg-blue-200/30',
      sparkles: 'text-sky-300/50'
    },
    dark: {
      bg: 'bg-gradient-to-br from-slate-900 via-blue-950/50 to-slate-900',
      card: 'bg-slate-800/80',
      cardBorder: 'border-blue-900/50',
      text: 'text-slate-100',
      textMuted: 'text-slate-400',
      textLight: 'text-slate-500',
      accent: 'text-sky-300',
      gradient: 'from-blue-600 via-sky-500 to-cyan-500',
      gradientHover: 'from-sky-600 to-blue-600',
      floating: 'bg-blue-500/20',
      sparkles: 'text-sky-400/30'
    }
  };
  const t = isDarkMode ? theme.dark : theme.light;
  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
  const fadeInLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } };
  const fadeInRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } };
  const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", damping: 20 } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
  const floatSlow = { y: [0, -8, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } };
  const pulseSoft = { scale: [1, 1.03, 1], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } };
  const floatingElements = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    emoji: ['·', '⁺', '✦', '•', '⋆', '˚'][i % 6],
    size: Math.random() * 8 + 6,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 15 + 20,
    opacity: Math.random() * 0.4 + 0.2
  }));

  return (
    <div ref={containerRef} className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-700 ${t.bg}`}>
      <audio ref={audioRef} src={backgroundMusic} loop autoPlay playsInline muted={isMuted} />
      <audio ref={cheerSoundRef} src="https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3" />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map(el => (
          <motion.div key={el.id}
            className="absolute"
            style={{ 
              left: `${el.left}%`, 
              bottom: -20,
              fontSize: el.size,
              color: isDarkMode ? '#94a3b8' : '#64748b',
              opacity: el.opacity
            }}
            animate={{
              y: [windowSize.height + 30, -30],
              x: [0, Math.sin(el.id) * 30, 0],
              opacity: [el.opacity, el.opacity + 0.2, el.opacity]
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "linear"
            }}
          >
            {el.emoji}
          </motion.div>
        ))}

        {[...Array(4)].map((_, i) => (
          <motion.div key={`glow-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: Math.random() * 300 + 150,
              height: Math.random() * 300 + 150,
              left: `${i * 25 + Math.random() * 10}%`,
              top: `${Math.random() * 60 + 10}%`,
              background: `radial-gradient(circle, ${isDarkMode ? 'rgba(59,130,246,0.15)' : 'rgba(96,165,250,0.1)'}, transparent 70%)`
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Gentle wave at bottom */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: `linear-gradient(to top, ${isDarkMode ? 'rgba(30,58,138,0.3)' : 'rgba(147,197,253,0.2)'}, transparent)`
          }}
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 🎵 Minimal Music Controls */}
      <div className="fixed top-5 right-5 z-50 flex gap-2">
        {[
          { onClick: toggleTheme, icon: isDarkMode ? Sun : Moon, label: "Theme" },
          { onClick: toggleMusic, icon: isPlaying ? Pause : Play, label: isPlaying ? "Pause" : "Play" },
          { onClick: toggleMute, icon: isMuted ? VolumeX : Volume2, label: isMuted ? "Unmute" : "Mute" }
        ].map((btn, i) => (
          <motion.button key={i}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}
            onClick={btn.onClick} title={btn.label}
            className={`p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 ${
              isDarkMode ? 'bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700' : 'bg-white/70 hover:bg-white/90 border border-blue-100'
            }`}
          >
            <btn.icon size={18} className={isDarkMode ? 'text-slate-300' : 'text-slate-600'} />
          </motion.button>
        ))}
      </div>

      {/* 🎊 Confetti */}
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={400}
          colors={['#60a5fa', '#38bdf8', '#0ea5e9', '#0284c7', '#f0f9ff']} 
          gravity={0.08} wind={0.02} recycle={false} />
      )}

      {/* ✨ Subtle Personalized Confetti */}
      {showPersonalizedConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(40)].map((_, i) => (
            <motion.div key={i} className="absolute text-lg"
              initial={{ x: Math.random() * windowSize.width, y: -30, opacity: 0, scale: 0.6 }}
              animate={{
                y: windowSize.height + 30,
                x: Math.random() * 200 - 100,
                opacity: [0, 1, 1, 0],
                scale: [0.6, 1, 1, 0.8],
                rotate: Math.random() * 360
              }}
              transition={{ duration: 4 + Math.random() * 2, ease: "easeOut", delay: Math.random() * 0.8 }}
            >
              {['💙', '✨', '·', '✦'][i % 4]}
            </motion.div>
          ))}
        </div>
      )}

      {/* 🎁 Certificate Modal */}
      <AnimatePresence>
        {showCertificateModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowCertificateModal(false)}
          >
            <motion.div initial={{ scale: 0.96, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.96, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 180 }}
              className={`${t.card} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto border ${t.cardBorder} backdrop-blur-md`}
              onClick={e => e.stopPropagation()}
            >
              <div className={`sticky top-0 ${t.card} z-10 px-5 py-4 border-b ${t.cardBorder} flex justify-between items-center backdrop-blur-md`}>
                <h3 className={`font-semibold ${t.text} flex items-center gap-2`}>
                  <Gift className="w-5 h-5 text-blue-400" /> A little something
                </h3>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCertificateModal(false)}
                  className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-blue-50'} transition-colors`}
                >
                  <X size={18} className={isDarkMode ? "text-slate-400" : "text-slate-600"} />
                </motion.button>
              </div>
              
              <div className="p-5 space-y-5">
                {/* Image */}
                <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-white" 
                  style={{ transform: `scale(${imageZoom})`, transformOrigin: 'center', transition: 'transform 0.3s ease' }}>
                  <img src={piagam} alt="Birthday wish" className="w-full h-auto" />
                </div>
                
                {/* Info */}
                <div className={`${isDarkMode ? 'bg-slate-700/50' : 'bg-blue-50/60'} rounded-lg p-4 space-y-2`}>
                  <p className={t.textMuted}><span className="font-medium text-blue-400">From:</span> {steps[1].certificateInfo.from}</p>
                  <p className={t.textMuted}><span className="font-medium text-blue-400">To:</span> {steps[1].certificateInfo.to}</p>
                  <p className={t.textMuted}><span className="font-medium text-blue-400">Date:</span> {steps[1].certificateInfo.date}</p>
                </div>
                
                {/* Countdown */}
                {showCountdown && (
                  <div className={`${isDarkMode ? 'bg-slate-700/50' : 'bg-blue-100/60'} rounded-lg p-4 text-center`}>
                    <p className={`text-sm ${t.text} mb-2`}>Available to save in:</p>
                    <motion.div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow`}
                      animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 1, repeat: Infinity }}
                    >
                      <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">{countdown}</span>
                    </motion.div>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={downloadCertificate} disabled={showCountdown}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium shadow-md transition-all ${
                      showCountdown ? 'bg-slate-400 cursor-not-allowed' : `bg-gradient-to-r ${t.gradient} hover:${t.gradientHover}`
                    }`}
                  >
                    <Download size={16} /> {showCountdown ? 'Wait...' : 'Save'}
                  </motion.button>
                  <div className="flex gap-2">
                    {[{ onClick: shareMessage, bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', icon: Share2 },
                      { onClick: shareToEmail, bg: 'bg-blue-500', hover: 'hover:bg-blue-600', icon: Mail }].map((btn, i) => (
                      <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={btn.onClick} className={`p-2.5 ${btn.bg} ${btn.hover} text-white rounded-full shadow transition-all`}
                      >
                        <btn.icon size={16} />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Success Toast */}
      <AnimatePresence>
        {showDownloadSuccess && (
          <motion.div initial={{ opacity: 0, y: -40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -40 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r ${t.gradient} text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2`}
          >
            <CheckCircle size={18} /> <span className="text-sm font-medium">Saved! 💙</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💬 Secret Message */}
      <AnimatePresence>
        {showSecretMessage && (
          <motion.div initial={{ opacity: 0, scale: 0.94, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: "spring", damping: 24 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-r ${t.gradient} text-white px-6 py-4 rounded-xl shadow-2xl max-w-sm text-center`}
          >
            <Cake className="w-10 h-10 mx-auto mb-3" />
            <p className="text-sm leading-relaxed">{secretMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎂 Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} variants={fadeInUp} initial="hidden" animate="visible" exit={{ opacity: 0, y: -30 }}
            className="max-w-3xl mx-auto"
          >
            {/* Step 1: Opening */}
            {currentStepData.type === "opening" && (
              <div className="text-center py-16 md:py-24 min-h-screen flex flex-col justify-center">
                {/* Photo - Square, elegant */}
                <motion.div variants={scaleIn}
                  className="w-64 h-64 md:w-80 md:h-80 mx-auto mb-10 rounded-2xl overflow-hidden shadow-2xl relative group"
                >
                  <img src={currentStepData.image} alt="You" 
                    className={`w-full h-full object-cover transition-transform duration-700 ${loadedImages[currentStepData.image] ? 'opacity-100' : 'opacity-0'}`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
                
                {/* Text - staggered entrance */}
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-12 px-4">
                  <motion.div variants={floatSlow} className="mb-6">
                    <Cake className="w-16 h-16 mx-auto text-blue-400" />
                  </motion.div>
                  <motion.h1 variants={fadeInUp} className={`text-4xl md:text-5xl font-semibold ${t.accent} mb-4`} style={{ fontFamily: 'Playfair Display, serif' }}>
                    {currentStepData.title}
                  </motion.h1>
                  <motion.p variants={fadeInUp} className={`text-lg ${t.textMuted} mb-5 max-w-lg mx-auto leading-relaxed`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {currentStepData.message}
                  </motion.p>
                  <motion.p variants={fadeInUp} className={`text-base ${t.accent}`} style={{ fontFamily: 'Dancing Script, cursive' }}>
                    {currentStepData.personalMessage}
                  </motion.p>
                </motion.div>

                {/* Button - smooth entrance */}
                <motion.button variants={fadeInUp} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className={`group px-8 py-3.5 bg-gradient-to-r ${t.gradient} text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-400 flex items-center gap-2 mx-auto`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <PartyPopper className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  {currentStepData.buttonText}
                  <Heart className="w-4 h-4 text-white/90" />
                </motion.button>
              </div>
            )}

            {/* Step 2: Birthday Wish */}
            {currentStepData.type === "birthday_wish" && (
              <div className="py-10 md:py-16 min-h-screen flex items-center justify-center">
                <motion.div variants={scaleIn} initial="hidden" animate="visible" className="w-full">
                  <div className={`${t.card} rounded-2xl shadow-xl overflow-hidden border ${t.cardBorder} backdrop-blur-md`}>
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${t.gradient} text-white py-8 text-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(10)].map((_, i) => (
                          <motion.div key={i} className="absolute rounded-full bg-white/50"
                            style={{ width: Math.random() * 20 + 8, height: Math.random() * 20 + 8, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                            animate={{ scale: [0, 1, 0], rotate: [0, 180] }}
                            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                          />
                        ))}
                      </div>
                      <motion.div variants={fadeInUp} className="relative z-10 px-4">
                        <motion.div animate={floatSlow} className="mb-4">
                          <Cake className="w-12 h-12 mx-auto text-white/90" />
                        </motion.div>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{currentStepData.title}</h2>
                        <p className="text-blue-100 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{currentStepData.message}</p>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                      {/* Typewriter text */}
                      <motion.p variants={fadeInUp} className={`text-center ${t.textMuted} leading-relaxed`} style={{ fontFamily: 'Inter, sans-serif' }}>
                        {typewriterText || currentStepData.personalMessage}
                      </motion.p>

                      {/* Image */}
                      <motion.div variants={fadeInUp} className="relative rounded-xl overflow-hidden shadow-lg border-2 border-white">
                        <img src={currentStepData.image} alt="Wish" className="w-full h-auto" />
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                          className={`absolute -top-2 -right-2 bg-gradient-to-r ${t.gradient} text-white px-3 py-1.5 rounded-full text-xs font-medium shadow cursor-pointer`}
                          onClick={revealSecretMessage}
                        >
                          💙 Tap
                        </motion.button>
                      </motion.div>

                      {/* Notes - staggered grid */}
                      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentStepData.loveNotes.map((note, i) => (
                          <motion.div key={i} variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
                            whileHover={{ y: -2 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-blue-50/50'} border ${t.cardBorder}`}
                          >
                            <p className={`text-sm ${t.textMuted} leading-relaxed flex items-start gap-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
                              <Star className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" /> {note}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Signature */}
                      <motion.div variants={fadeInUp} className={`text-center pt-4 border-t ${t.cardBorder}`}>
                        <p className={`text-sm ${t.textLight}`} style={{ fontFamily: 'Inter, sans-serif' }}>With warmth,</p>
                        <p className={`text-base font-medium ${t.accent} mt-1`} style={{ fontFamily: 'Dancing Script, cursive' }}>Someone who's glad you're here</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Actions */}
                  <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 justify-center mt-6">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={openCertificateModal}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r ${t.gradient} text-white font-medium shadow hover:shadow-md transition-all`}
                    >
                      <Gift size={16} /> See the note
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={shareMessage}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full ${isDarkMode ? 'bg-slate-700/70' : 'bg-white/80'} ${t.text} border ${t.cardBorder} font-medium hover:shadow transition-all backdrop-blur-sm`}
                    >
                      <Share2 size={16} /> Share
                    </motion.button>
                  </motion.div>

                  {/* Nav */}
                  <motion.div variants={fadeInUp} className="flex justify-center gap-4 mt-6">
                    <motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }}
                      onClick={prevStep} className={`flex items-center gap-1.5 px-4 py-2 rounded-full ${isDarkMode ? 'bg-slate-700/70' : 'bg-white/80'} ${t.textMuted} border ${t.cardBorder} text-sm backdrop-blur-sm`}
                    >
                      <ChevronLeft size={14} /> Back
                    </motion.button>
                    <motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }}
                      onClick={nextStep} className={`flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r ${t.gradient} text-white text-sm font-medium shadow`}
                    >
                      Next <ChevronRight size={14} />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* Step 3: Memories - Fixed Grid */}
            {currentStepData.type === "memories" && (
              <div className="py-10 md:py-16 min-h-screen flex flex-col justify-center">
                <motion.div variants={fadeInUp} className="text-center mb-8">
                  <h2 className={`text-3xl md:text-4xl font-semibold ${t.text} mb-2`} style={{ fontFamily: 'Playfair Display, serif' }}>{currentStepData.title}</h2>
                  <p className={`${t.textMuted}`} style={{ fontFamily: 'Inter, sans-serif' }}>{currentStepData.message}</p>
                </motion.div>

                {/* Carousel - Square images, proper aspect ratio */}
                <div className="relative mb-8">
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <motion.div className="flex" animate={{ x: `-${currentImageIndex * 100}%` }} transition={{ type: "spring", stiffness: 280, damping: 28 }}>
                      {currentStepData.images.map((image, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                          {/* Square image container - no cropping */}
                          <div className="relative aspect-square">
                            <img src={image.src} alt={image.caption} 
                              className={`w-full h-full object-cover transition-transform duration-500 ${loadedImages[image.src] ? 'opacity-100' : 'opacity-0'}`} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                              <p className="text-white text-sm font-medium">{image.description}</p>
                            </div>
                          </div>
                          <div className={`p-4 ${isDarkMode ? 'bg-slate-800/80' : 'bg-white/90'} backdrop-blur-sm`}>
                            <h3 className={`font-medium ${t.text} mb-0.5`} style={{ fontFamily: 'Playfair Display, serif' }}>{image.caption}</h3>
                            <p className={`text-xs ${t.textLight}`} style={{ fontFamily: 'Inter, sans-serif' }}>{image.date}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Controls */}
                  {[{ onClick: prevImage, icon: ChevronLeft, pos: 'left-3' }, { onClick: nextImage, icon: ChevronRight, pos: 'right-3' }].map((btn, i) => (
                    <motion.button key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                      onClick={btn.onClick}
                      className={`absolute ${btn.pos} top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors z-10`}
                    >
                      <btn.icon size={18} className="text-slate-700" />
                    </motion.button>
                  ))}

                  {/* Indicators */}
                  <div className="flex justify-center gap-2 mt-4">
                    {currentStepData.images.map((_, i) => (
                      <motion.button key={i} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-blue-400 scale-110' : 'bg-slate-300 hover:bg-slate-400'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Gallery Grid - Fixed: Square/Portrait, no landscape cutoff */}
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" 
                  className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 md:gap-3 mb-8"
                >
                  {[firstmeet, fs1, fs2, kaputra1, kaputra2, kaputra3, kaputra4, kaputra5].map((photo, i) => (
                    <motion.div key={i} variants={scaleIn} whileHover={{ scale: 1.04, y: -3 }}
                      className="relative aspect-square rounded-xl overflow-hidden shadow-md group cursor-pointer"
                    >
                      <img src={photo} alt={`Memory ${i+1}`} 
                        className={`w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 ${loadedImages[photo] ? 'opacity-100' : 'opacity-0'}`} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Nav */}
                <motion.div variants={fadeInUp} className="flex justify-center gap-4">
                  <motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }}
                    onClick={prevStep} className={`flex items-center gap-1.5 px-4 py-2 rounded-full ${isDarkMode ? 'bg-slate-700/70' : 'bg-white/80'} ${t.textMuted} border ${t.cardBorder} text-sm backdrop-blur-sm`}
                  >
                    <ChevronLeft size={14} /> Back
                  </motion.button>
                  <motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }}
                    onClick={nextStep} className={`flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r ${t.gradient} text-white text-sm font-medium shadow`}
                  >
                    Next <ChevronRight size={14} />
                  </motion.button>
                </motion.div>
              </div>
            )}

            {/* Step 4: Love Letter */}
            {currentStepData.type === "love_letter" && (
              <div className="py-10 md:py-16 min-h-screen flex flex-col justify-center">
                <motion.div variants={fadeInUp} className="text-center mb-8">
                  <h2 className={`text-3xl md:text-4xl font-semibold ${t.text} mb-2`} style={{ fontFamily: 'Playfair Display, serif' }}>{currentStepData.title}</h2>
                  <p className={`${t.textMuted}`} style={{ fontFamily: 'Inter, sans-serif' }}>{currentStepData.message}</p>
                </motion.div>

                {/* Letter Card */}
                <motion.div variants={scaleIn} initial="hidden" animate="visible"
                  className={`${t.card} rounded-2xl shadow-xl p-6 md:p-8 mb-8 max-w-2xl mx-auto border ${t.cardBorder} backdrop-blur-md`}
                >
                  <div className={`${isDarkMode ? 'bg-slate-700/40' : 'bg-blue-50/50'} rounded-xl p-5 mb-6 border ${t.cardBorder}`}>
                    {currentStepData.letter.map((line, i) => (
                      <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 + 0.3 }}
                        className={`${t.textMuted} ${line === '' ? 'my-4' : 'my-1'} ${line.startsWith('-') ? 'ml-4' : ''} ${line.startsWith('Hey') ? 'font-medium text-blue-400' : ''}`}
                        style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
                      >{line}</motion.p>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring" }}>
                      <motion.div animate={pulseSoft}>
                        <Heart className="w-10 h-10 mx-auto text-blue-400 mb-3" />
                      </motion.div>
                      <p className={`text-sm ${t.textLight} italic`} style={{ fontFamily: 'Dancing Script, cursive' }}>– always</p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Photo Collage - Square layout */}
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" 
                  className="grid grid-cols-3 gap-2.5 mb-8 max-w-md mx-auto"
                >
                  <div className="col-span-2 row-span-2">
                    <motion.img variants={scaleIn} whileHover={{ scale: 1.02 }}
                      src={kaputra6} alt="Moment" className="w-full h-full aspect-square object-cover rounded-xl shadow-md" 
                    />
                  </div>
                  <motion.img variants={scaleIn} whileHover={{ scale: 1.02 }}
                    src={kaputra7} alt="Moment" className="w-full h-full aspect-square object-cover rounded-xl shadow-md" 
                  />
                  <motion.img variants={scaleIn} whileHover={{ scale: 1.02 }}
                    src={kaputra8} alt="Moment" className="w-full h-full aspect-square object-cover rounded-xl shadow-md" 
                  />
                </motion.div>

                {/* Nav */}
                <motion.div variants={fadeInUp} className="flex justify-center gap-4">
                  <motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }}
                    onClick={prevStep} className={`flex items-center gap-1.5 px-4 py-2 rounded-full ${isDarkMode ? 'bg-slate-700/70' : 'bg-white/80'} ${t.textMuted} border ${t.cardBorder} text-sm backdrop-blur-sm`}
                  >
                    <ChevronLeft size={14} /> Back
                  </motion.button>
                  <motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }}
                    onClick={nextStep} className={`flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r ${t.gradient} text-white text-sm font-medium shadow`}
                  >
                    Next <ChevronRight size={14} />
                  </motion.button>
                </motion.div>
              </div>
            )}

            {/* Step 5: Future */}
            {currentStepData.type === "future" && (
              <div className="py-10 md:py-16 min-h-screen flex flex-col justify-center">
                <motion.div variants={fadeInUp} className="text-center mb-8">
                  <h2 className={`text-3xl md:text-4xl font-semibold ${t.text} mb-2`} style={{ fontFamily: 'Playfair Display, serif' }}>{currentStepData.title}</h2>
                  <p className={`${t.textMuted}`} style={{ fontFamily: 'Inter, sans-serif' }}>{currentStepData.message}</p>
                </motion.div>

                {/* Dreams - Clean cards */}
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                >
                  {currentStepData.dreams.map((dream, i) => (
                    <motion.div key={i} variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
                      whileHover={{ y: -3 }} className={`${t.card} rounded-xl p-5 shadow-md border ${t.cardBorder} backdrop-blur-sm`}
                    >
                      <motion.div className="text-3xl mb-3 text-center" whileHover={{ scale: 1.15, rotate: 3 }}>{dream.icon}</motion.div>
                      <h3 className={`font-medium ${t.text} text-center mb-1`} style={{ fontFamily: 'Playfair Display, serif' }}>{dream.title}</h3>
                      <p className={`text-sm ${t.textMuted} text-center leading-relaxed`} style={{ fontFamily: 'Inter, sans-serif' }}>{dream.description}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Mini Gallery - Square */}
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" 
                  className="grid grid-cols-4 gap-2.5 mb-8 max-w-xs mx-auto"
                >
                  {[kaputra1, kaputra2, kaputra3, kaputra4].map((photo, i) => (
                    <motion.div key={i} variants={scaleIn} whileHover={{ scale: 1.08, y: -2 }}
                      className="relative aspect-square rounded-full overflow-hidden shadow-md group"
                    >
                      <img src={photo} alt={`Hope ${i+1}`} 
                        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${loadedImages[photo] ? 'opacity-100' : 'opacity-0'}`} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Final Message */}
                <motion.div variants={fadeInUp} initial="hidden" animate="visible"
                  className={`${isDarkMode ? 'bg-slate-800/60' : 'bg-blue-50/60'} backdrop-blur-sm rounded-xl p-6 text-center mb-8 border ${t.cardBorder}`}
                >
                  <h3 className={`text-xl font-semibold ${t.text} mb-3`} style={{ fontFamily: 'Playfair Display, serif' }}>Here's to what's ahead.</h3>
                  <p className={`text-sm ${t.textMuted} mb-4 leading-relaxed`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    However this year unfolds, I hope it brings you moments that feel like this: real, warm, and yours.
                  </p>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                    onClick={() => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }}
                    className={`px-6 py-2.5 bg-gradient-to-r ${t.gradient} text-white rounded-full font-medium shadow hover:shadow-md transition-all flex items-center gap-2 mx-auto`}
                  >
                    <PartyPopper className="w-4 h-4" /> Celebrate
                  </motion.button>
                </motion.div>

                {/* Nav */}
                <motion.div variants={fadeInUp} className="flex justify-center">
                  <motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }}
                    onClick={prevStep} className={`flex items-center gap-1.5 px-4 py-2 rounded-full ${isDarkMode ? 'bg-slate-700/70' : 'bg-white/80'} ${t.textMuted} border ${t.cardBorder} text-sm backdrop-blur-sm`}
                  >
                    <ChevronLeft size={14} /> Back
                  </motion.button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        {currentStep > 0 && currentStep < steps.length && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center gap-2.5 mt-6">
            {steps.map((_, i) => (
              <motion.button key={i} whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentStep(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentStep ? 'bg-blue-400 scale-110 shadow shadow-blue-400/40' : isDarkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Bottom floating layer - subtle */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute"
            initial={{ x: Math.random() * windowSize.width, y: windowSize.height + 80, rotate: Math.random() * 360 }}
            animate={{
              y: -80,
              x: Math.random() * 150 - 75,
              rotate: Math.random() * 540,
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 14 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          >
            <div className={`w-2 h-2 rounded-full ${t.floating}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LuxuryBirthdayPage;