import { PencarianModule } from './pencarian.module';

describe('PencarianModule', () => {
    let penCarianModule: PencarianModule;

    beforeEach(() => {
        penCarianModule = new PencarianModule();
    });

    it('should create an instance', () => {
        expect(penCarianModule).toBeTruthy();
    });
});
