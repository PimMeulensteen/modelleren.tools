const ignoredCharaters = [' ']
const commentCharacters = /[';#]/i
const debug = 1
const BREAKPOINT = "1000";

const reserved = new Set(['als', 'if', 'einals', 'endif', 'dan', 'then', 'anders', '}', ')', 'stop', 'Math.'])


const replacements = [
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
