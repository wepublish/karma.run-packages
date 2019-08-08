# karma.run Packages

Monorepo for various NPM packages not directly related to karma.db.

## Getting Started

## Development

### Prerequisites

- [Yarn v1.16.0][yarn-download-url]

### Recommended

- [VSCode][vscode-download-url]
- [VSCode Prettier Extension][vscode-prettier-download-url]

### Install, Build & Watch

If you're setting up the project for the first time:

```
yarn install && yarn build
```

After that you can watch all packages via:

```
yarn watch
```

The following servers will be available:

- **CMS Kit Example:** [http://localhost:3030](http://localhost:3011)
- **CMS Kit Storybook:** [http://localhost:3002](http://localhost:3010)

If you want to build/watch only certain packages just have a look inside the [package.json][package-json-url],
to find commands for each package.

### Debugging Node.js via VSCode

There are several launch configurations that allow you to attach the debugger to the various examples.

[yarn-download-url]: https://yarnpkg.com/en/docs/install
[vscode-download-url]: https://code.visualstudio.com/Download
[vscode-prettier-download-url]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[package-json-url]: package.json
