import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ modelPath, color }) => {
  const { scene } = useGLTF(modelPath);
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set(color);
    }
  });

  return <primitive object={scene} scale={1.5} />;
};

const ModelViewer = ({ modelPath, color }) => {
  return (
    <Canvas style={{ height: '400px', background: 'white' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls />
      <Model modelPath={modelPath} color={color} />
    </Canvas>
  );
};

export default ModelViewer;
