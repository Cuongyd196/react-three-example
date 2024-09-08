import * as THREE from 'three'
import { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls } from '@react-three/drei'
import { Popconfirm } from 'antd'

const store = [
  {
    name: 'livingroom2', position: [0, 0, 0], rotation: [0, 630, 0], color: 'lightpink', url: '/Home/livingroom.jpg', link: 1,
    arrows: [
      { position: [-6, -30, -270], link: 1, preview: '/Home/bedroom1.jpg', address: 'bedroom1', },
      { position: [-90, -30, -250], link: 2, preview: '/Home/bedroom2.jpg', address: 'bedroom2' }
    ]
  },
  {
    name: 'bedroom1', color: 'lightblue', position: [0, 0, 0], rotation: [0, 30, 0], url: '/Home/bedroom1.jpg', link: 0,
    arrows: [
      { position: [160, -180, 400], link: 0, preview: '/Home/livingroom.jpg', address: 'livingroom', },
    ]
  },
  {
    name: 'bedroom2', color: 'lightpink', position: [15, 0, 0], rotation: [0, 630, 0], url: '/Home/bedroom2.jpg', link: 2,
    arrows: [
      { position: [100, -40, 200], link: 0, preview: '/Home/livingroom.jpg', address: 'livingroom', },
    ]
  },
  // ...
]

function Dome({ name, position, rotation, texture, onClick, arrows }) {
  const handleArrowClick = (arrow) => {
    onClick(arrow.link);
  };
  return (
    <group>
      <mesh rotation={rotation} position={position}>
        <sphereGeometry args={[80, 80, 80]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      {arrows?.map((arrow, index) => (
        <mesh position={arrow.position} key={index}>
          <sphereGeometry />
          <meshBasicMaterial color="white" />
          <Html center>
            <Popconfirm title="Are you sure you want to leave?" onConfirm={() => { handleArrowClick(arrow) }} okText="Yes" cancelText="No">
              <div style={{ textAlign: "center" }}>
                <a style={{ color: "white" }} href="#">{arrow.address}</a>
                <img className='arrowIcon' src='https://vr360.com.vn/projects/dai-hoc-ngan-hang-tp-hcm/assets/Move/up.png' alt='' />
              </div>
            </Popconfirm>
          </Html>
        </mesh>
      ))}
    </group>
  )
}

function Portals() {
  const [which, set] = useState(0)
  const { link, ...props } = store[which]
  const [loading, setLoading] = useState(false);
  const handleChangeScene = (newLink) => {
    setLoading(true);
    setTimeout(() => {
      set(newLink);
      setLoading(false);
    }, 500); // Adjust delay as needed
  };
  const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
  return <Dome onClick={handleChangeScene}
    {...props} texture={maps[which]} arrows={store[which].arrows} />
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
