import { Box, PerspectiveCamera, Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as React from 'react'
import { useRef } from 'react'
import * as THREE from 'three'

interface Curve extends THREE.Curve<THREE.Vector3> { }

interface MotionPathProps {
    curves: Curve[]
    focusObject: React.MutableRefObject<THREE.Object3D | undefined>
    animationSpeed: number
    showPath: boolean
    attachCamera: boolean
    loop: boolean
    autoStart: boolean
}

const createInfinity = () => {
    var curves = []
    // Define the center and radius of the circle
    var centerX = 0
    var centerY = 0
    var radius = 5

    // Define the number of segments and the amplitude of the sine wave
    var segments = 8
    var amplitude = 5

    // Create a CurvePath
    var path = new THREE.CurvePath()

    // Create each segment
    for (var i = 0; i < segments; i++) {
        // Calculate the start and end angles
        var startAngle = (i / segments) * Math.PI * 2
        var endAngle = ((i + 1) / segments) * Math.PI * 2

        // Calculate the start and end points
        var startPoint = new THREE.Vector3(
            centerX + radius * Math.cos(startAngle),
            centerY + amplitude * Math.sin(2 * startAngle),
            radius * Math.sin(startAngle)
        )
        var endPoint = new THREE.Vector3(
            centerX + radius * Math.cos(endAngle),
            centerY + amplitude * Math.sin(2 * endAngle),
            radius * Math.sin(endAngle)
        )

        // Calculate the control points
        var controlPoint1 = new THREE.Vector3(
            centerX + radius * Math.cos(startAngle + Math.PI / (2 * segments)),
            centerY + amplitude * Math.sin(2 * (startAngle + Math.PI / (2 * segments))),
            radius * Math.sin(startAngle + Math.PI / (2 * segments))
        )
        var controlPoint2 = new THREE.Vector3(
            centerX + radius * Math.cos(endAngle - Math.PI / (2 * segments)),
            centerY + amplitude * Math.sin(2 * (endAngle - Math.PI / (2 * segments))),
            radius * Math.sin(endAngle - Math.PI / (2 * segments))
        )

        // Create the cubic Bezier curve and add it to the path
        var curve = new THREE.CubicBezierCurve3(startPoint, controlPoint1, controlPoint2, endPoint)
        curves.push(curve)
    }

    return curves
}
const createSquare = (size = 10) => {
    var curves = [];
    var halfSize = size / 2;

    // Define the four corners
    var points = [
        new THREE.Vector3(-halfSize, halfSize, 0),  // Top Left
        new THREE.Vector3(halfSize, halfSize, 0),   // Top Right
        new THREE.Vector3(halfSize, -halfSize, 0),  // Bottom Right
        new THREE.Vector3(-halfSize, -halfSize, 0)  // Bottom Left
    ];

    // Create straight edges
    for (let i = 0; i < points.length; i++) {
        let start = points[i];
        let end = points[(i + 1) % points.length];
        curves.push(new THREE.LineCurve3(start, end));
    }

    return curves;
};



export const MotionPath: React.FC<MotionPathProps> = (props) => {
    const {
        curves = createSquare(),
        focusObject,
        animationSpeed = 0.0015,
        showPath = false,
        attachCamera = false,
        loop = true,
        autoStart = true,
    } = props

    const path = new THREE.CurvePath<THREE.Vector3>()
    for (var i = 0; i < curves.length; i++) {
        path.add(curves[i])
    }

    const points = path.getPoints(32)

    const currentPos = useRef(path.getPointAt(0))
    const currentT = useRef(0)
    const rate = useRef(animationSpeed)

    const objRef = useRef<any>(null)

    useFrame(() => {
        if (autoStart) {
            currentT.current += rate.current

            if (currentT.current >= 1.0) {
                if (loop) {
                    currentT.current = 0.0
                } else {
                    return
                }
            }
        } else {
            currentT.current = 0
        }

        const pos = path.getPointAt(currentT.current)
        const tangent = path.getTangentAt(currentT.current).normalize()

        if (objRef.current) {
            objRef.current.position.copy(pos)
            objRef.current.position.set(pos.x, pos.y, pos.z)

            const nextPos = path.getPointAt(Math.min(currentT.current + rate.current, 1))

            if (focusObject?.current instanceof THREE.Object3D) {
                objRef.current.lookAt(focusObject?.current.position)
            } else {
                objRef.current.lookAt(objRef.current.position.clone().add(tangent))
                objRef.current.lookAt(nextPos)
            }
        }

        currentPos.current = pos
    })

    return (
        <group>
            {showPath &&
                points.map((item, index) => (
                    <Sphere args={[0.05, 16, 16]} key={index} position={[item.x, item.y, item.z]}>
                        <meshToonMaterial color="red" />
                    </Sphere>
                ))}
            {showPath === true && props.children === undefined && (
                <Box args={[1, 1, 1]} position={[5, -5, -5]} ref={objRef}>
                    <meshToonMaterial color="limegreen" />
                </Box>
            )}
            {attachCamera && <PerspectiveCamera makeDefault position={[0, -2, -2]} ref={objRef} />}
            {!attachCamera &&
                React.Children.map(props.children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { ref: objRef })
                    }
                    return child
                })}
        </group>
    )
}
