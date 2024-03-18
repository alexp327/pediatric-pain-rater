import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Prompt } from '../shared/prompt';
import { SubmitQuestionnaireService } from '../services/submit-questionnaire.service';
import { Router } from '@angular/router';
import { prompts } from '../shared/prompt-list';
import { SubmitMetadataService } from '../services/submit-metadata.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent {
  shoulderForm!: FormGroup;

  prompts: Prompt[] = prompts;

  constructor(
    private fb: FormBuilder,
    private metadataService: SubmitMetadataService,
    private submitQuestService: SubmitQuestionnaireService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.shoulderForm = this.fb.group({
      questionnaire: this.fb.array([]),
    });

    for (let i = 0; i < prompts.length; i++) {
      this.questionnaire.push(
        this.fb.group({
          prompt: prompts[i].question,
          rating: 0,
          notPerformed: false,
        })
      );
    }

    this.setInitialValues();

    if (this.metadataService.hasNoPain()) {
      this.handleSubmit();
    }
  }

  get questionnaire() {
    return this.shoulderForm.controls['questionnaire'] as FormArray;
  }

  setInitialValues() {
    this.submitQuestService.currentResults.subscribe((data) => {
      if (data.length == 0) {
        return;
      }

      for (let i = 0; i < prompts.length; i++) {
        this.questionnaire.at(i).setValue(data[i]);
        if (data[i].notPerformed) {
          this.questionnaire.at(i).get('rating')?.disable();
        }
      }
    });
  }

  handleFormSubmit() {
    this.submitQuestService.changeQuestionnaire(
      this.questionnaire.getRawValue()
    );
  }

  handleBack() {
    this.handleFormSubmit();
    this._router.navigateByUrl('/');
  }

  handleSubmit() {
    this.handleFormSubmit();
    this._router.navigateByUrl('/results');
  }

  handleCheckboxClick(index: number) {
    let curResponse = this.questionnaire.at(index).getRawValue();
    if (curResponse.notPerformed) {
      this.questionnaire.at(index).get('rating')?.disable();
    } else {
      this.questionnaire.at(index).get('rating')?.enable();
    }
  }
}
