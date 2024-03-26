import { Component } from '@angular/core';
import { SubmitMetadataService } from '../services/submit-metadata.service';
import { SubmitQuestionnaireService } from '../services/submit-questionnaire.service';
import { MetaInfo } from '../shared/meta-info';
import { PprResponse } from '../shared/ppr-response';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    private _router: Router,
    private http: HttpClient
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
    // create form data
    const formData = new FormData();
    formData.append('name', this.metadata.personId);
    formData.append('age', this.metadata.age.toString());
    formData.append('sex', this.metadata.sex);
    formData.append(
      'years_in_wheelchair',
      this.metadata.yearsInWheelchair.toString()
    );
    formData.append('wheelchair_type', this.metadata.wheelchairType);
    formData.append('primary_diagnosis', this.metadata.primaryDiagnosis);
    formData.append('num_transfers', this.metadata.numTransfers.toString());
    formData.append('new_wheelchair', this.metadata.newWheelchair);
    formData.append('life_change', this.metadata.lifeChange);
    formData.append('to_hospital', this.metadata.toHospital);
    formData.append('had_surgery', this.metadata.hadSurgery);
    formData.append('had_therapy', this.metadata.hadTherapy);
    formData.append('active_therapy', this.metadata.activeTherapy);
    formData.append('wheelchair_skills', this.metadata.wheelchairSkills);
    formData.append('arm_strengthening', this.metadata.armStrengthening);
    formData.append('stop_info', this.metadata.stopInfo);
    formData.append('pain_side', this.metadata.painSide);
    formData.append('pain_time', this.metadata.painTime);
    formData.append('other', this.metadata.other);
    for (let i = 0; i < this.results.length; i++) {
      formData.append(
        'question_' + i,
        this.results[i].notPerformed
          ? 'not performed'
          : this.results[i].rating.toString()
      );
    }
    formData.append('pain_score', this.wuspiScore.toString());

    this.http
      .post(
        'https://script.google.com/macros/s/AKfycbzMheGcrw3N2k_CETyX3yc2kX5uL5FM6LjfiRP76GVdjFsk3TPRhoRFbZ-Z5VTCn70F/exec',
        formData
      )
      .subscribe((response) => {
        console.log(response);
        alert('Thank you! Your form has been submitted successfully.');
        this.metaService.resetMetadata();
        this.questService.resetQuestionnaire();
        this._router.navigateByUrl('/');
      });
  }
}
