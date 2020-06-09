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
    MeshDepthMaterial,
    CircleBufferGeometry,
} from 'three';
import * as Nodes from 'three/examples/jsm/nodes/Nodes.js';
import { ColorAdjustmentNode } from 'three/examples/jsm/nodes/effects/ColorAdjustmentNode';
import React, { Suspense } from 'react';
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader';

import noiseUrl from './noise.jpg';
import sunUrl from './sun-texture.jpg';

extend({
    CircleBufferGeometry,
    OrbitControls,
    EdgesGeometry,
    LineSegments,
    LineBasicMaterial,
    MeshPhongMaterial,
    SphereBufferGeometry,
    SphereGeometry,
    MeshStandardMaterial,
    MeshDepthMaterial,
    ColorAdjustmentNode,
});

const sunTexture = new THREE.TextureLoader().load(sunUrl);
const noiseTexture = new THREE.TextureLoader().load(noiseUrl);

function Effect() {
    const dotRef = React.useRef(null);
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
    console.log({ dotRef });
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
                strength={1.5}
                radius={0.1}
                threshold={0.3}
            />

            <shaderPass
                ref={dotRef}
                attachArray="passes"
                args={[DotScreenShader]}
                renderToScreen
                // uniforms-tDiffuse={0.00001}
                uniforms-tSize-value-x={512}
                uniforms-tSize-value-y={512}
                // uniforms-tDiffuse-value={0.01}
                // uniforms-angle-value={300}
                // uniforms-scale={0.00001}
            />
            <filmPass attachArray="passes" args={[0.25, 1, 1500, false]} />

            {/* uniforms: {
		tDiffuse: Uniform;
		tSize: Uniform;
		center: Uniform;
		angle: Uniform;
		scale: Uniform; */}
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

const Ball = () => {
    const mesh = React.useRef(null);
    let expanding = true;
    useFrame((clock) => {
        mesh.current.geometry.parameters.radius = mesh.current.geometry.parameters.radius += 1;
        mesh.current.geometry.parameters.phiStart = mesh.current.geometry.parameters.phiStart += 1;
        mesh.current.rotation.x = mesh.current.rotation.y += 0.001;
        mesh.current.rotation.y = mesh.current.rotation.z += 0.001;

        if (expanding) {
            mesh.current.scale.x = mesh.current.scale.x += 0.0005;
            mesh.current.scale.y = mesh.current.scale.y += 0.0005;
            mesh.current.scale.z = mesh.current.scale.z += 0.0005;
        } else {
            mesh.current.scale.x = mesh.current.scale.x -= 0.0005;
            mesh.current.scale.y = mesh.current.scale.y -= 0.0005;
            mesh.current.scale.z = mesh.current.scale.z -= 0.0005;
        }
        if (mesh.current.scale.x >= 2) {
            expanding = false;
        }
        if (mesh.current.scale.x <= 1) {
            expanding = true;
        }
    });

    return (
        <mesh ref={mesh}>
            <sphereGeometry
                attach="geometry"
                args={[0.25, 32, 32]}

                // radius={10}
                // widthSegments={32}
                // heightSegments={32}
                // phiStart={1}
                // phiLength={1}
                // thetaStart={1}
                // thetaLength={1}
            />
            <meshStandardMaterial
                attach="material"
                color="#fff"
                emissive="red"
                displacementMap={noiseTexture}
                displacementScale={0.2}
                bumpMap={sunTexture}
            />
        </mesh>
    );
};

const Globe = () => {
    // const geometry = new THREE.SphereBufferGeometry(1, 10, 10, 0, 2);
    // const edges = new THREE.EdgesGeometry(geometry);
    return (
        <>
            <Canvas
                camera={{
                    fov: 75,
                    position: [1, -1, 5],
                }}
                style={{ background: '#045' }}
            >
                <ambientLight intensity={0.8} color="#fff" />
                <spotLight intensity={1.1} position={[1, -1, 5]} />

                {/* Depth material attempt */}
                {/* <mesh>
                    <sphereBufferGeometry
                        attach="geometry"
                        args={[4, 32, 32]}
                    />

                    <meshDepthMaterial
                        attach="material"
                        color="white"
                        side={THREE.BackSide}
                    />
                </mesh> */}

                {/* Spiky ball */}
                <Ball />

                {/* Outer ring */}
                <mesh>
                    <sphereBufferGeometry
                        attach="geometry"
                        args={[0.9, 32, 32, 2.5, 5]}
                    />
                    <meshStandardMaterial
                        attach="material"
                        color="#c55"
                        emissive="#700"
                        map={sunTexture}
                        bumpMap={sunTexture}
                    />
                </mesh>

                {/* Circles */}
                <mesh position={[-0.001, 0, 0]} rotation={[0, 1.2, 0]}>
                    <circleBufferGeometry attach="geometry" args={[0.9, 32]} />
                    <meshStandardMaterial
                        attach="material"
                        color="#811"
                        // bumpMap={sunTexture}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <mesh position={[0.001, 0, 0]} rotation={[0, 2.5, 0]}>
                    <circleBufferGeometry attach="geometry" args={[0.9, 32]} />
                    <meshStandardMaterial
                        attach="material"
                        color="#811"
                        // bumpMap={sunTexture}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <mesh position={[0, 0, 0]} rotation={[0, 1.2, 0]}>
                    <circleBufferGeometry attach="geometry" args={[0.8, 32]} />
                    <meshLambertMaterial
                        attach="material"
                        color="#920"
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <mesh position={[0, 0, 0]} rotation={[0, 2.5, 0]}>
                    <circleBufferGeometry attach="geometry" args={[0.8, 32]} />
                    <meshLambertMaterial
                        attach="material"
                        color="#920"
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Core */}
                <mesh>
                    <sphereBufferGeometry
                        emissive="#a42"
                        attach="geometry"
                        args={[0.3, 32, 32]}
                    />
                    <meshLambertMaterial attach="material" color="#333" />
                </mesh>
                <Controls />
                <Effect />
            </Canvas>
        </>
    );
};

export default Globe;
