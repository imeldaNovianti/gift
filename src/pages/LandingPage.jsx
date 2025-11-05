import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Confetti from "react-confetti";
import { 
  Heart, 
  Download, 
  Share2, 
  Star, 
  Trophy, 
  Award, 
  Camera,
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Gem,
  Crown,
  Zap,
  BookOpen,
  GraduationCap,
  Users,
  Clock,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Medal,
  Ribbon,
  MessageCircle,
  Gift,
  X,
  CheckCircle,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Import semua foto
import pasfoto from '../assets/pasfoto.jpg';
import piagam from '../assets/piagam.jpg';
import fs1 from '../assets/fs1.jpg';
import fs2 from '../assets/fs2.jpg';
import fs3 from '../assets/fs3.jpg';
import fs4 from '../assets/fs4.jpg';
import jay1 from '../assets/jay1.jpg';
import jaypp1 from '../assets/jaypp1.jpg';
import jaywisuda2 from '../assets/jaywisuda2.jpg';
import backgroundMusic from '../assets/music/Laskar Pelangi - Nidji.mp3';

// Import Google Fonts
const loadGoogleFonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&family=Dancing+Script:wght@700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

const LuxuryGraduationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
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
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const audioRef = useRef(null);
  const cheerSoundRef = useRef(null);
  const controls = useAnimation();

  // Load Google Fonts on component mount
  useEffect(() => {
    loadGoogleFonts();
  }, []);

  // Data untuk setiap step - DIUBAH MENJADI LEBIH PERSONAL DAN SWEET
  const steps = [
    {
      type: "opening",
      title: "Untuk Cintaku, Haejay!",
      message: "Selamat ya sayang! Akhirnya kamu berhasil menyelesaikan perjalanan akademismu...",
      image: pasfoto,
      buttonText: "Lihat Kejutan Spesialku",
      personalMessage: "Aku bangga banget sama kamu!",
      music: "romantic"
    },
    {
      type: "certificate",
      title: "Surat Cinta & Kebanggaan",
      message: "Dari pacarmu yang selalu mendukungmu",
      image: piagam,
      personalMessage: "Setiap tetes keringat dan usahamu akhirnya terbayar sudah. Kamu hebat!",
      loveNotes: [
        "Aku selalu bangga sama perjuanganmu",
        "Dari belajar sampai larut malam sampai presentasi",
        "Kamu selalu memberikan yang terbaik",
        "Impianmu kini menjadi kenyataan",
        "Kamu adalah bintang dalam hidupku"
      ],
      music: "proud",
      certificateInfo: {
        from: "Pacarmu yang selalu mendukung",
        to: "Haejay Bau Kucaay",
        date: "November 2024",
        message: "Untuk cintaku yang telah berhasil menyelesaikan studi dengan gemilang. Semoga prestasi ini menjadi awal dari kesuksesanmu yang lebih besar. Aku selalu bangga padamu!"
      }
    },
    {
      type: "memories",
      title: "Kenangan Manis Kita",
      message: "Momen-momen berharga yang kita lalui bersama",
      images: [
        { 
          src: fs1, 
          caption: "Dukungan di Setiap Langkah", 
          description: "Aku selalu ada di sampingmu, melalui suka dan duka perkuliahan",
          date: "2022"
        },
        { 
          src: fs2, 
          caption: "Celebrations Together", 
          description: "Merayakan setiap pencapaian kecil dan besar bersamamu",
          date: "2023"
        },
        { 
          src: fs3, 
          caption: "Moments of Joy", 
          description: "Senyummu adalah semangatku, kebahagiaanmu adalah inspirasiku",
          date: "2024"
        },
        { 
          src: fs4, 
          caption: "Future Dreams", 
          description: "Bersama kita akan menciptakan lebih banyak kenangan indah",
          date: "Sekarang"
        },
        { 
          src: jay1, 
          caption: "Sweet Moments", 
          description: "Setiap detik bersamamu adalah kenangan yang tak terlupakan",
          date: "2023"
        },
        { 
          src: jaypp1, 
          caption: "Our Journey", 
          description: "Perjalanan kita penuh dengan cinta dan tawa",
          date: "2024"
        },
        { 
          src: jaywisuda2, 
          caption: "Graduation Day", 
          description: "Hari dimana semua kerja kerasmu terbayarkan",
          date: "November 2024"
        }
      ],
      music: "nostalgic"
    },
    {
      type: "love_letter",
      title: "Surat Cinta Untukmu",
      message: "Dari hatiku yang paling dalam...",
      letter: [
        "My Dearest Haejay,",
        "",
        "Hari ini adalah hari yang sangat spesial...",
        "Melihat kamu berhasil menyelesaikan studi membuat hatiku berbunga-bunga.",
        "Aku masih ingat betul semua perjuanganmu:",
        "- Begadang mengerjakan tugas sampai subuh",
        "- Stres menghadapi ujian yang bertubi-tubi", 
        "- Semangatmu yang tak pernah padam meski lelah",
        "",
        "Tapi lihatlah sekarang...",
        "Semua kerja keras itu akhirnya membuahkan hasil!",
        "Kamu tidak hanya lulus, tapi lulus dengan membanggakan.",
        "",
        "Aku bangga padamu, lebih dari kata-kata yang bisa kuucapkan.",
        "Kamu adalah inspirasi bagiku dan banyak orang.",
        "",
        "Ini bukan akhir, tapi awal yang indah...",
        "Aku tak sabar melihat semua impianmu menjadi kenyataan.",
        "Dan aku berjanji akan selalu ada di sampingmu,",
        "mendukung setiap langkah, merayakan setiap kesuksesan.",
        "",
        "Congratulations, my love!",
        "The world is yours to conquer!",
        "",
        "Forever proud of you,",
        "Pacarmu yang selalu mencintaimu"
      ],
      music: "intimate"
    },
    {
      type: "future",
      title: "Masa Depan Kita",
      message: "Bersama kita akan menaklukkan dunia!",
      dreams: [
        {
          icon: "🏠",
          title: "Rumah Impian",
          description: "Membangun keluarga yang penuh cinta dan kebahagiaan"
        },
        {
          icon: "✈️",
          title: "Petualangan Bersama", 
          description: "Menjelajahi dunia dan membuat kenangan tak terlupakan"
        },
        {
          icon: "💼",
          title: "Karier Gemilang",
          description: "Mendukung karirmu yang cemerlang dan penuh prestasi"
        },
        {
          icon: "❤️",
          title: "Cinta Abadi",
          description: "Tetap saling mencintai dan mendukung selamanya"
        }
      ],
      music: "optimistic"
    }
  ];

  // Background music dengan file lokal
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.log);
    }
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (currentStep === 1) {
      const text = steps[1].personalMessage;
      let index = 0;
      setTypewriterText('');
      
      const interval = setInterval(() => {
        if (index < text.length) {
          setTypewriterText(prev => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  // Countdown effect
  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (countdown === 0 && showCountdown) {
      setShowCountdown(false);
      setCountdown(10);
      // Trigger confetti when countdown reaches 0
      setShowPersonalizedConfetti(true);
      setTimeout(() => setShowPersonalizedConfetti(false), 5000);
    }
  }, [countdown, showCountdown]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMusic = () => {
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

  const nextStep = () => {
    if (currentStep === steps.length - 1) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const openCertificateModal = () => {
    setShowCertificateModal(true);
    // Play cheer sound
    if (cheerSoundRef.current) {
      cheerSoundRef.current.play().catch(console.log);
    }
    // Start countdown
    setShowCountdown(true);
    // Show personalized confetti
    setShowPersonalizedConfetti(true);
    setTimeout(() => setShowPersonalizedConfetti(false), 5000);
  };

  const downloadCertificate = () => {
    const link = document.createElement('a');
    link.href = piagam;
    link.download = 'Piagam-Kebanggaan-Haejay.jpg';
    link.click();
    
    // Show success notification
    setShowCertificateModal(false);
    setShowDownloadSuccess(true);
    setTimeout(() => setShowDownloadSuccess(false), 3000);
  };

  const shareMessage = () => {
    const text = "Lihat kejutan spesial dari pacar untuk Haejay yang baru lulus! Ayo beri selamat untuknya!";
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToEmail = () => {
    const subject = "Selamat Wisuda, Haejay!";
    const body = "Hai, aku ingin berbagi kebahagiaan. Lihat kejutan spesial yang aku buat untuk Haejay yang baru lulus!";
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareToSocial = (platform) => {
    const url = window.location.href;
    const text = "Lihat kejutan spesial dari pacar untuk Haejay yang baru lulus!";
    
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const zoomIn = () => {
    setImageZoom(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setImageZoom(prev => Math.max(prev - 0.2, 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % steps[2].images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + steps[2].images.length) % steps[2].images.length);
  };

  const revealSecretMessage = () => {
    setSecretMessage("Aku akan selalu mencintaimu, tidak peduli seberapa sulit jalan yang kita lalui. Bersama kita bisa melewati apa pun!");
    setShowSecretMessage(true);
    setTimeout(() => setShowSecretMessage(false), 5000);
  };

  const currentStepData = steps[Math.min(currentStep, steps.length - 1)];

  return (
    <div className={`min-h-screen font-sans relative overflow-hidden transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Background Music */}
      <audio
        ref={audioRef}
        src={backgroundMusic}
        loop
        autoPlay
      />
      
      {/* Cheer Sound Effect */}
      <audio
        ref={cheerSoundRef}
        src="https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3"
      />
      
      {/* Animated Background - Geometric Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating Bubbles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              left: `${Math.random() * 100}%`,
              bottom: -150,
              background: isDarkMode 
                ? `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 200}, ${Math.random() * 0.15 + 0.05})`
                : `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 200}, ${Math.random() * 0.1 + 0.05})`,
            }}
            animate={{
              y: [windowSize.height + 200, -200],
              x: [0, Math.random() * 200 - 100],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Floating Geometric Shapes */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              background: isDarkMode 
                ? `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 200}, ${Math.random() * 0.1 + 0.05})`
                : `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 200}, ${Math.random() * 0.1 + 0.05})`,
              borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '10%' : '0%',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Music Controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={`p-3 ${isDarkMode ? 'bg-slate-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border ${isDarkMode ? 'border-slate-700' : 'border-indigo-200'}`}
        >
          {isDarkMode ? 
            <Sun size={22} className="text-yellow-400" /> : 
            <Moon size={22} className="text-indigo-600" />
          }
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className={`p-3 ${isDarkMode ? 'bg-slate-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border ${isDarkMode ? 'border-slate-700' : 'border-indigo-200'}`}
        >
          {isPlaying ? 
            <Pause size={22} className={isDarkMode ? "text-pink-400" : "text-indigo-600"} /> : 
            <Play size={22} className={isDarkMode ? "text-pink-400" : "text-indigo-600"} />
          }
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className={`p-3 ${isDarkMode ? 'bg-slate-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border ${isDarkMode ? 'border-slate-700' : 'border-indigo-200'}`}
        >
          {isMuted ? 
            <VolumeX size={22} className={isDarkMode ? "text-pink-400" : "text-indigo-600"} /> : 
            <Volume2 size={22} className={isDarkMode ? "text-pink-400" : "text-indigo-600"} />
          }
        </motion.button>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti 
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={400}
          colors={['#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
        />
      )}

      {/* Personalized Confetti */}
      {showPersonalizedConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ 
                x: Math.random() * windowSize.width,
                y: -50,
                rotate: Math.random() * 360
              }}
              animate={{
                y: windowSize.height + 50,
                rotate: Math.random() * 720,
                x: Math.random() * 200 - 100
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: "easeOut"
              }}
            >
              {i % 5 === 0 ? '💖' : 
               i % 5 === 1 ? '🎓' : 
               i % 5 === 2 ? '🌟' : 
               i % 5 === 3 ? 'H' : 
               'J'}
            </motion.div>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowCertificateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`sticky top-0 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} z-10 p-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-100'} flex justify-between items-center`}>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Piagam Kebanggaan</h2>
                <div className="flex gap-2">
                  <button
                    onClick={zoomOut}
                    className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} transition-colors`}
                  >
                    <ZoomOut size={20} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
                  </button>
                  <button
                    onClick={zoomIn}
                    className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} transition-colors`}
                  >
                    <ZoomIn size={20} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
                  </button>
                  <button
                    onClick={() => setShowCertificateModal(false)}
                    className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} transition-colors`}
                  >
                    <X size={24} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6" style={{ transform: `scale(${imageZoom})`, transformOrigin: 'center' }}>
                  <img 
                    src={piagam} 
                    alt="Piagam Kebanggaan"
                    className="w-full h-auto"
                  />
                </div>
                
                <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'} rounded-xl p-4 mb-6`}>
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Informasi Piagam</h3>
                  <div className="space-y-2">
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold">Dari:</span> {steps[1].certificateInfo.from}</p>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold">Untuk:</span> {steps[1].certificateInfo.to}</p>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold">Tanggal:</span> {steps[1].certificateInfo.date}</p>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold">Pesan:</span> {steps[1].certificateInfo.message}</p>
                  </div>
                </div>
                
                {/* Countdown Timer */}
                {showCountdown && (
                  <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-pink-100'} rounded-xl p-4 mb-6 text-center`}>
                    <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Piagam akan tersedia untuk diunduh dalam:</p>
                    <div className="flex justify-center">
                      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-full w-16 h-16 flex items-center justify-center`}>
                        <span className="text-2xl font-bold text-pink-500">{countdown}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadCertificate}
                    disabled={showCountdown}
                    className={`flex items-center justify-center gap-3 px-8 py-4 ${showCountdown ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-purple-600'} text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-lg`}
                  >
                    <Download size={20} />
                    {showCountdown ? 'Tunggu...' : 'Unduh Piagam'}
                  </motion.button>
                  
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareMessage}
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-green-500 text-white rounded-2xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg"
                    >
                      <Share2 size={20} />
                      WA
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareToEmail}
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg"
                    >
                      <MessageCircle size={20} />
                      Email
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => shareToSocial('facebook')}
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-indigo-500 text-white rounded-2xl font-semibold hover:bg-indigo-600 transition-all duration-300 shadow-lg"
                    >
                      <Share2 size={20} />
                      FB
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Success Notification */}
      <AnimatePresence>
        {showDownloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-full shadow-xl flex items-center gap-3"
          >
            <CheckCircle size={24} />
            <span className="font-semibold">✅ Piagam berhasil diunduh! Simpan kenangan manismu</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Message Popup */}
      <AnimatePresence>
        {showSecretMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-2xl shadow-2xl max-w-md"
          >
            <p className="text-center">{secretMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Step 1: Opening */}
            {currentStepData.type === "opening" && (
              <div className="text-center py-16 min-h-screen flex flex-col justify-center">
                <motion.div
                  initial={{ scale: 0, rotateY: 180 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                  className="w-96 h-96 mx-auto mb-10 rounded-full overflow-hidden border-8 border-white shadow-2xl relative group"
                >
                  <img 
                    src={currentStepData.image} 
                    alt="Haejay"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-6 h-6 text-pink-500" />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <Heart className="w-20 h-20 mx-auto mb-6 text-pink-500 animate-pulse" />
                  <h1 className="text-6xl md:text-8xl font-black text-pink-600 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {currentStepData.title}
                  </h1>
                  <p className={`text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 max-w-2xl mx-auto leading-relaxed`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {currentStepData.message}
                  </p>
                  <p className="text-xl text-pink-500 font-semibold mb-8" style={{ fontFamily: 'Dancing Script, cursive' }}>
                    {currentStepData.personalMessage}
                  </p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  onClick={nextStep}
                  className="group px-16 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-xl font-bold hover:from-purple-600 hover:to-pink-500 transition-all duration-500 shadow-2xl hover:shadow-4xl flex items-center gap-4 mx-auto transform hover:scale-110 hover:-translate-y-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                  {currentStepData.buttonText}
                  <Heart className="w-6 h-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500" />
                </motion.button>
              </div>
            )}

            {/* Step 2: Certificate - VERSI SWEET DAN PERSONAL */}
            {currentStepData.type === "certificate" && (
              <div className="py-8 min-h-screen flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="w-full max-w-4xl"
                >
                  {/* Main Love Certificate */}
                  <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-white via-indigo-50 to-purple-50'} rounded-3xl shadow-2xl overflow-hidden border-2 ${isDarkMode ? 'border-slate-700' : 'border-indigo-200'} backdrop-blur-sm`}>
                    
                    {/* Header dengan tema cinta */}
                    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white py-12 text-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(10)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                              width: Math.random() * 30 + 10,
                              height: Math.random() * 30 + 10,
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{ scale: [0, 1, 0], rotate: [0, 360] }}
                            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                          />
                        ))}
                      </div>
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="relative z-10"
                      >
                        <div className="flex justify-center items-center gap-4 mb-6">
                          <Heart className="w-16 h-16 text-pink-200 animate-pulse" />
                          <GraduationCap className="w-14 h-14 text-white" />
                          <Heart className="w-16 h-16 text-pink-200 animate-pulse" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {currentStepData.title}
                        </h1>
                        <p className="text-xl text-pink-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {currentStepData.message}
                        </p>
                      </motion.div>
                    </div>

                    {/* Certificate Content */}
                    <div className="p-8">
                      <div className="text-center mb-8">
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 leading-relaxed`}
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {typewriterText || currentStepData.personalMessage}
                        </motion.p>
                      </div>

                      {/* Certificate Preview */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="relative mb-8"
                      >
                        <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                          <img 
                            src={currentStepData.image} 
                            alt="Piagam Kebanggaan"
                            className="w-full h-auto"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg cursor-pointer"
                          onClick={revealSecretMessage}
                        >
                          💝 Klik Aku!
                        </motion.button>
                      </motion.div>

                      {/* Love Notes */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                      >
                        {currentStepData.loveNotes.map((note, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 1.2 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={`p-4 ${isDarkMode ? 'bg-slate-700' : 'bg-white/80'} backdrop-blur-sm rounded-xl shadow-lg border ${isDarkMode ? 'border-slate-600' : 'border-indigo-100'} hover:shadow-xl transition-all duration-300`}
                          >
                            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"} style={{ fontFamily: 'Poppins, sans-serif' }}>{note}</p>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Personal Signature */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className={`text-center border-t ${isDarkMode ? 'border-slate-700' : 'border-indigo-200'} pt-6`}
                      >
                        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>Dengan penuh cinta dan kebanggaan,</p>
                        <p className="text-xl font-bold text-pink-500" style={{ fontFamily: 'Dancing Script, cursive' }}>Pacarmu yang selalu menyayangimu</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>November 2024</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openCertificateModal}
                      className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <Award size={20} />
                      Lihat Detail Piagam
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareMessage}
                      className={`flex items-center gap-3 px-8 py-4 ${isDarkMode ? 'bg-slate-700' : 'bg-white'} border-2 ${isDarkMode ? 'border-slate-600' : 'border-indigo-300'} text-pink-500 rounded-full font-semibold ${isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-indigo-50'} transition-all duration-300 shadow-lg hover:shadow-xl`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <Share2 size={20} />
                      Bagikan Kebahagiaan
                    </motion.button>
                  </motion.div>

                  {/* Navigation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                    className="flex justify-center gap-4 mt-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={prevStep}
                      className={`flex items-center gap-2 px-6 py-3 ${isDarkMode ? 'bg-slate-700' : 'bg-white/80'} backdrop-blur-sm border ${isDarkMode ? 'border-slate-600' : 'border-gray-300'} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} rounded-full ${isDarkMode ? 'hover:border-pink-400' : 'hover:border-indigo-400'} transition-all duration-300`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <ArrowLeft size={18} />
                      Sebelumnya
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextStep}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Lanjut
                      <ArrowRight size={18} />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* Step 3: Memories */}
            {currentStepData.type === "memories" && (
              <div className="py-8 min-h-screen flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <h1 className={`text-5xl md:text-6xl font-black ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`} style={{ fontFamily: 'Playfair Display, serif' }}>
                    {currentStepData.title}
                  </h1>
                  <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {currentStepData.message}
                  </p>
                </motion.div>

                {/* Image Carousel */}
                <div className="relative mb-8">
                  <div className="overflow-hidden rounded-3xl shadow-2xl">
                    <motion.div
                      className="flex"
                      animate={{ x: -currentImageIndex * 100 + "%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {currentStepData.images.map((image, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                          <div className="relative">
                            <img 
                              src={image.src} 
                              alt={image.caption}
                              className="w-full h-auto object-cover rounded-t-3xl"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-t-3xl`}></div>
                          </div>
                          <div className={`p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-b-3xl`}>
                            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`} style={{ fontFamily: 'Playfair Display, serif' }}>{image.caption}</h3>
                            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>{image.description}</p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>{image.date}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Carousel Controls */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={24} className="text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight size={24} className="text-gray-800" />
                  </button>

                  {/* Carousel Indicators */}
                  <div className="flex justify-center mt-4 gap-2">
                    {currentStepData.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-pink-500' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Photo Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[fs1, fs2, fs3, fs4, jay1, jaypp1, jaywisuda2].map((photo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="relative rounded-full overflow-hidden shadow-lg"
                    >
                      <img 
                        src={photo} 
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center gap-4 mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    className={`flex items-center gap-2 px-6 py-3 ${isDarkMode ? 'bg-slate-700' : 'bg-white/80'} backdrop-blur-sm border ${isDarkMode ? 'border-slate-600' : 'border-gray-300'} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} rounded-full ${isDarkMode ? 'hover:border-pink-400' : 'hover:border-indigo-400'} transition-all duration-300`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <ArrowLeft size={18} />
                    Sebelumnya
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Lanjut
                    <ArrowRight size={18} />
                  </motion.button>
                </motion.div>
              </div>
            )}

            {/* Step 4: Love Letter */}
            {currentStepData.type === "love_letter" && (
              <div className="py-8 min-h-screen flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <h1 className={`text-5xl md:text-6xl font-black ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`} style={{ fontFamily: 'Playfair Display, serif' }}>
                    {currentStepData.title}
                  </h1>
                  <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {currentStepData.message}
                  </p>
                </motion.div>

                {/* Love Letter Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-3xl shadow-2xl p-8 mb-8 max-w-3xl mx-auto`}
                >
                  <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-indigo-50'} rounded-2xl p-6 mb-6`}>
                    {currentStepData.letter.map((line, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${line === '' ? 'mb-2' : 'mb-1'} ${line.startsWith('-') ? 'ml-6' : ''}`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2, type: "spring" }}
                      className="inline-block"
                    >
                      <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                      <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} italic`} style={{ fontFamily: 'Dancing Script, cursive' }}>With all my love, always</p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Photo Collage */}
                <div className="grid grid-cols-3 gap-2 mb-8 max-w-2xl mx-auto">
                  <div className="col-span-2 row-span-2">
                    <motion.img
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      src={jaywisuda2}
                      alt="Graduation"
                      className="w-full h-full object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    src={jay1}
                    alt="Jay 1"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    src={jaypp1}
                    alt="Jay PP"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </div>

                {/* Navigation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center gap-4 mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    className={`flex items-center gap-2 px-6 py-3 ${isDarkMode ? 'bg-slate-700' : 'bg-white/80'} backdrop-blur-sm border ${isDarkMode ? 'border-slate-600' : 'border-gray-300'} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} rounded-full ${isDarkMode ? 'hover:border-pink-400' : 'hover:border-indigo-400'} transition-all duration-300`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <ArrowLeft size={18} />
                    Sebelumnya
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Lanjut
                    <ArrowRight size={18} />
                  </motion.button>
                </motion.div>
              </div>
            )}

            {/* Step 5: Future */}
            {currentStepData.type === "future" && (
              <div className="py-8 min-h-screen flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <h1 className={`text-5xl md:text-6xl font-black ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`} style={{ fontFamily: 'Playfair Display, serif' }}>
                    {currentStepData.title}
                  </h1>
                  <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {currentStepData.message}
                  </p>
                </motion.div>

                {/* Future Dreams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {currentStepData.dreams.map((dream, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300`}
                    >
                      <div className="text-5xl mb-4 text-center">{dream.icon}</div>
                      <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2 text-center`} style={{ fontFamily: 'Playfair Display, serif' }}>{dream.title}</h3>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-center`} style={{ fontFamily: 'Poppins, sans-serif' }}>{dream.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Photo Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[fs1, fs2, fs3, fs4].map((photo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="relative rounded-full overflow-hidden shadow-lg"
                    >
                      <img 
                        src={photo} 
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  ))}
                </div>

                {/* Final Message */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className={`${isDarkMode ? 'bg-slate-800' : 'bg-gradient-to-r from-indigo-100 to-purple-100'} rounded-3xl p-8 text-center mb-8`}
                >
                  <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`} style={{ fontFamily: 'Playfair Display, serif' }}>Aku tidak sabar untuk memulai babak baru bersamamu!</h2>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`} style={{ fontFamily: 'Poppins, sans-serif' }}>Terima kasih sudah menjadi inspirasi dalam hidupku. Aku akan selalu ada untukmu, dalam suka maupun duka.</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowConfetti(true);
                      setTimeout(() => setShowConfetti(false), 8000);
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-lg"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                      Rayakan Bersama!
                  </motion.button>
                </motion.div>

                {/* Navigation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="flex justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    className={`flex items-center gap-2 px-6 py-3 ${isDarkMode ? 'bg-slate-700' : 'bg-white/80'} backdrop-blur-sm border ${isDarkMode ? 'border-slate-600' : 'border-gray-300'} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} rounded-full ${isDarkMode ? 'hover:border-pink-400' : 'hover:border-indigo-400'} transition-all duration-300`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <ArrowLeft size={18} />
                    Kembali
                  </motion.button>
                </motion.div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        {currentStep > 0 && currentStep < steps.length && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-3 mt-8"
          >
            {steps.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep ? 
                  'bg-pink-500 scale-125' : 
                  isDarkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Floating Geometric Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * windowSize.width,
              y: windowSize.height + 100,
              rotate: Math.random() * 360,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: -100,
              x: Math.random() * windowSize.width - windowSize.width / 2,
              rotate: Math.random() * 720,
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          >
            {i % 3 === 0 ? 
              <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-pink-400/30' : 'bg-pink-300/30'}`}></div> : 
              i % 3 === 1 ? 
              <div className={`w-4 h-4 ${isDarkMode ? 'bg-purple-400/30' : 'bg-purple-300/30'}`}></div> : 
              <div className={`w-4 h-4 ${isDarkMode ? 'bg-blue-400/30' : 'bg-blue-300/30'}`}></div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LuxuryGraduationPage;