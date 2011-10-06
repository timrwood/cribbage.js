// Cribbage Rules
//
// (c) 2011 Tim Wood

(function (window, undefined) {

    var cribbage = {};

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
