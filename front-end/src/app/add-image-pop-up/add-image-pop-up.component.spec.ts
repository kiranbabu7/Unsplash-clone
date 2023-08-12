import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImagePopUpComponent } from './add-image-pop-up.component';

describe('AddImagePopUpComponent', () => {
  let component: AddImagePopUpComponent;
  let fixture: ComponentFixture<AddImagePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImagePopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImagePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
