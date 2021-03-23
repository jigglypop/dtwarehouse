import React, { useState, useMemo, useEffect } from 'react';
import {
  MapControls,
  OrbitControls,
} from 'three/examples/jsm/controls/OrbitControls';

import { extend } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useSpring, a } from 'react-spring/three';
import * as THREE from 'three';

extend({
  MapControls,
  OrbitControls,
});

export const distance = 1600;

export const ArtMuseum = ({ number }) => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load('/square/gallery.gltf', setModel);
  }, []);

  return model ? (
    <mesh position={[200, -200, (number - 1) * 1600]}>
      <primitive object={model.scene} receiveShadow />
    </mesh>
  ) : null;
};

export const Wall = () => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load('/square/wall.gltf', setModel);
  }, []);

  return model ? (
    <mesh position={[170, -200, -350]}>
      <primitive object={model.scene} receiveShadow />
    </mesh>
  ) : null;
};

export const Frame = ({ postId, image_file, onPush, realId, ratio }) => {
  const [hovered, setHover] = useState(false);
  const texture = useMemo(
    () => new THREE.TextureLoader().setCrossOrigin('').load(image_file),
    [image_file],
  );

  let share = parseInt(postId / 6);
  let remainder = postId % 6;
  const props = useSpring({
    scale: hovered ? [1.5, 1.5, 1.5] : [1, 1, 1],
  });
  const boxSize = 120;
  const Yvalue = -220;
  const boxOuterSize = 10;
  if (!ratio) {
    return null;
  }
  const meshSet = () => {
    if (remainder === 0) {
      return [-470, Yvalue, distance * share];
    }
    if (remainder === 1) {
      return [-470, Yvalue, 730 + distance * share];
    }
    if (remainder === 2) {
      return [-80, Yvalue, -180 + distance * share];
    }
    if (remainder === 3) {
      return [450, Yvalue, -180 + distance * share];
    }
    if (remainder === 4) {
      return [770, Yvalue, distance * share];
    }
    if (remainder === 5) {
      return [770, Yvalue, 730 + distance * share];
    }
  };
  const meshOuterSet = () => {
    if (remainder === 0) {
      return [-470 - 5, Yvalue, distance * share];
    }
    if (remainder === 1) {
      return [-470 - 5, Yvalue, 730 + distance * share];
    }
    if (remainder === 2) {
      return [-80, Yvalue, -180 + distance * share - 5];
    }
    if (remainder === 3) {
      return [450, Yvalue, -180 + distance * share - 5];
    }
    if (remainder === 4) {
      return [770 + 5, Yvalue, distance * share];
    }
    if (remainder === 5) {
      return [770 + 5, Yvalue, 730 + distance * share];
    }
  };
  const boxSet = () => {
    if (remainder === 0) {
      return [10, boxSize, ratio * boxSize];
    }
    if (remainder === 1) {
      return [10, boxSize, ratio * boxSize];
    }
    if (remainder === 2) {
      return [ratio * boxSize, boxSize, 5];
    }
    if (remainder === 3) {
      return [ratio * boxSize, boxSize, 5];
    }
    if (remainder === 4) {
      return [10, boxSize, ratio * boxSize];
    }
    if (remainder === 5) {
      return [10, boxSize, ratio * boxSize];
    }
  };
  const boxOuterSet = () => {
    if (remainder === 0) {
      return [5, boxSize + boxOuterSize, ratio * boxSize + boxOuterSize];
    }
    if (remainder === 1) {
      return [5, boxSize + boxOuterSize, ratio * boxSize + boxOuterSize];
    }
    if (remainder === 2) {
      return [ratio * boxSize + boxOuterSize, boxSize + boxOuterSize, 5];
    }
    if (remainder === 3) {
      return [ratio * boxSize + boxOuterSize, boxSize + boxOuterSize, 5];
    }
    if (remainder === 4) {
      return [5, boxSize + boxOuterSize, ratio * boxSize + boxOuterSize];
    }
    if (remainder === 5) {
      return [5, boxSize + boxOuterSize, ratio * boxSize + boxOuterSize];
    }
  };
  const meshResult = meshSet();
  const meshOuterResult = meshOuterSet();

  const boxResult = boxSet();
  const boxOuterResult = boxOuterSet();
  if (
    meshResult &&
    boxResult &&
    boxOuterResult &&
    meshOuterResult &&
    texture &&
    image_file
  ) {
    return (
      <>
        <a.mesh
          position={[meshResult[0], meshResult[1], meshResult[2]]}
          onClick={() => onPush(postId)}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          scale={props.scale}
        >
          <boxBufferGeometry
            attach="geometry"
            args={[boxResult[0], boxResult[1], boxResult[2]]}
          />
          <a.meshBasicMaterial attach="material" map={texture} />
        </a.mesh>
        <a.mesh
          position={[
            meshOuterResult[0],
            meshOuterResult[1],
            meshOuterResult[2],
          ]}
          onClick={() => onPush(realId)}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          scale={props.scale}
          castShadow
          receiveShadow
        >
          <boxBufferGeometry
            attach="geometry"
            args={[boxOuterResult[0], boxOuterResult[1], boxOuterResult[2]]}
            map={texture}
          />
          <a.meshBasicMaterial attach="material" color="black" />
        </a.mesh>
      </>
    );
  } else {
    return null;
  }
};

export const ColorMuseum = () => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load('/square/museum.gltf', setModel);
  }, []);

  return model ? (
    <mesh position={[170, 700, -350]}>
      <primitive object={model.scene} receiveShadow />
    </mesh>
  ) : null;
};
