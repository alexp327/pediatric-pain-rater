import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptControllerComponent } from './prompt-controller.component';

describe('PromptControllerComponent', () => {
  let component: PromptControllerComponent;
  let fixture: ComponentFixture<PromptControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
