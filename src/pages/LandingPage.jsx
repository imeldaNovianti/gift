import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ZoomIn,
  ZoomOut,
  Mail,
  MessageSquare
} from "lucide-react";

import pasfoto from '../assets/pasfoto.jpg';
import piagam from '../assets/piagam.jpg';
import fs1 from '../assets/fs1.jpg';
import fs2 from '../assets/fs2.jpg';
import fs3 from '../assets/fs3.jpg';
import fs4 from '../assets/fs4.jpg';
import backgroundMusic from '../assets/music/Laskar Pelangi - Nidji.mp3';
import cheerSound from '../assets/music/Laskar Pelangi - Nidji.mp3';


const LuxuryGraduationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [isDraggingEmoji, setIsDraggingEmoji] = useState(false);
  const [revealedMessage, setRevealedMessage] = useState(false);
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const audioRef = useRef(null);
  const cheerAudioRef = useRef(null);
  const certificateRef = useRef(null);
  const emojiRef = useRef(null);

  // Data untuk setiap step - DIUBAH MENJADI LEBIH PERSONAL DAN SWEET
  const steps = [
    {
      type: "opening",
      title: "Untuk Cintaku, Haejay! 💝",
      message: "Selamat ya sayang! Akhirnya kamu berhasil menyelesaikan perjalanan akademismu...",
      image: pasfoto,
      buttonText: "Lihat Kejutan Spesialku ✨",
      personalMessage: "Aku bangga banget sama kamu! 💕"
    },
    {
      type: "certificate",
      title: "🎓 Surat Cinta & Kebanggaan 🎓",
      message: "Dari pacarmu yang selalu mendukungmu",
      image: piagam,
      personalMessage: "Setiap tetes keringat dan usahamu akhirnya terbayar sudah. Kamu hebat! 🌟",
      loveNotes: [
        "💖 Aku selalu bangga sama perjuanganmu",
        "📚 Dari belajar sampai larut malam sampai presentasi",
        "🌟 Kamu selalu memberikan yang terbaik",
        "🎯 Impianmu kini menjadi kenyataan",
        "👑 Kamu adalah bintang dalam hidupku"
      ],
      certificateDetails: {
        from: "Pacarmu",
        to: "Haejay",
        date: "November 2024",
        personalMessage: "Untuk Haejay tercinta, kamu telah membuktikan bahwa kerja keras dan ketekunan membuahkan hasil yang manis. Aku bangga padamu lebih dari kata-kata yang bisa kuucapkan. Teruslah bersinar, sayang! 💖"
      }
    },
    {
      type: "memories",
      title: "💑 Kenangan Manis Kita",
      message: "Momen-momen berharga yang kita lalui bersama",
      images: [
        { 
          src: fs1, 
          caption: "Dukungan di Setiap Langkah 🤗", 
          description: "Aku selalu ada di sampingmu, melalui suka dan duka perkuliahan",
          date: "2022"
        },
        { 
          src: fs2, 
          caption: "Celebrations Together 🎉", 
          description: "Merayakan setiap pencapaian kecil dan besar bersamamu",
          date: "2023"
        },
        { 
          src: fs3, 
          caption: "Moments of Joy 😊", 
          description: "Senyummu adalah semangatku, kebahagiaanmu adalah inspirasiku",
          date: "2024"
        },
        { 
          src: fs4, 
          caption: "Future Dreams 🌈", 
          description: "Bersama kita akan menciptakan lebih banyak kenangan indah",
          date: "Sekarang"
        }
      ]
    },
    {
      type: "love_letter",
      title: "💌 Surat Cinta Untukmu",
      message: "Dari hatiku yang paling dalam...",
      letter: [
        "My Dearest Haejay,",
        "",
        "Hari ini adalah hari yang sangat spesial...",
        "Melihat kamu berhasil menyelesaikan studi membuat hatiku berbunga-bunga.",
        "Aku masih ingat betul semua perjuanganmu:",
        "- Begadang mengerjakan tugas sampai subuh ☕",
        "- Stres menghadapi ujian yang bertubi-tubi 📝", 
        "- Semangatmu yang tak pernah padam meski lelah 💪",
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
        "The world is yours to conquer! 🌍",
        "",
        "Forever proud of you,",
        "Pacarmu yang selalu mencintaimu 💕"
      ]
    },
    {
      type: "future",
      title: "🚀 Masa Depan Kita",
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
      ]
    }
  ];

  // Typewriter effect untuk pesan personal
  useEffect(() => {
    if (showCertificateModal) {
      const message = steps[1].certificateDetails.personalMessage;
      if (typewriterIndex < message.length) {
        const timer = setTimeout(() => {
          setTypewriterText(prev => prev + message[typewriterIndex]);
          setTypewriterIndex(prev => prev + 1);
        }, 50);
        return () => clearTimeout(timer);
      }
    } else {
      setTypewriterText("");
      setTypewriterIndex(0);
    }
  }, [typewriterIndex, showCertificateModal]);

  // Background music dengan file lokal
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.log);
    }
  }, []);

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

  const downloadCertificate = () => {
    const link = document.createElement('a');
    link.href = piagam;
    link.download = 'Piagam-Kebanggaan-Haejay.jpg';
    link.click();
    
    // Tampilkan notifikasi sukses
    setShowDownloadSuccess(true);
    setTimeout(() => setShowDownloadSuccess(false), 3000);
  };

  const shareMessage = (platform) => {
    const text = "💖 Lihat kejutan spesial dari pacar untuk Haejay yang baru lulus! 🎓✨ Ayo beri selamat untuknya! 🌟";
    const url = window.location.href;
    
    let shareUrl = "";
    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Kejutan Spesial untuk Haejay&body=${encodeURIComponent(text + " " + url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  const showCertificateSurprise = () => {
    setShowSurprise(true);
    setTimeout(() => setShowSurprise(false), 3000);
  };

  const openCertificateModal = () => {
    setShowCertificateModal(true);
    // Play cheer sound
    if (cheerAudioRef.current) {
      cheerAudioRef.current.play().catch(console.log);
    }
  };

  const closeCertificateModal = () => {
    setShowCertificateModal(false);
    setZoomLevel(1);
    setRevealedMessage(false);
    setShowHiddenMessage(false);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleDragStart = (e) => {
    setIsDraggingEmoji(true);
    e.dataTransfer.setData('text/plain', 'emoji');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingEmoji(false);
    setRevealedMessage(true);
    
    // Tampilkan pesan rahasia setelah beberapa detik
    setTimeout(() => {
      setShowHiddenMessage(true);
    }, 1000);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentStepData = steps[Math.min(currentStep, steps.length - 1)];

  return (
    <div className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white' 
        : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-800'
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
        ref={cheerAudioRef}
        src={cheerSound}
      />
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              scale: Math.random() * 0.8 + 0.2,
              rotate: Math.random() * 360
            }}
            animate={{
              y: [null, -150, null],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          >
            {i % 4 === 0 ? <span className={`text-2xl ${isDarkMode ? 'text-pink-400' : 'text-pink-300'}`}>💖</span> :
             i % 4 === 1 ? <span className={`text-2xl ${isDarkMode ? 'text-purple-400' : 'text-purple-300'}`}>🌟</span> :
             i % 4 === 2 ? <span className={`text-2xl ${isDarkMode ? 'text-blue-400' : 'text-blue-300'}`}>🎓</span> :
             <span className={`text-2xl ${isDarkMode ? 'text-red-400' : 'text-red-300'}`}>🥰</span>}
          </motion.div>
        ))}
      </div>

      {/* Music Controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className={`p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border ${
            isDarkMode 
              ? 'bg-gray-800/90 backdrop-blur-sm border-purple-500 text-white' 
              : 'bg-white/90 backdrop-blur-sm border-pink-200 text-pink-600'
          }`}
        >
          {isPlaying ? 
            <Pause size={22} /> : 
            <Play size={22} />
          }
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className={`p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border ${
            isDarkMode 
              ? 'bg-gray-800/90 backdrop-blur-sm border-purple-500 text-white' 
              : 'bg-white/90 backdrop-blur-sm border-pink-200 text-pink-600'
          }`}
        >
          {isMuted ? 
            <VolumeX size={22} /> : 
            <Volume2 size={22} />
          }
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border ${
            isDarkMode 
              ? 'bg-gray-800/90 backdrop-blur-sm border-purple-500 text-white' 
              : 'bg-white/90 backdrop-blur-sm border-pink-200 text-pink-600'
          }`}
        >
          {isDarkMode ? <Sparkles size={22} /> : <Sparkles size={22} />}
        </motion.button>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti 
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={400}
          colors={isDarkMode 
            ? ['#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']
            : ['#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']
          }
        />
      )}

      {/* Surprise Animation */}
      <AnimatePresence>
        {showSurprise && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 100, rotate: -10 }}
              animate={{ y: 0, rotate: 0 }}
              className="bg-gradient-to-br from-pink-400 to-purple-500 text-white p-8 rounded-3xl shadow-2xl text-center max-w-md mx-4"
            >
              <Heart className="w-20 h-20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">I Love You! 💝</h3>
              <p className="text-lg">Piagam kenangan kita berhasil disimpan!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={closeCertificateModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className={`relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`relative p-6 border-b ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-900 to-pink-800 border-purple-700' 
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 border-pink-200'
              }`}>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Piagam Kebanggaan & Cinta</h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeCertificateModal}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <X className="text-white" size={24} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Certificate Image */}
                  <div className="relative">
                    <div 
                      className={`rounded-2xl overflow-hidden shadow-xl border-4 ${
                        isDarkMode ? 'border-purple-600' : 'border-white'
                      }`}
                      ref={certificateRef}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <motion.img 
                        src={steps[1].image} 
                        alt="Piagam Kebanggaan"
                        className="w-full h-auto transition-transform duration-300"
                        style={{ scale: zoomLevel }}
                        draggable={false}
                      />
                    </div>
                    
                    {/* Zoom Controls */}
                    <div className="flex justify-center mt-4 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 0.5}
                        className={`p-2 rounded-full ${
                          isDarkMode 
                            ? 'bg-gray-700 text-white hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } ${zoomLevel <= 0.5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <ZoomOut size={20} />
                      </motion.button>
                      <span className={`px-3 py-2 rounded-lg ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        {Math.round(zoomLevel * 100)}%
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 3}
                        className={`p-2 rounded-full ${
                          isDarkMode 
                            ? 'bg-gray-700 text-white hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } ${zoomLevel >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <ZoomIn size={20} />
                      </motion.button>
                    </div>

                    {/* Interactive Emoji */}
                    <div className="mt-6 text-center">
                      <p className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Drag emoji ini ke piagram untuk reveal pesan rahasia!
                      </p>
                      <motion.div
                        ref={emojiRef}
                        draggable
                        onDragStart={handleDragStart}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-4xl cursor-grab active:cursor-grabbing inline-block"
                      >
                        💝
                      </motion.div>
                    </div>

                    {/* Hidden Message */}
                    <AnimatePresence>
                      {showHiddenMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className={`mt-4 p-4 rounded-xl text-center ${
                            isDarkMode ? 'bg-purple-900/50' : 'bg-pink-100'
                          }`}
                        >
                          <p className={`font-semibold ${isDarkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                            💌 Pesan Rahasia: Aku akan selalu mencintaimu, Haejay! Kamu adalah segalanya bagiku! 💖
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Certificate Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                        Detail Piagam
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Dari:</span>
                          <span className="font-semibold">{steps[1].certificateDetails.from}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Untuk:</span>
                          <span className="font-semibold">{steps[1].certificateDetails.to}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Tanggal:</span>
                          <span className="font-semibold">{steps[1].certificateDetails.date}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                        Pesan Personal
                      </h3>
                      <div className={`p-4 rounded-xl min-h-[120px] ${
                        isDarkMode ? 'bg-gray-700/50' : 'bg-pink-50'
                      }`}>
                        <p className={`leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          {typewriterText}
                          <span className="animate-pulse">|</span>
                        </p>
                      </div>
                    </div>

                    {/* Interactive Heart */}
                    <div className="text-center">
                      <p className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Klik hati untuk pesan spesial!
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowHiddenMessage(!showHiddenMessage)}
                        className="text-4xl text-pink-500 animate-pulse"
                      >
                        ❤️
                      </motion.button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          downloadCertificate();
                          setShowDownloadSuccess(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-lg"
                      >
                        <Download size={20} />
                        Unduh Piagam
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => shareMessage('whatsapp')}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg"
                      >
                        <MessageSquare size={20} />
                        Share WA
                      </motion.button>
                    </div>

                    {/* Additional Share Options */}
                    <div className="flex justify-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => shareMessage('facebook')}
                        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                      >
                        <Share2 size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => shareMessage('twitter')}
                        className="p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                      >
                        <MessageCircle size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => shareMessage('email')}
                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Mail size={18} />
                      </motion.button>
                    </div>
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
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className={`p-4 rounded-2xl shadow-2xl max-w-sm ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                : 'bg-gradient-to-r from-pink-400 to-purple-500 text-white'
            }`}>
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart className="w-6 h-6" />
                </motion.div>
                <div>
                  <p className="font-semibold">✅ Piagam berhasil diunduh!</p>
                  <p className="text-sm opacity-90">Simpan kenangan manismu 💖</p>
                </div>
              </div>
              
              {/* Mini Confetti Effect */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-white text-xs"
                    initial={{ 
                      y: 20, 
                      x: Math.random() * 100, 
                      opacity: 0,
                      scale: 0 
                    }}
                    animate={{ 
                      y: -30, 
                      x: Math.random() * 100 - 50,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: Math.random() * 360
                    }}
                    transition={{ 
                      duration: 1 + Math.random(),
                      delay: i * 0.1
                    }}
                  >
                    {i % 3 === 0 ? '💖' : i % 3 === 1 ? '🌟' : '🎉'}
                  </motion.span>
                ))}
              </div>
            </div>
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
                  className="w-72 h-72 mx-auto mb-10 rounded-3xl overflow-hidden border-8 border-white shadow-2xl relative group"
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
                  <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                    {currentStepData.title}
                  </h1>
                  <p className="text-2xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
                    {currentStepData.message}
                  </p>
                  <p className="text-xl text-pink-500 font-semibold mb-8">
                    {currentStepData.personalMessage}
                  </p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  onClick={nextStep}
                  className="group px-16 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-3xl text-xl font-bold hover:from-purple-600 hover:to-pink-500 transition-all duration-500 shadow-2xl hover:shadow-4xl flex items-center gap-4 mx-auto transform hover:scale-110 hover:-translate-y-2"
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
                  <div className={`rounded-3xl shadow-2xl overflow-hidden border-2 backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-800 via-purple-900 to-gray-800 border-purple-600' 
                      : 'bg-gradient-to-br from-white via-pink-50 to-purple-50 border-pink-200'
                  }`}>
                    
                    {/* Header dengan tema cinta */}
                    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white py-12 text-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(10)].map((_, i) => (
                          <motion.span
                            key={i}
                            className="absolute text-white"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{ scale: [0, 1, 0], rotate: [0, 360] }}
                            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                          >
                            💖
                          </motion.span>
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
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                          {currentStepData.title}
                        </h1>
                        <p className="text-xl text-pink-100">
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
                          className={`text-lg mb-6 leading-relaxed ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {currentStepData.personalMessage}
                        </motion.p>
                      </div>

                      {/* Certificate Preview */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="relative mb-8"
                      >
                        <div className={`rounded-2xl overflow-hidden shadow-xl border-4 ${
                          isDarkMode ? 'border-purple-500' : 'border-white'
                        }`}>
                          <img 
                            src={currentStepData.image} 
                            alt="Piagam Kebanggaan"
                            className="w-full h-auto cursor-pointer transition-transform duration-300 hover:scale-105"
                            onClick={openCertificateModal}
                          />
                        </div>
                        
                        {/* Button to open certificate modal */}
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={openCertificateModal}
                          className="mt-4 w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
                        >
                          <Sparkles size={20} />
                          Lihat Detail Piagram
                          <Sparkles size={20} />
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
                            className={`p-4 rounded-xl shadow-lg border backdrop-blur-sm hover:shadow-xl transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-gray-700/50 border-purple-500/30' 
                                : 'bg-white/80 border-pink-100'
                            }`}
                          >
                            <p className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>{note}</p>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Personal Signature */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className={`text-center border-t pt-6 ${
                          isDarkMode ? 'border-purple-700' : 'border-pink-200'
                        }`}
                      >
                        <p className={`text-lg mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Dengan penuh cinta dan kebanggaan,
                        </p>
                        <p className="text-xl font-bold text-pink-500">Pacarmu yang selalu menyayangimu 💕</p>
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          November 2024
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                    className="flex justify-center gap-4 mt-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={prevStep}
                      className={`flex items-center gap-2 px-6 py-3 backdrop-blur-sm border rounded-xl transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-purple-500'
                          : 'bg-white/80 border-gray-300 text-gray-700 hover:border-pink-400'
                      }`}
                    >
                      <ArrowLeft size={18} />
                      Sebelumnya
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextStep}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                    >
                      Lanjut
                      <ArrowRight size={18} />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* Steps lainnya akan ditambahkan dengan tema yang sama sweet dan personal */}
            {/* Step 3: Memories, Step 4: Love Letter, Step 5: Future */}

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
                  isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Floating Love Elements */}
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
            {i % 3 === 0 ? <span className={`text-xl ${isDarkMode ? 'text-pink-400' : 'text-pink-300'}`}>💖</span> : 
             i % 3 === 1 ? <span className={`text-xl ${isDarkMode ? 'text-purple-400' : 'text-purple-300'}`}>🌟</span> : 
             <span className={`text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-300'}`}>🎓</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LuxuryGraduationPage;