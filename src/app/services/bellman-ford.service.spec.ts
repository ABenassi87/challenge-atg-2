import { TestBed } from '@angular/core/testing';

import { BellmanFordService } from './bellman-ford.service';

describe('BellmanFordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BellmanFordService = TestBed.get(BellmanFordService);
    expect(service).toBeTruthy();
  });
});
