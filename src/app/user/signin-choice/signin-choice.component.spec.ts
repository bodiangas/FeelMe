import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninChoiceComponent } from './signin-choice.component';

describe('SigninChoiceComponent', () => {
  let component: SigninChoiceComponent;
  let fixture: ComponentFixture<SigninChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
