# API Reference

This document provides detailed API reference for the `monolieta-search` library.

## Table of Contents

- [Search Class](#search-class)
    - [Constructor](#constructor)
    - [Methods](#methods)
- [Configuration](#configuration)
- [Types](#types)
- [Advanced Usage](#advanced-usage)

## Search Class

The main class for creating and managing search indexes.

### Constructor

```typescript
new Search(setting?: Setting)
```

Creates a new Search instance with optional configuration.

**Parameters:**

- `setting` (optional): Configuration object of type [`Setting`](#setting-type)

**Example:**

```javascript
import { Search } from 'monolieta-search';

// Default configuration
const search = new Search();

// Custom configuration
const search = new Search({
    caseSensitive: true,
    exactWordStrategy: true,
    ignoreAccent: false,
    stopWord: { the: true, and: true },
    unorderedDocument: false
});
```

### Methods

#### index(uid, body)

Adds a document to the search index.

```typescript
index(uid: string | number, body: unknown): void
```

**Parameters:**

- `uid`: Unique identifier for the document (string or number)
- `body`: Content to index (can be string, object, array, or any value)

**Examples:**

```javascript
// Index a simple string
search.index('001', 'The Lord of the Rings');

// Index an object
search.index('002', {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy'
});

// Index an array
search.index('003', ['Fantasy', 'Adventure', 'Classic']);
```

#### search(query)

Searches the index for documents matching the query.

```typescript
search(query: string): string[]
```

**Parameters:**

- `query`: Search query string

**Returns:**

- Array of document UIDs (as strings) matching the query, ordered by relevance

**Example:**

```javascript
const results = search.search('hobbit');
// Returns: ['002', '001'] (example result)
```

#### remove(uid)

Removes a document from the search index.

```typescript
remove(uid: string | number): void
```

**Parameters:**

- `uid`: Unique identifier of the document to remove

**Example:**

```javascript
search.remove('001');
```

#### isEmpty()

Checks if the search index is empty.

```typescript
isEmpty(): boolean
```

**Returns:**

- `true` if the index contains no documents, `false` otherwise

**Example:**

```javascript
if (search.isEmpty()) {
    console.log('No documents in the index');
}
```

## Configuration

### Setting Type

```typescript
type Setting = {
    caseSensitive?: boolean;
    exactWordStrategy?: boolean;
    ignoreAccent?: boolean;
    stopWord?: StopWord;
    unorderedDocument?: boolean;
};
```

#### Configuration Options

| Option              | Type       | Default | Description                                     |
| ------------------- | ---------- | ------- | ----------------------------------------------- |
| `caseSensitive`     | `boolean`  | `false` | Enable case-sensitive search                    |
| `exactWordStrategy` | `boolean`  | `false` | Require exact word matches (no prefix matching) |
| `ignoreAccent`      | `boolean`  | `true`  | Ignore accents/diacritics in search             |
| `stopWord`          | `StopWord` | `null`  | Words to exclude from indexing and search       |
| `unorderedDocument` | `boolean`  | `true`  | Use frequency-based ranking vs. BM25 algorithm  |

### StopWord Type

```typescript
type StopWord = Record<string, boolean>;
```

A mapping of words to boolean values indicating which words should be ignored.

**Example:**

```javascript
const stopWords = {
    the: true,
    and: true,
    or: true,
    but: true
};
```

## Types

### Internal Types

The following types are used internally but may be helpful for understanding the library:

#### Term

```typescript
type Term = {
    idf: number; // Inverse Document Frequency
    count: number; // Term frequency in document
};
```

#### Detail

```typescript
type Detail = {
    count: number; // Term occurrences
    total: number; // Total terms in document
};
```

## Advanced Usage

### Multiple Data Types

The library can index various data types automatically:

```javascript
const search = new Search();

// String content
search.index('doc1', 'Simple text content');

// Object with nested properties
search.index('doc2', {
    title: 'Book Title',
    metadata: {
        author: 'Author Name',
        year: 2023
    }
});

// Array of mixed content
search.index('doc3', ['tag1', 'tag2', { category: 'fiction' }]);

// Numbers and other primitives
search.index('doc4', 12345);
```

### Search Strategies

#### Prefix Search (Default)

By default, the library uses prefix matching:

```javascript
const search = new Search();
search.index('001', 'extraordinary');

search.search('extra'); // Matches 'extraordinary'
search.search('ordinary'); // Does not match
```

#### Exact Word Search

Enable exact word matching:

```javascript
const search = new Search({ exactWordStrategy: true });
search.index('001', 'extraordinary');

search.search('extra'); // Does not match
search.search('extraordinary'); // Matches
```

### Document Ranking

#### Unordered (Default)

Simple frequency-based ranking (faster):

```javascript
const search = new Search({ unorderedDocument: true });
```

#### BM25 Algorithm

More sophisticated ranking algorithm:

```javascript
const search = new Search({ unorderedDocument: false });
```

### Text Processing Options

#### Case Sensitivity

```javascript
// Case insensitive (default)
const search = new Search({ caseSensitive: false });
search.index('001', 'Hello World');
search.search('hello'); // Matches

// Case sensitive
const search = new Search({ caseSensitive: true });
search.index('001', 'Hello World');
search.search('hello'); // Does not match
search.search('Hello'); // Matches
```

#### Accent Handling

```javascript
// Ignore accents (default)
const search = new Search({ ignoreAccent: true });
search.index('001', 'café');
search.search('cafe'); // Matches

// Preserve accents
const search = new Search({ ignoreAccent: false });
search.index('001', 'café');
search.search('cafe'); // Does not match
search.search('café'); // Matches
```

#### Stop Words

```javascript
const search = new Search({
    stopWord: {
        the: true,
        and: true,
        or: true
    }
});

search.index('001', 'The quick brown fox');
search.search('the'); // No results
search.search('quick fox'); // Matches document '001'
```

### Performance Considerations

- **Unordered documents**: Faster indexing and searching, simpler relevance scoring
- **BM25 documents**: More sophisticated relevance scoring, slightly slower
- **Exact word strategy**: Faster than prefix matching for exact matches
- **Stop words**: Reduce index size and improve search speed for common words

### Error Handling

The library is designed to handle edge cases gracefully:

```javascript
const search = new Search();

// Empty or null content
search.index('001', '');
search.index('002', null);
search.index('003', undefined);

// Empty searches
search.search(''); // Returns empty array

// Non-existent document removal
search.remove('999'); // No error, silently ignored
```
