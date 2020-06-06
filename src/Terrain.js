import React from 'react';
import * as THREE from 'three';
import {
    PlaneBufferGeometry,
    MeshPhongMaterial,
    MeshLambertMaterial,
} from 'three';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import noise from './noise.jpg';
import city from './landan.jpg';

extend({
    OrbitControls,
    PlaneBufferGeometry,
    MeshPhongMaterial,
    MeshLambertMaterial,
});

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
                position: [1, 0, 1],
            }}
            style={{ background: '#000' }}
        >
            <ambientLight color="#fff" intensity={0.8} />
            <spotLight
                castShadow={true}
                color="#fff"
                intensity={1.5}
                position={[0.1, 1, 1]}
                rot
            />

            <mesh>
                <planeBufferGeometry
                    attach="geometry"
                    args={[1, 0.5, 128, 128]}
                />
                <meshLambertMaterial
                    attach="material"
                    // color="brown"
                    bumpMap={new THREE.TextureLoader().load(city)}
                    bumpScale={0.1}
                    map={new THREE.TextureLoader().load(city)}
                    // displacementMap={new THREE.TextureLoader().load(noise)}
                    // displacementScale={0.05}
                />
            </mesh>
            <Controls />
        </Canvas>
    );
};

export default Terrain;
