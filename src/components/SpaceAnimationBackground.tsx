'use client'

import React, { useEffect, useRef } from 'react';

interface SpaceAnimationBackgroundProps {
  className?: string;
}

const SpaceAnimationBackground: React.FC<SpaceAnimationBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext('2d');
    if (!c) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const center = { x: canvas.width / 2, y: canvas.height / 2 };

    // Circle constructor
    function Circle(x: number, y: number, radius: number, fillColor: string) {
      if (!c) return;
      c.beginPath();
      c.arc(x, y, radius, 0, Math.PI * 2, false);
      c.fillStyle = fillColor;
      c.fill();
    }

    // Cloud class
    class Cloud {
      x: number;
      y: number;
      dx: number;
      cloudWidth: number;
      cloudLength: number;

      constructor(x: number, y: number, dx: number, cloudWidth: number, cloudLength: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.cloudWidth = cloudWidth;
        this.cloudLength = cloudLength;
      }

      draw() {
        if (!c) return;
        c.save();
        c.beginPath();
        c.arc(center.x, center.y, 120, 0, Math.PI * 2, false);
        c.clip();
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineCap = 'round';
        c.lineWidth = this.cloudWidth;
        c.lineTo(this.x + this.cloudLength, this.y);
        c.strokeStyle = 'white';
        c.stroke();
        c.restore();
      }

      update() {
        if (this.x < (center.x - 240)) {
          this.x = center.x + 240;
        }
        this.x -= this.dx;
        this.draw();
      }
    }

    // ShootingStar class
    class ShootingStar {
      x: number;
      y: number;
      dx: number;
      dy: number;
      radius: number;
      color: string;

      constructor(x: number, y: number, dx: number, dy: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
      }

      draw() {
        if (!c) return;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.closePath();
        c.fillStyle = this.color;
        c.fill();
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }

      reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dx = (Math.random() - 0.5) * 10;
        this.dy = (Math.random() - 0.5) * 10;
        this.radius = (Math.random() * 2) + 1;
      }
    }

    // Land class
    class Land {
      x: number;
      y: number;
      dx: number;
      landWidth: number;
      landLength: number;

      constructor(x: number, y: number, dx: number, landWidth: number, landLength: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.landWidth = landWidth;
        this.landLength = landLength;
      }

      draw() {
        if (!c) return;
        c.save();
        c.beginPath();
        c.arc(center.x, center.y, 120, 0, Math.PI * 2, false);
        c.clip();
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineCap = 'round';
        c.lineWidth = this.landWidth;
        c.lineTo(this.x + this.landLength, this.y);
        c.strokeStyle = '#85cc66';
        c.stroke();
        c.restore();
      }

      update() {
        if (this.x < (center.x - 240)) {
          this.x = center.x + 240;
        }
        this.x -= this.dx;
        this.draw();
      }
    }

    // SemiCircle function
    function SemiCircle(x: number, y: number, radius: number, fillColor: string) {
      if (!c) return;
      c.beginPath();
      c.arc(x, y, radius, Math.PI * 1.5, 1.5, false);
      c.fillStyle = fillColor;
      c.fill();
    }

    // Star function
    function Star(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
      if (!c) return;
      const rot = Math.PI / 2 * 3;
      const step = Math.PI / spikes;
      let currentRot = rot;

      c.strokeStyle = "#000";
      c.beginPath();
      c.moveTo(cx, cy - outerRadius);
      
      for (let i = 0; i < spikes; i++) {
        let x = cx + Math.cos(currentRot) * outerRadius;
        let y = cy + Math.sin(currentRot) * outerRadius;
        c.lineTo(x, y);
        currentRot += step;

        x = cx + Math.cos(currentRot) * innerRadius;
        y = cy + Math.sin(currentRot) * innerRadius;
        c.lineTo(x, y);
        currentRot += step;
      }
      
      c.lineTo(cx, cy - outerRadius);
      c.closePath();
      c.lineWidth = 5;
      c.strokeStyle = 'rgb(32, 66, 136)';
      c.stroke();
      c.fillStyle = 'skyblue';
      c.fill();
    }

    // Initial object arrays
    const earthWidth = 120;
    const planets: Array<{x: number, y: number, radius: number, fillColor: string}> = [];
    const clouds: Cloud[] = [];
    const land: Land[] = [];
    const stars: Array<{x: number, y: number, spikes: number, outerRadius: number, innerRadius: number}> = [];

    // Utility functions
    function sample(samples: Array<{x: number, y: number}>) {
      if (!canvas) return [0, 0];
      let bestCandidate: [number, number] = [0, 0];
      let bestDistance = 0;
      
      for (let i = 0; i < 20; ++i) {
        const candidate: [number, number] = [Math.random() * canvas.width, Math.random() * canvas.height];
        const d = distance(findClosest(samples, candidate), candidate);
        if (d > bestDistance) {
          bestDistance = d;
          bestCandidate = candidate;
        }
      }
      return bestCandidate;
    }

    function earthMask(samples: Array<{x: number, y: number}>) {
      if (!canvas) return [0, 0];
      let bestCandidate: [number, number] = [0, 0];
      let bestDistance = 0;
      
      for (let i = 0; i < 20; ++i) {
        const candidate: [number, number] = [
          Math.floor(Math.random() * ((center.x + 240) - (center.x - 240) + 1)) + (center.x - 240),
          Math.floor(Math.random() * ((center.y + 120) - (center.y - 120) + 1)) + (center.y - 120)
        ];
        const d = distance(findClosest(samples, candidate), candidate);
        if (d > bestDistance) {
          bestDistance = d;
          bestCandidate = candidate;
        }
      }
      return bestCandidate;
    }

    function distance(a: {x: number, y: number}, b: [number, number]) {
      const dx = a.x - b[0];
      const dy = a.y - b[1];
      return Math.sqrt(dx * dx + dy * dy);
    }

    function findClosest(points: Array<{x: number, y: number}>, b: [number, number]) {
      let distance: number | null = null;
      let closestPoint = points[0] || {x: 0, y: 0};
      
      for (let i = 0; i < points.length; ++i) {
        const dx = points[i].x - b[0];
        const dy = points[i].y - b[1];
        const currentDistance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === null || distance > currentDistance) {
          distance = currentDistance;
          closestPoint = points[i];
        }
      }
      return closestPoint;
    }

    // Generate elements
    function drawPlanets(count: number) {
      for (let i = 0; i <= count; ++i) {
        const bestLocation = sample(planets);
        planets.push({
          x: bestLocation[0],
          y: bestLocation[1],
          radius: Math.random() * 5,
          fillColor: 'rgb(32, 66, 136)'
        });
      }
    }

    function drawStars(count: number) {
      for (let i = 0; i <= count; ++i) {
        const bestLocation = sample(stars);
        stars.push({
          x: bestLocation[0],
          y: bestLocation[1],
          spikes: 4,
          outerRadius: Math.floor(Math.random() * 4) + 2,
          innerRadius: 1
        });
      }
    }

    function drawClouds(count: number) {
      for (let i = 0; i <= count; ++i) {
        const bestLocation = earthMask(clouds);
        const cloudWidth = Math.floor(Math.random() * 20) + 5;
        const cloudLength = Math.floor(Math.random() * 30) + 18;
        const dx = (Math.random() + 0.2) * 1;
        clouds.push(new Cloud(bestLocation[0], bestLocation[1], dx, cloudWidth, cloudLength));
      }
    }

    function drawLand(count: number) {
      for (let i = 0; i <= count; ++i) {
        const bestLocation = earthMask(land);
        const landWidth = Math.floor(Math.random() * 25) + 10;
        const landLength = Math.floor(Math.random() * 30) + 18;
        const dx = 0.5;
        land.push(new Land(bestLocation[0], bestLocation[1], dx, landWidth, landLength));
      }
    }

    // Generate elements
    drawPlanets(50);
    drawStars(20);
    drawClouds(25);
    drawLand(15);

    // Shooting stars
    const shootingStar = new ShootingStar(10, 10, 8, 8, 2, '#2c62c2');
    const shootingStar2 = new ShootingStar(400, 300, -8, 8, 2, '#2c62c2');

    const resetShootingStar = () => shootingStar.reset();
    const resetShootingStar2 = () => shootingStar2.reset();

    const interval1 = setInterval(resetShootingStar, 3000);
    const interval2 = setInterval(resetShootingStar2, 5000);

    // Animation loop
    function animate() {
      if (!canvas || !c) return;
      
      // Clear canvas with semi-transparent background
      c.fillStyle = 'rgba(11, 21, 56, 0.3)';
      c.fillRect(0, 0, canvas.width, canvas.height);

      // Update shooting stars
      shootingStar.update();
      shootingStar2.update();

      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        Star(stars[i].x, stars[i].y, stars[i].spikes, stars[i].outerRadius, stars[i].innerRadius);
      }

      // Draw planets
      for (let i = 0; i < planets.length; i++) {
        Circle(planets[i].x, planets[i].y, planets[i].radius, planets[i].fillColor);
      }

      // Draw rings and earth
      Circle(center.x, center.y, 245, 'rgba(10, 23, 66, 0.5)');
      Circle(center.x, center.y, 215, 'rgba(9, 30, 75, 0.5)');
      Circle(center.x, center.y, 175, 'rgba(8, 34, 83, 0.5)');
      Circle(center.x, center.y, 135, 'rgb(12, 20, 56)');
      Circle(center.x, center.y, earthWidth, 'rgb(25, 118, 181)');

      // Update land and clouds
      for (let i = 1; i < land.length; i++) {
        land[i].update();
      }
      for (let i = 1; i < clouds.length; i++) {
        clouds[i].update();
      }

      // Draw semi-circle shadow
      SemiCircle(center.x, center.y, earthWidth, 'rgba(0, 0, 0, 0.4)');

      requestAnimationFrame(animate);
    }

    animate();

    // Cleanup
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background: 'rgb(11, 21, 56)' }}
    />
  );
};

export default SpaceAnimationBackground;