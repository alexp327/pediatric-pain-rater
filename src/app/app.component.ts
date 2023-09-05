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
    dominantHand: '',
    numSurgeries: -1,
    sex: '',
  };
}
