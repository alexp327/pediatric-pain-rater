import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class SubmitQuestionnaireService {
  private questionnaireSource = new BehaviorSubject<any[]>([]);
  currentResults = this.questionnaireSource.asObservable();

  constructor() {}

  changeQuestionnaire(results: any[]) {
    this.questionnaireSource.next(results);
  }
}
