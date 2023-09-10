import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PprResponse } from '../shared/ppr-response';

@Injectable({
  providedIn: 'root',
})
export class SubmitQuestionnaireService {
  private questionnaireSource = new BehaviorSubject<PprResponse[]>([]);
  currentResults = this.questionnaireSource.asObservable();

  constructor() {}

  changeQuestionnaire(results: PprResponse[]) {
    this.questionnaireSource.next(results);
  }

  resetQuestionnaire() {
    this.questionnaireSource.next([]);
  }
}
