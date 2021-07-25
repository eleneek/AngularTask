import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAndDeleteBonusesComponent } from './view-and-delete-bonuses.component';

describe('ViewAndDeleteBonusesComponent', () => {
  let component: ViewAndDeleteBonusesComponent;
  let fixture: ComponentFixture<ViewAndDeleteBonusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAndDeleteBonusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAndDeleteBonusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
