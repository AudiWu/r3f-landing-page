import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import { useGLTF } from "@react-three/drei";

export const Banana = ({ z }) => {
  const ref = useRef();

  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
  const { nodes, materials } = useGLTF("/banana-transformed.glb");

  const [data] = useState({
    x: MathUtils.randFloatSpread(2),
    y: MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.001),
      (data.rZ += 0.001)
    );
    ref.current.position.set(data.x * width, (data.y += 0.0025), z);

    if (data.y > height) {
      data.y = -height;
    }
  });

  return (
    <mesh
      ref={ref}
      geometry={nodes.banana.geometry}
      material={materials.skin}
      rotation={[-Math.PI / 2, 0, 0]}
      material-emissive="orange"
    />
  );
};
