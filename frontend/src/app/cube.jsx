/**
 * Spinning Cube
 * Created by Sillyui.com
 * Please check the license at https://www.sillyui.com/important/license
 * before using it commercially.
 */

"use client"

import { Suspense, useRef } from "react"
import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"

export function SpinningCube() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center rounded-sm bg-white">
      <>
        <div className="flex w-full items-center justify-center">
          <div className="relative flex h-[70vh] w-full flex-col items-center justify-center pattern1 cursor-grab">
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="mx-auto items-center ">
                <div className="max-auto w-72 text-center  lg:w-96">
                  <div className="mx-auto w-full">
                    <p className="mt-8 text-5xl tracking-tighter text-white md:text-5xl">
                      Basic Shape
                    </p>
                    <p className="mx-auto mt-4 max-w-xl text-sm tracking-tight text-gray-300 md:text-sm">
                      Try and spin the cube
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Canvas
              camera={{
                position: [0, 15, 70],
                fov: 80,
                near: 1,
                far: 200,
              }}
            >
              <directionalLight
                position={[10, 10, 5]}
                intensity={0.3}
                castShadow
              />
              <Suspense fallback={null}>
                <Cube />
              </Suspense>
              <OrbitControls enableZoom={false}/>
            </Canvas>
          </div>
        </div>
      </>
    </div>
  )
}

function Cube() {
  const ref = useRef();

  const speedFactor = 0.3 // Adjust this value to control the speed

  useFrame((state, delta) => {
    ref.current.position.y = 1 + Math.sin(state.clock.elapsedTime) * 10
    const rotationIncrement = delta * speedFactor
    ref.current.rotation.x += rotationIncrement
    ref.current.rotation.y += rotationIncrement
    ref.current.rotation.z += rotationIncrement
  })

  // Adjust the scale to increase the cube size

  return (
    <mesh ref={ref} scale={45}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}
