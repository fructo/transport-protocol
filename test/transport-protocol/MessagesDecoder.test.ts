'use strict';

import anyTest, { TestInterface } from 'ava';

import { MessagesDecoder, MessagesEncoder } from '@fructo/transport-protocol';

const test = anyTest as TestInterface<{ decoder: MessagesDecoder, encoder: MessagesEncoder, MESSAGE: unknown }>;


test.beforeEach(t => {
    t.context = {
        decoder: new MessagesDecoder(),
        encoder: new MessagesEncoder(),
        MESSAGE: { header: 'hello' }
    };
});

test('MessagesDecoder.decode() decodes a message [native byte order]', t => {
    const encodedMessage = t.context.encoder.encode(t.context.MESSAGE);
    for (const decodedMessage of t.context.decoder.decode(encodedMessage)) {
        t.deepEqual(decodedMessage, t.context.MESSAGE);
    }
});

test('MessagesDecoder.decode() decodes a message [big-endian]', t => {
    const encoder = new MessagesEncoder({ endianness: 'big-endian' });
    const decoder = new MessagesDecoder({ endianness: 'big-endian' });
    const encodedMessage = encoder.encode(t.context.MESSAGE);
    for (const decodedMessage of decoder.decode(encodedMessage)) {
        t.deepEqual(decodedMessage, t.context.MESSAGE);
    }
});

test('MessagesDecoder.decode() decodes a chunked message', t => {
    const encodedMessage = t.context.encoder.encode(t.context.MESSAGE);
    const chunk1 = encodedMessage.slice(0, 5);
    const chunk2 = encodedMessage.slice(5);
    for (const decodedMessage of t.context.decoder.decode(chunk1)) {
        t.fail('Partial messages should not be decoded.');
    }
    for (const decodedMessage of t.context.decoder.decode(chunk2)) {
        t.deepEqual(decodedMessage, t.context.MESSAGE);
    }
});
