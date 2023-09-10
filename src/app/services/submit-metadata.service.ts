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
    //@ts-ignore
    numSurgeries: undefined,
    sex: '',
  });
  currentMetadata = this.metadataSource.asObservable();

  constructor() {}

  changeMetadata(metadata: MetaInfo) {
    this.metadataSource.next(metadata);
  }
}
