import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class SubmitQuestionnaireService {
  private questionnaireSource = new BehaviorSubject<any[]>([]);

  constructor() {}

  changeQuestionnaire(results: any[]) {
    this.questionnaireSource.next(results);
    console.log('changed the questionnairesource');
    console.log(this.questionnaireSource);
  }
}
