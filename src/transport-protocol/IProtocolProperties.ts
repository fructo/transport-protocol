'use strict';

export interface IProtocolProperties {

    /**
     * Determines endianness of message length.
     * 
     * @remarks
     * If not specified, native byte order will be used.
     */
    endianness?: 'little-endian' | 'big-endian';

}
