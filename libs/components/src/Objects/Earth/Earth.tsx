import { useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

import EarthDayMap from '../../../assets/8k_earth_daymap.jpg';
import EarthNightMap from '../../../assets/8k_earth_nightmap.jpg';
import EarthNormalMap from '../../../assets/2k_earth_normal_map.jpg';
import EarthSpecularMap from '../../../assets/2k_earth_specular_map.jpg';
import EarthCloudsMap from '../../../assets/8k_earth_clouds.jpg';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { useRef } from 'react';

/* eslint-disable-next-line */
export interface EarthProps {
    night?: boolean;
}

export function Earth(props: EarthProps) {
    const [dayMap, nightMap, cloudsMap, specularMap, normalMap] = useLoader(
        TextureLoader,
        [
            EarthDayMap,
            EarthNightMap,
            EarthCloudsMap,
            EarthSpecularMap,
            EarthNormalMap,
        ]
    );

    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        if (groupRef !== null) {
            groupRef!.current!.rotation.y = elapsedTime / 12;
        }
    });

    return (
        <group ref={groupRef}>
            <pointLight color="#f6f3ea" position={[2, 0, 7]} intensity={2} />
            <Stars
                radius={300}
                depth={60}
                count={20000}
                factor={7}
                saturation={0}
                fade={true}
            />
            <mesh>
                <sphereGeometry args={[1.005, 128, 128]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    opacity={0.2}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh>
                <sphereGeometry args={[1, 1024, 1024]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial
                    map={props.night ? nightMap : dayMap}
                    normalMap={normalMap}
                    metalness={0.97}
                    roughness={0.75}
                />
            </mesh>
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                zoomSpeed={0.6}
                panSpeed={0.5}
                rotateSpeed={0.4}
            />
        </group>
    );
}

export default Earth;
