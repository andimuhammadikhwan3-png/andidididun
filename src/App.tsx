/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Calendar, 
  Newspaper, 
  Users, 
  MessageSquare, 
  ChevronRight, 
  Search, 
  Menu, 
  X,
  Send,
  Loader2,
  ArrowRight,
  TrendingUp,
  Activity,
  Instagram,
  Twitter,
  Facebook,
  Youtube
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialization helper for Gemini to handle missing keys gracefully
let genAI: GoogleGenAI | null = null;
const getGenAI = () => {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return null;
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-zinc-950/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-persija-orange rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-persija-orange/20 group-hover:scale-110 transition-transform">
            P
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase text-white">Persija <span className="text-persija-orange">Hub</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6 text-sm font-medium text-zinc-400">
            <a href="#home" className="hover:text-persija-orange transition-colors">Beranda</a>
            <a href="#matches" className="hover:text-persija-orange transition-colors">Jadwal</a>
            <a href="#news" className="hover:text-persija-orange transition-colors">Berita</a>
            <a href="#players" className="hover:text-persija-orange transition-colors">Pemain</a>
          </nav>
          <button className="bg-persija-orange hover:bg-persija-orange/90 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-persija-orange/20">
            Tiket
          </button>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-zinc-400">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-zinc-950 border-b border-white/10 px-4 py-8 flex flex-col gap-4 shadow-xl"
          >
            <a href="#home" className="text-xl font-semibold" onClick={() => setIsOpen(false)}>Beranda</a>
            <a href="#matches" className="text-xl font-semibold text-zinc-400 hover:text-white" onClick={() => setIsOpen(false)}>Jadwal</a>
            <a href="#news" className="text-xl font-semibold text-zinc-400 hover:text-white" onClick={() => setIsOpen(false)}>Berita</a>
            <a href="#players" className="text-xl font-semibold text-zinc-400 hover:text-white" onClick={() => setIsOpen(false)}>Pemain</a>
            <button className="w-full bg-persija-orange text-white py-4 rounded-xl font-bold mt-4">Beli Tiket</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <div id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/football-stadium/1920/1080" 
          alt="Stadium background" 
          className="w-full h-full object-cover opacity-30 grayscale saturate-150"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-persija-orange/10 border border-persija-orange/30 px-3 py-1 rounded-full text-persija-orange text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <Activity size={12} /> Live: Persija Jakarta vs Persib Bandung
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 uppercase italic tracking-tighter">
            SPIRIT TO <br />
            <span className="text-persija-orange drop-shadow-[0_0_30px_rgba(255,107,0,0.3)]">CHAMPION</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-10 leading-relaxed font-medium max-w-xl">
            Selamat datang di markas digital Macan Kemayoran. Dapatkan berita terbaru, jadwal pertandingan, dan info eksklusif lainnya.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-persija-orange hover:bg-persija-orange/90 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-persija-orange/20">
              Lihat Jadwal <ChevronRight size={20} />
            </button>
            <button className="border border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm">
              Tentang Klub
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative text */}
      <div className="absolute -bottom-10 right-0 opacity-[0.03] select-none pointer-events-none">
        <span className="text-[25vw] font-black italic uppercase leading-none text-white whitespace-nowrap">
          JAKMANIA
        </span>
      </div>
    </div>
  );
};

