import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsignComponent } from './gsign.component';

describe('GsignComponent', () => {
  let component: GsignComponent;
  let fixture: ComponentFixture<GsignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GsignComponent]
    });
    fixture = TestBed.createComponent(GsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
