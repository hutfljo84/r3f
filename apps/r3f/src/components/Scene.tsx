import { Loader, Preload, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

export default function Scene() {
    return (
        <>
            <Canvas>
                <Suspense fallback={null}>
                    <directionalLight intensity={1.5} position={[-5, 0, 0]} />

                    <Stars
                        radius={0.0001}
                        depth={35}
                        count={100000}
                        factor={1}
                        saturation={0}
                        fade
                        speed={2}
                    />
                </Suspense>
            </Canvas>
            <Loader />
        </>
    );
}
