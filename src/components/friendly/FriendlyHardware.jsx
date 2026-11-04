import React from 'react';
import { Cpu, BatteryCharging, Radio, Eye } from 'lucide-react';

export default function FriendlyHardware() {
  const hardwareItems = [
    {
      title: 'Snap Logic Chassis Tray',
      grades: 'Elementary (Grades 3–5)',
      desc: 'Solderless magnetic circuit components, child-safe battery power packs, and modular dual-shaft geared chassis.',
      features: ['Rechargeable 6V power hub', 'High-torque nylon gears', 'Snap conductive tracks', 'Safe tactile switches'],
      icon: <BatteryCharging className="w-6 h-6 text-amber-500" />,
    },
    {
      title: 'Telemetry & Sonar Hubs',
      grades: 'Middle School (Grades 6–8)',
      desc: 'Arduino-compatible protected micro-hubs, ultrasonic distance sensors, and precision servo steering actuators.',
      features: ['Dual-transducer sonar pingers', '180° micro servo actuators', 'Infrared line-following sensors', 'Solderless breadboard shields'],
      icon: <Radio className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: 'Edge AI & Vision Brains',
      grades: 'High School (Grades 9–12)',
      desc: 'Neural computing edge boards with HD wide-angle camera modules and 4-DOF articulating robotic arm kits.',
      features: ['Neural edge compute unit', 'HD wide-angle camera sensor', '4-DOF articulated robotic arm', 'Real-time OpenCV video bus'],
      icon: <Eye className="w-6 h-6 text-emerald-600" />,
    },
  ];

  return (
    <section id="hardware" className="py-20 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            Tactile STEM Hardware
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 mt-4 tracking-tight">
            Inside Our Mobile Lab Kits
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Every student gets their own individual robotics tray. Professional-grade, durable, and engineered for active hands-on classroom safety.
          </p>
        </div>

        {/* 3 Hardware Trays */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {hardwareItems.map((item, index) => (
            <div
              key={index}
              className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-sm">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-indigo-600 mb-1">
                  {item.grades}
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.desc}
                </p>

                <div className="space-y-2 pt-4 border-t border-slate-200/60">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Kit Highlights:
                  </span>
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="text-xs text-slate-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Sanitized before each visit</span>
                <span className="text-emerald-600 font-bold">100% Safe</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

