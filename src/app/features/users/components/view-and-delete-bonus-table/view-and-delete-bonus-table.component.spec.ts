import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAndDeleteBonusTableComponent } from './view-and-delete-bonus-table.component';

describe('ViewAndDeleteBonusTableComponent', () => {
  let component: ViewAndDeleteBonusTableComponent;
  let fixture: ComponentFixture<ViewAndDeleteBonusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAndDeleteBonusTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAndDeleteBonusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
