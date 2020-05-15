import 'dotenv/config';
import set from 'lodash.set';
import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.COPYFUL_CONTENTFUL_SPACE,
  accessToken: process.env.COPYFUL_CONTENTFUL_ACCESS_TOKEN,
});

export default async function clone() {
  const { items } = await client.getEntries<{ category: string; name: string; content: string }>({
    content_type: 'copyBlock',
    limit: 1000,
  });

  return items.reduce((copy, { fields }) => {
    return set(copy, `en-us.${fields.category}.${fields.name}`, fields.content);
  }, {});
}
