import * as THREE from 'three';

/**
 * Creates a slow-motion looping Mixamo-compatible "Skydiving / Free-Fall" AnimationClip.
 * Character is posed in an arched free-fall position with arms spread wide,
 * legs flexed, and subtle aerodynamic wind buffeting.
 */
export function createFreeFallAnimationClip() {
  const duration = 2.4; // Slow-motion majestic free-fall loop
  const times = [0, 0.6, 1.2, 1.8, 2.4];

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

  // 1. Hips Position (subtle vertical air-cushion float)
  const hipsPositions = [
    0.0, 0.95, 0.0,
    0.02, 0.98, -0.02,
    0.0, 0.94, 0.0,
    -0.02, 0.97, 0.02,
    0.0, 0.95, 0.0,
  ];
  tracks.push(new THREE.VectorKeyframeTrack('mixamorigHips.position', times, hipsPositions));

  // 2. Hips Rotation (forward pitch into the wind with gentle roll)
  const hipsRotations = [
    [0.32,  0.02,  0.01],
    [0.36, -0.02, -0.02],
    [0.30,  0.01,  0.02],
    [0.34, -0.01, -0.01],
    [0.32,  0.02,  0.01],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack('mixamorigHips.quaternion', times, eulerToQuatArray(hipsRotations))
  );

  // 3. Spine (arched back against terminal velocity airflow)
  const spineRotations = [
    [-0.18, 0.00, 0.01],
    [-0.22, 0.02, -0.01],
    [-0.16, -0.02, 0.02],
    [-0.20, 0.01, -0.01],
    [-0.18, 0.00, 0.01],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack('mixamorigSpine.quaternion', times, eulerToQuatArray(spineRotations))
  );

  // 4. Chest
  const chestRotations = [
    [-0.12, 0.00, 0.00],
    [-0.15, -0.01, 0.01],
    [-0.10, 0.01, -0.01],
    [-0.14, 0.00, 0.01],
    [-0.12, 0.00, 0.00],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack('mixamorigChest.quaternion', times, eulerToQuatArray(chestRotations))
  );

  // 5. Head (pitched up, gaze locked forward into descent)
  const headRotations = [
    [0.38, 0.00, 0.00],
    [0.42, 0.02, 0.01],
    [0.35, -0.02, -0.01],
    [0.40, 0.01, 0.00],
    [0.38, 0.00, 0.00],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack('mixamorigHead.quaternion', times, eulerToQuatArray(headRotations))
  );

  // 6. Left Arm (spread wide into windstream)
  const leftArmRotations = [
    [-0.25, 0.12, -0.75],
    [-0.30, 0.08, -0.70],
    [-0.22, 0.15, -0.78],
    [-0.28, 0.10, -0.72],
    [-0.25, 0.12, -0.75],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack('mixamorigLeftArm.quaternion', times, eulerToQuatArray(leftArmRotations))
  );

  // 7. Left Forearm (elbow bent, cupping air)
  const leftForearmRotations = [
    [0.55, 0.10, 0.00],
    [0.62, 0.12, 0.02],
    [0.50, 0.08, -0.01],
    [0.58, 0.11, 0.01],
    [0.55, 0.10, 0.00],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack('mixamorigLeftForeArm.quaternion', times, eulerToQuatArray(leftForearmRotations))
  );

  // 8. Right Arm (symmetrical spread with slight organic variance)
  const rightArmRotations = [
    [-0.25, -0.12, 0.75],
    [-0.28, -0.10, 0.72],
    [-0.22, -0.15, 0.78],
    [-0.30, -0.08, 0.70],
    [-0.25, -0.12, 0.75],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack('mixamorigRightArm.quaternion', times, eulerToQuatArray(rightArmRotations))
  );

  // 9. Right Forearm
  const rightForearmRotations = [
    [0.55, -0.10, 0.00],
    [0.58, -0.11, -0.01],
    [0.50, -0.08, 0.01],
    [0.62, -0.12, -0.02],
    [0.55, -0.10, 0.00],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack('mixamorigRightForeArm.quaternion', times, eulerToQuatArray(rightForearmRotations))
  );

  // 10. Left Up Leg (spread and flexed back)
  const leftThighRotations = [
    [0.45, 0.12, -0.32],
    [0.50, 0.10, -0.28],
    [0.42, 0.14, -0.35],
    [0.48, 0.11, -0.30],
    [0.45, 0.12, -0.32],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack('mixamorigLeftUpLeg.quaternion', times, eulerToQuatArray(leftThighRotations))
  );

  // 11. Left Knee (flexed)
  const leftKneeRotations = [
    [-0.85, 0.00, 0.00],
    [-0.92, 0.02, 0.01],
    [-0.80, -0.02, -0.01],
    [-0.88, 0.01, 0.00],
    [-0.85, 0.00, 0.00],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack('mixamorigLeftLeg.quaternion', times, eulerToQuatArray(leftKneeRotations))
  );

  // 12. Right Up Leg (symmetrical spread)
  const rightThighRotations = [
    [0.45, -0.12, 0.32],
    [0.48, -0.11, 0.30],
    [0.42, -0.14, 0.35],
    [0.50, -0.10, 0.28],
    [0.45, -0.12, 0.32],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack('mixamorigRightUpLeg.quaternion', times, eulerToQuatArray(rightThighRotations))
  );

  // 13. Right Knee (flexed)
  const rightKneeRotations = [
    [-0.85, 0.00, 0.00],
    [-0.88, -0.01, 0.00],
    [-0.80, 0.02, 0.01],
    [-0.92, -0.02, -0.01],
    [-0.85, 0.00, 0.00],
  ];
  tracks.push(
    new THREE.QuaternionKeyframeTrack('mixamorigRightLeg.quaternion', times, eulerToQuatArray(rightKneeRotations))
  );

  return new THREE.AnimationClip('FreeFall', duration, tracks);
}

