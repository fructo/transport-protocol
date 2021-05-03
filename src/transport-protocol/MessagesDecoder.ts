'use strict';

import { Protocol } from './Protocol.js';
import { BufferUtil } from './BufferUtil.js';


export class MessagesDecoder extends Protocol {

    private readonly textDecoder = new TextDecoder();

    /**
     * Accumulated parts of undecoded yet messages.
     */
    private chunks: Array<ArrayBuffer> = [];

    /**
     * Decodes messages from chunks (if possible) and yields them.
     * 
     * @remarks
     * Accumulates parts of undecoded yet messages.
     * 
     * @param chunk - A chunk that contains parts of transportable messages.
     */
    public *decode(chunk: Uint8Array): Generator<unknown, void, void> {
        const HEADER_SIZE = 4;
        this.chunks.push(chunk.buffer);
        let buffer = BufferUtil.concatBuffers(...this.chunks);
        while (buffer.byteLength >= HEADER_SIZE) {
            const dataLength = new DataView(buffer.buffer).getUint32(0, this.isLittleEndian);
            const expectedMessageSize = HEADER_SIZE + dataLength;
            if (expectedMessageSize <= buffer.byteLength) {
                const messageBody = buffer.slice(HEADER_SIZE, expectedMessageSize);
                const message = this.textDecoder.decode(messageBody.buffer);
                const messageObj = <unknown>JSON.parse(message);
                yield messageObj;
                buffer = buffer.slice(expectedMessageSize);
                continue;
            }
            break;
        }
        this.chunks = [buffer.buffer];
    }

}
