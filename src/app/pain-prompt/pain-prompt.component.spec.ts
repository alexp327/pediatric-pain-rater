import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainPromptComponent } from './pain-prompt.component';

describe('PainPromptComponent', () => {
  let component: PainPromptComponent;
  let fixture: ComponentFixture<PainPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainPromptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
