'use strict';

/**
* FUNCTION: getPDF( m, b )
*	Returns a probability density function for a Cauchy distribution with with location parameter `m` and scale parameter `b`.
*
* @private
* @param {Number} m - location parameter
* @param {Number} b - scale prameter
* @returns {Function} probability density function (PDF)
*/
function getPDF( m, b ) {
	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability distribution function at input value `x`.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {
		var denom = Math.PI * b * ( 1 + Math.pow( (x - m) / 2, 2 ) );
		return 1 / denom;
	};
} // end FUNCTION getPDF()


// EXPORTS //

module.exports = getPDF;
