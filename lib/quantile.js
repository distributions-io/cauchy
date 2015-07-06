'use strict';

/**
* FUNCTION: getQuantileFunction( m, b )
*	Returns a quantile function for a Cauchy distribution with with location parameter `m` and scale parameter `b`.
*
* @private
* @param {Number} m - location parameter
* @param {Number} b - scale prameter
* @returns {Function} quantile function
*/
function getQuantileFunction( m, b ) {
	/**
	* FUNCTION: quantile( p )
	*	Evaluates the quantile function at input value `p`.
	*
	* @private
	* @param {Number} p - input value
	* @returns {Number} evaluated quantile function
	*/
	return function quantile( p ) {
		return ( 0 <= p && p <= 1 ) ? m  + b * Math.tan( Math.PI * ( p - 0.5 ) ) : NaN;
	};
} // end FUNCTION getQuantileFunction()


// EXPORTS //

module.exports = getQuantileFunction;
