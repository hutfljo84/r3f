import { OrthographicCamera } from '@react-three/drei';

export function CameraLight() {
    return (
        <OrthographicCamera position={[0, 0, 10]} zoom={100} makeDefault>
            <ambientLight color={0xffffff} intensity={1} position={[0, 0, 5]} />
        </OrthographicCamera>
    );
}

export default CameraLight;
