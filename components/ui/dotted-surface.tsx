'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

/**
 * The project toggles a `.dark` class on <html> (see ThemeToggle), so we mirror
 * that here instead of depending on next-themes / a separate provider.
 */
function useIsDark() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const root = document.documentElement;
		const update = () => setIsDark(root.classList.contains('dark'));
		update();
		const observer = new MutationObserver(update);
		observer.observe(root, { attributes: true, attributeFilter: ['class'] });
		return () => observer.disconnect();
	}, []);

	return isDark;
}

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const isDark = useIsDark();

	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		particles: THREE.Points[];
		animationId: number;
		count: number;
	} | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const SEPARATION = 150;
		const AMOUNTX = 40;
		const AMOUNTY = 60;

		// Scene setup
		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		camera.position.set(0, 355, 1220);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(scene.fog.color, 0);

		containerRef.current.appendChild(renderer.domElement);

		// Brand gold accent — matches --v-accent per theme (light #B07B18 / dark #D4A832)
		const dotColor: [number, number, number] = isDark
			? [0.831, 0.659, 0.196]
			: [0.69, 0.482, 0.094];

		// Create particles
		const positions: number[] = [];
		const colors: number[] = [];

		// Create geometry for all particles
		const geometry = new THREE.BufferGeometry();

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const y = 0; // Will be animated
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

				positions.push(x, y, z);
				colors.push(...dotColor);
			}
		}

		geometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(positions, 3),
		);
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		// Create material
		const material = new THREE.PointsMaterial({
			size: 8,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
		});

		// Create points object
		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let count = 0;
		let animationId = 0;
		let cancelled = false;

		// Animation function
		const animate = () => {
			if (cancelled) return;
			animationId = requestAnimationFrame(animate);

			const positionAttribute = geometry.attributes.position;
			const positions = positionAttribute.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const index = i * 3;

					// Animate Y position with sine waves
					positions[index + 1] =
						Math.sin((ix + count) * 0.3) * 50 +
						Math.sin((iy + count) * 0.5) * 50;

					i++;
				}
			}

			positionAttribute.needsUpdate = true;

			renderer.render(scene, camera);
			count += 0.04;
		};

		// Handle window resize
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		// Start animation
		animate();

		// Store references
		sceneRef.current = {
			scene,
			camera,
			renderer,
			particles: [points],
			animationId,
			count,
		};

		// Cleanup function — cancel the *live* frame id (not a stale copy) and
		// stop scheduling so no orphaned loop keeps rendering into a dead context.
		return () => {
			cancelled = true;
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);

			geometry.dispose();
			material.dispose();
			renderer.dispose();

			const canvas = renderer.domElement;
			if (canvas.parentNode) {
				canvas.parentNode.removeChild(canvas);
			}

			sceneRef.current = null;
		};
	}, [isDark]);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none fixed inset-0 -z-10', className)}
			{...props}
		/>
	);
}
