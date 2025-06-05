import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDDemoListViewComponent } from './cruddemo-list-view.component';

describe('CRUDDemoListViewComponent', () => {
  let component: CRUDDemoListViewComponent;
  let fixture: ComponentFixture<CRUDDemoListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRUDDemoListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRUDDemoListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
