// Cribbage Rules
//
// (c) 2011 Tim Wood

(function (window, undefined) {

    var cribbage = {};

    /**
     * private method to convert card number to suit
     *
     * @param {Number} card The card number (0-51)
     * 
     * @returns {Number} The suit of the card (0-3)
     */
    function getSuit(number) {
        return Math.floor(number / 13);
    }
    cribbage.getSuit = getSuit;

    /**
     * private method to convert card number to rank
     *
     * @param {Number} card The card number (0-51)
     * 
     * @returns {Number} The rank of the card (0-12)
     */
    function getRank(number) {
        return number % 13;
    }
    cribbage.getRank = getRank;

    /**
     * private method to tally fifteens
     *
     * @param {Number[]} numbers The numbers to count up
     * 
     * @returns {Number} 2 if equals 15, 0 if not
     */
    function isEqualToFifteen(numbers) {
        var total = 0, i;
        for (i = 0; i < numbers.length; i++) {
            total += numbers[i];
        }
        return total === 15 ? 2 : 0;
    }

    /**
     * method to score all flushes in a hand
     *
     * @param {Number[]} suits A list of the 5 suits in a hand
     * @param {Boolean} isCribHand True is is a crib hand, false if not 
     * 
     * @returns {Number} Number of points scored
     */
    cribbage.scoreFlushes = function(suits, isCribHand) {
        var i, 
            has4Flush = 4;
        // sanity check
        if (!suits || suits.length != 5) {
            return null;
        }
        // check first 4
        for (i = 1; i < 4; i++) {
            if (suits[i] !== suits[i - 1]) {
                has4Flush = 0;
            }
        }

        if (has4Flush && suits[3] === suits[4]) {
            return 5;
        } else if (isCribHand) {
            return 0;
        }
        return has4Flush;
    };

    /**
     * method to score all runs in a hand
     *
     * @param {Number[]} ranks A list of the 5 ranks in a hand
     * 
     * @returns {Number} Number of points scored
     */
    cribbage.scoreRuns = function(ranks) {
        var counts = [],
            i,
            runs = 0,
            pairs = 1,
            minus0,
            minus1,
            minus2,
            minus3,
            minus4;
        // sanity check
        if (!ranks || ranks.length != 5) {
            return null;
        }
        // set to 0
        for (i = 0; i < 13; i++) {
            counts[i] = 0;
        }
        // add up counts
        for (i = 0; i < 5; i++) {
            counts[ranks[i]]++;
        }
        // loop though runs
        for (i = 0; i < 13; i++) {
            minus4 = minus3;
            minus3 = minus2;
            minus2 = minus1;
            minus1 = minus0;
            minus0 = counts[i];
            if (minus4 && minus3 && minus2 && minus1 && minus0) {
                return 5;
            }
            if (minus3 && minus2 && minus1 && minus0) {
                runs = 4;
                pairs = minus3 * minus2 * minus1 * minus0;
            }
            if (!runs && minus2 && minus1 && minus0) {
                runs = 3;
                pairs = minus2 * minus1 * minus0;
            }
        }
        return runs * pairs;
    };

    /**
     * method to score all pairs in a hand
     *
     * @param {Number[]} ranks A list of the 5 ranks in a hand
     * 
     * @returns {Number} Number of points scored
     */
    cribbage.scorePairs = function(ranks) {
        var counts = [],
            i,
            output = 0;
        // sanity check
        if (!ranks || ranks.length != 5) {
            return null;
        }
        // set to 0
        for (i = 0; i < 13; i++) {
            counts[i] = 0;
        }
        // add up counts
        for (i = 0; i < 5; i++) {
            counts[ranks[i]]++;
        }
        // loop though pairs
        for (i = 0; i < 13; i++) {
            if (counts[i] === 4) {
                return 12;
            }
            if (counts[i] === 3) {
                output += 6;
            }
            if (counts[i] === 2) {
                output += 2;
            }
        }
        return output;
    };

    /**
     * method to score all fifteens in a hand
     *
     * @param {Number[]} ranks A list of the 5 ranks in a hand
     * 
     * @returns {Number} Number of points scored
     */
    cribbage.scoreFifteens = function(ranks) {
        var output = 0,
            cards = [],
            i, j, k, l, m;
        // sanity check
        if (!ranks || ranks.length != 5) {
            return null;
        }
        // populate cards
        for (i = 0; i < 5; i ++) {
            cards[i] = Math.min(ranks[i] + 1, 10);
        }
        // check for five card fifteens, return early
        if (isEqualToFifteen(cards)) {
            return 2;
        }
        // loop through items
        for (i = 0; i < 5; i++) {
            for (j = i + 1; j < 5; j++) {
                // two card fifteens
                output += isEqualToFifteen([cards[i], cards[j]]);
                for (k = j + 1; k < 5; k++) {
                    // three card fifteens
                    output += isEqualToFifteen([cards[i], cards[j], cards[k]]);
                    for (l = k + 1; l < 5; l ++) {
                        // four card fifteens
                        output += isEqualToFifteen([cards[i], cards[j], cards[k], cards[l]]);
                    }
                }
            }
        }
        return output;
    };

    /**
     * method to score all fifteens in a hand
     *
     * @param {Number[]} cards A list of the cards in a hand (0-51)
     * 
     * @returns {Number} Number of points scored (0 or 1)
     */
    cribbage.scoreNobs = function(cards) {
        // sanity check
        if (!cards || cards.length != 5) {
            return null;
        }
        // check for nobs
        for (i = 0; i < 4; i ++) {
            if (getRank(cards[i]) === 10 && getSuit(cards[i]) === getSuit(cards[4])) {
                return 1;
            }
        }
        return 0;
    };

    /**
     * method to score a hand
     *
     * @param {Number[]} hand A list of cards in the hand
     * @param {Number} cut The cut card
     * 
     * @returns {Object} Returns an object of all the points scored in that hand
     *
     * fifteens : Number
     * pairs : Number
     * runs : Number
     * nobs : Number
     * flush : Number
     * total : Number
     */
    cribbage.scoreHand = function(hand, cut) {
        var allCards = hand.slice(0);
        allCards.push(cut);
    };

    window.cribbage = cribbage;

})(window);
