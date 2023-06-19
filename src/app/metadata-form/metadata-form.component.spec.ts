import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataFormComponent } from './metadata-form.component';

describe('MetadataFormComponent', () => {
  let component: MetadataFormComponent;
  let fixture: ComponentFixture<MetadataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetadataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
