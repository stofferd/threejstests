import React from 'react';
import * as THREE from 'three';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import noise from './noise.jpg';

extend({ OrbitControls });

const Controls = () => {
    const { camera, gl } = useThree();
    const ref = React.useRef();
    useFrame(() => ref.current.update());
    return (
        <orbitControls
            ref={ref}
            target={[0, 0, 0]}
            enableDamping
            args={[camera, gl.domElement]}
        />
    );
};

const Terrain = () => {
    const bumpMap = THREE.ImageUtils.loadTexture(noise);

    return (
        <Canvas
            camera={{
                fov: 75,
                position: [0, 0, 1],
            }}
            style={{ background: '#000' }}
        >
            <ambientLight intensity={0.5} />

            <mesh
                material={
                    new THREE.MeshPhongMaterial({
                        color: 'red',
                        normalMap: bumpMap,
                    })
                }
                geometry={new THREE.PlaneBufferGeometry()}
                position={[0, 0.1, 0]}
                rotation={[0.72, 0, 0]}
                scale={[1.3, 27.13, 5.01]}
            />
            <Controls />
        </Canvas>
    );
};

export default Terrain;
