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
    lifeChange: '',
    toHospital: '',
    hadSurgery: '',
    hadTherapy: '',
    activeTherapy: '',
    wheelchairSkills: '',
    armStrengthening: '',
    stopInfo: '',
    other: '',
  });
  currentMetadata = this.metadataSource.asObservable();

  constructor() {}

  changeMetadata(metadata: MetaInfo) {
    console.log('changing metadata to the following');
    console.log(metadata);
    this.metadataSource.next(metadata);
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
      lifeChange: '',
      toHospital: '',
      hadSurgery: '',
      hadTherapy: '',
      activeTherapy: '',
      wheelchairSkills: '',
      armStrengthening: '',
      stopInfo: '',
      other: '',
    });
  }
}
