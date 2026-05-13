import { useEffect, useRef } from "react";
import * as THREE from "three";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function getThemeConfig(isDark) {
  if (isDark) {
    return {
      fogColor: 0x030014,
      fogDensity: 0.02,
      hemiSky: 0x202038,
      hemiGround: 0x001020,
      hemiIntensity: 0.6,
      dirIntensity: 0.5,
      particleColor: 0x00f0ff,
      particleSize: 0.048,
      particleOpacity: 1,
      neonLightColor: 0xff00ff,
      neonLightIntensity: 2.8,
      trailColor: 0x00f0ff,
      trailOpacity: 1,
      trailSizeMult: 1,
      lightningColor: 0x00f3ff,
    };
  }

  return {
    fogColor: 0xdbe5f5,
    fogDensity: 0.006,
    hemiSky: 0xf0f4ff,
    hemiGround: 0xa8c4f0,
    hemiIntensity: 0.5,
    dirIntensity: 0.4,
    particleColor: 0x1e40af,
    particleSize: 0.065,
    particleOpacity: 1,
    neonLightColor: 0x6366f1,
    neonLightIntensity: 4,
    trailColor: 0x4338ca,
    trailOpacity: 1,
    trailSizeMult: 1.1,
    lightningColor: 0x3730a3,
  };
}

function lerpColor(colorObj, targetHex, t) {
  const target = new THREE.Color(targetHex);
  colorObj.lerp(target, t);
}

