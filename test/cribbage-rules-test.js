

/**************************************************
  Tests
 *************************************************/
 

module("score");


test("flushes", 15, function() {
    equal(cribbage.scoreFlushes(), null, 'no input');
    equal(cribbage.scoreFlushes([0,2,4,6]), null, 'too small input');

    equal(cribbage.scoreFlushes([0,0,0,0,0]), 5, 'Flush of 5 : 0');
    equal(cribbage.scoreFlushes([0,0,0,0,1]), 4, 'Flush of 4 : 0');
    equal(cribbage.scoreFlushes([1,1,1,1,1]), 5, 'Flush of 5 : 1');
    equal(cribbage.scoreFlushes([1,1,1,1,0]), 4, 'Flush of 4 : 1');
    equal(cribbage.scoreFlushes([2,2,2,2,2]), 5, 'Flush of 5 : 2');
    equal(cribbage.scoreFlushes([2,2,2,2,0]), 4, 'Flush of 4 : 2');
    equal(cribbage.scoreFlushes([3,3,3,3,3]), 5, 'Flush of 5 : 3');
    equal(cribbage.scoreFlushes([3,3,3,3,0]), 4, 'Flush of 4 : 3');

    equal(cribbage.scoreFlushes([1,0,0,0,0]), 0, 'No flush for diff card 1');
    equal(cribbage.scoreFlushes([0,1,0,0,0]), 0, 'No flush for diff card 2');
    equal(cribbage.scoreFlushes([0,0,1,0,0]), 0, 'No flush for diff card 3');
    equal(cribbage.scoreFlushes([0,0,0,1,0]), 0, 'No flush for diff card 4');
    equal(cribbage.scoreFlushes([0,0,0,0,1], true), 0, 'No Flush of 4 for crib hand');
});

test("runs", 49, function() {
    equal(cribbage.scoreRuns(), null, 'no input');
    equal(cribbage.scoreRuns([0,2,4,6]), null, 'too small input');

    equal(cribbage.scoreRuns([0,1,2,12,12]), 3, 'one run of 3');
    equal(cribbage.scoreRuns([1,2,3,12,12]), 3, 'one run of 3');
    equal(cribbage.scoreRuns([2,3,4,0,0]), 3, 'one run of 3');
    equal(cribbage.scoreRuns([3,4,5,0,0]), 3, 'one run of 3');
    equal(cribbage.scoreRuns([4,5,6,0,0]), 3, 'one run of 3');
    equal(cribbage.scoreRuns([5,6,7,0,0]), 3, 'one run of 3');
    equal(cribbage.scoreRuns([6,7,8,0,0]), 3, 'one run of 3');
    equal(cribbage.scoreRuns([7,8,9,0,0]), 3, 'one run of 3');
    equal(cribbage.scoreRuns([8,9,10,0,0]), 3, 'one run of 3');
    equal(cribbage.scoreRuns([9,10,11,0,0]), 3, 'one run of 3');
    equal(cribbage.scoreRuns([10,11,12,0,0]), 3, 'one run of 3');

    equal(cribbage.scoreRuns([0,1,2,3,12]), 4, 'one run of 4');
    equal(cribbage.scoreRuns([1,2,3,4,12]), 4, 'one run of 4');
    equal(cribbage.scoreRuns([2,3,4,5,0]), 4, 'one run of 4');
    equal(cribbage.scoreRuns([3,4,5,6,0]), 4, 'one run of 4');
    equal(cribbage.scoreRuns([4,5,6,7,0]), 4, 'one run of 4');
    equal(cribbage.scoreRuns([5,6,7,8,0]), 4, 'one run of 4');
    equal(cribbage.scoreRuns([6,7,8,9,0]), 4, 'one run of 4');
    equal(cribbage.scoreRuns([7,8,9,10,0]), 4, 'one run of 4');
    equal(cribbage.scoreRuns([8,9,10,11,0]), 4, 'one run of 4');
    equal(cribbage.scoreRuns([9,10,11,12,0]), 4, 'one run of 4');

    equal(cribbage.scoreRuns([0,1,2,3,4]), 5, 'one run of 5');
    equal(cribbage.scoreRuns([1,2,3,4,5]), 5, 'one run of 5');
    equal(cribbage.scoreRuns([2,3,4,5,6]), 5, 'one run of 5');
    equal(cribbage.scoreRuns([3,4,5,6,7]), 5, 'one run of 5');
    equal(cribbage.scoreRuns([4,5,6,7,8]), 5, 'one run of 5');
    equal(cribbage.scoreRuns([5,6,7,8,9]), 5, 'one run of 5');
    equal(cribbage.scoreRuns([6,7,8,9,10]), 5, 'one run of 5');
    equal(cribbage.scoreRuns([7,8,9,10,11]), 5, 'one run of 5');
    equal(cribbage.scoreRuns([8,9,10,11,12]), 5, 'one run of 5');

    equal(cribbage.scoreRuns([0,0,1,2,5]), 6, 'two runs of 3');
    equal(cribbage.scoreRuns([0,1,1,2,5]), 6, 'two runs of 3');
    equal(cribbage.scoreRuns([0,1,2,2,5]), 6, 'two runs of 3');

    equal(cribbage.scoreRuns([0,0,0,1,2]), 9, 'three runs of 3');
    equal(cribbage.scoreRuns([0,1,1,1,2]), 9, 'three runs of 3');
    equal(cribbage.scoreRuns([0,1,2,2,2]), 9, 'three runs of 3');

    equal(cribbage.scoreRuns([0,0,1,1,2]), 12, 'four runs of 3');
    equal(cribbage.scoreRuns([0,0,1,2,2]), 12, 'four runs of 3');
    equal(cribbage.scoreRuns([0,1,1,2,2]), 12, 'four runs of 3');

    equal(cribbage.scoreRuns([0,0,1,2,3]), 8, 'two runs of 4');
    equal(cribbage.scoreRuns([0,1,1,2,3]), 8, 'two runs of 4');
    equal(cribbage.scoreRuns([0,1,2,2,3]), 8, 'two runs of 4');
    equal(cribbage.scoreRuns([0,1,2,3,3]), 8, 'two runs of 4');

    equal(cribbage.scoreRuns([0,0,0,0,0]), 0, 'no runs');
    equal(cribbage.scoreRuns([0,2,4,6,8]), 0, 'no runs');
    equal(cribbage.scoreRuns([0,1,3,4,6]), 0, 'no runs');
    equal(cribbage.scoreRuns([0,2,5,6,8]), 0, 'no runs');
});
