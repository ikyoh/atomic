import { Text3D, useGLTF } from '@react-three/drei'
import { useRef } from 'react'


export function Model(props) {

    const lightRef1 = useRef()
    const lightRef2 = useRef()
    const lightRef3 = useRef()
    const lightRef4 = useRef()
    const selectRef1 = useRef()
    const selectRef2 = useRef()
    const selectRef3 = useRef()
    const selectRef4 = useRef()

    const { nodes, materials } = useGLTF('./models/street.glb')

    return (
        <group {...props} dispose={null} rotation={[0, -Math.PI, 0]}>
            {/* <EffectComposer>
                <Bloom mipmapBlur />
            </EffectComposer> */}
            <Text3D
                font="./fonts/helvetiker_regular.typeface.json"
                position={[0, 3, 2]} rotation={[0, Math.PI, 0]}
                size={0.3}
                height={0.01}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                ATOMIC NEON
                <meshStandardMaterial color={"black"} />
            </Text3D>
            <Text3D
                font="./fonts/helvetiker_regular.typeface.json"
                position={[0, 3, 2 - 0.025]} rotation={[0, Math.PI, 0]}
                size={0.3}
                height={0.01}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                ATOMIC NEON
                <meshBasicMaterial color={[1.5 * 3, 1 * 3, 4 * 3]} emissiveIntensity={0.1} />
            </Text3D>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={nodes.Cube001.material}
                position={[2, 1, 2.5]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube002.geometry}
                material={nodes.Cube002.material}
                position={[-2, 1, 2.5]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube003.geometry}
                material={nodes.Cube003.material}
                position={[-2, 3, 2.5]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube004.geometry}
                material={nodes.Cube004.material}
                position={[2, 3, 2.5]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube005.geometry}
                material={nodes.Cube005.material}
                position={[0, 3, 2.5]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube006.geometry}
                material={nodes.Cube006.material}
                position={[0, 1, 2.5]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube009.geometry}
                material={nodes.Cube009.material}
                position={[0, 1, 1.5]}
                scale={[3, 1, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Trottoir.geometry}
                scale={[0.8, 1, 0.8]}
            >
                <meshStandardMaterial color="SlateGray" />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Route.geometry}
                position={[0, -0.25, 0]}
                rotation={[0, 0, -Math.PI]}
                scale={[1.501, 0.652, 1.477]}
            >
                <meshStandardMaterial color="MidnightBlue" />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Lampadaire.geometry}
                material={nodes.Lampadaire.material}
                position={[3.516, 0.009, -3.477]}
                scale={[0.076, 0.015, 0.092]}
            />

            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Lampadairelight.geometry}
                position={[3.516, 0.009, -3.477]}
                scale={[0.076, 0.015, 0.092]}
                ref={selectRef1}
            >
                <meshBasicMaterial color={[1.5 * 10, 1 * 10, 4 * 10]} emissiveIntensity={5} />
            </mesh>



            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Lampadaire002.geometry}
                material={nodes.Lampadaire002.material}
                position={[-3.483, 0.009, 3.531]}
                scale={[0.076, 0.015, 0.092]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Lampadairelight002.geometry}
                position={[-3.483, 0.009, 3.531]}
                scale={[0.076, 0.015, 0.092]}
            >
                <meshBasicMaterial color={[1.5 * 10, 1 * 10, 4 * 10]} emissiveIntensity={5} />
            </mesh>

            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Lampadaire003.geometry}
                material={nodes.Lampadaire003.material}
                position={[-3.483, 0.009, -3.477]}
                scale={[0.076, 0.015, 0.092]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Lampadairelight003.geometry}
                material={nodes.Lampadairelight003.material}
                position={[-3.483, 0.009, -3.477]}
                scale={[0.076, 0.015, 0.092]}
            >
                <meshBasicMaterial color={[1.5 * 10, 1 * 10, 4 * 10]} emissiveIntensity={5} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Lampadaire001.geometry}
                material={nodes.Lampadaire001.material}
                position={[3.516, 0.009, 3.478]}
                scale={[0.076, 0.015, 0.092]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Lampadairelight001.geometry}
                position={[3.516, 0.009, 3.478]}
                scale={[0.076, 0.015, 0.092]}
            >
                <meshBasicMaterial color={[1.5 * 10, 1 * 10, 4 * 10]} emissiveIntensity={5} castShadow />
            </mesh>


        </group >
    )
}

useGLTF.preload('/street.glb')