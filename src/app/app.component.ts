import { Component } from '@angular/core';
import { MetaInfo } from './shared/meta-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pediatric-pain-rater';

  metadata: MetaInfo = {
    personId: '',
    age: -1,
    sex: '',
    yearsInWheelchair: -1,
    wheelchairType: '',
    primaryDiagnosis: '',
    numTransfers: -1,
    lifeChange: '',
    toHospital: '',
    hadSurgery: '',
    hadTherapy: '',
    activeTherapy: '',
    wheelchairSkills: '',
    armStrengthening: '',
    stopInfo: '',
    other: '',
  };
}
