import * as THREE from 'three';

/**
 * Creates a standard looping Mixamo-compatible Walk AnimationClip.
 * Controls hips bobbing, thigh swing, knee flex, spine yaw counter-twist, and arm swings.
 * 
 * Duration: 1.2 seconds (standard human walking cadence ~100 steps/min).
 */
export function createWalkAnimationClip() {
  const duration = 1.2;
  const times = [0, 0.3, 0.6, 0.9, 1.2];

  // Helper to convert Euler [x, y, z] to quaternion array [x, y, z, w]
  const eulerToQuatArray = (rotations) => {
    const qArray = [];
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    for (let i = 0; i < rotations.length; i++) {
      const [rx, ry, rz] = rotations[i];
      e.set(rx, ry, rz, 'XYZ');
      q.setFromEuler(e);
      qArray.push(q.x, q.y, q.z, q.w);
    }
    return qArray;
  };

  const tracks = [];

  // 1. Hips Position (vertical bobbing + subtle lateral weight sway)
  const hipsPositions = [
    -0.02, 0.93, 0.0,
     0.00, 0.97, 0.0,
     0.02, 0.93, 0.0,
     0.00, 0.97, 0.0,
    -0.02, 0.93, 0.0,
  ];
  tracks.push(new THREE.VectorKeyframeTrack('mixamorigHips.position', times, hipsPositions));

  // 2. Hips Rotation (subtle pelvic roll)
  const hipsRotations = [
    [0.02, -0.04,  0.03],
    [0.04,  0.00,  0.00],
    [0.02,  0.04, -0.03],
    [0.04,  0.00,  0.00],
    [0.02, -0.04,  0.03],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack(
      'mixamorigHips.quaternion',
      times,
      eulerToQuatArray(hipsRotations)
    )
  );

  // 3. Spine Rotation (counter-rotation around Y axis to balance stride)
  const spineRotations = [
    [0.04,  0.06, 0.0],
    [0.03,  0.00, 0.0],
    [0.04, -0.06, 0.0],
    [0.03,  0.00, 0.0],
    [0.04,  0.06, 0.0],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack(
      'mixamorigSpine.quaternion',
      times,
      eulerToQuatArray(spineRotations)
    )
  );

  // 4. Left Up Leg (Thigh forward & back swing)
  const leftThighRotations = [
    [ 0.48, 0.0,  0.02],
    [ 0.05, 0.0,  0.00],
    [-0.38, 0.0, -0.02],
    [ 0.05, 0.0,  0.00],
    [ 0.48, 0.0,  0.02],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack(
      'mixamorigLeftUpLeg.quaternion',
      times,
      eulerToQuatArray(leftThighRotations)
    )
  );

  // 5. Left Knee (Flexion during swing-through, extension at contact)
  const leftKneeRotations = [
    [-0.12, 0.0, 0.0],
    [-0.08, 0.0, 0.0],
    [-0.30, 0.0, 0.0],
    [-0.88, 0.0, 0.0],
    [-0.12, 0.0, 0.0],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack(
      'mixamorigLeftLeg.quaternion',
      times,
      eulerToQuatArray(leftKneeRotations)
    )
  );

  // 6. Right Up Leg (Half cycle out of phase with Left Up Leg)
  const rightThighRotations = [
    [-0.38, 0.0, -0.02],
    [ 0.05, 0.0,  0.00],
    [ 0.48, 0.0,  0.02],
    [ 0.05, 0.0,  0.00],
    [-0.38, 0.0, -0.02],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack(
      'mixamorigRightUpLeg.quaternion',
      times,
      eulerToQuatArray(rightThighRotations)
    )
  );

  // 7. Right Knee (Half cycle out of phase with Left Knee)
  const rightKneeRotations = [
    [-0.30, 0.0, 0.0],
    [-0.88, 0.0, 0.0],
    [-0.12, 0.0, 0.0],
    [-0.08, 0.0, 0.0],
    [-0.30, 0.0, 0.0],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack(
      'mixamorigRightLeg.quaternion',
      times,
      eulerToQuatArray(rightKneeRotations)
    )
  );

  // 8. Left Arm (Swings in opposition to Left Leg)
  const leftArmRotations = [
    [-0.35, 0.0, -0.08],
    [ 0.00, 0.0, -0.06],
    [ 0.38, 0.0, -0.04],
    [ 0.00, 0.0, -0.06],
    [-0.35, 0.0, -0.08],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack(
      'mixamorigLeftArm.quaternion',
      times,
      eulerToQuatArray(leftArmRotations)
    )
  );

  // 9. Left Forearm (Elbow bend)
  const leftForearmRotations = [
    [0.35, 0.0, 0.0],
    [0.28, 0.0, 0.0],
    [0.62, 0.0, 0.0],
    [0.30, 0.0, 0.0],
    [0.35, 0.0, 0.0],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack(
      'mixamorigLeftForeArm.quaternion',
      times,
      eulerToQuatArray(leftForearmRotations)
    )
  );

  // 10. Right Arm (Swings in opposition to Right Leg)
  const rightArmRotations = [
    [ 0.38, 0.0,  0.04],
    [ 0.00, 0.0,  0.06],
    [-0.35, 0.0,  0.08],
    [ 0.00, 0.0,  0.06],
    [ 0.38, 0.0,  0.04],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack(
      'mixamorigRightArm.quaternion',
      times,
      eulerToQuatArray(rightArmRotations)
    )
  );

  // 11. Right Forearm (Elbow bend)
  const rightForearmRotations = [
    [0.62, 0.0, 0.0],
    [0.30, 0.0, 0.0],
    [0.35, 0.0, 0.0],
    [0.28, 0.0, 0.0],
    [0.62, 0.0, 0.0],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack(
      'mixamorigRightForeArm.quaternion',
      times,
      eulerToQuatArray(rightForearmRotations)
    )
  );

  // 12. Head (Stabilization nod)
  const headRotations = [
    [-0.04, -0.02, 0.0],
    [-0.01,  0.00, 0.0],
    [-0.04,  0.02, 0.0],
    [-0.01,  0.00, 0.0],
    [-0.04, -0.02, 0.0],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack(
      'mixamorigHead.quaternion',
      times,
      eulerToQuatArray(headRotations)
    )
  );

  return new THREE.AnimationClip('Walk', duration, tracks);
}

