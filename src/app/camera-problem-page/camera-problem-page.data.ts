import {HardwareCamera} from './camera-problem-page.model';

export const CAMERAS: HardwareCamera[] = [
  {
    name: 'Camera A',
    color: '#f30000',
    characteristics: {
      minDistance: 10,
      maxDistance: 20,
      minLightLevel: 100,
      maxLightLevel: 800
    }
  },
  {
    name: 'Camera B',
    color: '#33ff30',
    characteristics: {
      minDistance: 30,
      maxDistance: 50,
      minLightLevel: 50,
      maxLightLevel: 600
    }
  },
  {
    name: 'Camera C',
    color: '#bd9800',
    characteristics: {
      minDistance: 2,
      maxDistance: 20,
      minLightLevel: 200,
      maxLightLevel: 1000
    }
  }
];
