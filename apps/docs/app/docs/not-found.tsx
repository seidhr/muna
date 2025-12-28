import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

export default function NotFound() {
  return (
    <DocsPage>
      <DocsTitle>Not Found</DocsTitle>
      <DocsDescription>This page could not be found.</DocsDescription>
      <DocsBody>
        <p>The page you are looking for does not exist.</p>
      </DocsBody>
    </DocsPage>
  );
}

