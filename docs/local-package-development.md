# Local package development

The workspace is intentionally split into two sibling repositories:

```text
/Users/faka/code/projects/web/signal-css
/Users/faka/code/projects/web/signal-components
```

`signal-css` owns the framework-agnostic CSS package and framework website.
React components and their website are owned exclusively by
`signal-components`, which consumes this package as its styling foundation.
Both official websites install both local packages so their examples exercise
the same CSS and React layers.

During local development, use npm `file:` dependencies or an `npm pack` archive
to test unpublished packages:

```bash
npm install ../signal-css/packages/signal-css ../signal-components/packages/signal-ui-react
```

The component package depends on `signal-css`; the CSS package source remains
independent of React. The component repository documents its own workspace
commands in `signal-components/docs/local-development.md`.

Product-shaped reference applications live outside both library repositories.
They may consume the two packages like any other customer application, but
their routes and styling do not belong in Signal CSS or Signal Components.

## Release compatibility

Release the CSS package before the React package whenever the CSS contract
changes. The React repository documents the compatible `signal-css` version in
its changelog and package metadata.
