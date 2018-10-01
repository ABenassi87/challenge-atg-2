import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkViewerComponent } from './link-viewer.component';

describe('LinkViewerComponent', () => {
  let component: LinkViewerComponent;
  let fixture: ComponentFixture<LinkViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
