import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

function ParticleField({ mouse }) {
  const meshRef = useRef();
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 800 : 2500;

  const [positions, basePositions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 2.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, base, sz];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const geo = meshRef.current.geometry;
    const posArr = geo.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      posArr[i3] = bx + Math.sin(time * 0.3 + i * 0.01) * 0.15;
      posArr[i3 + 1] = by + Math.cos(time * 0.2 + i * 0.015) * 0.15;
      posArr[i3 + 2] = bz + Math.sin(time * 0.25 + i * 0.012) * 0.1;

      // Mouse influence
      const mx = mouse.current[0] * 0.5;
      const my = mouse.current[1] * 0.5;
      posArr[i3] += mx * 0.3 * (1 / (1 + Math.abs(bx)));
      posArr[i3 + 1] += my * 0.3 * (1 / (1 + Math.abs(by)));
    }

    geo.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.03 + mouse.current[0] * 0.1;
    meshRef.current.rotation.x = mouse.current[1] * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#c8ff00"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CentralObject({ mouse }) {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1 + mouse.current[1] * 0.2;
      meshRef.current.rotation.y = time * 0.15 + mouse.current[0] * 0.2;

      const scale = 1 + Math.sin(time * 0.5) * 0.05;
      meshRef.current.scale.setScalar(scale);

      // Distort vertices
      const geo = meshRef.current.geometry;
      const posAttr = geo.attributes.position;
      const baseGeo = new THREE.IcosahedronGeometry(1.2, 4);
      const basePos = baseGeo.attributes.position;

      for (let i = 0; i < posAttr.count; i++) {
        const bx = basePos.getX(i);
        const by = basePos.getY(i);
        const bz = basePos.getZ(i);
        const noise = Math.sin(bx * 3 + time) * Math.cos(by * 3 + time * 0.7) * 0.08;
        posAttr.setXYZ(i, bx + noise, by + noise * 0.8, bz + noise * 0.6);
      }
      posAttr.needsUpdate = true;
      geo.computeVertexNormals();
      baseGeo.dispose();
    }

    if (wireRef.current) {
      wireRef.current.rotation.x = time * 0.08 + mouse.current[1] * 0.15;
      wireRef.current.rotation.y = time * 0.12 + mouse.current[0] * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 4]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.4, 3]} />
        <meshBasicMaterial
          color="#c8ff00"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

function FloatingRings({ mouse }) {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.children.forEach((ring, i) => {
        ring.rotation.x = time * (0.05 + i * 0.02) + mouse.current[1] * 0.1;
        ring.rotation.z = time * (0.03 + i * 0.015) + mouse.current[0] * 0.08;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[2.2, 2.8, 3.5].map((radius, i) => (
        <mesh key={i}>
          <torusGeometry args={[radius, 0.005, 16, 100]} />
          <meshBasicMaterial
            color="#c8ff00"
            transparent
            opacity={0.08 - i * 0.02}
          />
        </mesh>
      ))}
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#c8ff00" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#4400ff" />
      <pointLight position={[0, 3, -3]} intensity={0.4} color="#ffffff" />
    </>
  );
}

function CameraController({ mouse, scrollY }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetX = mouse.current[0] * 0.5;
    const targetY = mouse.current[1] * 0.3 + 0.5;
    const scrollOffset = (scrollY.current || 0) * 0.001;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z = 6 - scrollOffset * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene({ scrollY }) {
  const mouse = useRef([0, 0]);
  const containerRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current[0] = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current[1] = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Detect WebGL support
  const hasWebGL = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="hero-canvas-container" ref={containerRef}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, #111 0%, #0a0a0a 70%)',
        }} />
      </div>
    );
  }

  return (
    <div className="hero-canvas-container" ref={containerRef}>
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 5, 15]} />

        <CameraController mouse={mouse} scrollY={scrollY} />
        <Lights />
        <CentralObject mouse={mouse} />
        <ParticleField mouse={mouse} />
        <FloatingRings mouse={mouse} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.8}
            radius={0.8}
          />
          <Noise opacity={0.04} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
