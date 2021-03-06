

/**************************************************
  Tests
 *************************************************/
 

module("score");

test("getRank", 8, function() {
    equal(cribbage.getRank(0), 0, 'rank A');
    equal(cribbage.getRank(12), 12, 'rank K');
    equal(cribbage.getRank(13), 0, 'rank A');
    equal(cribbage.getRank(25), 12, 'rank K');
    equal(cribbage.getRank(26), 0, 'rank A');
    equal(cribbage.getRank(38), 12, 'rank K');
    equal(cribbage.getRank(39), 0, 'rank A');
    equal(cribbage.getRank(51), 12, 'rank K');
});

test("getSuit", 8, function() {
    equal(cribbage.getSuit(0), 0, 'suit A 0');
    equal(cribbage.getSuit(12), 0, 'suit K 0');
    equal(cribbage.getSuit(13), 1, 'suit A 1');
    equal(cribbage.getSuit(25), 1, 'suit K 1');
    equal(cribbage.getSuit(26), 2, 'suit A 2');
    equal(cribbage.getSuit(38), 2, 'suit K 2');
    equal(cribbage.getSuit(39), 3, 'suit A 3');
    equal(cribbage.getSuit(51), 3, 'suit K 3');
});

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

test("fifteens 2 cards", 8, function() {
    equal(cribbage.scoreFifteens(), null, 'no input');
    equal(cribbage.scoreFifteens([0,2,4,6]), null, 'too small input');

    equal(cribbage.scoreFifteens([0,0,0,4,9]), 2, '2 cards 5 10');
    equal(cribbage.scoreFifteens([0,0,0,4,10]), 2, '2 cards 5 J');
    equal(cribbage.scoreFifteens([0,0,0,4,11]), 2, '2 cards 5 Q');
    equal(cribbage.scoreFifteens([0,0,0,4,12]), 2, '2 cards 5 K');
    equal(cribbage.scoreFifteens([0,0,0,5,8]), 2, '2 cards 6 9');
    equal(cribbage.scoreFifteens([0,0,0,6,7]), 2, '2 cards 7 8');
});

