// src/pages/LandingPage.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Confetti from "react-confetti";
import { 
  Heart, Download, Share2, Star, Sparkles, Music, Play, Pause, Volume2, VolumeX,
  Gift, X, CheckCircle, ZoomIn, ZoomOut, Sun, Moon, ChevronLeft, ChevronRight,
  Cake, PartyPopper, Mail, Send, Camera, Calendar, MapPin, Gamepad2, BookOpen,
  Home, User, Image as ImageIcon, MessageSquare, Gem, Rocket, ArrowRight,
  Clock, Sparkle, Flame, Cloud, Menu
} from "lucide-react";

// Image imports - replace with your actual paths
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

// ─────────────────────────────────────────────────────────────
// 🎨 THEME CONFIGURATION
// ─────────────────────────────────────────────────────────────
const loadGoogleFonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@500;600&family=Space+Grotesk:wght@300;400;500&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

// ─────────────────────────────────────────────────────────────
// 🎵 AUDIO UTILS
// ─────────────────────────────────────────────────────────────
const useAudio = (src) => {
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        return true;
      } else {
        audioRef.current.pause();
        return false;
      }
    } catch (e) {
      console.log('Audio play blocked:', e);
      return false;
    }
  };

  const setVolume = (vol) => {
    if (audioRef.current) audioRef.current.volume = vol;
  };

  return { audioRef, togglePlay, setVolume };
};

