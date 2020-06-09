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
import veinUrl from './veins.jpg';

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
const veinTexture = new THREE.TextureLoader().load(veinUrl);

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
                strength={2}
                radius={0.1}
                threshold={0.7}
            />
            <filmPass attachArray="passes" args={[0.25, 1, 1500, false]} />

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

const MouseMove = ({ eye }) => {
    const { camera, gl } = useThree();

    useFrame(({ mouse }) => {
        console.log(mouse);
        console.log(eye);

        eye.current.rotation.x = -mouse.y;
        eye.current.rotation.y = mouse.x;
    });
    return null;
};

const Eye = () => {
    // const geometry = new THREE.SphereBufferGeometry(1, 10, 10, 0, 2);
    // const edges = new THREE.EdgesGeometry(geometry);
    const eyeRef = React.useRef(null);
    return (
        <>
            <Canvas
                camera={{
                    fov: 75,
                    position: [0, 0, 5],
                }}
                style={{ background: '#045' }}
            >
                <ambientLight intensity={0.8} color="#fff" />
                {/* <spotLight intensity={0.9} position={[0, 0, 20]} /> */}
                {/* <spotLight intensity={1.1} position={[10, 10, -20]} /> */}

                <group ref={eyeRef}>
                    {/* eyeball */}
                    <mesh>
                        <sphereBufferGeometry
                            attach="geometry"
                            args={[0.9, 32, 32]}
                        />
                        <meshStandardMaterial
                            attach="material"
                            color="#999"
                            // emissive="#ccc"
                            map={veinTexture}
                            // bumpMap={sunTexture}
                        />
                    </mesh>

                    {/* iris */}
                    <mesh position={[0, 0, 0.72]} scale={[1, 1, 0.4]}>
                        <sphereBufferGeometry
                            attach="geometry"
                            args={[0.5, 32, 32, 0, 3]}
                        />
                        <meshStandardMaterial
                            attach="material"
                            color="#075"
                            emissive="#700"
                            bumpMap={sunTexture}
                        />
                    </mesh>

                    {/* Circles */}
                    <mesh position={[0, 0, 0.92]} rotation={[0, 0, 0]}>
                        <circleBufferGeometry
                            attach="geometry"
                            args={[0.2, 32]}
                        />
                        <meshStandardMaterial
                            attach="material"
                            color="#000"
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                </group>

                <mesh position={[0, 0, -1]}>
                    <circleBufferGeometry attach="geometry" args={[1.15, 32]} />
                    <meshStandardMaterial
                        attach="material"
                        color="#fff"
                        side={THREE.DoubleSide}
                    />
                </mesh>

                <MouseMove eye={eyeRef} />
                <Effect />
            </Canvas>
        </>
    );
};

export default Eye;