test("fifteens 3 cards", 21, function() {
    equal(cribbage.scoreFifteens([0,3,8,8,9]), 2, '3 cards A 4 10');
    equal(cribbage.scoreFifteens([1,2,8,8,9]), 2, '3 cards 2 3 10');
    equal(cribbage.scoreFifteens([0,3,8,8,10]), 2, '3 cards A 4 J');
    equal(cribbage.scoreFifteens([1,2,8,8,10]), 2, '3 cards 2 3 J');
    equal(cribbage.scoreFifteens([0,3,8,8,11]), 2, '3 cards A 4 Q');
    equal(cribbage.scoreFifteens([1,2,8,8,11]), 2, '3 cards 2 3 Q');
    equal(cribbage.scoreFifteens([0,3,8,8,12]), 2, '3 cards A 4 K');
    equal(cribbage.scoreFifteens([1,2,8,8,12]), 2, '3 cards 2 3 K');
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

test("fifteens 4 cards", 31, function() {
    equal(cribbage.scoreFifteens([0,0,2,8,9]), 2, '4 cards A A 3 10');
    equal(cribbage.scoreFifteens([0,0,2,8,10]), 2, '4 cards A A 3 J');
    equal(cribbage.scoreFifteens([0,0,2,8,11]), 2, '4 cards A A 3 Q');
    equal(cribbage.scoreFifteens([0,0,2,8,12]), 2, '4 cards A A 3 K');

    equal(cribbage.scoreFifteens([0,1,1,8,9]), 2, '4 cards A 2 2 10');
    equal(cribbage.scoreFifteens([0,1,1,8,10]), 2, '4 cards A 2 2 J');
    equal(cribbage.scoreFifteens([0,1,1,8,11]), 2, '4 cards A 2 2 Q');
    equal(cribbage.scoreFifteens([0,1,1,8,12]), 2, '4 cards A 2 2 K');

    equal(cribbage.scoreFifteens([0,0,3,8,7]), 2, '4 cards A A 4 9');
    equal(cribbage.scoreFifteens([0,1,2,8,7]), 2, '4 cards A 2 3 9');
    equal(cribbage.scoreFifteens([1,1,1,8,7]), 2, '4 cards 2 2 2 9');

    equal(cribbage.scoreFifteens([0,0,4,7,2]), 2, '4 cards A A 5 8');
    equal(cribbage.scoreFifteens([0,1,3,7,7]), 4, '4 cards A 2 4 8');// can't test only one
    equal(cribbage.scoreFifteens([0,2,2,7,4]), 2, '4 cards A 3 3 8');
    equal(cribbage.scoreFifteens([1,1,2,7,0]), 2, '4 cards 2 2 3 8');

    equal(cribbage.scoreFifteens([0,0,5,6,4]), 2, '4 cards A A 6 7');
    equal(cribbage.scoreFifteens([0,1,4,6,3]), 2, '4 cards A 2 5 7');
    equal(cribbage.scoreFifteens([0,2,3,6,8]), 2, '4 cards A 3 4 7');
    equal(cribbage.scoreFifteens([1,1,3,6,4]), 2, '4 cards 2 2 4 7');
    equal(cribbage.scoreFifteens([1,2,2,6,0]), 2, '4 cards 2 3 3 7');

    equal(cribbage.scoreFifteens([0,1,5,5,4]), 2, '4 cards A 2 6 6');
    equal(cribbage.scoreFifteens([0,2,4,5,1]), 2, '4 cards A 3 5 6');
    equal(cribbage.scoreFifteens([1,1,4,5,0]), 2, '4 cards 2 2 5 6');
    equal(cribbage.scoreFifteens([0,3,3,5,2]), 2, '4 cards A 4 4 6');
    equal(cribbage.scoreFifteens([1,2,3,5,9]), 4, '4 cards 2 3 4 6');// can't test only one
    equal(cribbage.scoreFifteens([2,2,2,5,3]), 2, '4 cards 3 3 3 6');

    equal(cribbage.scoreFifteens([0,3,4,4,7]), 2, '4 cards A 4 5 5');
    equal(cribbage.scoreFifteens([1,2,4,4,0]), 2, '4 cards 2 3 5 5');
    equal(cribbage.scoreFifteens([1,3,3,4,0]), 2, '4 cards 2 4 4 5');
    equal(cribbage.scoreFifteens([2,2,3,4,0]), 2, '4 cards 3 3 4 5');

    equal(cribbage.scoreFifteens([2,3,3,3,12]), 2, '4 cards 3 4 4 4');
});

test("fifteens 5 cards", 31, function() {
    equal(cribbage.scoreFifteens([0,0,0,1,9]), 2, '5 cards A A 3 10');
    equal(cribbage.scoreFifteens([0,0,0,1,10]), 2, '5 cards A A 3 J');
    equal(cribbage.scoreFifteens([0,0,0,1,11]), 2, '5 cards A A 3 Q');
    equal(cribbage.scoreFifteens([0,0,0,1,12]), 2, '5 cards A A 3 K');

    equal(cribbage.scoreFifteens([0,0,0,2,8]), 2, '5 cards A A A 3 9');
    equal(cribbage.scoreFifteens([0,0,1,1,8]), 2, '5 cards A A 2 2 9');

    equal(cribbage.scoreFifteens([0,0,0,3,7]), 2, '5 cards A A A 4 8');
    equal(cribbage.scoreFifteens([0,0,1,2,7]), 2, '5 cards A A 2 3 8');
    equal(cribbage.scoreFifteens([0,1,1,1,7]), 2, '5 cards A 2 2 2 8');

    equal(cribbage.scoreFifteens([0,0,0,4,6]), 2, '5 cards A A A 5 7');
    equal(cribbage.scoreFifteens([0,0,1,3,6]), 2, '5 cards A A 2 4 7');
    equal(cribbage.scoreFifteens([0,0,2,2,6]), 2, '5 cards A A 3 3 7');
    equal(cribbage.scoreFifteens([0,1,1,2,6]), 2, '5 cards A 2 2 3 7');
    equal(cribbage.scoreFifteens([1,1,1,1,6]), 2, '5 cards 2 2 2 2 7');

    equal(cribbage.scoreFifteens([0,0,0,5,5]), 2, '5 cards A A A 6 6');
    equal(cribbage.scoreFifteens([0,0,1,4,5]), 2, '5 cards A A 2 5 6');
    equal(cribbage.scoreFifteens([0,0,2,3,5]), 2, '5 cards A A 3 4 6');
    equal(cribbage.scoreFifteens([0,1,1,3,5]), 2, '5 cards A 2 2 4 6');
    equal(cribbage.scoreFifteens([0,1,2,2,5]), 2, '5 cards A 2 3 3 6');
    equal(cribbage.scoreFifteens([1,1,1,2,5]), 2, '5 cards 2 2 2 3 6');

    equal(cribbage.scoreFifteens([0,0,2,4,4]), 2, '5 cards A A 3 5 5');
    equal(cribbage.scoreFifteens([0,1,1,4,4]), 2, '5 cards A 2 2 5 5');
    equal(cribbage.scoreFifteens([0,0,3,3,4]), 2, '5 cards A A 4 4 5');
    equal(cribbage.scoreFifteens([0,1,2,3,4]), 2, '5 cards A 2 3 4 5');
    equal(cribbage.scoreFifteens([1,1,1,3,4]), 2, '5 cards 2 2 2 4 5');
    equal(cribbage.scoreFifteens([0,2,2,2,4]), 2, '5 cards A 3 3 3 5');
    equal(cribbage.scoreFifteens([1,1,2,2,4]), 2, '5 cards 2 2 3 3 5');

    equal(cribbage.scoreFifteens([0,1,3,3,3]), 2, '5 cards A 2 4 4 4');
    equal(cribbage.scoreFifteens([0,2,2,3,3]), 2, '5 cards A 3 3 4 4');
    equal(cribbage.scoreFifteens([1,1,2,3,3]), 2, '5 cards 2 2 3 4 4');
    equal(cribbage.scoreFifteens([1,2,2,2,3]), 2, '5 cards 2 3 3 3 4');
});

test("nobs", 5, function() {
    equal(cribbage.scoreNobs([0,1,2,4,9]), 0, 'no nobs');
    equal(cribbage.scoreNobs([1,2,3,10,0]), 1, 'nobs suit 1');
    equal(cribbage.scoreNobs([1,2,3,23,13]), 1, 'nobs suit 2');
    equal(cribbage.scoreNobs([1,2,3,36,26]), 1, 'nobs suit 3');
    equal(cribbage.scoreNobs([1,2,3,49,39]), 1, 'nobs suit 4');
});