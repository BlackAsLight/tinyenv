# tinyenv

A module to easily read a `.env` file located at root and add it to your `Deno.env`

## Usage
### .env
```
potato=5
```

### main.ts
```ts
import 'https://deno.land/x/tinyenv@v0.0.0/mod.ts'

console.log(Deno.env.get('potato'))
```

### terminal
```
5
```
