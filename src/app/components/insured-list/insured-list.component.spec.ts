import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredListComponent } from './insured-list.component';

describe('InsuredListComponent', () => {
  let component: InsuredListComponent;
  let fixture: ComponentFixture<InsuredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuredListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
