import * as THREE from 'three';
import {
    LineSegments,
    LineBasicMaterial,
    EdgesGeometry,
    MeshPhongMaterial,
    SphereBufferGeometry,
    MeshLambertMaterial,
    SphereGeometry,
    MeshStandardMaterial,
    OrbitControls,
} from 'three';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';

import React from 'react';
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';

extend({
    EdgesGeometry,
    LineSegments,
    LineBasicMaterial,
    MeshPhongMaterial,
    SphereBufferGeometry,
    SphereGeometry,
    MeshStandardMaterial,
    ShaderPass,
    FilmPass,
});

function Effect() {
    const composer = React.useRef();
    const { scene, gl, size, camera } = useThree();
    const aspect = React.useMemo(
        () => new THREE.Vector2(size.width, size.height),
        [size],
    );
    React.useEffect(
        () => void composer.current.setSize(size.width, size.height),
        [size],
    );
    useFrame(() => composer.current.render(), 1);

    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass
                attachArray="passes"
                scene={scene}
                camera={camera}
                antialias={true}
            />
            <unrealBloomPass
                attachArray="passes"
                args={[aspect]}
                strength={2.5}
                radius={0.3}
                threshold={0.1}
            />
            {/* <shaderPass
                attachArray="passes"
                args={[FXAAShader]}
                uniforms-resolution-value={[1 / size.width, 1 / size.height]}
                renderToScreen
            /> */}

            <filmPass attachArray="passes" args={[0.25, 1, 1500, false]} />
            {/* noiseIntensity 
            scanlinesIntensity
            scanlinesCount
            grayscale  */}
        </effectComposer>
    );
}

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

const WireframeGlow = () => {
    return (
        <Canvas
            camera={{
                fov: 75,
                position: [1, -1, 5],
            }}
            // pixelRatio={Math.min(window.devicePixelRatio)}
            style={{ background: '#000' }}
        >
            <ambientLight intensity={0.5} color="#fff" />

            <lineSegments>
                <edgesGeometry
                    attach="geometry"
                    args={[
                        new THREE.SphereBufferGeometry(
                            1,
                            8,
                            8,
                            0,
                            3,
                            // 0,
                            // 0.5,
                        ),
                    ]}
                />
                <meshBasicMaterial attach="material" color="#faaf00" />
            </lineSegments>

            <Controls />
            <Effect />
        </Canvas>
    );
};

export default WireframeGlow;
