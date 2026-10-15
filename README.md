# plaffitt.com

Source of Paul Laffitte's freelance site. A single French page generated at build time from YAML data files.

## How it works

- `src/data/*.yml`: all the content, one file per page block (`profile`, `offers`, `projects`, `talks`, `articles`, `activities`, `categories`, `skills`, `legal`). Free text holds no HTML; links live in dedicated fields.
- `build.js`: a Metalsmith pipeline. `plugins/yamlApiGenerator.js` loads the YAML into a Redux store, `plugins/webpack-metalsmith.js` bundles `src/index.js` (the SCSS only, no client script) with webpack 4, and `plugins/react-ssr-metalsmith.js` renders `src/App.js` once with React into `index.html`. No React runs in the browser.
- `src/components/`: one component per block.
- `test/`: `node --test` suite. `data.test.js` lints the YAML (content rules, cross references), `build.test.js` runs a production build and asserts on the generated HTML.

## Commands

`yarn` is used through `npx yarn@1` because the lockfile is a Yarn 1 lockfile.

```bash
npx yarn@1 install       # once
npm test                 # lint the data and build into a temporary directory
npm run dev              # build to ./build with BrowserSync live reload
npm run prod             # production build to ./build (or $BUILD_TARGET)
```

Webpack 4 needs `NODE_OPTIONS=--openssl-legacy-provider` on recent Node versions; the npm scripts set it.

## Deployment

`develop` is the working branch. `master` holds the built site and is force-pushed by `deploy.sh`, which builds in a temporary directory, commits the output and tags it `N-YYYY-MM-DD`.

```bash
./deploy.sh --dry-run    # build and show the output directory, push nothing
./deploy.sh              # asks for confirmation, then pushes master and the tag
```

## Content rules

French, first person, short sentences, numbers in digits, no em dash. Every claim must be verifiable (figure, link or date). The test suite enforces the mechanical rules.
