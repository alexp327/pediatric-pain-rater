import { Component, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pain-prompt',
  templateUrl: './pain-prompt.component.html',
  styleUrls: ['./pain-prompt.component.scss'],
})
export class PainPromptComponent {
  @Input() question = '';
  @Input() image = '';

  ngOnInit() {
    console.log(`question: ${this.question}, image: ${this.image}`);
  }
}