// ─────────────────────────────────────────────────────────────
// 🎮 MINI GAME: FIND THE HEART - FIXED
// ─────────────────────────────────────────────────────────────
const FindTheHeartGame = ({ onComplete, isDarkMode }) => {
  const [heartPosition, setHeartPosition] = useState({ x: 50, y: 50 });
  const [found, setFound] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const generateNewPosition = useCallback(() => {
    setHeartPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15
    });
  }, []);

  useEffect(() => {
    generateNewPosition();
  }, [generateNewPosition]);

  const handleClick = () => {
    if (found) return;
    setAttempts(p => p + 1);
    
    if (Math.random() > 0.7 || attempts > 5) {
      setFound(true);
      setTimeout(onComplete, 1500);
    } else {
      generateNewPosition();
    }
  };

  return (
    <div 
      className={`relative w-full h-64 md:h-80 rounded-2xl overflow-hidden cursor-crosshair ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-blue-50/50'
      } border ${isDarkMode ? 'border-slate-700' : 'border-blue-100'}`}
      onClick={handleClick}
    >
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400/30"
          initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%', scale: 0 }}
          animate={{ scale: [0, 1, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}
      
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className={`absolute w-8 h-8 rounded-full flex items-center justify-center ${
          found ? 'bg-gradient-to-r from-pink-400 to-rose-400' : 'bg-gradient-to-r from-blue-400 to-cyan-400'
        } shadow-lg`}
        style={{ left: `${heartPosition.x}%`, top: `${heartPosition.y}%`, transform: 'translate(-50%, -50%)' }}
        animate={found ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <Heart className={`w-4 h-4 ${found ? 'text-white' : 'text-white'}`} fill="currentColor" />
      </motion.button>
      
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {found ? '✨ You found it! ✨' : `Tap anywhere to find the hidden heart... (${attempts} tries)`}
        </p>
      </div>
      
      {found && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/90 dark:bg-slate-800/90 rounded-2xl p-6 text-center max-w-xs mx-4">
            <PartyPopper className="w-10 h-10 mx-auto text-rose-400 mb-3" />
            <p className="font-medium text-slate-800 dark:text-slate-100 mb-1">You found the heart! 💙</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Just like you found me.</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 🎮 MINI GAME: COUPLE QUIZ
// ─────────────────────────────────────────────────────────────
const CoupleQuiz = ({ onComplete, isDarkMode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const questions = [
    { question: "What's Ka Putra's favorite way to spend a Sunday?", options: ["Gaming all day", "Coffee & chill", "Adventure outdoors", "Sleeping in"], correct: 1 },
    { question: "What makes Ka Putra smile the most?", options: ["Dad jokes", "Unexpected compliments", "Good food", "Quiet moments together"], correct: 3 },
    { question: "What's our favorite memory so far?", options: ["First coffee date", "That spontaneous trip", "Late night talks", "Just being us"], correct: 3 }
  ];

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].correct) setScore(p => p + 1);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(p => p + 1);
    } else {
      setShowResult(true);
      setTimeout(onComplete, 2500);
    }
  };

  if (showResult) {
    return (
      <div className={`w-full h-64 md:h-80 rounded-2xl flex flex-col items-center justify-center p-6 ${isDarkMode ? 'bg-slate-800/50' : 'bg-blue-50/50'} border ${isDarkMode ? 'border-slate-700' : 'border-blue-100'}`}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <Sparkles className={`w-12 h-12 mx-auto mb-3 ${score >= 2 ? 'text-amber-400' : 'text-blue-400'}`} />
          <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-800'} mb-1`}>{score >= 2 ? "You know us so well! 💙" : "Aww, let's make more memories! 💫"}</p>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Score: {score}/{questions.length}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`w-full h-64 md:h-80 rounded-2xl p-5 flex flex-col ${isDarkMode ? 'bg-slate-800/50' : 'bg-blue-50/50'} border ${isDarkMode ? 'border-slate-700' : 'border-blue-100'}`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Question {currentQuestion + 1}/{questions.length}</span>
        <div className="flex gap-1">{questions.map((_, i) => (<div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentQuestion ? 'bg-blue-400' : i < currentQuestion ? 'bg-emerald-400' : isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />))}</div>
      </div>
      <p className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{questions[currentQuestion].question}</p>
      <div className="space-y-2 flex-1">
        {questions[currentQuestion].options.map((option, index) => (
          <motion.button key={index} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(index)} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${isDarkMode ? 'bg-slate-700/50 hover:bg-slate-700 text-slate-200' : 'bg-white/70 hover:bg-white text-slate-700 border border-blue-100'}`}>{option}</motion.button>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// ✨ FLOATING PARTICLES COMPONENT
// ─────────────────────────────────────────────────────────────
const FloatingParticles = ({ isDarkMode, count = 25 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i, size: Math.random() * 4 + 2, left: Math.random() * 100,
    delay: Math.random() * 10, duration: Math.random() * 20 + 15, opacity: Math.random() * 0.5 + 0.1
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <motion.div key={p.id} className="absolute rounded-full" style={{
          width: p.size, height: p.size, left: `${p.left}%`, bottom: -10,
          background: isDarkMode ? `radial-gradient(circle, rgba(96,165,250,${p.opacity}), transparent)` : `radial-gradient(circle, rgba(59,130,246,${p.opacity}), transparent)`,
          boxShadow: isDarkMode ? '0 0 8px rgba(96,165,250,0.4)' : '0 0 6px rgba(59,130,246,0.3)'
        }} animate={{ y: [0, -100, -200, -100, 0], x: [0, Math.sin(p.id) * 15, 0, Math.sin(p.id + 1) * 15, 0], opacity: [p.opacity, p.opacity + 0.2, p.opacity, p.opacity + 0.15, p.opacity] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }} />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 🖼️ POLAROID PHOTO CARD COMPONENT
// ─────────────────────────────────────────────────────────────
const PolaroidCard = ({ src, caption, date, mood, isDarkMode, onClick }) => (
  <motion.div whileHover={{ y: -8, rotate: Math.random() > 0.5 ? 2 : -2 }} whileTap={{ scale: 0.98 }} onClick={onClick} className="group relative cursor-pointer">
    <div className={`relative bg-white rounded-sm shadow-xl overflow-hidden ${isDarkMode ? 'shadow-blue-900/30' : 'shadow-blue-200/50'}`}>
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <img src={src} alt={caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white text-xs font-medium mb-1">{mood}</p>
        </div>
      </div>
      <div className="p-3 pt-4 bg-white border-t-4 border-blue-100">
        <p className="text-slate-700 text-xs font-medium text-center leading-tight mb-1">{caption}</p>
        <p className="text-slate-400 text-[10px] text-center font-mono">{date}</p>
      </div>
      <div className="absolute top-2 right-2 w-4 h-4 bg-white/80 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <Heart className="w-3 h-3 text-rose-400 mx-auto mt-0.5" fill="currentColor" />
      </div>
    </div>
    <div className={`absolute -inset-1 rounded-sm blur-sm opacity-30 group-hover:opacity-50 transition-opacity ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-300/30'}`} />
  </motion.div>
);

// ─────────────────────────────────────────────────────────────
// 📱 MOBILE BOTTOM NAV - RESPONSIVE VERSION
// ─────────────────────────────────────────────────────────────
const MobileNav = ({ currentSection, setCurrentSection, navItems, t, isDarkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleItems = navItems.slice(0, 5);
  
  return (
    <>
      {/* Main Mobile Nav Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-3 pb-2 pt-1"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className={`${t.navbar} rounded-2xl px-2 py-2 shadow-2xl border ${t.cardBorder} backdrop-blur-md mx-auto max-w-md`}>
          <div className="flex items-center justify-around">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setCurrentSection(item.id)}
                  className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-[52px] ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md' 
                      : `${t.textMuted} hover:${t.text}`
                  }`}
                >
                  <Icon size={17} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[9px] font-medium leading-none">{item.label}</span>
                </motion.button>
              );
            })}
            
            {/* Expand Button for More Sections */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-[52px] ${
                isExpanded 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md' 
                  : `${t.textMuted} hover:${t.text}`
              }`}
            >
              <Menu size={17} strokeWidth={isExpanded ? 2.5 : 2} />
              <span className="text-[9px] font-medium leading-none">More</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Expanded Menu Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden bg-black/40 backdrop-blur-sm"
              onClick={() => setIsExpanded(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`fixed bottom-20 left-4 right-4 z-50 md:hidden ${t.card} rounded-2xl shadow-2xl border ${t.cardBorder} backdrop-blur-md p-3`}
            >
              <div className="flex flex-wrap gap-2 justify-center">
                {navItems.slice(5).map((item) => {
                  const Icon = item.icon;
                  const isActive = currentSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setCurrentSection(item.id); setIsExpanded(false); }}
                      className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md' 
                          : `${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'} ${t.text}`
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-[10px] font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
              <p className={`text-center text-[10px] ${t.textLight} mt-3`}>Tap any section to jump there ✨</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// 💻 DESKTOP SIDEBAR NAV
// ─────────────────────────────────────────────────────────────
const DesktopNav = ({ currentSection, setCurrentSection, navItems, t, isDarkMode }) => (
  <motion.div 
    className="hidden md:flex fixed left-4 xl:left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2"
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 1 }}
  >
    {navItems.map((item) => {
      const Icon = item.icon;
      const isActive = currentSection === item.id;
      return (
        <motion.button
          key={item.id}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentSection(item.id)}
          className={`p-2.5 xl:p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all ${
            isActive 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg' 
              : `${t.glass} ${t.textMuted} hover:${t.text} border ${t.cardBorder}`
          } backdrop-blur-sm`}
          title={item.label}
        >
          <Icon size={18} />
          <span className="text-[9px] xl:text-[10px] font-medium whitespace-nowrap">{item.label}</span>
        </motion.button>
      );
    })}
  </motion.div>
);

// ─────────────────────────────────────────────────────────────
// 🌟 MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
const LuxuryBirthdayPage = () => {
  // ─────────────────────────────────────────────────────────
  // STATE MANAGEMENT
  // ─────────────────────────────────────────────────────────
  const [currentSection, setCurrentSection] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [imageZoom, setImageZoom] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPersonalizedConfetti, setShowPersonalizedConfetti] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [secretMessage, setSecretMessage] = useState('');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [loadedImages, setLoadedImages] = useState({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showWishLantern, setShowWishLantern] = useState(false);
  const [loveCounter, setLoveCounter] = useState(0);
  const [showFakeChat, setShowFakeChat] = useState(false);
  
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const cheerSoundRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // ─────────────────────────────────────────────────────────
  // EFFECTS & INITIALIZATION
  // ─────────────────────────────────────────────────────────
  useEffect(() => { 
    loadGoogleFonts(); 
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    // Add viewport meta handling for mobile
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  }, []);
  
  useEffect(() => {
    const images = [pasfoto, piagam, firstmeet, fs1, fs2, kaputra1, kaputra2, kaputra3, kaputra4, kaputra5, kaputra6, kaputra7, kaputra8, kaputra9];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoadedImages(prev => ({ ...prev, [src]: true }));
    });
  }, []);
  
  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (audioRef.current && !isPlaying && !isMuted) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) { console.log('Autoplay blocked:', e); }
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying, isMuted]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);
  
  useEffect(() => {
    if (currentSection === 3) {
      const text = `heyooow sayaang,

Today's your day yaaa kaa. So I'll keep this simple mwehehehe.

I notice things about you, alweeyyyss yaa.
Like how you listen – really listen.
Or how you find humor in the small stuff.

You don't always see what I see.
But I see it.

Your kindness isn't performative.
Your strength isn't loud.
Your presence just... fits.

I'm not great with big speeches.
So here's the short version:

I'm glad you exist.
I'm glad I know you.
I'm glad today is yours.

Happy Birthday yaa kaa.
However you spend it,
I hope it feels good.

– Imelda 💙`;
      
      let index = 0;
      setTypewriterText('');
      const interval = setInterval(() => {
        if (index < text.length) {
          setTypewriterText(prev => prev + text[index]);
          index++;
        } else { 
          clearInterval(interval); 
          setTimeout(() => {
            setSecretMessage("You make ordinary days feel extraordinary. Happy 29th, my love. 💙");
            setShowSecretMessage(true);
            setTimeout(() => setShowSecretMessage(false), 6000);
          }, 1000);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [currentSection]);
  
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const birthday = new Date(now.getFullYear(), 4, 21);
      if (now > birthday) birthday.setFullYear(birthday.getFullYear() + 1);
      const diff = birthday.getTime() - now.getTime();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      };
    };
    setCountdown(calculateCountdown());
    const timer = setInterval(() => setCountdown(calculateCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLoveCounter(prev => prev >= 999 ? 999 : prev + Math.floor(Math.random() * 3) + 1);
    }, 200);
    return () => clearInterval(interval);
  }, []);
  
  // ─────────────────────────────────────────────────────────
  // HANDLERS & UTILITIES
  // ─────────────────────────────────────────────────────────
  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        if (isMuted) { setIsMuted(false); audioRef.current.muted = false; }
      } catch (e) { console.log('Play failed:', e); }
    }
  };
  const toggleMute = () => { if (audioRef.current) { audioRef.current.muted = !isMuted; setIsMuted(!isMuted); } };
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const nextSection = () => { if (currentSection === 6) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); } setCurrentSection(p => Math.min(p + 1, 6)); };
  const prevSection = () => setCurrentSection(p => Math.max(0, p - 1));
  const openCertificateModal = () => { setShowCertificateModal(true); if (cheerSoundRef.current) cheerSoundRef.current.play().catch(() => {}); setShowPersonalizedConfetti(true); setTimeout(() => setShowPersonalizedConfetti(false), 5000); };
  const downloadCertificate = () => { const link = document.createElement('a'); link.href = piagam; link.download = 'Birthday-Wish-Ka-Putra.jpg'; link.click(); setShowCertificateModal(false); setShowDownloadSuccess(true); setTimeout(() => setShowDownloadSuccess(false), 3000); };
  const shareMessage = () => { const text = "🎂 A little birthday surprise for Ka Putra. Check it out!"; window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank'); };
  const revealSecretMessage = () => { setSecretMessage("Just wanted you to know – you make ordinary days feel special. Happy Birthday, Ka Putra. 💙"); setShowSecretMessage(true); setTimeout(() => setShowSecretMessage(false), 5000); };
  const makeAWish = () => { setShowWishLantern(true); setShowConfetti(true); setTimeout(() => { setShowConfetti(false); setShowWishLantern(false); }, 6000); };
  const toggleFakeChat = () => setShowFakeChat(!showFakeChat);
  
  // ─────────────────────────────────────────────────────────
  // THEME CONFIGURATION
  // ─────────────────────────────────────────────────────────
  const theme = {
    light: {
      bg: 'bg-gradient-to-br from-slate-50 via-blue-50/40 to-sky-50',
      card: 'bg-white/85', cardBorder: 'border-blue-100/70',
      text: 'text-slate-800', textMuted: 'text-slate-600', textLight: 'text-slate-500',
      accent: 'text-blue-600', gradient: 'from-blue-500 via-sky-400 to-cyan-400',
      gradientHover: 'hover:from-sky-500 hover:to-blue-500',
      floating: 'bg-blue-200/40', sparkles: 'text-sky-300/60',
      navbar: 'bg-white/80 backdrop-blur-md border border-blue-100/50 shadow-lg',
      glass: 'bg-white/70 backdrop-blur-md border border-blue-100/50'
    },
    dark: {
      bg: 'bg-gradient-to-br from-slate-950 via-blue-950/60 to-slate-900',
      card: 'bg-slate-900/85', cardBorder: 'border-blue-900/60',
      text: 'text-slate-100', textMuted: 'text-slate-400', textLight: 'text-slate-500',
      accent: 'text-sky-300', gradient: 'from-blue-600 via-sky-500 to-cyan-500',
      gradientHover: 'hover:from-sky-600 hover:to-blue-600',
      floating: 'bg-blue-500/25', sparkles: 'text-sky-400/40',
      navbar: 'bg-slate-900/80 backdrop-blur-md border border-blue-900/40 shadow-lg',
      glass: 'bg-slate-900/70 backdrop-blur-md border border-blue-900/40'
    }
  };
  const t = isDarkMode ? theme.dark : theme.light;
  
  // ─────────────────────────────────────────────────────────
  // ANIMATION VARIANTS
  // ─────────────────────────────────────────────────────────
  const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
  const fadeInLeft = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const fadeInRight = { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: "spring", damping: 18 } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
  const floatSlow = { y: [0, -10, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } };
  const pulseSoft = { scale: [1, 1.04, 1], transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" } };
  const glowPulse = { boxShadow: ["0 0 0px rgba(96,165,250,0)", "0 0 20px rgba(96,165,250,0.4)", "0 0 0px rgba(96,165,250,0)"], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } };
  
  const navItems = [
    { id: 0, label: 'Home', icon: Home }, { id: 1, label: 'About', icon: User },
    { id: 2, label: 'Memories', icon: ImageIcon }, { id: 3, label: 'Letters', icon: MessageSquare },
    { id: 4, label: 'Games', icon: Gamepad2 }, { id: 5, label: 'Surprise', icon: Gift },
    { id: 6, label: 'Wish', icon: Rocket }
  ];
  
  const aboutHimContent = {
    funnyFacts: ["He acts cool but gets excited over the smallest things ✨", "His laugh is genuinely contagious (I have proof) 😄", "he is very naughty when he is alone💭", "He's secretly a softie but tries to play it cool 🥺"],
    personality: [{ trait: "Listener", desc: "The kind who actually hears you" }, { trait: "Steady", desc: "My calm in the chaos" }, { trait: "Playful", desc: "Makes even boring moments fun" }, { trait: "Kind", desc: "Without expecting anything back" }],
    favorites: { food: "any food that is important is what I make it for", activity: "There are a lot of activities but Ka Putra as a coach looks cool", comfort: "It seems like it's perfect for you and me :)", loveLanguage: "all your love languages ​​son wholesale " },
    reasonsILoveHim: ["ka putra show up, even when it's hard.", "ka putra make ordinary moments feel special.", "ka putra see me – really see me.", "ka putra my safest place to land.", "ka putra make life feel less heavy, just by being you.", "banyak banget aku spill juga di hadia berikutnya ya"]
  };
  
  const memoriesContent = [
    { src: firstmeet, caption: "When we first met", description: "Didn't know then what I know now.", date: "Sabtu, 23 january  2026", mood: "Nervous but hopeful" },
    { src: fs1, caption: "story of indomarett", description: "The simple talks that meant everything.", date: "Selasa, 31 march 2026", mood: "Getting to know you" },
    { src: fs2, caption: "lunch when we meet kebun raya bogor", description: "No agenda. Just us.", date: "Minggu, 15 februari 2026", mood: "Comfortable silence" },
    { src: kaputra1, caption: "special pap", description: "just a message from u", date: "Now", mood: "Spontaneous joy" },
    { src: kaputra2, caption: "quiet screen shoot", description: "my favorite image", date: "Now", mood: "Peaceful togetherness" },
    { src: kaputra3, caption: "You, being you", description: "That's the best part.", date: "Now", mood: "Pure authenticity" },
    { src: kaputra4, caption: "last", description: "And here we are.", date: "🎂", mood: "Celebrating you" }
  ];
  
  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-700 ${t.bg} pb-20 md:pb-0`} style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Audio Elements */}
      <audio ref={audioRef} src={backgroundMusic} loop playsInline />
      <audio ref={cheerSoundRef} src="https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3" />
      
      {/* Floating Particles Background */}
      <FloatingParticles isDarkMode={isDarkMode} count={30} />
      
      {/* Glowing Orbs Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div key={`glow-${i}`} className="absolute rounded-full blur-3xl" style={{ width: Math.random() * 400 + 200, height: Math.random() * 400 + 200, left: `${i * 20 + Math.random() * 15}%`, top: `${Math.random() * 70 + 10}%`, background: `radial-gradient(circle, ${isDarkMode ? 'rgba(59,130,246,0.12)' : 'rgba(96,165,250,0.08)'}, transparent 75%)` }} animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }} />
        ))}
        <motion.div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: `linear-gradient(to top, ${isDarkMode ? 'rgba(30,58,138,0.25)' : 'rgba(147,197,253,0.15)'}, transparent)` }} animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      </div>
      
      {/* 🎵 Minimal Floating Music Player - Mobile Optimized */}
      <motion.div className="fixed top-3 right-3 md:top-4 md:right-4 z-50 flex flex-col gap-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
        <motion.div className={`${t.glass} rounded-xl md:rounded-2xl p-2 md:p-3 shadow-lg border ${t.cardBorder} backdrop-blur-md`} whileHover={{ scale: 1.02 }}>
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <motion.div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center ${isPlaying ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`} animate={isPlaying ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 1.5, repeat: Infinity }}>
              <Music className={`w-4 h-4 md:w-5 md:h-5 ${isPlaying ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className={`text-[10px] md:text-xs font-medium truncate ${t.text}`}>Ah - Nadin Amizah</p>
              <p className={`text-[8px] md:text-[10px] ${t.textMuted}`}>Background vibes</p>
            </div>
          </div>
          <div className={`h-1 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'} mb-1 md:mb-2 overflow-hidden`}>
            <motion.div className={`h-full rounded-full bg-gradient-to-r ${t.gradient}`} animate={{ width: ["0%", "100%"] }} transition={{ duration: 180, repeat: Infinity, ease: "linear" }} />
          </div>
          <div className="flex items-center justify-between">
            <motion.button whileTap={{ scale: 0.95 }} onClick={toggleMute} className={`p-1 md:p-1.5 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`} title={isMuted ? "Unmute" : "Mute"}>{isMuted ? <VolumeX size={12} className={isDarkMode ? 'text-slate-400' : 'text-slate-600'} /> : <Volume2 size={12} className={isDarkMode ? 'text-slate-300' : 'text-slate-700'} />}</motion.button>
            <motion.button whileTap={{ scale: 0.92 }} onClick={toggleMusic} className={`p-2 md:p-2.5 rounded-lg md:rounded-xl bg-gradient-to-r ${t.gradient} text-white shadow-md`} title={isPlaying ? "Pause" : "Play"}>{isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}</motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={toggleTheme} className={`p-1 md:p-1.5 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`} title="Toggle theme">{isDarkMode ? <Sun size={12} className="text-amber-300" /> : <Moon size={12} className="text-slate-700" />}</motion.button>
          </div>
        </motion.div>
        <motion.div className={`${t.glass} rounded-xl md:rounded-2xl p-1.5 md:p-2.5 shadow-lg border ${t.cardBorder} backdrop-blur-md`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <div className="flex gap-1 md:gap-1.5">
            {[{ icon: Share2, onClick: shareMessage }, { icon: Download, onClick: openCertificateModal }, { icon: MessageSquare, onClick: toggleFakeChat }].map((btn, i) => (
              <motion.button key={i} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} onClick={btn.onClick} className={`p-1.5 md:p-2 rounded-lg md:rounded-xl ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} transition-colors`}><btn.icon size={13} className={isDarkMode ? 'text-slate-300' : 'text-slate-700'} /></motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      {/* 🎊 Confetti Effects */}
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={500} colors={['#60a5fa', '#38bdf8', '#0ea5e9', '#0284c7', '#f0f9ff', '#f472b6', '#a78bfa']} gravity={0.07} wind={0.03} recycle={false} style={{ zIndex: 45 }} />}
      
      {/* ✨ Subtle Personalized Confetti */}
      {showPersonalizedConfetti && (<div className="fixed inset-0 pointer-events-none z-40">{[...Array(50)].map((_, i) => (<motion.div key={i} className="absolute text-lg" initial={{ x: Math.random() * windowSize.width, y: -30, opacity: 0, scale: 0.6, rotate: Math.random() * 360 }} animate={{ y: windowSize.height + 30, x: Math.random() * 200 - 100, opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.8], rotate: Math.random() * 720 }} transition={{ duration: 4 + Math.random() * 2, ease: "easeOut", delay: Math.random() * 1 }}>{['💙', '✨', '·', '✦', '🎂', '🎉'][i % 6]}</motion.div>))}</div>)}
      
      {/* 💬 Secret Message Toast */}
      <AnimatePresence>{showSecretMessage && (<motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ type: "spring", damping: 24 }} className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-r ${t.gradient} text-white px-6 md:px-7 py-4 rounded-2xl shadow-2xl max-w-sm text-center border border-white/20 mx-4`}><Cake className="w-10 h-10 mx-auto mb-3" /><p className="text-sm leading-relaxed font-medium">{secretMessage}</p></motion.div>)}</AnimatePresence>
      
      {/* ✅ Success Toast */}
      <AnimatePresence>{showDownloadSuccess && (<motion.div initial={{ opacity: 0, y: -40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -40 }} className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r ${t.gradient} text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 border border-white/20`}><CheckCircle size={18} /> <span className="text-sm font-medium">Saved! 💙</span></motion.div>)}</AnimatePresence>
      
      {/* 🎁 Certificate Modal */}
      <AnimatePresence>{showCertificateModal && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowCertificateModal(false)}><motion.div initial={{ scale: 0.96, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.96, y: 20, opacity: 0 }} transition={{ type: "spring", damping: 26, stiffness: 180 }} className={`${t.card} rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto border ${t.cardBorder} backdrop-blur-md`} onClick={e => e.stopPropagation()}><div className={`sticky top-0 ${t.card} z-10 px-6 py-4 border-b ${t.cardBorder} flex justify-between items-center backdrop-blur-md`}><h3 className={`font-semibold ${t.text} flex items-center gap-2`}><Gift className="w-5 h-5 text-blue-400" /> A little something for Ka Putra</h3><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCertificateModal(false)} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-blue-50'} transition-colors`}><X size={18} className={isDarkMode ? "text-slate-400" : "text-slate-600"} /></motion.button></div><div className="p-6 space-y-6"><div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white/30" style={{ transform: `scale(${imageZoom})`, transformOrigin: 'center', transition: 'transform 0.3s ease' }}><img src={piagam} alt="Birthday wish for Ka Putra" className={`w-full h-auto transition-opacity duration-500 ${loadedImages[piagam] ? 'opacity-100' : 'opacity-0'}`} /><div className="absolute bottom-3 right-3 flex gap-1.5"><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setImageZoom(p => Math.max(1, p - 0.2))} className="p-1.5 bg-black/40 hover:bg-black/60 rounded-lg text-white backdrop-blur-sm"><ZoomOut size={14} /></motion.button><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setImageZoom(p => Math.min(2.5, p + 0.2))} className="p-1.5 bg-black/40 hover:bg-black/60 rounded-lg text-white backdrop-blur-sm"><ZoomIn size={14} /></motion.button></div></div><div className={`${isDarkMode ? 'bg-slate-800/60' : 'bg-blue-50/70'} rounded-xl p-4 space-y-2 border ${t.cardBorder}`}><p className={t.textMuted}><span className="font-medium text-blue-400">From:</span> Imelda 💙</p><p className={t.textMuted}><span className="font-medium text-blue-400">To:</span> Fadli Abdurohman Reda Putra</p><p className={t.textMuted}><span className="font-medium text-blue-400">Date:</span> May 21, 2024</p></div><div className="flex flex-wrap gap-3 justify-center pt-2"><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={downloadCertificate} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-medium shadow-md transition-all bg-gradient-to-r ${t.gradient} ${t.gradientHover}`}><Download size={16} /> Save This Moment</motion.button><div className="flex gap-2">{[{ onClick: shareMessage, bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', icon: Share2 }, { onClick: () => window.location.href = `mailto:?subject=🎉 Happy Birthday Ka Putra!&body=Just wanted to share something sweet with you.`, bg: 'bg-blue-500', hover: 'hover:bg-blue-600', icon: Mail }].map((btn, i) => (<motion.button key={i} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={btn.onClick} className={`p-2.5 ${btn.bg} ${btn.hover} text-white rounded-full shadow transition-all`}><btn.icon size={16} /></motion.button>))}</div></div></div></motion.div></motion.div>)}</AnimatePresence>
      
      {/* 💬 Fake Chat Modal */}
      <AnimatePresence>{showFakeChat && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowFakeChat(false)}><motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} className={`${t.card} rounded-3xl shadow-2xl max-w-md w-full border ${t.cardBorder} backdrop-blur-md overflow-hidden`} onClick={e => e.stopPropagation()}><div className={`px-5 py-4 border-b ${t.cardBorder} flex items-center gap-3`}><div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-white font-medium">I</div><div><p className={`font-medium ${t.text}`}>imelll Uhibbuk 👩‍🎓🧑‍💻👰‍♀️👸❤️‍🩹</p><p className={`text-xs ${t.textMuted}`}>Typing...</p></div></div><div className="p-5 space-y-4 max-h-80 overflow-y-auto">{[{ from: 'me', text: "Hey Ka Putra... happy birthday sayangnya akuu 🎂" }, { from: 'me', text: "I made something special for you today" }, { from: 'me', text: "Just wanted you to know how much you mean to me 💙" }, { from: 'me', text: "You're my favorite person. Always have been, always will be." }, { from: 'me', text: "love u sooooo muchhh kaaa." }].map((msg, i) => (<motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3 }} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${msg.from === 'me' ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-br-none' : `${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} ${t.text} rounded-bl-none`}`}><p className="text-sm">{msg.text}</p></div></motion.div>))}</div><div className={`px-5 py-3 border-t ${t.cardBorder} flex justify-end`}><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowFakeChat(false)} className={`px-4 py-1.5 rounded-full text-sm font-medium ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'} ${t.text} transition-colors`}>Close</motion.button></div></motion.div></motion.div>)}</AnimatePresence>
      
      {/* 🌟 MAIN CONTENT AREA - With mobile padding */}
      <div className="container mx-auto px-4 py-6 relative z-10 pb-24 md:pb-6">
        <AnimatePresence mode="wait">
          <motion.div key={currentSection} variants={fadeInUp} initial="hidden" animate="visible" exit={{ opacity: 0, y: -30 }} className="max-w-4xl mx-auto">
            
            {/* SECTION 0: HOME */}
            {currentSection === 0 && (<div className="text-center py-12 md:py-20 min-h-screen flex flex-col justify-center"><div className="absolute inset-0 overflow-hidden pointer-events-none">{[...Array(15)].map((_, i) => (<motion.div key={i} className="absolute rounded-full bg-blue-400/20" style={{ width: Math.random() * 3 + 1, height: Math.random() * 3 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }} />))}</div><motion.div variants={fadeInUp} className="mb-6 flex items-center justify-center gap-3"><div className={`flex items-center gap-2 px-4 py-2 rounded-full ${t.glass} border ${t.cardBorder}`}><Clock size={14} className={t.accent} /><span className={`text-sm font-medium ${t.text}`}>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span></div><div className={`flex items-center gap-2 px-4 py-2 rounded-full ${t.glass} border ${t.cardBorder}`}><Calendar size={14} className={t.accent} /><span className={`text-sm font-medium ${t.text}`}>May 21 • Ka Putra's Day</span></div></motion.div><motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-10 px-4"><motion.div variants={floatSlow} className="mb-6 flex justify-center"><div className="relative"><Cake className="w-20 h-20 text-blue-400" /><motion.div className="absolute -inset-2 bg-blue-400/20 rounded-full blur-xl" animate={glowPulse} /></div></motion.div><motion.h1 variants={fadeInUp} className={`text-4xl md:text-6xl font-bold ${t.text} mb-4`} style={{ fontFamily: 'Playfair Display, serif' }}>Happy 29th Birthday,<span className={`block bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent mt-1`}>Fadli.</span></motion.h1><motion.p variants={fadeInUp} className={`text-lg md:text-xl ${t.textMuted} mb-6 max-w-2xl mx-auto leading-relaxed`} style={{ fontFamily: 'Inter, sans-serif' }}>another year of you being my favorite person ever.</motion.p><motion.div variants={fadeInUp} className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl ${t.glass} border ${t.cardBorder} mb-8`}>{[{ label: 'Days', value: countdown.days }, { label: 'Hours', value: countdown.hours }, { label: 'Mins', value: countdown.minutes }, { label: 'Secs', value: countdown.seconds }].map((item, i) => (<div key={i} className="text-center"><motion.div className={`text-2xl font-bold bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}>{String(item.value).padStart(2, '0')}</motion.div><div className={`text-xs ${t.textLight}`}>{item.label}</div></div>))}</motion.div><motion.p variants={fadeInUp} className={`text-base ${t.accent} italic mb-2`} style={{ fontFamily: 'Dancing Script, cursive' }}>"Really happy you were born."</motion.p><motion.p variants={fadeInUp} className={`text-sm ${t.textLight}`}>— Imelda 💙</motion.p></motion.div><motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center px-4"><motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} onClick={nextSection} className={`group px-8 py-4 bg-gradient-to-r ${t.gradient} text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-400 flex items-center justify-center gap-2 mx-auto sm:mx-0`} style={{ fontFamily: 'Inter, sans-serif' }}><Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />Open the story<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></motion.button><motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => setCurrentSection(2)} className={`px-8 py-4 rounded-full font-medium shadow border ${t.cardBorder} flex items-center justify-center gap-2 ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-800 text-slate-200' : 'bg-white/80 hover:bg-white text-slate-700'} backdrop-blur-sm transition-all`}><ImageIcon className="w-4 h-4" />Play our memories</motion.button></motion.div><motion.div variants={fadeInUp} className="mt-12 flex items-center justify-center gap-2"><Heart className="w-4 h-4 text-rose-400" fill="currentColor" /><span className={`text-sm ${t.textLight}`}>Love counter: <span className="font-medium text-blue-400">{loveCounter}+</span> and counting</span></motion.div></div>)}
            
            {/* SECTION 1: ABOUT HIM */}
            {currentSection === 1 && (<div className="py-10 md:py-16 min-h-screen flex flex-col justify-center"><motion.div variants={fadeInUp} className="text-center mb-10"><motion.div variants={floatSlow} className="mb-4 flex justify-center"><User className={`w-12 h-12 ${t.accent}`} /></motion.div><h2 className={`text-3xl md:text-4xl font-bold ${t.text} mb-2`} style={{ fontFamily: 'Playfair Display, serif' }}>About Ka Putra</h2><p className={`${t.textMuted} max-w-2xl mx-auto`} style={{ fontFamily: 'Inter, sans-serif' }}>The little things that make you, you. And why I love every single one.</p></motion.div><motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">{aboutHimContent.funnyFacts.map((fact, i) => (<motion.div key={i} variants={i % 2 === 0 ? fadeInLeft : fadeInRight} whileHover={{ y: -4 }} className={`${t.card} rounded-2xl p-5 shadow-md border ${t.cardBorder} backdrop-blur-sm`}><div className="flex items-start gap-3"><div className={`mt-1 w-6 h-6 rounded-full bg-gradient-to-r ${t.gradient} flex items-center justify-center flex-shrink-0`}><Sparkle className="w-3 h-3 text-white" /></div><p className={`text-sm ${t.textMuted} leading-relaxed`} style={{ fontFamily: 'Inter, sans-serif' }}>{fact}</p></div></motion.div>))}</motion.div><motion.div variants={fadeInUp} className="mb-8"><h3 className={`text-lg font-semibold ${t.text} mb-4 text-center`} style={{ fontFamily: 'Playfair Display, serif' }}>Your beautiful personality</h3><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{aboutHimContent.personality.map((item, i) => (<motion.div key={i} whileHover={{ scale: 1.03 }} className={`${t.card} rounded-xl p-4 text-center border ${t.cardBorder} backdrop-blur-sm`}><div className={`text-2xl mb-1`}>{['💙', '✨', '🌱', '☕'][i]}</div><p className={`font-medium ${t.text} text-sm mb-0.5`}>{item.trait}</p><p className={`text-xs ${t.textLight}`}>{item.desc}</p></motion.div>))}</div></motion.div><motion.div variants={fadeInUp} className={`${t.card} rounded-2xl p-5 mb-8 border ${t.cardBorder} backdrop-blur-sm`}><h3 className={`text-lg font-semibold ${t.text} mb-4 text-center`} style={{ fontFamily: 'Playfair Display, serif' }}>Things you love</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{Object.entries(aboutHimContent.favorites).map(([key, value], i) => (<div key={i} className="flex items-start gap-3"><div className={`mt-1 w-2 h-2 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}`} /><div><p className={`text-xs font-medium ${t.textMuted} capitalize`}>{key.replace('_', ' ')}</p><p className={`text-sm ${t.text}`}>{value}</p></div></div>))}</div></motion.div><motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3 mb-10">{aboutHimContent.reasonsILoveHim.map((reason, i) => (<motion.div key={i} variants={fadeInUp} whileHover={{ x: 4 }} className={`flex items-start gap-3 p-4 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-blue-50/50'} border ${t.cardBorder}`}><Heart className={`w-4 h-4 mt-0.5 flex-shrink-0 ${t.accent}`} fill="currentColor" /><p className={`text-sm ${t.textMuted} leading-relaxed`} style={{ fontFamily: 'Inter, sans-serif' }}>{reason}</p></motion.div>))}</motion.div><motion.div variants={scaleIn} className="flex justify-center mb-8"><div className="relative"><motion.div className="w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-2xl border-4 border-white" animate={floatSlow}><img src={pasfoto} alt="Ka Putra" className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages[pasfoto] ? 'opacity-100' : 'opacity-0'}`} /></motion.div><motion.div className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-800 rounded-lg px-3 py-1.5 shadow-lg border border-blue-100 dark:border-slate-700" animate={{ rotate: [0, 2, -2, 0] }} transition={{ duration: 3, repeat: Infinity }}><p className="text-xs font-medium text-slate-700 dark:text-slate-200">My favorite view ✨</p></motion.div></div></motion.div><motion.div variants={fadeInUp} className="flex justify-center gap-4"><motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }} onClick={prevSection} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-800' : 'bg-white/80 hover:bg-white'} ${t.textMuted} border ${t.cardBorder} text-sm backdrop-blur-sm transition-all`}><ChevronLeft size={16} /> Back</motion.button><motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }} onClick={nextSection} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r ${t.gradient} text-white text-sm font-medium shadow hover:shadow-md transition-all`}>Next <ChevronRight size={16} /></motion.button></motion.div></div>)}
            
            {/* SECTION 2: MEMORIES - WITH POLAROID CARDS */}
            {currentSection === 2 && (<div className="py-10 md:py-16 min-h-screen flex flex-col justify-center"><motion.div variants={fadeInUp} className="text-center mb-10"><motion.div variants={floatSlow} className="mb-4 flex justify-center"><ImageIcon className={`w-12 h-12 ${t.accent}`} /></motion.div><h2 className={`text-3xl md:text-4xl font-bold ${t.text} mb-2`} style={{ fontFamily: 'Playfair Display, serif' }}>Our Memories</h2><p className={`${t.textMuted} max-w-2xl mx-auto`} style={{ fontFamily: 'Inter, sans-serif' }}>Some snapshots from the story so far. Each one a little piece of us.</p></motion.div><div className="relative mb-10"><div className="overflow-hidden rounded-3xl shadow-2xl"><motion.div className="flex" animate={{ x: `-${currentImageIndex * 100}%` }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>{memoriesContent.map((image, index) => (<div key={index} className="w-full flex-shrink-0"><div className="relative aspect-square"><img src={image.src} alt={image.caption} className={`w-full h-full object-cover transition-transform duration-700 ${loadedImages[image.src] ? 'opacity-100' : 'opacity-0'}`} /><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5"><p className="text-white text-sm font-medium mb-1">{image.description}</p><p className="text-white/80 text-xs">{image.mood}</p></div></div><div className={`p-5 ${isDarkMode ? 'bg-slate-900/90' : 'bg-white/95'} backdrop-blur-sm border-t ${t.cardBorder}`}><div className="flex justify-between items-start"><div><h3 className={`font-semibold ${t.text} mb-0.5`} style={{ fontFamily: 'Playfair Display, serif' }}>{image.caption}</h3><p className={`text-xs ${t.textLight}`} style={{ fontFamily: 'Inter, sans-serif' }}>{image.date}</p></div><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={revealSecretMessage} className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} transition-colors`}>💙 Tap</motion.button></div></div></div>))}</motion.div></div>{[{ onClick: () => setCurrentImageIndex(p => (p - 1 + memoriesContent.length) % memoriesContent.length), icon: ChevronLeft, pos: 'left-4' }, { onClick: () => setCurrentImageIndex(p => (p + 1) % memoriesContent.length), icon: ChevronRight, pos: 'right-4' }].map((btn, i) => (<motion.button key={i} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={btn.onClick} className={`absolute ${btn.pos} top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors z-10 border ${t.cardBorder}`}><btn.icon size={20} className={isDarkMode ? "text-slate-300" : "text-slate-700"} /></motion.button>))}<div className="flex justify-center gap-2.5 mt-5">{memoriesContent.map((_, i) => (<motion.button key={i} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }} onClick={() => setCurrentImageIndex(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-gradient-to-r from-blue-400 to-cyan-400 scale-110 shadow shadow-blue-400/40' : isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-300 hover:bg-slate-400'}`} />))}</div></div><motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-10"><p className={`text-center text-sm ${t.textMuted} mb-6`} style={{ fontFamily: 'Inter, sans-serif' }}>Tap any photo to see it in the carousel above ✨</p><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">{[firstmeet, fs1, fs2, kaputra1, kaputra2, kaputra3, kaputra4, kaputra5].map((photo, i) => { const memory = memoriesContent.find(m => m.src === photo) || memoriesContent[i]; return (<PolaroidCard key={i} src={photo} caption={memory?.caption || `Memory ${i+1}`} date={memory?.date || ''} mood={memory?.mood || ''} isDarkMode={isDarkMode} onClick={() => { const index = memoriesContent.findIndex(m => m.src === photo); if (index !== -1) setCurrentImageIndex(index); }} />); })}</div></motion.div><motion.div variants={fadeInUp} className="text-center mb-8 max-w-2xl mx-auto"><p className={`text-sm italic ${t.textMuted}`} style={{ fontFamily: 'Inter, sans-serif' }}>"still one of my favorite days ever." • "you looked so cute here honestly." • "i wish i could relive this day again."</p></motion.div><motion.div variants={fadeInUp} className="flex justify-center gap-4"><motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }} onClick={prevSection} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-800' : 'bg-white/80 hover:bg-white'} ${t.textMuted} border ${t.cardBorder} text-sm backdrop-blur-sm transition-all`}><ChevronLeft size={16} /> Back</motion.button><motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }} onClick={nextSection} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r ${t.gradient} text-white text-sm font-medium shadow hover:shadow-md transition-all`}>Next <ChevronRight size={16} /></motion.button></motion.div></div>)}
            
            {/* SECTION 3: LOVE LETTERS */}
            {currentSection === 3 && (<div className="py-10 md:py-16 min-h-screen flex flex-col justify-center"><motion.div variants={fadeInUp} className="text-center mb-10"><motion.div variants={floatSlow} className="mb-4 flex justify-center"><MessageSquare className={`w-12 h-12 ${t.accent}`} /></motion.div><h2 className={`text-3xl md:text-4xl font-bold ${t.text} mb-2`} style={{ fontFamily: 'Playfair Display, serif' }}>What I wanted to say</h2><p className={`${t.textMuted} max-w-2xl mx-auto`} style={{ fontFamily: 'Inter, sans-serif' }}>In case I don't say it enough. Just words from the heart.</p></motion.div><motion.div variants={scaleIn} initial="hidden" animate="visible" className={`${t.card} rounded-3xl shadow-xl p-6 md:p-8 mb-10 max-w-2xl mx-auto border ${t.cardBorder} backdrop-blur-md relative overflow-hidden`}><div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} /><div className="relative z-10"><div className={`${isDarkMode ? 'bg-slate-800/40' : 'bg-blue-50/50'} rounded-2xl p-6 mb-6 border ${t.cardBorder}`}><pre className={`whitespace-pre-wrap font-sans ${t.textMuted} leading-relaxed text-sm md:text-base`} style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}>{typewriterText || "Heyyooow Ka Putra..."}<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-0.5 h-4 ml-0.5 align-middle bg-blue-400" /></pre></div><div className="text-center pt-4 border-t border-dashed border-blue-400/30"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5, type: "spring" }}><motion.div animate={pulseSoft}><Heart className="w-10 h-10 mx-auto text-blue-400 mb-2" /></motion.div><p className={`text-sm ${t.textLight} italic mb-1`} style={{ fontFamily: 'Dancing Script, cursive' }}>With all my love,</p><p className={`text-base font-semibold ${t.accent}`} style={{ fontFamily: 'Dancing Script, cursive' }}>Imelda 💙</p></motion.div></div></div></motion.div><motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-3 gap-3 mb-10 max-w-md mx-auto"><div className="col-span-2 row-span-2"><motion.img variants={scaleIn} whileHover={{ scale: 1.03 }} src={kaputra6} alt="Special moment" className="w-full h-full aspect-square object-cover rounded-2xl shadow-lg border-2 border-white" /></div><motion.img variants={scaleIn} whileHover={{ scale: 1.03 }} src={kaputra7} alt="Special moment" className="w-full h-full aspect-square object-cover rounded-2xl shadow-lg border-2 border-white" /><motion.img variants={scaleIn} whileHover={{ scale: 1.03 }} src={kaputra8} alt="Special moment" className="w-full h-full aspect-square object-cover rounded-2xl shadow-lg border-2 border-white" /></motion.div><motion.div variants={fadeInUp} className="text-center mb-8"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={revealSecretMessage} className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 mx-auto ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-800 text-slate-200 border border-slate-700' : 'bg-white/80 hover:bg-white text-slate-700 border border-blue-100'} backdrop-blur-sm transition-all`}><Sparkle className="w-4 h-4 text-amber-400" /> Tap for a little secret</motion.button></motion.div><motion.div variants={fadeInUp} className="flex justify-center gap-4"><motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }} onClick={prevSection} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-800' : 'bg-white/80 hover:bg-white'} ${t.textMuted} border ${t.cardBorder} text-sm backdrop-blur-sm transition-all`}><ChevronLeft size={16} /> Back</motion.button><motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }} onClick={nextSection} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r ${t.gradient} text-white text-sm font-medium shadow hover:shadow-md transition-all`}>Next <ChevronRight size={16} /></motion.button></motion.div></div>)}
            
            {/* SECTION 4: MINI GAMES */}
            {currentSection === 4 && (<div className="py-10 md:py-16 min-h-screen flex flex-col justify-center"><motion.div variants={fadeInUp} className="text-center mb-10"><motion.div variants={floatSlow} className="mb-4 flex justify-center"><Gamepad2 className={`w-12 h-12 ${t.accent}`} /></motion.div><h2 className={`text-3xl md:text-4xl font-bold ${t.text} mb-2`} style={{ fontFamily: 'Playfair Display, serif' }}>Little Games for Us</h2><p className={`${t.textMuted} max-w-2xl mx-auto`} style={{ fontFamily: 'Inter, sans-serif' }}>Because love should be playful too. Tap to play, smile, and maybe win a little secret message.</p></motion.div><motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"><motion.div variants={fadeInLeft} className={`${t.card} rounded-2xl p-5 shadow-md border ${t.cardBorder} backdrop-blur-sm`}><div className="flex items-center gap-3 mb-4"><div className={`w-10 h-10 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center`}><Heart className="w-5 h-5 text-white" fill="white" /></div><div><h3 className={`font-semibold ${t.text}`}>Find the Heart</h3><p className={`text-xs ${t.textLight}`}>Tap anywhere to find the hidden heart</p></div></div><FindTheHeartGame onComplete={() => { setGameCompleted(true); setTimeout(() => { setSecretMessage("You always find your way to my heart. Happy Birthday, Ka Putra 💙"); setShowSecretMessage(true); setTimeout(() => setShowSecretMessage(false), 5000); }, 500); }} isDarkMode={isDarkMode} />{gameCompleted && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-4 p-3 rounded-xl ${isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'} border ${isDarkMode ? 'border-emerald-800' : 'border-emerald-200'}`}><p className={`text-xs font-medium flex items-center gap-2 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}><CheckCircle size={14} /> You found it! A little secret is waiting for you 💙</p></motion.div>)}</motion.div><motion.div variants={fadeInRight} className={`${t.card} rounded-2xl p-5 shadow-md border ${t.cardBorder} backdrop-blur-sm`}><div className="flex items-center gap-3 mb-4"><div className={`w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center`}><MessageSquare className="w-5 h-5 text-white" /></div><div><h3 className={`font-semibold ${t.text}`}>How Well Do You Know Us?</h3><p className={`text-xs ${t.textLight}`}>A little quiz about our story</p></div></div><CoupleQuiz onComplete={() => { setQuizCompleted(true); setTimeout(() => { setSecretMessage("Every answer leads back to you. My favorite person. 💙"); setShowSecretMessage(true); setTimeout(() => setShowSecretMessage(false), 5000); }, 500); }} isDarkMode={isDarkMode} />{quizCompleted && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-4 p-3 rounded-xl ${isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'} border ${isDarkMode ? 'border-emerald-800' : 'border-emerald-200'}`}><p className={`text-xs font-medium flex items-center gap-2 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}><CheckCircle size={14} /> Perfect score! You know us so well 💙</p></motion.div>)}</motion.div></motion.div><motion.div variants={fadeInUp} className={`${t.glass} rounded-2xl p-5 mb-10 border ${t.cardBorder} backdrop-blur-sm max-w-2xl mx-auto`}><div className="flex items-start gap-3"><Sparkle className={`w-5 h-5 mt-0.5 ${t.accent}`} /><div><p className={`text-sm font-medium ${t.text} mb-1`}>Psst... there are little secrets hidden everywhere</p><p className={`text-xs ${t.textMuted} leading-relaxed`}>Tap the photos, click the hearts, or just explore. This is your space. However you want to experience it is perfect.</p></div></div></motion.div><motion.div variants={fadeInUp} className="flex justify-center gap-4"><motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }} onClick={prevSection} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-800' : 'bg-white/80 hover:bg-white'} ${t.textMuted} border ${t.cardBorder} text-sm backdrop-blur-sm transition-all`}><ChevronLeft size={16} /> Back</motion.button><motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }} onClick={nextSection} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r ${t.gradient} text-white text-sm font-medium shadow hover:shadow-md transition-all`}>Next <ChevronRight size={16} /></motion.button></motion.div></div>)}
            
            {/* SECTION 5: SURPRISE BOX */}
            {currentSection === 5 && (<div className="py-10 md:py-16 min-h-screen flex flex-col justify-center items-center text-center"><motion.div variants={fadeInUp} className="mb-8"><motion.div variants={floatSlow} className="mb-6 flex justify-center"><div className="relative"><Gift className={`w-16 h-16 ${t.accent}`} /><motion.div className="absolute -inset-3 bg-blue-400/20 rounded-full blur-2xl" animate={glowPulse} /></div></motion.div><h2 className={`text-3xl md:text-4xl font-bold ${t.text} mb-3`} style={{ fontFamily: 'Playfair Display, serif' }}>A Little Surprise</h2><p className={`${t.textMuted} max-w-xl mx-auto`} style={{ fontFamily: 'Inter, sans-serif' }}>Because you deserve moments that feel magical. Tap the box to open your gift.</p></motion.div><motion.div variants={scaleIn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={openCertificateModal} className="relative cursor-pointer mb-10"><div className={`w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br ${t.gradient} flex items-center justify-center shadow-2xl relative overflow-hidden border-4 border-white/30`}><div className="absolute inset-0 flex items-center justify-center"><div className="w-1/3 h-full bg-white/20" /><div className="h-1/3 w-full bg-white/20 absolute" /></div><div className="absolute top-4 w-16 h-8"><div className="absolute left-0 w-8 h-8 rounded-full border-4 border-white/80" /><div className="absolute right-0 w-8 h-8 rounded-full border-4 border-white/80" /><div className="absolute left-1/2 -translate-x-1/2 top-2 w-4 h-4 rounded-full bg-white/90" /></div>{[...Array(6)].map((_, i) => (<motion.div key={i} className="absolute text-white/90" style={{ left: `${30 + Math.random() * 40}%`, top: `${30 + Math.random() * 40}%` }} animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7], rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>✦</motion.div>))}<motion.div className="relative z-10 text-white text-center px-4" animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}><p className="text-lg font-bold mb-1">For Ka Putra</p><p className="text-sm opacity-90">Tap to open</p></motion.div></div><motion.div className="absolute -inset-4 bg-blue-400/10 rounded-3xl blur-2xl" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} /></motion.div><motion.div variants={fadeInUp} className="max-w-md mx-auto mb-10"><div className={`${t.glass} rounded-2xl p-5 border ${t.cardBorder} backdrop-blur-sm`}><p className={`text-sm ${t.textMuted} italic mb-3`} style={{ fontFamily: 'Inter, sans-serif' }}>"thank you for existing." • "you deserve every good thing." • "i'll always choose you."</p><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={openCertificateModal} className={`px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${t.gradient} text-white shadow-md`}>Open your gift ✨</motion.button></div></motion.div><motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-4 gap-2 mb-10 max-w-xs">{[kaputra1, kaputra2, kaputra3, kaputra4].map((photo, i) => (<motion.div key={i} variants={scaleIn} whileHover={{ scale: 1.1 }} className="relative aspect-square rounded-full overflow-hidden shadow-md border-2 border-white"><img src={photo} alt={`Memory preview ${i+1}`} className={`w-full h-full object-cover ${loadedImages[photo] ? 'opacity-100' : 'opacity-0'}`} /></motion.div>))}</motion.div><motion.div variants={fadeInUp} className="flex justify-center gap-4"><motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }} onClick={prevSection} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-800' : 'bg-white/80 hover:bg-white'} ${t.textMuted} border ${t.cardBorder} text-sm backdrop-blur-sm transition-all`}><ChevronLeft size={16} /> Back</motion.button><motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }} onClick={nextSection} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r ${t.gradient} text-white text-sm font-medium shadow hover:shadow-md transition-all`}>Final Wish <ChevronRight size={16} /></motion.button></motion.div></div>)}
            
            {/* SECTION 6: FINAL WISH */}
            {currentSection === 6 && (<div className="py-10 md:py-16 min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"><div className="absolute inset-0 overflow-hidden pointer-events-none">{[...Array(40)].map((_, i) => (<motion.div key={i} className="absolute rounded-full bg-white" style={{ width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.7 + 0.3 }} animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }} />))}{[...Array(3)].map((_, i) => (<motion.div key={`meteor-${i}`} className="absolute w-1 h-1 bg-gradient-to-r from-white to-transparent rounded-full" style={{ left: `${80 + Math.random() * 20}%`, top: `${Math.random() * 30}%`, boxShadow: "0 0 10px 2px rgba(255,255,255,0.8)" }} animate={{ x: [-100, -300], y: [50, 200], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 4 + Math.random() * 2, ease: "easeOut" }} />))}</div><motion.div variants={fadeInUp} className="relative z-10 max-w-3xl mx-auto px-4"><motion.div variants={floatSlow} className="mb-8 flex justify-center"><div className="relative"><Cake className="w-20 h-20 text-blue-300" /><motion.div className="absolute -inset-4 bg-blue-400/20 rounded-full blur-2xl" animate={glowPulse} /></div></motion.div><motion.h1 variants={fadeInUp} className={`text-4xl md:text-6xl font-bold text-white mb-4`} style={{ fontFamily: 'Playfair Display, serif' }}>Happy Birthday,<span className="block bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mt-1">my love.</span></motion.h1><motion.p variants={fadeInUp} className="text-xl md:text-2xl text-blue-100/90 mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>29 looks really good on you.</motion.p><motion.div variants={fadeInUp} className="mb-10"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={makeAWish} disabled={showWishLantern} className={`group px-8 py-4 rounded-full font-medium shadow-lg transition-all flex items-center gap-3 mx-auto ${showWishLantern ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm'}`}>{showWishLantern ? (<><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Sparkles className="w-5 h-5" /></motion.div>Making your wish... ✨</>) : (<><Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />Make a wish<Heart className="w-4 h-4 text-rose-300" fill="currentColor" /></>)}</motion.button></motion.div><motion.div variants={fadeInUp} className={`${isDarkMode ? 'bg-slate-900/60' : 'bg-white/10'} backdrop-blur-sm rounded-2xl p-6 mb-10 border border-white/10`}><p className="text-blue-100/90 leading-relaxed italic" style={{ fontFamily: 'Inter, sans-serif' }}>However this year unfolds, I hope it brings you moments that feel like this: real, warm, and yours. You deserve every good thing that comes your way.</p><p className="text-blue-200 font-medium mt-4" style={{ fontFamily: 'Dancing Script, cursive' }}>Always choosing you, Imelda 💙</p></motion.div><motion.div variants={fadeInUp} className="flex justify-center"><motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => { setSecretMessage("P.S. You're my favorite notification. 💙"); setShowSecretMessage(true); setTimeout(() => setShowSecretMessage(false), 4000); }} className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors" title="A little extra love"><Heart className="w-6 h-6 text-rose-300" fill="currentColor" /></motion.button></motion.div></motion.div><AnimatePresence>{showWishLantern && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40"><div className="relative"><motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-16 h-24 bg-gradient-to-b from-amber-200 to-amber-400 rounded-lg shadow-lg relative"><div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-amber-600 rounded-full" /><div className="absolute inset-2 bg-amber-100/30 rounded-md" /><motion.div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-300 rounded-full" animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 1.5, repeat: Infinity }} /></motion.div><div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent" />{[...Array(5)].map((_, i) => (<motion.div key={i} className="absolute text-rose-300" initial={{ x: Math.random() * 40 - 20, y: 20, opacity: 0, scale: 0.5 }} animate={{ y: -80 - Math.random() * 40, x: Math.random() * 60 - 30, opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.8] }} transition={{ duration: 3, delay: i * 0.4, ease: "easeOut" }}><Heart size={12 + i * 2} fill="currentColor" /></motion.div>))}</div></motion.div>)}</AnimatePresence><motion.div variants={fadeInUp} className="flex justify-center mt-8"><motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }} onClick={prevSection} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-800' : 'bg-white/10 hover:bg-white/20'} text-white/90 border border-white/10 text-sm backdrop-blur-sm transition-all`}><ChevronLeft size={16} /> Back to memories</motion.button></motion.div></div>)}
          </motion.div>
        </AnimatePresence>
        
        {/* Progress Dots Navigation */}
        {currentSection > 0 && currentSection < 6 && (<motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center gap-3 mt-8 pb-4">{navItems.map((item, i) => (<motion.button key={item.id} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }} onClick={() => setCurrentSection(item.id)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSection ? 'bg-gradient-to-r from-blue-400 to-cyan-400 scale-110 shadow shadow-blue-400/40' : isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-300 hover:bg-slate-400'}`} title={item.label} />))}</motion.div>)}
      </div>
      
      {/* 📱 RESPONSIVE NAVIGATION */}
      <MobileNav currentSection={currentSection} setCurrentSection={setCurrentSection} navItems={navItems} t={t} isDarkMode={isDarkMode} />
      
      {/* 💻 DESKTOP SIDEBAR */}
      <DesktopNav currentSection={currentSection} setCurrentSection={setCurrentSection} navItems={navItems} t={t} isDarkMode={isDarkMode} />
    </div>
  );
};

export default LuxuryBirthdayPage;