'use strict';

import { Protocol } from './Protocol.js';
import { BufferUtil } from './BufferUtil.js';


export class MessagesEncoder extends Protocol {

    private readonly textEncoder = new TextEncoder();

    /**
     * Serializes message using JSON, encodes with UTF-8, adds a header.
     * 
     * @remarks
     * The header contains a 32-bit message length in selected byte order.
     * 
     * The length does not include the header.
     * 
     * @param message - A message to be encoded.
     * @returns An array of encoded bytes.
     */
    public encode(message: unknown): Uint8Array {
        const messageString = JSON.stringify(message);
        const dataBytes = this.textEncoder.encode(messageString);
        const lengthBytes = new Uint32Array(1);
        new DataView(lengthBytes.buffer).setUint32(0, dataBytes.length, this.isLittleEndian);
        const transportableMessage = BufferUtil.concatBuffers(lengthBytes.buffer, dataBytes.buffer);
        return transportableMessage;
    }

}
