import { writeFileSync } from 'fs';
import * as adapters from '../adapters';

export default async function clone({ adapter, path }: { adapter: 'contentful'; path: string }) {
  const data = await adapters[adapter]();
  writeFileSync(path, `export const copy = ${JSON.stringify(data, null, 2)} as const;`);
}
