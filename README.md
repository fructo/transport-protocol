# transport-protocol

[![ci](https://github.com/fructo/transport-protocol/workflows/ci/badge.svg)](https://github.com/fructo/transport-protocol/actions)
[![Coverage Status](https://codecov.io/gh/fructo/transport-protocol/branch/main/graph/badge.svg)](https://codecov.io/gh/fructo/transport-protocol/branch/main)

This protocol describes communication between native applications and browsers.

The project is platform-independent, so it can be used in Node.js, Deno, and web browser environments.

## Install
```console
npm install --save @fructo/transport-protocol
```

## Protocol
Message structure:
- Header [4 bytes] - Contains message length in [selected byte order](#endianness). The length does not include the header.
- Body [N bytes]

## Encoding
```ts
import { MessagesEncoder } from '@fructo/transport-protocol';

const encoder = new MessagesEncoder();
const encodedMessage = encoder.encode({ header: 'my-header' });
```

## Decoding
```ts
import { MessagesDecoder } from '@fructo/transport-protocol';

const decoder = new MessagesDecoder();
for (const decodedMessage of decoder.decode(partialChunk)) {
    
}
```

## Endianness
By default, `MessagesEncoder` and `MessagesDecoder` use native byte order, but it is possible to force them to use a specific order:
```ts
const encoder = new MessagesEncoder({ endianness: 'little-endian' });
const decoder = new MessagesDecoder({ endianness: 'big-endian' });
```
