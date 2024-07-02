import * as THREE from 'three'
import { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls } from '@react-three/drei'
import { Popconfirm } from 'antd'

const store = [
  { name: 'image2', color: 'lightpink', position: [10, 0, -15], url: '/image1.jpg', link: 1 },
  { name: 'image3', color: 'lightblue', position: [15, 0, 0], url: '/image2.jpg', link: 2 },
  { name: 'image4', color: 'lightpink', position: [10, 0, -15], url: '/image3.jpg', link: 3 },
  { name: 'image5', color: 'lightblue', position: [15, 0, 0], url: '/image4.jpg', link: 4 },
  { name: 'image6', color: 'lightpink', position: [10, 0, -15], url: '/image5.jpg', link: 5 },
  { name: 'image1', color: 'lightpink', position: [10, 0, -15], url: '/image6.jpg', link: 0 },

  // ...
]

function Dome({ name, position, texture, onClick }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="white" />
        <Html center>
          <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
            <a href="#">{name}</a>
          </Popconfirm>
        </Html>
      </mesh>
    </group>
  )
}

function Portals() {
  const [which, set] = useState(0)
  const { link, ...props } = store[which]
  console.log(link,'link');
  const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
  return <Dome onClick={() => set(link)} {...props} texture={maps[which]} />
}

export default function App() {
  return (
    <Canvas frameloop="demand" camera={{ position: [0, 0, 0.1] }}>
      <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
      <Suspense fallback={null}>
        <Preload all />
        <Portals />
      </Suspense>
    </Canvas>
  )
}
