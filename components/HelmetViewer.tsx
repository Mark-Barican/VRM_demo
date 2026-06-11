'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HelmetViewerProps {
  autoRotate?: boolean;
  className?: string;
  color?: number;
}

export default function HelmetViewer({
  autoRotate = true,
  className = '',
  color = 0x5A1010, // deep maroon default
}: HelmetViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene ────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    const w = mount.clientWidth;
    const h = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0.3, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.localClippingEnabled = true;
    mount.appendChild(renderer.domElement);
    // Let our handlers own every touch gesture (rotate / pinch) so the browser
    // doesn't scroll the page or pinch-zoom the viewport while you fiddle.
    renderer.domElement.style.touchAction = 'none';

    // ── Lighting ─────────────────────────────────────────────────────────────
    // Warm key light (from upper front)
    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.2);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Gold rim light from side
    const rimLight = new THREE.DirectionalLight(0xD4A832, 1.2);
    rimLight.position.set(-4, 2, -2);
    scene.add(rimLight);

    // Soft fill from below-front
    const fillLight = new THREE.PointLight(0xffeedd, 0.6);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Ambient
    scene.add(new THREE.AmbientLight(0xfff8f0, 0.5));

    // ── Materials ─────────────────────────────────────────────────────────────
    const shellColor = color;

    const shellMat = new THREE.MeshStandardMaterial({
      color: shellColor,
      metalness: 0.4,
      roughness: 0.25,
      envMapIntensity: 1.0,
    });

    const linerMat = new THREE.MeshStandardMaterial({
      color: 0xE8DEC8, // aged cream liner
      metalness: 0.0,
      roughness: 0.95,
    });

    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xD4A832,
      metalness: 0.95,
      roughness: 0.08,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xC8C0A8,
      metalness: 1.0,
      roughness: 0.05,
    });

    const darkRubberMat = new THREE.MeshStandardMaterial({
      color: 0x1A0F07,
      metalness: 0.0,
      roughness: 0.9,
    });

    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x3A1A0A,
      metalness: 0.0,
      roughness: 0.85,
    });

    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x0D0804,
      metalness: 0.1,
      roughness: 0.0,
      transparent: true,
      opacity: 0.82,
    });

    // ── Helmet Group ──────────────────────────────────────────────────────────
    const group = new THREE.Group();

    // ── Profile points for LatheGeometry (X = radius, Y = height) ────────────
    // Models an open-face retro scooter helmet (like Biltwell Gringo / Bell 500)
    // Points go from bottom rim to apex
    const profile: THREE.Vector2[] = [
      new THREE.Vector2(0.58, -0.88),  // bottom rim edge
      new THREE.Vector2(0.72, -0.80),  // bottom rim outer
      new THREE.Vector2(0.90, -0.60),  // lower flare
      new THREE.Vector2(1.00, -0.30),  // lower side
      new THREE.Vector2(1.04, 0.02),   // widest (ear level)
      new THREE.Vector2(1.01, 0.32),   // upper side
      new THREE.Vector2(0.88, 0.62),   // upper shoulder
      new THREE.Vector2(0.65, 0.85),   // near crown
      new THREE.Vector2(0.32, 0.98),   // crown shoulder
      new THREE.Vector2(0.08, 1.03),   // apex
    ];

    // ── Shell (LatheGeometry, 3/4 revolution — face opening at front/+Z) ─────
    // In Three.js LatheGeometry:  at phi=0 → faces +Z (toward camera at z=4)
    // We leave 90° open at front: gap from phi=-PI/4 to phi=PI/4
    // Shell: phiStart=PI/4, phiLength=3*PI/2 (270°)
    const shellGeo = new THREE.LatheGeometry(
      profile,
      72,
      Math.PI / 4,      // phiStart
      (3 * Math.PI) / 2  // phiLength = 270°
    );
    const shell = new THREE.Mesh(shellGeo, shellMat);
    shell.castShadow = true;
    group.add(shell);

    // ── Inner liner (full sphere — visible through face opening) ──────────────
    const linerGeo = new THREE.LatheGeometry(
      profile.map(p => new THREE.Vector2(p.x * 0.91, p.y * 0.97 + 0.02)),
      48,
      0,
      Math.PI * 2
    );
    const liner = new THREE.Mesh(linerGeo, linerMat);
    group.add(liner);

    // ── Face opening trim (tube following the cut edge) ───────────────────────
    // The cut edge of the LatheGeometry at phi=PI/4 and phi=PI/4+3*PI/2=7*PI/4
    // In Three.js LatheGeometry convention:
    //   vertex.x = profile.x * sin(phi)
    //   vertex.z = profile.x * cos(phi)
    // At phi=PI/4: sin=cos=0.7071
    // At phi=7*PI/4: sin=-0.7071, cos=0.7071

    const s45 = Math.sin(Math.PI / 4);  // 0.7071
    const c45 = Math.cos(Math.PI / 4);  // 0.7071

    // Build closed face-opening rim path
    // Right edge: profile from bottom to top at phi=PI/4
    const rightEdge = profile.map(
      p => new THREE.Vector3(p.x * s45, p.y, p.x * c45)
    );
    // Left edge: profile from top to bottom at phi=7*PI/4 (mirror of right)
    const leftEdge = [...profile].reverse().map(
      p => new THREE.Vector3(-p.x * s45, p.y, p.x * c45)
    );

    // Connect with smooth arcs at top and bottom
    // Top center: apex of profile (0, 1.03, 0.08*c45) — just a midpoint
    const topCenter = new THREE.Vector3(0, profile[profile.length - 1].y + 0.01, profile[profile.length - 1].x * c45);
    // Bottom center: rim of profile
    const botCenter = new THREE.Vector3(0, profile[0].y - 0.01, profile[0].x * c45 * 0.85);

    const rimPoints: THREE.Vector3[] = [
      ...rightEdge,
      topCenter,
      ...leftEdge,
      botCenter,
    ];

    const rimCurve = new THREE.CatmullRomCurve3(rimPoints, true);
    const rimTube = new THREE.TubeGeometry(rimCurve, 128, 0.028, 8, true);
    const rim = new THREE.Mesh(rimTube, goldTrimMat);
    group.add(rim);

    // ── Bottom rubber seal ring ────────────────────────────────────────────────
    const sealRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.74, 0.03, 10, 64),
      darkRubberMat
    );
    sealRing.rotation.x = Math.PI / 2;
    sealRing.position.y = -0.82;
    group.add(sealRing);

    // ── Visor peak (small flat brim at top-front of helmet) ────────────────────
    // A thin curved visor using CylinderGeometry arc
    const peakGeo = new THREE.CylinderGeometry(
      1.06, 1.06,       // radii
      0.05,             // height
      64, 1,
      false,
      -0.38, 0.76       // phiStart, phiLength (~44 degree arc centered at front)
    );
    const peak = new THREE.Mesh(peakGeo, shellMat);
    peak.position.set(0, 0.55, 0);
    group.add(peak);

    // Peak trim
    const peakTrimGeo = new THREE.CylinderGeometry(
      1.085, 1.085,
      0.02,
      64, 1,
      false,
      -0.40, 0.80
    );
    const peakTrim = new THREE.Mesh(peakTrimGeo, goldTrimMat);
    peakTrim.position.set(0, 0.55, 0);
    group.add(peakTrim);

    // ── Visor / eye shield (flat tinted lens) ─────────────────────────────────
    // A curved plane in front of the face opening
    const visorGeo = new THREE.CylinderGeometry(
      0.96, 0.96,
      0.38,
      48, 1,
      false,
      -0.30, 0.60
    );
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.18, 0);
    group.add(visor);

    // Visor chrome frame
    const vFrameTop = new THREE.Mesh(
      new THREE.CylinderGeometry(0.97, 0.97, 0.025, 48, 1, false, -0.32, 0.64),
      chromeMat
    );
    vFrameTop.position.set(0, 0.375, 0);
    group.add(vFrameTop);

    const vFrameBot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.97, 0.97, 0.025, 48, 1, false, -0.32, 0.64),
      chromeMat
    );
    vFrameBot.position.set(0, -0.013, 0);
    group.add(vFrameBot);

    // ── VRM Badge on forehead ─────────────────────────────────────────────────
    // Gold disc
    const badgeBack = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 0.025, 32),
      goldTrimMat
    );
    badgeBack.position.set(0, 0.52, 0.97);
    badgeBack.rotation.x = Math.PI / 2;
    group.add(badgeBack);

    // Badge face (slightly raised)
    const badgeFront = new THREE.Mesh(
      new THREE.CylinderGeometry(0.10, 0.10, 0.01, 32),
      new THREE.MeshStandardMaterial({ color: shellColor, metalness: 0.6, roughness: 0.2 })
    );
    badgeFront.position.set(0, 0.52, 0.982);
    badgeFront.rotation.x = Math.PI / 2;
    group.add(badgeFront);

    // ── Chin strap hardware (D-rings on sides) ─────────────────────────────────
    [-0.78, 0.78].forEach((xPos) => {
      const dRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.06, 0.012, 8, 24),
        chromeMat
      );
      dRing.position.set(xPos, -0.78, 0.4);
      dRing.rotation.y = Math.PI / 4;
      group.add(dRing);
    });

    // ── Chin strap (leather strap across bottom) ──────────────────────────────
    const strapCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.75, -0.82, 0.38),
      new THREE.Vector3(-0.35, -0.88, 0.65),
      new THREE.Vector3(0, -0.90, 0.70),
      new THREE.Vector3(0.35, -0.88, 0.65),
      new THREE.Vector3(0.75, -0.82, 0.38),
    ]);
    const strapTube = new THREE.TubeGeometry(strapCurve, 48, 0.022, 6, false);
    const strap = new THREE.Mesh(strapTube, leatherMat);
    group.add(strap);

    // ── Ventilation slots on crown (3 chrome strips) ──────────────────────────
    [-0.12, 0, 0.12].forEach((xOffset) => {
      const vent = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.18, 0.03),
        chromeMat
      );
      vent.position.set(xOffset, 0.85, 0.58);
      vent.rotation.x = -0.3;
      group.add(vent);
    });

    scene.add(group);

    // ── Soft shadow disc ──────────────────────────────────────────────────────
    const shadowGeo = new THREE.CircleGeometry(1.0, 48);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.12,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.05;
    group.add(shadowMesh);

    // ── Interaction ───────────────────────────────────────────────────────────
    let isDragging = false;
    let prevX = 0, prevY = 0;
    let rotY = 0, rotX = 0;
    let spinning = autoRotate;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    // Move the camera in/out within bounds — shared by wheel and pinch zoom.
    const zoom = (delta: number) => {
      camera.position.z = Math.max(2.5, Math.min(7, camera.position.z + delta));
    };

    const startDrag = (x: number, y: number) => {
      isDragging = true;
      prevX = x; prevY = y;
      spinning = false;
      if (idleTimer) clearTimeout(idleTimer);
    };
    const moveDrag = (x: number, y: number) => {
      if (!isDragging) return;
      rotY += (x - prevX) * 0.01;
      rotX = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, rotX + (y - prevY) * 0.01));
      prevX = x; prevY = y;
    };
    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      if (autoRotate) idleTimer = setTimeout(() => { spinning = true; }, 2000);
    };

    const onMouseDown = (e: MouseEvent) => startDrag(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX, e.clientY);
    const onMouseUp = () => endDrag();

    // ── Touch: one finger rotates, two fingers pinch to zoom ──────────────────
    let isPinching = false;
    let pinchPrevDist = 0;
    const pinchDistance = (t: TouchList) =>
      Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length >= 2) {
        isPinching = true;
        isDragging = false;
        spinning = false;
        if (idleTimer) clearTimeout(idleTimer);
        pinchPrevDist = pinchDistance(e.touches);
      } else if (e.touches.length === 1) {
        isPinching = false;
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isPinching && e.touches.length >= 2) {
        e.preventDefault();
        const dist = pinchDistance(e.touches);
        // Fingers apart (dist grows) → move camera closer → zoom in.
        zoom((pinchPrevDist - dist) * 0.01);
        pinchPrevDist = dist;
      } else if (isDragging && e.touches.length === 1) {
        // Claim the gesture so the page can't scroll while turning the helmet.
        e.preventDefault();
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        isPinching = false;
        endDrag();
      } else if (e.touches.length === 1) {
        // Lifted one finger of a pinch — resume rotating with the other.
        isPinching = false;
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoom(e.deltaY * 0.008);
    };

    mount.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    // touchmove must be non-passive so preventDefault() can block page scroll;
    // bound to `mount` so it's scoped to the canvas, not the whole window.
    mount.addEventListener('touchstart', onTouchStart, { passive: true });
    mount.addEventListener('touchmove', onTouchMove, { passive: false });
    mount.addEventListener('touchend', onTouchEnd);
    mount.addEventListener('wheel', onWheel, { passive: false });

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Render loop ───────────────────────────────────────────────────────────
    let raf: number;
    let lastTime = 0;

    const animate = (t: number) => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min((t - lastTime) / 1000, 0.1);
      lastTime = t;
      if (spinning) rotY += 0.4 * dt;
      group.rotation.y = rotY;
      group.rotation.x = rotX;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      if (idleTimer) clearTimeout(idleTimer);
      mount.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      mount.removeEventListener('touchstart', onTouchStart);
      mount.removeEventListener('touchmove', onTouchMove);
      mount.removeEventListener('touchend', onTouchEnd);
      mount.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [autoRotate, color]);

  return <div ref={mountRef} className={`w-full h-full touch-none cursor-grab active:cursor-grabbing ${className}`} />;
}
