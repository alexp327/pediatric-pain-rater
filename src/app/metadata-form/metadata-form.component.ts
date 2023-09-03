import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MetaInfo } from '../shared/meta-info';
import { SubmitMetadataService } from '../services/submit-metadata.service';

@Component({
  selector: 'app-metadata-form',
  templateUrl: './metadata-form.component.html',
  styleUrls: ['./metadata-form.component.scss'],
})
export class MetadataFormComponent {
  metaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private submitMetadataService: SubmitMetadataService
  ) {}

  ngOnInit() {
    this.metaForm = this.fb.group({
      personId: ['', [Validators.required]],
      dominantHand: ['', [Validators.required]],
      numSurgeries: [, [Validators.required, Validators.pattern('^[0-9]*$')]],
      sex: ['', [Validators.required]],
    });

    this.metaForm.valueChanges.subscribe(console.log);
  }

  /*
  *************************************
    TODO: these gets can be improved!
  *************************************  
  */

  get personId() {
    return this.metaForm.get('personId');
  }

  get dominantHand() {
    return this.metaForm.get('dominantHand');
  }

  get numSurgeries() {
    return this.metaForm.get('numSurgeries');
  }

  get sex() {
    return this.metaForm.get('sex');
  }

  handleFormSubmit() {
    this.submitMetadataService.changeMetadata({
      personId: this.metaForm.get('personId') as unknown as string,
      dominantHand: this.metaForm.get('dominantHand') as unknown as string,
      numSurgeries: this.metaForm.get('numSurgeries') as unknown as number,
      sex: this.metaForm.get('sex') as unknown as string,
    });
  }
}
