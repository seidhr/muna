import { globby } from 'globby';
import { writeFileSync } from "fs";

const paths = await globby(['src/schemas']);

const defaultConfig = {
  paths: {
    source: './src',
    compiled: './lib'
  },
  parts: [...paths.filter(path => !path.includes('properties')).map(path => {
    return {
      implements: 'part:@sanity/base/schema-type',
      path: path.replace('src/', '')
    }
  })]
}

try {
  writeFileSync('./sanity.json', JSON.stringify(defaultConfig, null, 2))
  //file written successfully
} catch (err) {
  console.error(err)
}
