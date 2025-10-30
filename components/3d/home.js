'use client';
import { Environment, Html, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import TWEEN from '@tweenjs/tween.js';
import JEASINGS from 'jeasings';
import { useControls } from 'leva';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import annotations from './annotations.json';
import { Model } from './Street';
import Twizy from './Twizy';
function Annotations({ controls }) {
const { camera } = useThree()


return (
    <>
    {annotations.map((a, i) => {
        return (
        <Html key={i} position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}>
            <svg height="34" width="34" transform="translate(-16 -16)" style={{ cursor: 'pointer' }}>
            <circle
                cx="17"
                cy="17"
                r="16"
                stroke="white"
                strokeWidth="2"
                fill="rgba(0,0,0,.66)"
                onClick={() => {
                    setSelected(i)
                new JEASINGS.JEasing(controls.current.target)
                    .to(
                    {
                        x: a.lookAt.x,
                        y: a.lookAt.y,
                        z: a.lookAt.z
                    },
                    500
                    )
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start()

                    new JEASINGS.JEasing(camera.position)
                    .to(
                    {
                        x: a.camPos.x,
                        y: a.camPos.y,
                        z: a.camPos.z
                    },
                    1000
                    )
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start()
                }}

            />
            <text x="12" y="22" fill="white" fontSize={17} fontFamily="monospace" style={{ pointerEvents: 'none' }}>
                {i + 1}
            </text>
            </svg>
            {a.description && i === selected && (
            <div
                id={'desc_' + i}
                className="annotationDescription"
                dangerouslySetInnerHTML={{ __html: a.description }}
            />
            )}
        </Html>
        )
    })}
    </>
)
}

function JEasings() {
    useFrame(() => {
        JEASINGS.update()
    })
}

function Lights() {
    const ambientRef = useRef()
    const directionalRef = useRef()
    const pointRef = useRef()
    const spotRef = useRef()
  
    useControls('Ambient Light', {
      visible: {
        value: false,
        onChange: (v) => {
          ambientRef.current.visible = v
        },
      },
      color: {
        value: 'white',
        onChange: (v) => {
          ambientRef.current.color = new THREE.Color(v)
        },
      },
    })
  
    useControls('Directional Light', {
      visible: {
        value: false,
        onChange: (v) => {
          directionalRef.current.visible = v
        },
      },
      position: {
        x: 11,
        y: 20,
        z: 21,
        onChange: (v) => {
          directionalRef.current.position.copy(v)
        },
      },
      color: {
        value: '#cba74f',
        onChange: (v) => {
          directionalRef.current.color = new THREE.Color(v)
        },
      },
    })
  
    useControls('Point Light', {
      visible: {
        value: false,
        onChange: (v) => {
          pointRef.current.visible = v
        },
      },
      position: {
        x: 2,
        y: 0,
        z: 0,
        onChange: (v) => {
          pointRef.current.position.copy(v)
        },
      },
      color: {
        value: 'white',
        onChange: (v) => {
          pointRef.current.color = new THREE.Color(v)
        },
      },
    })
  
    useControls('Spot Light', {
      visible: {
        value: false,
        onChange: (v) => {
          spotRef.current.visible = v
        },
      },
      position: {
        x: 3,
        y: 2.5,
        z: 1,
        onChange: (v) => {
          spotRef.current.position.copy(v)
        },
      },
      color: {
        value: 'white',
        onChange: (v) => {
          spotRef.current.color = new THREE.Color(v)
        },
      },
    })
  
    return (
      <>
        <ambientLight ref={ambientRef} />
        <directionalLight ref={directionalRef} castShadow intensity={30} />
        <pointLight ref={pointRef} castShadow intensity={30} />
        <spotLight ref={spotRef} castShadow intensity={30} />
      </>
    )
  }

  var options = {
    gridSize: [30, 16],
    cellSize: 1.0,
    cellThickness: 1.0,
    cellColor: '#707070',
    sectionSize: 5.0,
    sectionThickness: 1.5,
    sectionColor: '#1e1e1e', //'#00ffd9',
    fadeDistance: 50,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  }
  


const Home = () => {
    const ref = useRef()
    const poi = useRef()
    return (

    <Canvas style={{ height: "100vh", width: "100vw", top: "-116px"}} camera={{ position: [-5, 2, 8] }} shadows>
        <color attach="background" args={['#0a0a0a']} />
        <Lights />
        <OrbitControls ref={ref} target={[0, 0, 0]}  maxDistance={15}/>
        <Suspense fallback={()=>"<div>loading</div>"}>
            <Environment preset="night" blur={0.75} />
            <Model />
            <Twizy />
            {/* <pointLight position={[10, 10, 10]} castShadow />
            <mesh position={[0, 2, 3]} castShadow>
                <sphereGeometry />
                <meshStandardMaterial color="hotpink" />
            </mesh>
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 10, 10]} />
                <meshStandardMaterial color="blue" />
            </mesh> */}
            {/* <Annotations controls={ref} /> */}
            {/* <JEasings /> */}
        </Suspense>
        {/* <Stats /> */}
        {/* <Grid {...options} position={[0, -0.09, 0.0]} /> */}

    </Canvas>
    )
}

export default Home