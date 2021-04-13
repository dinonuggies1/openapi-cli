import { outdent } from 'outdent';
import { LintConfig } from '../../../../config/config';
import { lintDocument } from '../../../../lint';
import { parseYamlToDocument, replaceSourceWithRef } from '../../../../../__tests__/utils';
import { BaseResolver } from '../../../../resolve';

describe('Oas3_1 as3_1-no-empty-enum-servers', () => {
  it('oas3_1-no-empty-enum-servers: should report on server object with empty enum and unknown enum value', async () => {
    const document = parseYamlToDocument(
      outdent`
        openapi: 3.1.0
        info:
          title: API
          version: 1.0.0
        servers:
          - url: https://example.com/{var}
            variables:
              var:
                enum: []
                default: a
        components: {}
      `
    );

    const results = await lintDocument({
      externalRefResolver: new BaseResolver(),
      document,
      config: new LintConfig({ extends: [], rules: { 'no-empty-enum-servers': 'error' } }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`
      Array [
        Object {
          "location": Array [
            Object {
              "pointer": "#/servers",
              "reportOnKey": true,
              "source": "",
            },
          ],
          "message": "Server variable with \`enum\` must be a non-empty array.",
          "ruleId": "no-empty-enum-servers",
          "severity": "error",
          "suggest": Array [],
        },
        Object {
          "location": Array [
            Object {
              "pointer": "#/servers",
              "reportOnKey": true,
              "source": "",
            },
          ],
          "message": "Server variable define \`enum\` and \`default\`. \`enum\` must include default value",
          "ruleId": "no-empty-enum-servers",
          "severity": "error",
          "suggest": Array [],
        },
      ]
    `);
  });

  it('oas3_1-no-empty-enum-servers: should report on server object with empty enum', async () => {
    const document = parseYamlToDocument(
      outdent`
        openapi: 3.1.0
        info:
          title: API
          version: 1.0.0
        servers:
          - url: https://example.com/{var}
            variables:
              var:
                enum: []
        components: {}
      `
    );

    const results = await lintDocument({
      externalRefResolver: new BaseResolver(),
      document,
      config: new LintConfig({ extends: [], rules: { 'no-empty-enum-servers': 'error' } }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`
      Array [
        Object {
          "location": Array [
            Object {
              "pointer": "#/servers",
              "reportOnKey": true,
              "source": "",
            },
          ],
          "message": "Server variable with \`enum\` must be a non-empty array.",
          "ruleId": "no-empty-enum-servers",
          "severity": "error",
          "suggest": Array [],
        },
      ]
    `);
  });

  it('oas3_1-no-empty-enum-servers: should be success because variables is empty object', async () => {
    const document = parseYamlToDocument(
      outdent`
        openapi: 3.1.0
        info:
          title: API
          version: 1.0.0
        servers:
          - url: https://example.com/{var}
            variables: {}
        components: {}
      `
    );

    const results = await lintDocument({
      externalRefResolver: new BaseResolver(),
      document,
      config: new LintConfig({ extends: [], rules: { 'no-empty-enum-servers': 'error' } }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`Array []`);
  });

  it('oas3_1-no-empty-enum-servers: should be success because variable is empty object', async () => {
    const document = parseYamlToDocument(
      outdent`
        openapi: 3.1.0
        info:
          title: API
          version: 1.0.0
        servers:
          - url: https://example.com/{var}
            variables:
              var: {}
        components: {}
      `
    );

    const results = await lintDocument({
      externalRefResolver: new BaseResolver(),
      document,
      config: new LintConfig({ extends: [], rules: { 'no-empty-enum-servers': 'error' } }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`Array []`);
  });

  it('oas3_1-no-empty-enum-servers: should be success because enum contains default value', async () => {
    const document = parseYamlToDocument(
      outdent`
        openapi: 3.1.0
        info:
          title: API
          version: 1.0.0
        servers:
          - url: https://example.com/{var}
            variables:
              var:
                enum:
                  - a
                default: a
        components: {}
      `
    );

    const results = await lintDocument({
      externalRefResolver: new BaseResolver(),
      document,
      config: new LintConfig({ extends: [], rules: { 'no-empty-enum-servers': 'error' } }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`Array []`);
  });
});
