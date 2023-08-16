/* eslint-disable jsx-a11y/accessible-emoji */
import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { Cone, Html } from '@react-three/drei';
import { EarthProps } from './Earth';

const A = {
    Cone: animated(Cone),
};

const colors = [0xffe600, 0xff0000, 0x00ff00, 0x0000ff];

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
    const [coneColor, setConeColor] = useState(colors[0]); // Initial color

    const springProps = useSpring({
        scale: isHovered ? 1.4 : 1,
    });

    const { rotation, position } = placeObjectOnPlanet(
        coord.lat,
        coord.lon,
        radius + 2.6
    );

    const markerRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
            setConeColor(randomColor);
        }, 1000); // Change color every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <>
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
                ref={markerRef}
            >
                <meshBasicMaterial
                    opacity={0.6}
                    transparent
                    color={coneColor}
                />
            </A.Cone>
            {isHovered && (
                <Html
                    occlude
                    position={[position[0], position[1] + 0.15, position[2]]}
                    as="div"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '120px',
                        height: '40px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        fontSize: '1rem',
                    }}
                >
                    🌕 WhiteHills
                </Html>
            )}
        </>
    );
}

export default Marker;
