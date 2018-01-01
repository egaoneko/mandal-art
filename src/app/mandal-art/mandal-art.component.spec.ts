import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandalArtComponent } from './mandal-art.component';

describe('MandalArtComponent', () => {
  let component: MandalArtComponent;
  let fixture: ComponentFixture<MandalArtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandalArtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandalArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
