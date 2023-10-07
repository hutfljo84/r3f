import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

const Target: React.FC = () => {
    const sphereRef = useRef<THREE.Mesh>(null!);

    // Animation logic using useFrame
    useFrame(() => {
        // Get the current position of the sphere
        const { x, y, z } = sphereRef.current.position;

        // Define the target points
        const targetPoint1 = { x: -3, y: 0, z: 10 };
        const targetPoint2 = { x: 5, y: 5, z: 5 };

        // Calculate the distance between the sphere and the target points
        const distanceToTarget1 = Math.sqrt(
            Math.pow(x - targetPoint1.x, 2) +
                Math.pow(y - targetPoint1.y, 2) +
                Math.pow(z - targetPoint1.z, 2)
        );
        const distanceToTarget2 = Math.sqrt(
            Math.pow(x - targetPoint2.x, 2) +
                Math.pow(y - targetPoint2.y, 2) +
                Math.pow(z - targetPoint2.z, 2)
        );

        // Define the movement speed
        const speed = 0.01;

        // Move the sphere towards the target points
        if (distanceToTarget1 < 1) {
            // If close to targetPoint1, move towards targetPoint2
            sphereRef.current.position.x += (targetPoint2.x - x) * speed;
            sphereRef.current.position.y += (targetPoint2.y - y) * speed;
            sphereRef.current.position.z += (targetPoint2.z - z) * speed;
        } else if (distanceToTarget2 < 1) {
            // If close to targetPoint2, move towards targetPoint1
            sphereRef.current.position.x += (targetPoint1.x - x) * speed;
            sphereRef.current.position.y += (targetPoint1.y - y) * speed;
            sphereRef.current.position.z += (targetPoint1.z - z) * speed;
        } else {
            // If not close to any target, continue moving towards the current target
            const target =
                distanceToTarget1 < distanceToTarget2
                    ? targetPoint1
                    : targetPoint2;
            sphereRef.current.position.x += (target.x - x) * speed;
            sphereRef.current.position.y += (target.y - y) * speed;
            sphereRef.current.position.z += (target.z - z) * speed;
        }
    });

    return (
        <>
            <Sphere
                ref={sphereRef}
                args={[0.2, 32, 32]}
                position={[0, 0, 0]}
                color="blue"
            />

            <directionalLight position={[0, 10, 0]} intensity={1} />
            <axesHelper args={[5]} />
            <gridHelper args={[10, 10]} />
        </>
    );
};

export default Target;
