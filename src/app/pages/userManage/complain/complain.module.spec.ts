import { ComplainModule } from './complain.module';

describe('ComplainModule', () => {
  let complainModule: ComplainModule;

  beforeEach(() => {
    complainModule = new ComplainModule();
  });

  it('should create an instance', () => {
    expect(complainModule).toBeTruthy();
  });
});
