// @ts-nocheck
import * as __fd_glob_4 from "../content/docs/model/properties.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/model/objects.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/model/introduction.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/model/documents.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"index.mdx": __fd_glob_0, "model/documents.mdx": __fd_glob_1, "model/introduction.mdx": __fd_glob_2, "model/objects.mdx": __fd_glob_3, "model/properties.mdx": __fd_glob_4, });