import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsersDetailsComponent } from './view-users-details.component';

describe('ViewUsersDetailsComponent', () => {
  let component: ViewUsersDetailsComponent;
  let fixture: ComponentFixture<ViewUsersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUsersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
