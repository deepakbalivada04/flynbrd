import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Mail, Calendar, Download, Share2, 
  ChevronRight, ChevronLeft, ArrowRight, CheckCircle2, ShieldCheck, 
  Layers, Cpu, BookOpen, GraduationCap, X, Play, Pause, Award, 
  Rocket, Compass, UserCheck, Smartphone, Check, Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import textLogoImg from '../assets/text_logo.png';
import { MASTER_TRACKS } from '../data/curriculumData';

export default function BrochurePage() {
  const navigate = useNavigate();

  // Mode: 'story' (Instagram-style tap/slide deck) vs 'overview' (Executive mobile dossier)
  const [viewMode, setViewMode] = useState('story');
  
  // Story deck state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedContact, setSavedContact] = useState(false);
  
  // Overview mode active tab
  const [activeTab, setActiveTab] = useState('tracks');
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  // Pilot calculator state
  const [pilotGrade, setPilotGrade] = useState('middle');
  const [pilotStudents, setPilotStudents] = useState(60);

  const SLIDE_DURATION = 6500; // ms per slide
  const totalSlides = 6;

  // Auto-advance story deck
  useEffect(() => {
    if (viewMode !== 'story' || isPaused) return;

    const timer = setTimeout(() => {
      if (currentSlide < totalSlides - 1) {
        setCurrentSlide((prev) => prev + 1);
      } else {
        // Loop back or let user stay on contact slide
        setCurrentSlide(totalSlides - 1);
      }
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [currentSlide, viewMode, isPaused]);

  // Handle Save Contact (.vcf)
  const handleSaveContact = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#EE7819', '#D4252A', '#1D9D53', '#2576BC', '#533788']
    });

    const vcardData = `BEGIN:VCARD
VERSION:3.0
N:Academy;Flynbrd AI & Robotics;;;
FN:Flynbrd AI & Robotics Academy
ORG:Flyinbird AI Technologies Pvt Ltd
TITLE:NEP 2020 STEM & AI Residencies
EMAIL;TYPE=PREF,INTERNET:info@flynbrd.com
URL:https://flynbrd.com
ADR;TYPE=WORK:;;Hyderabad · Vizianagaram · Visakhapatnam;AP & Telangana;;India
NOTE:Hands-On AI, Robotics, Space & 3D Printing Residencies for Schools (Grades 3-12).
END:VCARD`;

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Flynbrd_AI_Robotics.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSavedContact(true);
    setTimeout(() => setSavedContact(false), 3000);
  };

  // Handle Native Web Share API
  const handleShare = async () => {
    const shareData = {
      title: 'Flynbrd AI & Robotics • School Executive Brochure',
      text: 'Explore Flynbrd\'s hands-on STEM & Robotics school residencies (Grades 3-12) for AP & Telangana.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleBookWalkthrough = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#EE7819', '#D4252A', '#1D9D53', '#2576BC', '#533788']
    });
    navigate('/', { state: { scrollToBooking: true } });
  };

  // 4 Flagship hardware projects
  const FLAGSHIP_PROJECTS = [
    {
      title: 'Chandrayaan Rover',
      grades: 'Grades 4–10',
      badge: 'Space & Hardware',
      color: '#D4252A',
      image: '/assets/tracks/space.jpg',
      desc: 'Obstacle avoidance with ultrasonic sonar, differential gear kinematics, and radio frequency telemetry.'
    },
    {
      title: 'AI Smart Voice Assistant',
      grades: 'Grades 7–12',
      badge: 'Artificial Intelligence',
      color: '#533788',
      image: '/assets/tracks/ai.jpg',
      desc: 'Speech recognition, natural language reasoning, and ESP32 audio decoding without cloud lag.'
    },
    {
      title: 'IoT Weather Station',
      grades: 'Grades 6–11',
      badge: 'IoT & Sensors',
      color: '#2576BC',
      image: '/assets/tracks/iot.jpg',
      desc: 'Live barometric pressure, humidity, solar radiation monitoring with cloud telemetry dashboards.'
    },
    {
      title: '4-Axis Robotic Gripper',
      grades: 'Grades 8–12',
      badge: 'Robotics Engineering',
      color: '#1D9D53',
      image: '/assets/tracks/robotics.jpg',
      desc: 'Servo articulation, inverse kinematics, PID loop smoothing, and pick-and-place automation.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-[#EE7819] selection:text-white flex flex-col justify-between">
      
      {/* TOP HEADER / APP BAR */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img src={textLogoImg} alt="Flyinbird AI" className="h-7 w-auto object-contain" />
        </Link>

        {/* Mode Switcher Pill */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 p-0.5 rounded-full text-xs font-semibold">
          <button
            type="button"
            onClick={() => setViewMode('story')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'story' 
                ? 'bg-[#EE7819] text-white shadow-xs' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Story Deck</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('overview')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'overview' 
                ? 'bg-[#2576BC] text-white shadow-xs' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
        </div>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 cursor-pointer transition-colors relative"
          title="Share Brochure"
        >
          {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          {copiedLink && (
            <span className="absolute -bottom-7 right-0 text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded whitespace-nowrap">
              Link Copied!
            </span>
          )}
        </button>
      </header>

      {/* MAIN VIEW CONTAINER */}
      <main className="flex-1 flex flex-col justify-center items-center p-3 sm:p-6 w-full max-w-4xl mx-auto">
        
        {/* ============================================================== */}
        {/* 1. STORY DECK MODE (INSTAGRAM / APPLE STORIES EXPERIENCE)       */}
        {/* ============================================================== */}
        {viewMode === 'story' && (
          <div 
            className="w-full max-w-md h-[680px] sm:h-[720px] rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between select-none"
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Story Progress Indicators */}
            <div className="absolute top-3 left-4 right-4 z-30 flex items-center gap-1.5">
              {Array.from({ length: totalSlides }).map((_, idx) => {
                const isPassed = idx < currentSlide;
                const isCurrent = idx === currentSlide;
                return (
                  <div 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden cursor-pointer"
                  >
                    <div 
                      className={`h-full transition-all duration-linear ${
                        isPassed 
                          ? 'w-full bg-white' 
                          : isCurrent 
                            ? isPaused 
                              ? 'w-full bg-[#EE7819]' 
                              : 'w-full bg-[#EE7819] animate-pulse' 
                            : 'w-0'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Tap Left / Right Overlay Navigation */}
            <div className="absolute inset-0 z-20 flex pointer-events-auto">
              <div 
                className="w-1/3 h-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
                }}
              />
              <div 
                className="w-2/3 h-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentSlide < totalSlides - 1) setCurrentSlide(currentSlide + 1);
                }}
              />
            </div>

            {/* ========================================================== */}
            {/* SLIDE 0: COVER / THE HOOK                                  */}
            {/* ========================================================== */}
            {currentSlide === 0 && (
              <div className="relative h-full flex flex-col justify-between p-6 pt-12 z-10 animate-fadeIn">
                {/* Background Image with Dark Vignette */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src="/hero_students_robotics.jpg" 
                    alt="STEM Students" 
                    className="w-full h-full object-cover object-center filter brightness-[0.45] saturate-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col items-start pt-4">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-[#EE7819]" />
                    <span>School Visiting Card Digital Dossier</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-4">
                    Where Indian students learn to{' '}
                    <span className="bg-gradient-to-r from-[#EE7819] via-[#D4252A] to-[#2576BC] bg-clip-text text-transparent">
                      build real AI & robotics.
                    </span>
                  </h1>

                  <p className="text-sm text-slate-300 leading-relaxed max-w-xs mb-4">
                    Flyinbird delivers hands-on STEM residencies, genuine hardware kits, certified mentors, and LMS software to schools across AP & Telangana.
                  </p>

                  <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-200">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700">NEP 2020 Aligned</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700">Grades 3 to 12</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700">9 Disciplines</span>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs font-bold text-amber-300 animate-bounce">
                  <span>Tap anywhere to explore 👉</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* SLIDE 1: OLD STEM VS FLYINBIRD RESIDENCY                   */}
            {/* ========================================================== */}
            {currentSlide === 1 && (
              <div className="relative h-full flex flex-col justify-between p-6 pt-12 z-10 animate-fadeIn bg-slate-950">
                <div className="relative z-10">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#EE7819]">
                    The Core Difference
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-5">
                    Why schools partner with Flyinbird
                  </h2>

                  <div className="space-y-4">
                    {/* Old Approach */}
                    <div className="p-4 rounded-2xl bg-red-950/30 border border-red-800/40 text-left">
                      <div className="flex items-center gap-2 text-xs font-bold text-red-400 mb-1">
                        <X className="w-4 h-4 text-red-400" />
                        <span>The Traditional STEM Trap</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Pre-assembled plastic toys, 1-day magic shows that leave zero retention, and burdening already overworked teachers with zero hardware support.
                      </p>
                    </div>

                    {/* Flyinbird Way */}
                    <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-left">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>The Flyinbird Residency Model</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Certified visiting mentors, genuine industrial microcontrollers (ESP32, Arduino, Jetson), interactive LMS lesson sandboxes, and <strong>zero teacher prep</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                  <div className="text-[11px] font-bold text-amber-300 mb-0.5">Zero Campus Overhead</div>
                  <div className="text-xs text-slate-400">
                    We bring the entire hardware laboratory into standard classrooms. All you need is standard desks and power sockets.
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* SLIDE 2: 9 LEARNING DISCIPLINES                            */}
            {/* ========================================================== */}
            {currentSlide === 2 && (
              <div className="relative h-full flex flex-col justify-between p-6 pt-12 z-10 animate-fadeIn bg-slate-950">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#2576BC]">
                      Master Syllabus
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">9 Disciplines</span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-white mb-2">
                    Syllabi for every age & stage
                  </h2>
                  <p className="text-xs text-slate-400 mb-4">
                    Sequenced from Explorers (Grades 3–5) to Engineers (Grades 11–12):
                  </p>

                  <div className="grid grid-cols-2 gap-2.5">
                    {MASTER_TRACKS.slice(0, 6).map((track) => (
                      <div 
                        key={track.id}
                        className="relative h-24 rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-end p-2.5 text-left group"
                      >
                        <img 
                          src={track.bgImage} 
                          alt={track.title} 
                          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                        <div className="relative z-10">
                          <span 
                            className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded text-white inline-block mb-0.5"
                            style={{ backgroundColor: track.themeColor }}
                          >
                            {track.shortTitle}
                          </span>
                          <div className="text-[11px] font-bold text-white line-clamp-1">
                            {track.title}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-slate-400">
                    Plus Space & Astronomy, Coding & PCB Circuit Design!
                  </span>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* SLIDE 3: 4 STUDENT CAPSTONES                               */}
            {/* ========================================================== */}
            {currentSlide === 3 && (
              <div className="relative h-full flex flex-col justify-between p-6 pt-12 z-10 animate-fadeIn bg-slate-950">
                <div className="relative z-10">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#1D9D53]">
                    Tangible Outcomes
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1 mb-2">
                    What your students will build
                  </h2>
                  <p className="text-xs text-slate-400 mb-4">
                    Every student completes functional hardware they present to teachers and parents:
                  </p>

                  <div className="space-y-3">
                    {FLAGSHIP_PROJECTS.map((proj, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-left"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-800 relative">
                          <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="text-xs font-bold text-white truncate">{proj.title}</span>
                            <span className="text-[10px] font-semibold text-amber-300 shrink-0">{proj.grades}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                            {proj.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-emerald-400">
                    ✓ Verified student capstone certificate included
                  </span>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* SLIDE 4: WHAT THE SCHOOL RECEIVES                          */}
            {/* ========================================================== */}
            {currentSlide === 4 && (
              <div className="relative h-full flex flex-col justify-between p-6 pt-12 z-10 animate-fadeIn bg-slate-950">
                <div className="relative z-10">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#533788]">
                    School Operating System
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1 mb-2">
                    Complete turnkey residency
                  </h2>
                  <p className="text-xs text-slate-400 mb-4">
                    Everything required to conduct future-proof AI & robotics on your campus:
                  </p>

                  <div className="space-y-2.5 text-left">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#EE7819]/20 text-[#EE7819] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        01
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Full Hardware Kit Library</div>
                        <div className="text-[11px] text-slate-400">Rotational rovers, sensors, ESP32 boards & 3D prototyping tools brought directly to your school.</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#2576BC]/20 text-[#2576BC] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        02
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Certified On-Campus Mentors</div>
                        <div className="text-[11px] text-slate-400">Vetted engineers who inspire curiosity and manage all workshop pacing.</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#1D9D53]/20 text-[#1D9D53] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        03
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Interactive LMS Student Accounts</div>
                        <div className="text-[11px] text-slate-400">Step-by-step video lessons, code sandboxes, and self-paced homework modules.</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#533788]/20 text-[#533788] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        04
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Annual Campus STEM Expo</div>
                        <div className="text-[11px] text-slate-400">Showcase event for parents, trustees, and community press.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-xs text-slate-400">
                    Pilots available: Half-day, 3-day intensive, or full semester.
                  </span>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* SLIDE 5: ONE-TOUCH CONNECT & ACTION                        */}
            {/* ========================================================== */}
            {currentSlide === 5 && (
              <div className="relative h-full flex flex-col justify-between p-6 pt-12 z-10 animate-fadeIn bg-slate-950 text-center">
                <div className="relative z-10 flex flex-col items-center">
                  <img src={textLogoImg} alt="Flynbrd" className="h-9 w-auto mb-4" />
                  
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Official Visiting Card QR Portal</span>
                  </span>

                  <h2 className="text-2xl font-extrabold text-white mb-2">
                    Let's inspire your students
                  </h2>
                  <p className="text-xs text-slate-300 max-w-xs mb-6">
                    Connect directly with our school partnership team in Hyderabad, Visakhapatnam & Vizianagaram.
                  </p>

                  {/* Actions Stack */}
                  <div className="w-full space-y-2.5">
                    {/* Save Contact (.vcf) */}
                    <button
                      type="button"
                      onClick={handleSaveContact}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#EE7819] to-[#D4252A] text-white font-bold text-sm shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>{savedContact ? '✓ Saved to Address Book!' : 'Save Contact to Phone (.vcf)'}</span>
                    </button>

                    {/* Book Walkthrough */}
                    <button
                      type="button"
                      onClick={handleBookWalkthrough}
                      className="w-full py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-sm shadow-md hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#EE7819]" />
                      <span>Book School Walkthrough</span>
                    </button>

                    {/* Email Liaison */}
                    <a
                      href="mailto:info@flynbrd.com"
                      className="w-full py-3.5 rounded-2xl bg-[#2576BC] text-white font-bold text-xs shadow-md hover:bg-[#1d63a0] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email School Liaison (info@flynbrd.com)</span>
                    </a>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500">
                  info@flynbrd.com • flynbrd.com
                </div>
              </div>
            )}

            {/* Slide Navigation Buttons Footer */}
            <div className="relative z-30 p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <button
                type="button"
                onClick={() => {
                  if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
                }}
                disabled={currentSlide === 0}
                className={`flex items-center gap-1 font-semibold ${
                  currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'text-slate-300 hover:text-white cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <span className="font-mono text-[11px] text-slate-500">
                {currentSlide + 1} / {totalSlides}
              </span>

              <button
                type="button"
                onClick={() => {
                  if (currentSlide < totalSlides - 1) setCurrentSlide(currentSlide + 1);
                }}
                disabled={currentSlide === totalSlides - 1}
                className={`flex items-center gap-1 font-semibold ${
                  currentSlide === totalSlides - 1 ? 'opacity-30 cursor-not-allowed' : 'text-amber-300 hover:text-amber-200 cursor-pointer'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* 2. OVERVIEW MODE (EXECUTIVE MOBILE POCKET DOSSIER)              */}
        {/* ============================================================== */}
        {viewMode === 'overview' && (
          <div className="w-full max-w-2xl bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-xl p-5 sm:p-8 animate-fadeIn text-left">
            
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#EE7819]" />
                  <span>Executive School Briefing</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Flyinbird STEM & AI Residencies
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Turnkey AI, Robotics, Space & 3D Prototyping partnerships for K-12 campuses.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveContact}
                className="shrink-0 px-4 py-2.5 rounded-full bg-[#EE7819] hover:bg-[#d46610] text-white text-xs font-bold shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Contact</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-black text-[#EE7819]">9</div>
                <div className="text-[11px] font-semibold text-slate-600">Disciplines</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-black text-[#2576BC]">3–12</div>
                <div className="text-[11px] font-semibold text-slate-600">Grade Coverage</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-black text-[#1D9D53]">100%</div>
                <div className="text-[11px] font-semibold text-slate-600">Hardware Kits</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-black text-[#533788]">0</div>
                <div className="text-[11px] font-semibold text-slate-600">Teacher Load</div>
              </div>
            </div>

            {/* Interactive Section Selector */}
            <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-200 overflow-x-auto">
              {[
                { id: 'tracks', label: '9 Syllabi Tracks' },
                { id: 'projects', label: 'Student Capstones' },
                { id: 'model', label: 'School Partnership' },
                { id: 'calculator', label: 'Pilot Estimator' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT 1: TRACKS */}
            {activeTab === 'tracks' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Choose a Discipline to Inspect:</h3>
                  <Link to="/learning-paths" className="text-xs font-bold text-[#2576BC] hover:underline flex items-center gap-1">
                    <span>Full Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Track Selector Buttons */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {MASTER_TRACKS.map((t, idx) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTrackIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                        selectedTrackIndex === idx
                          ? 'bg-[#EE7819] text-white border-[#EE7819] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {t.shortTitle}
                    </button>
                  ))}
                </div>

                {/* Selected Track Detail Card */}
                {MASTER_TRACKS[selectedTrackIndex] && (
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span 
                        className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase text-white shadow-xs"
                        style={{ backgroundColor: MASTER_TRACKS[selectedTrackIndex].themeColor }}
                      >
                        {MASTER_TRACKS[selectedTrackIndex].shortTitle}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Grades 3–12</span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {MASTER_TRACKS[selectedTrackIndex].title}
                    </h4>
                    <p className="text-xs font-medium text-slate-600 mb-3">
                      {MASTER_TRACKS[selectedTrackIndex].tagline}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      {MASTER_TRACKS[selectedTrackIndex].tiers.map((tier) => (
                        <div key={tier.tierId} className="flex items-start gap-2 text-xs">
                          <span className="font-bold text-slate-800 shrink-0 w-24">{tier.gradeLevel}:</span>
                          <span className="text-slate-600">{tier.modules.map(m => m.title).join(' • ')}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                      <Link
                        to={`/learning-paths/${MASTER_TRACKS[selectedTrackIndex].slug}`}
                        className="text-xs font-bold text-[#EE7819] hover:underline flex items-center gap-1"
                      >
                        <span>View All Chapters & Modules</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 animate-fadeIn">
                {FLAGSHIP_PROJECTS.map((p, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span 
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-white"
                          style={{ backgroundColor: p.color }}
                        >
                          {p.badge}
                        </span>
                        <span className="text-[11px] font-bold text-amber-600">{p.grades}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{p.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 3: PARTNERSHIP MODEL */}
            {activeTab === 'model' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                  <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#EE7819]" />
                    <span>How We Integrate With Your School</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    We adapt directly to your school calendar without disrupting academic timetables:
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Format A:</strong> 1-Day Exploratory STEM Residency (Single cohort discovery)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Format B:</strong> 3-Day Intensive Robotics & AI Boot Camp (Complete Capstone build)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Format C:</strong> Year-Long Integrated STEM Lab Partner (Weekly classes + LMS)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                  <strong>Zero Capital Investment:</strong> No expensive fixed lab renovation needed. Flyinbird provides rotational hardware and laptops/tablets if required.
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: PILOT ESTIMATOR */}
            {activeTab === 'calculator' && (
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4 animate-fadeIn">
                <h4 className="text-sm font-bold text-slate-900">
                  Estimate a Pilot for Your Campus
                </h4>

                {/* Grade Range */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1.5">Select Grade Group:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'primary', label: 'Grades 3–5' },
                      { id: 'middle', label: 'Grades 6–8' },
                      { id: 'high', label: 'Grades 9–12' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setPilotGrade(g.id)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          pilotGrade === g.id
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Student Count */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                    <span>Estimated Cohort Size:</span>
                    <span className="font-bold text-[#EE7819]">{pilotStudents} Students</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    step="10"
                    value={pilotStudents}
                    onChange={(e) => setPilotStudents(Number(e.target.value))}
                    className="w-full accent-[#EE7819] cursor-pointer"
                  />
                </div>

                {/* Recommendation Box */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">Recommended Pilot Structure:</div>
                  <div className="text-sm font-bold text-slate-900">
                    {pilotGrade === 'primary' 
                      ? 'Explorers Hardware Discovery (Chandrayaan & Scratch AI)' 
                      : pilotGrade === 'middle' 
                        ? 'Builders Robotics Intensive (Sensors, Motors & ESP32)' 
                        : 'Engineers Edge AI & Neural Net Residency'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {Math.ceil(pilotStudents / 30)} certified mentors deployed • {Math.ceil(pilotStudents / 2)} hardware kit stations • Full LMS access for all {pilotStudents} students.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBookWalkthrough}
                  className="w-full py-3 rounded-xl bg-[#EE7819] hover:bg-[#d46610] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Custom Proposal for this Cohort</span>
                </button>
              </div>
            )}

            {/* Direct Connect Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleBookWalkthrough}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#EE7819] to-[#D4252A] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Campus Walkthrough</span>
              </button>

              <a
                href="mailto:info@flynbrd.com"
                className="flex-1 py-3.5 rounded-2xl bg-[#2576BC] hover:bg-[#1d63a0] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Email Liaison (info@flynbrd.com)</span>
              </a>
            </div>

          </div>
        )}

      </main>

      {/* STICKY BOTTOM ACTION DOCK (SPECIALLY DESIGNED FOR MOBILE BROWSING) */}
      <footer className="sticky bottom-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 flex items-center justify-around gap-2.5 max-w-4xl mx-auto w-full">
        {/* Email */}
        <a
          href="mailto:info@flynbrd.com"
          className="flex-1 py-2.5 px-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
        >
          <Mail className="w-3.5 h-3.5 text-blue-400" />
          <span className="truncate">Email Liaison</span>
        </a>

        {/* Book Walkthrough */}
        <button
          type="button"
          onClick={handleBookWalkthrough}
          className="flex-1 py-2.5 px-2 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all text-center cursor-pointer hover:bg-slate-100"
        >
          <Calendar className="w-3.5 h-3.5 text-[#EE7819]" />
          <span className="truncate">Book Walkthrough</span>
        </button>

        {/* Save Contact */}
        <button
          type="button"
          onClick={handleSaveContact}
          className="flex-1 py-2.5 px-2 rounded-xl bg-gradient-to-r from-[#EE7819] to-[#D4252A] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all text-center cursor-pointer hover:opacity-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="truncate">{savedContact ? 'Saved!' : 'Save Contact'}</span>
        </button>
      </footer>

    </div>
  );
}
