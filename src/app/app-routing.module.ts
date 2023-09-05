import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { MetadataFormComponent } from './metadata-form/metadata-form.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', component: MetadataFormComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'results', component: ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
