import { Component } from '@angular/core';
import { MetaInfo } from '../shared/meta-info';
import { Prompt } from '../shared/prompt';
import { PprResponse } from '../shared/ppr-response';

@Component({
  selector: 'app-prompt-controller',
  templateUrl: './prompt-controller.component.html',
  styleUrls: ['./prompt-controller.component.scss'],
})
export class PromptControllerComponent {
  personalInfo: MetaInfo = {
    personId: '',
    dominantHand: '',
    numSurgeries: -1,
    sex: '',
  };

  // if -1, show meta form. Else show prompt #(curPrompt)
  curPrompt: number = -1;

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

  // this populates on init
  responses: PprResponse[] = [];

  ngOnInit() {
    for (let i = 0; i < this.prompts.length; i++) {
      this.responses.push({
        rating: -1,
        notPerformed: false,
      });
    }
  }

  handleMetadataSubmit(submittedInfo: MetaInfo) {
    this.personalInfo.personId = submittedInfo.personId;
    this.personalInfo.dominantHand = submittedInfo.dominantHand;
    this.personalInfo.numSurgeries = submittedInfo.numSurgeries;
    this.personalInfo.sex = submittedInfo.sex;
  }

  handlePrevious() {
    if (this.curPrompt > -1) {
      this.curPrompt--;
    }
  }

  handleNext() {
    if (this.curPrompt < this.prompts.length - 1) {
      this.curPrompt++;
    }
  }

  handleResponseChange(newResponse: PprResponse) {
    console.log('Response change');
    console.log(newResponse);
    this.responses[this.curPrompt] = newResponse;
    console.log(this.responses);
  }
}
