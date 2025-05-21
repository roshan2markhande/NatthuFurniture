import { useGLTF } from '@react-three/drei';

const GLBModel = ({ url, position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} position={position} scale={scale} />;
};

export default GLBModel;
