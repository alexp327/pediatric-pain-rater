import { Injectable } from '@angular/core';
import { MetaInfo } from '../shared/meta-info';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class SubmitMetadataService {
  private metadataSource = new BehaviorSubject<MetaInfo>({
    personId: '',
    // @ts-expect-error
    age: null,
    sex: '',
    // @ts-expect-error
    yearsInWheelchair: null,
    wheelchairType: '',
    primaryDiagnosis: '',
    // @ts-expect-error
    numTransfers: null,
    newWheelchair: '',
    lifeChange: '',
    toHospital: '',
    hadSurgery: '',
    hadTherapy: '',
    activeTherapy: '',
    wheelchairSkills: '',
    armStrengthening: '',
    stopInfo: '',
    painSide: '',
    painTime: '',
    other: '',
  });
  currentMetadata = this.metadataSource.asObservable();

  constructor() {}

  changeMetadata(metadata: MetaInfo) {
    this.metadataSource.next(metadata);
  }

  hasNoPain() {
    return this.metadataSource.value.painSide === 'neither';
  }

  resetMetadata() {
    this.metadataSource.next({
      personId: '',
      // @ts-expect-error
      age: null,
      sex: '',
      // @ts-expect-error
      yearsInWheelchair: null,
      wheelchairType: '',
      primaryDiagnosis: '',
      // @ts-expect-error
      numTransfers: null,
      newWheelchair: '',
      lifeChange: '',
      toHospital: '',
      hadSurgery: '',
      hadTherapy: '',
      activeTherapy: '',
      wheelchairSkills: '',
      armStrengthening: '',
      stopInfo: '',
      painSide: '',
      painTime: '',
      other: '',
    });
  }
}
