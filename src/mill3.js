/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useLoader(GLTFLoader, '/mill7.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={materials.Default_Material}
        geometry={nodes.pCube1.geometry}
        position={[0, 0.1, 0]}
        rotation={[0.72, 0, 0]}
        scale={[1.3, 27.13, 5.01]}
      />
      <mesh
        material={materials.Default_Material}
        geometry={nodes.pasted__pCube1.geometry}
        position={[0, 0.1, 0]}
        rotation={[2.43, 0, 0]}
        scale={[1.3, 27.13, 5.01]}
      />
      <mesh
        material={materials.Default_Material}
        geometry={nodes.pCone1.geometry}
        position={[0, 0, 0]}
        scale={[10.61, 6.25, 10.97]}
      />
    </group>
  )
}