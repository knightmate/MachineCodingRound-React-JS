
/**
 * question-Implement a function to generate a range of numbers | Range I | JavaScript Interview Question | Lodash Polyfills/*

 * source-https://devtools.tech/questions/s/implement-a-function-to-generate-a-range-of-numbers-or-range-i-or-javascript-interview-question-or-lodash-polyfills---qid---ZfQeEBCKkGiCvLpYqcLt
 */

 
 const length = arguments.length;
 
 if (!length || (length === 1 && arguments[0] === 0)) {
   return [];
 }

 let start = 0;
 let end;
 let step;

  if (length === 3) {
   [start, end, step] = arguments;
 } else if (length === 2) {
   [start, end] = arguments;
 } else {
   [end] = arguments;
 }

  const isStepMissing = step === undefined;

  
 if (end < start && isStepMissing) {
   step = -1;
 } else if (isStepMissing) {
    step = 1;
 }
  
 const result = [];

 let i = 0;

  let limit = Math.abs(end) / Math.abs(step || 1) - start;

  while (i < limit) {
    result.push(start + i * step);
   i += 1;
 }

  return result;