const MatchesSection = () => {
  const matches = [
    { id: 1, home: "Persija", guest: "Arema FC", date: "22 Apr 2026", time: "19:00", comp: "BRI Liga 1", venue: "JIS", result: "Upcoming" },
    { id: 2, home: "Persik", guest: "Persija", date: "26 Apr 2026", time: "15:30", comp: "BRI Liga 1", venue: "Brawijaya", result: "Upcoming" },
  ];

  return (
    <section id="matches" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold text-persija-orange uppercase tracking-[.2em] mb-2">Next Journey</h2>
            <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Jadwal Pertandingan</h3>
          </div>
          <button className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1 text-sm font-bold uppercase tracking-widest">
            Lihat Semua <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {matches.map((match) => (
            <motion.div 
              key={match.id}
              whileHover={{ y: -5 }}
              className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden group"
            >
              <div className="flex justify-between items-center text-xs font-bold text-zinc-500 uppercase tracking-widest relative z-10">
                <span>{match.comp}</span>
                <span>{match.date} • {match.venue}</span>
              </div>
              
              <div className="flex items-center justify-between gap-4 relative z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center font-bold text-xl border border-white/10 group-hover:border-persija-orange/50 transition-colors">
                    {match.home[0]}
                  </div>
                  <span className="font-bold text-sm tracking-widest uppercase">{match.home}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-white">{match.time}</span>
                  <span className="text-[10px] font-black text-persija-orange uppercase mt-1 tracking-widest">WIB</span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center font-bold text-xl border border-white/10 group-hover:border-zinc-500 transition-colors">
                    {match.guest[0]}
                  </div>
                  <span className="font-bold text-sm tracking-widest uppercase">{match.guest}</span>
                </div>
              </div>

              <button className="w-full bg-zinc-800 hover:bg-persija-orange text-white py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-widest relative z-10">
                Beli Tiket
              </button>

              <div className="absolute top-0 right-0 w-32 h-32 bg-persija-orange/5 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-persija-orange/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsSection = () => {
  const news = [
    { title: "Adaptasi Pemain Baru di Skuad Macan Kemayoran", date: "18 Apr 2026", category: "Skuad", img: "https://picsum.photos/seed/training/800/600" },
    { title: "Statistik Persija di Paruh Musim Liga 1", date: "17 Apr 2026", category: "Analisis", img: "https://picsum.photos/seed/stat/800/600" },
    { title: "Info Tiket Pertandingan Melawan Arema FC", date: "16 Apr 2026", category: "Komersial", img: "https://picsum.photos/seed/ticket/800/600" },
  ];

  return (
    <section id="news" className="py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-sm font-bold text-persija-orange uppercase tracking-[.3em] mb-4">Latest Updates</h2>
          <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter">Berita Terbaru</h3>
          <div className="w-24 h-1 bg-persija-orange mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-persija-orange text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  {item.category}
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-persija-orange transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-zinc-500 text-sm font-medium">{item.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Halo Jakmania! Ada yang bisa saya bantu seputar Persija Jakarta?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const aiInstance = getGenAI();
      if (!aiInstance) {
        throw new Error("API Key Gemini belum dikonfigurasi. Silakan tambahkan di Secrets.");
      }

      const result = await aiInstance.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: "You are a friendly and passionate Persija Jakarta consultant. Answer questions about the club's history, current news, players, and Jakmania in Indonesian. Keep your answers concise, energetic, and supportive of the team. Use football terms like 'Macan Kemayoran', 'Rumah kita', 'Jakmania'.",
        }
      });
      
      const aiText = result.text || "Maaf, sepertinya ada gangguan. Coba lagi nanti ya!";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan koneksi.";
      setMessages(prev => [...prev, { role: 'ai', text: `Waduh: ${errorMessage}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-zinc-900 border border-white/10 rounded-3xl w-[350px] sm:w-[400px] h-[500px] shadow-2xl flex flex-col overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="bg-persija-orange p-6 flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center">
                  <TrendingUp className="text-persija-orange" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-sm tracking-widest">Persija AI Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-persija-orange text-white rounded-tr-none shadow-lg shadow-persija-orange/10' 
                      : 'bg-zinc-800 text-zinc-100 rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 className="animate-spin text-zinc-400" size={18} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-zinc-900/50 border-t border-white/5">
              <div className="relative flex items-center gap-2">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tanya sejarah Persija..."
                  className="flex-1 bg-zinc-800 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-persija-orange/50 transition-all text-white placeholder:text-zinc-600 font-medium"
                />
                <button 
                  onClick={handleSend}
                  disabled={loading}
                  className="bg-persija-orange p-3 rounded-xl text-white hover:bg-persija-orange/90 transition-all disabled:opacity-50 shadow-lg shadow-persija-orange/20"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-persija-orange rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-persija-orange/40 hover:scale-105 active:scale-95 transition-all group"
      >
        {isOpen ? <X size={28} /> : (
          <div className="relative">
             <MessageSquare size={28} />
             <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center border-2 border-persija-orange">
                <div className="w-1.5 h-1.5 bg-persija-orange rounded-full animate-ping" />
             </div>
          </div>
        )}
      </button>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-persija-orange rounded-2xl flex items-center justify-center font-black text-white text-xl group-hover:rotate-12 transition-transform">P</div>
              <span className="text-3xl font-black text-white italic tracking-tighter uppercase">Persija <span className="text-persija-orange">Hub</span></span>
            </a>
            <p className="text-zinc-500 max-w-sm mb-8 font-medium leading-relaxed italic">
              "To the victory and beyond. Satu Jakarta, satu kebanggaan. Macan Kemayoran tidak pernah menyerah."
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 hover:border-persija-orange transition-colors cursor-pointer group">
                <Instagram size={20} className="text-zinc-500 group-hover:text-persija-orange transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 hover:border-persija-orange transition-colors cursor-pointer group">
                <Twitter size={20} className="text-zinc-500 group-hover:text-persija-orange transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 hover:border-persija-orange transition-colors cursor-pointer group">
                <Facebook size={20} className="text-zinc-500 group-hover:text-persija-orange transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 hover:border-persija-orange transition-colors cursor-pointer group">
                <Youtube size={20} className="text-zinc-500 group-hover:text-persija-orange transition-colors" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-black uppercase text-sm tracking-widest mb-6">Navigasi</h5>
            <ul className="space-y-4 text-zinc-500 font-bold text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Daftar Pemain</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Statistik Klub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-black uppercase text-sm tracking-widest mb-6">Sponsor UTAMA</h5>
            <div className="grid grid-cols-2 gap-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="h-12 bg-white/5 rounded-xl flex items-center justify-center p-3 opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                    <img src={`https://picsum.photos/seed/sponsor${i}/100/50`} alt="Sponsor" className="max-w-full" referrerPolicy="no-referrer" />
                 </div>
               ))}
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
            © 2026 Persija Hub. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-600">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Service</a>
            <a href="#" className="hover:text-zinc-400">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PlayersSection = () => {
  const players = [
    { name: "Rizky Ridho", pos: "Defender", no: "5", img: "https://picsum.photos/seed/ridho/400/500" },
    { name: "Gustavo Almeida", pos: "Forward", no: "70", img: "https://picsum.photos/seed/gustavo/400/500" },
    { name: "Maciej Gajos", pos: "Midfielder", no: "10", img: "https://picsum.photos/seed/gajos/400/500" },
    { name: "Andritany", pos: "Goalkeeper", no: "26", img: "https://picsum.photos/seed/andritany/400/500" },
  ];

  return (
    <section id="players" className="py-24 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-persija-orange uppercase tracking-[.3em] mb-4">The Squad</h2>
            <h3 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
              MACAN <br /> KEMAYORAN
            </h3>
            <p className="text-zinc-500 font-medium italic">Menempa kekuatan, menjaga tradisi. Inilah para pejuang yang membawa nama harum Jakarta di lapangan hijau.</p>
          </div>
          <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 group">
            Skuad Lengkap <Users size={18} className="group-hover:text-persija-orange transition-colors" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {players.map((player, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 bg-zinc-900 border border-white/5">
                <img 
                  src={player.img} 
                  alt={player.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-4xl font-black text-white/20 group-hover:text-persija-orange transition-colors">#{player.no}</span>
                </div>
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-persija-orange transition-colors">{player.name}</h4>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{player.pos}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Hero />
      <MatchesSection />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <NewsSection />
      <PlayersSection />
      
      {/* CTA / Fan Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-persija-orange/10 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-persija-orange to-persija-red rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-persija-orange/20">
             <div className="relative z-10 flex flex-col items-center">
                <Trophy className="text-white mb-8" size={80} />
                <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-6 drop-shadow-lg">
                  Bergabunglah dengan <br />
                  Keluarga Besar
                </h2>
                <p className="text-white/80 text-lg font-bold max-w-2xl mb-12">
                  Dapatkan akses eksklusif untuk konten video, wawancara pemain, dan penawaran spesial member resmi.
                </p>
                <button className="bg-white text-persija-orange px-12 py-5 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-zinc-100 transition-all transform hover:scale-105 shadow-xl">
                  Daftar Sekarang
                </button>
             </div>
             
             {/* Background noise/texture */}
             <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none grayscale" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </div>
  );
}
