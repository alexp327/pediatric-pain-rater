import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prompt } from '../shared/prompt';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.shoulderForm = this.fb.group({
      questionnaire: this.fb.array([]),
    });

    for (let i = 0; i < this.prompts.length; i++) {
      this.questionnaire.push(
        this.fb.group({
          prompt: this.prompts[i].question,
          rating: [-1, Validators.min(0)],
          notPerformed: false,
        })
      );
    }

    this.shoulderForm.valueChanges.subscribe(console.log);
  }

  get questionnaire() {
    return this.shoulderForm.controls['questionnaire'] as FormArray;
  }
}
