import * as THREE from 'three';
import React, { Suspense } from 'react';
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';

import Mill from './mill';

extend({ OrbitControls, OutlinePass });

// 1. Canvas

// 2. Renderer

// 3. Scene

// 3A. Camera

// 4. Mesh

// 5. Geometry

// 5A. Texture

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

// function Effect() {
//     const composer = React.useRef();
//     const { scene, gl, size, camera } = useThree();
//     const aspect = React.useMemo(
//         () => new THREE.Vector2(size.width, size.height),
//         [size],
//     );
//     React.useEffect(
//         () => void composer.current.setSize(size.width, size.height),
//         [size],
//     );
//     useFrame(() => composer.current.render(), 1);
//     return (
//         <effectComposer ref={composer} args={[gl]}>
//             <renderPass
//                 attachArray="passes"
//                 scene={scene}
//                 camera={camera}
//                 antialias={true}
//             />
//             <unrealBloomPass attachArray="passes" args={[aspect, 1, 1, 0]} />
//             <outlinePass
//                 attachArray="passes"
//                 args={[aspect, scene, camera]}
//                 // selectedObjects={hovered}
//                 visibleEdgeColor="white"
//                 edgeStrength={50}
//                 edgeThickness={5}
//                 edgeGlow={10}
//                 hiddenEdgeColor="#000000"
//             />
//         </effectComposer>
//     );
// }

const Scratch = () => {
    return (
        <Canvas
            camera={{
                fov: 75,
                position: [0.5, -0.5, 0.5],
            }}
            style={{ background: '#000' }}
        >
            <scene>
                <Suspense fallback={null}>
                    <Mill />
                </Suspense>
                <Controls />
                {/* <Effect /> */}
            </scene>
        </Canvas>
    );
};

export default Scratch;
