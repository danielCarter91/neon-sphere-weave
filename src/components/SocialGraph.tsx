import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface NodeProps {
  position: [number, number, number];
  color: string;
  size: number;
  encrypted?: boolean;
}

const GraphNode = ({ position, color, size, encrypted = false }: NodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.3;
      
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
    
    if (glowRef.current) {
      const glowScale = 1.5 + Math.sin(time * 3) * 0.3;
      glowRef.current.scale.setScalar(glowScale);
    }
  });

  return (
    <group position={position}>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 1.5, 16, 16]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {/* Main node */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Encrypted indicator */}
      {encrypted && (
        <mesh position={[0, size + 0.3, 0]}>
          <ringGeometry args={[size * 0.8, size * 1.2, 8]} />
          <meshBasicMaterial 
            color="#00ff88"
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  );
};

const ConnectionLine = ({ start, end }: { start: [number, number, number], end: [number, number, number] }) => {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [points]);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#00ffff", opacity: 0.6, transparent: true }))} />
  );
};

export const SocialGraph = () => {
  // Generate random nodes
  const nodes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      color: i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff00ff" : "#00ff88",
      size: 0.3 + Math.random() * 0.3,
      encrypted: Math.random() > 0.4
    }));
  }, []);

  // Generate connections
  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.7) {
          conns.push({ start: nodes[i].position, end: nodes[j].position });
        }
      }
    }
    return conns;
  }, [nodes]);

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-primary/30 glow-primary">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'radial-gradient(circle, #0a0a0a 0%, #000000 100%)' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff00ff" />
        
        {/* Render connections */}
        {connections.map((conn, i) => (
          <ConnectionLine key={i} start={conn.start} end={conn.end} />
        ))}
        
        {/* Render nodes */}
        {nodes.map((node) => (
          <GraphNode
            key={node.id}
            position={node.position}
            color={node.color}
            size={node.size}
            encrypted={node.encrypted}
          />
        ))}
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};