import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgenotfoundComponent } from './pgenotfound.component';

describe('PgenotfoundComponent', () => {
  let component: PgenotfoundComponent;
  let fixture: ComponentFixture<PgenotfoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PgenotfoundComponent]
    });
    fixture = TestBed.createComponent(PgenotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
