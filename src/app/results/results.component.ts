import { Component } from '@angular/core';
import { SubmitMetadataService } from '../services/submit-metadata.service';
import { SubmitQuestionnaireService } from '../services/submit-questionnaire.service';
import { MetaInfo } from '../shared/meta-info';
import { PprResponse } from '../shared/ppr-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  // TODO: initialize these?
  metadata!: MetaInfo;
  results!: PprResponse[];
  wuspiScore: number = 0;

  metadataTableInfo: any[] = [];

  displayedResultsColumns: string[] = ['prompt', 'rating'];
  displayedMetadataColumns: string[] = ['info', 'input'];

  constructor(
    private metaService: SubmitMetadataService,
    private questService: SubmitQuestionnaireService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.metaService.currentMetadata.subscribe(
      (metadata) => (this.metadata = metadata)
    );
    this.questService.currentResults.subscribe((results) => {
      this.results = results;
      this.calcWuspiScore();
    });

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

  calcWuspiScore() {
    let sumScores = 0;
    let numAnswered = 0;
    this.results.forEach((result) => {
      if (!result.notPerformed) {
        sumScores += result.rating;
        numAnswered++;
      }
    });
    this.wuspiScore = (sumScores / numAnswered) * this.results.length;
    this.wuspiScore = Math.round(this.wuspiScore * 10) / 10;
  }

  handleNewSubmission() {
    this.metaService.resetMetadata();
    this.questService.resetQuestionnaire();
    this._router.navigateByUrl('/');
  }
}
