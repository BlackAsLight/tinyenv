# tinyenv

A module to easily read a `.env` file located at root and add it to your
`Deno.env`. All keys will be read and recorded as capital letters. So `potato`
is the same as `POTATO`, and it's also the same as `pOtAtO`.

## Usage

### .env

```
potato=5
```

### main.ts

```ts
import 'https://deno.land/x/tinyenv@v1.0.0/mod.ts';

console.log(Deno.env.get('POTATO'));
```

Make sure certain variables exist before proceeding. `required` will throw an
error listing all the missing variables.

```ts
import { required } from 'https://deno.land/x/tinyenv@v1.0.0/mod.ts';

required(['potato']);
```

Set up defaults for any variables not currently existing.

```ts
import { defaults } from 'https://deno.land/x/tinyenv@v01.0.0/mod.ts';

defaults({ potato: '5' });
```

If you import `required` or `defaults` then you don't need to import the module
by itself `import 'https://deno.land/x/tinyenv@v1.0.0/mod.ts'`. It will still
load all the content in `.env` just the same.
