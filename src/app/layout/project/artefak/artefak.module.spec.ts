import { ArtefakModule } from './artefak.module';

describe('ArtefakModule', () => {
    let artefakModule: ArtefakModule;

    beforeEach(() => {
        artefakModule = new ArtefakModule();
    });

    it('should create an instance', () => {
        expect(artefakModule).toBeTruthy();
    });
});
