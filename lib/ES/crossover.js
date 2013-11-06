var Ix = require('ix');
var util = require('./../util');
var next = util.next;

module.exports = {
    nPoint: nPoint
}

/**
 * Performs an n point cross over.
 * @param  {Ix.Enumerable} selectorEnum
 * @param  {int} lambda : the size of the new generation
 * @param  {int} numChildren : the number of offspring to generate per parent pairing
 * @param  {int} numParents : the number of parents to use in each child generations
 * @param  {int} numSwingPoints : the number of swing points to use, -1 to specify swings on every index
 * @return {Ix.Enumerable}
 */
function nPoint(selectorEnum, lambda, numChildren, numParents) {
    var enu = selectorEnum.getEnumerator();
    var selector = Ix.Enumerable.repeat(1)
        .select(function() {
            var parents = [];
            for (var i = 0; i < numParents; i++) {
                parents.push(next(enu));
            }

            var children = [];
            for (var i = 0; i < numChildren; i++) {
                children.push([]);
            }

            var l = parents[0].length;
            for (var i = 0; i < l; i++) {
                var parentIndex = Math.floor(Math.random() * numParents);
                for (var j = 0; j < numChildren; j++) {
                    var indexToUse = (parentIndex + j) % numParents;
                    children[j].push(parents[indexToUse][i]);
                }

            }
            return children;
        });

    return util.selectN(selector, Math.ceil(lambda / numChildren));
}