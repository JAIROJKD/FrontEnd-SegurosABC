import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredManagementComponent } from './insured-management.component';

describe('InsuredManagementComponent', () => {
  let component: InsuredManagementComponent;
  let fixture: ComponentFixture<InsuredManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuredManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuredManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
