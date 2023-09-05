import { Component } from '@angular/core';
import { SubmitMetadataService } from '../services/submit-metadata.service';
import { SubmitQuestionnaireService } from '../services/submit-questionnaire.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  metadata: any;
  results: any;

  constructor(
    private metaService: SubmitMetadataService,
    private questService: SubmitQuestionnaireService
  ) {}

  ngOnInit() {
    this.metaService.currentMetadata.subscribe(
      (metadata) => (this.metadata = metadata)
    );
    this.questService.currentResults.subscribe(
      (results) => (this.results = results)
    );
  }
}
