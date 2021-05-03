'use strict';

import anyTest, { TestInterface } from 'ava';

import { MessagesEncoder } from '@fructo/transport-protocol';

const test = anyTest as TestInterface<{ MESSAGE: unknown, MESSAGE_LENGTH: number }>;


test.beforeEach(t => {
    const MESSAGE = { header: 'hello' };
    const MESSAGE_LENGTH = JSON.stringify(MESSAGE).length;
    t.context = {
        MESSAGE,
        MESSAGE_LENGTH
    };
});

test('MessagesEncoder respects selected endianness [big-endian]', t => {
    const encoder = new MessagesEncoder({ endianness: 'big-endian' });
    const encodedMessage = encoder.encode(t.context.MESSAGE);
    const length = new DataView(encodedMessage.buffer).getUint32(0, false /** Big-endian */);
    t.is(length, t.context.MESSAGE_LENGTH);
});

test('MessagesEncoder respects selected endianness [little-endian]', t => {
    const encoder = new MessagesEncoder({ endianness: 'little-endian' });
    const encodedMessage = encoder.encode(t.context.MESSAGE);
    const length = new DataView(encodedMessage.buffer).getUint32(0, true /** Little-endian */);
    t.is(length, t.context.MESSAGE_LENGTH);
});
