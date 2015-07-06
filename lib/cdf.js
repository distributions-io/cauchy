'use strict';

/**
* FUNCTION: getCDF( m, b )
*	Returns a cumulative distribution function for a Cauchy distribution with with location parameter `m` and scale parameter `b`.
*
* @private
* @param {Number} m - location parameter
* @param {Number} b - scale prameter
* @returns {Function} cumulative density function (CDF)
*/
function getCDF( m, b ) {
	/**
	* FUNCTION: cdf( x )
	*	Evaluates the cumulative distribution function at input value `x`.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated CDF
	*/
	return function cdf( x ) {
    	return ( 1 / Math.PI ) * Math.atan2( x - m, b ) + 0.5;
	};
} // end FUNCTION getCDF()


// EXPORTS //

module.exports = getCDF;
