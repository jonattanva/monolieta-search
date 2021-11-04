[![monolieta-search](https://badgen.net/bundlephobia/minzip/monolieta-search)](https://bundlephobia.com/result?p=monolieta-search)
[![Coverage Status](https://coveralls.io/repos/github/jonattanva/monolieta-search/badge.svg?branch=main)](https://coveralls.io/github/jonattanva/monolieta-search?branch=main)

# Monolieta-Search

## Getting started

Install `monolieta-search` using yarn or npm

```shell
yarn add monolieta-search
```

```shell
npm install monolieta-search
```

## Usage

```js
import { Search } from "monolieta-search";

const client = new Search();
client.index("001", "The Lord of the Rings");
client.index("002", "The Hobbit");

client.search("the hobbit"); // ["002", "001"]
```

## Setting

| Name              | Type    | Default | Description |
| ----------------- | ------- | :-----: | ----------- |
| caseSensitive     | boolean |  false  |             |
| exactWordStrategy | boolean |  false  |             |
| ignoreAccent      | boolean |  true   |             |
| stopWord          | Object  |  null   |             |
| unorderedDocument | boolean |  true   |             |

## Case sensitive

```js
const client = new Search({
    caseSensitive: true,
});

client.index("001", "The Lord of the Rings");
client.index("002", "The Hobbit");

client.search("hobbit"); // []
client.search("Hobbit"); // ["002"]
```

## Exact word strategy

```js
const client = new Search({
    exactWordStrategy: true,
});

client.index("001", "The Lord of the Rings");
client.index("002", "The Hobbit");

client.search("o"); // []
client.search("Rings"); // ["001"]
```

## Ignore accent

```js
const client = new Search({
    ignoreAccent: false,
});

client.index("001", "Parásitos");
client.index("002", "Déjame salir");
client.index("003", "El Tiburón");

client.search("Tiburon"); // []
client.search("Tiburón"); // ["003"]
```

## Stop word

```js
const client = new Search({
    stopWord: {
        the: true,
    },
});

client.index("001", "The Lord of the Rings");
client.index("002", "The Hobbit");

client.search("the"); // []
client.search("the hobbit"); // ["002"]
```

## Unordered document

```js
const client = new Search({
    unorderedDocument: false,
});

client.index("001", "The Lord of the Rings");
client.index("002", "The Hobbit");

client.search("the"); // ["001", "002"]
client.search("the hobbit"); // ["002", "001"]
```

## License

This project is licensed under the MIT License.
