// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "model/documents.mdx": () => import("../content/docs/model/documents.mdx?collection=docs"), "model/introduction.mdx": () => import("../content/docs/model/introduction.mdx?collection=docs"), "model/objects.mdx": () => import("../content/docs/model/objects.mdx?collection=docs"), "model/properties.mdx": () => import("../content/docs/model/properties.mdx?collection=docs"), }),
};
export default browserCollections;