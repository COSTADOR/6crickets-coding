import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {CameraCharacteristics, HardwareCamera} from './camera-problem-page.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CAMERAS} from './camera-problem-page.data';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-camera-problem',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    JsonPipe,
    NgIf
  ],
  templateUrl: './camera-problem-page.component.html',
  styleUrl: './camera-problem-page.component.scss'
})
export class CameraProblemPageComponent implements OnDestroy {
  cameraForm: FormGroup;
  requirementsForm: FormGroup;
  cameras: HardwareCamera[] = CAMERAS;
  result: boolean | null = null;

  minDistance: number = 0;
  maxDistance: number = 100;
  minLightLevel: number = 0;
  maxLightLevel: number = 100;

  private _destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.cameraForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      minDistance: [0, Validators.required],
      maxDistance: [0, Validators.required],
      minLightLevel: [0, Validators.required],
      maxLightLevel: [0, Validators.required]
    });

    this.requirementsForm = this.fb.group({
      minDistance: [0, Validators.required],
      maxDistance: [0, Validators.required],
      minLightLevel: [0, Validators.required],
      maxLightLevel: [0, Validators.required]
    });

    this.cameraForm.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => this.updateMinMaxValues());
    this.requirementsForm.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => this.updateMinMaxValues());

    this.updateMinMaxValues();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  addCamera() {
    if (!this.cameraForm.valid) {
      return;
    }

    const cameraData = this.cameraForm.value;
    this.cameras.push({
      name: cameraData.name,
      color: cameraData.color,
      characteristics: {
        minDistance: cameraData.minDistance,
        maxDistance: cameraData.maxDistance,
        minLightLevel: cameraData.minLightLevel,
        maxLightLevel: cameraData.maxLightLevel
      }
    });

    this.updateMinMaxValues();
    this.cameraForm.reset();
  }

  removeCamera(index: number) {
    this.cameras.splice(index, 1);
    this.updateMinMaxValues();
  }

  updateMinMaxValues() {
    if (this.cameras.length > 0) {
      this.minDistance = Math.min(...this.cameras.map(c => c.characteristics.minDistance), this.requirementsForm.value.minDistance);
      this.maxDistance = Math.max(...this.cameras.map(c => c.characteristics.maxDistance), this.requirementsForm.value.maxDistance);
      this.minLightLevel = Math.min(...this.cameras.map(c => c.characteristics.minLightLevel), this.requirementsForm.value.minLightLevel);
      this.maxLightLevel = Math.max(...this.cameras.map(c => c.characteristics.maxLightLevel), this.requirementsForm.value.maxLightLevel);
    }
    else {
      this.minDistance = this.requirementsForm.value.minDistance;
      this.maxDistance = this.requirementsForm.value.maxDistance;
      this.minLightLevel = this.requirementsForm.value.minLightLevel;
      this.maxLightLevel = this.requirementsForm.value.maxLightLevel;
    }
  }

  checkRequirements() {
    const requirements: CameraCharacteristics = {
      minDistance: this.requirementsForm.value.minDistance,
      maxDistance: this.requirementsForm.value.maxDistance,
      minLightLevel: this.requirementsForm.value.minLightLevel,
      maxLightLevel: this.requirementsForm.value.maxLightLevel
    };

    this.updateMinMaxValues();
    this.result = this.canCamerasCoverRequirements(requirements, this.cameras);
  }

  canCamerasCoverRequirements(
    requirements: CameraCharacteristics,
    cameras: HardwareCamera[]
  ): boolean {
    return cameras.some(camera => {
      const {minDistance, maxDistance, minLightLevel, maxLightLevel} = camera.characteristics;
      return (
        minDistance <= requirements.minDistance &&
        maxDistance >= requirements.maxDistance &&
        minLightLevel <= requirements.minLightLevel &&
        maxLightLevel >= requirements.maxLightLevel
      );
    });
  }

  getLeft(value: number, min: number, max: number): number {
    return ((value - min) / (max - min)) * 100;
  }

  getWidth(minValue: number, maxValue: number, min: number, max: number): number {
    return ((maxValue - minValue) / (max - min)) * 100;
  }
}
