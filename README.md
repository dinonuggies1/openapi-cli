# OpenAPI CLI toolset

OpenAPI CLI toolbox with rich validation and bundling features.

![Travis (.org)](https://img.shields.io/travis/Redocly/openapi-cli/master)
![npm (scoped)](https://img.shields.io/npm/v/@redocly/openapi-cli)
![NPM](https://img.shields.io/npm/l/@redocly/openapi-cli)

![OpenAPI 3 CLI toolset](./media/openapi-cli.gif)

## Features

Currently, @redocly/openapi-cli supports these features:

- [x] Multifile validation. No need to bundle your file before validation.
- [x] Lightning-fast validation. Lint a 1 Mb file in less than one second.
- [x] Built-in rules for common validations.
- [x] Configurable severity levels for each rule.
- [x] Human-readable error messages with codeframes and stylish format options.
- [x] Intuitive suggestions for misspelled types or references.
- [x] Easy to implement custom rules.
- [x] Bundle a multifile definition into a single file.
- [x] Decorators to modify a validated definition during bundling.
- [x] Preview reference docs for local development.
- [x] Support for OpenAPI 2 (fka Swagger) and OpenAPI 3.0.
- [ ] Support for OpenAPI 3.1 ([coming soon](https://github.com/Redocly/openapi-cli/issues/160)).

## What makes this tool different

Unlike other OpenAPI linters, `@redocly/openapi-cli` defines the possible type tree of a valid OpenAPI definition and then traverses it. This approach is very similar to how linters for programming languages work and results in major performance benefits over other approaches. Extend functionality at different points in the lifecycle with preprocessors, rules, and decorators.

## Usage

### Node

```
npx @redocly/openapi-cli lint path-to-root-file.yaml
```

### Docker

To give the docker container access to the OpenAPI definition files, you need to
mount the containing directory as a volume. Assuming the OAS definition is rooted
in the current working directory, you need the following command:

```
docker run --rm -v $PWD:/spec redocly/openapi-cli lint path-to-root-file.yaml
```

To build and run with a local image, run the following from the project root:

```
docker build -t openapi-cli .
docker run --rm -v $PWD:/spec openapi-cli lint path-to-root-file.yaml
```

## [Read the docs](https://redoc.ly/docs/cli/)

## Credits

Thanks to [graphql-js](https://github.com/graphql/graphql-js) and [eslint](https://github.com/eslint/eslint) for inspiration of the definition traversal approach and to [Swagger](https://github.com/swagger-api/swagger-editor), [Spectral](https://github.com/stoplightio/spectral), and [OAS-Kit](https://github.com/Mermade/oas-kit) for inspiring the ruleset.
