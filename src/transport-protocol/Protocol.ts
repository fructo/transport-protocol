'use strict';

import { IProtocolProperties } from './IProtocolProperties.js';


/**
 * Transportable message format:
 * - Header [4 bytes] - Contains message length in selected byte order.
 * - Body [N bytes]
 */
export abstract class Protocol {

    protected readonly isLittleEndian: boolean;

    constructor(properties?: IProtocolProperties) {
        this.isLittleEndian = properties?.endianness
            ? properties.endianness === 'little-endian'
            : this.detectNativeEndianness() === 'little-endian';
    }

    /**
     * Determines the endianness of the machine.
     */
    private detectNativeEndianness(): 'big-endian' | 'little-endian' {
        const bytes = new Uint8Array(2);
        bytes[0] = 0xAA;
        bytes[1] = 0xBB;
        const word = new Uint16Array(bytes);
        return word[0] === 0xAABB ? 'big-endian' : 'little-endian';
    }

}
