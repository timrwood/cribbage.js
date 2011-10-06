

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

test("pairs", 46, function() {
    equal(cribbage.scorePairs(), null, 'no input');
    equal(cribbage.scorePairs([0,2,4,6]), null, 'too small input');

    equal(cribbage.scorePairs([0,0,1,2,3]), 2, 'one pair');
    equal(cribbage.scorePairs([1,1,7,8,9]), 2, 'one pair');
    equal(cribbage.scorePairs([2,2,7,8,9]), 2, 'one pair');
    equal(cribbage.scorePairs([3,3,7,8,9]), 2, 'one pair');
    equal(cribbage.scorePairs([4,4,1,2,3]), 2, 'one pair');
    equal(cribbage.scorePairs([5,5,1,2,3]), 2, 'one pair');
    equal(cribbage.scorePairs([6,6,1,2,3]), 2, 'one pair');
    equal(cribbage.scorePairs([7,7,1,2,3]), 2, 'one pair');
    equal(cribbage.scorePairs([8,8,1,2,3]), 2, 'one pair');
    equal(cribbage.scorePairs([9,9,1,2,3]), 2, 'one pair');
    equal(cribbage.scorePairs([10,10,1,2,3]), 2, 'one pair');
    equal(cribbage.scorePairs([11,11,1,2,3]), 2, 'one pair');
    equal(cribbage.scorePairs([12,12,1,2,3]), 2, 'one pair');

    equal(cribbage.scorePairs([0,0,1,1,2]), 4, 'two pair');
    equal(cribbage.scorePairs([0,0,1,2,2]), 4, 'two pair');
    equal(cribbage.scorePairs([0,1,1,2,2]), 4, 'two pair');

    equal(cribbage.scorePairs([0,0,0,2,3]), 6, 'one pair royal');
    equal(cribbage.scorePairs([1,1,1,8,9]), 6, 'one pair royal');
    equal(cribbage.scorePairs([2,2,2,8,9]), 6, 'one pair royal');
    equal(cribbage.scorePairs([3,3,3,8,9]), 6, 'one pair royal');
    equal(cribbage.scorePairs([4,4,4,2,3]), 6, 'one pair royal');
    equal(cribbage.scorePairs([5,5,5,2,3]), 6, 'one pair royal');
    equal(cribbage.scorePairs([6,6,6,2,3]), 6, 'one pair royal');
    equal(cribbage.scorePairs([7,7,7,2,3]), 6, 'one pair royal');
    equal(cribbage.scorePairs([8,8,8,2,3]), 6, 'one pair royal');
    equal(cribbage.scorePairs([9,9,9,2,3]), 6, 'one pair royal');
    equal(cribbage.scorePairs([10,10,10,2,3]), 6, 'one pair royal');
    equal(cribbage.scorePairs([11,11,11,2,3]), 6, 'one pair royal');
    equal(cribbage.scorePairs([12,12,12,2,3]), 6, 'one pair royal');

    equal(cribbage.scorePairs([0,0,0,1,1]), 8, 'one pair and one pair royal');
    equal(cribbage.scorePairs([0,0,1,1,1]), 8, 'one pair and one pair royal');

    equal(cribbage.scorePairs([0,0,0,0,3]), 12, 'one double pair royal');
    equal(cribbage.scorePairs([1,1,1,1,9]), 12, 'one double pair royal');
    equal(cribbage.scorePairs([2,2,2,2,9]), 12, 'one double pair royal');
    equal(cribbage.scorePairs([3,3,3,3,9]), 12, 'one double pair royal');
    equal(cribbage.scorePairs([4,4,4,4,3]), 12, 'one double pair royal');
    equal(cribbage.scorePairs([5,5,5,5,3]), 12, 'one double pair royal');
    equal(cribbage.scorePairs([6,6,6,6,3]), 12, 'one double pair royal');
    equal(cribbage.scorePairs([7,7,7,7,3]), 12, 'one double pair royal');
    equal(cribbage.scorePairs([8,8,8,8,3]), 12, 'one double pair royal');
    equal(cribbage.scorePairs([9,9,9,9,3]), 12, 'one double pair royal');
    equal(cribbage.scorePairs([10,10,10,10,3]), 12, 'one double pair royal');
    equal(cribbage.scorePairs([11,11,11,11,3]), 12, 'one double pair royal');
    equal(cribbage.scorePairs([12,12,12,12,3]), 12, 'one double pair royal');
});

test("fifteens 2 cards", 0, function() {
    equal(cribbage.scoreFifteens(), null, 'no input');
    equal(cribbage.scoreFifteens([0,2,4,6]), null, 'too small input');

    equal(cribbage.scoreFifteens([0,0,0,4,9]), 2, '2 cards 5 10');
    equal(cribbage.scoreFifteens([0,0,0,4,10]), 2, '2 cards 5 J');
    equal(cribbage.scoreFifteens([0,0,0,4,11]), 2, '2 cards 5 Q');
    equal(cribbage.scoreFifteens([0,0,0,4,12]), 2, '2 cards 5 K');
    equal(cribbage.scoreFifteens([0,0,0,5,8]), 2, '2 cards 6 9');
    equal(cribbage.scoreFifteens([0,0,0,6,7]), 2, '2 cards 7 8');
});



test("fifteens 3 cards", 0, function() {
    equal(cribbage.scoreFifteens([0,3,8,8,9]), 2, '3 cards A 4 X');
    equal(cribbage.scoreFifteens([1,2,8,8,9]), 2, '3 cards 2 3 X');
    equal(cribbage.scoreFifteens([0,4,8,7,7]), 2, '3 cards A 5 9');
    equal(cribbage.scoreFifteens([1,3,8,9,9]), 2, '3 cards 2 4 9');
    equal(cribbage.scoreFifteens([2,2,8,9,9]), 2, '3 cards 3 3 9');
    equal(cribbage.scoreFifteens([0,5,7,9,9]), 2, '3 cards A 6 8');
    equal(cribbage.scoreFifteens([1,4,7,8,8]), 2, '3 cards 2 5 8');
    equal(cribbage.scoreFifteens([2,3,7,9,9]), 2, '3 cards 3 4 8');
    equal(cribbage.scoreFifteens([0,6,6,9,9]), 2, '3 cards A 7 7');
    equal(cribbage.scoreFifteens([1,5,6,9,9]), 2, '3 cards 2 6 7');
    equal(cribbage.scoreFifteens([2,4,6,8,8]), 2, '3 cards 3 5 7');
    equal(cribbage.scoreFifteens([3,3,6,9,9]), 2, '3 cards 4 4 7');
    equal(cribbage.scoreFifteens([2,5,5,9,9]), 2, '3 cards 3 6 6');
    equal(cribbage.scoreFifteens([3,4,5,0,0]), 2, '3 cards 4 5 6');
    equal(cribbage.scoreFifteens([4,4,4,0,0]), 2, '3 cards 5 5 5');
});
