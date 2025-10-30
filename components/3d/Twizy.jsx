import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useEffect, useRef } from "react";


gsap.registerPlugin(MotionPathPlugin);

const Twizy = () => {

    const meshRef = useRef();
    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: false });

        tl.to(meshRef.current.position, { z: 4, duration: 6, ease: "none" })
            .to(meshRef.current.position, { z: 4.5, x: 4, duration: 1, ease: "none" })
            .to(meshRef.current.position, { x: -4, duration: 6, ease: "none" })
            .to(meshRef.current.position, { x: -4.5, z: 4, duration: 1, ease: "none" })
            .to(meshRef.current.position, { z: -4, duration: 6, ease: "none" })
            .to(meshRef.current.position, { z: -4.5, x: -4, duration: 1, ease: "none" })
            .to(meshRef.current.position, { x: 4, duration: 6, ease: "none" })
            .to(meshRef.current.position, { x: 4.5, z: -4, duration: 1, ease: "none" });


        const tl2 = gsap.timeline({ repeat: -1, yoyo: false });

        tl2.to(meshRef.current.rotation, { y: Math.PI / 2, delay: 6, duration: 1, ease: "none" })
            .to(meshRef.current.rotation, { y: 0, delay: 6, duration: 1, ease: "none" })
            .to(meshRef.current.rotation, { y: -Math.PI / 2, delay: 6, duration: 1, ease: "none" })
            .to(meshRef.current.rotation, { y: -Math.PI, delay: 6, duration: 1, ease: "none" })

    }, []);
    return (
        <group ref={meshRef} position={[4.5, 0, -4]} rotation-y={Math.PI}>
            <mesh position={[0, 0, -0.25]} castShadow>
                <boxGeometry args={[0.3, 0.3, 0.1]} />
                <meshStandardMaterial color="red" />
            </mesh>
            <mesh castShadow>
                <boxGeometry args={[0.3, 0.3, 0.4]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </group>
    );
}

export default Twizy