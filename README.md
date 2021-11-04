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
import { Search } from 'monolieta-search';

const client = new Search()
client.index("001", "The Lord of the Rings");
client.index("002", "The Hobbit");

client.search("the hobbit"); // ["002", "001"]
```

## Setting
| Name                    | Type              | Default     | Description          |
| ----------------------- | ----------------- | :--------:  | -------------------- |
| caseSensitive           | boolean           |             |  |
| exactWordStrategy       | boolean           |             |  |
| ignoreAccent            | boolean           |             |  |
| stopWord                | Object            |             |  |
| unorderedDocument       | boolean           |             |  |

## License
This project is licensed under the MIT License.
