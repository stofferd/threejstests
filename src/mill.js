/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useLoader, useFrame, useThree } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshLambertMaterial } from 'three';
import logoUrl from './mill7.gltf';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader';

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
                args={[SobelOperatorShader]}
                color="0x00ff00"
                uniforms-resolution-value={[
                    window.innerWidth * window.devicePixelRatio,
                    window.innerHeight * window.devicePixelRatio,
                ]}
                // uniforms-edgeIntensity={0.1}
                // uniforms={{ bIntensity: 0.5 }}
                renderToScreen
            />
        </effectComposer>
    );
}

export default function Model(props) {
    const groupRef = useRef();
    const { nodes } = useLoader(GLTFLoader, logoUrl);

    // const edges1 = new THREE.EdgesGeometry(nodes.pCube1.geometry);
    // const edges2 = new THREE.EdgesGeometry(nodes.pasted__pCube1.geometry);
    // const lineMaterial = new LineBasicMaterial({ color: 'red', linewidth: 1 });
    return (
        <group ref={groupRef} {...props} dispose={null}>
            <spotLight
                intensity={0.5}
                fov={75}
                position={[0.1, -0.1, 1]}
                penumbra={1}
                color="white"
            />

            <ambientLight intensity={0.4} color="white" />

            {/* <lineSegments
                material={lineMaterial}
                geometry={edges1}
                position={[0, 0.1, 0]}
                rotation={[0.72, 0, 0]}
                scale={[1.3, 27.13, 5.01]}
            />
            <lineSegments
                material={lineMaterial}
                geometry={edges2}
                position={[0.01, 0.1, 0]}
                rotation={[2.43, 0, 0]}
                scale={[1.3, 27.13, 5.01]}
            /> */}

            <mesh
                material={new MeshLambertMaterial({ color: 'white' })}
                geometry={nodes.pCube1.geometry}
                position={[0, 0.1, 0]}
                rotation={[0.72, 0, 0]}
                scale={[1.3, 27.13, 5.01]}
            />
            <mesh
                material={new MeshLambertMaterial({ color: 'white' })}
                geometry={nodes.pasted__pCube1.geometry}
                position={[0.01, 0.1, 0]}
                rotation={[2.43, 0, 0]}
                scale={[1.3, 27.13, 5.01]}
            />
            <mesh
                material={new MeshLambertMaterial({ color: 'white' })}
                geometry={nodes.pCone1.geometry}
                position={[0, 0, 0]}
                scale={[10.61, 6.25, 10.97]}
                computeVertexNormals
            />
            <Effect />
        </group>
    );
}
