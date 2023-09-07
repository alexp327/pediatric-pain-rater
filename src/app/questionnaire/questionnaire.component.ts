import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prompt } from '../shared/prompt';
import { SubmitQuestionnaireService } from '../services/submit-questionnaire.service';
import { Router } from '@angular/router';
import { prompts } from '../shared/prompt-list';

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

    this.shoulderForm.valueChanges.subscribe(console.log);

    this.setInitialValues();

    console.log('here is the questionnaire');
    console.log(this.questionnaire);
  }

  get questionnaire() {
    return this.shoulderForm.controls['questionnaire'] as FormArray;
  }

  setInitialValues() {
    this.submitQuestService.currentResults.subscribe((data) => {
      for (let i = 0; i < prompts.length; i++) {
        this.questionnaire.at(i).setValue(data[i]);
      }
    });
  }

  handleFormSubmit() {
    this.submitQuestService.changeQuestionnaire(
      this.questionnaire.getRawValue()
    );
  }

  handlePrevious() {
    this.handleFormSubmit();
    this._router.navigateByUrl('/');
  }

  handleNext() {
    this.handleFormSubmit();
    this._router.navigateByUrl('/results');
  }
}
