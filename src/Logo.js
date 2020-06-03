import * as THREE from 'three';
import React from 'react';
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader';

// Makes these prototypes available as "native" jsx-string elements
extend({
    EffectComposer,
    ShaderPass,
    RenderPass,
    AfterimagePass,
    UnrealBloomPass,
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
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <unrealBloomPass attachArray="passes" args={[aspect, 1.5, 1, 0]} />
            <shaderPass
                attachArray="passes"
                args={[SobelOperatorShader]}
                uniforms-resolution-value={[
                    window.innerWidth * window.devicePixelRatio,
                    window.innerHeight * window.devicePixelRatio,
                ]}
                renderToScreen
            />
        </effectComposer>
    );
}

const BoxRotate = ({ mouse }) => {
    const box = React.useRef(null);
    useFrame(({ clock, camera }) => {
        box.current.rotation.x = mouse.current[1] / 100;
        box.current.rotation.y = mouse.current[0] / 50;
    });
    return (
        <mesh ref={box}>
            <boxBufferGeometry
                attach="geometry"
                args={[8, 12, 11]}
                rotateX={mouse.current[0]}
            />
            <meshLambertMaterial
                attach="material"
                color="0x00f0f0"
                // depthTest={false}
            />
        </mesh>
    );
};

const Logo = () => {
    const mouse = React.useRef([0, 0]);
    const onMouseMove = React.useCallback(({ clientX: x, clientY: y }) => {
        mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2];
    }, []);

    return (
        <Canvas
            camera={{
                fov: 75,
                position: [0, -10, 40],
            }}
            onMouseMove={onMouseMove}
        >
            <spotLight
                intensity={0.8}
                position={[0, 10, 50]}
                penumbra={1}
                color="red"
            />

            <Effect />
            <BoxRotate mouse={mouse} />
        </Canvas>
    );
};

export default Logo;
