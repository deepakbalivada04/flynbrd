import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { playTinyClick } from '../../utils/toyAudio';

/**
 * ToyBoxSection
 * 
 * Signature Effect 2 (Part 2):
 * - Interactive 2D rigid-body physics sandbox powered by Matter.js
 * - Gears, bolts, a small robot, and a rocket that bounce and collide
 * - User can drag, fling, and toss them around
 * - Capped at 25 bodies
 * - Automatically pauses when off-screen (IntersectionObserver)
 * - Below 768px: displays clean static toybox illustration
 */
export default function ToyBoxSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    const width = container.clientWidth;
    const height = 480;

    // 1. Create Engine with playful gravity
    const engine = Engine.create({
      gravity: { x: 0, y: 0.9 },
    });
    engineRef.current = engine;

    // 2. Create Renderer
    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: '#15151E',
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      },
    });
    Render.run(render);

    // 3. Create Runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // 4. Bounding Walls (Floor, Left, Right)
    const wallOptions = { isStatic: true, render: { fillStyle: '#1F1F2B' } };
    const floor = Bodies.rectangle(width / 2, height + 30, width + 100, 60, wallOptions);
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions);

    Composite.add(engine.world, [floor, leftWall, rightWall]);

    // 5. Spawn Physics Toy Bodies (Capped at 20-22 bodies)
    const toyColors = ['#FFC933', '#38BDF8', '#FF6B5B', '#34D399', '#F5F5F7'];
    const bodies = [];

    // Spawn 8 Circular Gears
    for (let i = 0; i < 8; i++) {
      const x = 80 + (i * (width - 160)) / 8 + (Math.random() - 0.5) * 40;
      const y = -40 - i * 50;
      const radius = 24 + Math.random() * 16;
      const color = toyColors[i % toyColors.length];

      const gear = Bodies.circle(x, y, radius, {
        restitution: 0.85,
        friction: 0.05,
        render: {
          fillStyle: color,
          strokeStyle: '#000000',
          lineWidth: 3,
        },
      });
      bodies.push(gear);
    }

    // Spawn 6 Hexagonal Bolts
    for (let i = 0; i < 6; i++) {
      const x = 100 + Math.random() * (width - 200);
      const y = -100 - i * 60;
      const radius = 20 + Math.random() * 10;

      const bolt = Bodies.polygon(x, y, 6, radius, {
        restitution: 0.75,
        friction: 0.1,
        render: {
          fillStyle: '#1F1F2B',
          strokeStyle: '#FFC933',
          lineWidth: 3,
        },
      });
      bodies.push(bolt);
    }

    // Spawn 1 Mini Rocket
    const rocket = Bodies.rectangle(width * 0.35, -200, 40, 80, {
      restitution: 0.8,
      friction: 0.05,
      render: {
        fillStyle: '#FFC933',
        strokeStyle: '#000000',
        lineWidth: 3,
      },
    });
    bodies.push(rocket);

    // Spawn 1 Mini Robot Chassis
    const robot = Bodies.rectangle(width * 0.65, -280, 65, 55, {
      restitution: 0.8,
      friction: 0.08,
      render: {
        fillStyle: '#38BDF8',
        strokeStyle: '#000000',
        lineWidth: 3,
      },
    });
    bodies.push(robot);

    // Spawn 4 STEM Cubes
    for (let i = 0; i < 4; i++) {
      const cube = Bodies.rectangle(width * 0.5 + (i - 2) * 50, -350 - i * 40, 36, 36, {
        restitution: 0.85,
        friction: 0.05,
        render: {
          fillStyle: '#FF6B5B',
          strokeStyle: '#000000',
          lineWidth: 2.5,
        },
      });
      bodies.push(cube);
    }

    Composite.add(engine.world, bodies);

    // 6. Interactive Mouse Drag & Throw
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    Matter.Events.on(mouseConstraint, 'startdrag', () => {
      playTinyClick();
    });

    // 7. Pause Engine when off-screen to preserve 60fps & battery
    const observer = new IntersectionObserver(
      (entries) => {
        if (!runnerRef.current) return;
        if (entries[0].isIntersecting) {
          Runner.start(runnerRef.current, engine);
        } else {
          Runner.stop(runnerRef.current);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      Render.stop(render);
      if (runnerRef.current) Runner.stop(runnerRef.current);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [isMobile]);

  return (
    <section
      id="toybox-section"
      ref={containerRef}
      className="relative w-full bg-[#0B0B10] text-[#F5F5F7] px-6 sm:px-12 lg:px-16 py-16 sm:py-24 border-b-2 border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="border-b-2 border-white/10 pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15151E] border-2 border-[#38BDF8] shadow-[3px_3px_0px_0px_#38BDF8] text-xs font-bold text-[#38BDF8] uppercase mb-2">
              <span>✦ Playable Physics Sandbox</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
              The Robotics Toy Box
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-stone-300 max-w-md leading-relaxed">
            Drag, throw, and test physics with rigid-body gears, bolts, and rockets. Built directly with Matter.js physics.
          </p>
        </div>

        {/* Physics Box Container */}
        <div className="relative rounded-[24px] border-[3px] border-white/20 bg-[#15151E] shadow-[8px_8px_0px_0px_#38BDF8] overflow-hidden">
          
          {isMobile ? (
            /* Mobile Static Fallback (Per prompt instruction) */
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-[#15151E]">
              <div className="w-16 h-16 rounded-2xl bg-[#FFC933] border-2 border-black flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_#000000] mb-3">
                🤖
              </div>
              <h3 className="text-base font-display font-bold text-white mb-1">
                Robotics Hardware Primitives
              </h3>
              <p className="text-xs text-stone-400 max-w-xs font-mono">
                Interactive Matter.js physics sandbox enabled on desktop screens.
              </p>
            </div>
          ) : (
            /* Desktop Matter.js Canvas */
            <div className="relative w-full h-[480px]">
              <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
              
              {/* Overlay Prompt */}
              <div className="absolute top-4 left-4 pointer-events-none px-3 py-1 rounded-full bg-black/75 border border-white/20 backdrop-blur-md text-[11px] font-mono text-stone-300">
                <span>Grab & fling any toy!</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

