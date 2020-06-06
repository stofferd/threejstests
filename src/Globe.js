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
} from 'three';
import React, { Suspense } from 'react';
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import noiseUrl from './noise.jpg';

extend({
    OrbitControls,
    EdgesGeometry,
    LineSegments,
    LineBasicMaterial,
    MeshPhongMaterial,
    SphereBufferGeometry,
    SphereGeometry,
    MeshStandardMaterial,
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
                strength={2}
                radius={0.1}
                threshold={0.3}
            />
            {/* <shaderPass
                attachArray="passes"
                args={[FXAAShader]}
                color="0x00ff00"
                uniforms-resolution-value={[
                    window.innerWidth * window.devicePixelRatio,
                    window.innerHeight * window.devicePixelRatio,
                ]}
                // uniforms-edgeIntensity={0.1}
                // uniforms={{ bIntensity: 0.5 }}
                renderToScreen
            /> */}
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

    useFrame(() => {
        // console.log(mesh.current.geometry.parameters);
        mesh.current.geometry.parameters.radius = mesh.current.geometry.parameters.radius += 1;
        mesh.current.geometry.parameters.phiStart = mesh.current.geometry.parameters.phiStart += 1;
        mesh.current.rotation.x = mesh.current.rotation.y += 0.001;
        // mesh.current.scale.x = mesh.current.scale.y += 0.001;
    });

    return (
        <mesh ref={mesh}>
            <sphereGeometry
                attach="geometry"
                args={[1, 16, 16, 1, 1, 1, 1]}

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
                // bumpMap={new THREE.TextureLoader().load(noiseUrl)}
                displacementMap={new THREE.TextureLoader().load(noiseUrl)}
                displacementScale={0.5}
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
                style={{ background: '#000' }}
            >
                <ambientLight intensity={1.2} color="#fff" />
                <spotLight intensity={1.5} />

                <Ball />
                {/* <edgesGeometry attach="geometry" args={geometry} /> */}

                <Controls />
                <Effect />
            </Canvas>
        </>
    );
};

export default Globe;
