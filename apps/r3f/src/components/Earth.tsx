import { useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Preload, Sphere, Stars } from '@react-three/drei';

import EarthDayMap from './8k_earth_daymap.jpg';
import EarthNightMap from './8k_earth_nightmap.jpg';
import EarthNormalMap from './8k_earth_normal_map.jpg';
import EarthSpecularMap from './8k_earth_specular_map.jpg';
import EarthCloudsMap from './8k_earth_clouds.jpg';
import Topography_5k from './topography_5k.png';
import { Color, TextureLoader } from 'three';
import Marker from './Marker';
import { Coord } from '../app/app';
import Scene from './Scene';

/* eslint-disable-next-line */
export interface EarthProps {
    coords: Coord[];
}

export function Earth({ coords }: EarthProps) {
    const [dayMap, nightMap, cloudsMap, specularMap, normalMap, bumpMap] =
        useLoader(TextureLoader, [
            EarthDayMap,
            EarthNightMap,
            EarthCloudsMap,
            EarthSpecularMap,
            EarthNormalMap,
            Topography_5k,
        ]);

    return (
        <group>
            {coords.map((coord) => {
                return <Marker key={coord.hash} radius={2.6} coord={coord} />;
            })}
            <Sphere args={[1, 1024, 1024]}>
                <meshPhongMaterial
                    map={dayMap}
                    bumpMap={bumpMap}
                    bumpScale={0.002}
                    specularMap={specularMap}
                    specular={new Color(0x021019)}
                />
            </Sphere>

            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                zoomSpeed={0.6}
                panSpeed={0.5}
                rotateSpeed={0.4}
                minDistance={3}
                maxDistance={8}
            />
        </group>
    );
}

export default Earth;
