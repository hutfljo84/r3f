import type { EarthProps } from './Earth';
import { useSpring, animated } from '@react-spring/three';
import { Cone, PivotControls } from '@react-three/drei';
import { useState } from 'react';
import { AxesHelper } from 'three';

const A = {
    Cone: animated(Cone),
};

function placeObjectOnPlanet(
    lat: number,
    lon: number,
    radius: number
): Record<'position' | 'rotation', [number, number, number]> {
    const latRad = lat * (Math.PI / 180);
    const lonRad = -lon * (Math.PI / 180);

    return {
        position: [
            Math.cos(latRad) * Math.cos(lonRad) * radius,
            Math.sin(latRad) * radius,
            Math.cos(latRad) * Math.sin(lonRad) * radius,
        ],
        rotation: [0.0, -lonRad, latRad - Math.PI * 0.5],
    };
}

interface MarkerProps {
    coord: EarthProps['coords'][number];
    radius: number;
}

export function Marker({ coord, radius }: MarkerProps) {
    const [isHovered, setIsHovered] = useState(false);

    const springProps = useSpring({
        scale: isHovered ? 1.4 : 1,
    });

    const { rotation, position } = placeObjectOnPlanet(
        coord.lat,
        coord.lon,
        radius
    );

    return (
        <A.Cone
            onClick={() => (window.location.hash = coord.hash)}
            position={position}
            rotation={rotation}
            args={[0.06, -6, 10]}
            onPointerEnter={() => {
                setIsHovered(true);
                document.body.style.cursor = 'pointer';
            }}
            onPointerLeave={() => {
                setIsHovered(false);
                document.body.style.cursor = 'default';
            }}
            scale={springProps.scale}
        >
            <meshBasicMaterial opacity={0.6} transparent color={0xffe600} />
        </A.Cone>
    );
}
export default Marker;
