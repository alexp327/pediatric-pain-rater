import { Injectable } from '@angular/core';
import { MetaInfo } from '../shared/meta-info';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class SubmitMetadataService {
  private metadataSource = new BehaviorSubject<MetaInfo>({
    personId: '',
    dominantHand: '',
    numSurgeries: -1,
    sex: '',
  });
  currentMetadata = this.metadataSource.asObservable();

  constructor() {}

  changeMetadata(metadata: MetaInfo) {
    this.metadataSource.next(metadata);
    console.log('changed the metadata');
    console.log(this.metadataSource);
  }
}
