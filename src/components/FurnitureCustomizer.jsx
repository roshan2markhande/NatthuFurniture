// import React, { Suspense, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
// import { Leva, useControls } from 'leva';
// const models = {
//   Sofa: '/models/Sofa/sofa.glb',
//   Bed: '/models/Bed/bed.glb',
//   Chair: '/models/Chair/chair.glb',
//   DiningTable: '/models/DiningTable/dining_table.glb',
// };

// // const categories = {
// //   Sofa: '/models/sofa.glb',
// //   Bed: '/models/bed.glb',
// //   Chair: '/models/chair.glb',
// // };

// const FurnitureModel = ({ modelPath, color, texture }) => {
//   const { scene, materials } = useGLTF(modelPath);

//   scene.traverse((child) => {
//     if (child.isMesh) {
//       if (texture) {
//         const tex = new THREE.TextureLoader().load(texture);
//         child.material.map = tex;
//         child.material.color.set('#ffffff');
//       } else {
//         child.material.map = null;
//         child.material.color.set(color);
//       }
//       child.material.needsUpdate = true;
//     }
//   });

//   return <primitive object={scene} scale={1.5} />;
// };

// const FurnitureCustomizer = () => {
//   const [selectedCategory, setSelectedCategory] = useState('Sofa');

//   const { color, texture } = useControls('Customize', {
//     color: '#8b4513',
//     texture: { options: { None: null, Fabric: '/textures/fabric.jpg', Wood: '/textures/wood.jpg' } },
//   });

//   return (
//     <div style={{ height: '100vh', background: '#fff' }}>
//       <h2 style={{ textAlign: 'center', fontFamily: 'Poppins' }}>Customize Your {selectedCategory}</h2>

//       <select
//         onChange={(e) => setSelectedCategory(e.target.value)}
//         style={{ margin: '10px auto', display: 'block', padding: '10px' }}
//       >
//         {Object.keys(models).map((cat) => (
//           <option key={cat} value={cat}>
//             {cat}
//           </option>
//         ))}
//       </select>

//       <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
//         <ambientLight intensity={1} />
//         <directionalLight position={[5, 5, 5]} />
//         <Suspense fallback={null}>
//           <FurnitureModel modelPath={models[selectedCategory]} color={color} texture={texture} />
//           <Environment preset="city" />
//         </Suspense>
//         <OrbitControls enablePan enableZoom enableRotate />
//       </Canvas>

//       <Leva collapsed />
//     </div>
//   );
// };

// export default FurnitureCustomizer;
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import * as THREE from 'three';

const FurnitureModel = ({ modelPath, color, texture }) => {
  // Load model with error handling
  const { scene } = useGLTF(modelPath, true);

  // Reference to model scene for bounding box/debug
  const ref = useRef();

  // Update materials on scene meshes when color or texture changes
  React.useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        if (texture) {
          const tex = new THREE.TextureLoader().load(texture);
          tex.encoding = THREE.sRGBEncoding;
          child.material.map = tex;
          child.material.color.set('#ffffff');
        } else {
          child.material.map = null;
          child.material.color.set(color);
        }
        child.material.needsUpdate = true;
      }
    });
  }, [scene, color, texture]);

  return <primitive ref={ref} object={scene} scale={1.5} position={[0, 0, 0]} />;
};

const FurnitureCustomizer = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { color, texture } = useControls('Customize', {
    color: '#8b4513',
    texture: {
      options: {
        None: null,
        Fabric: '/textures/fabric.jpg',
        Wood: '/textures/wood.jpg',
      },
    },
  });
const BASE_URL = 'https://natthu-backend.onrender.com';
  useEffect(() => {
    // Fetch products from backend
    fetch(BASE_URL+'/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if (data.length > 0) {
          const firstCategory = data[0].catg || '';
          setSelectedCategory(firstCategory);
          const firstProduct = data.find((p) => p.catg === firstCategory);
          setSelectedProduct(firstProduct || null);
        }
      })
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const prod = products.find((p) => p.catg === cat);
    setSelectedProduct(prod || null);
  };

  const handleProductChange = (prodName) => {
    const prod = products.find((p) => p.name === prodName && p.catg === selectedCategory);
    setSelectedProduct(prod || null);
  };

  const filteredProductNames = products
    .filter((p) => p.catg === selectedCategory)
    .map((p) => p.name);

  return (
    <div style={{ height: '100vh', background: '#fff' }}>
      <h2 style={{ textAlign: 'center', fontFamily: 'Poppins' }}>
        Customize Your {selectedCategory || 'Furniture'}
      </h2>

      {/* Category Selector */}
      <select
        onChange={(e) => handleCategoryChange(e.target.value)}
        style={{ margin: '10px auto', display: 'block', padding: '10px' }}
        value={selectedCategory}
      >
        {[...new Set(products.map((p) => p.catg))].map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Product Selector */}
      <select
        onChange={(e) => handleProductChange(e.target.value)}
        style={{ margin: '10px auto', display: 'block', padding: '10px' }}
        value={selectedProduct?.name || ''}
      >
        {filteredProductNames.length > 0 ? (
          filteredProductNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))
        ) : (
          <option disabled>No products found</option>
        )}
      </select>

      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="gray" />
            </mesh>
          }
        >
          {selectedProduct && selectedProduct.modelPath ? (
            <FurnitureModel
              modelPath={selectedProduct.modelPath}
              color={color}
              texture={texture}
            />
          ) : (
            // Fallback cube if no modelPath
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#cccccc" />
            </mesh>
          )}

          <Environment preset="city" />
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>


      <Leva collapsed />
    </div>
  );
};

export default FurnitureCustomizer;
