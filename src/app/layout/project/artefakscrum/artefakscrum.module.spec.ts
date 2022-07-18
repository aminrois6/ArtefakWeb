import { ArtefakscrumModule } from './artefakscrum.module';

describe('ArtefakModule', () => {
    let artefakscrumModule: ArtefakscrumModule;

    beforeEach(() => {
        artefakscrumModule = new ArtefakscrumModule();
    });

    it('should create an instance', () => {
        expect(artefakscrumModule).toBeTruthy();
    });
});
