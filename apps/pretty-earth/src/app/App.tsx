// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Canvas } from '@react-three/fiber';
import { PrimaryScene } from '../PrimaryScene/PrimaryScene';
import styles from './App.module.scss';

export function App() {
    return (
        <Canvas
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
            }}
        >
            <PrimaryScene />
        </Canvas>
    );
}

export default App;
