import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MetaInfo } from '../shared/meta-info';
import { SubmitMetadataService } from '../services/submit-metadata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metadata-form',
  templateUrl: './metadata-form.component.html',
  styleUrls: ['./metadata-form.component.scss'],
})
export class MetadataFormComponent {
  metaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private submitMetadataService: SubmitMetadataService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.metaForm = this.fb.group({
      personId: ['', [Validators.required]],
      age: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      sex: ['', [Validators.required]],
      yearsInWheelchair: [
        null,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      wheelchairType: [
        '',
        [Validators.required, Validators.pattern('^(manual|power|both)$')],
      ],
      primaryDiagnosis: ['', [Validators.required]],
      numTransfers: [
        null,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      newWheelchair: ['', [Validators.required]],
      lifeChange: ['', [Validators.required]],
      toHospital: ['', [Validators.required]],
      hadSurgery: ['', [Validators.required]],
      hadTherapy: ['', [Validators.required]],
      activeTherapy: [''],
      wheelchairSkills: [''],
      armStrengthening: [''],
      stopInfo: [''],
      painSide: ['', [Validators.required]],
      painTime: [''],
      other: [''],
    });

    this.submitMetadataService.currentMetadata.subscribe((data) => {
      this.personId?.setValue(data.personId);
      this.age?.setValue(data.age);
      this.sex?.setValue(data.sex);
      this.yearsInWheelchair?.setValue(data.yearsInWheelchair);
      this.wheelchairType?.setValue(data.wheelchairType);
      this.primaryDiagnosis?.setValue(data.primaryDiagnosis);
      this.numTransfers?.setValue(data.numTransfers);
      this.newWheelchair?.setValue(data.lifeChange);
      this.lifeChange?.setValue(data.lifeChange);
      this.toHospital?.setValue(data.toHospital);
      this.hadSurgery?.setValue(data.hadSurgery);
      this.hadTherapy?.setValue(data.hadTherapy);
      this.activeTherapy?.setValue(data.activeTherapy);
      this.wheelchairSkills?.setValue(data.wheelchairSkills);
      this.armStrengthening?.setValue(data.armStrengthening);
      this.stopInfo?.setValue(data.stopInfo);
      this.painSide?.setValue(data.painSide);
      this.painTime?.setValue(data.painTime);
      this.other?.setValue(data.other);
    });
  }

  handleFormSubmit() {
    this.submitMetadataService.changeMetadata({
      personId: this.personId?.getRawValue(),
      age: this.age?.getRawValue(),
      sex: this.sex?.getRawValue(),
      yearsInWheelchair: this.yearsInWheelchair?.getRawValue(),
      wheelchairType: this.wheelchairType?.getRawValue(),
      primaryDiagnosis: this.primaryDiagnosis?.getRawValue(),
      numTransfers: this.numTransfers?.getRawValue(),
      newWheelchair: this.newWheelchair?.getRawValue(),
      lifeChange: this.lifeChange?.getRawValue(),
      toHospital: this.toHospital?.getRawValue(),
      hadSurgery: this.hadSurgery?.getRawValue(),
      hadTherapy: this.hadTherapy?.getRawValue(),
      activeTherapy: this.activeTherapy?.getRawValue(),
      wheelchairSkills: this.wheelchairSkills?.getRawValue(),
      armStrengthening: this.armStrengthening?.getRawValue(),
      stopInfo: this.stopInfo?.getRawValue(),
      painSide: this.painSide?.getRawValue(),
      painTime: this.painTime?.getRawValue(),
      other: this.other?.getRawValue(),
    });
  }

  handleNext() {
    this.handleFormSubmit();
    this._router.navigateByUrl('/questionnaire');
  }

  get personId() {
    return this.metaForm.get('personId');
  }

  get sex() {
    return this.metaForm.get('sex');
  }

  get age() {
    return this.metaForm.get('age');
  }

  get yearsInWheelchair() {
    return this.metaForm.get('yearsInWheelchair');
  }

  get wheelchairType() {
    return this.metaForm.get('wheelchairType');
  }

  get primaryDiagnosis() {
    return this.metaForm.get('primaryDiagnosis');
  }

  get numTransfers() {
    return this.metaForm.get('numTransfers');
  }

  get newWheelchair() {
    return this.metaForm.get('newWheelchair');
  }

  get lifeChange() {
    return this.metaForm.get('lifeChange');
  }

  get toHospital() {
    return this.metaForm.get('toHospital');
  }

  get hadSurgery() {
    return this.metaForm.get('hadSurgery');
  }

  get hadTherapy() {
    return this.metaForm.get('hadTherapy');
  }

  get activeTherapy() {
    return this.metaForm.get('activeTherapy');
  }

  get wheelchairSkills() {
    return this.metaForm.get('wheelchairSkills');
  }

  get armStrengthening() {
    return this.metaForm.get('armStrengthening');
  }

  get stopInfo() {
    return this.metaForm.get('stopInfo');
  }

  get painSide() {
    return this.metaForm.get('painSide');
  }

  get painTime() {
    return this.metaForm.get('painTime');
  }

  get other() {
    return this.metaForm.get('other');
  }
}
