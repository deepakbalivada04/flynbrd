import React, { useEffect, useRef } from 'react';

/**
 * SolarSunCanvas
 * 
 * Hyper-realistic, 60fps animated procedural Sun:
 * - Massive spherical solar horizon rising from the bottom of the screen (replacing Earth)
 * - Fiery turbulent plasma surface with dynamic solar granulation
 * - Volumetric multi-layered corona glow with additive blending
 * - Coronal prominence flare loops erupting into space
 * - Radiant solar light shafts piercing the dark cosmic atmosphere
 * - Rising glowing solar ember particles floating towards headline & CTA
 * - Interactive cursor gravitational heat flare
 */
export default function SolarSunCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Mouse coordinates relative to canvas
    const mouse = {
      x: width / 2,
      y: height * 0.4,
      targetX: width / 2,
      targetY: height * 0.4,
      active: false,
    };

    // Responsive resize handler with devicePixelRatio support
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse movement inside the laptop screen
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };
    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height * 0.4;
    };

    const parentEl = canvas.parentElement;
    if (parentEl) {
      parentEl.addEventListener('pointermove', handlePointerMove, { passive: true });
      parentEl.addEventListener('pointerleave', handlePointerLeave);
    }

    // ------------------------------------------------------------------------
    // RISING SOLAR EMBERS / PARTICLES
    // ------------------------------------------------------------------------
    const PARTICLE_COUNT = 45;
    const particles = [];

    // Helper to spawn a particle near the sun's fiery surface
    const createParticle = () => {
      const angle = (Math.PI * 0.2) + Math.random() * (Math.PI * 0.6); // Spans across the upper rim of the sun
      const sunCenterX = width / 2;
      const sunCenterY = height * 1.32;
      const sunRadius = width * 0.72;

      const px = sunCenterX + Math.cos(angle - Math.PI / 2) * (sunRadius + Math.random() * 20 - 10);
      const py = sunCenterY - Math.sin(angle) * (sunRadius + Math.random() * 20 - 10);

      return {
        x: px,
        y: py,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.5 + Math.random() * 1.1), // Drifts gently upward
        size: 1 + Math.random() * 2.2,
        life: 0,
        maxLife: 90 + Math.random() * 120,
        wobbleSpeed: 0.02 + Math.random() * 0.04,
        wobbleOffset: Math.random() * Math.PI * 2,
        colorType: Math.random(),
      };
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife; // Stagger initial life
      particles.push(p);
    }

    // ------------------------------------------------------------------------
    // SOLAR PROMINENCE FLARE LOOPS
    // ------------------------------------------------------------------------
    const FLARE_COUNT = 5;
    const flares = [];
    for (let i = 0; i < FLARE_COUNT; i++) {
      flares.push({
        angleOffset: (i / (FLARE_COUNT - 1) - 0.5) * 0.75, // Across the top arc
        baseHeight: 18 + Math.random() * 24,
        speed: 0.8 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // ------------------------------------------------------------------------
    // TWINKLING BACKGROUND STARS
    // ------------------------------------------------------------------------
    const STAR_COUNT = 60;
    const stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.65, // Keep in upper cosmic half
        size: 0.6 + Math.random() * 1.4,
        alpha: 0.2 + Math.random() * 0.6,
        twinkleSpeed: 0.015 + Math.random() * 0.03,
      });
    }

    let time = 0;

    // ------------------------------------------------------------------------
    // MAIN RENDER LOOP (60FPS)
    // ------------------------------------------------------------------------
    const render = () => {
      time += 0.016;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep cosmic space background with subtle warm nebula wash
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#06070a');
      bgGrad.addColorStop(0.55, '#0d0d12');
      bgGrad.addColorStop(0.85, '#1a0f08');
      bgGrad.addColorStop(1, '#2c1204');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Twinkling Stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * 3 + star.twinkleSpeed * 100);
        const currentAlpha = Math.max(0.1, Math.min(0.9, star.alpha + twinkle * 0.25));
        ctx.fillStyle = `rgba(255, 250, 240, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Geometry Parameters of the Sun
      // Positioned to create a sweeping horizon along the lower half of the laptop screen
      const sunCenterX = width / 2;
      const sunCenterY = height * 1.34; // Center is anchored below the canvas
      const sunRadius = width * 0.72;   // Grand curvature matching the Earth in the mockup

      // Gravitational mouse influence on sun center
      const tiltOffsetX = (mouse.x - width / 2) * 0.03;
      const tiltOffsetY = (mouse.y - height / 2) * 0.02;

      const currentSunX = sunCenterX + tiltOffsetX;
      const currentSunY = sunCenterY + tiltOffsetY;

      // 3. Volumetric Solar Corona (Multi-layered Atmospheric Heat Halos)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Wide ambient deep-red / amber heat aura
      const auraGrad = ctx.createRadialGradient(
        currentSunX,
        currentSunY,
        sunRadius * 0.7,
        currentSunX,
        currentSunY,
        sunRadius * 1.55
      );
      auraGrad.addColorStop(0, 'rgba(251, 146, 60, 0.45)');
      auraGrad.addColorStop(0.4, 'rgba(234, 88, 12, 0.25)');
      auraGrad.addColorStop(0.75, 'rgba(180, 83, 9, 0.12)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, width, height);

      // Mid-corona intense golden glow
      const midCoronaGrad = ctx.createRadialGradient(
        currentSunX,
        currentSunY,
        sunRadius * 0.88,
        currentSunX,
        currentSunY,
        sunRadius * 1.25
      );
      midCoronaGrad.addColorStop(0, 'rgba(254, 240, 138, 0.75)');
      midCoronaGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.55)');
      midCoronaGrad.addColorStop(0.7, 'rgba(220, 38, 38, 0.20)');
      midCoronaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = midCoronaGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. Radiant Coronal Sunbeams / Light Shafts
      const rayCount = 7;
      for (let i = 0; i < rayCount; i++) {
        const rayAngle = (i / (rayCount - 1) - 0.5) * 1.1; // Fanning upward
        const rayWobble = Math.sin(time * 1.2 + i * 1.5) * 0.04;
        const finalAngle = rayAngle + rayWobble - Math.PI / 2;

        const rayGrad = ctx.createLinearGradient(
          currentSunX,
          currentSunY - sunRadius,
          currentSunX + Math.cos(finalAngle) * sunRadius * 0.9,
          currentSunY + Math.sin(finalAngle) * sunRadius * 0.9
        );
        rayGrad.addColorStop(0, 'rgba(253, 224, 71, 0.22)');
        rayGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.08)');
        rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.moveTo(currentSunX, currentSunY - sunRadius);
        ctx.arc(currentSunX, currentSunY, sunRadius * 1.35, finalAngle - 0.08, finalAngle + 0.08);
        ctx.closePath();
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }

      ctx.restore();

      // 5. Coronal Prominence Flare Loops (Fiery Plasma Arcs)
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      flares.forEach((flare) => {
        const pulse = Math.sin(time * flare.speed + flare.phase);
        const flareHeight = flare.baseHeight + pulse * 12;

        const baseAngle = -Math.PI / 2 + flare.angleOffset;
        const angleSpread = 0.06;

        const startX = currentSunX + Math.cos(baseAngle - angleSpread) * sunRadius;
        const startY = currentSunY + Math.sin(baseAngle - angleSpread) * sunRadius;

        const endX = currentSunX + Math.cos(baseAngle + angleSpread) * sunRadius;
        const endY = currentSunY + Math.sin(baseAngle + angleSpread) * sunRadius;

        // Control point extending outward into space
        const cpX = currentSunX + Math.cos(baseAngle) * (sunRadius + flareHeight);
        const cpY = currentSunY + Math.sin(baseAngle) * (sunRadius + flareHeight);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.lineWidth = 3.5 + pulse * 1.5;
        ctx.strokeStyle = pulse > 0 ? '#fde047' : '#f97316';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 18;
        ctx.stroke();
      });
      ctx.restore();

      // 6. Main Blazing Solar Sphere (Photosphere)
      ctx.save();
      ctx.beginPath();
      ctx.arc(currentSunX, currentSunY, sunRadius, 0, Math.PI * 2);
      ctx.closePath();

      // Multi-stop fiery plasma core gradient
      const sunGrad = ctx.createRadialGradient(
        currentSunX,
        currentSunY - sunRadius * 0.15,
        sunRadius * 0.25,
        currentSunX,
        currentSunY,
        sunRadius
      );
      // Bright white-hot solar core
      sunGrad.addColorStop(0, '#ffffff');
      sunGrad.addColorStop(0.35, '#fffbeb');
      sunGrad.addColorStop(0.65, '#fef08a');
      sunGrad.addColorStop(0.85, '#f59e0b');
      sunGrad.addColorStop(0.96, '#ea580c');
      sunGrad.addColorStop(1, '#991b1b');

      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Dynamic animated plasma surface waves along the upper horizon rim
      ctx.globalCompositeOperation = 'lighter';
      const wavePoints = 48;
      ctx.beginPath();
      for (let i = 0; i <= wavePoints; i++) {
        const norm = i / wavePoints;
        const angle = Math.PI + norm * Math.PI; // Upper semicircle
        const noise =
          Math.sin(norm * 14 + time * 3.2) * 3.5 +
          Math.sin(norm * 28 - time * 2.1) * 2.0 +
          Math.sin(norm * 44 + time * 4.5) * 1.2;

        const r = sunRadius + noise;
        const px = currentSunX + Math.cos(angle) * r;
        const py = currentSunY + Math.sin(angle) * r;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 16;
      ctx.stroke();

      // Intense Solar Limb Rim Light
      const rimGrad = ctx.createRadialGradient(
        currentSunX,
        currentSunY,
        sunRadius * 0.94,
        currentSunX,
        currentSunY,
        sunRadius * 1.02
      );
      rimGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      rimGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.85)');
      rimGrad.addColorStop(0.85, 'rgba(249, 115, 22, 0.5)');
      rimGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rimGrad;
      ctx.fill();

      ctx.restore();

      // 7. Rising Solar Ember Particles (Drifting up towards headline & CTA)
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      particles.forEach((p, idx) => {
        p.life += 1;
        p.y += p.vy;
        p.x += p.vx + Math.sin(time * 3 + p.wobbleOffset) * 0.45;

        // Reset particle when its life ends or it travels off screen
        if (p.life >= p.maxLife || p.y < height * 0.2) {
          particles[idx] = createParticle();
          return;
        }

        const progress = p.life / p.maxLife;
        // Fade in quickly, then gently fade out
        const alpha =
          progress < 0.2
            ? progress / 0.2
            : 1 - (progress - 0.2) / 0.8;

        const color =
          p.colorType > 0.6
            ? `rgba(255, 250, 220, ${alpha * 0.9})`
            : p.colorType > 0.3
            ? `rgba(253, 224, 71, ${alpha * 0.85})`
            : `rgba(249, 115, 22, ${alpha * 0.75})`;

        ctx.fillStyle = color;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.4), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (parentEl) {
        parentEl.removeEventListener('pointermove', handlePointerMove);
        parentEl.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ display: 'block' }}
    />
  );
}

