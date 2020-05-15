import 'regenerator-runtime/runtime';
import { readFileSync } from 'fs';
import clone from '../cli/commands/clone';
import * as adapters from '../cli/adapters';

jest.mock('contentful', () => ({
  createClient() {
    return {
      getEntries() {
        return {
          sys: { type: 'Array' },
          total: 1,
          skip: 0,
          limit: 100,
          items: [
            {
              sys: { type: 'Entry' },
              fields: { category: 'test', name: 'hola', content: 'mundo' },
            },
          ],
        };
      },
    };
  },
}));

describe('cli', () => {
  describe('commands', () => {
    describe('clone()', () => {
      const testClonePath = '/tmp/copyful-clone-test.js';

      beforeEach(() => {
        jest
          .spyOn(adapters, 'contentful')
          .mockImplementation(() => Promise.resolve({ test: 'data' }));
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('writes data returned from the adapter to the file system', async () => {
        await clone({ adapter: 'contentful', path: testClonePath });

        expect(readFileSync(testClonePath, { encoding: 'utf8' })).toMatchSnapshot();
      });
    });
  });

  describe('adapters', () => {
    describe('contentful', () => {
      it('transforms data into expected structure', () => {
        return expect(adapters.contentful()).resolves.toMatchSnapshot();
      });
    });
  });
});
