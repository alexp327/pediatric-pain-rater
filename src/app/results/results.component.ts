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

  metadataTableInfo: any[] = [];

  displayedResultsColumns: string[] = ['prompt', 'rating'];
  displayedMetadataColumns: string[] = ['info', 'input'];

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

    this.loadMetadataTableInfo();
  }

  loadMetadataTableInfo() {
    this.metadataTableInfo.push({
      info: 'ID',
      input: this.metadata.personId,
    });
    this.metadataTableInfo.push({
      info: 'Dominant Hand',
      input: this.metadata.dominantHand,
    });
    this.metadataTableInfo.push({
      info: 'Number of Surgeries',
      input: this.metadata.numSurgeries,
    });
    this.metadataTableInfo.push({
      info: 'Sex',
      input: this.metadata.sex,
    });
  }
}
