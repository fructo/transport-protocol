'use strict';

/**
 * @sealed
 */
export abstract class BufferUtil {

    /**
     * Combines buffers into one.
     * 
     * @remarks
     * Does not change the original buffers.
     * 
     * @param buffers - Concatenable buffers.
     */
    public static concatBuffers(...buffers: Array<ArrayBuffer>): Uint8Array {
        const length = buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
        const combined = new Uint8Array(length);
        let offset = 0;
        for (const buffer of buffers) {
            combined.set(new Uint8Array(buffer), offset);
            offset += buffer.byteLength;
        }
        return combined;
    }

}
