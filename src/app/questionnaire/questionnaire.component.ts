import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prompt } from '../shared/prompt';
import { SubmitQuestionnaireService } from '../services/submit-questionnaire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent {
  shoulderForm!: FormGroup;

  // add new prompts and images here
  prompts: Prompt[] = [
    {
      question: 'How heavy is a pound of bricks?',
      image: 'bricks.jpg',
    },
    {
      question: 'How much wood could a woodchuck chuck?',
      image: 'woodchuck.jpg',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private submitQuestService: SubmitQuestionnaireService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.shoulderForm = this.fb.group({
      questionnaire: this.fb.array([]),
    });

    for (let i = 0; i < this.prompts.length; i++) {
      this.questionnaire.push(
        this.fb.group({
          prompt: this.prompts[i].question,
          rating: 0,
          notPerformed: false,
        })
      );
    }

    this.shoulderForm.valueChanges.subscribe(console.log);
  }

  get questionnaire() {
    return this.shoulderForm.controls['questionnaire'] as FormArray;
  }

  handleFormSubmit() {
    this.submitQuestService.changeQuestionnaire(this.questionnaire.value);
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
