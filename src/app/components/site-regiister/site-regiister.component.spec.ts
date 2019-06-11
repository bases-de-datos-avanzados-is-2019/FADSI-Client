import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteRegiisterComponent } from './site-regiister.component';

describe('SiteRegiisterComponent', () => {
  let component: SiteRegiisterComponent;
  let fixture: ComponentFixture<SiteRegiisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteRegiisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteRegiisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
