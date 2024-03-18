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
      this.calcPainScore();
    });

    this.loadMetadataTableInfo();
  }

  loadMetadataTableInfo() {
    this.metadataTableInfo.push({
      info: 'ID',
      input: this.metadata.personId,
    });
    this.metadataTableInfo.push({
      info: 'Age',
      input: this.metadata.age,
    });
    this.metadataTableInfo.push({
      info: 'Sex',
      input: this.metadata.sex,
    });
    this.metadataTableInfo.push({
      info: 'Years in Wheelchair',
      input: this.metadata.yearsInWheelchair,
    });
    this.metadataTableInfo.push({
      info: 'Wheelchair Type',
      input: this.metadata.wheelchairType,
    });
    this.metadataTableInfo.push({
      info: 'Primary Diagnosis',
      input: this.metadata.primaryDiagnosis,
    });
    this.metadataTableInfo.push({
      info: 'Number of Transfers per Day',
      input: this.metadata.numTransfers,
    });
    this.metadataTableInfo.push({
      info: 'Life Changing Event',
      input: this.metadata.lifeChange,
    });
    this.metadataTableInfo.push({
      info: 'Hospitalized in Past Year',
      input: this.metadata.toHospital,
    });
    this.metadataTableInfo.push({
      info: 'Surgery in Past Year',
      input: this.metadata.hadSurgery,
    });
    this.metadataTableInfo.push({
      info: 'OT/PT in Past Year',
      input: this.metadata.hadTherapy,
    });
    this.metadataTableInfo.push({
      info: 'Still in Therapy',
      input: this.metadata.activeTherapy,
    });
    this.metadataTableInfo.push({
      info: 'Learning Wheelchair Skills',
      input: this.metadata.wheelchairSkills,
    });
    this.metadataTableInfo.push({
      info: 'Arm Strengthening Exercises',
      input: this.metadata.armStrengthening,
    });
    this.metadataTableInfo.push({
      info: 'Why OT/PT Stopped',
      input: this.metadata.stopInfo,
    });
    this.metadataTableInfo.push({
      info: 'Pain Side',
      input: this.metadata.painSide,
    });
    this.metadataTableInfo.push({
      info: 'Pain Time',
      input: this.metadata.painTime,
    });
    this.metadataTableInfo.push({
      info: 'Other Information',
      input: this.metadata.other,
    });
  }

  calcPainScore() {
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
