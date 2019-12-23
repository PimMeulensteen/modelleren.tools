/**
 * 2019 by Pim Meulensteen
 *
 * This file contains most of the constants.
 */

const IGNORED_CHARACTERS = [' ']
const COMMENT_CHARACTERS = /[';#]/i
const DEBUG = 0;
const BREAKPOINT = "1000"; /* in pixels. */
const MAX_GRAPHS = 10;

const RESERVED = new Set(['als', 'if', 'einals', 'endif', 'dan', 'then', 'anders', '}', ')', 'stop', 'Math.'])

const REPLACMENTS = [
    //IF STATEMENTS
    [/eindals|endif/gim, '}'],
    [/if|als/gim, 'if('],
    [/dan|then/gim, '){'],
    [/anders|else/gi, '}else{'],

    //LOGICAL ORERATORS
    [/ en | and /gi, ')&&('],
    [/ of | or /gi, ')||('],
    [/niet|not/gi, '!'],

    //SPECIAL COMMAND
    [/stop|quit/gi, 'stop = true;'],

    //MATH OPERATORS
    [/cos\(/gi, 'Math.cos('],
    [/sin\(/gi, 'Math.sin('],
    [/abs\(/gi, 'Math.abs('],
    [/tan\(/gi, 'Math.tan('],
    [/log\(/gi, 'Math.log('],
    [/exp\(/gi, 'Math.exp('],

    //POWER OPERATOR
    [/\^/gi, '**'],
    [/\s+/gi, '']
]