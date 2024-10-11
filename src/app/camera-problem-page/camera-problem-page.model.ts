export interface CameraCharacteristics {
  minDistance: number;
  maxDistance: number;
  minLightLevel: number;
  maxLightLevel: number;
}

export interface HardwareCamera {
  name: string;
  color: string;
  characteristics: CameraCharacteristics;
}
