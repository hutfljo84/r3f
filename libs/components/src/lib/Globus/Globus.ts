// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Environment } from '@react-three/drei';
import { Earth } from '../components/Earth';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';

export function Globus() {
    

    const { time } = useControls({
        time: 123,
    });
    return (
       {time}
    );
}

export default App;
