import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, User, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, 
  Calendar, Clock, ShieldCheck, Mail, MapPin, Laptop, Cpu, 
  GraduationCap, Rocket, Check, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import FriendlyNavbar from '../components/friendly/FriendlyNavbar';
import FriendlyFooter from '../components/friendly/FriendlyFooter';
import FadeIn from '../components/common/FadeIn';

export default function BookDemoPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mode: 'school' or 'individual'
  const [demoType, setDemoType] = useState('school');

  // Track if coming from a specific learning track
  const preselectedTrack = location.state?.bookingTier || '';

  // School Form State
  const [schoolForm, setSchoolForm] = useState({
    contactName: '',
    designation: '',
    schoolName: '',
    city: '',
    email: '',
    phone: '',
    board: 'CBSE',
    studentStrength: '100-300',
    grades: ['Grades 6–8 (Builders)'],
    disciplines: preselectedTrack ? [preselectedTrack] : ['Robotics Kits', 'Artificial Intelligence'],
    demoFormat: 'on-campus',
    preferredDate: '',
    notes: '',
  });

  // Individual Form State
  const [individualForm, setIndividualForm] = useState({
    parentOrStudentName: '',
    studentAgeGrade: 'Grades 6–8',
    email: '',
    phone: '',
    city: '',
    primaryTrack: preselectedTrack || 'Robotics & Hardware',
    experienceLevel: 'Beginner',
    preferredTime: 'Weekend (Saturday)',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSchoolGradeToggle = (grade) => {
    setSchoolForm((prev) => {
      const exists = prev.grades.includes(grade);
      return {
        ...prev,
        grades: exists ? prev.grades.filter((g) => g !== grade) : [...prev.grades, grade]
      };
    });
  };

  const handleSchoolDisciplineToggle = (disc) => {
    setSchoolForm((prev) => {
      const exists = prev.disciplines.includes(disc);
      return {
        ...prev,
        disciplines: exists ? prev.disciplines.filter((d) => d !== disc) : [...prev.disciplines, disc]
      };
    });
  };

  const handleSchoolSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setSubmittedData({
        type: 'school',
        name: schoolForm.contactName,
        target: schoolForm.schoolName,
        email: schoolForm.email,
        format: schoolForm.demoFormat === 'on-campus' ? 'On-Campus Hands-on Walkthrough' : 'Virtual Interactive Walkthrough'
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EE7819', '#D4252A', '#1D9D53', '#2576BC', '#533788']
      });
    }, 800);
  };

  const handleIndividualSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setSubmittedData({
        type: 'individual',
        name: individualForm.parentOrStudentName,
        target: `${individualForm.studentAgeGrade} • ${individualForm.primaryTrack}`,
        email: individualForm.email,
        format: 'Live 1-on-1 Online Interactive Demo'
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EE7819', '#D4252A', '#1D9D53', '#2576BC', '#533788']
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#EE7819] selection:text-white">
      
      {/* Top Navbar */}
      <FriendlyNavbar onBookClick={() => window.scrollTo({ top: 120, behavior: 'smooth' })} />

      <main className="pt-24 pb-20">
        
        {/* Page Header */}
        <div className="relative overflow-hidden py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-slate-50">
          
          {/* Subtle Ambient Glows using Logo Colors */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 pointer-events-none opacity-20 blur-3xl -z-10">
            <div className="absolute top-4 left-10 w-72 h-72 rounded-full bg-[#1D9D53]" />
            <div className="absolute top-10 left-1/3 w-80 h-80 rounded-full bg-[#533788]" />
            <div className="absolute top-4 right-1/4 w-72 h-72 rounded-full bg-[#D4252A]" />
            <div className="absolute top-12 right-10 w-64 h-64 rounded-full bg-[#EE7819]" />
          </div>

          <div className="max-w-5xl mx-auto text-center">
            
            {/* Breadcrumb */}
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link to="/" className="hover:text-[#2576BC] flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Book a Live Demo</span>
            </div>

            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#EE7819]" />
              <span className="text-slate-800">Experience Real Hardware & Curriculum in Action</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
              Schedule Your Free{' '}
              <span className="bg-gradient-to-r from-[#EE7819] via-[#D4252A] to-[#2576BC] bg-clip-text text-transparent">
                Live Interactive Demo
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Whether you are an institution leader looking to deploy an on-campus residency, or a parent/student wanting to experience hands-on AI & robotics, we customize the demo for you.
            </p>

            {/* SEGMENTED TOGGLE: SCHOOL VS INDIVIDUAL */}
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-300 shadow-sm">
              <button
                type="button"
                onClick={() => { setDemoType('school'); setSubmitted(false); }}
                className={`px-5 sm:px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  demoType === 'school'
                    ? 'bg-[#EE7819] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>For Schools & Colleges</span>
              </button>

              <button
                type="button"
                onClick={() => { setDemoType('individual'); setSubmitted(false); }}
                className={`px-5 sm:px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  demoType === 'individual'
                    ? 'bg-[#2576BC] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <User className="w-4 h-4" />
                <span>For Individual Students & Parents</span>
              </button>
            </div>

          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
          
          {submitted ? (
            /* ============================================================== */
            /* SUCCESS CONFIRMATION STATE                                     */
            /* ============================================================== */
            <div className="max-w-2xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-xl p-8 sm:p-12 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 mx-auto flex items-center justify-center mb-6">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Live Demo Request Confirmed!
              </h2>

              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Thank you, <strong>{submittedData.name}</strong>. We have received your request for <strong>{submittedData.target}</strong>. Our academic team will prepare the live demonstration and email your calendar invite and session link to <strong>{submittedData.email}</strong> within 24 hours.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs sm:text-sm text-slate-700 space-y-2 mb-8">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Demo Category:</span>
                  <span className="font-bold text-slate-900 capitalize">{submittedData.type} Demo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Format:</span>
                  <span className="font-bold text-slate-900">{submittedData.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Contact Email:</span>
                  <span className="font-bold text-[#2576BC]">{submittedData.email}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Book Another Demo
                </button>

                <Link
                  to="/learning-paths"
                  className="px-6 py-3 rounded-xl bg-[#EE7819] hover:bg-[#d86b14] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore All Learning Paths</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-xs text-slate-400 mt-6">
                Direct questions? Reach out anytime at <a href="mailto:info@flynbrd.com" className="text-[#2576BC] underline font-medium">info@flynbrd.com</a>.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: FORM (7 COLS) */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 text-left">
                
                {/* -------------------------------------------------------- */}
                {/* 1. SCHOOL DEMO FORM                                      */}
                {/* -------------------------------------------------------- */}
                {demoType === 'school' && (
                  <form onSubmit={handleSchoolSubmit} className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EE7819] mb-1">
                        <Building2 className="w-4 h-4" />
                        <span>Institutional Residency Demo</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        School Walkthrough & Demo Details
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        We bring complete hardware kits, certified mentors, and student LMS accounts to your campus.
                      </p>
                    </div>

                    {/* School Name & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          School / Institution Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={schoolForm.schoolName}
                          onChange={(e) => setSchoolForm({ ...schoolForm, schoolName: e.target.value })}
                          placeholder="e.g. Delhi Public School / Excel High"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#EE7819] focus:bg-white focus:ring-2 focus:ring-[#EE7819]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          City / District *
                        </label>
                        <input
                          type="text"
                          required
                          value={schoolForm.city}
                          onChange={(e) => setSchoolForm({ ...schoolForm, city: e.target.value })}
                          placeholder="e.g. Hyderabad, Vizag, Vijayawada"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#EE7819] focus:bg-white focus:ring-2 focus:ring-[#EE7819]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Contact Person & Designation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          value={schoolForm.contactName}
                          onChange={(e) => setSchoolForm({ ...schoolForm, contactName: e.target.value })}
                          placeholder="e.g. Dr. Ramesh Rao"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#EE7819] focus:bg-white focus:ring-2 focus:ring-[#EE7819]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Designation / Role *
                        </label>
                        <input
                          type="text"
                          required
                          value={schoolForm.designation}
                          onChange={(e) => setSchoolForm({ ...schoolForm, designation: e.target.value })}
                          placeholder="e.g. Principal / STEM Coordinator / Trustee"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#EE7819] focus:bg-white focus:ring-2 focus:ring-[#EE7819]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Official Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={schoolForm.email}
                          onChange={(e) => setSchoolForm({ ...schoolForm, email: e.target.value })}
                          placeholder="principal@yourschool.edu.in"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#EE7819] focus:bg-white focus:ring-2 focus:ring-[#EE7819]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={schoolForm.phone}
                          onChange={(e) => setSchoolForm({ ...schoolForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#EE7819] focus:bg-white focus:ring-2 focus:ring-[#EE7819]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Board & Cohort Strength */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Affiliation Board
                        </label>
                        <select
                          value={schoolForm.board}
                          onChange={(e) => setSchoolForm({ ...schoolForm, board: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#EE7819] focus:bg-white focus:ring-2 focus:ring-[#EE7819]/20 transition-all cursor-pointer"
                        >
                          <option value="CBSE">CBSE</option>
                          <option value="ICSE">ICSE</option>
                          <option value="State Board (AP / Telangana)">State Board (AP / Telangana)</option>
                          <option value="Cambridge / IB">Cambridge / IB</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Estimated Student Cohort
                        </label>
                        <select
                          value={schoolForm.studentStrength}
                          onChange={(e) => setSchoolForm({ ...schoolForm, studentStrength: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#EE7819] focus:bg-white focus:ring-2 focus:ring-[#EE7819]/20 transition-all cursor-pointer"
                        >
                          <option value="50-100">50 – 100 Students (Pilot Cohort)</option>
                          <option value="100-300">100 – 300 Students (Multiple Sections)</option>
                          <option value="300+">300+ Students (Full Grade Bands)</option>
                          <option value="Entire Campus">Entire Campus (Grades 3 to 12)</option>
                        </select>
                      </div>
                    </div>

                    {/* Grade Tiers of Interest (Checkboxes) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Target Grade Bands
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          'Grades 3–5 (Explorers)',
                          'Grades 6–8 (Builders)',
                          'Grades 9–12 (Engineers)'
                        ].map((grade) => {
                          const isChecked = schoolForm.grades.includes(grade);
                          return (
                            <button
                              key={grade}
                              type="button"
                              onClick={() => handleSchoolGradeToggle(grade)}
                              className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${
                                isChecked
                                  ? 'bg-[#EE7819]/10 border-[#EE7819] text-[#EE7819]'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              <span>{grade}</span>
                              {isChecked && <Check className="w-3.5 h-3.5 text-[#EE7819] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Demo Format Choice */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Preferred Demo Format
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                          schoolForm.demoFormat === 'on-campus'
                            ? 'bg-[#EE7819]/10 border-[#EE7819]'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}>
                          <input
                            type="radio"
                            name="demoFormat"
                            value="on-campus"
                            checked={schoolForm.demoFormat === 'on-campus'}
                            onChange={(e) => setSchoolForm({ ...schoolForm, demoFormat: e.target.value })}
                            className="mt-1 accent-[#EE7819]"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900">On-Campus Live Walkthrough</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">We visit your campus with rovers, AI models & kits for a live demonstration.</div>
                          </div>
                        </label>

                        <label className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                          schoolForm.demoFormat === 'virtual'
                            ? 'bg-[#EE7819]/10 border-[#EE7819]'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}>
                          <input
                            type="radio"
                            name="demoFormat"
                            value="virtual"
                            checked={schoolForm.demoFormat === 'virtual'}
                            onChange={(e) => setSchoolForm({ ...schoolForm, demoFormat: e.target.value })}
                            className="mt-1 accent-[#EE7819]"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900">Interactive Video Walkthrough</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">30-min live Google Meet session demonstrating LMS & hardware live.</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Specific Questions or Timetable Needs (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={schoolForm.notes}
                        onChange={(e) => setSchoolForm({ ...schoolForm, notes: e.target.value })}
                        placeholder="Tell us about your upcoming academic term, timetable flexibility, or any specific STEM goals..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#EE7819] focus:bg-white focus:ring-2 focus:ring-[#EE7819]/20 transition-all resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#EE7819] to-[#D4252A] hover:from-[#d86b14] hover:to-[#ba1e23] text-white font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      <span>{loading ? 'Scheduling Walkthrough...' : 'Schedule School Live Demo'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </form>
                )}

                {/* -------------------------------------------------------- */}
                {/* 2. INDIVIDUAL STUDENT / PARENT DEMO FORM                 */}
                {/* -------------------------------------------------------- */}
                {demoType === 'individual' && (
                  <form onSubmit={handleIndividualSubmit} className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2576BC] mb-1">
                        <User className="w-4 h-4" />
                        <span>Student & Parent 1-on-1 Session</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        Book a 1-on-1 Student Live Demo
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Experience our interactive robot kits, live code sandbox, and AI models in a personalized 30-minute session.
                      </p>
                    </div>

                    {/* Parent/Student Name & Grade */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Parent or Student Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={individualForm.parentOrStudentName}
                          onChange={(e) => setIndividualForm({ ...individualForm, parentOrStudentName: e.target.value })}
                          placeholder="e.g. Ananya & Rajesh Kumar"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#2576BC] focus:bg-white focus:ring-2 focus:ring-[#2576BC]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Student Grade / Age Group *
                        </label>
                        <select
                          value={individualForm.studentAgeGrade}
                          onChange={(e) => setIndividualForm({ ...individualForm, studentAgeGrade: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#2576BC] focus:bg-white focus:ring-2 focus:ring-[#2576BC]/20 transition-all cursor-pointer"
                        >
                          <option value="Grades 3–5">Grades 3 – 5 (Age 8–11 • Explorers)</option>
                          <option value="Grades 6–8">Grades 6 – 8 (Age 11–14 • Builders)</option>
                          <option value="Grades 9–10">Grades 9 – 10 (Age 14–16 • Junior Engineers)</option>
                          <option value="Grades 11–12">Grades 11 – 12 (Age 16–18 • Senior Engineers)</option>
                          <option value="College / Independent">College / Young Adult Independent</option>
                        </select>
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={individualForm.email}
                          onChange={(e) => setIndividualForm({ ...individualForm, email: e.target.value })}
                          placeholder="parent@gmail.com"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#2576BC] focus:bg-white focus:ring-2 focus:ring-[#2576BC]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={individualForm.phone}
                          onChange={(e) => setIndividualForm({ ...individualForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#2576BC] focus:bg-white focus:ring-2 focus:ring-[#2576BC]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Primary Interest Track & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Primary Area of Interest
                        </label>
                        <select
                          value={individualForm.primaryTrack}
                          onChange={(e) => setIndividualForm({ ...individualForm, primaryTrack: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#2576BC] focus:bg-white focus:ring-2 focus:ring-[#2576BC]/20 transition-all cursor-pointer"
                        >
                          <option value="Robotics & Hardware">Robotics (Kit Assembly & Sensors)</option>
                          <option value="Artificial Intelligence">AI (Neural Nets & Computer Vision)</option>
                          <option value="Space Tech & Rovers">Space Tech (Chandrayaan Rover & Physics)</option>
                          <option value="3D Printing & Prototyping">3D Printing (CAD & Rapid Prototyping)</option>
                          <option value="Coding & Software">Coding (Python & Algorithmic Logic)</option>
                          <option value="IoT & Smart Devices">IoT (ESP32 & Connected Hardware)</option>
                          <option value="All Disciplines">General / Complete Overview</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          City / State *
                        </label>
                        <input
                          type="text"
                          required
                          value={individualForm.city}
                          onChange={(e) => setIndividualForm({ ...individualForm, city: e.target.value })}
                          placeholder="e.g. Hyderabad, Vizag, Vijayawada"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#2576BC] focus:bg-white focus:ring-2 focus:ring-[#2576BC]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Prior Experience & Preferred Slot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Student Prior Experience
                        </label>
                        <select
                          value={individualForm.experienceLevel}
                          onChange={(e) => setIndividualForm({ ...individualForm, experienceLevel: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#2576BC] focus:bg-white focus:ring-2 focus:ring-[#2576BC]/20 transition-all cursor-pointer"
                        >
                          <option value="Beginner">Absolute Beginner (Enthusiastic to start)</option>
                          <option value="Scratch/Blocks">Has done basic block coding (Scratch / Code.org)</option>
                          <option value="Hands-on Circuits">Has built basic electronics / robotics toys</option>
                          <option value="Intermediate">Comfortable with basic Python / C++</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Preferred Live Demo Slot
                        </label>
                        <select
                          value={individualForm.preferredTime}
                          onChange={(e) => setIndividualForm({ ...individualForm, preferredTime: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#2576BC] focus:bg-white focus:ring-2 focus:ring-[#2576BC]/20 transition-all cursor-pointer"
                        >
                          <option value="Weekend (Saturday)">Weekend (Saturday Afternoon/Evening)</option>
                          <option value="Weekend (Sunday)">Weekend (Sunday Morning/Afternoon)</option>
                          <option value="Weekday Evening">Weekday Evening (After 5 PM)</option>
                        </select>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        What does your child love to build or explore? (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={individualForm.notes}
                        onChange={(e) => setIndividualForm({ ...individualForm, notes: e.target.value })}
                        placeholder="Tell us what excites them most (e.g. building moving rovers, coding games, space exploration)..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#2576BC] focus:bg-white focus:ring-2 focus:ring-[#2576BC]/20 transition-all resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2576BC] to-[#533788] hover:from-[#1d63a0] hover:to-[#432c6e] text-white font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      <span>{loading ? 'Reserving Live Demo...' : 'Book 1-on-1 Student Live Demo'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </form>
                )}

              </div>

              {/* RIGHT COLUMN: WHAT HAPPENS IN THE DEMO / TRUST (5 COLS) */}
              <div className="lg:col-span-5 space-y-6 text-left">
                
                {/* Live Demo Perks Card */}
                <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-7">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-[#EE7819]" />
                    <span>What Happens in the Live Demo</span>
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    See Real STEM Education in Motion
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#EE7819]/10 text-[#EE7819] flex items-center justify-center shrink-0 font-bold">
                        <Rocket className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-0.5">Physical Hardware in Action</strong>
                        Watch our Chandrayaan ultrasonic rover, robotic arms, and 3D printers demonstrate real automated tasks.
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#2576BC]/10 text-[#2576BC] flex items-center justify-center shrink-0 font-bold">
                        <Laptop className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-0.5">Interactive LMS Sandbox</strong>
                        Experience our dedicated student portal with step-by-step video tutorials and in-browser coding.
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#1D9D53]/10 text-[#1D9D53] flex items-center justify-center shrink-0 font-bold">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-0.5">Grade-Appropriate Roadmap</strong>
                        We map the 9-discipline syllabus directly to your students' cognitive stage (Grades 3 to 12).
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#533788]/10 text-[#533788] flex items-center justify-center shrink-0 font-bold">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-0.5">30 Minutes • 100% Free</strong>
                        Zero commitment or purchase required. Pure experiential demonstration and mentor Q&A.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Card */}
                <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-7 relative overflow-hidden shadow-md">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#EE7819]/20 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#EE7819] block mb-1">
                      Direct Inquiries
                    </span>
                    <h4 className="text-lg font-bold text-white mb-2">
                      Prefer to reach us directly?
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Our academic coordinators are available for school visits and consultations across Andhra Pradesh & Telangana.
                    </p>

                    <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#EE7819]" />
                        <a href="mailto:info@flynbrd.com" className="text-white hover:underline font-semibold">
                          info@flynbrd.com
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        <span>Hyderabad · Visakhapatnam · Vizianagaram</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </main>

      {/* Footer */}
      <FriendlyFooter />

    </div>
  );
}
