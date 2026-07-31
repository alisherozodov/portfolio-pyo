import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { WebGLShapeType, WebGLPalette } from '../types';

interface ThreeCanvasProps {
  shape: WebGLShapeType;
  palette: WebGLPalette;
  mouseSensitivity?: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ shape, palette, mouseSensitivity = 1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Get color gradient based on selected palette
  const getPaletteColors = (pal: WebGLPalette): { primary: THREE.Color; secondary: THREE.Color } => {
    switch (pal) {
      case 'solarFlare':
        return { primary: new THREE.Color(0xf59e0b), secondary: new THREE.Color(0xd97706) };
      case 'emeraldMatrix':
        return { primary: new THREE.Color(0x8c734b), secondary: new THREE.Color(0xd4af37) };
      case 'deepViolet':
        return { primary: new THREE.Color(0xd4af37), secondary: new THREE.Color(0x78716c) };
      case 'midnightCyber':
      default:
        return { primary: new THREE.Color(0xA58B5E), secondary: new THREE.Color(0xd4af37) };
    }
  };

  // Generate geometry based on selected shape
  const generateGeometry = (type: WebGLShapeType): THREE.BufferGeometry => {
    const count = 3500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const { primary, secondary } = getPaletteColors(palette);

    for (let i = 0; i < count; i++) {
      let x = 0, y = 0, z = 0;

      if (type === 'particleField') {
        x = (Math.random() - 0.5) * 12;
        y = (Math.random() - 0.5) * 12;
        z = (Math.random() - 0.5) * 12;
      } else if (type === 'quantumKnot') {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const p = 2, q = 3;
        const r = 2.5 + 0.8 * Math.cos(q * u);
        x = r * Math.cos(p * u) + (Math.random() - 0.5) * 0.4;
        y = r * Math.sin(p * u) + (Math.random() - 0.5) * 0.4;
        z = 0.8 * Math.sin(q * u) + (Math.random() - 0.5) * 0.4;
      } else if (type === 'torusMesh') {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = 3.2;
        const r = 1.2;
        x = (R + r * Math.cos(v)) * Math.cos(u) + (Math.random() - 0.5) * 0.2;
        y = (R + r * Math.cos(v)) * Math.sin(u) + (Math.random() - 0.5) * 0.2;
        z = r * Math.sin(v) + (Math.random() - 0.5) * 0.2;
      } else if (type === 'cyberLattice') {
        const side = Math.cbrt(count);
        const step = 0.45;
        const ix = i % side;
        const iy = Math.floor(i / side) % side;
        const iz = Math.floor(i / (side * side));
        x = (ix - side / 2) * step + (Math.random() - 0.5) * 0.1;
        y = (iy - side / 2) * step + (Math.random() - 0.5) * 0.1;
        z = (iz - side / 2) * step + (Math.random() - 0.5) * 0.1;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color interpolation
      const mixRatio = Math.random();
      const mixedColor = primary.clone().lerp(secondary, mixRatio);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 0.08 + 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    return geometry;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // Particle Shader Material
    const geometry = generateGeometry(shape);
    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
    scene.add(points);

    // Mouse Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current.targetX = x * 0.8 * mouseSensitivity;
        mouseRef.current.targetY = y * 0.8 * mouseSensitivity;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer for perfect responsiveness
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (pointsRef.current) {
        pointsRef.current.rotation.y = elapsedTime * 0.12 + mouseRef.current.x * 0.5;
        pointsRef.current.rotation.x = elapsedTime * 0.08 + mouseRef.current.y * 0.5;
        pointsRef.current.position.y = Math.sin(elapsedTime * 0.8) * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update geometry & colors when shape or palette changes
  useEffect(() => {
    if (pointsRef.current) {
      pointsRef.current.geometry.dispose();
      pointsRef.current.geometry = generateGeometry(shape);
    }
  }, [shape, palette]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0" />
  );
};
