'use strict';

// MODULES //

var isPositive = require( 'validate.io-positive'),
	isNumber = require( 'validate.io-number-primitive');

// FUNCTIONS //

var getPDF = require( './pdf.js' ),
	getCDF = require( './cdf.js' ),
	getQuantileFunction = require( './quantile.js' ),
	apply = require( './apply.js' );


// DISTRIBUTION //

/**
* FUNCTION: Distribution( [opts] )
*	Distribution constructor.
*
* @constructor
* @param {Object} [opts] - function options
* @param {Number} [opts.location=0] - location parameter
* @param {Number} [opts.scale=1] - scale parameter
* @returns {Distribution} Distribution instance
*/
function Distribution( location, scale ) {
	if ( location !== undefined ) {
		if ( !isNumber( location ) ) {
			throw new TypeError( 'constructor()::invalid input argument. Location parameter `location` must be a number primitive. Value: `' + location + '`' );
		}
	}
	if ( scale !== undefined ) {
		if ( !isPositive( scale ) ) {
			throw new TypeError( 'constructor()::invalid input argument. Scale parameter `scale` must be a positive number. Value: `' + scale + '`' );
		}
	}
	this._location = location || 0 ; // location parameter
	this._scale = scale || 1; // scale parameter ( 0 not a valid input, so || valid to set default )
	return this;
} // end FUNCTION Distribution()

/**
* METHOD: support()
*	Returns the distribution support.
*
* @returns {Array} distribution support
*/
Distribution.prototype.support = function() {
	return [ -Infinity, +Infinity ];
}; // end METHOD support()

/**
* METHOD: location( [value] )
*	`location` setter and getter. If a value is provided, sets the location parameter. If no value is provided, returns it.
*
* @param {Number} [value] - location parameter
* @returns {Distribution|Number} Distribution instance or `location` parameter
*/
Distribution.prototype.location = function( value ) {
	if ( !arguments.length ) {
		return this._location;
	}
	if ( !isNumber( value ) ) {
		throw new TypeError( 'location()::invalid input argument. Location parameter `location` must be a number primitive. Value: `' + value + '`' );
	}
	this._location = value;
	return this;
}; // end METHOD m()

/**
* METHOD: scale( [value] )
*	`scale` setter and getter. If a value is provided, sets the scale parameter. If no value is provided, returns it.
*
* @param {Number} [value] - scale parameter
* @returns {Distribution|Number} Distribution instance or `scale` parameter
*/
Distribution.prototype.scale = function( value ) {
	if ( !arguments.length ) {
		return this._scale;
	}
	if ( !isPositive( value ) ) {
		throw new TypeError( 'scale()::invalid input argument. Scale parameter `scale` must be a positive number. Value: `' + value + '`' );
	}
	this._scale = value;
	return this;
}; // end METHOD scale()

/**
* METHOD: mean()
*	Returns the distribution mean.
*
* @returns {Number} mean value
*/
Distribution.prototype.mean = function() {
	console.log( 'The mean is undefined as the Cauchy distribution does not have any finite moments.' );
	return NaN;
}; // end METHOD mean()

/**
* METHOD: variance()
*	Returns the distribution variance.
*
* @returns {Number} variance
*/
Distribution.prototype.variance = function() {
	console.log( 'The variance is undefined as the Cauchy distribution does not have any finite moments.' );
	return NaN;
}; // end METHOD variance()

/**
* METHOD: median()
*	Returns the distribution median.
*
* @returns {Number} median
*/
Distribution.prototype.median = function() {
	return this._location;
}; // end METHOD median()

/**
* METHOD: mode()
*	Returns the distribution mode.
*
* @returns {Number} mode
*/
Distribution.prototype.mode = function() {
	return this._location;
}; // end METHOD mode()

/**
* METHOD: skewness()
*	Returns the distribution skewness.
*
* @returns {Number} skewness
*/
Distribution.prototype.skewness = function() {
	console.log( 'The skewness is undefined as the Cauchy distribution does not have any finite moments.' );
	return NaN;
}; // end METHOD skewness()

/**
* METHOD: ekurtosis()
*	Returns the distribution excess kurtosis.
*
* @returns {Number} excess kurtosis
*/
Distribution.prototype.ekurtosis = function() {
	console.log( 'The excess kurtosis is undefined as the Cauchy distribution does not have any finite moments.' );
	return NaN;
}; // end METHOD ekurtosis()

/**
* METHOD: entropy()
*	Returns the entropy.
*
* @returns {Number} entropy
*/
Distribution.prototype.entropy = function() {
	var b = this._scale;
	return Math.log( b ) + Math.log( 4 * Math.PI );
}; // end METHOD entropy()

/**
* METHOD: pdf( [x] )
*	If provided an input `x`, evaluates the distribution PDF for each element. If no input argument is provided, returns the PDF.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} [x] - input values
* @returns {Function|Array|Matrix|Number} distribution PDF or evaluated PDF
*/
Distribution.prototype.pdf = function( x ) {
	var pdf;

	pdf = getPDF( this._location, this._scale );

	if ( !arguments.length ) {
		return pdf;
	}
	return apply( pdf, x );
}; // end METHOD pdf()

/**
* METHOD: cdf( [x] )
*	If provided an input `x`, evaluates the distribution CDF for each element. If no input argument is provided, returns the CDF.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} [x] - input values
* @returns {Function|Array|Matrix|Number} distribution CDF or evaluated CDF
*/
Distribution.prototype.cdf = function( x ) {
	var cdf;

	cdf = getCDF( this._location, this._scale );

	if ( !arguments.length ) {
		return cdf;
	}
	return apply( cdf, x );

}; // end METHOD cdf()

/**
* METHOD: quantile( [p] )
*	If provided an input `p`, evaluates the distribution quantile function for each element. If no input argument is provided, returns the quantile function.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} [p] - input values
* @returns {Function|Array|Matrix|Number} distribution quantile function or evaluated quantile function
*/
Distribution.prototype.quantile = function( p ) {
	var q;

	q = getQuantileFunction( this._location, this._scale );
	if ( !arguments.length ) {
		return q;
	}
	return apply( q, p );
}; // end METHOD quantile()


// EXPORTS //

module.exports = function createDistribution( lambda, k ) {
	return new Distribution( lambda, k );
};