export default function NeonBackground({ isDark, elevated }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const themeRef = useRef(getThemeConfig(isDark));
  const targetThemeRef = useRef(getThemeConfig(isDark));

  // Update target theme when isDark changes
  useEffect(() => {
    targetThemeRef.current = getThemeConfig(isDark);
  }, [isDark]);

  // Scene setup — runs once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const theme = getThemeConfig(themeRef.current === targetThemeRef.current ? isDark : isDark);
    themeRef.current = { ...theme };

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(theme.fogColor, theme.fogDensity);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 2.2, 6);

    const hemi = new THREE.HemisphereLight(theme.hemiSky, theme.hemiGround, theme.hemiIntensity);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, theme.dirIntensity);
    dir.position.set(5, 10, 5);
    scene.add(dir);

    const particleCount = 2400;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 40;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 40;
    }

    // Generate star-shaped particle texture
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 64;
    starCanvas.height = 64;
    const ctx = starCanvas.getContext("2d");
    const cx = 32;
    const cy = 32;
    const spikes = 4;
    const outerR = 30;
    const innerR = 6;
    ctx.clearRect(0, 0, 64, 64);
    // Outer glow
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 12;
    // Draw twice for stronger fill
    for (let pass = 0; pass < 2; pass++) {
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (Math.PI * i) / spikes - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: theme.particleColor,
      size: theme.particleSize * 2.5,
      transparent: true,
      opacity: theme.particleOpacity,
      map: starTexture,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    const neonLight = new THREE.PointLight(theme.neonLightColor, theme.neonLightIntensity, 40);
    neonLight.position.set(0, 4, 6);
    scene.add(neonLight);

    const trailPool = [];
    const poolSize = 500;
    const fadeIntervals = new Set();

    for (let index = 0; index < poolSize; index += 1) {
      const geometry = new THREE.SphereGeometry(0.02, 8, 6);
      const material = new THREE.MeshBasicMaterial({
        color: theme.trailColor,
        transparent: true,
        opacity: theme.trailOpacity,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      scene.add(mesh);
      trailPool.push(mesh);
    }

    let poolIndex = 0;
    const emitTrail = (pos, size = 0.03, life = 420) => {
      const current = themeRef.current;
      const mesh = trailPool[poolIndex % poolSize];
      poolIndex += 1;
      mesh.position.copy(pos);
      mesh.scale.setScalar(size);
      mesh.material.opacity = current.trailOpacity;
      mesh.visible = true;

      const start = performance.now();
      const intervalId = window.setInterval(() => {
        const t = (performance.now() - start) / life;
        if (t >= 1) {
          mesh.visible = false;
          window.clearInterval(intervalId);
          fadeIntervals.delete(intervalId);
        } else {
          mesh.material.opacity = current.trailOpacity * (1 - t);
        }
      }, 60);
      fadeIntervals.add(intervalId);
    };

    const lightningGroup = new THREE.Group();
    scene.add(lightningGroup);

    const spawnLightningAt = (worldPos, intensity = 1) => {
      const current = themeRef.current;
      const segments = Math.floor(Math.random() * 5) + 4;
      const points = [];

      for (let index = 0; index < segments; index += 1) {
        const t = index / (segments - 1);
        points.push(
          new THREE.Vector3(
            worldPos.x + (Math.random() - 0.5) * 0.6 * (1 + t),
            worldPos.y - t * (1.2 + Math.random() * 1.4),
            worldPos.z + (Math.random() - 0.5) * 0.6 * (1 + t),
          ),
        );
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: current.lightningColor,
        transparent: true,
        opacity: 0.95 * intensity,
      });
      const line = new THREE.Line(geometry, material);
      lightningGroup.add(line);

      for (let index = 0; index < Math.floor(Math.random() * 4) + 3; index += 1) {
        const pointIndex = Math.floor(Math.random() * points.length);
        const point = points[pointIndex];
        emitTrail(
          new THREE.Vector3(
            point.x + Math.random() * 0.04 - 0.02,
            point.y + Math.random() * 0.04 - 0.02,
            point.z + Math.random() * 0.04 - 0.02,
          ),
          0.013 * current.trailSizeMult,
          240 + Math.random() * 260,
        );
      }

      const start = performance.now();
      const life = 220 + Math.random() * 380;
      const fade = () => {
        const t = (performance.now() - start) / life;
        if (t >= 1) {
          lightningGroup.remove(line);
          geometry.dispose();
          material.dispose();
        } else {
          material.opacity = 0.95 * (1 - t);
          requestAnimationFrame(fade);
        }
      };
      fade();
    };

    const mouseToWorld = (clientX, clientY, depth = 0.5) => {
      const nx = (clientX / window.innerWidth) * 2 - 1;
      const ny = -(clientY / window.innerHeight) * 2 + 1;
      return new THREE.Vector3(nx, ny, depth).unproject(camera);
    };

    let last = { x: 0, y: 0, t: 0 };
    let mouseTarget = { x: 0, y: 2.1 };

    const onMouseMove = (event) => {
      const current = themeRef.current;
      const pos = mouseToWorld(event.clientX, event.clientY, 0.45);

      for (let index = 0; index < Math.floor(rand(1, 3)); index += 1) {
        emitTrail(
          new THREE.Vector3(
            pos.x + rand(-0.02, 0.02),
            pos.y + rand(-0.02, 0.02),
            pos.z + rand(-0.02, 0.02),
          ),
          rand(0.02, 0.05) * current.trailSizeMult,
          380 + Math.random() * 200,
        );
      }

      const now = performance.now();
      const dx = Math.abs(event.clientX - last.x);
      const dy = Math.abs(event.clientY - last.y);
      const dt = Math.max(16, now - (last.t || now));
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;

      if (speed > 0.4 && Math.random() < Math.min(speed * 1.8, 0.85)) {
        spawnLightningAt(pos, Math.min(1.6, speed * 1.6));
      }

      last = { x: event.clientX, y: event.clientY, t: now };
      mouseTarget = {
        x: (event.clientX / window.innerWidth - 0.5) * 1.2,
        y: (0.5 - event.clientY / window.innerHeight) * 0.8 + 1.8,
      };
    };

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    sceneRef.current = {
      scene, camera, renderer, pGeo, pMat, particles, hemi, dir,
      neonLight, trailPool, fadeIntervals, lightningGroup,
    };

    const LERP_SPEED = 0.035;

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      // Smoothly transition theme properties
      const target = targetThemeRef.current;
      const current = themeRef.current;

      // Lerp numeric values
      current.fogDensity += (target.fogDensity - current.fogDensity) * LERP_SPEED;
      current.hemiIntensity += (target.hemiIntensity - current.hemiIntensity) * LERP_SPEED;
      current.dirIntensity += (target.dirIntensity - current.dirIntensity) * LERP_SPEED;
      current.particleOpacity += (target.particleOpacity - current.particleOpacity) * LERP_SPEED;
      current.particleSize += (target.particleSize - current.particleSize) * LERP_SPEED;
      current.neonLightIntensity += (target.neonLightIntensity - current.neonLightIntensity) * LERP_SPEED;
      current.trailOpacity += (target.trailOpacity - current.trailOpacity) * LERP_SPEED;
      current.trailSizeMult += (target.trailSizeMult - current.trailSizeMult) * LERP_SPEED;

      // Apply lerped values
      scene.fog.density = current.fogDensity;
      hemi.intensity = current.hemiIntensity;
      dir.intensity = current.dirIntensity;
      pMat.opacity = current.particleOpacity;
      pMat.size = current.particleSize * 2.5;
      neonLight.intensity = current.neonLightIntensity;

      // Lerp colors
      lerpColor(scene.fog.color, target.fogColor, LERP_SPEED);
      lerpColor(hemi.color, target.hemiSky, LERP_SPEED);
      lerpColor(hemi.groundColor, target.hemiGround, LERP_SPEED);
      lerpColor(pMat.color, target.particleColor, LERP_SPEED);
      lerpColor(neonLight.color, target.neonLightColor, LERP_SPEED);

      // Lerp trail colors on visible trails
      for (let i = 0; i < trailPool.length; i += 1) {
        if (trailPool[i].visible) {
          lerpColor(trailPool[i].material.color, target.trailColor, LERP_SPEED);
        }
      }

      // Update current hex values so new spawns use transitioning colors
      current.trailColor = target.trailColor;
      current.lightningColor = target.lightningColor;

      const posArr = pGeo.attributes.position.array;
      for (let index = 0; index < particleCount; index += 1) {
        const arrIndex = index * 3 + 2;
        posArr[arrIndex] += 0.0006 * (1 + Math.sin(performance.now() * 0.0001 + index));
        if (posArr[arrIndex] > 40) {
          posArr[arrIndex] = -40;
        }
      }
      pGeo.attributes.position.needsUpdate = true;

      camera.position.x += (mouseTarget.x - camera.position.x) * 0.03;
      camera.position.y += (mouseTarget.y - camera.position.y) * 0.03;
      camera.lookAt(0, 1.4, 0);
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);

      fadeIntervals.forEach((id) => window.clearInterval(id));
      fadeIntervals.clear();

      trailPool.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });

      lightningGroup.children.forEach((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          child.material.dispose();
        }
      });

      scene.remove(lightningGroup);
      pGeo.dispose();
      pMat.dispose();
      starTexture.dispose();
      renderer.dispose();
      sceneRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`neon-bg-layer${elevated ? " neon-bg-elevated" : ""}`} aria-hidden="true">
      <canvas ref={canvasRef} className="neon-bg-canvas" />
    </div>
  );
}
