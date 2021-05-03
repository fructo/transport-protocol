'use strict';

import test from 'ava';

import * as module from '@fructo/transport-protocol';


function testModuleExports() {
    const EXPORTS = [
        'MessagesDecoder',
        'MessagesEncoder'
    ];
    EXPORTS.forEach(unit => {
        test(`The module exports ${unit}`, t => {
            t.true(unit in module);
        });
    });
}

testModuleExports();
