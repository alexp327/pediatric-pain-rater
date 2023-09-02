import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PprResponse } from '../shared/ppr-response';

@Component({
  selector: 'app-pain-prompt',
  templateUrl: './pain-prompt.component.html',
  styleUrls: ['./pain-prompt.component.scss'],
})
export class PainPromptComponent {
  @Input() question = '';
  @Input() image = '';
  @Input() response: PprResponse = {
    rating: -1,
    notPerformed: false,
  };

  // TIME FOR 2 WAY DATA BINDING

  @Output() responseChange = new EventEmitter<PprResponse>();

  curResponse: PprResponse = {
    rating: -1,
    notPerformed: false,
  };

  ngOnInit() {
    console.log(`question: ${this.question}, image: ${this.image}`);
  }

  onSliderChange($event: any) {
    this.curResponse.rating = $event.target.value;
    this.emitNewResponse();
  }

  onCheckboxChange($event: any) {
    this.curResponse.notPerformed = $event.checked;
    this.emitNewResponse();
  }

  emitNewResponse() {
    this.responseChange.emit(this.curResponse);
  }
}
