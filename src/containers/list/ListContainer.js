import React, { Suspense, useRef, useEffect } from 'react';
import {
  MapControls,
  OrbitControls,
} from 'three/examples/jsm/controls/OrbitControls';

import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import { withRouter } from 'react-router';
import * as THREE from 'three';
import { useDispatch, useSelector } from 'react-redux';
import { minipostPosts } from '../../modules/minipost';
import { artNext } from '../../modules/minipost';
import { minilistPosts } from '../../modules/minilist';
import { setOpenpost } from '../../modules/openpost';
import { setPosition } from '../../modules/position';

import { Frame, ArtMuseum, Wall, ColorMuseum, distance } from './ThreeItems';

extend({
  MapControls,
  OrbitControls,
});

const page_url = '/api/posts/?page=';

function ListContainer() {
  const dispatch = useDispatch();
  const { next, minipost, artnext, position } = useSelector(
    ({ minipost, position }) => ({
      error: minipost.error,
      next: minipost.next,
      minipost: minipost.minipost,
      artnext: minipost.nextPage,
      position: position.position,
    }),
  );

  useEffect(() => {
    dispatch(minilistPosts());
    localStorage.setItem('Card', 'List');
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem('nexts') !== 'last') {
      dispatch(minipostPosts(page_url + '1'));
      dispatch(artNext(1));
    }
  }, [dispatch]);

  if (next === null) {
    localStorage.setItem('nexts', 'last');
    localStorage.setItem('nextPage', 100000000000000000000000000000000000);
  } else {
    const nextPage = next.split(page_url)[1];
    const nexts = page_url + nextPage;
    localStorage.setItem('nexts', nexts);
    localStorage.setItem('nextPage', parseInt(nextPage));
  }

  const Controls = ({ positionX, positionY, positionZ }) => {
    const orbitRef = useRef();
    const { camera, gl } = useThree();
    useEffect(() => {
      camera.position.x = positionX;
      camera.position.y = positionY;
      camera.position.z = positionZ;
    }, [
      positionX,
      positionY,
      positionZ,
      camera.position.x,
      camera.position.y,
      camera.position.z,
    ]);
    useFrame(() => {
      orbitRef.current.update();
      const next = localStorage.getItem('nexts');
      const nextPage = localStorage.getItem('nextPage');
      if (
        camera.position.z < (nextPage - 1) * distance &&
        camera.position.z > (nextPage - 1) * distance - 150
      ) {
        localStorage.removeItem('nexts');
        localStorage.removeItem('nextPage');
        dispatch(minipostPosts(next));
        dispatch(artNext(parseInt(nextPage)));
      }
    });

    return <mapControls args={[camera, gl.domElement]} ref={orbitRef} />;
  };

  const setArtnext = new Set(artnext);
  setArtnext.delete(NaN);
  const listArtnext = [...setArtnext];
  const onPush = (id) => {
    dispatch(setOpenpost(id));
  };

  useEffect(() => {
    dispatch(setPosition({ positionX: 600, positionY: 2600, positionZ: 1000 }));
  }, [dispatch]);

  if (position) {
    return (
      <>
        <Canvas
          camera={{
            position: [
              position.positionX,
              position.positionY,
              position.positionZ,
            ],
            far: 10000,
          }}
        >
          <Controls
            positionX={position.positionX}
            positionY={position.positionY}
            positionZ={position.positionZ}
          />
          <ambientLight castShadow />
          <mesh
            visible
            userData={{ test: 'hello' }}
            position={new THREE.Vector3(1, 2, 3)}
            rotation={new THREE.Euler(0, 0, 0)}
            geometry={new THREE.SphereGeometry(1, 16, 16)}
            material={
              new THREE.MeshBasicMaterial({
                color: new THREE.Color('hotpink'),
                transparent: true,
              })
            }
          />
          <mesh>
            <Wall />
          </mesh>
          <mesh>
            <ColorMuseum />
          </mesh>

          <mesh>
            {listArtnext &&
              listArtnext.map((item, index) => (
                <ArtMuseum attach="material" number={item} key={index} />
              ))}
          </mesh>

          <Suspense fallback={null}>
            <mesh>
              {minipost &&
                minipost.map((item, index) => (
                  <Frame
                    key={index}
                    postId={index}
                    realId={item.id}
                    ratio={1}
                    image_file={item.image_file}
                    onPush={() => onPush(item.id)}
                  />
                ))}
            </mesh>
          </Suspense>
        </Canvas>
      </>
    );
  } else {
    return null;
  }
}
export default withRouter(ListContainer);
