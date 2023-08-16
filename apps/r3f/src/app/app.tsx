// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Environment } from '@react-three/drei';
import { Earth } from '../components/Earth';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import CameraLight from '../components/CameraLight';

export type Coord = { lat: number; lon: number; hash: `#${string}` };

const coords: Coord[] = [
    {
        lat: 33.2385,
        lon: -106.3464,
        hash: '#WhiteHills',
    },
];

export function App() {
    return (
        <div>
            {/* <Environment preset="forest" /> */}

            {
                <Canvas
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: `black`,
                    }}
                >
                    <CameraLight />
                    <Earth coords={coords} />
                </Canvas>
            }
        </div>
    );
}

export default App;
