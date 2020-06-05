import * as THREE from 'three';
import {
    LineSegments,
    LineBasicMaterial,
    EdgesGeometry,
    MeshPhongMaterial,
    SphereBufferGeometry,
    MeshLambertMaterial,
    SphereGeometry,
    TorusKnotBufferGeometry,
} from 'three';
import React, { Suspense } from 'react';
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

extend({ TorusKnotBufferGeometry });

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
                strength={2}
                radius={0.1}
                threshold={0.3}
            />
            <shaderPass
                attachArray="passes"
                args={[FXAAShader]}
                uniforms-resolution-value={[1 / size.width, 1 / size.height]}
                renderToScreen
            />
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

const Knot = () => {
    return (
        <Canvas
            camera={{
                fov: 75,
                position: [1, -1, 5],
            }}
            style={{ background: '#000' }}
        >
            <ambientLight intensity={0.2} color="yellow" />
            <spotLight intensity={1.2} position={[1, -1, 10]} />

            <mesh scale={[1.001, 1.001, 1.001]}>
                <torusKnotBufferGeometry
                    attach="geometry"
                    args={[0.6, 0.1, 128, 16]}
                />
                <meshLambertMaterial
                    attach="material"
                    color="#fff"
                    side={THREE.BackSide}
                    onBeforeCompile={(shader) => {
                        const token = '#include <begin_vertex>';
                        const customTransform = `
                            vec3 transformed = position + objectNormal*0.02;
                        `;
                        shader.vertexShader = shader.vertexShader.replace(
                            token,
                            customTransform,
                        );
                    }}
                />
            </mesh>

            <mesh scale={[1, 1, 1]}>
                <torusKnotBufferGeometry
                    attach="geometry"
                    args={[0.6, 0.1, 128, 16]}
                />
                <meshLambertMaterial attach="material" color="#005500" />
            </mesh>

            <Controls />
            <Effect />
        </Canvas>
    );
};

export default Knot;
