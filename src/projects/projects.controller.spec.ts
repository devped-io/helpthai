import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsApiController } from './projects.api.controller';

describe('Projects Controller', () => {
  let controller: ProjectsApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsApiController],
    }).compile();

    controller = module.get<ProjectsApiController>(ProjectsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
