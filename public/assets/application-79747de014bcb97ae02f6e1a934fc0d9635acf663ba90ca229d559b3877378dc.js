/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			resolve.call( undefined, value );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.call( undefined, value );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE <=9 only
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val,
		valueIsBorderBox = true,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE <=11 only
	// Running getBoundingClientRect on a disconnected node
	// in IE throws an error.
	if ( elem.getClientRects().length ) {
		val = elem.getBoundingClientRect()[ name ];
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function raf() {
	if ( timerId ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off or if document is hidden
	if ( jQuery.fx.off || document.hidden ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.requestAnimationFrame ?
			window.requestAnimationFrame( raf ) :
			window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	if ( window.cancelAnimationFrame ) {
		window.cancelAnimationFrame( timerId );
	} else {
		window.clearInterval( timerId );
	}

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( jQuery.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win, rect, doc,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		// Make sure element is not hidden (display: none)
		if ( rect.width || rect.height ) {
			doc = elem.ownerDocument;
			win = getWindow( doc );
			docElem = doc.documentElement;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}

		// Return zeros for disconnected and hidden elements (gh-2310)
		return rect;
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.parseJSON = JSON.parse;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





return jQuery;
} );
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error, error1;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
if("undefined"==typeof jQuery){var jQuery;jQuery="function"==typeof require?$=require("jquery"):$}jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*(2*Math.PI)/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(2==(b/=e/2))return c+d;if(g||(g=e*(.3*1.5)),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return 1>b?-.5*(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g))+c:h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*(b*b*(((f*=1.525)+1)*b-f))+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*(7.5625*b*b)+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}}),jQuery.extend(jQuery.easing,{easeInOutMaterial:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:d/4*((b-=2)*b*b+2)+c}}),jQuery.Velocity?console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity."):(!function(a){function b(a){var b=a.length,d=c.type(a);return"function"===d||c.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===d||0===b||"number"==typeof b&&b>0&&b-1 in a}if(!a.jQuery){var c=function(a,b){return new c.fn.init(a,b)};c.isWindow=function(a){return null!=a&&a==a.window},c.type=function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?e[g.call(a)]||"object":typeof a},c.isArray=Array.isArray||function(a){return"array"===c.type(a)},c.isPlainObject=function(a){var b;if(!a||"object"!==c.type(a)||a.nodeType||c.isWindow(a))return!1;try{if(a.constructor&&!f.call(a,"constructor")&&!f.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(d){return!1}for(b in a);return void 0===b||f.call(a,b)},c.each=function(a,c,d){var e,f=0,g=a.length,h=b(a);if(d){if(h)for(;g>f&&(e=c.apply(a[f],d),e!==!1);f++);else for(f in a)if(e=c.apply(a[f],d),e===!1)break}else if(h)for(;g>f&&(e=c.call(a[f],f,a[f]),e!==!1);f++);else for(f in a)if(e=c.call(a[f],f,a[f]),e===!1)break;return a},c.data=function(a,b,e){if(void 0===e){var f=a[c.expando],g=f&&d[f];if(void 0===b)return g;if(g&&b in g)return g[b]}else if(void 0!==b){var f=a[c.expando]||(a[c.expando]=++c.uuid);return d[f]=d[f]||{},d[f][b]=e,e}},c.removeData=function(a,b){var e=a[c.expando],f=e&&d[e];f&&c.each(b,function(a,b){delete f[b]})},c.extend=function(){var a,b,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;for("boolean"==typeof h&&(k=h,h=arguments[i]||{},i++),"object"!=typeof h&&"function"!==c.type(h)&&(h={}),i===j&&(h=this,i--);j>i;i++)if(null!=(f=arguments[i]))for(e in f)a=h[e],d=f[e],h!==d&&(k&&d&&(c.isPlainObject(d)||(b=c.isArray(d)))?(b?(b=!1,g=a&&c.isArray(a)?a:[]):g=a&&c.isPlainObject(a)?a:{},h[e]=c.extend(k,g,d)):void 0!==d&&(h[e]=d));return h},c.queue=function(a,d,e){function f(a,c){var d=c||[];return null!=a&&(b(Object(a))?!function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;)a[e++]=b[d++];if(c!==c)for(;void 0!==b[d];)a[e++]=b[d++];return a.length=e,a}(d,"string"==typeof a?[a]:a):[].push.call(d,a)),d}if(a){d=(d||"fx")+"queue";var g=c.data(a,d);return e?(!g||c.isArray(e)?g=c.data(a,d,f(e)):g.push(e),g):g||[]}},c.dequeue=function(a,b){c.each(a.nodeType?[a]:a,function(a,d){b=b||"fx";var e=c.queue(d,b),f=e.shift();"inprogress"===f&&(f=e.shift()),f&&("fx"===b&&e.unshift("inprogress"),f.call(d,function(){c.dequeue(d,b)}))})},c.fn=c.prototype={init:function(a){if(a.nodeType)return this[0]=a,this;throw new Error("Not a DOM node.")},offset:function(){var b=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:b.top+(a.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:b.left+(a.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function a(){for(var a=this.offsetParent||document;a&&"html"===!a.nodeType.toLowerCase&&"static"===a.style.position;)a=a.offsetParent;return a||document}var b=this[0],a=a.apply(b),d=this.offset(),e=/^(?:body|html)$/i.test(a.nodeName)?{top:0,left:0}:c(a).offset();return d.top-=parseFloat(b.style.marginTop)||0,d.left-=parseFloat(b.style.marginLeft)||0,a.style&&(e.top+=parseFloat(a.style.borderTopWidth)||0,e.left+=parseFloat(a.style.borderLeftWidth)||0),{top:d.top-e.top,left:d.left-e.left}}};var d={};c.expando="velocity"+(new Date).getTime(),c.uuid=0;for(var e={},f=e.hasOwnProperty,g=e.toString,h="Boolean Number String Function Array Date RegExp Object Error".split(" "),i=0;i<h.length;i++)e["[object "+h[i]+"]"]=h[i].toLowerCase();c.fn.init.prototype=c.fn,a.Velocity={Utilities:c}}}(window),function(a){"object"==typeof module&&"object"==typeof module.exports?module.exports=a():"function"==typeof define&&define.amd?define(a):a()}(function(){return function(a,b,c,d){function e(a){for(var b=-1,c=a?a.length:0,d=[];++b<c;){var e=a[b];e&&d.push(e)}return d}function f(a){return p.isWrapped(a)?a=[].slice.call(a):p.isNode(a)&&(a=[a]),a}function g(a){var b=m.data(a,"velocity");return null===b?d:b}function h(a){return function(b){return Math.round(b*a)*(1/a)}}function i(a,c,d,e){function f(a,b){return 1-3*b+3*a}function g(a,b){return 3*b-6*a}function h(a){return 3*a}function i(a,b,c){return((f(b,c)*a+g(b,c))*a+h(b))*a}function j(a,b,c){return 3*f(b,c)*a*a+2*g(b,c)*a+h(b)}function k(b,c){for(var e=0;p>e;++e){var f=j(c,a,d);if(0===f)return c;var g=i(c,a,d)-b;c-=g/f}return c}function l(){for(var b=0;t>b;++b)x[b]=i(b*u,a,d)}function m(b,c,e){var f,g,h=0;do g=c+(e-c)/2,f=i(g,a,d)-b,f>0?e=g:c=g;while(Math.abs(f)>r&&++h<s);return g}function n(b){for(var c=0,e=1,f=t-1;e!=f&&x[e]<=b;++e)c+=u;--e;var g=(b-x[e])/(x[e+1]-x[e]),h=c+g*u,i=j(h,a,d);return i>=q?k(b,h):0==i?h:m(b,c,c+u)}function o(){y=!0,(a!=c||d!=e)&&l()}var p=4,q=.001,r=1e-7,s=10,t=11,u=1/(t-1),v="Float32Array"in b;if(4!==arguments.length)return!1;for(var w=0;4>w;++w)if("number"!=typeof arguments[w]||isNaN(arguments[w])||!isFinite(arguments[w]))return!1;a=Math.min(a,1),d=Math.min(d,1),a=Math.max(a,0),d=Math.max(d,0);var x=v?new Float32Array(t):new Array(t),y=!1,z=function(b){return y||o(),a===c&&d===e?b:0===b?0:1===b?1:i(n(b),c,e)};z.getControlPoints=function(){return[{x:a,y:c},{x:d,y:e}]};var A="generateBezier("+[a,c,d,e]+")";return z.toString=function(){return A},z}function j(a,b){var c=a;return p.isString(a)?t.Easings[a]||(c=!1):c=p.isArray(a)&&1===a.length?h.apply(null,a):p.isArray(a)&&2===a.length?u.apply(null,a.concat([b])):p.isArray(a)&&4===a.length?i.apply(null,a):!1,c===!1&&(c=t.Easings[t.defaults.easing]?t.defaults.easing:s),c}function k(a){if(a){var b=(new Date).getTime(),c=t.State.calls.length;c>1e4&&(t.State.calls=e(t.State.calls));for(var f=0;c>f;f++)if(t.State.calls[f]){var h=t.State.calls[f],i=h[0],j=h[2],n=h[3],o=!!n,q=null;n||(n=t.State.calls[f][3]=b-16);for(var r=Math.min((b-n)/j.duration,1),s=0,u=i.length;u>s;s++){var w=i[s],y=w.element;if(g(y)){var z=!1;if(j.display!==d&&null!==j.display&&"none"!==j.display){if("flex"===j.display){var A=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];m.each(A,function(a,b){v.setPropertyValue(y,"display",b)})}v.setPropertyValue(y,"display",j.display)}j.visibility!==d&&"hidden"!==j.visibility&&v.setPropertyValue(y,"visibility",j.visibility);for(var B in w)if("element"!==B){var C,D=w[B],E=p.isString(D.easing)?t.Easings[D.easing]:D.easing;if(1===r)C=D.endValue;else{var F=D.endValue-D.startValue;if(C=D.startValue+F*E(r,j,F),!o&&C===D.currentValue)continue}if(D.currentValue=C,"tween"===B)q=C;else{if(v.Hooks.registered[B]){var G=v.Hooks.getRoot(B),H=g(y).rootPropertyValueCache[G];H&&(D.rootPropertyValue=H)}var I=v.setPropertyValue(y,B,D.currentValue+(0===parseFloat(C)?"":D.unitType),D.rootPropertyValue,D.scrollData);v.Hooks.registered[B]&&(g(y).rootPropertyValueCache[G]=v.Normalizations.registered[G]?v.Normalizations.registered[G]("extract",null,I[1]):I[1]),"transform"===I[0]&&(z=!0)}}j.mobileHA&&g(y).transformCache.translate3d===d&&(g(y).transformCache.translate3d="(0px, 0px, 0px)",z=!0),z&&v.flushTransformCache(y)}}j.display!==d&&"none"!==j.display&&(t.State.calls[f][2].display=!1),j.visibility!==d&&"hidden"!==j.visibility&&(t.State.calls[f][2].visibility=!1),j.progress&&j.progress.call(h[1],h[1],r,Math.max(0,n+j.duration-b),n,q),1===r&&l(f)}}t.State.isTicking&&x(k)}function l(a,b){if(!t.State.calls[a])return!1;for(var c=t.State.calls[a][0],e=t.State.calls[a][1],f=t.State.calls[a][2],h=t.State.calls[a][4],i=!1,j=0,k=c.length;k>j;j++){var l=c[j].element;if(b||f.loop||("none"===f.display&&v.setPropertyValue(l,"display",f.display),"hidden"===f.visibility&&v.setPropertyValue(l,"visibility",f.visibility)),f.loop!==!0&&(m.queue(l)[1]===d||!/\.velocityQueueEntryFlag/i.test(m.queue(l)[1]))&&g(l)){g(l).isAnimating=!1,g(l).rootPropertyValueCache={};var n=!1;m.each(v.Lists.transforms3D,function(a,b){var c=/^scale/.test(b)?1:0,e=g(l).transformCache[b];g(l).transformCache[b]!==d&&new RegExp("^\\("+c+"[^.]").test(e)&&(n=!0,delete g(l).transformCache[b])}),f.mobileHA&&(n=!0,delete g(l).transformCache.translate3d),n&&v.flushTransformCache(l),v.Values.removeClass(l,"velocity-animating")}if(!b&&f.complete&&!f.loop&&j===k-1)try{f.complete.call(e,e)}catch(o){setTimeout(function(){throw o},1)}h&&f.loop!==!0&&h(e),g(l)&&f.loop===!0&&!b&&(m.each(g(l).tweensContainer,function(a,b){/^rotate/.test(a)&&360===parseFloat(b.endValue)&&(b.endValue=0,b.startValue=360),/^backgroundPosition/.test(a)&&100===parseFloat(b.endValue)&&"%"===b.unitType&&(b.endValue=0,b.startValue=100)}),t(l,"reverse",{loop:!0,delay:f.delay})),f.queue!==!1&&m.dequeue(l,f.queue)}t.State.calls[a]=!1;for(var p=0,q=t.State.calls.length;q>p;p++)if(t.State.calls[p]!==!1){i=!0;break}i===!1&&(t.State.isTicking=!1,delete t.State.calls,t.State.calls=[])}var m,n=function(){if(c.documentMode)return c.documentMode;for(var a=7;a>4;a--){var b=c.createElement("div");if(b.innerHTML="<!--[if IE "+a+"]><span></span><![endif]-->",b.getElementsByTagName("span").length)return b=null,a}return d}(),o=function(){var a=0;return b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||function(b){var c,d=(new Date).getTime();return c=Math.max(0,16-(d-a)),a=d+c,setTimeout(function(){b(d+c)},c)}}(),p={isString:function(a){return"string"==typeof a},isArray:Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},isFunction:function(a){return"[object Function]"===Object.prototype.toString.call(a)},isNode:function(a){return a&&a.nodeType},isNodeList:function(a){return"object"==typeof a&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a))&&a.length!==d&&(0===a.length||"object"==typeof a[0]&&a[0].nodeType>0)},isWrapped:function(a){return a&&(a.jquery||b.Zepto&&b.Zepto.zepto.isZ(a))},isSVG:function(a){return b.SVGElement&&a instanceof b.SVGElement},isEmptyObject:function(a){for(var b in a)return!1;return!0}},q=!1;if(a.fn&&a.fn.jquery?(m=a,q=!0):m=b.Velocity.Utilities,8>=n&&!q)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=n)return void(jQuery.fn.velocity=jQuery.fn.animate);var r=400,s="swing",t={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:b.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:c.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:m,Redirects:{},Easings:{},Promise:b.Promise,defaults:{queue:"",duration:r,easing:s,begin:d,complete:d,progress:d,display:d,visibility:d,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(a){m.data(a,"velocity",{isSVG:p.isSVG(a),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};b.pageYOffset!==d?(t.State.scrollAnchor=b,t.State.scrollPropertyLeft="pageXOffset",t.State.scrollPropertyTop="pageYOffset"):(t.State.scrollAnchor=c.documentElement||c.body.parentNode||c.body,t.State.scrollPropertyLeft="scrollLeft",t.State.scrollPropertyTop="scrollTop");var u=function(){function a(a){return-a.tension*a.x-a.friction*a.v}function b(b,c,d){var e={x:b.x+d.dx*c,v:b.v+d.dv*c,tension:b.tension,friction:b.friction};return{dx:e.v,dv:a(e)}}function c(c,d){var e={dx:c.v,dv:a(c)},f=b(c,.5*d,e),g=b(c,.5*d,f),h=b(c,d,g),i=1/6*(e.dx+2*(f.dx+g.dx)+h.dx),j=1/6*(e.dv+2*(f.dv+g.dv)+h.dv);return c.x=c.x+i*d,c.v=c.v+j*d,c}return function d(a,b,e){var f,g,h,i={x:-1,v:0,tension:null,friction:null},j=[0],k=0,l=1e-4,m=.016;for(a=parseFloat(a)||500,b=parseFloat(b)||20,e=e||null,i.tension=a,i.friction=b,f=null!==e,f?(k=d(a,b),g=k/e*m):g=m;h=c(h||i,g),j.push(1+h.x),k+=16,Math.abs(h.x)>l&&Math.abs(h.v)>l;);return f?function(a){return j[a*(j.length-1)|0]}:k}}();t.Easings={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},spring:function(a){return 1-Math.cos(4.5*a*Math.PI)*Math.exp(6*-a)}},m.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(a,b){t.Easings[b[0]]=i.apply(null,b[1])});var v=t.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var a=0;a<v.Lists.colors.length;a++){var b="color"===v.Lists.colors[a]?"0 0 0 1":"255 255 255 1";v.Hooks.templates[v.Lists.colors[a]]=["Red Green Blue Alpha",b]}var c,d,e;if(n)for(c in v.Hooks.templates){d=v.Hooks.templates[c],e=d[0].split(" ");var f=d[1].match(v.RegEx.valueSplit);"Color"===e[0]&&(e.push(e.shift()),f.push(f.shift()),v.Hooks.templates[c]=[e.join(" "),f.join(" ")])}for(c in v.Hooks.templates){d=v.Hooks.templates[c],e=d[0].split(" ");for(var a in e){var g=c+e[a],h=a;v.Hooks.registered[g]=[c,h]}}},getRoot:function(a){var b=v.Hooks.registered[a];return b?b[0]:a},cleanRootPropertyValue:function(a,b){return v.RegEx.valueUnwrap.test(b)&&(b=b.match(v.RegEx.valueUnwrap)[1]),v.Values.isCSSNullValue(b)&&(b=v.Hooks.templates[a][1]),b},extractValue:function(a,b){var c=v.Hooks.registered[a];if(c){var d=c[0],e=c[1];return b=v.Hooks.cleanRootPropertyValue(d,b),b.toString().match(v.RegEx.valueSplit)[e]}return b},injectValue:function(a,b,c){var d=v.Hooks.registered[a];if(d){var e,f,g=d[0],h=d[1];return c=v.Hooks.cleanRootPropertyValue(g,c),e=c.toString().match(v.RegEx.valueSplit),e[h]=b,f=e.join(" ")}return c}},Normalizations:{registered:{clip:function(a,b,c){switch(a){case"name":return"clip";case"extract":var d;return v.RegEx.wrappedValueAlreadyExtracted.test(c)?d=c:(d=c.toString().match(v.RegEx.valueUnwrap),d=d?d[1].replace(/,(\s+)?/g," "):c),d;case"inject":return"rect("+c+")"}},blur:function(a,b,c){switch(a){case"name":return t.State.isFirefox?"filter":"-webkit-filter";case"extract":var d=parseFloat(c);if(!d&&0!==d){var e=c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);d=e?e[1]:0}return d;case"inject":return parseFloat(c)?"blur("+c+")":"none"}},opacity:function(a,b,c){if(8>=n)switch(a){case"name":return"filter";case"extract":var d=c.toString().match(/alpha\(opacity=(.*)\)/i);return c=d?d[1]/100:1;case"inject":return b.style.zoom=1,parseFloat(c)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(c),10)+")"}else switch(a){case"name":return"opacity";case"extract":return c;case"inject":return c}}},register:function(){9>=n||t.State.isGingerbread||(v.Lists.transformsBase=v.Lists.transformsBase.concat(v.Lists.transforms3D));for(var a=0;a<v.Lists.transformsBase.length;a++)!function(){var b=v.Lists.transformsBase[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case"name":return"transform";case"extract":return g(c)===d||g(c).transformCache[b]===d?/^scale/i.test(b)?1:0:g(c).transformCache[b].replace(/[()]/g,"");case"inject":var f=!1;switch(b.substr(0,b.length-1)){case"translate":f=!/(%|px|em|rem|vw|vh|\d)$/i.test(e);break;case"scal":case"scale":t.State.isAndroid&&g(c).transformCache[b]===d&&1>e&&(e=1),f=!/(\d)$/i.test(e);break;case"skew":f=!/(deg|\d)$/i.test(e);break;case"rotate":f=!/(deg|\d)$/i.test(e)}return f||(g(c).transformCache[b]="("+e+")"),g(c).transformCache[b]}}}();for(var a=0;a<v.Lists.colors.length;a++)!function(){var b=v.Lists.colors[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case"name":return b;case"extract":var f;if(v.RegEx.wrappedValueAlreadyExtracted.test(e))f=e;else{var g,h={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(e)?g=h[e]!==d?h[e]:h.black:v.RegEx.isHex.test(e)?g="rgb("+v.Values.hexToRgb(e).join(" ")+")":/^rgba?\(/i.test(e)||(g=h.black),f=(g||e).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=n||3!==f.split(" ").length||(f+=" 1"),f;case"inject":return 8>=n?4===e.split(" ").length&&(e=e.split(/\s+/).slice(0,3).join(" ")):3===e.split(" ").length&&(e+=" 1"),(8>=n?"rgb":"rgba")+"("+e.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(a){return a.replace(/-(\w)/g,function(a,b){return b.toUpperCase()})},SVGAttribute:function(a){var b="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(n||t.State.isAndroid&&!t.State.isChrome)&&(b+="|transform"),new RegExp("^("+b+")$","i").test(a)},prefixCheck:function(a){if(t.State.prefixMatches[a])return[t.State.prefixMatches[a],!0];for(var b=["","Webkit","Moz","ms","O"],c=0,d=b.length;d>c;c++){var e;if(e=0===c?a:b[c]+a.replace(/^\w/,function(a){return a.toUpperCase()}),p.isString(t.State.prefixElement.style[e]))return t.State.prefixMatches[a]=e,[e,!0]}return[a,!1]}},Values:{hexToRgb:function(a){var b,c=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,d=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return a=a.replace(c,function(a,b,c,d){return b+b+c+c+d+d}),b=d.exec(a),b?[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)]:[0,0,0]},isCSSNullValue:function(a){return 0==a||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)},getUnitType:function(a){return/^(rotate|skew)/i.test(a)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a)?"":"px"},getDisplayType:function(a){var b=a&&a.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b)?"inline":/^(li)$/i.test(b)?"list-item":/^(tr)$/i.test(b)?"table-row":/^(table)$/i.test(b)?"table":/^(tbody)$/i.test(b)?"table-row-group":"block"},addClass:function(a,b){a.classList?a.classList.add(b):a.className+=(a.className.length?" ":"")+b},removeClass:function(a,b){a.classList?a.classList.remove(b):a.className=a.className.toString().replace(new RegExp("(^|\\s)"+b.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(a,c,e,f){function h(a,c){function e(){j&&v.setPropertyValue(a,"display","none")}var i=0;if(8>=n)i=m.css(a,c);else{var j=!1;if(/^(width|height)$/.test(c)&&0===v.getPropertyValue(a,"display")&&(j=!0,v.setPropertyValue(a,"display",v.Values.getDisplayType(a))),!f){if("height"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var k=a.offsetHeight-(parseFloat(v.getPropertyValue(a,"borderTopWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderBottomWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingTop"))||0)-(parseFloat(v.getPropertyValue(a,"paddingBottom"))||0);return e(),k}if("width"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var l=a.offsetWidth-(parseFloat(v.getPropertyValue(a,"borderLeftWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderRightWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingLeft"))||0)-(parseFloat(v.getPropertyValue(a,"paddingRight"))||0);return e(),l}}var o;o=g(a)===d?b.getComputedStyle(a,null):g(a).computedStyle?g(a).computedStyle:g(a).computedStyle=b.getComputedStyle(a,null),"borderColor"===c&&(c="borderTopColor"),i=9===n&&"filter"===c?o.getPropertyValue(c):o[c],(""===i||null===i)&&(i=a.style[c]),e()}if("auto"===i&&/^(top|right|bottom|left)$/i.test(c)){var p=h(a,"position");("fixed"===p||"absolute"===p&&/top|left/i.test(c))&&(i=m(a).position()[c]+"px")}return i}var i;if(v.Hooks.registered[c]){var j=c,k=v.Hooks.getRoot(j);e===d&&(e=v.getPropertyValue(a,v.Names.prefixCheck(k)[0])),v.Normalizations.registered[k]&&(e=v.Normalizations.registered[k]("extract",a,e)),i=v.Hooks.extractValue(j,e)}else if(v.Normalizations.registered[c]){var l,o;l=v.Normalizations.registered[c]("name",a),"transform"!==l&&(o=h(a,v.Names.prefixCheck(l)[0]),v.Values.isCSSNullValue(o)&&v.Hooks.templates[c]&&(o=v.Hooks.templates[c][1])),i=v.Normalizations.registered[c]("extract",a,o)}if(!/^[\d-]/.test(i))if(g(a)&&g(a).isSVG&&v.Names.SVGAttribute(c))if(/^(height|width)$/i.test(c))try{i=a.getBBox()[c]}catch(p){i=0}else i=a.getAttribute(c);else i=h(a,v.Names.prefixCheck(c)[0]);return v.Values.isCSSNullValue(i)&&(i=0),t.debug>=2&&console.log("Get "+c+": "+i),i},setPropertyValue:function(a,c,d,e,f){var h=c;if("scroll"===c)f.container?f.container["scroll"+f.direction]=d:"Left"===f.direction?b.scrollTo(d,f.alternateValue):b.scrollTo(f.alternateValue,d);else if(v.Normalizations.registered[c]&&"transform"===v.Normalizations.registered[c]("name",a))v.Normalizations.registered[c]("inject",a,d),h="transform",d=g(a).transformCache[c];else{if(v.Hooks.registered[c]){var i=c,j=v.Hooks.getRoot(c);e=e||v.getPropertyValue(a,j),d=v.Hooks.injectValue(i,d,e),c=j}if(v.Normalizations.registered[c]&&(d=v.Normalizations.registered[c]("inject",a,d),c=v.Normalizations.registered[c]("name",a)),h=v.Names.prefixCheck(c)[0],8>=n)try{a.style[h]=d}catch(k){t.debug&&console.log("Browser does not support ["+d+"] for ["+h+"]")}else g(a)&&g(a).isSVG&&v.Names.SVGAttribute(c)?a.setAttribute(c,d):a.style[h]=d;t.debug>=2&&console.log("Set "+c+" ("+h+"): "+d)}return[h,d]},flushTransformCache:function(a){function b(b){return parseFloat(v.getPropertyValue(a,b))}var c="";if((n||t.State.isAndroid&&!t.State.isChrome)&&g(a).isSVG){var d={translate:[b("translateX"),b("translateY")],skewX:[b("skewX")],skewY:[b("skewY")],scale:1!==b("scale")?[b("scale"),b("scale")]:[b("scaleX"),b("scaleY")],rotate:[b("rotateZ"),0,0]};m.each(g(a).transformCache,function(a){/^translate/i.test(a)?a="translate":/^scale/i.test(a)?a="scale":/^rotate/i.test(a)&&(a="rotate"),d[a]&&(c+=a+"("+d[a].join(" ")+") ",delete d[a])})}else{var e,f;m.each(g(a).transformCache,function(b){return e=g(a).transformCache[b],"transformPerspective"===b?(f=e,!0):(9===n&&"rotateZ"===b&&(b="rotate"),void(c+=b+e+" "))}),f&&(c="perspective"+f+" "+c)}v.setPropertyValue(a,"transform",c)}};v.Hooks.register(),v.Normalizations.register(),t.hook=function(a,b,c){var e=d;return a=f(a),m.each(a,function(a,f){if(g(f)===d&&t.init(f),c===d)e===d&&(e=t.CSS.getPropertyValue(f,b));else{var h=t.CSS.setPropertyValue(f,b,c);"transform"===h[0]&&t.CSS.flushTransformCache(f),e=h}}),e};var w=function(){function a(){return h?B.promise||null:i}function e(){function a(a){function l(a,b){var c=d,e=d,g=d;return p.isArray(a)?(c=a[0],!p.isArray(a[1])&&/^[\d-]/.test(a[1])||p.isFunction(a[1])||v.RegEx.isHex.test(a[1])?g=a[1]:(p.isString(a[1])&&!v.RegEx.isHex.test(a[1])||p.isArray(a[1]))&&(e=b?a[1]:j(a[1],h.duration),a[2]!==d&&(g=a[2]))):c=a,b||(e=e||h.easing),p.isFunction(c)&&(c=c.call(f,y,x)),p.isFunction(g)&&(g=g.call(f,y,x)),[c||0,e,g]}function n(a,b){var c,d;return d=(b||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(a){return c=a,""}),c||(c=v.Values.getUnitType(a)),[d,c]}function r(){var a={myParent:f.parentNode||c.body,position:v.getPropertyValue(f,"position"),fontSize:v.getPropertyValue(f,"fontSize")},d=a.position===I.lastPosition&&a.myParent===I.lastParent,e=a.fontSize===I.lastFontSize;I.lastParent=a.myParent,I.lastPosition=a.position,I.lastFontSize=a.fontSize;var h=100,i={};if(e&&d)i.emToPx=I.lastEmToPx,i.percentToPxWidth=I.lastPercentToPxWidth,i.percentToPxHeight=I.lastPercentToPxHeight;else{var j=g(f).isSVG?c.createElementNS("http://www.w3.org/2000/svg","rect"):c.createElement("div");t.init(j),a.myParent.appendChild(j),m.each(["overflow","overflowX","overflowY"],function(a,b){t.CSS.setPropertyValue(j,b,"hidden")}),t.CSS.setPropertyValue(j,"position",a.position),t.CSS.setPropertyValue(j,"fontSize",a.fontSize),t.CSS.setPropertyValue(j,"boxSizing","content-box"),m.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(a,b){t.CSS.setPropertyValue(j,b,h+"%")}),t.CSS.setPropertyValue(j,"paddingLeft",h+"em"),i.percentToPxWidth=I.lastPercentToPxWidth=(parseFloat(v.getPropertyValue(j,"width",null,!0))||1)/h,i.percentToPxHeight=I.lastPercentToPxHeight=(parseFloat(v.getPropertyValue(j,"height",null,!0))||1)/h,i.emToPx=I.lastEmToPx=(parseFloat(v.getPropertyValue(j,"paddingLeft"))||1)/h,a.myParent.removeChild(j)}return null===I.remToPx&&(I.remToPx=parseFloat(v.getPropertyValue(c.body,"fontSize"))||16),null===I.vwToPx&&(I.vwToPx=parseFloat(b.innerWidth)/100,I.vhToPx=parseFloat(b.innerHeight)/100),i.remToPx=I.remToPx,i.vwToPx=I.vwToPx,i.vhToPx=I.vhToPx,t.debug>=1&&console.log("Unit ratios: "+JSON.stringify(i),f),i}if(h.begin&&0===y)try{h.begin.call(o,o)}catch(u){setTimeout(function(){throw u},1)}if("scroll"===C){var w,z,A,D=/^x$/i.test(h.axis)?"Left":"Top",E=parseFloat(h.offset)||0;h.container?p.isWrapped(h.container)||p.isNode(h.container)?(h.container=h.container[0]||h.container,w=h.container["scroll"+D],A=w+m(f).position()[D.toLowerCase()]+E):h.container=null:(w=t.State.scrollAnchor[t.State["scrollProperty"+D]],z=t.State.scrollAnchor[t.State["scrollProperty"+("Left"===D?"Top":"Left")]],A=m(f).offset()[D.toLowerCase()]+E),i={scroll:{rootPropertyValue:!1,startValue:w,currentValue:w,endValue:A,unitType:"",easing:h.easing,scrollData:{container:h.container,direction:D,alternateValue:z}},element:f},t.debug&&console.log("tweensContainer (scroll): ",i.scroll,f)}else if("reverse"===C){if(!g(f).tweensContainer)return void m.dequeue(f,h.queue);"none"===g(f).opts.display&&(g(f).opts.display="auto"),"hidden"===g(f).opts.visibility&&(g(f).opts.visibility="visible"),g(f).opts.loop=!1,g(f).opts.begin=null,g(f).opts.complete=null,s.easing||delete h.easing,s.duration||delete h.duration,h=m.extend({},g(f).opts,h);var F=m.extend(!0,{},g(f).tweensContainer);for(var G in F)if("element"!==G){var H=F[G].startValue;F[G].startValue=F[G].currentValue=F[G].endValue,F[G].endValue=H,p.isEmptyObject(s)||(F[G].easing=h.easing),t.debug&&console.log("reverse tweensContainer ("+G+"): "+JSON.stringify(F[G]),f)}i=F}else if("start"===C){var F;g(f).tweensContainer&&g(f).isAnimating===!0&&(F=g(f).tweensContainer),m.each(q,function(a,b){if(RegExp("^"+v.Lists.colors.join("$|^")+"$").test(a)){var c=l(b,!0),e=c[0],f=c[1],g=c[2];if(v.RegEx.isHex.test(e)){for(var h=["Red","Green","Blue"],i=v.Values.hexToRgb(e),j=g?v.Values.hexToRgb(g):d,k=0;k<h.length;k++){var m=[i[k]];f&&m.push(f),j!==d&&m.push(j[k]),q[a+h[k]]=m}delete q[a]}}});for(var K in q){var L=l(q[K]),M=L[0],N=L[1],O=L[2];K=v.Names.camelCase(K);var P=v.Hooks.getRoot(K),Q=!1;if(g(f).isSVG||"tween"===P||v.Names.prefixCheck(P)[1]!==!1||v.Normalizations.registered[P]!==d){(h.display!==d&&null!==h.display&&"none"!==h.display||h.visibility!==d&&"hidden"!==h.visibility)&&/opacity|filter/.test(K)&&!O&&0!==M&&(O=0),h._cacheValues&&F&&F[K]?(O===d&&(O=F[K].endValue+F[K].unitType),Q=g(f).rootPropertyValueCache[P]):v.Hooks.registered[K]?O===d?(Q=v.getPropertyValue(f,P),O=v.getPropertyValue(f,K,Q)):Q=v.Hooks.templates[P][1]:O===d&&(O=v.getPropertyValue(f,K));var R,S,T,U=!1;if(R=n(K,O),O=R[0],T=R[1],R=n(K,M),M=R[0].replace(/^([+-\/*])=/,function(a,b){return U=b,""}),S=R[1],O=parseFloat(O)||0,M=parseFloat(M)||0,"%"===S&&(/^(fontSize|lineHeight)$/.test(K)?(M/=100,S="em"):/^scale/.test(K)?(M/=100,S=""):/(Red|Green|Blue)$/i.test(K)&&(M=M/100*255,S="")),/[\/*]/.test(U))S=T;else if(T!==S&&0!==O)if(0===M)S=T;else{e=e||r();var V=/margin|padding|left|right|width|text|word|letter/i.test(K)||/X$/.test(K)||"x"===K?"x":"y";
switch(T){case"%":O*="x"===V?e.percentToPxWidth:e.percentToPxHeight;break;case"px":break;default:O*=e[T+"ToPx"]}switch(S){case"%":O*=1/("x"===V?e.percentToPxWidth:e.percentToPxHeight);break;case"px":break;default:O*=1/e[S+"ToPx"]}}switch(U){case"+":M=O+M;break;case"-":M=O-M;break;case"*":M=O*M;break;case"/":M=O/M}i[K]={rootPropertyValue:Q,startValue:O,currentValue:O,endValue:M,unitType:S,easing:N},t.debug&&console.log("tweensContainer ("+K+"): "+JSON.stringify(i[K]),f)}else t.debug&&console.log("Skipping ["+P+"] due to a lack of browser support.")}i.element=f}i.element&&(v.Values.addClass(f,"velocity-animating"),J.push(i),""===h.queue&&(g(f).tweensContainer=i,g(f).opts=h),g(f).isAnimating=!0,y===x-1?(t.State.calls.push([J,o,h,null,B.resolver]),t.State.isTicking===!1&&(t.State.isTicking=!0,k())):y++)}var e,f=this,h=m.extend({},t.defaults,s),i={};switch(g(f)===d&&t.init(f),parseFloat(h.delay)&&h.queue!==!1&&m.queue(f,h.queue,function(a){t.velocityQueueEntryFlag=!0,g(f).delayTimer={setTimeout:setTimeout(a,parseFloat(h.delay)),next:a}}),h.duration.toString().toLowerCase()){case"fast":h.duration=200;break;case"normal":h.duration=r;break;case"slow":h.duration=600;break;default:h.duration=parseFloat(h.duration)||1}t.mock!==!1&&(t.mock===!0?h.duration=h.delay=1:(h.duration*=parseFloat(t.mock)||1,h.delay*=parseFloat(t.mock)||1)),h.easing=j(h.easing,h.duration),h.begin&&!p.isFunction(h.begin)&&(h.begin=null),h.progress&&!p.isFunction(h.progress)&&(h.progress=null),h.complete&&!p.isFunction(h.complete)&&(h.complete=null),h.display!==d&&null!==h.display&&(h.display=h.display.toString().toLowerCase(),"auto"===h.display&&(h.display=t.CSS.Values.getDisplayType(f))),h.visibility!==d&&null!==h.visibility&&(h.visibility=h.visibility.toString().toLowerCase()),h.mobileHA=h.mobileHA&&t.State.isMobile&&!t.State.isGingerbread,h.queue===!1?h.delay?setTimeout(a,h.delay):a():m.queue(f,h.queue,function(b,c){return c===!0?(B.promise&&B.resolver(o),!0):(t.velocityQueueEntryFlag=!0,void a(b))}),""!==h.queue&&"fx"!==h.queue||"inprogress"===m.queue(f)[0]||m.dequeue(f)}var h,i,n,o,q,s,u=arguments[0]&&(arguments[0].p||m.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||p.isString(arguments[0].properties));if(p.isWrapped(this)?(h=!1,n=0,o=this,i=this):(h=!0,n=1,o=u?arguments[0].elements||arguments[0].e:arguments[0]),o=f(o)){u?(q=arguments[0].properties||arguments[0].p,s=arguments[0].options||arguments[0].o):(q=arguments[n],s=arguments[n+1]);var x=o.length,y=0;if(!/^(stop|finish)$/i.test(q)&&!m.isPlainObject(s)){var z=n+1;s={};for(var A=z;A<arguments.length;A++)p.isArray(arguments[A])||!/^(fast|normal|slow)$/i.test(arguments[A])&&!/^\d/.test(arguments[A])?p.isString(arguments[A])||p.isArray(arguments[A])?s.easing=arguments[A]:p.isFunction(arguments[A])&&(s.complete=arguments[A]):s.duration=arguments[A]}var B={promise:null,resolver:null,rejecter:null};h&&t.Promise&&(B.promise=new t.Promise(function(a,b){B.resolver=a,B.rejecter=b}));var C;switch(q){case"scroll":C="scroll";break;case"reverse":C="reverse";break;case"finish":case"stop":m.each(o,function(a,b){g(b)&&g(b).delayTimer&&(clearTimeout(g(b).delayTimer.setTimeout),g(b).delayTimer.next&&g(b).delayTimer.next(),delete g(b).delayTimer)});var D=[];return m.each(t.State.calls,function(a,b){b&&m.each(b[1],function(c,e){var f=s===d?"":s;return f===!0||b[2].queue===f||s===d&&b[2].queue===!1?void m.each(o,function(c,d){d===e&&((s===!0||p.isString(s))&&(m.each(m.queue(d,p.isString(s)?s:""),function(a,b){p.isFunction(b)&&b(null,!0)}),m.queue(d,p.isString(s)?s:"",[])),"stop"===q?(g(d)&&g(d).tweensContainer&&f!==!1&&m.each(g(d).tweensContainer,function(a,b){b.endValue=b.currentValue}),D.push(a)):"finish"===q&&(b[2].duration=1))}):!0})}),"stop"===q&&(m.each(D,function(a,b){l(b,!0)}),B.promise&&B.resolver(o)),a();default:if(!m.isPlainObject(q)||p.isEmptyObject(q)){if(p.isString(q)&&t.Redirects[q]){var E=m.extend({},s),F=E.duration,G=E.delay||0;return E.backwards===!0&&(o=m.extend(!0,[],o).reverse()),m.each(o,function(a,b){parseFloat(E.stagger)?E.delay=G+parseFloat(E.stagger)*a:p.isFunction(E.stagger)&&(E.delay=G+E.stagger.call(b,a,x)),E.drag&&(E.duration=parseFloat(F)||(/^(callout|transition)/.test(q)?1e3:r),E.duration=Math.max(E.duration*(E.backwards?1-a/x:(a+1)/x),.75*E.duration,200)),t.Redirects[q].call(b,b,E||{},a,x,o,B.promise?B:d)}),a()}var H="Velocity: First argument ("+q+") was not a property map, a known action, or a registered redirect. Aborting.";return B.promise?B.rejecter(new Error(H)):console.log(H),a()}C="start"}var I={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},J=[];m.each(o,function(a,b){p.isNode(b)&&e.call(b)});var K,E=m.extend({},t.defaults,s);if(E.loop=parseInt(E.loop),K=2*E.loop-1,E.loop)for(var L=0;K>L;L++){var M={delay:E.delay,progress:E.progress};L===K-1&&(M.display=E.display,M.visibility=E.visibility,M.complete=E.complete),w(o,"reverse",M)}return a()}};t=m.extend(w,t),t.animate=w;var x=b.requestAnimationFrame||o;return t.State.isMobile||c.hidden===d||c.addEventListener("visibilitychange",function(){c.hidden?(x=function(a){return setTimeout(function(){a(!0)},16)},k()):x=b.requestAnimationFrame||o}),a.Velocity=t,a!==b&&(a.fn.velocity=w,a.fn.velocity.defaults=t.defaults),m.each(["Down","Up"],function(a,b){t.Redirects["slide"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j=i.begin,k=i.complete,l={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},n={};i.display===d&&(i.display="Down"===b?"inline"===t.CSS.Values.getDisplayType(a)?"inline-block":"block":"none"),i.begin=function(){j&&j.call(g,g);for(var c in l){n[c]=a.style[c];var d=t.CSS.getPropertyValue(a,c);l[c]="Down"===b?[d,0]:[0,d]}n.overflow=a.style.overflow,a.style.overflow="hidden"},i.complete=function(){for(var b in n)a.style[b]=n[b];k&&k.call(g,g),h&&h.resolver(g)},t(a,l,i)}}),m.each(["In","Out"],function(a,b){t.Redirects["fade"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j={opacity:"In"===b?1:0},k=i.complete;i.complete=e!==f-1?i.begin=null:function(){k&&k.call(g,g),h&&h.resolver(g)},i.display===d&&(i.display="In"===b?"auto":"none"),t(this,j,i)}}),t}(window.jQuery||window.Zepto||window,window,document)})),!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==ka?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ia.length;){if(c=ia[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return oa++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:ra?N:sa?Q:qa?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&ya&&0===d-e,g=b&(Aa|Ba)&&0===d-e;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=na(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===ya||f.eventType===Aa)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ba&&(i>xa||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=ma(l.x)>ma(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:la(a.pointers[c].clientX),clientY:la(a.pointers[c].clientY)},c++;return{timeStamp:na(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:la(a[0].clientX),y:la(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:la(c/b),y:la(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Ca:ma(a)>=ma(b)?a>0?Da:Ea:b>0?Fa:Ga}function I(a,b,c){c||(c=Ka);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Ka);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],La)-J(a[1],a[0],La)}function L(a,b){return I(b[0],b[1],La)/I(a[0],a[1],La)}function M(){this.evEl=Na,this.evWin=Oa,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Ra,this.evWin=Sa,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ua,this.evWin=Va,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Aa|Ba)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xa,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(ya|za)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===ya)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Aa|Ba)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bb))return bb;var b=q(a,cb),c=q(a,db);return b&&c?cb+" "+db:b||c?b?cb:db:q(a,ab)?ab:_a}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=eb,this.simultaneous={},this.requireFail=[]}function W(a){return a&jb?"cancel":a&hb?"end":a&gb?"move":a&fb?"start":""}function X(a){return a==Ga?"down":a==Fa?"up":a==Da?"left":a==Ea?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function aa(){V.apply(this,arguments),this._timer=null,this._input=null}function ba(){Z.apply(this,arguments)}function ca(){Z.apply(this,arguments)}function da(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ea(a,b){return b=b||{},b.recognizers=m(b.recognizers,ea.defaults.preset),new fa(a,b)}function fa(a,b){b=b||{},this.options=i(b,ea.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),ga(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ga(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function ha(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ia=["","webkit","moz","MS","ms","o"],ja=b.createElement("div"),ka="function",la=Math.round,ma=Math.abs,na=Date.now,oa=1,pa=/mobile|tablet|ip(ad|hone|od)|android/i,qa="ontouchstart"in a,ra=v(a,"PointerEvent")!==d,sa=qa&&pa.test(navigator.userAgent),ta="touch",ua="pen",va="mouse",wa="kinect",xa=25,ya=1,za=2,Aa=4,Ba=8,Ca=1,Da=2,Ea=4,Fa=8,Ga=16,Ha=Da|Ea,Ia=Fa|Ga,Ja=Ha|Ia,Ka=["x","y"],La=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Ma={mousedown:ya,mousemove:za,mouseup:Aa},Na="mousedown",Oa="mousemove mouseup";j(M,y,{handler:function(a){var b=Ma[a.type];b&ya&&0===a.button&&(this.pressed=!0),b&za&&1!==a.which&&(b=Aa),this.pressed&&this.allow&&(b&Aa&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:va,srcEvent:a}))}});var Pa={pointerdown:ya,pointermove:za,pointerup:Aa,pointercancel:Ba,pointerout:Ba},Qa={2:ta,3:ua,4:va,5:wa},Ra="pointerdown",Sa="pointermove pointerup pointercancel";a.MSPointerEvent&&(Ra="MSPointerDown",Sa="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pa[d],f=Qa[a.pointerType]||a.pointerType,g=f==ta,h=s(b,a.pointerId,"pointerId");e&ya&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Aa|Ba)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Ta={touchstart:ya,touchmove:za,touchend:Aa,touchcancel:Ba},Ua="touchstart",Va="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Ta[a.type];if(b===ya&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Aa|Ba)&&0===c[0].length-c[1].length&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:ta,srcEvent:a})}}});var Wa={touchstart:ya,touchmove:za,touchend:Aa,touchcancel:Ba},Xa="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wa[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:ta,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==ta,e=c.pointerType==va;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Aa|Ba)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Ya=v(ja.style,"touchAction"),Za=Ya!==d,$a="compute",_a="auto",ab="manipulation",bb="none",cb="pan-x",db="pan-y";T.prototype={set:function(a){a==$a&&(a=this.compute()),Za&&(this.manager.element.style[Ya]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Za){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bb),f=q(d,db),g=q(d,cb);return e||f&&c&Ha||g&&c&Ia?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var eb=1,fb=2,gb=4,hb=8,ib=hb,jb=16,kb=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hb>d&&b(!0),b(),d>=hb&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kb|eb)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ib|jb|kb)&&(this.state=eb),this.state=this.process(b),void(this.state&(fb|gb|hb|jb)&&this.tryEmit(b))):(this.reset(),void(this.state=kb))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fb|gb),e=this.attrTest(a);return d&&(c&Ba||!e)?b|jb:d||e?c&Aa?b|hb:b&fb?b|gb:fb:kb}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ja},getTouchAction:function(){var a=this.options.direction,b=[];return a&Ha&&b.push(db),a&Ia&&b.push(cb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Ha?(e=0===f?Ca:0>f?Da:Ea,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ca:0>g?Fa:Ga,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fb||!(this.state&fb)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fb)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(aa,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_a]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Aa|Ba)&&!f)this.reset();else if(a.eventType&ya)this.reset(),this._timer=e(function(){this.state=ib,this.tryEmit()},b.time,this);else if(a.eventType&Aa)return ib;return kb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ib&&(a&&a.eventType&Aa?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=na(),this.manager.emit(this.options.event,this._input)))}}),j(ba,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fb)}}),j(ca,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Ha|Ia,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Ha|Ia)?b=a.velocity:c&Ha?b=a.velocityX:c&Ia&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&ma(b)>this.options.velocity&&a.eventType&Aa},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(da,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ab]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&ya&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Aa)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ib,this.tryEmit()},b.interval,this),fb):ib}return kb},failTimeout:function(){return this._timer=e(function(){this.state=kb},this.options.interval,this),kb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ib&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ea.VERSION="2.0.4",ea.defaults={domEvents:!1,touchAction:$a,enable:!0,inputTarget:null,inputClass:null,preset:[[ba,{enable:!1}],[_,{enable:!1},["rotate"]],[ca,{direction:Ha}],[$,{direction:Ha},["swipe"]],[da],[da,{event:"doubletap",taps:2},["tap"]],[aa]],cssProps:{userSelect:"default",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lb=1,mb=2;fa.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mb:lb},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ib)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fb|gb|hb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&ha(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ga(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(ea,{INPUT_START:ya,INPUT_MOVE:za,INPUT_END:Aa,INPUT_CANCEL:Ba,STATE_POSSIBLE:eb,STATE_BEGAN:fb,STATE_CHANGED:gb,STATE_ENDED:hb,STATE_RECOGNIZED:ib,STATE_CANCELLED:jb,STATE_FAILED:kb,DIRECTION_NONE:Ca,DIRECTION_LEFT:Da,DIRECTION_RIGHT:Ea,DIRECTION_UP:Fa,DIRECTION_DOWN:Ga,DIRECTION_HORIZONTAL:Ha,DIRECTION_VERTICAL:Ia,DIRECTION_ALL:Ja,Manager:fa,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:da,Pan:$,Swipe:ca,Pinch:_,Rotate:ba,Press:aa,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==ka&&define.amd?define(function(){return ea}):"undefined"!=typeof module&&module.exports?module.exports=ea:a[c]=ea}(window,document,"Hammer"),function(a){"function"==typeof define&&define.amd?define(["jquery","hammerjs"],a):"object"==typeof exports?a(require("jquery"),require("hammerjs")):a(jQuery,Hammer)}(function(a,b){function c(c,d){var e=a(c);e.data("hammer")||e.data("hammer",new b(e[0],d))}a.fn.hammer=function(a){return this.each(function(){c(this,a)})},b.Manager.prototype.emit=function(b){return function(c,d){b.call(this,c,d),a(this.element).trigger({type:c,gesture:d})}}(b.Manager.prototype.emit)}),function(a){a.Package?Materialize={}:a.Materialize={}}(window),function(a){for(var b=0,c=["webkit","moz"],d=a.requestAnimationFrame,e=a.cancelAnimationFrame,f=c.length;--f>=0&&!d;)d=a[c[f]+"RequestAnimationFrame"],e=a[c[f]+"CancelRequestAnimationFrame"];d&&e||(d=function(a){var c=+Date.now(),d=Math.max(b+16,c);return setTimeout(function(){a(b=d)},d-c)},e=clearTimeout),a.requestAnimationFrame=d,a.cancelAnimationFrame=e}(window),Materialize.guid=function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}}(),Materialize.escapeHash=function(a){return a.replace(/(:|\.|\[|\]|,|=)/g,"\\$1")},Materialize.elementOrParentIsFixed=function(a){var b=$(a),c=b.add(b.parents()),d=!1;return c.each(function(){return"fixed"===$(this).css("position")?(d=!0,!1):void 0}),d};var Vel;Vel=jQuery?jQuery.Velocity:$?$.Velocity:Velocity,function(a){a.fn.collapsible=function(b){var c={accordion:void 0,onOpen:void 0,onClose:void 0};return b=a.extend(c,b),this.each(function(){function c(b){j=i.find("> li > .collapsible-header"),b.hasClass("active")?b.parent().addClass("active"):b.parent().removeClass("active"),b.parent().hasClass("active")?b.siblings(".collapsible-body").stop(!0,!1).slideDown({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}}):b.siblings(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}}),j.not(b).removeClass("active").parent().removeClass("active"),j.not(b).parent().children(".collapsible-body").stop(!0,!1).each(function(){a(this).is(":visible")&&a(this).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height",""),f(a(this).siblings(".collapsible-header"))}})})}function d(b){b.hasClass("active")?b.parent().addClass("active"):b.parent().removeClass("active"),b.parent().hasClass("active")?b.siblings(".collapsible-body").stop(!0,!1).slideDown({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}}):b.siblings(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}})}function e(a){b.accordion||"accordion"===k||void 0===k?c(a):d(a),f(a)}function f(a){a.hasClass("active")?"function"==typeof b.onOpen&&b.onOpen.call(this,a.parent()):"function"==typeof b.onClose&&b.onClose.call(this,a.parent())}function g(a){var b=h(a);return b.length>0}function h(a){return a.closest("li > .collapsible-header")}var i=a(this),j=a(this).find("> li > .collapsible-header"),k=i.data("collapsible");i.off("click.collapse","> li > .collapsible-header"),j.off("click.collapse"),i.on("click.collapse","> li > .collapsible-header",function(b){var c=a(b.target);g(c)&&(c=h(c)),c.toggleClass("active"),e(c)}),b.accordion||"accordion"===k||void 0===k?e(j.filter(".active").first()):j.filter(".active").each(function(){e(a(this))})})},a(document).ready(function(){a(".collapsible").collapsible()})}(jQuery),function(a){a.fn.scrollTo=function(b){return a(this).scrollTop(a(this).scrollTop()-a(this).offset().top+a(b).offset().top),this},a.fn.dropdown=function(b){var c={inDuration:300,outDuration:225,constrain_width:!0,hover:!1,gutter:0,belowOrigin:!1,alignment:"left",stopPropagation:!1};return"open"===b?(this.each(function(){a(this).trigger("open")}),!1):"close"===b?(this.each(function(){a(this).trigger("close")}),!1):void this.each(function(){function d(){void 0!==g.data("induration")&&(h.inDuration=g.data("induration")),void 0!==g.data("outduration")&&(h.outDuration=g.data("outduration")),void 0!==g.data("constrainwidth")&&(h.constrain_width=g.data("constrainwidth")),void 0!==g.data("hover")&&(h.hover=g.data("hover")),void 0!==g.data("gutter")&&(h.gutter=g.data("gutter")),void 0!==g.data("beloworigin")&&(h.belowOrigin=g.data("beloworigin")),void 0!==g.data("alignment")&&(h.alignment=g.data("alignment")),void 0!==g.data("stoppropagation")&&(h.stopPropagation=g.data("stoppropagation"))}function e(b){"focus"===b&&(i=!0),d(),j.addClass("active"),g.addClass("active"),h.constrain_width===!0?j.css("width",g.outerWidth()):j.css("white-space","nowrap");var c=window.innerHeight,e=g.innerHeight(),f=g.offset().left,k=g.offset().top-a(window).scrollTop(),l=h.alignment,m=0,n=0,o=0;h.belowOrigin===!0&&(o=e);var p=0,q=0,r=g.parent();if(r.is("body")||(r[0].scrollHeight>r[0].clientHeight&&(p=r[0].scrollTop),r[0].scrollWidth>r[0].clientWidth&&(q=r[0].scrollLeft)),f+j.innerWidth()>a(window).width()?l="right":f-j.innerWidth()+g.innerWidth()<0&&(l="left"),k+j.innerHeight()>c)if(k+e-j.innerHeight()<0){var s=c-k-o;j.css("max-height",s)}else o||(o+=e),o-=j.innerHeight();if("left"===l)m=h.gutter,n=g.position().left+m;else if("right"===l){var t=g.position().left+g.outerWidth()-j.outerWidth();m=-h.gutter,n=t+m}j.css({position:"absolute",top:g.position().top+o+p,left:n+q}),j.stop(!0,!0).css("opacity",0).slideDown({queue:!1,duration:h.inDuration,easing:"easeOutCubic",complete:function(){a(this).css("height","")}}).animate({opacity:1},{queue:!1,duration:h.inDuration,easing:"easeOutSine"})}function f(){i=!1,j.fadeOut(h.outDuration),j.removeClass("active"),g.removeClass("active"),setTimeout(function(){j.css("max-height","")},h.outDuration)}var g=a(this),h=a.extend({},c,b),i=!1,j=a("#"+g.attr("data-activates"));if(d(),g.after(j),h.hover){var k=!1;g.unbind("click."+g.attr("id")),g.on("mouseenter",function(a){k===!1&&(e(),k=!0)}),g.on("mouseleave",function(b){var c=b.toElement||b.relatedTarget;a(c).closest(".dropdown-content").is(j)||(j.stop(!0,!0),f(),k=!1)}),j.on("mouseleave",function(b){var c=b.toElement||b.relatedTarget;a(c).closest(".dropdown-button").is(g)||(j.stop(!0,!0),f(),k=!1)})}else g.unbind("click."+g.attr("id")),g.bind("click."+g.attr("id"),function(b){i||(g[0]!=b.currentTarget||g.hasClass("active")||0!==a(b.target).closest(".dropdown-content").length?g.hasClass("active")&&(f(),a(document).unbind("click."+j.attr("id")+" touchstart."+j.attr("id"))):(b.preventDefault(),h.stopPropagation&&b.stopPropagation(),e("click")),j.hasClass("active")&&a(document).bind("click."+j.attr("id")+" touchstart."+j.attr("id"),function(b){j.is(b.target)||g.is(b.target)||g.find(b.target).length||(f(),a(document).unbind("click."+j.attr("id")+" touchstart."+j.attr("id")))}))});g.on("open",function(a,b){e(b)}),g.on("close",f)})},a(document).ready(function(){a(".dropdown-button").dropdown()})}(jQuery),function(a){var b=0,c=0,d=function(){return c++,"materialize-modal-overlay-"+c},e={init:function(c){var e={opacity:.5,in_duration:350,out_duration:250,ready:void 0,complete:void 0,dismissible:!0,starting_top:"4%",ending_top:"10%"};return c=a.extend(e,c),this.each(function(){var e=a(this),f=a(this).attr("id")||"#"+a(this).data("target"),g=function(){var d=e.data("overlay-id"),f=a("#"+d);e.removeClass("open"),a("body").css({overflow:"",width:""}),e.find(".modal-close").off("click.close"),a(document).off("keyup.modal"+d),f.velocity({opacity:0},{duration:c.out_duration,queue:!1,ease:"easeOutQuart"});var g={
duration:c.out_duration,queue:!1,ease:"easeOutCubic",complete:function(){a(this).css({display:"none"}),"function"==typeof c.complete&&c.complete.call(this,e),f.remove(),b--}};e.hasClass("bottom-sheet")?e.velocity({bottom:"-100%",opacity:0},g):e.velocity({top:c.starting_top,opacity:0,scaleX:.7},g)},h=function(f){var h=a("body"),i=h.innerWidth();if(h.css("overflow","hidden"),h.width(i),!e.hasClass("open")){var j=d(),k=a('<div class="modal-overlay"></div>');lStack=++b,k.attr("id",j).css("z-index",1e3+2*lStack),e.data("overlay-id",j).css("z-index",1e3+2*lStack+1),e.addClass("open"),a("body").append(k),c.dismissible&&(k.click(function(){g()}),a(document).on("keyup.modal"+j,function(a){27===a.keyCode&&g()})),e.find(".modal-close").on("click.close",function(a){g()}),k.css({display:"block",opacity:0}),e.css({display:"block",opacity:0}),k.velocity({opacity:c.opacity},{duration:c.in_duration,queue:!1,ease:"easeOutCubic"}),e.data("associated-overlay",k[0]);var l={duration:c.in_duration,queue:!1,ease:"easeOutCubic",complete:function(){"function"==typeof c.ready&&c.ready.call(this,e,f)}};e.hasClass("bottom-sheet")?e.velocity({bottom:"0",opacity:1},l):(a.Velocity.hook(e,"scaleX",.7),e.css({top:c.starting_top}),e.velocity({top:c.ending_top,opacity:1,scaleX:"1"},l))}};a(document).off("click.modalTrigger",'a[href="#'+f+'"], [data-target="'+f+'"]'),a(this).off("openModal"),a(this).off("closeModal"),a(document).on("click.modalTrigger",'a[href="#'+f+'"], [data-target="'+f+'"]',function(b){c.starting_top=(a(this).offset().top-a(window).scrollTop())/1.15,h(a(this)),b.preventDefault()}),a(this).on("openModal",function(){a(this).attr("href")||"#"+a(this).data("target");h()}),a(this).on("closeModal",function(){g()})})},open:function(){a(this).trigger("openModal")},close:function(){a(this).trigger("closeModal")}};a.fn.modal=function(b){return e[b]?e[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.modal"):e.init.apply(this,arguments)}}(jQuery),function(a){a.fn.materialbox=function(){return this.each(function(){function b(){f=!1;var b=i.parent(".material-placeholder"),d=(window.innerWidth,window.innerHeight,i.data("width")),g=i.data("height");i.velocity("stop",!0),a("#materialbox-overlay").velocity("stop",!0),a(".materialbox-caption").velocity("stop",!0),a("#materialbox-overlay").velocity({opacity:0},{duration:h,queue:!1,easing:"easeOutQuad",complete:function(){e=!1,a(this).remove()}}),i.velocity({width:d,height:g,left:0,top:0},{duration:h,queue:!1,easing:"easeOutQuad"}),a(".materialbox-caption").velocity({opacity:0},{duration:h,queue:!1,easing:"easeOutQuad",complete:function(){b.css({height:"",width:"",position:"",top:"",left:""}),i.css({height:"",top:"",left:"",width:"","max-width":"",position:"","z-index":""}),i.removeClass("active"),f=!0,a(this).remove(),c&&c.css("overflow","")}})}if(!a(this).hasClass("initialized")){a(this).addClass("initialized");var c,d,e=!1,f=!0,g=275,h=200,i=a(this),j=a("<div></div>").addClass("material-placeholder");i.wrap(j),i.on("click",function(){var h=i.parent(".material-placeholder"),j=window.innerWidth,k=window.innerHeight,l=i.width(),m=i.height();if(f===!1)return b(),!1;if(e&&f===!0)return b(),!1;f=!1,i.addClass("active"),e=!0,h.css({width:h[0].getBoundingClientRect().width,height:h[0].getBoundingClientRect().height,position:"relative",top:0,left:0}),c=void 0,d=h[0].parentNode;for(;null!==d&&!a(d).is(document);){var n=a(d);"visible"!==n.css("overflow")&&(n.css("overflow","visible"),c=void 0===c?n:c.add(n)),d=d.parentNode}i.css({position:"absolute","z-index":1e3}).data("width",l).data("height",m);var o=a('<div id="materialbox-overlay"></div>').css({opacity:0}).click(function(){f===!0&&b()});if(i.before(o),o.velocity({opacity:1},{duration:g,queue:!1,easing:"easeOutQuad"}),""!==i.data("caption")){var p=a('<div class="materialbox-caption"></div>');p.text(i.data("caption")),a("body").append(p),p.css({display:"inline"}),p.velocity({opacity:1},{duration:g,queue:!1,easing:"easeOutQuad"})}var q=0,r=l/j,s=m/k,t=0,u=0;r>s?(q=m/l,t=.9*j,u=.9*j*q):(q=l/m,t=.9*k*q,u=.9*k),i.hasClass("responsive-img")?i.velocity({"max-width":t,width:l},{duration:0,queue:!1,complete:function(){i.css({left:0,top:0}).velocity({height:u,width:t,left:a(document).scrollLeft()+j/2-i.parent(".material-placeholder").offset().left-t/2,top:a(document).scrollTop()+k/2-i.parent(".material-placeholder").offset().top-u/2},{duration:g,queue:!1,easing:"easeOutQuad",complete:function(){f=!0}})}}):i.css("left",0).css("top",0).velocity({height:u,width:t,left:a(document).scrollLeft()+j/2-i.parent(".material-placeholder").offset().left-t/2,top:a(document).scrollTop()+k/2-i.parent(".material-placeholder").offset().top-u/2},{duration:g,queue:!1,easing:"easeOutQuad",complete:function(){f=!0}})}),a(window).scroll(function(){e&&b()}),a(document).keyup(function(a){27===a.keyCode&&f===!0&&e&&b()})}})},a(document).ready(function(){a(".materialboxed").materialbox()})}(jQuery),function(a){a.fn.parallax=function(){var b=a(window).width();return this.each(function(c){function d(c){var d;d=601>b?e.height()>0?e.height():e.children("img").height():e.height()>0?e.height():500;var f=e.children("img").first(),g=f.height(),h=g-d,i=e.offset().top+d,j=e.offset().top,k=a(window).scrollTop(),l=window.innerHeight,m=k+l,n=(m-j)/(d+l),o=Math.round(h*n);c&&f.css("display","block"),i>k&&k+l>j&&f.css("transform","translate3D(-50%,"+o+"px, 0)")}var e=a(this);e.addClass("parallax"),e.children("img").one("load",function(){d(!0)}).each(function(){this.complete&&a(this).trigger("load")}),a(window).scroll(function(){b=a(window).width(),d(!1)}),a(window).resize(function(){b=a(window).width(),d(!1)})})}}(jQuery),function(a){var b={init:function(b){var c={onShow:null};return b=a.extend(c,b),this.each(function(){var c,d,e=a(this),f=(a(window).width(),e.find("li.tab a")),g=e.width(),h=Math.max(g,e[0].scrollWidth)/f.length,i=0,j=function(a){return g-a.position().left-a.outerWidth()-e.scrollLeft()},k=function(a){return a.position().left+e.scrollLeft()};c=a(f.filter('[href="'+location.hash+'"]')),0===c.length&&(c=a(this).find("li.tab a.active").first()),0===c.length&&(c=a(this).find("li.tab a").first()),c.addClass("active"),i=f.index(c),0>i&&(i=0),void 0!==c[0]&&(d=a(c[0].hash)),e.append('<div class="indicator"></div>');var l=e.find(".indicator");e.is(":visible")&&setTimeout(function(){l.css({right:j(c)}),l.css({left:k(c)})},0),a(window).resize(function(){g=e.width(),h=Math.max(g,e[0].scrollWidth)/f.length,0>i&&(i=0),0!==h&&0!==g&&(l.css({right:j(c)}),l.css({left:k(c)}))}),f.not(c).each(function(){a(Materialize.escapeHash(this.hash)).hide()}),e.on("click","a",function(m){if(a(this).parent().hasClass("disabled"))return void m.preventDefault();if(!a(this).attr("target")){g=e.width(),h=Math.max(g,e[0].scrollWidth)/f.length,c.removeClass("active"),void 0!==d&&d.hide(),c=a(this),d=a(Materialize.escapeHash(this.hash)),f=e.find("li.tab a");c.position();c.addClass("active");var n=i;i=f.index(a(this)),0>i&&(i=0),void 0!==d&&(d.show(),"function"==typeof b.onShow&&b.onShow.call(this,d)),i-n>=0?(l.velocity({right:j(c)},{duration:300,queue:!1,easing:"easeOutQuad"}),l.velocity({left:k(c)},{duration:300,queue:!1,easing:"easeOutQuad",delay:90})):(l.velocity({left:k(c)},{duration:300,queue:!1,easing:"easeOutQuad"}),l.velocity({right:j(c)},{duration:300,queue:!1,easing:"easeOutQuad",delay:90})),m.preventDefault()}})})},select_tab:function(a){this.find('a[href="#'+a+'"]').trigger("click")}};a.fn.tabs=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.tabs"):b.init.apply(this,arguments)},a(document).ready(function(){a("ul.tabs").tabs()})}(jQuery),function(a){a.fn.tooltip=function(c){var d=5,e={delay:350,tooltip:"",position:"bottom",html:!1};return"remove"===c?(this.each(function(){a("#"+a(this).attr("data-tooltip-id")).remove(),a(this).off("mouseenter.tooltip mouseleave.tooltip")}),!1):(c=a.extend(e,c),this.each(function(){var e=Materialize.guid(),f=a(this);f.attr("data-tooltip-id")&&a("#"+f.attr("data-tooltip-id")).remove(),f.attr("data-tooltip-id",e);var g,h,i,j,k,l,m=function(){g=f.attr("data-html")?"true"===f.attr("data-html"):c.html,h=f.attr("data-delay"),h=void 0===h||""===h?c.delay:h,i=f.attr("data-position"),i=void 0===i||""===i?c.position:i,j=f.attr("data-tooltip"),j=void 0===j||""===j?c.tooltip:j};m();var n=function(){var b=a('<div class="material-tooltip"></div>');return j=g?a("<span></span>").html(j):a("<span></span>").text(j),b.append(j).appendTo(a("body")).attr("id",e),l=a('<div class="backdrop"></div>'),l.appendTo(b),b};k=n(),f.off("mouseenter.tooltip mouseleave.tooltip");var o,p=!1;f.on({"mouseenter.tooltip":function(a){var c=function(){m(),p=!0,k.velocity("stop"),l.velocity("stop"),k.css({display:"block",left:"0px",top:"0px"});var a,c,e,g=f.outerWidth(),h=f.outerHeight(),j=k.outerHeight(),n=k.outerWidth(),o="0px",q="0px",r=8,s=8;"top"===i?(a=f.offset().top-j-d,c=f.offset().left+g/2-n/2,e=b(c,a,n,j),o="-10px",l.css({bottom:0,left:0,borderRadius:"14px 14px 0 0",transformOrigin:"50% 100%",marginTop:j,marginLeft:n/2-l.width()/2})):"left"===i?(a=f.offset().top+h/2-j/2,c=f.offset().left-n-d,e=b(c,a,n,j),q="-10px",l.css({top:"-7px",right:0,width:"14px",height:"14px",borderRadius:"14px 0 0 14px",transformOrigin:"95% 50%",marginTop:j/2,marginLeft:n})):"right"===i?(a=f.offset().top+h/2-j/2,c=f.offset().left+g+d,e=b(c,a,n,j),q="+10px",l.css({top:"-7px",left:0,width:"14px",height:"14px",borderRadius:"0 14px 14px 0",transformOrigin:"5% 50%",marginTop:j/2,marginLeft:"0px"})):(a=f.offset().top+f.outerHeight()+d,c=f.offset().left+g/2-n/2,e=b(c,a,n,j),o="+10px",l.css({top:0,left:0,marginLeft:n/2-l.width()/2})),k.css({top:e.y,left:e.x}),r=Math.SQRT2*n/parseInt(l.css("width")),s=Math.SQRT2*j/parseInt(l.css("height")),k.velocity({marginTop:o,marginLeft:q},{duration:350,queue:!1}).velocity({opacity:1},{duration:300,delay:50,queue:!1}),l.css({display:"block"}).velocity({opacity:1},{duration:55,delay:0,queue:!1}).velocity({scaleX:r,scaleY:s},{duration:300,delay:0,queue:!1,easing:"easeInOutQuad"})};o=setTimeout(c,h)},"mouseleave.tooltip":function(){p=!1,clearTimeout(o),setTimeout(function(){p!==!0&&(k.velocity({opacity:0,marginTop:0,marginLeft:0},{duration:225,queue:!1}),l.velocity({opacity:0,scaleX:1,scaleY:1},{duration:225,queue:!1,complete:function(){l.css("display","none"),k.css("display","none"),p=!1}}))},225)}})}))};var b=function(b,c,d,e){var f=b,g=c;return 0>f?f=4:f+d>window.innerWidth&&(f-=f+d-window.innerWidth),0>g?g=4:g+e>window.innerHeight+a(window).scrollTop&&(g-=g+e-window.innerHeight),{x:f,y:g}};a(document).ready(function(){a(".tooltipped").tooltip()})}(jQuery),function(a){"use strict";function b(a){return null!==a&&a===a.window}function c(a){return b(a)?a:9===a.nodeType&&a.defaultView}function d(a){var b,d,e={top:0,left:0},f=a&&a.ownerDocument;return b=f.documentElement,"undefined"!=typeof a.getBoundingClientRect&&(e=a.getBoundingClientRect()),d=c(f),{top:e.top+d.pageYOffset-b.clientTop,left:e.left+d.pageXOffset-b.clientLeft}}function e(a){var b="";for(var c in a)a.hasOwnProperty(c)&&(b+=c+":"+a[c]+";");return b}function f(a){if(k.allowEvent(a)===!1)return null;for(var b=null,c=a.target||a.srcElement;null!==c.parentElement;){if(!(c instanceof SVGElement||-1===c.className.indexOf("waves-effect"))){b=c;break}if(c.classList.contains("waves-effect")){b=c;break}c=c.parentElement}return b}function g(b){var c=f(b);null!==c&&(j.show(b,c),"ontouchstart"in a&&(c.addEventListener("touchend",j.hide,!1),c.addEventListener("touchcancel",j.hide,!1)),c.addEventListener("mouseup",j.hide,!1),c.addEventListener("mouseleave",j.hide,!1))}var h=h||{},i=document.querySelectorAll.bind(document),j={duration:750,show:function(a,b){if(2===a.button)return!1;var c=b||this,f=document.createElement("div");f.className="waves-ripple",c.appendChild(f);var g=d(c),h=a.pageY-g.top,i=a.pageX-g.left,k="scale("+c.clientWidth/100*10+")";"touches"in a&&(h=a.touches[0].pageY-g.top,i=a.touches[0].pageX-g.left),f.setAttribute("data-hold",Date.now()),f.setAttribute("data-scale",k),f.setAttribute("data-x",i),f.setAttribute("data-y",h);var l={top:h+"px",left:i+"px"};f.className=f.className+" waves-notransition",f.setAttribute("style",e(l)),f.className=f.className.replace("waves-notransition",""),l["-webkit-transform"]=k,l["-moz-transform"]=k,l["-ms-transform"]=k,l["-o-transform"]=k,l.transform=k,l.opacity="1",l["-webkit-transition-duration"]=j.duration+"ms",l["-moz-transition-duration"]=j.duration+"ms",l["-o-transition-duration"]=j.duration+"ms",l["transition-duration"]=j.duration+"ms",l["-webkit-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["-moz-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["-o-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",f.setAttribute("style",e(l))},hide:function(a){k.touchup(a);var b=this,c=(1.4*b.clientWidth,null),d=b.getElementsByClassName("waves-ripple");if(!(d.length>0))return!1;c=d[d.length-1];var f=c.getAttribute("data-x"),g=c.getAttribute("data-y"),h=c.getAttribute("data-scale"),i=Date.now()-Number(c.getAttribute("data-hold")),l=350-i;0>l&&(l=0),setTimeout(function(){var a={top:g+"px",left:f+"px",opacity:"0","-webkit-transition-duration":j.duration+"ms","-moz-transition-duration":j.duration+"ms","-o-transition-duration":j.duration+"ms","transition-duration":j.duration+"ms","-webkit-transform":h,"-moz-transform":h,"-ms-transform":h,"-o-transform":h,transform:h};c.setAttribute("style",e(a)),setTimeout(function(){try{b.removeChild(c)}catch(a){return!1}},j.duration)},l)},wrapInput:function(a){for(var b=0;b<a.length;b++){var c=a[b];if("input"===c.tagName.toLowerCase()){var d=c.parentNode;if("i"===d.tagName.toLowerCase()&&-1!==d.className.indexOf("waves-effect"))continue;var e=document.createElement("i");e.className=c.className+" waves-input-wrapper";var f=c.getAttribute("style");f||(f=""),e.setAttribute("style",f),c.className="waves-button-input",c.removeAttribute("style"),d.replaceChild(e,c),e.appendChild(c)}}}},k={touches:0,allowEvent:function(a){var b=!0;return"touchstart"===a.type?k.touches+=1:"touchend"===a.type||"touchcancel"===a.type?setTimeout(function(){k.touches>0&&(k.touches-=1)},500):"mousedown"===a.type&&k.touches>0&&(b=!1),b},touchup:function(a){k.allowEvent(a)}};h.displayEffect=function(b){b=b||{},"duration"in b&&(j.duration=b.duration),j.wrapInput(i(".waves-effect")),"ontouchstart"in a&&document.body.addEventListener("touchstart",g,!1),document.body.addEventListener("mousedown",g,!1)},h.attach=function(b){"input"===b.tagName.toLowerCase()&&(j.wrapInput([b]),b=b.parentElement),"ontouchstart"in a&&b.addEventListener("touchstart",g,!1),b.addEventListener("mousedown",g,!1)},a.Waves=h,document.addEventListener("DOMContentLoaded",function(){h.displayEffect()},!1)}(window),Materialize.toast=function(a,b,c,d){function e(a){var b=document.createElement("div");if(b.classList.add("toast"),c)for(var e=c.split(" "),f=0,g=e.length;g>f;f++)b.classList.add(e[f]);("object"==typeof HTMLElement?a instanceof HTMLElement:a&&"object"==typeof a&&null!==a&&1===a.nodeType&&"string"==typeof a.nodeName)?b.appendChild(a):a instanceof jQuery?b.appendChild(a[0]):b.innerHTML=a;var h=new Hammer(b,{prevent_default:!1});return h.on("pan",function(a){var c=a.deltaX,d=80;b.classList.contains("panning")||b.classList.add("panning");var e=1-Math.abs(c/d);0>e&&(e=0),Vel(b,{left:c,opacity:e},{duration:50,queue:!1,easing:"easeOutQuad"})}),h.on("panend",function(a){var c=a.deltaX,e=80;Math.abs(c)>e?Vel(b,{marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function(){"function"==typeof d&&d(),b.parentNode.removeChild(b)}}):(b.classList.remove("panning"),Vel(b,{left:0,opacity:1},{duration:300,easing:"easeOutExpo",queue:!1}))}),b}c=c||"";var f=document.getElementById("toast-container");null===f&&(f=document.createElement("div"),f.id="toast-container",document.body.appendChild(f));var g=e(a);a&&f.appendChild(g),g.style.top="35px",g.style.opacity=0,Vel(g,{top:"0px",opacity:1},{duration:300,easing:"easeOutCubic",queue:!1});var h,i=b;null!=i&&(h=setInterval(function(){null===g.parentNode&&window.clearInterval(h),g.classList.contains("panning")||(i-=20),0>=i&&(Vel(g,{opacity:0,marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function(){"function"==typeof d&&d(),this[0].parentNode.removeChild(this[0])}}),window.clearInterval(h))},20))},function(a){var b={init:function(b){var c={menuWidth:300,edge:"left",closeOnClick:!1,draggable:!0};b=a.extend(c,b),a(this).each(function(){var c=a(this),d=a("#"+c.attr("data-activates"));300!=b.menuWidth&&d.css("width",b.menuWidth);var e;b.draggable?(e=a('<div class="drag-target"></div>').attr("data-sidenav",c.attr("data-activates")),a("body").append(e)):e=a(),"left"==b.edge?(d.css("transform","translateX(-100%)"),e.css({left:0})):(d.addClass("right-aligned").css("transform","translateX(100%)"),e.css({right:0})),d.hasClass("fixed")&&window.innerWidth>992&&d.css("transform","translateX(0)"),d.hasClass("fixed")&&a(window).resize(function(){window.innerWidth>992?0!==a("#sidenav-overlay").length&&h?f(!0):d.css("transform","translateX(0%)"):h===!1&&("left"===b.edge?d.css("transform","translateX(-100%)"):d.css("transform","translateX(100%)"))}),b.closeOnClick===!0&&d.on("click.itemclick","a:not(.collapsible-header)",function(){f()});var f=function(c){g=!1,h=!1,a("body").css({overflow:"",width:""}),a("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}}),"left"===b.edge?(e.css({width:"",right:"",left:"0"}),d.velocity({translateX:"-100%"},{duration:200,queue:!1,easing:"easeOutCubic",complete:function(){c===!0&&(d.removeAttr("style"),d.css("width",b.menuWidth))}})):(e.css({width:"",right:"0",left:""}),d.velocity({translateX:"100%"},{duration:200,queue:!1,easing:"easeOutCubic",complete:function(){c===!0&&(d.removeAttr("style"),d.css("width",b.menuWidth))}}))},g=!1,h=!1;b.draggable&&(e.on("click",function(){h&&f()}),e.hammer({prevent_default:!1}).bind("pan",function(c){if("touch"==c.gesture.pointerType){var e=(c.gesture.direction,c.gesture.center.x),g=(c.gesture.center.y,c.gesture.velocityX,a("body")),i=a("#sidenav-overlay"),j=g.innerWidth();if(g.css("overflow","hidden"),g.width(j),0===i.length&&(i=a('<div id="sidenav-overlay"></div>'),i.css("opacity",0).click(function(){f()}),a("body").append(i)),"left"===b.edge&&(e>b.menuWidth?e=b.menuWidth:0>e&&(e=0)),"left"===b.edge)e<b.menuWidth/2?h=!1:e>=b.menuWidth/2&&(h=!0),d.css("transform","translateX("+(e-b.menuWidth)+"px)");else{e<window.innerWidth-b.menuWidth/2?h=!0:e>=window.innerWidth-b.menuWidth/2&&(h=!1);var k=e-b.menuWidth/2;0>k&&(k=0),d.css("transform","translateX("+k+"px)")}var l;"left"===b.edge?(l=e/b.menuWidth,i.velocity({opacity:l},{duration:10,queue:!1,easing:"easeOutQuad"})):(l=Math.abs((e-window.innerWidth)/b.menuWidth),i.velocity({opacity:l},{duration:10,queue:!1,easing:"easeOutQuad"}))}}).bind("panend",function(c){if("touch"==c.gesture.pointerType){var f=a('<div id="sidenav-overlay"></div>'),i=c.gesture.velocityX,j=c.gesture.center.x,k=j-b.menuWidth,l=j-b.menuWidth/2;k>0&&(k=0),0>l&&(l=0),g=!1,"left"===b.edge?h&&.3>=i||-.5>i?(0!==k&&d.velocity({translateX:[0,k]},{duration:300,queue:!1,easing:"easeOutQuad"}),f.velocity({opacity:1},{duration:50,queue:!1,easing:"easeOutQuad"}),e.css({width:"50%",right:0,left:""}),h=!0):(!h||i>.3)&&(a("body").css({overflow:"",width:""}),d.velocity({translateX:[-1*b.menuWidth-10,k]},{duration:200,queue:!1,easing:"easeOutQuad"}),f.velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}}),e.css({width:"10px",right:"",left:0})):h&&i>=-.3||i>.5?(0!==l&&d.velocity({translateX:[0,l]},{duration:300,queue:!1,easing:"easeOutQuad"}),f.velocity({opacity:1},{duration:50,queue:!1,easing:"easeOutQuad"}),e.css({width:"50%",right:"",left:0}),h=!0):(!h||-.3>i)&&(a("body").css({overflow:"",width:""}),d.velocity({translateX:[b.menuWidth+10,l]},{duration:200,queue:!1,easing:"easeOutQuad"}),f.velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}}),e.css({width:"10px",right:0,left:""}))}})),c.click(function(){if(h===!0)h=!1,g=!1,f();else{var c=a("body"),i=a('<div id="sidenav-overlay"></div>'),j=c.innerWidth();c.css("overflow","hidden"),c.width(j),a("body").append(e),"left"===b.edge?(e.css({width:"50%",right:0,left:""}),d.velocity({translateX:[0,-1*b.menuWidth]},{duration:300,queue:!1,easing:"easeOutQuad"})):(e.css({width:"50%",right:"",left:0}),d.velocity({translateX:[0,b.menuWidth]},{duration:300,queue:!1,easing:"easeOutQuad"})),i.css("opacity",0).click(function(){h=!1,g=!1,f(),i.velocity({opacity:0},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}})}),a("body").append(i),i.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){h=!0,g=!1}})}return!1})})},destroy:function(){var b=a("#sidenav-overlay"),c=a('.drag-target[data-sidenav="'+a(this).attr("data-activates")+'"]');b.trigger("click"),c.remove(),a(this).off("click"),b.remove()},show:function(){this.trigger("click")},hide:function(){a("#sidenav-overlay").trigger("click")}};a.fn.sideNav=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.sideNav"):b.init.apply(this,arguments)}}(jQuery),function(a){function b(b,c,d,e){var f=a();return a.each(g,function(a,g){if(g.height()>0){var h=g.offset().top,i=g.offset().left,j=i+g.width(),k=h+g.height(),l=!(i>c||e>j||h>d||b>k);l&&f.push(g)}}),f}function c(c){++j;var d=f.scrollTop(),e=f.scrollLeft(),g=e+f.width(),i=d+f.height(),l=b(d+k.top+c||200,g+k.right,i+k.bottom,e+k.left);a.each(l,function(a,b){var c=b.data("scrollSpy:ticks");"number"!=typeof c&&b.triggerHandler("scrollSpy:enter"),b.data("scrollSpy:ticks",j)}),a.each(h,function(a,b){var c=b.data("scrollSpy:ticks");"number"==typeof c&&c!==j&&(b.triggerHandler("scrollSpy:exit"),b.data("scrollSpy:ticks",null))}),h=l}function d(){f.trigger("scrollSpy:winSize")}function e(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:l(),g=null,f=a.apply(d,e),d=e=null};return function(){var j=l();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,0>=k?(clearTimeout(g),g=null,h=j,f=a.apply(d,e),d=e=null):g||c.trailing===!1||(g=setTimeout(i,k)),f}}var f=a(window),g=[],h=[],i=!1,j=0,k={top:0,right:0,bottom:0,left:0},l=Date.now||function(){return(new Date).getTime()};a.scrollSpy=function(b,d){var h={throttle:100,scrollOffset:200};d=a.extend(h,d);var j=[];b=a(b),b.each(function(b,c){g.push(a(c)),a(c).data("scrollSpy:id",b),a('a[href="#'+a(c).attr("id")+'"]').click(function(b){b.preventDefault();var c=a(Materialize.escapeHash(this.hash)).offset().top+1;a("html, body").animate({scrollTop:c-d.scrollOffset},{duration:400,queue:!1,easing:"easeOutCubic"})})}),k.top=d.offsetTop||0,k.right=d.offsetRight||0,k.bottom=d.offsetBottom||0,k.left=d.offsetLeft||0;var l=e(function(){c(d.scrollOffset)},d.throttle||100),m=function(){a(document).ready(l)};return i||(f.on("scroll",m),f.on("resize",m),i=!0),setTimeout(m,0),b.on("scrollSpy:enter",function(){j=a.grep(j,function(a){return 0!=a.height()});var b=a(this);j[0]?(a('a[href="#'+j[0].attr("id")+'"]').removeClass("active"),b.data("scrollSpy:id")<j[0].data("scrollSpy:id")?j.unshift(a(this)):j.push(a(this))):j.push(a(this)),a('a[href="#'+j[0].attr("id")+'"]').addClass("active")}),b.on("scrollSpy:exit",function(){if(j=a.grep(j,function(a){return 0!=a.height()}),j[0]){a('a[href="#'+j[0].attr("id")+'"]').removeClass("active");var b=a(this);j=a.grep(j,function(a){return a.attr("id")!=b.attr("id")}),j[0]&&a('a[href="#'+j[0].attr("id")+'"]').addClass("active")}}),b},a.winSizeSpy=function(b){return a.winSizeSpy=function(){return f},b=b||{throttle:100},f.on("resize",e(d,b.throttle||100))},a.fn.scrollSpy=function(b){return a.scrollSpy(a(this),b)}}(jQuery),function(a){a(document).ready(function(){function b(b){var c=b.css("font-family"),d=b.css("font-size"),f=b.css("line-height");d&&e.css("font-size",d),c&&e.css("font-family",c),f&&e.css("line-height",f),"off"===b.attr("wrap")&&e.css("overflow-wrap","normal").css("white-space","pre"),e.text(b.val()+"\n");var g=e.html().replace(/\n/g,"<br>");e.html(g),b.is(":visible")?e.css("width",b.width()):e.css("width",a(window).width()/2),b.css("height",e.height())}Materialize.updateTextFields=function(){var b="input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";a(b).each(function(b,c){a(c).val().length>0||c.autofocus||void 0!==a(this).attr("placeholder")||a(c)[0].validity.badInput===!0?a(this).siblings("label").addClass("active"):a(this).siblings("label").removeClass("active")})};var c="input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";a(document).on("change",c,function(){(0!==a(this).val().length||void 0!==a(this).attr("placeholder"))&&a(this).siblings("label").addClass("active"),validate_field(a(this))}),a(document).ready(function(){Materialize.updateTextFields()}),a(document).on("reset",function(b){var d=a(b.target);d.is("form")&&(d.find(c).removeClass("valid").removeClass("invalid"),d.find(c).each(function(){""===a(this).attr("value")&&a(this).siblings("label").removeClass("active")}),d.find("select.initialized").each(function(){var a=d.find("option[selected]").text();d.siblings("input.select-dropdown").val(a)}))}),a(document).on("focus",c,function(){a(this).siblings("label, .prefix").addClass("active")}),a(document).on("blur",c,function(){var b=a(this),c=".prefix";0===b.val().length&&b[0].validity.badInput!==!0&&void 0===b.attr("placeholder")&&(c+=", label"),b.siblings(c).removeClass("active"),validate_field(b)}),window.validate_field=function(a){var b=void 0!==a.attr("length"),c=parseInt(a.attr("length")),d=a.val().length;0===a.val().length&&a[0].validity.badInput===!1?a.hasClass("validate")&&(a.removeClass("valid"),a.removeClass("invalid")):a.hasClass("validate")&&(a.is(":valid")&&b&&c>=d||a.is(":valid")&&!b?(a.removeClass("invalid"),a.addClass("valid")):(a.removeClass("valid"),a.addClass("invalid")))};var d="input[type=radio], input[type=checkbox]";a(document).on("keyup.radio",d,function(b){if(9===b.which){a(this).addClass("tabbed");var c=a(this);return void c.one("blur",function(b){a(this).removeClass("tabbed")})}});var e=a(".hiddendiv").first();e.length||(e=a('<div class="hiddendiv common"></div>'),a("body").append(e));var f=".materialize-textarea";a(f).each(function(){var c=a(this);c.val().length&&b(c)}),a("body").on("keyup keydown autoresize",f,function(){b(a(this))}),a(document).on("change",'.file-field input[type="file"]',function(){for(var b=a(this).closest(".file-field"),c=b.find("input.file-path"),d=a(this)[0].files,e=[],f=0;f<d.length;f++)e.push(d[f].name);c.val(e.join(", ")),c.trigger("change")});var g,h="input[type=range]",i=!1;a(h).each(function(){var b=a('<span class="thumb"><span class="value"></span></span>');a(this).after(b)});var j=".range-field";a(document).on("change",h,function(b){var c=a(this).siblings(".thumb");c.find(".value").html(a(this).val())}),a(document).on("input mousedown touchstart",h,function(b){var c=a(this).siblings(".thumb"),d=a(this).outerWidth();c.length<=0&&(c=a('<span class="thumb"><span class="value"></span></span>'),a(this).after(c)),c.find(".value").html(a(this).val()),i=!0,a(this).addClass("active"),c.hasClass("active")||c.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"}),"input"!==b.type&&(g=void 0===b.pageX||null===b.pageX?b.originalEvent.touches[0].pageX-a(this).offset().left:b.pageX-a(this).offset().left,0>g?g=0:g>d&&(g=d),c.addClass("active").css("left",g)),c.find(".value").html(a(this).val())}),a(document).on("mouseup touchend",j,function(){i=!1,a(this).removeClass("active")}),a(document).on("mousemove touchmove",j,function(b){var c,d=a(this).children(".thumb");if(i){d.hasClass("active")||d.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"}),c=void 0===b.pageX||null===b.pageX?b.originalEvent.touches[0].pageX-a(this).offset().left:b.pageX-a(this).offset().left;var e=a(this).outerWidth();0>c?c=0:c>e&&(c=e),d.addClass("active").css("left",c),d.find(".value").html(d.siblings(h).val())}}),a(document).on("mouseout touchleave",j,function(){if(!i){var b=a(this).children(".thumb");b.hasClass("active")&&b.velocity({height:"0",width:"0",top:"10px",marginLeft:"-6px"},{duration:100}),b.removeClass("active")}}),a.fn.autocomplete=function(b){var c={data:{}};return b=a.extend(c,b),this.each(function(){var c=a(this),d=b.data,e=c.closest(".input-field");if(!a.isEmptyObject(d)){var f=a('<ul class="autocomplete-content dropdown-content"></ul>');e.length?e.append(f):c.after(f);var g=function(a,b){var c=b.find("img"),d=b.text().toLowerCase().indexOf(""+a.toLowerCase()),e=d+a.length-1,f=b.text().slice(0,d),g=b.text().slice(d,e+1),h=b.text().slice(e+1);b.html("<span>"+f+"<span class='highlight'>"+g+"</span>"+h+"</span>"),c.length&&b.prepend(c)};c.on("keyup",function(b){if(13===b.which)return void f.find("li").first().click();var e=c.val().toLowerCase();if(f.empty(),""!==e)for(var h in d)if(d.hasOwnProperty(h)&&-1!==h.toLowerCase().indexOf(e)&&h.toLowerCase()!==e){var i=a("<li></li>");d[h]?i.append('<img src="'+d[h]+'" class="right circle"><span>'+h+"</span>"):i.append("<span>"+h+"</span>"),f.append(i),g(e,i)}}),f.on("click","li",function(){c.val(a(this).text().trim()),c.trigger("change"),f.empty()})}})}}),a.fn.material_select=function(b){function c(a,b,c){var e=a.indexOf(b),f=-1===e;return f?a.push(b):a.splice(e,1),c.siblings("ul.dropdown-content").find("li").eq(b).toggleClass("active"),c.find("option").eq(b).prop("selected",f),d(a,c),f}function d(a,b){for(var c="",d=0,e=a.length;e>d;d++){var f=b.find("option").eq(a[d]).text();c+=0===d?f:", "+f}""===c&&(c=b.find("option:disabled").eq(0).text()),b.siblings("input.select-dropdown").val(c)}a(this).each(function(){var d=a(this);if(!d.hasClass("browser-default")){var e=d.attr("multiple")?!0:!1,f=d.data("select-id");if(f&&(d.parent().find("span.caret").remove(),d.parent().find("input").remove(),d.unwrap(),a("ul#select-options-"+f).remove()),"destroy"===b)return void d.data("select-id",null).removeClass("initialized");var g=Materialize.guid();d.data("select-id",g);var h=a('<div class="select-wrapper"></div>');h.addClass(d.attr("class"));var i=a('<ul id="select-options-'+g+'" class="dropdown-content select-dropdown '+(e?"multiple-select-dropdown":"")+'"></ul>'),j=d.children("option, optgroup"),k=[],l=!1,m=d.find("option:selected").html()||d.find("option:first").html()||"",n=function(b,c,d){var e=c.is(":disabled")?"disabled ":"",f="optgroup-option"===d?"optgroup-option ":"",g=c.data("icon"),h=c.attr("class");if(g){var j="";return h&&(j=' class="'+h+'"'),"multiple"===d?i.append(a('<li class="'+e+'"><img alt="" src="'+g+'"'+j+'><span><input type="checkbox"'+e+"/><label></label>"+c.html()+"</span></li>")):i.append(a('<li class="'+e+f+'"><img alt="" src="'+g+'"'+j+"><span>"+c.html()+"</span></li>")),!0}"multiple"===d?i.append(a('<li class="'+e+'"><span><input type="checkbox"'+e+"/><label></label>"+c.html()+"</span></li>")):i.append(a('<li class="'+e+f+'"><span>'+c.html()+"</span></li>"))};j.length&&j.each(function(){if(a(this).is("option"))e?n(d,a(this),"multiple"):n(d,a(this));else if(a(this).is("optgroup")){var b=a(this).children("option");i.append(a('<li class="optgroup"><span>'+a(this).attr("label")+"</span></li>")),b.each(function(){n(d,a(this),"optgroup-option")})}}),i.find("li:not(.optgroup)").each(function(f){a(this).click(function(g){if(!a(this).hasClass("disabled")&&!a(this).hasClass("optgroup")){
var h=!0;e?(a('input[type="checkbox"]',this).prop("checked",function(a,b){return!b}),h=c(k,a(this).index(),d),q.trigger("focus")):(i.find("li").removeClass("active"),a(this).toggleClass("active"),q.val(a(this).text())),r(i,a(this)),d.find("option").eq(f).prop("selected",h),d.trigger("change"),"undefined"!=typeof b&&b()}g.stopPropagation()})}),d.wrap(h);var o=a('<span class="caret">&#9660;</span>');d.is(":disabled")&&o.addClass("disabled");var p=m.replace(/"/g,"&quot;"),q=a('<input type="text" class="select-dropdown" readonly="true" '+(d.is(":disabled")?"disabled":"")+' data-activates="select-options-'+g+'" value="'+p+'"/>');d.before(q),q.before(o),q.after(i),d.is(":disabled")||q.dropdown({hover:!1,closeOnClick:!1}),d.attr("tabindex")&&a(q[0]).attr("tabindex",d.attr("tabindex")),d.addClass("initialized"),q.on({focus:function(){if(a("ul.select-dropdown").not(i[0]).is(":visible")&&a("input.select-dropdown").trigger("close"),!i.is(":visible")){a(this).trigger("open",["focus"]);var b=a(this).val(),c=i.find("li").filter(function(){return a(this).text().toLowerCase()===b.toLowerCase()})[0];r(i,c)}},click:function(a){a.stopPropagation()}}),q.on("blur",function(){e||a(this).trigger("close"),i.find("li.selected").removeClass("selected")}),i.hover(function(){l=!0},function(){l=!1}),a(window).on({click:function(){e&&(l||q.trigger("close"))}}),e&&d.find("option:selected:not(:disabled)").each(function(){var b=a(this).index();c(k,b,d),i.find("li").eq(b).find(":checkbox").prop("checked",!0)});var r=function(b,c){if(c){b.find("li.selected").removeClass("selected");var d=a(c);d.addClass("selected"),i.scrollTo(d)}},s=[],t=function(b){if(9==b.which)return void q.trigger("close");if(40==b.which&&!i.is(":visible"))return void q.trigger("open");if(13!=b.which||i.is(":visible")){b.preventDefault();var c=String.fromCharCode(b.which).toLowerCase(),d=[9,13,27,38,40];if(c&&-1===d.indexOf(b.which)){s.push(c);var f=s.join(""),g=i.find("li").filter(function(){return 0===a(this).text().toLowerCase().indexOf(f)})[0];g&&r(i,g)}if(13==b.which){var h=i.find("li.selected:not(.disabled)")[0];h&&(a(h).trigger("click"),e||q.trigger("close"))}40==b.which&&(g=i.find("li.selected").length?i.find("li.selected").next("li:not(.disabled)")[0]:i.find("li:not(.disabled)")[0],r(i,g)),27==b.which&&q.trigger("close"),38==b.which&&(g=i.find("li.selected").prev("li:not(.disabled)")[0],g&&r(i,g)),setTimeout(function(){s=[]},1e3)}};q.on("keydown",t)}})}}(jQuery),function(a){var b={init:function(b){var c={indicators:!0,height:400,transition:500,interval:6e3};return b=a.extend(c,b),this.each(function(){function c(a,b){a.hasClass("center-align")?a.velocity({opacity:0,translateY:-100},{duration:b,queue:!1}):a.hasClass("right-align")?a.velocity({opacity:0,translateX:100},{duration:b,queue:!1}):a.hasClass("left-align")&&a.velocity({opacity:0,translateX:-100},{duration:b,queue:!1})}function d(a){a>=j.length?a=0:0>a&&(a=j.length-1),k=i.find(".active").index(),k!=a&&(e=j.eq(k),$caption=e.find(".caption"),e.removeClass("active"),e.velocity({opacity:0},{duration:b.transition,queue:!1,easing:"easeOutQuad",complete:function(){j.not(".active").velocity({opacity:0,translateX:0,translateY:0},{duration:0,queue:!1})}}),c($caption,b.transition),b.indicators&&f.eq(k).removeClass("active"),j.eq(a).velocity({opacity:1},{duration:b.transition,queue:!1,easing:"easeOutQuad"}),j.eq(a).find(".caption").velocity({opacity:1,translateX:0,translateY:0},{duration:b.transition,delay:b.transition,queue:!1,easing:"easeOutQuad"}),j.eq(a).addClass("active"),b.indicators&&f.eq(a).addClass("active"))}var e,f,g,h=a(this),i=h.find("ul.slides").first(),j=i.find("> li"),k=i.find(".active").index();-1!=k&&(e=j.eq(k)),h.hasClass("fullscreen")||(b.indicators?h.height(b.height+40):h.height(b.height),i.height(b.height)),j.find(".caption").each(function(){c(a(this),0)}),j.find("img").each(function(){var b="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";a(this).attr("src")!==b&&(a(this).css("background-image","url("+a(this).attr("src")+")"),a(this).attr("src",b))}),b.indicators&&(f=a('<ul class="indicators"></ul>'),j.each(function(c){var e=a('<li class="indicator-item"></li>');e.click(function(){var c=i.parent(),e=c.find(a(this)).index();d(e),clearInterval(g),g=setInterval(function(){k=i.find(".active").index(),j.length==k+1?k=0:k+=1,d(k)},b.transition+b.interval)}),f.append(e)}),h.append(f),f=h.find("ul.indicators").find("li.indicator-item")),e?e.show():(j.first().addClass("active").velocity({opacity:1},{duration:b.transition,queue:!1,easing:"easeOutQuad"}),k=0,e=j.eq(k),b.indicators&&f.eq(k).addClass("active")),e.find("img").each(function(){e.find(".caption").velocity({opacity:1,translateX:0,translateY:0},{duration:b.transition,queue:!1,easing:"easeOutQuad"})}),g=setInterval(function(){k=i.find(".active").index(),d(k+1)},b.transition+b.interval);var l=!1,m=!1,n=!1;h.hammer({prevent_default:!1}).bind("pan",function(a){if("touch"===a.gesture.pointerType){clearInterval(g);var b=a.gesture.direction,c=a.gesture.deltaX,d=a.gesture.velocityX;$curr_slide=i.find(".active"),$curr_slide.velocity({translateX:c},{duration:50,queue:!1,easing:"easeOutQuad"}),4===b&&(c>h.innerWidth()/2||-.65>d)?n=!0:2===b&&(c<-1*h.innerWidth()/2||d>.65)&&(m=!0);var e;m&&(e=$curr_slide.next(),0===e.length&&(e=j.first()),e.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad"})),n&&(e=$curr_slide.prev(),0===e.length&&(e=j.last()),e.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad"}))}}).bind("panend",function(a){"touch"===a.gesture.pointerType&&($curr_slide=i.find(".active"),l=!1,curr_index=i.find(".active").index(),!n&&!m||j.length<=1?$curr_slide.velocity({translateX:0},{duration:300,queue:!1,easing:"easeOutQuad"}):m?(d(curr_index+1),$curr_slide.velocity({translateX:-1*h.innerWidth()},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:!1})}})):n&&(d(curr_index-1),$curr_slide.velocity({translateX:h.innerWidth()},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:!1})}})),m=!1,n=!1,clearInterval(g),g=setInterval(function(){k=i.find(".active").index(),j.length==k+1?k=0:k+=1,d(k)},b.transition+b.interval))}),h.on("sliderPause",function(){clearInterval(g)}),h.on("sliderStart",function(){clearInterval(g),g=setInterval(function(){k=i.find(".active").index(),j.length==k+1?k=0:k+=1,d(k)},b.transition+b.interval)}),h.on("sliderNext",function(){k=i.find(".active").index(),d(k+1)}),h.on("sliderPrev",function(){k=i.find(".active").index(),d(k-1)})})},pause:function(){a(this).trigger("sliderPause")},start:function(){a(this).trigger("sliderStart")},next:function(){a(this).trigger("sliderNext")},prev:function(){a(this).trigger("sliderPrev")}};a.fn.slider=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.tooltip"):b.init.apply(this,arguments)}}(jQuery),function(a){a(document).ready(function(){a(document).on("click.card",".card",function(b){a(this).find("> .card-reveal").length&&(a(b.target).is(a(".card-reveal .card-title"))||a(b.target).is(a(".card-reveal .card-title i"))?a(this).find(".card-reveal").velocity({translateY:0},{duration:225,queue:!1,easing:"easeInOutQuad",complete:function(){a(this).css({display:"none"})}}):(a(b.target).is(a(".card .activator"))||a(b.target).is(a(".card .activator i")))&&(a(b.target).closest(".card").css("overflow","hidden"),a(this).find(".card-reveal").css({display:"block"}).velocity("stop",!1).velocity({translateY:"-100%"},{duration:300,queue:!1,easing:"easeInOutQuad"})))})})}(jQuery),function(a){var b=!1,c={data:[],placeholder:"",secondaryPlaceholder:""};a(document).ready(function(){a(document).on("click",".chip .close",function(b){var c=a(this).closest(".chips");c.attr("data-initialized")||a(this).closest(".chip").remove()})}),a.fn.material_chip=function(d){var e=this;if(this.$el=a(this),this.$document=a(document),this.SELS={CHIPS:".chips",CHIP:".chip",INPUT:"input",DELETE:".material-icons",SELECTED_CHIP:".selected"},"data"===d)return this.$el.data("chips");var f=a.extend({},c,d);this.init=function(){var b=0;e.$el.each(function(){var c=a(this),d=Materialize.guid();f.data&&f.data instanceof Array||(f.data=[]),c.data("chips",f.data),c.attr("data-index",b),c.attr("data-initialized",!0),c.hasClass(e.SELS.CHIPS)||c.addClass("chips"),e.chips(c,d),b++})},this.handleEvents=function(){var b=e.SELS;e.$document.off("click.chips-focus",b.CHIPS).on("click.chips-focus",b.CHIPS,function(c){a(c.target).find(b.INPUT).focus()}),e.$document.off("click.chips-select",b.CHIP).on("click.chips-select",b.CHIP,function(c){a(b.CHIP).removeClass("selected"),a(this).toggleClass("selected")}),e.$document.off("keydown.chips").on("keydown.chips",function(c){if(!a(c.target).is("input, textarea")){var d,f=e.$document.find(b.CHIP+b.SELECTED_CHIP),g=f.closest(b.CHIPS),h=f.siblings(b.CHIP).length;if(f.length)if(8===c.which||46===c.which){c.preventDefault(),d=f.index(),e.deleteChip(d,g);var i=null;h>d+1?i=d:(d===h||d+1===h)&&(i=h-1),0>i&&(i=null),null!==i&&e.selectChip(i,g),h||g.find("input").focus()}else if(37===c.which){if(d=f.index()-1,0>d)return;a(b.CHIP).removeClass("selected"),e.selectChip(d,g)}else if(39===c.which){if(d=f.index()+1,a(b.CHIP).removeClass("selected"),d>h)return void g.find("input").focus();e.selectChip(d,g)}}}),e.$document.off("focusin.chips",b.CHIPS+" "+b.INPUT).on("focusin.chips",b.CHIPS+" "+b.INPUT,function(c){var d=a(c.target).closest(b.CHIPS);d.addClass("focus"),d.siblings("label, .prefix").addClass("active"),a(b.CHIP).removeClass("selected")}),e.$document.off("focusout.chips",b.CHIPS+" "+b.INPUT).on("focusout.chips",b.CHIPS+" "+b.INPUT,function(c){var d=a(c.target).closest(b.CHIPS);d.removeClass("focus"),d.data("chips").length||d.siblings("label").removeClass("active"),d.siblings(".prefix").removeClass("active")}),e.$document.off("keydown.chips-add",b.CHIPS+" "+b.INPUT).on("keydown.chips-add",b.CHIPS+" "+b.INPUT,function(c){var d=a(c.target),f=d.closest(b.CHIPS),g=f.children(b.CHIP).length;return 13===c.which?(c.preventDefault(),e.addChip({tag:d.val()},f),void d.val("")):8!==c.keyCode&&37!==c.keyCode||""!==d.val()||!g?void 0:(e.selectChip(g-1,f),void d.blur())}),e.$document.off("click.chips-delete",b.CHIPS+" "+b.DELETE).on("click.chips-delete",b.CHIPS+" "+b.DELETE,function(c){var d=a(c.target),f=d.closest(b.CHIPS),g=d.closest(b.CHIP);c.stopPropagation(),e.deleteChip(g.index(),f),f.find("input").focus()})},this.chips=function(a,b){var c="";a.data("chips").forEach(function(a){c+=e.renderChip(a)}),c+='<input id="'+b+'" class="input" placeholder="">',a.html(c),e.setPlaceholder(a);var d=a.next("label");d.length&&(d.attr("for",b),a.data("chips").length&&d.addClass("active"))},this.renderChip=function(a){if(a.tag){var b='<div class="chip">'+a.tag;return a.image&&(b+=' <img src="'+a.image+'"> '),b+='<i class="material-icons close">close</i>',b+="</div>"}},this.setPlaceholder=function(a){a.data("chips").length&&f.placeholder?a.find("input").prop("placeholder",f.placeholder):!a.data("chips").length&&f.secondaryPlaceholder&&a.find("input").prop("placeholder",f.secondaryPlaceholder)},this.isValid=function(a,b){for(var c=a.data("chips"),d=!1,e=0;e<c.length;e++)if(c[e].tag===b.tag)return void(d=!0);return""!==b.tag&&!d},this.addChip=function(b,c){if(e.isValid(c,b)){for(var d=e.renderChip(b),f=[],g=c.data("chips"),h=0;h<g.length;h++)f.push(g[h]);f.push(b),c.data("chips",f),a(d).insertBefore(c.find("input")),c.trigger("chip.add",b),e.setPlaceholder(c)}},this.deleteChip=function(a,b){var c=b.data("chips")[a];b.find(".chip").eq(a).remove();for(var d=[],f=b.data("chips"),g=0;g<f.length;g++)g!==a&&d.push(f[g]);b.data("chips",d),b.trigger("chip.delete",c),e.setPlaceholder(b)},this.selectChip=function(a,b){var c=b.find(".chip").eq(a);c&&!1===c.hasClass("selected")&&(c.addClass("selected"),b.trigger("chip.select",b.data("chips")[a]))},this.getChipsElement=function(a,b){return b.eq(a)},this.init(),b||(this.handleEvents(),b=!0)}}(jQuery),function(a){a.fn.pushpin=function(b){var c={top:0,bottom:1/0,offset:0};return"remove"===b?(this.each(function(){(id=a(this).data("pushpin-id"))&&(a(window).off("scroll."+id),a(this).removeData("pushpin-id").removeClass("pin-top pinned pin-bottom").removeAttr("style"))}),!1):(b=a.extend(c,b),$index=0,this.each(function(){function c(a){a.removeClass("pin-top"),a.removeClass("pinned"),a.removeClass("pin-bottom")}function d(d,e){d.each(function(){b.top<=e&&b.bottom>=e&&!a(this).hasClass("pinned")&&(c(a(this)),a(this).css("top",b.offset),a(this).addClass("pinned")),e<b.top&&!a(this).hasClass("pin-top")&&(c(a(this)),a(this).css("top",0),a(this).addClass("pin-top")),e>b.bottom&&!a(this).hasClass("pin-bottom")&&(c(a(this)),a(this).addClass("pin-bottom"),a(this).css("top",b.bottom-g))})}var e=Materialize.guid(),f=a(this),g=a(this).offset().top;a(this).data("pushpin-id",e),d(f,a(window).scrollTop()),a(window).on("scroll."+e,function(){var c=a(window).scrollTop()+b.offset;d(f,c)})}))}}(jQuery),function(a){a(document).ready(function(){a.fn.reverse=[].reverse,a(document).on("mouseenter.fixedActionBtn",".fixed-action-btn:not(.click-to-toggle):not(.toolbar)",function(c){var d=a(this);b(d)}),a(document).on("mouseleave.fixedActionBtn",".fixed-action-btn:not(.click-to-toggle):not(.toolbar)",function(b){var d=a(this);c(d)}),a(document).on("click.fabClickToggle",".fixed-action-btn.click-to-toggle > a",function(d){var e=a(this),f=e.parent();f.hasClass("active")?c(f):b(f)}),a(document).on("click.fabToolbar",".fixed-action-btn.toolbar > a",function(b){var c=a(this),e=c.parent();d(e)})}),a.fn.extend({openFAB:function(){b(a(this))},closeFAB:function(){c(a(this))},openToolbar:function(){d(a(this))},closeToolbar:function(){e(a(this))}});var b=function(b){var c=b;if(c.hasClass("active")===!1){var d,e,f=c.hasClass("horizontal");f===!0?e=40:d=40,c.addClass("active"),c.find("ul .btn-floating").velocity({scaleY:".4",scaleX:".4",translateY:d+"px",translateX:e+"px"},{duration:0});var g=0;c.find("ul .btn-floating").reverse().each(function(){a(this).velocity({opacity:"1",scaleX:"1",scaleY:"1",translateY:"0",translateX:"0"},{duration:80,delay:g}),g+=40})}},c=function(a){var b,c,d=a,e=d.hasClass("horizontal");e===!0?c=40:b=40,d.removeClass("active");d.find("ul .btn-floating").velocity("stop",!0),d.find("ul .btn-floating").velocity({opacity:"0",scaleX:".4",scaleY:".4",translateY:b+"px",translateX:c+"px"},{duration:80})},d=function(b){if("true"!==b.attr("data-open")){var c,d,f,g=window.innerWidth,h=window.innerHeight,i=b[0].getBoundingClientRect(),j=b.find("> a").first(),k=b.find("> ul").first(),l=a('<div class="fab-backdrop"></div>'),m=j.css("background-color");j.append(l),c=i.left-g/2+i.width/2,d=h-i.bottom,f=g/l.width(),b.attr("data-origin-bottom",i.bottom),b.attr("data-origin-left",i.left),b.attr("data-origin-width",i.width),b.addClass("active"),b.attr("data-open",!0),b.css({"text-align":"center",width:"100%",bottom:0,left:0,transform:"translateX("+c+"px)",transition:"none"}),j.css({transform:"translateY("+-d+"px)",transition:"none"}),l.css({"background-color":m}),setTimeout(function(){b.css({transform:"",transition:"transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s"}),j.css({overflow:"visible",transform:"",transition:"transform .2s"}),setTimeout(function(){b.css({overflow:"hidden","background-color":m}),l.css({transform:"scale("+f+")",transition:"transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)"}),k.find("> li > a").css({opacity:1}),a(window).on("scroll.fabToolbarClose",function(){e(b),a(window).off("scroll.fabToolbarClose"),a(document).off("click.fabToolbarClose")}),a(document).on("click.fabToolbarClose",function(c){a(c.target).closest(k).length||(e(b),a(window).off("scroll.fabToolbarClose"),a(document).off("click.fabToolbarClose"))})},100)},0)}},e=function(a){if("true"===a.attr("data-open")){var b,c,d,e=window.innerWidth,f=window.innerHeight,g=a.attr("data-origin-width"),h=a.attr("data-origin-bottom"),i=a.attr("data-origin-left"),j=a.find("> .btn-floating").first(),k=a.find("> ul").first(),l=a.find(".fab-backdrop"),m=j.css("background-color");b=i-e/2+g/2,c=f-h,d=e/l.width(),a.removeClass("active"),a.attr("data-open",!1),a.css({"background-color":"transparent",transition:"none"}),j.css({transition:"none"}),l.css({transform:"scale(0)","background-color":m}),k.find("> li > a").css({opacity:""}),setTimeout(function(){l.remove(),a.css({"text-align":"",width:"",bottom:"",left:"",overflow:"","background-color":"",transform:"translate3d("+-b+"px,0,0)"}),j.css({overflow:"",transform:"translate3d(0,"+c+"px,0)"}),setTimeout(function(){a.css({transform:"translate3d(0,0,0)",transition:"transform .2s"}),j.css({transform:"translate3d(0,0,0)",transition:"transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)"})},20)},200)}}}(jQuery),function(a){Materialize.fadeInImage=function(b){var c;if("string"==typeof b)c=a(b);else{if("object"!=typeof b)return;c=b}c.css({opacity:0}),a(c).velocity({opacity:1},{duration:650,queue:!1,easing:"easeOutSine"}),a(c).velocity({opacity:1},{duration:1300,queue:!1,easing:"swing",step:function(b,c){c.start=100;var d=b/100,e=150-(100-b)/1.75;100>e&&(e=100),b>=0&&a(this).css({"-webkit-filter":"grayscale("+d+")brightness("+e+"%)",filter:"grayscale("+d+")brightness("+e+"%)"})}})},Materialize.showStaggeredList=function(b){var c;if("string"==typeof b)c=a(b);else{if("object"!=typeof b)return;c=b}var d=0;c.find("li").velocity({translateX:"-100px"},{duration:0}),c.find("li").each(function(){a(this).velocity({opacity:"1",translateX:"0"},{duration:800,delay:d,easing:[60,10]}),d+=120})},a(document).ready(function(){var b=!1,c=!1;a(".dismissable").each(function(){a(this).hammer({prevent_default:!1}).bind("pan",function(d){if("touch"===d.gesture.pointerType){var e=a(this),f=d.gesture.direction,g=d.gesture.deltaX,h=d.gesture.velocityX;e.velocity({translateX:g},{duration:50,queue:!1,easing:"easeOutQuad"}),4===f&&(g>e.innerWidth()/2||-.75>h)&&(b=!0),2===f&&(g<-1*e.innerWidth()/2||h>.75)&&(c=!0)}}).bind("panend",function(d){if(Math.abs(d.gesture.deltaX)<a(this).innerWidth()/2&&(c=!1,b=!1),"touch"===d.gesture.pointerType){var e=a(this);if(b||c){var f;f=b?e.innerWidth():-1*e.innerWidth(),e.velocity({translateX:f},{duration:100,queue:!1,easing:"easeOutQuad",complete:function(){e.css("border","none"),e.velocity({height:0,padding:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){e.remove()}})}})}else e.velocity({translateX:0},{duration:100,queue:!1,easing:"easeOutQuad"});b=!1,c=!1}})})})}(jQuery),function(a){Materialize.scrollFire=function(a){var b=!1;window.addEventListener("scroll",function(){b=!0}),setInterval(function(){if(b){b=!1;for(var c=window.pageYOffset+window.innerHeight,d=0;d<a.length;d++){var e=a[d],f=e.selector,g=e.offset,h=e.callback,i=document.querySelector(f);if(null!==i){var j=i.getBoundingClientRect().top+window.pageYOffset;if(c>j+g&&e.done!==!0){if("function"==typeof h)h.call(this,i);else if("string"==typeof h){var k=new Function(h);k(i)}e.done=!0}}}}},100)}}(jQuery),function(a){"function"==typeof define&&define.amd?define("picker",["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):this.Picker=a(jQuery)}(function(a){function b(f,g,i,l){function m(){return b._.node("div",b._.node("div",b._.node("div",b._.node("div",y.component.nodes(t.open),v.box),v.wrap),v.frame),v.holder)}function n(){w.data(g,y).addClass(v.input).attr("tabindex",-1).val(w.data("value")?y.get("select",u.format):f.value),u.editable||w.on("focus."+t.id+" click."+t.id,function(a){a.preventDefault(),y.$root.eq(0).focus()}).on("keydown."+t.id,q),e(f,{haspopup:!0,expanded:!1,readonly:!1,owns:f.id+"_root"})}function o(){y.$root.on({keydown:q,focusin:function(a){y.$root.removeClass(v.focused),a.stopPropagation()},"mousedown click":function(b){var c=b.target;c!=y.$root.children()[0]&&(b.stopPropagation(),"mousedown"!=b.type||a(c).is("input, select, textarea, button, option")||(b.preventDefault(),y.$root.eq(0).focus()))}}).on({focus:function(){w.addClass(v.target)},blur:function(){w.removeClass(v.target)}}).on("focus.toOpen",r).on("click","[data-pick], [data-nav], [data-clear], [data-close]",function(){var b=a(this),c=b.data(),d=b.hasClass(v.navDisabled)||b.hasClass(v.disabled),e=h();e=e&&(e.type||e.href),(d||e&&!a.contains(y.$root[0],e))&&y.$root.eq(0).focus(),!d&&c.nav?y.set("highlight",y.component.item.highlight,{nav:c.nav}):!d&&"pick"in c?y.set("select",c.pick):c.clear?y.clear().close(!0):c.close&&y.close(!0)}),e(y.$root[0],"hidden",!0)}function p(){var b;u.hiddenName===!0?(b=f.name,f.name=""):(b=["string"==typeof u.hiddenPrefix?u.hiddenPrefix:"","string"==typeof u.hiddenSuffix?u.hiddenSuffix:"_submit"],b=b[0]+f.name+b[1]),y._hidden=a('<input type=hidden name="'+b+'"'+(w.data("value")||f.value?' value="'+y.get("select",u.formatSubmit)+'"':"")+">")[0],w.on("change."+t.id,function(){y._hidden.value=f.value?y.get("select",u.formatSubmit):""}),u.container?a(u.container).append(y._hidden):w.after(y._hidden)}function q(a){var b=a.keyCode,c=/^(8|46)$/.test(b);return 27==b?(y.close(),!1):void((32==b||c||!t.open&&y.component.key[b])&&(a.preventDefault(),a.stopPropagation(),c?y.clear().close():y.open()))}function r(a){a.stopPropagation(),"focus"==a.type&&y.$root.addClass(v.focused),y.open()}if(!f)return b;var s=!1,t={id:f.id||"P"+Math.abs(~~(Math.random()*new Date))},u=i?a.extend(!0,{},i.defaults,l):l||{},v=a.extend({},b.klasses(),u.klass),w=a(f),x=function(){return this.start()},y=x.prototype={constructor:x,$node:w,start:function(){return t&&t.start?y:(t.methods={},t.start=!0,t.open=!1,t.type=f.type,f.autofocus=f==h(),f.readOnly=!u.editable,f.id=f.id||t.id,"text"!=f.type&&(f.type="text"),y.component=new i(y,u),y.$root=a(b._.node("div",m(),v.picker,'id="'+f.id+'_root" tabindex="0"')),o(),u.formatSubmit&&p(),n(),u.container?a(u.container).append(y.$root):w.after(y.$root),y.on({start:y.component.onStart,render:y.component.onRender,stop:y.component.onStop,open:y.component.onOpen,close:y.component.onClose,set:y.component.onSet}).on({start:u.onStart,render:u.onRender,stop:u.onStop,open:u.onOpen,close:u.onClose,set:u.onSet}),s=c(y.$root.children()[0]),f.autofocus&&y.open(),y.trigger("start").trigger("render"))},render:function(a){return a?y.$root.html(m()):y.$root.find("."+v.box).html(y.component.nodes(t.open)),y.trigger("render")},stop:function(){return t.start?(y.close(),y._hidden&&y._hidden.parentNode.removeChild(y._hidden),y.$root.remove(),w.removeClass(v.input).removeData(g),setTimeout(function(){w.off("."+t.id)},0),f.type=t.type,f.readOnly=!1,y.trigger("stop"),t.methods={},t.start=!1,y):y},open:function(c){return t.open?y:(w.addClass(v.active),e(f,"expanded",!0),setTimeout(function(){y.$root.addClass(v.opened),e(y.$root[0],"hidden",!1)},0),c!==!1&&(t.open=!0,s&&k.css("overflow","hidden").css("padding-right","+="+d()),y.$root.eq(0).focus(),j.on("click."+t.id+" focusin."+t.id,function(a){var b=a.target;b!=f&&b!=document&&3!=a.which&&y.close(b===y.$root.children()[0])}).on("keydown."+t.id,function(c){var d=c.keyCode,e=y.component.key[d],f=c.target;27==d?y.close(!0):f!=y.$root[0]||!e&&13!=d?a.contains(y.$root[0],f)&&13==d&&(c.preventDefault(),f.click()):(c.preventDefault(),e?b._.trigger(y.component.key.go,y,[b._.trigger(e)]):y.$root.find("."+v.highlighted).hasClass(v.disabled)||y.set("select",y.component.item.highlight).close())})),y.trigger("open"))},close:function(a){return a&&(y.$root.off("focus.toOpen").eq(0).focus(),setTimeout(function(){y.$root.on("focus.toOpen",r)},0)),w.removeClass(v.active),e(f,"expanded",!1),setTimeout(function(){y.$root.removeClass(v.opened+" "+v.focused),e(y.$root[0],"hidden",!0)},0),t.open?(t.open=!1,s&&k.css("overflow","").css("padding-right","-="+d()),j.off("."+t.id),y.trigger("close")):y},clear:function(a){return y.set("clear",null,a)},set:function(b,c,d){var e,f,g=a.isPlainObject(b),h=g?b:{};if(d=g&&a.isPlainObject(c)?c:d||{},b){g||(h[b]=c);for(e in h)f=h[e],e in y.component.item&&(void 0===f&&(f=null),y.component.set(e,f,d)),("select"==e||"clear"==e)&&w.val("clear"==e?"":y.get(e,u.format)).trigger("change");y.render()}return d.muted?y:y.trigger("set",h)},get:function(a,c){if(a=a||"value",null!=t[a])return t[a];if("valueSubmit"==a){if(y._hidden)return y._hidden.value;a="value"}if("value"==a)return f.value;if(a in y.component.item){if("string"==typeof c){var d=y.component.get(a);return d?b._.trigger(y.component.formats.toString,y.component,[c,d]):""}return y.component.get(a)}},on:function(b,c,d){var e,f,g=a.isPlainObject(b),h=g?b:{};if(b){g||(h[b]=c);for(e in h)f=h[e],d&&(e="_"+e),t.methods[e]=t.methods[e]||[],t.methods[e].push(f)}return y},off:function(){var a,b,c=arguments;for(a=0,namesCount=c.length;a<namesCount;a+=1)b=c[a],b in t.methods&&delete t.methods[b];return y},trigger:function(a,c){var d=function(a){var d=t.methods[a];d&&d.map(function(a){b._.trigger(a,y,[c])})};return d("_"+a),d(a),y}};return new x}function c(a){var b,c="position";return a.currentStyle?b=a.currentStyle[c]:window.getComputedStyle&&(b=getComputedStyle(a)[c]),"fixed"==b}function d(){if(k.height()<=i.height())return 0;var b=a('<div style="visibility:hidden;width:100px" />').appendTo("body"),c=b[0].offsetWidth;b.css("overflow","scroll");var d=a('<div style="width:100%" />').appendTo(b),e=d[0].offsetWidth;return b.remove(),c-e}function e(b,c,d){if(a.isPlainObject(c))for(var e in c)f(b,e,c[e]);else f(b,c,d)}function f(a,b,c){a.setAttribute(("role"==b?"":"aria-")+b,c)}function g(b,c){a.isPlainObject(b)||(b={attribute:c}),c="";for(var d in b){var e=("role"==d?"":"aria-")+d,f=b[d];c+=null==f?"":e+'="'+b[d]+'"'}return c}function h(){try{return document.activeElement}catch(a){}}var i=a(window),j=a(document),k=a(document.documentElement);return b.klasses=function(a){return a=a||"picker",{picker:a,opened:a+"--opened",focused:a+"--focused",input:a+"__input",active:a+"__input--active",target:a+"__input--target",holder:a+"__holder",frame:a+"__frame",wrap:a+"__wrap",box:a+"__box"}},b._={group:function(a){for(var c,d="",e=b._.trigger(a.min,a);e<=b._.trigger(a.max,a,[e]);e+=a.i)c=b._.trigger(a.item,a,[e]),d+=b._.node(a.node,c[0],c[1],c[2]);return d},node:function(b,c,d,e){return c?(c=a.isArray(c)?c.join(""):c,d=d?' class="'+d+'"':"",e=e?" "+e:"","<"+b+d+e+">"+c+"</"+b+">"):""},lead:function(a){return(10>a?"0":"")+a},trigger:function(a,b,c){return"function"==typeof a?a.apply(b,c||[]):a},digits:function(a){return/\d/.test(a[1])?2:1},isDate:function(a){return{}.toString.call(a).indexOf("Date")>-1&&this.isInteger(a.getDate())},isInteger:function(a){return{}.toString.call(a).indexOf("Number")>-1&&a%1===0},ariaAttr:g},b.extend=function(c,d){a.fn[c]=function(e,f){var g=this.data(c);return"picker"==e?g:g&&"string"==typeof e?b._.trigger(g[e],g,[f]):this.each(function(){var f=a(this);f.data(c)||new b(this,c,d,e)})},a.fn[c].defaults=d.defaults},b}),function(a){"function"==typeof define&&define.amd?define(["picker","jquery"],a):"object"==typeof exports?module.exports=a(require("./picker.js"),require("jquery")):a(Picker,jQuery)}(function(a,b){function c(a,b){var c=this,d=a.$node[0],e=d.value,f=a.$node.data("value"),g=f||e,h=f?b.formatSubmit:b.format,i=function(){return d.currentStyle?"rtl"==d.currentStyle.direction:"rtl"==getComputedStyle(a.$root[0]).direction};c.settings=b,c.$node=a.$node,c.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},c.item={},c.item.clear=null,c.item.disable=(b.disable||[]).slice(0),c.item.enable=-function(a){return a[0]===!0?a.shift():-1}(c.item.disable),c.set("min",b.min).set("max",b.max).set("now"),g?c.set("select",g,{format:h}):c.set("select",null).set("highlight",c.item.now),c.key={40:7,38:-7,39:function(){return i()?-1:1},37:function(){return i()?1:-1},go:function(a){var b=c.item.highlight,d=new Date(b.year,b.month,b.date+a);c.set("highlight",d,{interval:a}),this.render()}},a.on("render",function(){a.$root.find("."+b.klass.selectMonth).on("change",function(){var c=this.value;c&&(a.set("highlight",[a.get("view").year,c,a.get("highlight").date]),a.$root.find("."+b.klass.selectMonth).trigger("focus"))}),a.$root.find("."+b.klass.selectYear).on("change",function(){var c=this.value;c&&(a.set("highlight",[c,a.get("view").month,a.get("highlight").date]),a.$root.find("."+b.klass.selectYear).trigger("focus"))})},1).on("open",function(){var d="";c.disabled(c.get("now"))&&(d=":not(."+b.klass.buttonToday+")"),a.$root.find("button"+d+", select").attr("disabled",!1)},1).on("close",function(){a.$root.find("button, select").attr("disabled",!0)},1)}var d=7,e=6,f=a._;c.prototype.set=function(a,b,c){var d=this,e=d.item;return null===b?("clear"==a&&(a="select"),e[a]=b,d):(e["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",e.select,c):"highlight"==a?d.set("view",e.highlight,c):a.match(/^(flip|min|max|disable|enable)$/)&&(e.select&&d.disabled(e.select)&&d.set("select",e.select,c),e.highlight&&d.disabled(e.highlight)&&d.set("highlight",e.highlight,c)),d)},c.prototype.get=function(a){return this.item[a]},c.prototype.create=function(a,c,d){var e,g=this;return c=void 0===c?a:c,c==-(1/0)||c==1/0?e=c:b.isPlainObject(c)&&f.isInteger(c.pick)?c=c.obj:b.isArray(c)?(c=new Date(c[0],c[1],c[2]),c=f.isDate(c)?c:g.create().obj):c=f.isInteger(c)||f.isDate(c)?g.normalize(new Date(c),d):g.now(a,c,d),{year:e||c.getFullYear(),month:e||c.getMonth(),date:e||c.getDate(),day:e||c.getDay(),obj:e||c,pick:e||c.getTime()}},c.prototype.createRange=function(a,c){var d=this,e=function(a){return a===!0||b.isArray(a)||f.isDate(a)?d.create(a):a};return f.isInteger(a)||(a=e(a)),f.isInteger(c)||(c=e(c)),f.isInteger(a)&&b.isPlainObject(c)?a=[c.year,c.month,c.date+a]:f.isInteger(c)&&b.isPlainObject(a)&&(c=[a.year,a.month,a.date+c]),{from:e(a),to:e(c)}},c.prototype.withinRange=function(a,b){return a=this.createRange(a.from,a.to),b.pick>=a.from.pick&&b.pick<=a.to.pick},c.prototype.overlapRanges=function(a,b){var c=this;return a=c.createRange(a.from,a.to),b=c.createRange(b.from,b.to),c.withinRange(a,b.from)||c.withinRange(a,b.to)||c.withinRange(b,a.from)||c.withinRange(b,a.to)},c.prototype.now=function(a,b,c){return b=new Date,c&&c.rel&&b.setDate(b.getDate()+c.rel),this.normalize(b,c)},c.prototype.navigate=function(a,c,d){var e,f,g,h,i=b.isArray(c),j=b.isPlainObject(c),k=this.item.view;if(i||j){for(j?(f=c.year,g=c.month,h=c.date):(f=+c[0],g=+c[1],h=+c[2]),d&&d.nav&&k&&k.month!==g&&(f=k.year,g=k.month),e=new Date(f,g+(d&&d.nav?d.nav:0),1),f=e.getFullYear(),g=e.getMonth();new Date(f,g,h).getMonth()!==g;)h-=1;c=[f,g,h]}return c},c.prototype.normalize=function(a){return a.setHours(0,0,0,0),a},c.prototype.measure=function(a,b){var c=this;return b?"string"==typeof b?b=c.parse(a,b):f.isInteger(b)&&(b=c.now(a,b,{rel:b})):b="min"==a?-(1/0):1/0,b},c.prototype.viewset=function(a,b){return this.create([b.year,b.month,1])},c.prototype.validate=function(a,c,d){var e,g,h,i,j=this,k=c,l=d&&d.interval?d.interval:1,m=-1===j.item.enable,n=j.item.min,o=j.item.max,p=m&&j.item.disable.filter(function(a){if(b.isArray(a)){var d=j.create(a).pick;d<c.pick?e=!0:d>c.pick&&(g=!0)}return f.isInteger(a)}).length;if((!d||!d.nav)&&(!m&&j.disabled(c)||m&&j.disabled(c)&&(p||e||g)||!m&&(c.pick<=n.pick||c.pick>=o.pick)))for(m&&!p&&(!g&&l>0||!e&&0>l)&&(l*=-1);j.disabled(c)&&(Math.abs(l)>1&&(c.month<k.month||c.month>k.month)&&(c=k,l=l>0?1:-1),c.pick<=n.pick?(h=!0,l=1,c=j.create([n.year,n.month,n.date+(c.pick===n.pick?0:-1)])):c.pick>=o.pick&&(i=!0,l=-1,c=j.create([o.year,o.month,o.date+(c.pick===o.pick?0:1)])),!h||!i);)c=j.create([c.year,c.month,c.date+l]);return c},c.prototype.disabled=function(a){var c=this,d=c.item.disable.filter(function(d){return f.isInteger(d)?a.day===(c.settings.firstDay?d:d-1)%7:b.isArray(d)||f.isDate(d)?a.pick===c.create(d).pick:b.isPlainObject(d)?c.withinRange(d,a):void 0;
});return d=d.length&&!d.filter(function(a){return b.isArray(a)&&"inverted"==a[3]||b.isPlainObject(a)&&a.inverted}).length,-1===c.item.enable?!d:d||a.pick<c.item.min.pick||a.pick>c.item.max.pick},c.prototype.parse=function(a,b,c){var d=this,e={};return b&&"string"==typeof b?(c&&c.format||(c=c||{},c.format=d.settings.format),d.formats.toArray(c.format).map(function(a){var c=d.formats[a],g=c?f.trigger(c,d,[b,e]):a.replace(/^!/,"").length;c&&(e[a]=b.substr(0,g)),b=b.substr(g)}),[e.yyyy||e.yy,+(e.mm||e.m)-1,e.dd||e.d]):b},c.prototype.formats=function(){function a(a,b,c){var d=a.match(/\w+/)[0];return c.mm||c.m||(c.m=b.indexOf(d)+1),d.length}function b(a){return a.match(/\w+/)[0].length}return{d:function(a,b){return a?f.digits(a):b.date},dd:function(a,b){return a?2:f.lead(b.date)},ddd:function(a,c){return a?b(a):this.settings.weekdaysShort[c.day]},dddd:function(a,c){return a?b(a):this.settings.weekdaysFull[c.day]},m:function(a,b){return a?f.digits(a):b.month+1},mm:function(a,b){return a?2:f.lead(b.month+1)},mmm:function(b,c){var d=this.settings.monthsShort;return b?a(b,d,c):d[c.month]},mmmm:function(b,c){var d=this.settings.monthsFull;return b?a(b,d,c):d[c.month]},yy:function(a,b){return a?2:(""+b.year).slice(2)},yyyy:function(a,b){return a?4:b.year},toArray:function(a){return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(a,b){var c=this;return c.formats.toArray(a).map(function(a){return f.trigger(c.formats[a],c,[0,b])||a.replace(/^!/,"")}).join("")}}}(),c.prototype.isDateExact=function(a,c){var d=this;return f.isInteger(a)&&f.isInteger(c)||"boolean"==typeof a&&"boolean"==typeof c?a===c:(f.isDate(a)||b.isArray(a))&&(f.isDate(c)||b.isArray(c))?d.create(a).pick===d.create(c).pick:b.isPlainObject(a)&&b.isPlainObject(c)?d.isDateExact(a.from,c.from)&&d.isDateExact(a.to,c.to):!1},c.prototype.isDateOverlap=function(a,c){var d=this,e=d.settings.firstDay?1:0;return f.isInteger(a)&&(f.isDate(c)||b.isArray(c))?(a=a%7+e,a===d.create(c).day+1):f.isInteger(c)&&(f.isDate(a)||b.isArray(a))?(c=c%7+e,c===d.create(a).day+1):b.isPlainObject(a)&&b.isPlainObject(c)?d.overlapRanges(a,c):!1},c.prototype.flipEnable=function(a){var b=this.item;b.enable=a||(-1==b.enable?1:-1)},c.prototype.deactivate=function(a,c){var d=this,e=d.item.disable.slice(0);return"flip"==c?d.flipEnable():c===!1?(d.flipEnable(1),e=[]):c===!0?(d.flipEnable(-1),e=[]):c.map(function(a){for(var c,g=0;g<e.length;g+=1)if(d.isDateExact(a,e[g])){c=!0;break}c||(f.isInteger(a)||f.isDate(a)||b.isArray(a)||b.isPlainObject(a)&&a.from&&a.to)&&e.push(a)}),e},c.prototype.activate=function(a,c){var d=this,e=d.item.disable,g=e.length;return"flip"==c?d.flipEnable():c===!0?(d.flipEnable(1),e=[]):c===!1?(d.flipEnable(-1),e=[]):c.map(function(a){var c,h,i,j;for(i=0;g>i;i+=1){if(h=e[i],d.isDateExact(h,a)){c=e[i]=null,j=!0;break}if(d.isDateOverlap(h,a)){b.isPlainObject(a)?(a.inverted=!0,c=a):b.isArray(a)?(c=a,c[3]||c.push("inverted")):f.isDate(a)&&(c=[a.getFullYear(),a.getMonth(),a.getDate(),"inverted"]);break}}if(c)for(i=0;g>i;i+=1)if(d.isDateExact(e[i],a)){e[i]=null;break}if(j)for(i=0;g>i;i+=1)if(d.isDateOverlap(e[i],a)){e[i]=null;break}c&&e.push(c)}),e.filter(function(a){return null!=a})},c.prototype.nodes=function(a){var b=this,c=b.settings,g=b.item,h=g.now,i=g.select,j=g.highlight,k=g.view,l=g.disable,m=g.min,n=g.max,o=function(a,b){return c.firstDay&&(a.push(a.shift()),b.push(b.shift())),f.node("thead",f.node("tr",f.group({min:0,max:d-1,i:1,node:"th",item:function(d){return[a[d],c.klass.weekdays,'scope=col title="'+b[d]+'"']}})))}((c.showWeekdaysFull?c.weekdaysFull:c.weekdaysLetter).slice(0),c.weekdaysFull.slice(0)),p=function(a){return f.node("div"," ",c.klass["nav"+(a?"Next":"Prev")]+(a&&k.year>=n.year&&k.month>=n.month||!a&&k.year<=m.year&&k.month<=m.month?" "+c.klass.navDisabled:""),"data-nav="+(a||-1)+" "+f.ariaAttr({role:"button",controls:b.$node[0].id+"_table"})+' title="'+(a?c.labelMonthNext:c.labelMonthPrev)+'"')},q=function(d){var e=c.showMonthsShort?c.monthsShort:c.monthsFull;return"short_months"==d&&(e=c.monthsShort),c.selectMonths&&void 0==d?f.node("select",f.group({min:0,max:11,i:1,node:"option",item:function(a){return[e[a],0,"value="+a+(k.month==a?" selected":"")+(k.year==m.year&&a<m.month||k.year==n.year&&a>n.month?" disabled":"")]}}),c.klass.selectMonth+" browser-default",(a?"":"disabled")+" "+f.ariaAttr({controls:b.$node[0].id+"_table"})+' title="'+c.labelMonthSelect+'"'):"short_months"==d?null!=i?f.node("div",e[i.month]):f.node("div",e[k.month]):f.node("div",e[k.month],c.klass.month)},r=function(d){var e=k.year,g=c.selectYears===!0?5:~~(c.selectYears/2);if(g){var h=m.year,i=n.year,j=e-g,l=e+g;if(h>j&&(l+=h-j,j=h),l>i){var o=j-h,p=l-i;j-=o>p?p:o,l=i}if(c.selectYears&&void 0==d)return f.node("select",f.group({min:j,max:l,i:1,node:"option",item:function(a){return[a,0,"value="+a+(e==a?" selected":"")]}}),c.klass.selectYear+" browser-default",(a?"":"disabled")+" "+f.ariaAttr({controls:b.$node[0].id+"_table"})+' title="'+c.labelYearSelect+'"')}return"raw"==d?f.node("div",e):f.node("div",e,c.klass.year)};return createDayLabel=function(){return null!=i?f.node("div",i.date):f.node("div",h.date)},createWeekdayLabel=function(){var a;a=null!=i?i.day:h.day;var b=c.weekdaysFull[a];return b},f.node("div",f.node("div",createWeekdayLabel(),"picker__weekday-display")+f.node("div",q("short_months"),c.klass.month_display)+f.node("div",createDayLabel(),c.klass.day_display)+f.node("div",r("raw"),c.klass.year_display),c.klass.date_display)+f.node("div",f.node("div",(c.selectYears?q()+r():q()+r())+p()+p(1),c.klass.header)+f.node("table",o+f.node("tbody",f.group({min:0,max:e-1,i:1,node:"tr",item:function(a){var e=c.firstDay&&0===b.create([k.year,k.month,1]).day?-7:0;return[f.group({min:d*a-k.day+e+1,max:function(){return this.min+d-1},i:1,node:"td",item:function(a){a=b.create([k.year,k.month,a+(c.firstDay?1:0)]);var d=i&&i.pick==a.pick,e=j&&j.pick==a.pick,g=l&&b.disabled(a)||a.pick<m.pick||a.pick>n.pick,o=f.trigger(b.formats.toString,b,[c.format,a]);return[f.node("div",a.date,function(b){return b.push(k.month==a.month?c.klass.infocus:c.klass.outfocus),h.pick==a.pick&&b.push(c.klass.now),d&&b.push(c.klass.selected),e&&b.push(c.klass.highlighted),g&&b.push(c.klass.disabled),b.join(" ")}([c.klass.day]),"data-pick="+a.pick+" "+f.ariaAttr({role:"gridcell",label:o,selected:d&&b.$node.val()===o?!0:null,activedescendant:e?!0:null,disabled:g?!0:null})),"",f.ariaAttr({role:"presentation"})]}})]}})),c.klass.table,'id="'+b.$node[0].id+'_table" '+f.ariaAttr({role:"grid",controls:b.$node[0].id,readonly:!0})),c.klass.calendar_container)+f.node("div",f.node("button",c.today,"btn-flat picker__today","type=button data-pick="+h.pick+(a&&!b.disabled(h)?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id}))+f.node("button",c.clear,"btn-flat picker__clear","type=button data-clear=1"+(a?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id}))+f.node("button",c.close,"btn-flat picker__close","type=button data-close=true "+(a?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id})),c.klass.footer)},c.defaults=function(a){return{labelMonthNext:"Next month",labelMonthPrev:"Previous month",labelMonthSelect:"Select a month",labelYearSelect:"Select a year",monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysLetter:["S","M","T","W","T","F","S"],today:"Today",clear:"Clear",close:"Close",format:"d mmmm, yyyy",klass:{table:a+"table",header:a+"header",date_display:a+"date-display",day_display:a+"day-display",month_display:a+"month-display",year_display:a+"year-display",calendar_container:a+"calendar-container",navPrev:a+"nav--prev",navNext:a+"nav--next",navDisabled:a+"nav--disabled",month:a+"month",year:a+"year",selectMonth:a+"select--month",selectYear:a+"select--year",weekdays:a+"weekday",day:a+"day",disabled:a+"day--disabled",selected:a+"day--selected",highlighted:a+"day--highlighted",now:a+"day--today",infocus:a+"day--infocus",outfocus:a+"day--outfocus",footer:a+"footer",buttonClear:a+"button--clear",buttonToday:a+"button--today",buttonClose:a+"button--close"}}}(a.klasses().picker+"__"),a.extend("pickadate",c)}),function(a){function b(){var b=+a(this).attr("length"),c=+a(this).val().length,d=b>=c;a(this).parent().find('span[class="character-counter"]').html(c+"/"+b),e(d,a(this))}function c(b){var c=b.parent().find('span[class="character-counter"]');c.length||(c=a("<span/>").addClass("character-counter").css("float","right").css("font-size","12px").css("height",1),b.parent().append(c))}function d(){a(this).parent().find('span[class="character-counter"]').html("")}function e(a,b){var c=b.hasClass("invalid");a&&c?b.removeClass("invalid"):a||c||(b.removeClass("valid"),b.addClass("invalid"))}a.fn.characterCounter=function(){return this.each(function(){var e=a(this),f=e.parent().find('span[class="character-counter"]');if(!f.length){var g=void 0!==e.attr("length");g&&(e.on("input",b),e.on("focus",b),e.on("blur",d),c(e))}})},a(document).ready(function(){a("input, textarea").characterCounter()})}(jQuery),function(a){var b={init:function(b){var c={time_constant:200,dist:-100,shift:0,padding:0,full_width:!1,indicators:!1,no_wrap:!1};return b=a.extend(c,b),this.each(function(){function c(){"undefined"!=typeof window.ontouchstart&&(H[0].addEventListener("touchstart",l),H[0].addEventListener("touchmove",m),H[0].addEventListener("touchend",n)),H[0].addEventListener("mousedown",l),H[0].addEventListener("mousemove",m),H[0].addEventListener("mouseup",n),H[0].addEventListener("mouseleave",n),H[0].addEventListener("click",j)}function d(a){return a.targetTouches&&a.targetTouches.length>=1?a.targetTouches[0].clientX:a.clientX}function e(a){return a.targetTouches&&a.targetTouches.length>=1?a.targetTouches[0].clientY:a.clientY}function f(a){return a>=t?a%t:0>a?f(t+a%t):a}function g(a){var c,d,e,g,h,i,j;if(p="number"==typeof a?a:p,q=Math.floor((p+s/2)/s),e=p-q*s,g=0>e?1:-1,h=-g*e*2/s,d=t>>1,b.full_width?j="translateX(0)":(j="translateX("+(H[0].clientWidth-item_width)/2+"px) ",j+="translateY("+(H[0].clientHeight-item_width)/2+"px)"),I){var k=q%t,l=G.find(".indicator-item.active");l.index()!==k&&(l.removeClass("active"),G.find(".indicator-item").eq(k).addClass("active"))}for((!b.no_wrap||q>=0&&t>q)&&(i=o[f(q)],i.style[A]=j+" translateX("+-e/2+"px) translateX("+g*b.shift*h*c+"px) translateZ("+b.dist*h+"px)",i.style.zIndex=0,b.full_width?tweenedOpacity=1:tweenedOpacity=1-.2*h,i.style.opacity=tweenedOpacity,i.style.display="block"),c=1;d>=c;++c)b.full_width?(zTranslation=b.dist,tweenedOpacity=c===d&&0>e?1-h:1):(zTranslation=b.dist*(2*c+h*g),tweenedOpacity=1-.2*(2*c+h*g)),(!b.no_wrap||t>q+c)&&(i=o[f(q+c)],i.style[A]=j+" translateX("+(b.shift+(s*c-e)/2)+"px) translateZ("+zTranslation+"px)",i.style.zIndex=-c,i.style.opacity=tweenedOpacity,i.style.display="block"),b.full_width?(zTranslation=b.dist,tweenedOpacity=c===d&&e>0?1-h:1):(zTranslation=b.dist*(2*c-h*g),tweenedOpacity=1-.2*(2*c-h*g)),(!b.no_wrap||q-c>=0)&&(i=o[f(q-c)],i.style[A]=j+" translateX("+(-b.shift+(-s*c-e)/2)+"px) translateZ("+zTranslation+"px)",i.style.zIndex=-c,i.style.opacity=tweenedOpacity,i.style.display="block");(!b.no_wrap||q>=0&&t>q)&&(i=o[f(q)],i.style[A]=j+" translateX("+-e/2+"px) translateX("+g*b.shift*h+"px) translateZ("+b.dist*h+"px)",i.style.zIndex=0,b.full_width?tweenedOpacity=1:tweenedOpacity=1-.2*h,i.style.opacity=tweenedOpacity,i.style.display="block")}function h(){var a,b,c,d;a=Date.now(),b=a-C,C=a,c=p-B,B=p,d=1e3*c/(1+b),z=.8*d+.2*z}function i(){var a,c;w&&(a=Date.now()-C,c=w*Math.exp(-a/b.time_constant),c>2||-2>c?(g(x-c),requestAnimationFrame(i)):g(x))}function j(c){if(E)return c.preventDefault(),c.stopPropagation(),!1;if(!b.full_width){var d=a(c.target).closest(".carousel-item").index(),e=q%t-d;0!==e&&(c.preventDefault(),c.stopPropagation()),k(d)}}function k(a){var c=q%t-a;b.no_wrap||(0>c?Math.abs(c+t)<Math.abs(c)&&(c+=t):c>0&&Math.abs(c-t)<c&&(c-=t)),0>c?H.trigger("carouselNext",[Math.abs(c)]):c>0&&H.trigger("carouselPrev",[c])}function l(a){r=!0,E=!1,F=!1,u=d(a),v=e(a),z=w=0,B=p,C=Date.now(),clearInterval(D),D=setInterval(h,100)}function m(a){var b,c,f;if(r)if(b=d(a),y=e(a),c=u-b,f=Math.abs(v-y),30>f&&!F)(c>2||-2>c)&&(E=!0,u=b,g(p+c));else{if(E)return a.preventDefault(),a.stopPropagation(),!1;F=!0}return E?(a.preventDefault(),a.stopPropagation(),!1):void 0}function n(a){return r?(r=!1,clearInterval(D),x=p,(z>10||-10>z)&&(w=.9*z,x=p+w),x=Math.round(x/s)*s,b.no_wrap&&(x>=s*(t-1)?x=s*(t-1):0>x&&(x=0)),w=x-p,C=Date.now(),requestAnimationFrame(i),E&&(a.preventDefault(),a.stopPropagation()),!1):void 0}var o,p,q,r,s,t,u,v,w,x,z,A,B,C,D,E,F,G=a('<ul class="indicators"></ul>'),H=a(this),I=H.attr("data-indicators")||b.indicators;if(H.hasClass("initialized"))return a(this).trigger("carouselNext",[1e-6]),!0;if(b.full_width){b.dist=0;var J=H.find(".carousel-item img").first();J.length?imageHeight=J.on("load",function(){H.css("height",a(this).height())}):(imageHeight=H.find(".carousel-item").first().height(),H.css("height",imageHeight)),I&&H.find(".carousel-fixed-item").addClass("with-indicators")}H.addClass("initialized"),r=!1,p=x=0,o=[],item_width=H.find(".carousel-item").first().innerWidth(),s=2*item_width+b.padding,H.find(".carousel-item").each(function(b){if(o.push(a(this)[0]),I){var c=a('<li class="indicator-item"></li>');0===b&&c.addClass("active"),c.click(function(){var b=a(this).index();k(b)}),G.append(c)}}),I&&H.append(G),t=o.length,A="transform",["webkit","Moz","O","ms"].every(function(a){var b=a+"Transform";return"undefined"!=typeof document.body.style[b]?(A=b,!1):!0}),window.onresize=g,c(),g(p),a(this).on("carouselNext",function(a,b){void 0===b&&(b=1),x=p+s*b,p!==x&&(w=x-p,C=Date.now(),requestAnimationFrame(i))}),a(this).on("carouselPrev",function(a,b){void 0===b&&(b=1),x=p-s*b,p!==x&&(w=x-p,C=Date.now(),requestAnimationFrame(i))}),a(this).on("carouselSet",function(a,b){void 0===b&&(b=0),k(b)})})},next:function(b){a(this).trigger("carouselNext",[b])},prev:function(b){a(this).trigger("carouselPrev",[b])},set:function(b){a(this).trigger("carouselSet",[b])}};a.fn.carousel=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.carousel"):b.init.apply(this,arguments)}}(jQuery);
/*
 Highcharts JS v5.0.6 (2016-12-07)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(L,a){"object"===typeof module&&module.exports?module.exports=L.document?a(L):a:L.Highcharts=a(L)})("undefined"!==typeof window?window:this,function(L){L=function(){var a=window,D=a.document,C=a.navigator&&a.navigator.userAgent||"",G=D&&D.createElementNS&&!!D.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,I=/(edge|msie|trident)/i.test(C)&&!window.opera,h=!G,f=/Firefox/.test(C),p=f&&4>parseInt(C.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",
version:"5.0.6",deg2rad:2*Math.PI/360,doc:D,hasBidiBug:p,hasTouch:D&&void 0!==D.documentElement.ontouchstart,isMS:I,isWebKit:/AppleWebKit/.test(C),isFirefox:f,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(C),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:G,vml:h,win:a,charts:[],marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){}}}();(function(a){var D=[],C=a.charts,G=a.doc,I=a.win;a.error=function(h,f){h=a.isNumber(h)?"Highcharts error #"+
h+": www.highcharts.com/errors/"+h:h;if(f)throw Error(h);I.console&&console.log(h)};a.Fx=function(a,f,p){this.options=f;this.elem=a;this.prop=p};a.Fx.prototype={dSetter:function(){var a=this.paths[0],f=this.paths[1],p=[],v=this.now,l=a.length,u;if(1===v)p=this.toD;else if(l===f.length&&1>v)for(;l--;)u=parseFloat(a[l]),p[l]=isNaN(u)?a[l]:v*parseFloat(f[l]-u)+u;else p=f;this.elem.attr("d",p,null,!0)},update:function(){var a=this.elem,f=this.prop,p=this.now,v=this.options.step;if(this[f+"Setter"])this[f+
"Setter"]();else a.attr?a.element&&a.attr(f,p,null,!0):a.style[f]=p+this.unit;v&&v.call(a,p,this)},run:function(a,f,p){var h=this,l=function(a){return l.stopped?!1:h.step(a)},u;this.startTime=+new Date;this.start=a;this.end=f;this.unit=p;this.now=this.start;this.pos=0;l.elem=this.elem;l.prop=this.prop;l()&&1===D.push(l)&&(l.timerId=setInterval(function(){for(u=0;u<D.length;u++)D[u]()||D.splice(u--,1);D.length||clearInterval(l.timerId)},13))},step:function(a){var f=+new Date,h,v=this.options;h=this.elem;
var l=v.complete,u=v.duration,d=v.curAnim,c;if(h.attr&&!h.element)h=!1;else if(a||f>=u+this.startTime){this.now=this.end;this.pos=1;this.update();a=d[this.prop]=!0;for(c in d)!0!==d[c]&&(a=!1);a&&l&&l.call(h);h=!1}else this.pos=v.easing((f-this.startTime)/u),this.now=this.start+(this.end-this.start)*this.pos,this.update(),h=!0;return h},initPath:function(h,f,p){function v(a){var e,b;for(q=a.length;q--;)e="M"===a[q]||"L"===a[q],b=/[a-zA-Z]/.test(a[q+3]),e&&b&&a.splice(q+1,0,a[q+1],a[q+2],a[q+1],a[q+
2])}function l(a,e){for(;a.length<m;){a[0]=e[m-a.length];var b=a.slice(0,t);[].splice.apply(a,[0,0].concat(b));z&&(b=a.slice(a.length-t),[].splice.apply(a,[a.length,0].concat(b)),q--)}a[0]="M"}function u(a,e){for(var c=(m-a.length)/t;0<c&&c--;)b=a.slice().splice(a.length/F-t,t*F),b[0]=e[m-t-c*t],y&&(b[t-6]=b[t-2],b[t-5]=b[t-1]),[].splice.apply(a,[a.length/F,0].concat(b)),z&&c--}f=f||"";var d,c=h.startX,n=h.endX,y=-1<f.indexOf("C"),t=y?7:3,m,b,q;f=f.split(" ");p=p.slice();var z=h.isArea,F=z?2:1,e;
y&&(v(f),v(p));if(c&&n){for(q=0;q<c.length;q++)if(c[q]===n[0]){d=q;break}else if(c[0]===n[n.length-c.length+q]){d=q;e=!0;break}void 0===d&&(f=[])}f.length&&a.isNumber(d)&&(m=p.length+d*F*t,e?(l(f,p),u(p,f)):(l(p,f),u(f,p)));return[f,p]}};a.extend=function(a,f){var h;a||(a={});for(h in f)a[h]=f[h];return a};a.merge=function(){var h,f=arguments,p,v={},l=function(h,d){var c,n;"object"!==typeof h&&(h={});for(n in d)d.hasOwnProperty(n)&&(c=d[n],a.isObject(c,!0)&&"renderTo"!==n&&"number"!==typeof c.nodeType?
h[n]=l(h[n]||{},c):h[n]=d[n]);return h};!0===f[0]&&(v=f[1],f=Array.prototype.slice.call(f,2));p=f.length;for(h=0;h<p;h++)v=l(v,f[h]);return v};a.pInt=function(a,f){return parseInt(a,f||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(h,f){return h&&"object"===typeof h&&(!f||!a.isArray(h))};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=
function(a,f){for(var h=a.length;h--;)if(a[h]===f){a.splice(h,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(h,f,p){var v,l;if(a.isString(f))a.defined(p)?h.setAttribute(f,p):h&&h.getAttribute&&(l=h.getAttribute(f));else if(a.defined(f)&&a.isObject(f))for(v in f)h.setAttribute(v,f[v]);return l};a.splat=function(h){return a.isArray(h)?h:[h]};a.syncTimeout=function(a,f,p){if(f)return setTimeout(a,f,p);a.call(0,p)};a.pick=function(){var a=arguments,f,p,v=a.length;for(f=
0;f<v;f++)if(p=a[f],void 0!==p&&null!==p)return p};a.css=function(h,f){a.isMS&&!a.svg&&f&&void 0!==f.opacity&&(f.filter="alpha(opacity\x3d"+100*f.opacity+")");a.extend(h.style,f)};a.createElement=function(h,f,p,v,l){h=G.createElement(h);var u=a.css;f&&a.extend(h,f);l&&u(h,{padding:0,border:"none",margin:0});p&&u(h,p);v&&v.appendChild(h);return h};a.extendClass=function(h,f){var p=function(){};p.prototype=new h;a.extend(p.prototype,f);return p};a.pad=function(a,f,p){return Array((f||2)+1-String(a).length).join(p||
0)+a};a.relativeLength=function(a,f){return/%$/.test(a)?f*parseFloat(a)/100:parseFloat(a)};a.wrap=function(a,f,p){var h=a[f];a[f]=function(){var a=Array.prototype.slice.call(arguments),f=arguments,d=this;d.proceed=function(){h.apply(d,arguments.length?arguments:f)};a.unshift(h);a=p.apply(this,a);d.proceed=null;return a}};a.getTZOffset=function(h){var f=a.Date;return 6E4*(f.hcGetTimezoneOffset&&f.hcGetTimezoneOffset(h)||f.hcTimezoneOffset||0)};a.dateFormat=function(h,f,p){if(!a.defined(f)||isNaN(f))return a.defaultOptions.lang.invalidDate||
"";h=a.pick(h,"%Y-%m-%d %H:%M:%S");var v=a.Date,l=new v(f-a.getTZOffset(f)),u,d=l[v.hcGetHours](),c=l[v.hcGetDay](),n=l[v.hcGetDate](),y=l[v.hcGetMonth](),t=l[v.hcGetFullYear](),m=a.defaultOptions.lang,b=m.weekdays,q=m.shortWeekdays,z=a.pad,v=a.extend({a:q?q[c]:b[c].substr(0,3),A:b[c],d:z(n),e:z(n,2," "),w:c,b:m.shortMonths[y],B:m.months[y],m:z(y+1),y:t.toString().substr(2,2),Y:t,H:z(d),k:d,I:z(d%12||12),l:d%12||12,M:z(l[v.hcGetMinutes]()),p:12>d?"AM":"PM",P:12>d?"am":"pm",S:z(l.getSeconds()),L:z(Math.round(f%
1E3),3)},a.dateFormats);for(u in v)for(;-1!==h.indexOf("%"+u);)h=h.replace("%"+u,"function"===typeof v[u]?v[u](f):v[u]);return p?h.substr(0,1).toUpperCase()+h.substr(1):h};a.formatSingle=function(h,f){var p=/\.([0-9])/,v=a.defaultOptions.lang;/f$/.test(h)?(p=(p=h.match(p))?p[1]:-1,null!==f&&(f=a.numberFormat(f,p,v.decimalPoint,-1<h.indexOf(",")?v.thousandsSep:""))):f=a.dateFormat(h,f);return f};a.format=function(h,f){for(var p="{",v=!1,l,u,d,c,n=[],y;h;){p=h.indexOf(p);if(-1===p)break;l=h.slice(0,
p);if(v){l=l.split(":");u=l.shift().split(".");c=u.length;y=f;for(d=0;d<c;d++)y=y[u[d]];l.length&&(y=a.formatSingle(l.join(":"),y));n.push(y)}else n.push(l);h=h.slice(p+1);p=(v=!v)?"}":"{"}n.push(h);return n.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(h,f,p,v,l){var u,d=h;p=a.pick(p,1);u=h/p;f||(f=l?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===v&&(1===p?f=a.grep(f,function(a){return 0===a%1}):.1>=p&&(f=[1/p])));
for(v=0;v<f.length&&!(d=f[v],l&&d*p>=h||!l&&u<=(f[v]+(f[v+1]||f[v]))/2);v++);return d*p};a.stableSort=function(a,f){var p=a.length,h,l;for(l=0;l<p;l++)a[l].safeI=l;a.sort(function(a,d){h=f(a,d);return 0===h?a.safeI-d.safeI:h});for(l=0;l<p;l++)delete a[l].safeI};a.arrayMin=function(a){for(var f=a.length,p=a[0];f--;)a[f]<p&&(p=a[f]);return p};a.arrayMax=function(a){for(var f=a.length,p=a[0];f--;)a[f]>p&&(p=a[f]);return p};a.destroyObjectProperties=function(a,f){for(var p in a)a[p]&&a[p]!==f&&a[p].destroy&&
a[p].destroy(),delete a[p]};a.discardElement=function(h){var f=a.garbageBin;f||(f=a.createElement("div"));h&&f.appendChild(h);f.innerHTML=""};a.correctFloat=function(a,f){return parseFloat(a.toPrecision(f||14))};a.setAnimation=function(h,f){f.renderer.globalAnimation=a.pick(h,f.options.chart.animation,!0)};a.animObject=function(h){return a.isObject(h)?a.merge(h):{duration:h?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=
function(h,f,p,v){h=+h||0;f=+f;var l=a.defaultOptions.lang,u=(h.toString().split(".")[1]||"").length,d,c,n=Math.abs(h);-1===f?f=Math.min(u,20):a.isNumber(f)||(f=2);d=String(a.pInt(n.toFixed(f)));c=3<d.length?d.length%3:0;p=a.pick(p,l.decimalPoint);v=a.pick(v,l.thousandsSep);h=(0>h?"-":"")+(c?d.substr(0,c)+v:"");h+=d.substr(c).replace(/(\d{3})(?=\d)/g,"$1"+v);f&&(v=Math.abs(n-d+Math.pow(10,-Math.max(f,u)-1)),h+=p+v.toFixed(f).slice(2));return h};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*
a)-1)};a.getStyle=function(h,f){return"width"===f?Math.min(h.offsetWidth,h.scrollWidth)-a.getStyle(h,"padding-left")-a.getStyle(h,"padding-right"):"height"===f?Math.min(h.offsetHeight,h.scrollHeight)-a.getStyle(h,"padding-top")-a.getStyle(h,"padding-bottom"):(h=I.getComputedStyle(h,void 0))&&a.pInt(h.getPropertyValue(f))};a.inArray=function(a,f){return f.indexOf?f.indexOf(a):[].indexOf.call(f,a)};a.grep=function(a,f){return[].filter.call(a,f)};a.find=function(a,f){return[].find.call(a,f)};a.map=function(a,
f){for(var p=[],h=0,l=a.length;h<l;h++)p[h]=f.call(a[h],a[h],h,a);return p};a.offset=function(a){var f=G.documentElement;a=a.getBoundingClientRect();return{top:a.top+(I.pageYOffset||f.scrollTop)-(f.clientTop||0),left:a.left+(I.pageXOffset||f.scrollLeft)-(f.clientLeft||0)}};a.stop=function(a,f){for(var p=D.length;p--;)D[p].elem!==a||f&&f!==D[p].prop||(D[p].stopped=!0)};a.each=function(a,f,p){return Array.prototype.forEach.call(a,f,p)};a.addEvent=function(h,f,p){function v(a){a.target=a.srcElement||
I;p.call(h,a)}var l=h.hcEvents=h.hcEvents||{};h.addEventListener?h.addEventListener(f,p,!1):h.attachEvent&&(h.hcEventsIE||(h.hcEventsIE={}),h.hcEventsIE[p.toString()]=v,h.attachEvent("on"+f,v));l[f]||(l[f]=[]);l[f].push(p);return function(){a.removeEvent(h,f,p)}};a.removeEvent=function(h,f,p){function v(a,c){h.removeEventListener?h.removeEventListener(a,c,!1):h.attachEvent&&(c=h.hcEventsIE[c.toString()],h.detachEvent("on"+a,c))}function l(){var a,c;if(h.nodeName)for(c in f?(a={},a[f]=!0):a=d,a)if(d[c])for(a=
d[c].length;a--;)v(c,d[c][a])}var u,d=h.hcEvents,c;d&&(f?(u=d[f]||[],p?(c=a.inArray(p,u),-1<c&&(u.splice(c,1),d[f]=u),v(f,p)):(l(),d[f]=[])):(l(),h.hcEvents={}))};a.fireEvent=function(h,f,p,v){var l;l=h.hcEvents;var u,d;p=p||{};if(G.createEvent&&(h.dispatchEvent||h.fireEvent))l=G.createEvent("Events"),l.initEvent(f,!0,!0),a.extend(l,p),h.dispatchEvent?h.dispatchEvent(l):h.fireEvent(f,l);else if(l)for(l=l[f]||[],u=l.length,p.target||a.extend(p,{preventDefault:function(){p.defaultPrevented=!0},target:h,
type:f}),f=0;f<u;f++)(d=l[f])&&!1===d.call(h,p)&&p.preventDefault();v&&!p.defaultPrevented&&v(p)};a.animate=function(h,f,p){var v,l="",u,d,c;a.isObject(p)||(v=arguments,p={duration:v[2],easing:v[3],complete:v[4]});a.isNumber(p.duration)||(p.duration=400);p.easing="function"===typeof p.easing?p.easing:Math[p.easing]||Math.easeInOutSine;p.curAnim=a.merge(f);for(c in f)a.stop(h,c),d=new a.Fx(h,p,c),u=null,"d"===c?(d.paths=d.initPath(h,h.d,f.d),d.toD=f.d,v=0,u=1):h.attr?v=h.attr(c):(v=parseFloat(a.getStyle(h,
c))||0,"opacity"!==c&&(l="px")),u||(u=f[c]),u.match&&u.match("px")&&(u=u.replace(/px/g,"")),d.run(v,u,l)};a.seriesType=function(h,f,p,v,l){var u=a.getOptions(),d=a.seriesTypes;u.plotOptions[h]=a.merge(u.plotOptions[f],p);d[h]=a.extendClass(d[f]||function(){},v);d[h].prototype.type=h;l&&(d[h].prototype.pointClass=a.extendClass(a.Point,l));return d[h]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),f=0;return function(){return"highcharts-"+a+"-"+f++}}();I.jQuery&&(I.jQuery.fn.highcharts=
function(){var h=[].slice.call(arguments);if(this[0])return h[0]?(new (a[a.isString(h[0])?h.shift():"Chart"])(this[0],h[0],h[1]),this):C[a.attr(this[0],"data-highcharts-chart")]});G&&!G.defaultView&&(a.getStyle=function(h,f){var p={width:"clientWidth",height:"clientHeight"}[f];if(h.style[f])return a.pInt(h.style[f]);"opacity"===f&&(f="filter");if(p)return h.style.zoom=1,Math.max(h[p]-2*a.getStyle(h,"padding"),0);h=h.currentStyle[f.replace(/\-(\w)/g,function(a,l){return l.toUpperCase()})];"filter"===
f&&(h=h.replace(/alpha\(opacity=([0-9]+)\)/,function(a,l){return l/100}));return""===h?1:a.pInt(h)});Array.prototype.forEach||(a.each=function(a,f,p){for(var h=0,l=a.length;h<l;h++)if(!1===f.call(p,a[h],h,a))return h});Array.prototype.indexOf||(a.inArray=function(a,f){var p,h=0;if(f)for(p=f.length;h<p;h++)if(f[h]===a)return h;return-1});Array.prototype.filter||(a.grep=function(a,f){for(var p=[],h=0,l=a.length;h<l;h++)f(a[h],h)&&p.push(a[h]);return p});Array.prototype.find||(a.find=function(a,f){var p,
h=a.length;for(p=0;p<h;p++)if(f(a[p],p))return a[p]})})(L);(function(a){var D=a.each,C=a.isNumber,G=a.map,I=a.merge,h=a.pInt;a.Color=function(f){if(!(this instanceof a.Color))return new a.Color(f);this.init(f)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[h(a[1]),h(a[2]),h(a[3]),parseFloat(a[4],10)]}},{regex:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(a){return[h(a[1],
16),h(a[2],16),h(a[3],16),1]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[h(a[1]),h(a[2]),h(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(f){var p,h,l,u;if((this.input=f=this.names[f]||f)&&f.stops)this.stops=G(f.stops,function(d){return new a.Color(d[1])});else for(l=this.parsers.length;l--&&!h;)u=this.parsers[l],(p=u.regex.exec(f))&&(h=u.parse(p));this.rgba=h||[]},get:function(a){var f=this.input,h=this.rgba,l;this.stops?
(l=I(f),l.stops=[].concat(l.stops),D(this.stops,function(f,d){l.stops[d]=[l.stops[d][0],f.get(a)]})):l=h&&C(h[0])?"rgb"===a||!a&&1===h[3]?"rgb("+h[0]+","+h[1]+","+h[2]+")":"a"===a?h[3]:"rgba("+h.join(",")+")":f;return l},brighten:function(a){var f,v=this.rgba;if(this.stops)D(this.stops,function(l){l.brighten(a)});else if(C(a)&&0!==a)for(f=0;3>f;f++)v[f]+=h(255*a),0>v[f]&&(v[f]=0),255<v[f]&&(v[f]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this}};a.color=function(f){return new a.Color(f)}})(L);
(function(a){var D,C,G=a.addEvent,I=a.animate,h=a.attr,f=a.charts,p=a.color,v=a.css,l=a.createElement,u=a.defined,d=a.deg2rad,c=a.destroyObjectProperties,n=a.doc,y=a.each,t=a.extend,m=a.erase,b=a.grep,q=a.hasTouch,z=a.isArray,F=a.isFirefox,e=a.isMS,r=a.isObject,x=a.isString,A=a.isWebKit,k=a.merge,w=a.noop,K=a.pick,J=a.pInt,N=a.removeEvent,g=a.stop,B=a.svg,S=a.SVG_NS,M=a.symbolSizes,R=a.win;D=a.SVGElement=function(){return this};D.prototype={opacity:1,SVG_NS:S,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textOutline".split(" "),
init:function(a,H){this.element="span"===H?l(H):n.createElementNS(this.SVG_NS,H);this.renderer=a},animate:function(E,H,g){H=a.animObject(K(H,this.renderer.globalAnimation,!0));0!==H.duration?(g&&(H.complete=g),I(this,E,H)):this.attr(E,null,g);return this},colorGradient:function(E,H,g){var e=this.renderer,c,b,B,r,m,w,q,d,x,n,P,t=[],A;E.linearGradient?b="linearGradient":E.radialGradient&&(b="radialGradient");if(b){B=E[b];m=e.gradients;q=E.stops;n=g.radialReference;z(B)&&(E[b]=B={x1:B[0],y1:B[1],x2:B[2],
y2:B[3],gradientUnits:"userSpaceOnUse"});"radialGradient"===b&&n&&!u(B.gradientUnits)&&(r=B,B=k(B,e.getRadialAttr(n,r),{gradientUnits:"userSpaceOnUse"}));for(P in B)"id"!==P&&t.push(P,B[P]);for(P in q)t.push(q[P]);t=t.join(",");m[t]?n=m[t].attr("id"):(B.id=n=a.uniqueKey(),m[t]=w=e.createElement(b).attr(B).add(e.defs),w.radAttr=r,w.stops=[],y(q,function(E){0===E[1].indexOf("rgba")?(c=a.color(E[1]),d=c.get("rgb"),x=c.get("a")):(d=E[1],x=1);E=e.createElement("stop").attr({offset:E[0],"stop-color":d,
"stop-opacity":x}).add(w);w.stops.push(E)}));A="url("+e.url+"#"+n+")";g.setAttribute(H,A);g.gradient=t;E.toString=function(){return A}}},applyTextOutline:function(a){var E=this.element,g,e,k,b;-1!==a.indexOf("contrast")&&(a=a.replace(/contrast/g,this.renderer.getContrast(E.style.fill)));this.fakeTS=!0;this.ySetter=this.xSetter;g=[].slice.call(E.getElementsByTagName("tspan"));a=a.split(" ");e=a[a.length-1];(k=a[0])&&"none"!==k&&(k=k.replace(/(^[\d\.]+)(.*?)$/g,function(a,E,H){return 2*E+H}),y(g,function(a){"highcharts-text-outline"===
a.getAttribute("class")&&m(g,E.removeChild(a))}),b=E.firstChild,y(g,function(a,H){0===H&&(a.setAttribute("x",E.getAttribute("x")),H=E.getAttribute("y"),a.setAttribute("y",H||0),null===H&&E.setAttribute("y",0));a=a.cloneNode(1);h(a,{"class":"highcharts-text-outline",fill:e,stroke:e,"stroke-width":k,"stroke-linejoin":"round"});E.insertBefore(a,b)}))},attr:function(a,H,e,k){var E,b=this.element,c,B=this,r;"string"===typeof a&&void 0!==H&&(E=a,a={},a[E]=H);if("string"===typeof a)B=(this[a+"Getter"]||
this._defaultGetter).call(this,a,b);else{for(E in a)H=a[E],r=!1,k||g(this,E),this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(E)&&(c||(this.symbolAttr(a),c=!0),r=!0),!this.rotation||"x"!==E&&"y"!==E||(this.doTransform=!0),r||(r=this[E+"Setter"]||this._defaultSetter,r.call(this,H,E,b),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(E)&&this.updateShadows(E,H,r));this.doTransform&&(this.updateTransform(),this.doTransform=!1)}e&&e();return B},updateShadows:function(a,
H,g){for(var E=this.shadows,e=E.length;e--;)g.call(E[e],"height"===a?Math.max(H-(E[e].cutHeight||0),0):"d"===a?this.d:H,a,E[e])},addClass:function(a,H){var E=this.attr("class")||"";-1===E.indexOf(a)&&(H||(a=(E+(E?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==h(this.element,"class").indexOf(a)},removeClass:function(a){h(this.element,"class",(h(this.element,"class")||"").replace(a,""));return this},symbolAttr:function(a){var E=this;y("x y r start end width height innerR anchorX anchorY".split(" "),
function(g){E[g]=K(a[g],E[g])});E.attr({d:E.renderer.symbols[E.symbolName](E.x,E.y,E.width,E.height,E)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,g){var E,H={},e;g=g||a.strokeWidth||0;e=Math.round(g)%2/2;a.x=Math.floor(a.x||this.x||0)+e;a.y=Math.floor(a.y||this.y||0)+e;a.width=Math.floor((a.width||this.width||0)-2*e);a.height=Math.floor((a.height||this.height||0)-2*e);u(a.strokeWidth)&&(a.strokeWidth=g);for(E in a)this[E]!==a[E]&&
(this[E]=H[E]=a[E]);return H},css:function(a){var g=this.styles,E={},k=this.element,b,c,r="";b=!g;a&&a.color&&(a.fill=a.color);if(g)for(c in a)a[c]!==g[c]&&(E[c]=a[c],b=!0);if(b){b=this.textWidth=a&&a.width&&"text"===k.nodeName.toLowerCase()&&J(a.width)||this.textWidth;g&&(a=t(g,E));this.styles=a;b&&!B&&this.renderer.forExport&&delete a.width;if(e&&!B)v(this.element,a);else{g=function(a,g){return"-"+g.toLowerCase()};for(c in a)r+=c.replace(/([A-Z])/g,g)+":"+a[c]+";";h(k,"style",r)}this.added&&(b&&
this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline))}return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,g){var E=this,e=E.element;q&&"click"===a?(e.ontouchstart=function(a){E.touchEventFired=Date.now();a.preventDefault();g.call(e,a)},e.onclick=function(a){(-1===R.navigator.userAgent.indexOf("Android")||1100<Date.now()-(E.touchEventFired||0))&&g.call(e,a)}):e["on"+a]=g;return this},setRadialReference:function(a){var g=this.renderer.gradients[this.element.gradient];
this.element.radialReference=a;g&&g.radAttr&&g.animate(this.renderer.getRadialAttr(a,g.radAttr));return this},translate:function(a,g){return this.attr({translateX:a,translateY:g})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,g=this.translateY||0,e=this.scaleX,k=this.scaleY,b=this.inverted,c=this.rotation,B=this.element;b&&(a+=this.attr("width"),g+=this.attr("height"));a=["translate("+a+","+g+")"];b?a.push("rotate(90) scale(-1,1)"):
c&&a.push("rotate("+c+" "+(B.getAttribute("x")||0)+" "+(B.getAttribute("y")||0)+")");(u(e)||u(k))&&a.push("scale("+K(e,1)+" "+K(k,1)+")");a.length&&B.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,g,e){var E,H,k,b,c={};H=this.renderer;k=H.alignedObjects;var B,r;if(a){if(this.alignOptions=a,this.alignByTranslate=g,!e||x(e))this.alignTo=E=e||"renderer",m(k,this),k.push(this),e=null}else a=this.alignOptions,g=this.alignByTranslate,
E=this.alignTo;e=K(e,H[E],H);E=a.align;H=a.verticalAlign;k=(e.x||0)+(a.x||0);b=(e.y||0)+(a.y||0);"right"===E?B=1:"center"===E&&(B=2);B&&(k+=(e.width-(a.width||0))/B);c[g?"translateX":"x"]=Math.round(k);"bottom"===H?r=1:"middle"===H&&(r=2);r&&(b+=(e.height-(a.height||0))/r);c[g?"translateY":"y"]=Math.round(b);this[this.placed?"animate":"attr"](c);this.placed=!0;this.alignAttr=c;return this},getBBox:function(a,g){var E,H=this.renderer,k,b=this.element,c=this.styles,B,r=this.textStr,m,w=H.cache,q=H.cacheKeys,
x;g=K(g,this.rotation);k=g*d;B=c&&c.fontSize;void 0!==r&&(x=r.toString(),-1===x.indexOf("\x3c")&&(x=x.replace(/[0-9]/g,"0")),x+=["",g||0,B,b.style.width,b.style["text-overflow"]].join());x&&!a&&(E=w[x]);if(!E){if(b.namespaceURI===this.SVG_NS||H.forExport){try{(m=this.fakeTS&&function(a){y(b.querySelectorAll(".highcharts-text-outline"),function(g){g.style.display=a})})&&m("none"),E=b.getBBox?t({},b.getBBox()):{width:b.offsetWidth,height:b.offsetHeight},m&&m("")}catch(T){}if(!E||0>E.width)E={width:0,
height:0}}else E=this.htmlGetBBox();H.isSVG&&(a=E.width,H=E.height,e&&c&&"11px"===c.fontSize&&"16.9"===H.toPrecision(3)&&(E.height=H=14),g&&(E.width=Math.abs(H*Math.sin(k))+Math.abs(a*Math.cos(k)),E.height=Math.abs(H*Math.cos(k))+Math.abs(a*Math.sin(k))));if(x&&0<E.height){for(;250<q.length;)delete w[q.shift()];w[x]||q.push(x);w[x]=E}}return E},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var g=
this;g.animate({opacity:0},{duration:a||150,complete:function(){g.attr({y:-9999})}})},add:function(a){var g=this.renderer,e=this.element,E;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&g.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)E=this.zIndexSetter();E||(a?a.element:g.box).appendChild(e);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var g=a.parentNode;g&&g.removeChild(a)},destroy:function(){var a=this.element||{},e=this.renderer.isSVG&&
"SPAN"===a.nodeName&&this.parentGroup,k,b;a.onclick=a.onmouseout=a.onmouseover=a.onmousemove=a.point=null;g(this);this.clipPath&&(this.clipPath=this.clipPath.destroy());if(this.stops){for(b=0;b<this.stops.length;b++)this.stops[b]=this.stops[b].destroy();this.stops=null}this.safeRemoveChild(a);for(this.destroyShadows();e&&e.div&&0===e.div.childNodes.length;)a=e.parentGroup,this.safeRemoveChild(e.div),delete e.div,e=a;this.alignTo&&m(this.renderer.alignedObjects,this);for(k in this)delete this[k];return null},
shadow:function(a,g,e){var E=[],b,k,H=this.element,c,B,r,m;if(!a)this.destroyShadows();else if(!this.shadows){B=K(a.width,3);r=(a.opacity||.15)/B;m=this.parentInverted?"(-1,-1)":"("+K(a.offsetX,1)+", "+K(a.offsetY,1)+")";for(b=1;b<=B;b++)k=H.cloneNode(0),c=2*B+1-2*b,h(k,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":r*b,"stroke-width":c,transform:"translate"+m,fill:"none"}),e&&(h(k,"height",Math.max(h(k,"height")-c,0)),k.cutHeight=c),g?g.element.appendChild(k):H.parentNode.insertBefore(k,
H),E.push(k);this.shadows=E}return this},destroyShadows:function(){y(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=K(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,g,e){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");e.setAttribute(g,
a);this[g]=a},dashstyleSetter:function(a){var g,e=this["stroke-width"];"inherit"===e&&(e=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(g=a.length;g--;)a[g]=J(a[g])*e;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",
{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,g,e){this[g]=a;e.setAttribute(g,a)},titleSetter:function(a){var g=this.element.getElementsByTagName("title")[0];g||(g=n.createElementNS(this.SVG_NS,"title"),this.element.appendChild(g));g.firstChild&&g.removeChild(g.firstChild);g.appendChild(n.createTextNode(String(K(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,
g,e){"string"===typeof a?e.setAttribute(g,a):a&&this.colorGradient(a,g,e)},visibilitySetter:function(a,g,e){"inherit"===a?e.removeAttribute(g):e.setAttribute(g,a)},zIndexSetter:function(a,g){var e=this.renderer,k=this.parentGroup,b=(k||e).element||e.box,c,B=this.element,H;c=this.added;var r;u(a)&&(B.zIndex=a,a=+a,this[g]===a&&(c=!1),this[g]=a);if(c){(a=this.zIndex)&&k&&(k.handleZ=!0);g=b.childNodes;for(r=0;r<g.length&&!H;r++)k=g[r],c=k.zIndex,k!==B&&(J(c)>a||!u(a)&&u(c)||0>a&&!u(c)&&b!==e.box)&&(b.insertBefore(B,
k),H=!0);H||b.appendChild(B)}return H},_defaultSetter:function(a,g,e){e.setAttribute(g,a)}};D.prototype.yGetter=D.prototype.xGetter;D.prototype.translateXSetter=D.prototype.translateYSetter=D.prototype.rotationSetter=D.prototype.verticalAlignSetter=D.prototype.scaleXSetter=D.prototype.scaleYSetter=function(a,g){this[g]=a;this.doTransform=!0};D.prototype["stroke-widthSetter"]=D.prototype.strokeSetter=function(a,g,e){this[g]=a;this.stroke&&this["stroke-width"]?(D.prototype.fillSetter.call(this,this.stroke,
"stroke",e),e.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===g&&0===a&&this.hasStroke&&(e.removeAttribute("stroke"),this.hasStroke=!1)};C=a.SVGRenderer=function(){this.init.apply(this,arguments)};C.prototype={Element:D,SVG_NS:S,init:function(a,g,e,k,b,c){var B;k=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(k));B=k.element;a.appendChild(B);-1===a.innerHTML.indexOf("xmlns")&&h(B,"xmlns",this.SVG_NS);this.isSVG=!0;
this.box=B;this.boxWrapper=k;this.alignedObjects=[];this.url=(F||A)&&n.getElementsByTagName("base").length?R.location.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(n.createTextNode("Created with Highcharts 5.0.6"));this.defs=this.createElement("defs").add();this.allowHTML=c;this.forExport=b;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(g,e,!1);var H;F&&a.getBoundingClientRect&&(g=function(){v(a,
{left:0,top:0});H=a.getBoundingClientRect();v(a,{left:Math.ceil(H.left)-H.left+"px",top:Math.ceil(H.top)-H.top+"px"})},g(),this.unSubPixelFix=G(R,"resize",g))},getStyle:function(a){return this.style=t({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();
c(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var g=new this.Element;g.init(this,a);return g},draw:w,getRadialAttr:function(a,g){return{cx:a[0]-a[2]/2+g.cx*a[2],cy:a[1]-a[2]/2+g.cy*a[2],r:g.r*a[2]}},buildText:function(a){for(var g=a.element,e=this,k=e.forExport,c=K(a.textStr,"").toString(),r=-1!==c.indexOf("\x3c"),m=g.childNodes,w,E,q,x,d=h(g,"x"),t=a.styles,A=a.textWidth,z=t&&
t.lineHeight,l=t&&t.textOutline,F=t&&"ellipsis"===t.textOverflow,f=m.length,u=A&&!a.added&&this.box,p=function(a){var k;k=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:t&&t.fontSize||e.style.fontSize||12;return z?J(z):e.fontMetrics(k,a.getAttribute("style")?a:g).h};f--;)g.removeChild(m[f]);r||l||F||A||-1!==c.indexOf(" ")?(w=/<.*class="([^"]+)".*>/,E=/<.*style="([^"]+)".*>/,q=/<.*href="(http[^"]+)".*>/,u&&u.appendChild(g),c=r?c.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,
'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[c],c=b(c,function(a){return""!==a}),y(c,function(b,c){var r,H=0;b=b.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");r=b.split("|||");y(r,function(b){if(""!==b||1===r.length){var m={},l=n.createElementNS(e.SVG_NS,"tspan"),z,f;w.test(b)&&(z=b.match(w)[1],h(l,"class",z));E.test(b)&&(f=b.match(E)[1].replace(/(;| |^)color([ :])/,
"$1fill$2"),h(l,"style",f));q.test(b)&&!k&&(h(l,"onclick",'location.href\x3d"'+b.match(q)[1]+'"'),v(l,{cursor:"pointer"}));b=(b.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e");if(" "!==b){l.appendChild(n.createTextNode(b));H?m.dx=0:c&&null!==d&&(m.x=d);h(l,m);g.appendChild(l);!H&&c&&(!B&&k&&v(l,{display:"block"}),h(l,"dy",p(l)));if(A){m=b.replace(/([^\^])-/g,"$1- ").split(" ");z="nowrap"===t.whiteSpace;for(var K=1<r.length||c||1<m.length&&!z,u,y,J=[],M=p(l),P=a.rotation,
O=b,N=O.length;(K||F)&&(m.length||J.length);)a.rotation=0,u=a.getBBox(!0),y=u.width,!B&&e.forExport&&(y=e.measureSpanWidth(l.firstChild.data,a.styles)),u=y>A,void 0===x&&(x=u),F&&x?(N/=2,""===O||!u&&.5>N?m=[]:(O=b.substring(0,O.length+(u?-1:1)*Math.ceil(N)),m=[O+(3<A?"\u2026":"")],l.removeChild(l.firstChild))):u&&1!==m.length?(l.removeChild(l.firstChild),J.unshift(m.pop())):(m=J,J=[],m.length&&!z&&(l=n.createElementNS(S,"tspan"),h(l,{dy:M,x:d}),f&&h(l,"style",f),g.appendChild(l)),y>A&&(A=y)),m.length&&
l.appendChild(n.createTextNode(m.join(" ").replace(/- /g,"-")));a.rotation=P}H++}}})}),x&&a.attr("title",a.textStr),u&&u.removeChild(g),l&&a.applyTextOutline&&a.applyTextOutline(l)):g.appendChild(n.createTextNode(c.replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))},getContrast:function(a){a=p(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,g,b,c,B,r,m,w,q){var H=this.label(a,g,b,q,null,null,null,null,"button"),E=0;H.attr(k({padding:8,r:2},B));var x,d,n,l;B=k({fill:"#f7f7f7",
stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},B);x=B.style;delete B.style;r=k(B,{fill:"#e6e6e6"},r);d=r.style;delete r.style;m=k(B,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},m);n=m.style;delete m.style;w=k(B,{style:{color:"#cccccc"}},w);l=w.style;delete w.style;G(H.element,e?"mouseover":"mouseenter",function(){3!==E&&H.setState(1)});G(H.element,e?"mouseout":"mouseleave",function(){3!==E&&H.setState(E)});H.setState=function(a){1!==a&&
(H.state=E=a);H.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);H.attr([B,r,m,w][a||0]).css([x,d,n,l][a||0])};H.attr(B).css(t({cursor:"default"},x));return H.on("click",function(a){3!==E&&c.call(H,a)})},crispLine:function(a,g){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-g%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+g%2/2);return a},path:function(a){var g={fill:"none"};z(a)?g.d=a:r(a)&&t(g,a);return this.createElement("path").attr(g)},
circle:function(a,g,e){a=r(a)?a:{x:a,y:g,r:e};g=this.createElement("circle");g.xSetter=g.ySetter=function(a,g,e){e.setAttribute("c"+g,a)};return g.attr(a)},arc:function(a,g,e,b,k,c){r(a)&&(g=a.y,e=a.r,b=a.innerR,k=a.start,c=a.end,a=a.x);a=this.symbol("arc",a||0,g||0,e||0,e||0,{innerR:b||0,start:k||0,end:c||0});a.r=e;return a},rect:function(a,g,e,b,k,c){k=r(a)?a.r:k;var B=this.createElement("rect");a=r(a)?a:void 0===a?{}:{x:a,y:g,width:Math.max(e,0),height:Math.max(b,0)};void 0!==c&&(a.strokeWidth=
c,a=B.crisp(a));a.fill="none";k&&(a.r=k);B.rSetter=function(a,g,e){h(e,{rx:a,ry:a})};return B.attr(a)},setSize:function(a,g,e){var b=this.alignedObjects,k=b.length;this.width=a;this.height=g;for(this.boxWrapper.animate({width:a,height:g},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:K(e,!0)?void 0:0});k--;)b[k].align()},g:function(a){var g=this.createElement("g");return a?g.attr({"class":"highcharts-"+a}):g},image:function(a,g,e,b,k){var c={preserveAspectRatio:"none"};
1<arguments.length&&t(c,{x:g,y:e,width:b,height:k});c=this.createElement("image").attr(c);c.element.setAttributeNS?c.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):c.element.setAttribute("hc-svg-href",a);return c},symbol:function(a,g,e,b,k,c){var B=this,r,H=this.symbols[a],m=u(g)&&H&&H(Math.round(g),Math.round(e),b,k,c),w=/^url\((.*?)\)$/,q,x;H?(r=this.path(m),r.attr("fill","none"),t(r,{symbolName:a,x:g,y:e,width:b,height:k}),c&&t(r,c)):w.test(a)&&(q=a.match(w)[1],r=this.image(q),
r.imgwidth=K(M[q]&&M[q].width,c&&c.width),r.imgheight=K(M[q]&&M[q].height,c&&c.height),x=function(){r.attr({width:r.width,height:r.height})},y(["width","height"],function(a){r[a+"Setter"]=function(a,g){var e={},b=this["img"+g],k="width"===g?"translateX":"translateY";this[g]=a;u(b)&&(this.element&&this.element.setAttribute(g,b),this.alignByTranslate||(e[k]=((this[g]||0)-b)/2,this.attr(e)))}}),u(g)&&r.attr({x:g,y:e}),r.isImg=!0,u(r.imgwidth)&&u(r.imgheight)?x():(r.attr({width:0,height:0}),l("img",{onload:function(){var a=
f[B.chartIndex];0===this.width&&(v(this,{position:"absolute",top:"-999em"}),n.body.appendChild(this));M[q]={width:this.width,height:this.height};r.imgwidth=this.width;r.imgheight=this.height;r.element&&x();this.parentNode&&this.parentNode.removeChild(this);B.imgCount--;if(!B.imgCount&&a&&a.onload)a.onload()},src:q}),this.imgCount++));return r},symbols:{circle:function(a,g,e,b){var k=.166*e;return["M",a+e/2,g,"C",a+e+k,g,a+e+k,g+b,a+e/2,g+b,"C",a-k,g+b,a-k,g,a+e/2,g,"Z"]},square:function(a,g,e,b){return["M",
a,g,"L",a+e,g,a+e,g+b,a,g+b,"Z"]},triangle:function(a,g,e,b){return["M",a+e/2,g,"L",a+e,g+b,a,g+b,"Z"]},"triangle-down":function(a,g,e,b){return["M",a,g,"L",a+e,g,a+e/2,g+b,"Z"]},diamond:function(a,g,e,b){return["M",a+e/2,g,"L",a+e,g+b/2,a+e/2,g+b,a,g+b/2,"Z"]},arc:function(a,g,e,b,k){var c=k.start;e=k.r||e||b;var B=k.end-.001;b=k.innerR;var r=k.open,m=Math.cos(c),H=Math.sin(c),w=Math.cos(B),B=Math.sin(B);k=k.end-c<Math.PI?0:1;return["M",a+e*m,g+e*H,"A",e,e,0,k,1,a+e*w,g+e*B,r?"M":"L",a+b*w,g+b*B,
"A",b,b,0,k,0,a+b*m,g+b*H,r?"":"Z"]},callout:function(a,g,e,b,k){var c=Math.min(k&&k.r||0,e,b),B=c+6,r=k&&k.anchorX;k=k&&k.anchorY;var m;m=["M",a+c,g,"L",a+e-c,g,"C",a+e,g,a+e,g,a+e,g+c,"L",a+e,g+b-c,"C",a+e,g+b,a+e,g+b,a+e-c,g+b,"L",a+c,g+b,"C",a,g+b,a,g+b,a,g+b-c,"L",a,g+c,"C",a,g,a,g,a+c,g];r&&r>e?k>g+B&&k<g+b-B?m.splice(13,3,"L",a+e,k-6,a+e+6,k,a+e,k+6,a+e,g+b-c):m.splice(13,3,"L",a+e,b/2,r,k,a+e,b/2,a+e,g+b-c):r&&0>r?k>g+B&&k<g+b-B?m.splice(33,3,"L",a,k+6,a-6,k,a,k-6,a,g+c):m.splice(33,3,"L",
a,b/2,r,k,a,b/2,a,g+c):k&&k>b&&r>a+B&&r<a+e-B?m.splice(23,3,"L",r+6,g+b,r,g+b+6,r-6,g+b,a+c,g+b):k&&0>k&&r>a+B&&r<a+e-B&&m.splice(3,3,"L",r-6,g,r,g-6,r+6,g,e-c,g);return m}},clipRect:function(g,e,b,k){var c=a.uniqueKey(),B=this.createElement("clipPath").attr({id:c}).add(this.defs);g=this.rect(g,e,b,k,0).add(B);g.id=c;g.clipPath=B;g.count=0;return g},text:function(a,g,e,b){var k=!B&&this.forExport,c={};if(b&&(this.allowHTML||!this.forExport))return this.html(a,g,e);c.x=Math.round(g||0);e&&(c.y=Math.round(e));
if(a||0===a)c.text=a;a=this.createElement("text").attr(c);k&&a.css({position:"absolute"});b||(a.xSetter=function(a,g,e){var b=e.getElementsByTagName("tspan"),k,c=e.getAttribute(g),B;for(B=0;B<b.length;B++)k=b[B],k.getAttribute(g)===c&&k.setAttribute(g,a);e.setAttribute(g,a)});return a},fontMetrics:function(a,g){a=a||g&&g.style&&g.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?J(a):/em/.test(a)?parseFloat(a)*(g?this.fontMetrics(null,g.parentNode).f:16):12;g=24>a?a+3:Math.round(1.2*
a);return{h:g,b:Math.round(.8*g),f:a}},rotCorr:function(a,g,e){var b=a;g&&e&&(b=Math.max(b*Math.cos(g*d),4));return{x:-a/3*Math.sin(g*d),y:b}},label:function(a,g,e,b,c,B,r,m,w){var q=this,x=q.g("button"!==w&&"label"),d=x.text=q.text("",0,0,r).attr({zIndex:1}),H,n,l=0,A=3,z=0,F,f,K,p,J,h={},M,S,E=/^url\((.*?)\)$/.test(b),v=E,P,R,O,Q;w&&x.addClass("highcharts-"+w);v=E;P=function(){return(M||0)%2/2};R=function(){var a=d.element.style,g={};n=(void 0===F||void 0===f||J)&&u(d.textStr)&&d.getBBox();x.width=
(F||n.width||0)+2*A+z;x.height=(f||n.height||0)+2*A;S=A+q.fontMetrics(a&&a.fontSize,d).b;v&&(H||(x.box=H=q.symbols[b]||E?q.symbol(b):q.rect(),H.addClass(("button"===w?"":"highcharts-label-box")+(w?" highcharts-"+w+"-box":"")),H.add(x),a=P(),g.x=a,g.y=(m?-S:0)+a),g.width=Math.round(x.width),g.height=Math.round(x.height),H.attr(t(g,h)),h={})};O=function(){var a=z+A,g;g=m?0:S;u(F)&&n&&("center"===J||"right"===J)&&(a+={center:.5,right:1}[J]*(F-n.width));if(a!==d.x||g!==d.y)d.attr("x",a),void 0!==g&&d.attr("y",
g);d.x=a;d.y=g};Q=function(a,g){H?H.attr(a,g):h[a]=g};x.onAdd=function(){d.add(x);x.attr({text:a||0===a?a:"",x:g,y:e});H&&u(c)&&x.attr({anchorX:c,anchorY:B})};x.widthSetter=function(a){F=a};x.heightSetter=function(a){f=a};x["text-alignSetter"]=function(a){J=a};x.paddingSetter=function(a){u(a)&&a!==A&&(A=x.padding=a,O())};x.paddingLeftSetter=function(a){u(a)&&a!==z&&(z=a,O())};x.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==l&&(l=a,n&&x.attr({x:K}))};x.textSetter=function(a){void 0!==
a&&d.textSetter(a);R();O()};x["stroke-widthSetter"]=function(a,g){a&&(v=!0);M=this["stroke-width"]=a;Q(g,a)};x.strokeSetter=x.fillSetter=x.rSetter=function(a,g){"fill"===g&&a&&(v=!0);Q(g,a)};x.anchorXSetter=function(a,g){c=a;Q(g,Math.round(a)-P()-K)};x.anchorYSetter=function(a,g){B=a;Q(g,a-p)};x.xSetter=function(a){x.x=a;l&&(a-=l*((F||n.width)+2*A));K=Math.round(a);x.attr("translateX",K)};x.ySetter=function(a){p=x.y=Math.round(a);x.attr("translateY",p)};var V=x.css;return t(x,{css:function(a){if(a){var g=
{};a=k(a);y(x.textProps,function(e){void 0!==a[e]&&(g[e]=a[e],delete a[e])});d.css(g)}return V.call(x,a)},getBBox:function(){return{width:n.width+2*A,height:n.height+2*A,x:n.x-A,y:n.y-A}},shadow:function(a){a&&(R(),H&&H.shadow(a));return x},destroy:function(){N(x.element,"mouseenter");N(x.element,"mouseleave");d&&(d=d.destroy());H&&(H=H.destroy());D.prototype.destroy.call(x);x=q=R=O=Q=null}})}};a.Renderer=C})(L);(function(a){var D=a.attr,C=a.createElement,G=a.css,I=a.defined,h=a.each,f=a.extend,p=
a.isFirefox,v=a.isMS,l=a.isWebKit,u=a.pInt,d=a.SVGRenderer,c=a.win,n=a.wrap;f(a.SVGElement.prototype,{htmlCss:function(a){var c=this.element;if(c=a&&"SPAN"===c.tagName&&a.width)delete a.width,this.textWidth=c,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=f(this.styles,a);G(this.element,a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position="absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,
height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,c=this.element,m=this.translateX||0,b=this.translateY||0,q=this.x||0,d=this.y||0,n=this.textAlign||"left",e={left:0,center:.5,right:1}[n],r=this.styles;G(c,{marginLeft:m,marginTop:b});this.shadows&&h(this.shadows,function(a){G(a,{marginLeft:m+1,marginTop:b+1})});this.inverted&&h(c.childNodes,function(e){a.invertChild(e,c)});if("SPAN"===c.tagName){var x=this.rotation,A=u(this.textWidth),k=r&&r.whiteSpace,w=[x,
n,c.innerHTML,this.textWidth,this.textAlign].join();w!==this.cTT&&(r=a.fontMetrics(c.style.fontSize).b,I(x)&&this.setSpanRotation(x,e,r),G(c,{width:"",whiteSpace:k||"nowrap"}),c.offsetWidth>A&&/[ \-]/.test(c.textContent||c.innerText)&&G(c,{width:A+"px",display:"block",whiteSpace:k||"normal"}),this.getSpanCorrection(c.offsetWidth,r,e,x,n));G(c,{left:q+(this.xCorr||0)+"px",top:d+(this.yCorr||0)+"px"});l&&(r=c.offsetHeight);this.cTT=w}}else this.alignOnAdd=!0},setSpanRotation:function(a,d,m){var b={},
q=v?"-ms-transform":l?"-webkit-transform":p?"MozTransform":c.opera?"-o-transform":"";b[q]=b.transform="rotate("+a+"deg)";b[q+(p?"Origin":"-origin")]=b.transformOrigin=100*d+"% "+m+"px";G(this.element,b)},getSpanCorrection:function(a,c,m){this.xCorr=-a*m;this.yCorr=-c}});f(d.prototype,{html:function(a,c,m){var b=this.createElement("span"),q=b.element,d=b.renderer,l=d.isSVG,e=function(a,e){h(["opacity","visibility"],function(b){n(a,b+"Setter",function(a,b,c,r){a.call(this,b,c,r);e[c]=b})})};b.textSetter=
function(a){a!==q.innerHTML&&delete this.bBox;q.innerHTML=this.textStr=a;b.htmlUpdateTransform()};l&&e(b,b.element.style);b.xSetter=b.ySetter=b.alignSetter=b.rotationSetter=function(a,e){"align"===e&&(e="textAlign");b[e]=a;b.htmlUpdateTransform()};b.attr({text:a,x:Math.round(c),y:Math.round(m)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});q.style.whiteSpace="nowrap";b.css=b.htmlCss;l&&(b.add=function(a){var c,r=d.box.parentNode,k=[];if(this.parentGroup=
a){if(c=a.div,!c){for(;a;)k.push(a),a=a.parentGroup;h(k.reverse(),function(a){var m,x=D(a.element,"class");x&&(x={className:x});c=a.div=a.div||C("div",x,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},c||r);m=c.style;f(a,{on:function(){b.on.apply({element:k[0].div},arguments);return a},translateXSetter:function(e,g){m.left=e+"px";a[g]=e;a.doTransform=!0},translateYSetter:function(e,g){m.top=
e+"px";a[g]=e;a.doTransform=!0}});e(a,m)})}}else c=r;c.appendChild(q);b.added=!0;b.alignOnAdd&&b.htmlUpdateTransform();return b});return b}})})(L);(function(a){var D,C,G=a.createElement,I=a.css,h=a.defined,f=a.deg2rad,p=a.discardElement,v=a.doc,l=a.each,u=a.erase,d=a.extend;D=a.extendClass;var c=a.isArray,n=a.isNumber,y=a.isObject,t=a.merge;C=a.noop;var m=a.pick,b=a.pInt,q=a.SVGElement,z=a.SVGRenderer,F=a.win;a.svg||(C={docMode8:v&&8===v.documentMode,init:function(a,b){var e=["\x3c",b,' filled\x3d"f" stroked\x3d"f"'],
c=["position: ","absolute",";"],k="div"===b;("shape"===b||k)&&c.push("left:0;top:0;width:1px;height:1px;");c.push("visibility: ",k?"hidden":"visible");e.push(' style\x3d"',c.join(""),'"/\x3e');b&&(e=k||"span"===b||"img"===b?e.join(""):a.prepVML(e),this.element=G(e));this.renderer=a},add:function(a){var e=this.renderer,b=this.element,c=e.box,k=a&&a.inverted,c=a?a.element||a:c;a&&(this.parentGroup=a);k&&e.invertChild(b,c);c.appendChild(b);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();
if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:q.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,b=Math.cos(a*f),c=Math.sin(a*f);I(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11\x3d",b,", M12\x3d",-c,", M21\x3d",c,", M22\x3d",b,", sizingMethod\x3d'auto expand')"].join(""):"none"})},getSpanCorrection:function(a,b,c,q,k){var e=q?Math.cos(q*f):1,r=q?Math.sin(q*f):0,x=m(this.elemHeight,this.element.offsetHeight),
d;this.xCorr=0>e&&-a;this.yCorr=0>r&&-x;d=0>e*r;this.xCorr+=r*b*(d?1-c:c);this.yCorr-=e*b*(q?d?c:1-c:1);k&&"left"!==k&&(this.xCorr-=a*c*(0>e?-1:1),q&&(this.yCorr-=x*c*(0>r?-1:1)),I(this.element,{textAlign:k}))},pathToVML:function(a){for(var e=a.length,b=[];e--;)n(a[e])?b[e]=Math.round(10*a[e])-5:"Z"===a[e]?b[e]="x":(b[e]=a[e],!a.isArc||"wa"!==a[e]&&"at"!==a[e]||(b[e+5]===b[e+7]&&(b[e+7]+=a[e+7]>a[e+5]?1:-1),b[e+6]===b[e+8]&&(b[e+8]+=a[e+8]>a[e+6]?1:-1)));return b.join(" ")||"x"},clip:function(a){var e=
this,b;a?(b=a.members,u(b,e),b.push(e),e.destroyClip=function(){u(b,e)},a=a.getCSS(e)):(e.destroyClip&&e.destroyClip(),a={clip:e.docMode8?"inherit":"rect(auto)"});return e.css(a)},css:q.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&p(a)},destroy:function(){this.destroyClip&&this.destroyClip();return q.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=F.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,c){var e;a=a.split(/[ ,]/);
e=a.length;if(9===e||11===e)a[e-4]=a[e-2]=b(a[e-2])-10*c;return a.join(" ")},shadow:function(a,c,q){var e=[],k,r=this.element,d=this.renderer,x,n=r.style,g,B=r.path,l,t,z,f;B&&"string"!==typeof B.value&&(B="x");t=B;if(a){z=m(a.width,3);f=(a.opacity||.15)/z;for(k=1;3>=k;k++)l=2*z+1-2*k,q&&(t=this.cutOffPath(B.value,l+.5)),g=['\x3cshape isShadow\x3d"true" strokeweight\x3d"',l,'" filled\x3d"false" path\x3d"',t,'" coordsize\x3d"10 10" style\x3d"',r.style.cssText,'" /\x3e'],x=G(d.prepVML(g),null,{left:b(n.left)+
m(a.offsetX,1),top:b(n.top)+m(a.offsetY,1)}),q&&(x.cutOff=l+1),g=['\x3cstroke color\x3d"',a.color||"#000000",'" opacity\x3d"',f*k,'"/\x3e'],G(d.prepVML(g),null,null,x),c?c.element.appendChild(x):r.parentNode.insertBefore(x,r),e.push(x);this.shadows=e}return this},updateShadows:C,setAttr:function(a,b){this.docMode8?this.element[a]=b:this.element.setAttribute(a,b)},classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,b,c){(c.getElementsByTagName("stroke")[0]||
G(this.renderer.prepVML(["\x3cstroke/\x3e"]),null,null,c))[b]=a||"solid";this[b]=a},dSetter:function(a,b,c){var e=this.shadows;a=a||[];this.d=a.join&&a.join(" ");c.path=a=this.pathToVML(a);if(e)for(c=e.length;c--;)e[c].path=e[c].cutOff?this.cutOffPath(a,e[c].cutOff):a;this.setAttr(b,a)},fillSetter:function(a,b,c){var e=c.nodeName;"SPAN"===e?c.style.color=a:"IMG"!==e&&(c.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,c,b,this)))},"fill-opacitySetter":function(a,b,c){G(this.renderer.prepVML(["\x3c",
b.split("-")[0],' opacity\x3d"',a,'"/\x3e']),null,null,c)},opacitySetter:C,rotationSetter:function(a,b,c){c=c.style;this[b]=c[b]=a;c.left=-Math.round(Math.sin(a*f)+1)+"px";c.top=Math.round(Math.cos(a*f))+"px"},strokeSetter:function(a,b,c){this.setAttr("strokecolor",this.renderer.color(a,c,b,this))},"stroke-widthSetter":function(a,b,c){c.stroked=!!a;this[b]=a;n(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,c){"inherit"===a&&
(a="visible");this.shadows&&l(this.shadows,function(c){c.style[b]=a});"DIV"===c.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(c.style[b]=a?"visible":"hidden"),b="top");c.style[b]=a},xSetter:function(a,b,c){this[b]=a;"x"===b?b="left":"y"===b&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):c.style[b]=a},zIndexSetter:function(a,b,c){c.style[b]=a}},C["stroke-opacitySetter"]=C["fill-opacitySetter"],a.VMLElement=C=D(q,C),C.prototype.ySetter=C.prototype.widthSetter=C.prototype.heightSetter=
C.prototype.xSetter,C={Element:C,isIE8:-1<F.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,b,c){var e,k;this.alignedObjects=[];e=this.createElement("div").css({position:"relative"});k=e.element;a.appendChild(e.element);this.isVML=!0;this.box=k;this.boxWrapper=e;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);if(!v.namespaces.hcv){v.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{v.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(w){v.styleSheets[0].cssText+=
"hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,m){var e=this.createElement(),r=y(a);return d(e,{members:[],count:0,left:(r?a.x:a)+1,top:(r?a.y:b)+1,width:(r?a.width:c)-1,height:(r?a.height:m)-1,getCSS:function(a){var b=a.element,c=b.nodeName,g=a.inverted,e=this.top-("shape"===c?b.offsetTop:0),k=this.left,b=k+this.width,m=e+this.height,e={clip:"rect("+Math.round(g?
k:e)+"px,"+Math.round(g?m:b)+"px,"+Math.round(g?b:m)+"px,"+Math.round(g?e:k)+"px)"};!g&&a.docMode8&&"DIV"===c&&d(e,{width:b+"px",height:m+"px"});return e},updateClipping:function(){l(e.members,function(a){a.element&&a.css(e.getCSS(a))})}})},color:function(b,c,m,q){var e=this,r,d=/^rgba/,n,x,g="none";b&&b.linearGradient?x="gradient":b&&b.radialGradient&&(x="pattern");if(x){var B,t,z=b.linearGradient||b.radialGradient,f,F,H,A,u,p="";b=b.stops;var h,y=[],v=function(){n=['\x3cfill colors\x3d"'+y.join(",")+
'" opacity\x3d"',H,'" o:opacity2\x3d"',F,'" type\x3d"',x,'" ',p,'focus\x3d"100%" method\x3d"any" /\x3e'];G(e.prepVML(n),null,null,c)};f=b[0];h=b[b.length-1];0<f[0]&&b.unshift([0,f[1]]);1>h[0]&&b.push([1,h[1]]);l(b,function(g,b){d.test(g[1])?(r=a.color(g[1]),B=r.get("rgb"),t=r.get("a")):(B=g[1],t=1);y.push(100*g[0]+"% "+B);b?(H=t,A=B):(F=t,u=B)});if("fill"===m)if("gradient"===x)m=z.x1||z[0]||0,b=z.y1||z[1]||0,f=z.x2||z[2]||0,z=z.y2||z[3]||0,p='angle\x3d"'+(90-180*Math.atan((z-b)/(f-m))/Math.PI)+'"',
v();else{var g=z.r,C=2*g,D=2*g,I=z.cx,U=z.cy,L=c.radialReference,T,g=function(){L&&(T=q.getBBox(),I+=(L[0]-T.x)/T.width-.5,U+=(L[1]-T.y)/T.height-.5,C*=L[2]/T.width,D*=L[2]/T.height);p='src\x3d"'+a.getOptions().global.VMLRadialGradientURL+'" size\x3d"'+C+","+D+'" origin\x3d"0.5,0.5" position\x3d"'+I+","+U+'" color2\x3d"'+u+'" ';v()};q.added?g():q.onAdd=g;g=A}else g=B}else d.test(b)&&"IMG"!==c.tagName?(r=a.color(b),q[m+"-opacitySetter"](r.get("a"),m,c),g=r.get("rgb")):(g=c.getElementsByTagName(m),
g.length&&(g[0].opacity=1,g[0].type="solid"),g=b);return g},prepVML:function(a){var b=this.isIE8;a=a.join("");b?(a=a.replace("/\x3e",' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'),a=-1===a.indexOf('style\x3d"')?a.replace("/\x3e",' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e'):a.replace('style\x3d"','style\x3d"display:inline-block;behavior:url(#default#VML);')):a=a.replace("\x3c","\x3chcv:");return a},text:z.prototype.html,path:function(a){var b={coordsize:"10 10"};c(a)?b.d=
a:y(a)&&d(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,c){var e=this.symbol("circle");y(a)&&(c=a.r,b=a.y,a=a.x);e.isCircle=!0;e.r=c;return e.attr({x:a,y:b})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(b)},image:function(a,b,c,m,k){var e=this.createElement("img").attr({src:a});1<arguments.length&&e.attr({x:b,y:c,width:m,height:k});return e},createElement:function(a){return"rect"===a?this.symbol(a):z.prototype.createElement.call(this,
a)},invertChild:function(a,c){var e=this;c=c.style;var m="IMG"===a.tagName&&a.style;I(a,{flip:"x",left:b(c.width)-(m?b(m.top):1),top:b(c.height)-(m?b(m.left):1),rotation:-90});l(a.childNodes,function(b){e.invertChild(b,a)})},symbols:{arc:function(a,b,c,m,k){var e=k.start,q=k.end,d=k.r||c||m;c=k.innerR;m=Math.cos(e);var r=Math.sin(e),g=Math.cos(q),B=Math.sin(q);if(0===q-e)return["x"];e=["wa",a-d,b-d,a+d,b+d,a+d*m,b+d*r,a+d*g,b+d*B];k.open&&!c&&e.push("e","M",a,b);e.push("at",a-c,b-c,a+c,b+c,a+c*g,
b+c*B,a+c*m,b+c*r,"x","e");e.isArc=!0;return e},circle:function(a,b,c,m,k){k&&h(k.r)&&(c=m=2*k.r);k&&k.isCircle&&(a-=c/2,b-=m/2);return["wa",a,b,a+c,b+m,a+c,b+m/2,a+c,b+m/2,"e"]},rect:function(a,b,c,m,k){return z.prototype.symbols[h(k)&&k.r?"callout":"square"].call(0,a,b,c,m,k)}}},a.VMLRenderer=D=function(){this.init.apply(this,arguments)},D.prototype=t(z.prototype,C),a.Renderer=D);z.prototype.measureSpanWidth=function(a,b){var c=v.createElement("span");a=v.createTextNode(a);c.appendChild(a);I(c,
b);this.box.appendChild(c);b=c.offsetWidth;p(c);return b}})(L);(function(a){function D(){var h=a.defaultOptions.global,l,u=h.useUTC,d=u?"getUTC":"get",c=u?"setUTC":"set";a.Date=l=h.Date||p.Date;l.hcTimezoneOffset=u&&h.timezoneOffset;l.hcGetTimezoneOffset=u&&h.getTimezoneOffset;l.hcMakeTime=function(a,c,d,m,b,q){var n;u?(n=l.UTC.apply(0,arguments),n+=I(n)):n=(new l(a,c,f(d,1),f(m,0),f(b,0),f(q,0))).getTime();return n};G("Minutes Hours Day Date Month FullYear".split(" "),function(a){l["hcGet"+a]=d+
a});G("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){l["hcSet"+a]=c+a})}var C=a.color,G=a.each,I=a.getTZOffset,h=a.merge,f=a.pick,p=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,VMLRadialGradientURL:"http://code.highcharts.com/5.0.6/gfx/vml-radial-gradient.png"},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",
backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold"},itemHoverStyle:{color:"#000000"},
itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",
minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:C("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,style:{color:"#333333",cursor:"default",
fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(f){a.defaultOptions=h(!0,a.defaultOptions,f);D();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;D()})(L);(function(a){var D=a.arrayMax,C=a.arrayMin,G=a.defined,
I=a.destroyObjectProperties,h=a.each,f=a.erase,p=a.merge,v=a.pick;a.PlotLineOrBand=function(a,f){this.axis=a;f&&(this.options=f,this.id=f.id)};a.PlotLineOrBand.prototype={render:function(){var a=this,f=a.axis,d=f.horiz,c=a.options,n=c.label,h=a.label,t=c.to,m=c.from,b=c.value,q=G(m)&&G(t),z=G(b),F=a.svgElem,e=!F,r=[],x,A=c.color,k=v(c.zIndex,0),w=c.events,r={"class":"highcharts-plot-"+(q?"band ":"line ")+(c.className||"")},K={},J=f.chart.renderer,N=q?"bands":"lines",g=f.log2lin;f.isLog&&(m=g(m),t=
g(t),b=g(b));z?(r={stroke:A,"stroke-width":c.width},c.dashStyle&&(r.dashstyle=c.dashStyle)):q&&(A&&(r.fill=A),c.borderWidth&&(r.stroke=c.borderColor,r["stroke-width"]=c.borderWidth));K.zIndex=k;N+="-"+k;(A=f[N])||(f[N]=A=J.g("plot-"+N).attr(K).add());e&&(a.svgElem=F=J.path().attr(r).add(A));if(z)r=f.getPlotLinePath(b,F.strokeWidth());else if(q)r=f.getPlotBandPath(m,t,c);else return;if(e&&r&&r.length){if(F.attr({d:r}),w)for(x in c=function(g){F.on(g,function(b){w[g].apply(a,[b])})},w)c(x)}else F&&
(r?(F.show(),F.animate({d:r})):(F.hide(),h&&(a.label=h=h.destroy())));n&&G(n.text)&&r&&r.length&&0<f.width&&0<f.height&&!r.flat?(n=p({align:d&&q&&"center",x:d?!q&&4:10,verticalAlign:!d&&q&&"middle",y:d?q?16:10:q?6:-4,rotation:d&&!q&&90},n),this.renderLabel(n,r,q,k)):h&&h.hide();return a},renderLabel:function(a,f,d,c){var n=this.label,l=this.axis.chart.renderer;n||(n={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(d?"band":"line")+"-label "+(a.className||"")},n.zIndex=c,
this.label=n=l.text(a.text,0,0,a.useHTML).attr(n).add(),n.css(a.style));c=[f[1],f[4],d?f[6]:f[1]];f=[f[2],f[5],d?f[7]:f[2]];d=C(c);l=C(f);n.align(a,!1,{x:d,y:l,width:D(c)-d,height:D(f)-l});n.show()},destroy:function(){f(this.axis.plotLinesAndBands,this);delete this.axis;I(this)}};a.AxisPlotLineOrBandExtension={getPlotBandPath:function(a,f){f=this.getPlotLinePath(f,null,null,!0);(a=this.getPlotLinePath(a,null,null,!0))&&f?(a.flat=a.toString()===f.toString(),a.push(f[4],f[5],f[1],f[2],"z")):a=null;
return a},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(f,h){var d=(new a.PlotLineOrBand(this,f)).render(),c=this.userOptions;d&&(h&&(c[h]=c[h]||[],c[h].push(f)),this.plotLinesAndBands.push(d));return d},removePlotBandOrLine:function(a){for(var l=this.plotLinesAndBands,d=this.options,c=this.userOptions,n=l.length;n--;)l[n].id===a&&l[n].destroy();h([d.plotLines||[],c.plotLines||
[],d.plotBands||[],c.plotBands||[]],function(c){for(n=c.length;n--;)c[n].id===a&&f(c,c[n])})}}})(L);(function(a){var D=a.correctFloat,C=a.defined,G=a.destroyObjectProperties,I=a.isNumber,h=a.merge,f=a.pick,p=a.deg2rad;a.Tick=function(a,f,h,d){this.axis=a;this.pos=f;this.type=h||"";this.isNew=!0;h||d||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,l=a.options,p=a.chart,d=a.categories,c=a.names,n=this.pos,y=l.labels,t=a.tickPositions,m=n===t[0],b=n===t[t.length-1],c=d?f(d[n],
c[n],n):n,d=this.label,t=t.info,q;a.isDatetimeAxis&&t&&(q=l.dateTimeLabelFormats[t.higherRanks[n]||t.unitName]);this.isFirst=m;this.isLast=b;l=a.labelFormatter.call({axis:a,chart:p,isFirst:m,isLast:b,dateTimeLabelFormat:q,value:a.isLog?D(a.lin2log(c)):c});C(d)?d&&d.attr({text:l}):(this.labelLength=(this.label=d=C(l)&&y.enabled?p.renderer.text(l,0,0,y.useHTML).css(h(y.style)).add(a.labelGroup):null)&&d.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?
"height":"width"]:0},handleOverflow:function(a){var l=this.axis,h=a.x,d=l.chart.chartWidth,c=l.chart.spacing,n=f(l.labelLeft,Math.min(l.pos,c[3])),c=f(l.labelRight,Math.max(l.pos+l.len,d-c[1])),y=this.label,t=this.rotation,m={left:0,center:.5,right:1}[l.labelAlign],b=y.getBBox().width,q=l.getSlotWidth(),z=q,F=1,e,r={};if(t)0>t&&h-m*b<n?e=Math.round(h/Math.cos(t*p)-n):0<t&&h+m*b>c&&(e=Math.round((d-h)/Math.cos(t*p)));else if(d=h+(1-m)*b,h-m*b<n?z=a.x+z*(1-m)-n:d>c&&(z=c-a.x+z*m,F=-1),z=Math.min(q,
z),z<q&&"center"===l.labelAlign&&(a.x+=F*(q-z-m*(q-Math.min(b,z)))),b>z||l.autoRotation&&(y.styles||{}).width)e=z;e&&(r.width=e,(l.options.labels.style||{}).textOverflow||(r.textOverflow="ellipsis"),y.css(r))},getPosition:function(a,f,h,d){var c=this.axis,n=c.chart,l=d&&n.oldChartHeight||n.chartHeight;return{x:a?c.translate(f+h,null,null,d)+c.transB:c.left+c.offset+(c.opposite?(d&&n.oldChartWidth||n.chartWidth)-c.right-c.left:0),y:a?l-c.bottom+c.offset-(c.opposite?c.height:0):l-c.translate(f+h,null,
null,d)-c.transB}},getLabelPosition:function(a,f,h,d,c,n,y,t){var m=this.axis,b=m.transA,q=m.reversed,z=m.staggerLines,l=m.tickRotCorr||{x:0,y:0},e=c.y;C(e)||(e=0===m.side?h.rotation?-8:-h.getBBox().height:2===m.side?l.y+8:Math.cos(h.rotation*p)*(l.y-h.getBBox(!1,0).height/2));a=a+c.x+l.x-(n&&d?n*b*(q?-1:1):0);f=f+e-(n&&!d?n*b*(q?1:-1):0);z&&(h=y/(t||1)%z,m.opposite&&(h=z-h-1),f+=m.labelOffset/z*h);return{x:a,y:Math.round(f)}},getMarkPath:function(a,f,h,d,c,n){return n.crispLine(["M",a,f,"L",a+(c?
0:-h),f+(c?h:0)],d)},render:function(a,l,h){var d=this.axis,c=d.options,n=d.chart.renderer,p=d.horiz,t=this.type,m=this.label,b=this.pos,q=c.labels,z=this.gridLine,F=t?t+"Tick":"tick",e=d.tickSize(F),r=this.mark,x=!r,A=q.step,k={},w=!0,K=d.tickmarkOffset,J=this.getPosition(p,b,K,l),u=J.x,J=J.y,g=p&&u===d.pos+d.len||!p&&J===d.pos?-1:1,B=t?t+"Grid":"grid",S=c[B+"LineWidth"],M=c[B+"LineColor"],v=c[B+"LineDashStyle"],B=f(c[F+"Width"],!t&&d.isXAxis?1:0),F=c[F+"Color"];h=f(h,1);this.isActive=!0;z||(k.stroke=
M,k["stroke-width"]=S,v&&(k.dashstyle=v),t||(k.zIndex=1),l&&(k.opacity=0),this.gridLine=z=n.path().attr(k).addClass("highcharts-"+(t?t+"-":"")+"grid-line").add(d.gridGroup));if(!l&&z&&(b=d.getPlotLinePath(b+K,z.strokeWidth()*g,l,!0)))z[this.isNew?"attr":"animate"]({d:b,opacity:h});e&&(d.opposite&&(e[0]=-e[0]),x&&(this.mark=r=n.path().addClass("highcharts-"+(t?t+"-":"")+"tick").add(d.axisGroup),r.attr({stroke:F,"stroke-width":B})),r[x?"attr":"animate"]({d:this.getMarkPath(u,J,e[0],r.strokeWidth()*
g,p,n),opacity:h}));m&&I(u)&&(m.xy=J=this.getLabelPosition(u,J,m,p,q,K,a,A),this.isFirst&&!this.isLast&&!f(c.showFirstLabel,1)||this.isLast&&!this.isFirst&&!f(c.showLastLabel,1)?w=!1:!p||d.isRadial||q.step||q.rotation||l||0===h||this.handleOverflow(J),A&&a%A&&(w=!1),w&&I(J.y)?(J.opacity=h,m[this.isNew?"attr":"animate"](J)):m.attr("y",-9999),this.isNew=!1)},destroy:function(){G(this,this.axis)}}})(L);(function(a){var D=a.addEvent,C=a.animObject,G=a.arrayMax,I=a.arrayMin,h=a.AxisPlotLineOrBandExtension,
f=a.color,p=a.correctFloat,v=a.defaultOptions,l=a.defined,u=a.deg2rad,d=a.destroyObjectProperties,c=a.each,n=a.extend,y=a.fireEvent,t=a.format,m=a.getMagnitude,b=a.grep,q=a.inArray,z=a.isArray,F=a.isNumber,e=a.isString,r=a.merge,x=a.normalizeTickInterval,A=a.pick,k=a.PlotLineOrBand,w=a.removeEvent,K=a.splat,J=a.syncTimeout,N=a.Tick;a.Axis=function(){this.init.apply(this,arguments)};a.Axis.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",
day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,
gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},
title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,b){var g=b.isX;this.chart=a;this.horiz=a.inverted?!g:g;this.isXAxis=g;this.coll=this.coll||(g?"xAxis":"yAxis");this.opposite=b.opposite;this.side=b.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(b);var c=this.options,e=c.type;this.labelFormatter=c.labels.formatter||this.defaultLabelFormatter;
this.userOptions=b;this.minPixelPadding=0;this.reversed=c.reversed;this.visible=!1!==c.visible;this.zoomEnabled=!1!==c.zoomEnabled;this.hasNames="category"===e||!0===c.categories;this.categories=c.categories||this.hasNames;this.names=this.names||[];this.isLog="logarithmic"===e;this.isDatetimeAxis="datetime"===e;this.isLinked=l(c.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=c.minRange||c.maxZoom;
this.range=c.range;this.offset=c.offset||0;this.stacks={};this.oldStacks={};this.stacksTouched=0;this.min=this.max=null;this.crosshair=A(c.crosshair,K(a.options.tooltip.crosshairs)[g?0:1],!1);var k;b=this.options.events;-1===q(this,a.axes)&&(g?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),a[this.coll].push(this));this.series=this.series||[];a.inverted&&g&&void 0===this.reversed&&(this.reversed=!0);this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(k in b)D(this,k,b[k]);
this.isLog&&(this.val2lin=this.log2lin,this.lin2val=this.lin2log)},setOptions:function(a){this.options=r(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],r(v[this.coll],a))},defaultLabelFormatter:function(){var g=this.axis,b=this.value,c=g.categories,e=this.dateTimeLabelFormat,k=v.lang,m=k.numericSymbols,k=k.numericSymbolMagnitude||1E3,q=m&&m.length,d,r=g.options.labels.format,
g=g.isLog?b:g.tickInterval;if(r)d=t(r,this);else if(c)d=b;else if(e)d=a.dateFormat(e,b);else if(q&&1E3<=g)for(;q--&&void 0===d;)c=Math.pow(k,q+1),g>=c&&0===10*b%c&&null!==m[q]&&0!==b&&(d=a.numberFormat(b/c,-1)+m[q]);void 0===d&&(d=1E4<=Math.abs(b)?a.numberFormat(b,-1):a.numberFormat(b,-1,void 0,""));return d},getSeriesExtremes:function(){var a=this,e=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();c(a.series,function(g){if(g.visible||
!e.options.chart.ignoreHiddenSeries){var c=g.options,k=c.threshold,B;a.hasVisibleSeries=!0;a.isLog&&0>=k&&(k=null);if(a.isXAxis)c=g.xData,c.length&&(g=I(c),F(g)||g instanceof Date||(c=b(c,function(a){return F(a)}),g=I(c)),a.dataMin=Math.min(A(a.dataMin,c[0]),g),a.dataMax=Math.max(A(a.dataMax,c[0]),G(c)));else if(g.getExtremes(),B=g.dataMax,g=g.dataMin,l(g)&&l(B)&&(a.dataMin=Math.min(A(a.dataMin,g),g),a.dataMax=Math.max(A(a.dataMax,B),B)),l(k)&&(a.threshold=k),!c.softThreshold||a.isLog)a.softThreshold=
!1}})},translate:function(a,b,c,e,k,m){var g=this.linkedParent||this,B=1,q=0,d=e?g.oldTransA:g.transA;e=e?g.oldMin:g.min;var r=g.minPixelPadding;k=(g.isOrdinal||g.isBroken||g.isLog&&k)&&g.lin2val;d||(d=g.transA);c&&(B*=-1,q=g.len);g.reversed&&(B*=-1,q-=B*(g.sector||g.len));b?(a=(a*B+q-r)/d+e,k&&(a=g.lin2val(a))):(k&&(a=g.val2lin(a)),a=B*(a-e)*d+q+B*r+(F(m)?d*m:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-
(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,e,k){var g=this.chart,B=this.left,m=this.top,q,d,r=c&&g.oldChartHeight||g.chartHeight,n=c&&g.oldChartWidth||g.chartWidth,f;q=this.transB;var w=function(a,g,b){if(a<g||a>b)e?a=Math.min(Math.max(g,a),b):f=!0;return a};k=A(k,this.translate(a,null,null,c));a=c=Math.round(k+q);q=d=Math.round(r-k-q);F(k)?this.horiz?(q=m,d=r-this.bottom,a=c=w(a,B,B+this.width)):(a=B,c=n-this.right,q=d=w(q,m,m+this.height)):f=!0;return f&&!e?null:g.renderer.crispLine(["M",
a,q,"L",c,d],b||1)},getLinearTickPositions:function(a,b,c){var g,k=p(Math.floor(b/a)*a),e=p(Math.ceil(c/a)*a),B=[];if(b===c&&F(b))return[b];for(b=k;b<=e;){B.push(b);b=p(b+a);if(b===g)break;g=b}return B},getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,c=this.minorTickInterval,k=[],e,m=this.pointRangePadding||0;e=this.min-m;var m=this.max+m,q=m-e;if(q&&q/c<this.len/3)if(this.isLog)for(m=b.length,e=1;e<m;e++)k=k.concat(this.getLogTickPositions(c,b[e-1],b[e],!0));else if(this.isDatetimeAxis&&
"auto"===a.minorTickInterval)k=k.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c),e,m,a.startOfWeek));else for(b=e+(b[0]-e)%c;b<=m&&b!==k[0];b+=c)k.push(b);0!==k.length&&this.trimTicks(k,a.startOnTick,a.endOnTick);return k},adjustForMinRange:function(){var a=this.options,b=this.min,k=this.max,e,m=this.dataMax-this.dataMin>=this.minRange,q,d,r,f,n,w;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(l(a.min)||l(a.max)?this.minRange=null:(c(this.series,function(a){f=a.xData;for(d=n=a.xIncrement?
1:f.length-1;0<d;d--)if(r=f[d]-f[d-1],void 0===q||r<q)q=r}),this.minRange=Math.min(5*q,this.dataMax-this.dataMin)));k-b<this.minRange&&(w=this.minRange,e=(w-k+b)/2,e=[b-e,A(a.min,b-e)],m&&(e[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=G(e),k=[b+w,A(a.max,b+w)],m&&(k[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),k=I(k),k-b<w&&(e[0]=k-w,e[1]=A(a.min,k-w),b=G(e)));this.min=b;this.max=k},getClosest:function(){var a;this.categories?a=1:c(this.series,function(b){var g=b.closestPointRange,
c=b.visible||!b.chart.options.chart.ignoreHiddenSeries;!b.noSharedTooltip&&l(g)&&c&&(a=l(a)?Math.min(a,g):g)});return a},nameToX:function(a){var b=z(this.categories),g=b?this.categories:this.names,c=a.options.x,k;a.series.requireSorting=!1;l(c)||(c=!1===this.options.uniqueNames?a.series.autoIncrement():q(a.name,g));-1===c?b||(k=g.length):k=c;this.names[k]=a.name;return k},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=void 0,c(this.series||[],function(b){b.xIncrement=
null;if(!b.points||b.isDirtyData)b.processData(),b.generatePoints();c(b.points,function(g,c){var k;g.options&&void 0===g.options.x&&(k=a.nameToX(g),k!==g.x&&(g.x=k,b.xData[c]=k))})}))},setAxisTranslation:function(a){var b=this,g=b.max-b.min,k=b.axisPointRange||0,m,q=0,d=0,r=b.linkedParent,f=!!b.categories,n=b.transA,w=b.isXAxis;if(w||f||k)m=b.getClosest(),r?(q=r.minPointOffset,d=r.pointRangePadding):c(b.series,function(a){var g=f?1:w?A(a.options.pointRange,m,0):b.axisPointRange||0;a=a.options.pointPlacement;
k=Math.max(k,g);b.single||(q=Math.max(q,e(a)?0:g/2),d=Math.max(d,"on"===a?0:g))}),r=b.ordinalSlope&&m?b.ordinalSlope/m:1,b.minPointOffset=q*=r,b.pointRangePadding=d*=r,b.pointRange=Math.min(k,g),w&&(b.closestPointRange=m);a&&(b.oldTransA=n);b.translationSlope=b.transA=n=b.len/(g+d||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=n*q},minFromRange:function(){return this.max-this.range},setTickInterval:function(b){var g=this,k=g.chart,e=g.options,q=g.isLog,d=g.log2lin,r=g.isDatetimeAxis,f=g.isXAxis,
n=g.isLinked,w=e.maxPadding,t=e.minPadding,z=e.tickInterval,h=e.tickPixelInterval,K=g.categories,J=g.threshold,u=g.softThreshold,N,v,C,D;r||K||n||this.getTickAmount();C=A(g.userMin,e.min);D=A(g.userMax,e.max);n?(g.linkedParent=k[g.coll][e.linkedTo],k=g.linkedParent.getExtremes(),g.min=A(k.min,k.dataMin),g.max=A(k.max,k.dataMax),e.type!==g.linkedParent.options.type&&a.error(11,1)):(!u&&l(J)&&(g.dataMin>=J?(N=J,t=0):g.dataMax<=J&&(v=J,w=0)),g.min=A(C,N,g.dataMin),g.max=A(D,v,g.dataMax));q&&(!b&&0>=
Math.min(g.min,A(g.dataMin,g.min))&&a.error(10,1),g.min=p(d(g.min),15),g.max=p(d(g.max),15));g.range&&l(g.max)&&(g.userMin=g.min=C=Math.max(g.min,g.minFromRange()),g.userMax=D=g.max,g.range=null);y(g,"foundExtremes");g.beforePadding&&g.beforePadding();g.adjustForMinRange();!(K||g.axisPointRange||g.usePercentage||n)&&l(g.min)&&l(g.max)&&(d=g.max-g.min)&&(!l(C)&&t&&(g.min-=d*t),!l(D)&&w&&(g.max+=d*w));F(e.floor)?g.min=Math.max(g.min,e.floor):F(e.softMin)&&(g.min=Math.min(g.min,e.softMin));F(e.ceiling)?
g.max=Math.min(g.max,e.ceiling):F(e.softMax)&&(g.max=Math.max(g.max,e.softMax));u&&l(g.dataMin)&&(J=J||0,!l(C)&&g.min<J&&g.dataMin>=J?g.min=J:!l(D)&&g.max>J&&g.dataMax<=J&&(g.max=J));g.tickInterval=g.min===g.max||void 0===g.min||void 0===g.max?1:n&&!z&&h===g.linkedParent.options.tickPixelInterval?z=g.linkedParent.tickInterval:A(z,this.tickAmount?(g.max-g.min)/Math.max(this.tickAmount-1,1):void 0,K?1:(g.max-g.min)*h/Math.max(g.len,h));f&&!b&&c(g.series,function(a){a.processData(g.min!==g.oldMin||g.max!==
g.oldMax)});g.setAxisTranslation(!0);g.beforeSetTickPositions&&g.beforeSetTickPositions();g.postProcessTickInterval&&(g.tickInterval=g.postProcessTickInterval(g.tickInterval));g.pointRange&&!z&&(g.tickInterval=Math.max(g.pointRange,g.tickInterval));b=A(e.minTickInterval,g.isDatetimeAxis&&g.closestPointRange);!z&&g.tickInterval<b&&(g.tickInterval=b);r||q||z||(g.tickInterval=x(g.tickInterval,null,m(g.tickInterval),A(e.allowDecimals,!(.5<g.tickInterval&&5>g.tickInterval&&1E3<g.max&&9999>g.max)),!!this.tickAmount));
this.tickAmount||(g.tickInterval=g.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b,c=a.tickPositions,k=a.tickPositioner,e=a.startOnTick,m=a.endOnTick,q;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.tickPositions=b=c&&c.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,
a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,k&&(k=k.apply(this,[this.min,this.max])))&&(this.tickPositions=b=k);this.isLinked||(this.trimTicks(b,e,m),this.min===this.max&&l(this.min)&&!this.tickAmount&&(q=!0,this.min-=.5,this.max+=.5),this.single=q,c||k||this.adjustTickAmount())},
trimTicks:function(a,b,c){var g=a[0],k=a[a.length-1],e=this.minPointOffset||0;if(b)this.min=g;else for(;this.min-e>a[0];)a.shift();if(c)this.max=k;else for(;this.max+e<a[a.length-1];)a.pop();0===a.length&&l(g)&&a.push((k+g)/2)},alignToOthers:function(){var a={},b,k=this.options;!1===this.chart.options.chart.alignTicks||!1===k.alignTicks||this.isLog||c(this.chart[this.coll],function(g){var c=g.options,c=[g.horiz?c.left:c.top,c.width,c.height,c.pane].join();g.series.length&&(a[c]?b=!0:a[c]=1)});return b},
getTickAmount:function(){var a=this.options,b=a.tickAmount,c=a.tickPixelInterval;!l(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/c)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,k=this.finalTickAmt,e=b&&b.length;if(e<c){for(;b.length<c;)b.push(p(b[b.length-1]+a));this.transA*=(e-1)/(c-1);this.max=b[b.length-
1]}else e>c&&(this.tickInterval*=2,this.setTickPositions());if(l(k)){for(a=c=b.length;a--;)(3===k&&1===a%2||2>=k&&0<a&&a<c-1)&&b.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;c(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?
(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,k,e,m){var g=this,q=g.chart;k=A(k,!0);c(g.series,function(a){delete a.kdTree});m=n(m,{min:a,max:b});y(g,"setExtremes",m,function(){g.userMin=a;g.userMax=b;g.eventArgs=m;k&&q.redraw(e)})},zoom:function(a,
b){var g=this.dataMin,c=this.dataMax,k=this.options,e=Math.min(g,A(k.min,g)),k=Math.max(c,A(k.max,c));if(a!==this.min||b!==this.max)this.allowZoomOutside||(l(g)&&(a<e&&(a=e),a>k&&(a=k)),l(c)&&(b<e&&(b=e),b>k&&(b=k))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsetLeft||0,k=this.horiz,e=A(b.width,a.plotWidth-c+(b.offsetRight||0)),m=A(b.height,a.plotHeight),q=A(b.top,a.plotTop),b=A(b.left,
a.plotLeft+c),c=/%$/;c.test(m)&&(m=Math.round(parseFloat(m)/100*a.plotHeight));c.test(q)&&(q=Math.round(parseFloat(q)/100*a.plotHeight+a.plotTop));this.left=b;this.top=q;this.width=e;this.height=m;this.bottom=a.chartHeight-m-q;this.right=a.chartWidth-e-b;this.len=Math.max(k?e:m,0);this.pos=k?b:q},getExtremes:function(){var a=this.isLog,b=this.lin2log;return{min:a?p(b(this.min)):this.min,max:a?p(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},
getThreshold:function(a){var b=this.isLog,g=this.lin2log,c=b?g(this.min):this.min,b=b?g(this.max):this.max;null===a?a=c:c>a?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(A(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,g=b[a+"Length"],c=A(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(c&&g)return"inside"===b[a+"Position"]&&(g=-g),[g,c]},labelMetrics:function(){return this.chart.renderer.fontMetrics(this.options.labels.style&&
this.options.labels.style.fontSize,this.ticks[0]&&this.ticks[0].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,k=this.tickInterval,e=k,m=this.len/(((this.categories?1:0)+this.max-this.min)/k),q,d=a.rotation,r=this.labelMetrics(),f,n=Number.MAX_VALUE,w,t=function(a){a/=m||1;a=1<a?Math.ceil(a):1;return a*k};b?(w=!a.staggerLines&&!a.step&&(l(d)?[d]:m<A(a.autoRotationLimit,80)&&a.autoRotation))&&c(w,function(a){var b;if(a===d||a&&-90<=a&&90>=a)f=t(Math.abs(r.h/Math.sin(u*a))),b=f+
Math.abs(a/360),b<n&&(n=b,q=a,e=f)}):a.step||(e=t(r.h));this.autoRotation=w;this.labelRotation=A(q,d);return e},getSlotWidth:function(){var a=this.chart,b=this.horiz,c=this.options.labels,k=Math.max(this.tickPositions.length-(this.categories?0:1),1),e=a.margin[3];return b&&2>(c.step||0)&&!c.rotation&&(this.staggerLines||1)*a.plotWidth/k||!b&&(e&&e-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,k=this.tickPositions,m=this.ticks,q=this.options.labels,d=this.horiz,
f=this.getSlotWidth(),n=Math.max(1,Math.round(f-2*(q.padding||5))),w={},t=this.labelMetrics(),z=q.style&&q.style.textOverflow,h,l=0,x,F;e(q.rotation)||(w.rotation=q.rotation||0);c(k,function(a){(a=m[a])&&a.labelLength>l&&(l=a.labelLength)});this.maxLabelLength=l;if(this.autoRotation)l>n&&l>t.h?w.rotation=this.labelRotation:this.labelRotation=0;else if(f&&(h={width:n+"px"},!z))for(h.textOverflow="clip",x=k.length;!d&&x--;)if(F=k[x],n=m[F].label)n.styles&&"ellipsis"===n.styles.textOverflow?n.css({textOverflow:"clip"}):
m[F].labelLength>f&&n.css({width:f+"px"}),n.getBBox().height>this.len/k.length-(t.h-t.f)&&(n.specCss={textOverflow:"ellipsis"});w.rotation&&(h={width:(l>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},z||(h.textOverflow="ellipsis"));if(this.labelAlign=q.align||this.autoLabelAlign(this.labelRotation))w.align=this.labelAlign;c(k,function(a){var b=(a=m[a])&&a.label;b&&(b.attr(w),h&&b.css(r(h,b.specCss)),delete b.specCss,a.rotation=w.rotation)});this.tickRotCorr=b.rotCorr(t.b,this.labelRotation||
0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||l(this.min)&&l(this.max)&&!!this.tickPositions},addTitle:function(a){var b=this.chart.renderer,g=this.horiz,c=this.opposite,k=this.options.title,e;this.axisTitle||((e=k.textAlign)||(e=(g?{low:"left",middle:"center",high:"right"}:{low:c?"right":"left",middle:"center",high:c?"left":"right"})[k.align]),this.axisTitle=b.text(k.text,0,0,k.useHTML).attr({zIndex:7,rotation:k.rotation||0,align:e}).addClass("highcharts-axis-title").css(k.style).add(this.axisGroup),
this.axisTitle.isNew=!0);this.axisTitle[a?"show":"hide"](!0)},getOffset:function(){var a=this,b=a.chart,k=b.renderer,e=a.options,m=a.tickPositions,q=a.ticks,d=a.horiz,r=a.side,n=b.inverted?[1,0,3,2][r]:r,w,f,t=0,z,h=0,x=e.title,F=e.labels,p=0,K=b.axisOffset,b=b.clipOffset,J=[-1,1,1,-1][r],u,y=e.className,v=a.axisParent,C=this.tickSize("tick");w=a.hasData();a.showAxis=f=w||A(e.showEmpty,!0);a.staggerLines=a.horiz&&F.staggerLines;a.axisGroup||(a.gridGroup=k.g("grid").attr({zIndex:e.gridZIndex||1}).addClass("highcharts-"+
this.coll.toLowerCase()+"-grid "+(y||"")).add(v),a.axisGroup=k.g("axis").attr({zIndex:e.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(y||"")).add(v),a.labelGroup=k.g("axis-labels").attr({zIndex:F.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(y||"")).add(v));if(w||a.isLinked)c(m,function(b){q[b]?q[b].addLabel():q[b]=new N(a,b)}),a.renderUnsquish(),!1===F.reserveSpace||0!==r&&2!==r&&{1:"left",3:"right"}[r]!==a.labelAlign&&"center"!==a.labelAlign||c(m,function(a){p=
Math.max(q[a].getLabelSize(),p)}),a.staggerLines&&(p*=a.staggerLines,a.labelOffset=p*(a.opposite?-1:1));else for(u in q)q[u].destroy(),delete q[u];x&&x.text&&!1!==x.enabled&&(a.addTitle(f),f&&(t=a.axisTitle.getBBox()[d?"height":"width"],z=x.offset,h=l(z)?0:A(x.margin,d?5:10)));a.renderLine();a.offset=J*A(e.offset,K[r]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};k=0===r?-a.labelMetrics().h:2===r?a.tickRotCorr.y:0;h=Math.abs(p)+h;p&&(h=h-k+J*(d?A(F.y,a.tickRotCorr.y+8*J):F.x));a.axisTitleMargin=A(z,h);
K[r]=Math.max(K[r],a.axisTitleMargin+t+J*a.offset,h,w&&m.length&&C?C[0]:0);e=e.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[n]=Math.max(b[n],e)},getLinePath:function(a){var b=this.chart,c=this.opposite,g=this.offset,k=this.horiz,e=this.left+(c?this.width:0)+g,g=b.chartHeight-this.bottom-(c?this.height:0)+g;c&&(a*=-1);return b.renderer.crispLine(["M",k?this.left:e,k?g:this.top,"L",k?b.chartWidth-this.right:e,k?g:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=
this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,k=this.len,e=this.options.title,m=a?b:c,q=this.opposite,d=this.offset,r=e.x||0,n=e.y||0,w=this.chart.renderer.fontMetrics(e.style&&e.style.fontSize,this.axisTitle).f,k={low:m+(a?0:k),middle:m+k/2,high:m+(a?k:0)}[e.align],b=(a?c+this.height:b)+(a?1:-1)*
(q?-1:1)*this.axisTitleMargin+(2===this.side?w:0);return{x:a?k+r:b+(q?this.width:0)+d+r,y:a?b+n-(q?this.height:0)+d:k+n}},render:function(){var a=this,b=a.chart,e=b.renderer,m=a.options,q=a.isLog,d=a.lin2log,r=a.isLinked,n=a.tickPositions,w=a.axisTitle,f=a.ticks,t=a.minorTicks,z=a.alternateBands,h=m.stackLabels,l=m.alternateGridColor,x=a.tickmarkOffset,p=a.axisLine,A=b.hasRendered&&F(a.oldMin),K=a.showAxis,u=C(e.globalAnimation),y,v;a.labelEdge.length=0;a.overlap=!1;c([f,t,z],function(a){for(var b in a)a[b].isActive=
!1});if(a.hasData()||r)a.minorTickInterval&&!a.categories&&c(a.getMinorTickPositions(),function(b){t[b]||(t[b]=new N(a,b,"minor"));A&&t[b].isNew&&t[b].render(null,!0);t[b].render(null,!1,1)}),n.length&&(c(n,function(b,c){if(!r||b>=a.min&&b<=a.max)f[b]||(f[b]=new N(a,b)),A&&f[b].isNew&&f[b].render(c,!0,.1),f[b].render(c)}),x&&(0===a.min||a.single)&&(f[-1]||(f[-1]=new N(a,-1,null,!0)),f[-1].render(-1))),l&&c(n,function(c,g){v=void 0!==n[g+1]?n[g+1]+x:a.max-x;0===g%2&&c<a.max&&v<=a.max+(b.polar?-x:x)&&
(z[c]||(z[c]=new k(a)),y=c+x,z[c].options={from:q?d(y):y,to:q?d(v):v,color:l},z[c].render(),z[c].isActive=!0)}),a._addedPlotLB||(c((m.plotLines||[]).concat(m.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0);c([f,t,z],function(a){var c,g,k=[],e=u.duration;for(c in a)a[c].isActive||(a[c].render(c,!1,0),a[c].isActive=!1,k.push(c));J(function(){for(g=k.length;g--;)a[k[g]]&&!a[k[g]].isActive&&(a[k[g]].destroy(),delete a[k[g]])},a!==z&&b.hasRendered&&e?e:0)});p&&(p[p.isPlaced?"animate":
"attr"]({d:this.getLinePath(p.strokeWidth())}),p.isPlaced=!0,p[K?"show":"hide"](!0));w&&K&&(w[w.isNew?"attr":"animate"](a.getTitlePosition()),w.isNew=!1);h&&h.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){this.visible&&(this.render(),c(this.plotLinesAndBands,function(a){a.render()}));c(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var b=this,g=b.stacks,k,e=b.plotLinesAndBands,m;a||w(b);for(k in g)d(g[k]),
g[k]=null;c([b.ticks,b.minorTicks,b.alternateBands],function(a){d(a)});if(e)for(a=e.length;a--;)e[a].destroy();c("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){b[a]&&(b[a]=b[a].destroy())});for(m in b)b.hasOwnProperty(m)&&-1===q(m,b.keepProps)&&delete b[m]},drawCrosshair:function(a,b){var c,g=this.crosshair,k=A(g.snap,!0),e,m=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(l(b)||!k)?(k?l(b)&&(e=this.isXAxis?b.plotX:this.len-b.plotY):
e=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),l(e)&&(c=this.getPlotLinePath(b&&(this.isXAxis?b.x:A(b.stackY,b.y)),null,null,null,e)||null),l(c)?(b=this.categories&&!this.isRadial,m||(this.cross=m=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(b?"category ":"thin ")+g.className).attr({zIndex:A(g.zIndex,2)}).add(),m.attr({stroke:g.color||(b?f("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":A(g.width,1)}),g.dashStyle&&m.attr({dashstyle:g.dashStyle})),
m.show().attr({d:c}),b&&!g.width&&m.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}};n(a.Axis.prototype,h)})(L);(function(a){var D=a.Axis,C=a.Date,G=a.dateFormat,I=a.defaultOptions,h=a.defined,f=a.each,p=a.extend,v=a.getMagnitude,l=a.getTZOffset,u=a.normalizeTickInterval,d=a.pick,c=a.timeUnits;D.prototype.getTimeTicks=function(a,y,t,m){var b=[],q={},n=I.global.useUTC,F,e=new C(y-l(y)),r=C.hcMakeTime,
x=a.unitRange,A=a.count,k;if(h(y)){e[C.hcSetMilliseconds](x>=c.second?0:A*Math.floor(e.getMilliseconds()/A));if(x>=c.second)e[C.hcSetSeconds](x>=c.minute?0:A*Math.floor(e.getSeconds()/A));if(x>=c.minute)e[C.hcSetMinutes](x>=c.hour?0:A*Math.floor(e[C.hcGetMinutes]()/A));if(x>=c.hour)e[C.hcSetHours](x>=c.day?0:A*Math.floor(e[C.hcGetHours]()/A));if(x>=c.day)e[C.hcSetDate](x>=c.month?1:A*Math.floor(e[C.hcGetDate]()/A));x>=c.month&&(e[C.hcSetMonth](x>=c.year?0:A*Math.floor(e[C.hcGetMonth]()/A)),F=e[C.hcGetFullYear]());
if(x>=c.year)e[C.hcSetFullYear](F-F%A);if(x===c.week)e[C.hcSetDate](e[C.hcGetDate]()-e[C.hcGetDay]()+d(m,1));F=e[C.hcGetFullYear]();m=e[C.hcGetMonth]();var w=e[C.hcGetDate](),K=e[C.hcGetHours]();if(C.hcTimezoneOffset||C.hcGetTimezoneOffset)k=(!n||!!C.hcGetTimezoneOffset)&&(t-y>4*c.month||l(y)!==l(t)),e=e.getTime(),e=new C(e+l(e));n=e.getTime();for(y=1;n<t;)b.push(n),n=x===c.year?r(F+y*A,0):x===c.month?r(F,m+y*A):!k||x!==c.day&&x!==c.week?k&&x===c.hour?r(F,m,w,K+y*A):n+x*A:r(F,m,w+y*A*(x===c.day?1:
7)),y++;b.push(n);x<=c.hour&&f(b,function(a){"000000000"===G("%H%M%S%L",a)&&(q[a]="day")})}b.info=p(a,{higherRanks:q,totalRange:x*A});return b};D.prototype.normalizeTimeTickInterval=function(a,d){var f=d||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];d=f[f.length-1];var m=c[d[0]],b=d[1],q;for(q=0;q<f.length&&!(d=f[q],m=c[d[0]],b=d[1],f[q+1]&&a<=(m*
b[b.length-1]+c[f[q+1][0]])/2);q++);m===c.year&&a<5*m&&(b=[1,2,5]);a=u(a/m,b,"year"===d[0]?Math.max(v(a/m),1):1);return{unitRange:m,count:a,unitName:d[0]}}})(L);(function(a){var D=a.Axis,C=a.getMagnitude,G=a.map,I=a.normalizeTickInterval,h=a.pick;D.prototype.getLogTickPositions=function(a,p,v,l){var f=this.options,d=this.len,c=this.lin2log,n=this.log2lin,y=[];l||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),y=this.getLinearTickPositions(a,p,v);else if(.08<=a)for(var d=Math.floor(p),t,m,
b,q,z,f=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];d<v+1&&!z;d++)for(m=f.length,t=0;t<m&&!z;t++)b=n(c(d)*f[t]),b>p&&(!l||q<=v)&&void 0!==q&&y.push(q),q>v&&(z=!0),q=b;else p=c(p),v=c(v),a=f[l?"minorTickInterval":"tickInterval"],a=h("auto"===a?null:a,this._minorAutoInterval,f.tickPixelInterval/(l?5:1)*(v-p)/((l?d/this.tickPositions.length:d)||1)),a=I(a,null,C(a)),y=G(this.getLinearTickPositions(a,p,v),n),l||(this._minorAutoInterval=a/5);l||(this.tickInterval=a);return y};D.prototype.log2lin=
function(a){return Math.log(a)/Math.LN10};D.prototype.lin2log=function(a){return Math.pow(10,a)}})(L);(function(a){var D=a.dateFormat,C=a.each,G=a.extend,I=a.format,h=a.isNumber,f=a.map,p=a.merge,v=a.pick,l=a.splat,u=a.syncTimeout,d=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,d){this.chart=a;this.options=d;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=d.split&&!a.inverted;this.shared=d.shared||this.split},cleanSplit:function(a){C(this.chart.series,
function(c){var d=c&&c.tt;d&&(!d.isActive||a?c.tt=d.destroy():d.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,d=this.options;this.label||(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,d.shape||"callout",null,null,d.useHTML,null,"tooltip").attr({padding:d.padding,r:d.borderRadius}),this.label.attr({fill:d.backgroundColor,"stroke-width":d.borderWidth}).css(d.style).shadow(d.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();
this.init(this.chart,p(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,d,f,t){var c=this,b=c.now,q=!1!==c.options.animation&&!c.isHidden&&(1<Math.abs(a-b.x)||1<Math.abs(d-b.y)),n=c.followPointer||1<c.len;G(b,{x:q?(2*b.x+a)/3:a,y:q?(b.y+d)/2:d,anchorX:n?void 0:q?(2*b.anchorX+f)/3:f,anchorY:n?void 0:q?(b.anchorY+
t)/2:t});c.getLabel().attr(b);q&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){c&&c.move(a,d,f,t)},32))},hide:function(a){var c=this;clearTimeout(this.hideTimer);a=v(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=u(function(){c.getLabel()[a?"fadeOut":"hide"]();c.isHidden=!0},a))},getAnchor:function(a,d){var c,n=this.chart,m=n.inverted,b=n.plotTop,q=n.plotLeft,z=0,h=0,e,r;a=l(a);c=a[0].tooltipPos;this.followPointer&&d&&(void 0===d.chartX&&(d=n.pointer.normalize(d)),
c=[d.chartX-n.plotLeft,d.chartY-b]);c||(C(a,function(a){e=a.series.yAxis;r=a.series.xAxis;z+=a.plotX+(!m&&r?r.left-q:0);h+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!m&&e?e.top-b:0)}),z/=a.length,h/=a.length,c=[m?n.plotWidth-h:z,this.shared&&!m&&1<a.length&&d?d.chartY-b:m?n.plotHeight-z:h]);return f(c,Math.round)},getPosition:function(a,d,f){var c=this.chart,m=this.distance,b={},q=f.h||0,n,h=["y",c.chartHeight,d,f.plotY+c.plotTop,c.plotTop,c.plotTop+c.plotHeight],e=["x",c.chartWidth,a,f.plotX+
c.plotLeft,c.plotLeft,c.plotLeft+c.plotWidth],r=!this.followPointer&&v(f.ttBelow,!c.inverted===!!f.negative),l=function(a,c,k,g,e,d){var f=k<g-m,w=g+m+k<c,n=g-m-k;g+=m;if(r&&w)b[a]=g;else if(!r&&f)b[a]=n;else if(f)b[a]=Math.min(d-k,0>n-q?n:n-q);else if(w)b[a]=Math.max(e,g+q+k>c?g:g+q);else return!1},p=function(a,c,k,g){var e;g<m||g>c-m?e=!1:b[a]=g<k/2?1:g>c-k/2?c-k-2:g-k/2;return e},k=function(a){var b=h;h=e;e=b;n=a},w=function(){!1!==l.apply(0,h)?!1!==p.apply(0,e)||n||(k(!0),w()):n?b.x=b.y=0:(k(!0),
w())};(c.inverted||1<this.len)&&k();w();return b},defaultFormatter:function(a){var c=this.points||l(this),d;d=[a.tooltipFooterHeaderFormatter(c[0])];d=d.concat(a.bodyFormatter(c));d.push(a.tooltipFooterHeaderFormatter(c[0],!0));return d},refresh:function(a,d){var c=this.chart,f,m=this.options,b,q,n={},h=[];f=m.formatter||this.defaultFormatter;var n=c.hoverPoints,e=this.shared;clearTimeout(this.hideTimer);this.followPointer=l(a)[0].series.tooltipOptions.followPointer;q=this.getAnchor(a,d);d=q[0];b=
q[1];!e||a.series&&a.series.noSharedTooltip?n=a.getLabelConfig():(c.hoverPoints=a,n&&C(n,function(a){a.setState()}),C(a,function(a){a.setState("hover");h.push(a.getLabelConfig())}),n={x:a[0].category,y:a[0].y},n.points=h,this.len=h.length,a=a[0]);n=f.call(n,this);e=a.series;this.distance=v(e.tooltipOptions.distance,16);!1===n?this.hide():(f=this.getLabel(),this.isHidden&&f.attr({opacity:1}).show(),this.split?this.renderSplit(n,c.hoverPoints):(f.attr({text:n&&n.join?n.join(""):n}),f.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+
v(a.colorIndex,e.colorIndex)),f.attr({stroke:m.borderColor||a.color||e.color||"#666666"}),this.updatePosition({plotX:d,plotY:b,negative:a.negative,ttBelow:a.ttBelow,h:q[2]||0})),this.isHidden=!1)},renderSplit:function(c,d){var f=this,n=[],m=this.chart,b=m.renderer,q=!0,h=this.options,l,e=this.getLabel();C(c.slice(0,c.length-1),function(a,c){c=d[c-1]||{isHeader:!0,plotX:d[0].plotX};var r=c.series||f,k=r.tt,w=c.series||{},t="highcharts-color-"+v(c.colorIndex,w.colorIndex,"none");k||(r.tt=k=b.label(null,
null,null,"callout").addClass("highcharts-tooltip-box "+t).attr({padding:h.padding,r:h.borderRadius,fill:h.backgroundColor,stroke:c.color||w.color||"#333333","stroke-width":h.borderWidth}).add(e));k.isActive=!0;k.attr({text:a});k.css(h.style);a=k.getBBox();w=a.width+k.strokeWidth();c.isHeader?(l=a.height,w=Math.max(0,Math.min(c.plotX+m.plotLeft-w/2,m.chartWidth-w))):w=c.plotX+m.plotLeft-v(h.distance,16)-w;0>w&&(q=!1);a=(c.series&&c.series.yAxis&&c.series.yAxis.pos)+(c.plotY||0);a-=m.plotTop;n.push({target:c.isHeader?
m.plotHeight+l:a,rank:c.isHeader?1:0,size:r.tt.getBBox().height+1,point:c,x:w,tt:k})});this.cleanSplit();a.distribute(n,m.plotHeight+l);C(n,function(a){var b=a.point,c=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:q||b.isHeader?a.x:b.plotX+m.plotLeft+v(h.distance,16),y:a.pos+m.plotTop,anchorX:b.isHeader?b.plotX+m.plotLeft:b.plotX+c.xAxis.pos,anchorY:b.isHeader?a.pos+m.plotTop-15:b.plotY+c.yAxis.pos})})},updatePosition:function(a){var c=this.chart,d=this.getLabel(),d=(this.options.positioner||
this.getPosition).call(this,d.width,d.height,a);this.move(Math.round(d.x),Math.round(d.y||0),a.plotX+c.plotLeft,a.plotY+c.plotTop)},getXDateFormat:function(a,f,h){var c;f=f.dateTimeLabelFormats;var m=h&&h.closestPointRange,b,q={millisecond:15,second:12,minute:9,hour:6,day:3},n,l="millisecond";if(m){n=D("%m-%d %H:%M:%S.%L",a.x);for(b in d){if(m===d.week&&+D("%w",a.x)===h.options.startOfWeek&&"00:00:00.000"===n.substr(6)){b="week";break}if(d[b]>m){b=l;break}if(q[b]&&n.substr(q[b])!=="01-01 00:00:00.000".substr(q[b]))break;
"week"!==b&&(l=b)}b&&(c=f[b])}else c=f.day;return c||f.year},tooltipFooterHeaderFormatter:function(a,d){var c=d?"footer":"header";d=a.series;var f=d.tooltipOptions,m=f.xDateFormat,b=d.xAxis,q=b&&"datetime"===b.options.type&&h(a.key),c=f[c+"Format"];q&&!m&&(m=this.getXDateFormat(a,f,b));q&&m&&(c=c.replace("{point.key}","{point.key:"+m+"}"));return I(c,{point:a,series:d})},bodyFormatter:function(a){return f(a,function(a){var c=a.series.tooltipOptions;return(c.pointFormatter||a.point.tooltipFormatter).call(a.point,
c.pointFormat)})}}})(L);(function(a){var D=a.addEvent,C=a.attr,G=a.charts,I=a.color,h=a.css,f=a.defined,p=a.doc,v=a.each,l=a.extend,u=a.fireEvent,d=a.offset,c=a.pick,n=a.removeEvent,y=a.splat,t=a.Tooltip,m=a.win;a.Pointer=function(a,c){this.init(a,c)};a.Pointer.prototype={init:function(a,m){this.options=m;this.chart=a;this.runChartClick=m.chart.events&&!!m.chart.events.click;this.pinchDown=[];this.lastValidTouch={};t&&m.tooltip.enabled&&(a.tooltip=new t(a,m.tooltip),this.followTouchMove=c(m.tooltip.followTouchMove,
!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,m=b.options.chart,d=m.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(d=c(m.pinchType,d));this.zoomX=a=/x/.test(d);this.zoomY=d=/y/.test(d);this.zoomHor=a&&!b||d&&b;this.zoomVert=d&&!b||a&&b;this.hasZoom=a||d},normalize:function(a,c){var b,q;a=a||m.event;a.target||(a.target=a.srcElement);q=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;c||(this.chartPosition=c=d(this.chart.container));void 0===q.pageX?(b=Math.max(a.x,
a.clientX-c.left),c=a.y):(b=q.pageX-c.left,c=q.pageY-c.top);return l(a,{chartX:Math.round(b),chartY:Math.round(c)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};v(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},runPointActions:function(b){var m=this.chart,d=m.series,f=m.tooltip,e=f?f.shared:!1,r=!0,n=m.hoverPoint,h=m.hoverSeries,k,w,l,t=[],u;if(!e&&!h)for(k=0;k<d.length;k++)if(d[k].directTouch||!d[k].options.stickyTracking)d=
[];h&&(e?h.noSharedTooltip:h.directTouch)&&n?t=[n]:(e||!h||h.options.stickyTracking||(d=[h]),v(d,function(a){w=a.noSharedTooltip&&e;l=!e&&a.directTouch;a.visible&&!w&&!l&&c(a.options.enableMouseTracking,!0)&&(u=a.searchPoint(b,!w&&1===a.kdDimensions))&&u.series&&t.push(u)}),t.sort(function(a,b){var c=a.distX-b.distX,g=a.dist-b.dist,k=b.series.group.zIndex-a.series.group.zIndex;return 0!==c&&e?c:0!==g?g:0!==k?k:a.series.index>b.series.index?-1:1}));if(e)for(k=t.length;k--;)(t[k].x!==t[0].x||t[k].series.noSharedTooltip)&&
t.splice(k,1);if(t[0]&&(t[0]!==this.prevKDPoint||f&&f.isHidden)){if(e&&!t[0].series.noSharedTooltip){for(k=0;k<t.length;k++)t[k].onMouseOver(b,t[k]!==(h&&h.directTouch&&n||t[0]));t.length&&f&&f.refresh(t.sort(function(a,b){return a.series.index-b.series.index}),b)}else if(f&&f.refresh(t[0],b),!h||!h.directTouch)t[0].onMouseOver(b);this.prevKDPoint=t[0];r=!1}r&&(d=h&&h.tooltipOptions.followPointer,f&&d&&!f.isHidden&&(d=f.getAnchor([{}],b),f.updatePosition({plotX:d[0],plotY:d[1]})));this.unDocMouseMove||
(this.unDocMouseMove=D(p,"mousemove",function(b){if(G[a.hoverChartIndex])G[a.hoverChartIndex].pointer.onDocumentMouseMove(b)}));v(e?t:[c(n,t[0])],function(a){v(m.axes,function(c){(!a||a.series&&a.series[c.coll]===c)&&c.drawCrosshair(b,a)})})},reset:function(a,c){var b=this.chart,m=b.hoverSeries,e=b.hoverPoint,d=b.hoverPoints,q=b.tooltip,f=q&&q.shared?d:e;a&&f&&v(y(f),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)q&&f&&(q.refresh(f),e&&(e.setState(e.state,!0),v(b.axes,function(a){a.crosshair&&
a.drawCrosshair(null,e)})));else{if(e)e.onMouseOut();d&&v(d,function(a){a.setState()});if(m)m.onMouseOut();q&&q.hide(c);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());v(b.axes,function(a){a.hideCrosshair()});this.hoverX=this.prevKDPoint=b.hoverPoints=b.hoverPoint=null}},scaleGroups:function(a,c){var b=this.chart,m;v(b.series,function(e){m=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&e.group&&(e.group.attr(m),e.markerGroup&&(e.markerGroup.attr(m),e.markerGroup.clip(c?b.clipRect:
null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(m))});b.clipRect.attr(c||b.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,m=a.chartX,e=a.chartY,d=this.zoomHor,f=this.zoomVert,n=b.plotLeft,k=b.plotTop,w=b.plotWidth,h=b.plotHeight,l,t=this.selectionMarker,g=this.mouseDownX,p=this.mouseDownY,u=c.panKey&&a[c.panKey+"Key"];t&&t.touch||
(m<n?m=n:m>n+w&&(m=n+w),e<k?e=k:e>k+h&&(e=k+h),this.hasDragged=Math.sqrt(Math.pow(g-m,2)+Math.pow(p-e,2)),10<this.hasDragged&&(l=b.isInsidePlot(g-n,p-k),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&l&&!u&&!t&&(this.selectionMarker=t=b.renderer.rect(n,k,d?1:w,f?1:h,0).attr({fill:c.selectionMarkerFill||I("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),t&&d&&(m-=g,t.attr({width:Math.abs(m),x:(0<m?0:m)+g})),t&&f&&(m=e-p,t.attr({height:Math.abs(m),y:(0<m?0:m)+
p})),l&&!t&&c.panning&&b.pan(a,c.panning)))},drop:function(a){var b=this,c=this.chart,m=this.hasPinched;if(this.selectionMarker){var e={originalEvent:a,xAxis:[],yAxis:[]},d=this.selectionMarker,n=d.attr?d.attr("x"):d.x,t=d.attr?d.attr("y"):d.y,k=d.attr?d.attr("width"):d.width,w=d.attr?d.attr("height"):d.height,p;if(this.hasDragged||m)v(c.axes,function(c){if(c.zoomEnabled&&f(c.min)&&(m||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var d=c.horiz,g="touchend"===a.type?c.minPixelPadding:0,q=c.toValue((d?
n:t)+g),d=c.toValue((d?n+k:t+w)-g);e[c.coll].push({axis:c,min:Math.min(q,d),max:Math.max(q,d)});p=!0}}),p&&u(c,"selection",e,function(a){c.zoom(l(a,m?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();m&&this.scaleGroups()}c&&(h(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},
onDocumentMouseUp:function(b){G[a.hoverChartIndex]&&G[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=G[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=null)},onContainerMouseMove:function(b){var c=this.chart;f(a.hoverChartIndex)&&
G[a.hoverChartIndex]&&G[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=c.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},inClass:function(a,c){for(var b;a;){if(b=C(a,"class")){if(-1!==b.indexOf(c))return!0;if(-1!==b.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;
a=a.relatedTarget||a.toElement;if(!(!b||!a||b.options.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,m=b.plotLeft,e=b.plotTop;a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(u(c.series,"click",l(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(l(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-
m,a.chartY-e)&&u(b,"click",a)))},setDOMEvents:function(){var b=this,c=b.chart.container;c.onmousedown=function(a){b.onContainerMouseDown(a)};c.onmousemove=function(a){b.onContainerMouseMove(a)};c.onclick=function(a){b.onContainerClick(a)};D(c,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&D(p,"mouseup",b.onDocumentMouseUp);a.hasTouch&&(c.ontouchstart=function(a){b.onContainerTouchStart(a)},c.ontouchmove=function(a){b.onContainerTouchMove(a)},1===a.chartCount&&D(p,"touchend",b.onDocumentTouchEnd))},
destroy:function(){var b;n(this.chart.container,"mouseleave",this.onContainerMouseLeave);a.chartCount||(n(p,"mouseup",this.onDocumentMouseUp),n(p,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for(b in this)this[b]=null}}})(L);(function(a){var D=a.charts,C=a.each,G=a.extend,I=a.map,h=a.noop,f=a.pick;G(a.Pointer.prototype,{pinchTranslate:function(a,f,h,u,d,c){this.zoomHor&&this.pinchTranslateDirection(!0,a,f,h,u,d,c);this.zoomVert&&this.pinchTranslateDirection(!1,a,f,h,u,d,
c)},pinchTranslateDirection:function(a,f,h,u,d,c,n,y){var t=this.chart,m=a?"x":"y",b=a?"X":"Y",q="chart"+b,l=a?"width":"height",p=t["plot"+(a?"Left":"Top")],e,r,x=y||1,A=t.inverted,k=t.bounds[a?"h":"v"],w=1===f.length,K=f[0][q],J=h[0][q],v=!w&&f[1][q],g=!w&&h[1][q],B;h=function(){!w&&20<Math.abs(K-v)&&(x=y||Math.abs(J-g)/Math.abs(K-v));r=(p-J)/x+K;e=t["plot"+(a?"Width":"Height")]/x};h();f=r;f<k.min?(f=k.min,B=!0):f+e>k.max&&(f=k.max-e,B=!0);B?(J-=.8*(J-n[m][0]),w||(g-=.8*(g-n[m][1])),h()):n[m]=[J,
g];A||(c[m]=r-p,c[l]=e);c=A?1/x:x;d[l]=e;d[m]=f;u[A?a?"scaleY":"scaleX":"scale"+b]=x;u["translate"+b]=c*p+(J-c*K)},pinch:function(a){var p=this,l=p.chart,u=p.pinchDown,d=a.touches,c=d.length,n=p.lastValidTouch,y=p.hasZoom,t=p.selectionMarker,m={},b=1===c&&(p.inClass(a.target,"highcharts-tracker")&&l.runTrackerClick||p.runChartClick),q={};1<c&&(p.initiated=!0);y&&p.initiated&&!b&&a.preventDefault();I(d,function(a){return p.normalize(a)});"touchstart"===a.type?(C(d,function(a,b){u[b]={chartX:a.chartX,
chartY:a.chartY}}),n.x=[u[0].chartX,u[1]&&u[1].chartX],n.y=[u[0].chartY,u[1]&&u[1].chartY],C(l.axes,function(a){if(a.zoomEnabled){var b=l.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,m=a.toPixels(f(a.options.min,a.dataMin)),d=a.toPixels(f(a.options.max,a.dataMax)),q=Math.max(m,d);b.min=Math.min(a.pos,Math.min(m,d)-c);b.max=Math.max(a.pos+a.len,q+c)}}),p.res=!0):p.followTouchMove&&1===c?this.runPointActions(p.normalize(a)):u.length&&(t||(p.selectionMarker=t=G({destroy:h,touch:!0},l.plotBox)),p.pinchTranslate(u,
d,m,t,q,n),p.hasPinched=y,p.scaleGroups(m,q),p.res&&(p.res=!1,this.reset(!1,0)))},touch:function(h,v){var l=this.chart,p,d;if(l.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=l.index;1===h.touches.length?(h=this.normalize(h),(d=l.isInsidePlot(h.chartX-l.plotLeft,h.chartY-l.plotTop))&&!l.openMenu?(v&&this.runPointActions(h),"touchmove"===h.type&&(v=this.pinchDown,p=v[0]?4<=Math.sqrt(Math.pow(v[0].chartX-h.chartX,2)+Math.pow(v[0].chartY-h.chartY,2)):!1),f(p,
!0)&&this.pinch(h)):v&&this.reset()):2===h.touches.length&&this.pinch(h)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(f){D[a.hoverChartIndex]&&D[a.hoverChartIndex].pointer.drop(f)}})})(L);(function(a){var D=a.addEvent,C=a.charts,G=a.css,I=a.doc,h=a.extend,f=a.noop,p=a.Pointer,v=a.removeEvent,l=a.win,u=a.wrap;if(l.PointerEvent||l.MSPointerEvent){var d={},c=!!l.PointerEvent,n=function(){var a,c=[];
c.item=function(a){return this[a]};for(a in d)d.hasOwnProperty(a)&&c.push({pageX:d[a].pageX,pageY:d[a].pageY,target:d[a].target});return c},y=function(c,m,b,d){"touch"!==c.pointerType&&c.pointerType!==c.MSPOINTER_TYPE_TOUCH||!C[a.hoverChartIndex]||(d(c),d=C[a.hoverChartIndex].pointer,d[m]({type:b,target:c.currentTarget,preventDefault:f,touches:n()}))};h(p.prototype,{onContainerPointerDown:function(a){y(a,"onContainerTouchStart","touchstart",function(a){d[a.pointerId]={pageX:a.pageX,pageY:a.pageY,
target:a.currentTarget}})},onContainerPointerMove:function(a){y(a,"onContainerTouchMove","touchmove",function(a){d[a.pointerId]={pageX:a.pageX,pageY:a.pageY};d[a.pointerId].target||(d[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){y(a,"onDocumentTouchEnd","touchend",function(a){delete d[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,c?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,c?"pointermove":"MSPointerMove",this.onContainerPointerMove);
a(I,c?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});u(p.prototype,"init",function(a,c,b){a.call(this,c,b);this.hasZoom&&G(c.container,{"-ms-touch-action":"none","touch-action":"none"})});u(p.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(D)});u(p.prototype,"destroy",function(a){this.batchMSEvents(v);a.call(this)})}})(L);(function(a){var D,C=a.addEvent,G=a.css,I=a.discardElement,h=a.defined,f=a.each,p=a.extend,v=a.isFirefox,l=a.marginNames,
u=a.merge,d=a.pick,c=a.setAnimation,n=a.stableSort,y=a.win,t=a.wrap;D=a.Legend=function(a,b){this.init(a,b)};D.prototype={init:function(a,b){this.chart=a;this.setOptions(b);b.enabled&&(this.render(),C(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var b=d(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=u(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.initialItemX=this.padding=b;this.initialItemY=
b-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=d(a.symbolWidth,16);this.pages=[]},update:function(a,b){var c=this.chart;this.setOptions(u(!0,this.options,a));this.destroy();c.isDirtyLegend=c.isDirtyBox=!0;d(b,!0)&&c.redraw()},colorizeItem:function(a,b){a.legendGroup[b?"removeClass":"addClass"]("highcharts-legend-item-hidden");var c=this.options,d=a.legendItem,m=a.legendLine,e=a.legendSymbol,f=this.itemHiddenStyle.color,c=b?c.itemStyle.color:f,h=b?a.color||f:f,n=a.options&&a.options.marker,
k={fill:h},w;d&&d.css({fill:c,color:c});m&&m.attr({stroke:h});if(e){if(n&&e.isMarker&&(k=a.pointAttribs(),!b))for(w in k)k[w]=f;e.attr(k)}},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,m=d[0],d=d[1],e=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?m:this.legendWidth-m-2*c-4,d);e&&(e.x=m,e.y=d)},destroyItem:function(a){var b=a.checkbox;f(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&I(a.checkbox)},
destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}f(this.getAllItems(),function(b){f(["legendItem","legendGroup"],a,b)});f(["box","title","group"],a,this);this.display=null},positionCheckboxes:function(a){var b=this.group&&this.group.alignAttr,c,d=this.clipHeight||this.legendHeight,m=this.titleHeight;b&&(c=b.translateY,f(this.allItems,function(e){var f=e.checkbox,h;f&&(h=c+m+f.y+(a||0)+3,G(f,{left:b.translateX+e.checkboxOffset+f.x-20+"px",top:h+"px",display:h>c-6&&h<c+d-6?"":"none"}))}))},
renderTitle:function(){var a=this.padding,b=this.options.title,c=0;b.text&&(this.title||(this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group)),a=this.title.getBBox(),c=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:c}));this.titleHeight=c},setText:function(c){var b=this.options;c.legendItem.attr({text:b.labelFormat?a.format(b.labelFormat,c):b.labelFormatter.call(c)})},renderItem:function(a){var b=
this.chart,c=b.renderer,m=this.options,f="horizontal"===m.layout,e=this.symbolWidth,h=m.symbolPadding,n=this.itemStyle,l=this.itemHiddenStyle,k=this.padding,w=f?d(m.itemDistance,20):0,t=!m.rtl,p=m.width,y=m.itemMarginBottom||0,g=this.itemMarginTop,B=this.initialItemX,v=a.legendItem,M=!a.series,C=!M&&a.series.drawLegendSymbol?a.series:a,E=C.options,E=this.createCheckboxForItem&&E&&E.showCheckbox,H=m.useHTML;v||(a.legendGroup=c.g("legend-item").addClass("highcharts-"+C.type+"-series highcharts-color-"+
a.colorIndex+(a.options.className?" "+a.options.className:"")+(M?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=v=c.text("",t?e+h:-h,this.baseline||0,H).css(u(a.visible?n:l)).attr({align:t?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(n=n.fontSize,this.fontMetrics=c.fontMetrics(n,v),this.baseline=this.fontMetrics.f+3+g,v.attr("y",this.baseline)),C.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,v,H),E&&this.createCheckboxForItem(a));
this.colorizeItem(a,a.visible);this.setText(a);c=v.getBBox();e=a.checkboxOffset=m.itemWidth||a.legendItemWidth||e+h+c.width+w+(E?20:0);this.itemHeight=h=Math.round(a.legendItemHeight||c.height);f&&this.itemX-B+e>(p||b.chartWidth-2*k-B-m.x)&&(this.itemX=B,this.itemY+=g+this.lastLineHeight+y,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,e);this.lastItemY=g+this.itemY+y;this.lastLineHeight=Math.max(h,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];f?this.itemX+=e:
(this.itemY+=g+h+y,this.lastLineHeight=h);this.offsetWidth=p||Math.max((f?this.itemX-B-w:e)+k,this.offsetWidth)},getAllItems:function(){var a=[];f(this.chart.series,function(b){var c=b&&b.options;b&&d(c.showInLegend,h(c.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===c.legendType?b.data:b)))});return a},adjustMargins:function(a,b){var c=this.chart,m=this.options,n=m.align.charAt(0)+m.verticalAlign.charAt(0)+m.layout.charAt(0);m.floating||f([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,
/(lbv|lm|ltv)/],function(e,f){e.test(n)&&!h(a[f])&&(c[l[f]]=Math.max(c[l[f]],c.legend[(f+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][f]*m[f%2?"x":"y"]+d(m.margin,12)+b[f]))})},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.group,h,e,r,l,t=a.box,k=a.options,w=a.padding;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;d||(a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=c.g().add(a.contentGroup));a.renderTitle();
h=a.getAllItems();n(h,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});k.reversed&&h.reverse();a.allItems=h;a.display=e=!!h.length;a.lastLineHeight=0;f(h,function(b){a.renderItem(b)});r=(k.width||a.offsetWidth)+w;l=a.lastItemY+a.lastLineHeight+a.titleHeight;l=a.handleOverflow(l);l+=w;t||(a.box=t=c.rect().addClass("highcharts-legend-box").attr({r:k.borderRadius}).add(d),t.isNew=!0);t.attr({stroke:k.borderColor,"stroke-width":k.borderWidth||0,fill:k.backgroundColor||
"none"}).shadow(k.shadow);0<r&&0<l&&(t[t.isNew?"attr":"animate"](t.crisp({x:0,y:0,width:r,height:l},t.strokeWidth())),t.isNew=!1);t[e?"show":"hide"]();a.legendWidth=r;a.legendHeight=l;f(h,function(b){a.positionItem(b)});e&&d.align(p({width:r,height:l},k),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,m=c.renderer,h=this.options,e=h.y,c=c.spacingBox.height+("top"===h.verticalAlign?-e:e)-this.padding,e=h.maxHeight,n,l=this.clipRect,t=h.navigation,
k=d(t.animation,!0),w=t.arrowSize||12,p=this.nav,u=this.pages,y=this.padding,g,B=this.allItems,v=function(a){a?l.attr({height:a}):l&&(b.clipRect=l.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+y+"px,9999px,"+(y+a)+"px,0)":"auto")};"horizontal"!==h.layout||"middle"===h.verticalAlign||h.floating||(c/=2);e&&(c=Math.min(c,e));u.length=0;a>c&&!1!==t.enabled?(this.clipHeight=n=Math.max(c-20-this.titleHeight-y,0),this.currentPage=d(this.currentPage,1),this.fullHeight=
a,f(B,function(a,b){var c=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var k=u.length;if(!k||c-u[k-1]>n&&(g||c)!==u[k-1])u.push(g||c),k++;b===B.length-1&&c+a-u[k-1]>n&&u.push(c);c!==g&&(g=c)}),l||(l=b.clipRect=m.clipRect(0,y,9999,0),b.contentGroup.clip(l)),v(n),p||(this.nav=p=m.g().attr({zIndex:1}).add(this.group),this.up=m.symbol("triangle",0,0,w,w).on("click",function(){b.scroll(-1,k)}).add(p),this.pager=m.text("",15,10).addClass("highcharts-legend-navigation").css(t.style).add(p),
this.down=m.symbol("triangle-down",0,0,w,w).on("click",function(){b.scroll(1,k)}).add(p)),b.scroll(0),a=c):p&&(v(),p.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,b){var d=this.pages,f=d.length;a=this.currentPage+a;var m=this.clipHeight,e=this.options.navigation,h=this.pager,n=this.padding;a>f&&(a=f);0<a&&(void 0!==b&&c(b,this.chart),this.nav.attr({translateX:n,translateY:m+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===
a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),h.attr({text:a+"/"+f}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===f?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?e.inactiveColor:e.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===f?e.inactiveColor:e.activeColor}).css({cursor:a===f?"default":"pointer"}),b=-d[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:b}),this.currentPage=
a,this.positionCheckboxes(b))}};a.LegendSymbolMixin={drawRectangle:function(a,b){var c=a.options,f=c.symbolHeight||a.fontMetrics.f,c=c.squareSymbol;b.legendSymbol=this.chart.renderer.rect(c?(a.symbolWidth-f)/2:0,a.baseline-f+1,c?f:a.symbolWidth,f,d(a.options.symbolRadius,f/2)).addClass("highcharts-point").attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=this.options,c=b.marker,d=a.symbolWidth,f=this.chart.renderer,e=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);
var m;m={"stroke-width":b.lineWidth||0};b.dashStyle&&(m.dashstyle=b.dashStyle);this.legendLine=f.path(["M",0,a,"L",d,a]).addClass("highcharts-graph").attr(m).add(e);c&&!1!==c.enabled&&(b=0===this.symbol.indexOf("url")?0:c.radius,this.legendSymbol=c=f.symbol(this.symbol,d/2-b,a-b,2*b,2*b,c).addClass("highcharts-point").add(e),c.isMarker=!0)}};(/Trident\/7\.0/.test(y.navigator.userAgent)||v)&&t(D.prototype,"positionItem",function(a,b){var c=this,d=function(){b._legendItemPos&&a.call(c,b)};d();setTimeout(d)})})(L);
(function(a){var D=a.addEvent,C=a.animate,G=a.animObject,I=a.attr,h=a.doc,f=a.Axis,p=a.createElement,v=a.defaultOptions,l=a.discardElement,u=a.charts,d=a.css,c=a.defined,n=a.each,y=a.extend,t=a.find,m=a.fireEvent,b=a.getStyle,q=a.grep,z=a.isNumber,F=a.isObject,e=a.isString,r=a.Legend,x=a.marginNames,A=a.merge,k=a.Pointer,w=a.pick,K=a.pInt,J=a.removeEvent,N=a.seriesTypes,g=a.splat,B=a.svg,S=a.syncTimeout,M=a.win,R=a.Renderer,E=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,
b,c){return new E(a,b,c)};E.prototype={callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(e(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var k,g=b.series;b.series=null;k=A(v,b);k.series=b.series=g;this.userOptions=b;this.respRules=[];b=k.chart;g=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=k;this.axes=[];this.series=[];this.hasCartesianSeries=b.showAxes;var e;this.index=u.length;
u.push(this);a.chartCount++;if(g)for(e in g)D(this,e,g[e]);this.xAxis=[];this.yAxis=[];this.pointCount=this.colorCounter=this.symbolCounter=0;this.firstRender()},initSeries:function(b){var c=this.options.chart;(c=N[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},isInsidePlot:function(a,b,c){var k=c?b:a;a=c?a:b;return 0<=k&&k<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){var c=this.axes,k=this.series,g=this.pointer,e=this.legend,d=this.isDirtyLegend,
f,h,w=this.hasCartesianSeries,r=this.isDirtyBox,l=k.length,q=l,t=this.renderer,p=t.isHidden(),H=[];a.setAnimation(b,this);p&&this.cloneRenderTo();for(this.layOutTitles();q--;)if(b=k[q],b.options.stacking&&(f=!0,b.isDirty)){h=!0;break}if(h)for(q=l;q--;)b=k[q],b.options.stacking&&(b.isDirty=!0);n(k,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),d=!0);a.isDirtyData&&m(a,"updatedData")});d&&e.options.enabled&&(e.render(),this.isDirtyLegend=!1);f&&this.getStacks();
w&&n(c,function(a){a.updateNames();a.setScale()});this.getMargins();w&&(n(c,function(a){a.isDirty&&(r=!0)}),n(c,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,H.push(function(){m(a,"afterSetExtremes",y(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(r||f)&&a.redraw()}));r&&this.drawChartBox();n(k,function(a){(r||a.isDirty)&&a.visible&&a.redraw()});g&&g.reset(!0);t.draw();m(this,"redraw");p&&this.cloneRenderTo(!0);n(H,function(a){a.call()})},get:function(a){function b(b){return b.id===
a||b.options.id===a}var c,k=this.series,g;c=t(this.axes,b)||t(this.series,b);for(g=0;!c&&g<k.length;g++)c=t(k[g].points||[],b);return c},getAxes:function(){var a=this,b=this.options,c=b.xAxis=g(b.xAxis||{}),b=b.yAxis=g(b.yAxis||{});n(c,function(a,b){a.index=b;a.isX=!0});n(b,function(a,b){a.index=b});c=c.concat(b);n(c,function(b){new f(a,b)})},getSelectedPoints:function(){var a=[];n(this.series,function(b){a=a.concat(q(b.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return q(this.series,
function(a){return a.selected})},setTitle:function(a,b,c){var k=this,g=k.options,e;e=g.title=A({style:{color:"#333333",fontSize:g.isStock?"16px":"18px"}},g.title,a);g=g.subtitle=A({style:{color:"#666666"}},g.subtitle,b);n([["title",a,e],["subtitle",b,g]],function(a,b){var c=a[0],g=k[c],e=a[1];a=a[2];g&&e&&(k[c]=g=g.destroy());a&&a.text&&!g&&(k[c]=k.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),k[c].update=function(a){k.setTitle(!b&&a,b&&
a)},k[c].css(a.style))});k.layOutTitles(c)},layOutTitles:function(a){var b=0,c,k=this.renderer,g=this.spacingBox;n(["title","subtitle"],function(a){var c=this[a],e=this.options[a],d;c&&(d=e.style.fontSize,d=k.fontMetrics(d,c).b,c.css({width:(e.width||g.width+e.widthAdjust)+"px"}).align(y({y:b+d+("title"===a?-3:2)},e),!1,"spacingBox"),e.floating||e.verticalAlign||(b=Math.ceil(b+c.getBBox().height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&c&&(this.isDirtyBox=c,this.hasRendered&&
w(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var a=this.options.chart,k=a.width,a=a.height,g=this.renderToClone||this.renderTo;c(k)||(this.containerWidth=b(g,"width"));c(a)||(this.containerHeight=b(g,"height"));this.chartWidth=Math.max(0,k||this.containerWidth||600);this.chartHeight=Math.max(0,w(a,19<this.containerHeight?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;if(a){if(b){for(;b.childNodes.length;)this.renderTo.appendChild(b.firstChild);
l(b);delete this.renderToClone}}else c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),d(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&b.style.setProperty("display","block","important"),h.body.appendChild(b),c&&b.appendChild(c)},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,k=c.chart,g,d;b=this.renderTo;var f=a.uniqueKey(),m;b||
(this.renderTo=b=k.renderTo);e(b)&&(this.renderTo=b=h.getElementById(b));b||a.error(13,!0);g=K(I(b,"data-highcharts-chart"));z(g)&&u[g]&&u[g].hasRendered&&u[g].destroy();I(b,"data-highcharts-chart",this.index);b.innerHTML="";k.skipClone||b.offsetWidth||this.cloneRenderTo();this.getChartSize();g=this.chartWidth;d=this.chartHeight;m=y({position:"relative",overflow:"hidden",width:g+"px",height:d+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},k.style);
this.container=b=p("div",{id:f},m,this.renderToClone||b);this._cursor=b.style.cursor;this.renderer=new (a[k.renderer]||R)(b,g,d,null,k.forExport,c.exporting&&c.exporting.allowHTML);this.setClassName(k.className);this.renderer.setStyle(k.style);this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,k=this.margin,g=this.titleOffset;this.resetMargins();g&&!c(k[0])&&(this.plotTop=Math.max(this.plotTop,g+this.options.title.margin+b[0]));this.legend.display&&this.legend.adjustMargins(k,
b);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],k=a.margin;a.hasCartesianSeries&&n(a.axes,function(a){a.visible&&a.getOffset()});n(x,function(g,e){c(k[e])||(a[g]+=b[e])});a.setChartSize()},reflow:function(a){var k=this,g=k.options.chart,e=k.renderTo,d=c(g.width),f=g.width||b(e,"width"),g=g.height||b(e,"height"),e=a?a.target:M;if(!d&&
!k.isPrinting&&f&&g&&(e===M||e===h)){if(f!==k.containerWidth||g!==k.containerHeight)clearTimeout(k.reflowTimeout),k.reflowTimeout=S(function(){k.container&&k.setSize(void 0,void 0,!1)},a?100:0);k.containerWidth=f;k.containerHeight=g}},initReflow:function(){var a=this,b;b=D(M,"resize",function(b){a.reflow(b)});D(a,"destroy",b)},setSize:function(b,c,k){var g=this,e=g.renderer;g.isResizing+=1;a.setAnimation(k,g);g.oldChartHeight=g.chartHeight;g.oldChartWidth=g.chartWidth;void 0!==b&&(g.options.chart.width=
b);void 0!==c&&(g.options.chart.height=c);g.getChartSize();b=e.globalAnimation;(b?C:d)(g.container,{width:g.chartWidth+"px",height:g.chartHeight+"px"},b);g.setChartSize(!0);e.setSize(g.chartWidth,g.chartHeight,k);n(g.axes,function(a){a.isDirty=!0;a.setScale()});g.isDirtyLegend=!0;g.isDirtyBox=!0;g.layOutTitles();g.getMargins();g.setResponsive&&g.setResponsive(!1);g.redraw(k);g.oldChartHeight=null;m(g,"resize");S(function(){g&&m(g,"endResize",null,function(){--g.isResizing})},G(b).duration)},setChartSize:function(a){var b=
this.inverted,c=this.renderer,g=this.chartWidth,k=this.chartHeight,e=this.options.chart,d=this.spacing,f=this.clipOffset,m,h,w,r;this.plotLeft=m=Math.round(this.plotLeft);this.plotTop=h=Math.round(this.plotTop);this.plotWidth=w=Math.max(0,Math.round(g-m-this.marginRight));this.plotHeight=r=Math.max(0,Math.round(k-h-this.marginBottom));this.plotSizeX=b?r:w;this.plotSizeY=b?w:r;this.plotBorderWidth=e.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:d[3],y:d[0],width:g-d[3]-d[1],height:k-d[0]-d[2]};
this.plotBox=c.plotBox={x:m,y:h,width:w,height:r};g=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(g,f[3])/2);c=Math.ceil(Math.max(g,f[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(g,f[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(g,f[2])/2-c))};a||n(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;n(["margin","spacing"],function(c){var g=b[c],k=F(g)?g:[g,g,g,g];n(["Top","Right",
"Bottom","Left"],function(g,e){a[c][e]=w(b[c+g],k[e])})});n(x,function(b,c){a[b]=w(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,g=this.chartHeight,k=this.chartBackground,e=this.plotBackground,d=this.plotBorder,f,m=this.plotBGImage,h=a.backgroundColor,w=a.plotBackgroundColor,n=a.plotBackgroundImage,r,l=this.plotLeft,q=this.plotTop,t=this.plotWidth,p=this.plotHeight,x=this.plotBox,K=this.clipRect,
u=this.clipBox,A="animate";k||(this.chartBackground=k=b.rect().addClass("highcharts-background").add(),A="attr");f=a.borderWidth||0;r=f+(a.shadow?8:0);h={fill:h||"none"};if(f||k["stroke-width"])h.stroke=a.borderColor,h["stroke-width"]=f;k.attr(h).shadow(a.shadow);k[A]({x:r/2,y:r/2,width:c-r-f%2,height:g-r-f%2,r:a.borderRadius});A="animate";e||(A="attr",this.plotBackground=e=b.rect().addClass("highcharts-plot-background").add());e[A](x);e.attr({fill:w||"none"}).shadow(a.plotShadow);n&&(m?m.animate(x):
this.plotBGImage=b.image(n,l,q,t,p).add());K?K.animate({width:u.width,height:u.height}):this.clipRect=b.clipRect(u);A="animate";d||(A="attr",this.plotBorder=d=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());d.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});d[A](d.crisp({x:l,y:q,width:t,height:p},-d.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,g=a.options.series,k,e;n(["inverted","angular","polar"],
function(d){c=N[b.type||b.defaultSeriesType];e=b[d]||c&&c.prototype[d];for(k=g&&g.length;!e&&k--;)(c=N[g[k].type])&&c.prototype[d]&&(e=!0);a[d]=e})},linkSeries:function(){var a=this,b=a.series;n(b,function(a){a.linkedSeries.length=0});n(b,function(b){var c=b.options.linkedTo;e(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=w(b.options.visible,c.options.visible,b.visible))})},renderSeries:function(){n(this.series,function(a){a.translate();
a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&n(b.items,function(c){var g=y(b.style,c.style),k=K(g.left)+a.plotLeft,e=K(g.top)+a.plotTop+12;delete g.left;delete g.top;a.renderer.text(c.html,k,e).attr({zIndex:2}).css(g).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,g,k,e;this.setTitle();this.legend=new r(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;g=this.plotHeight-=21;n(a,function(a){a.setScale()});
this.getAxisMargins();k=1.1<c/this.plotWidth;e=1.05<g/this.plotHeight;if(k||e)n(a,function(a){(a.horiz&&k||!a.horiz&&e)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&n(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=A(!0,this.options.credits,
a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(M.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,g=b.series,k=b.container,e,d=k&&k.parentNode;m(b,"destroy");u[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");
J(b);for(e=c.length;e--;)c[e]=c[e].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(e=g.length;e--;)g[e]=g[e].destroy();n("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});k&&(k.innerHTML="",J(k),d&&l(k));for(e in b)delete b[e]},isReadyToRender:function(){var a=this;return B||M!=M.top||"complete"===
h.readyState?!0:(h.attachEvent("onreadystatechange",function(){h.detachEvent("onreadystatechange",a.firstRender);"complete"===h.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();m(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();n(b.series||[],function(b){a.initSeries(b)});a.linkSeries();m(a,"beforeRender");k&&(a.pointer=new k(a,b));a.render();a.renderer.draw();if(!a.renderer.imgCount&&a.onload)a.onload();
a.cloneRenderTo(!0)}},onload:function(){n([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);m(this,"load");c(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}}})(L);(function(a){var D,C=a.each,G=a.extend,I=a.erase,h=a.fireEvent,f=a.format,p=a.isArray,v=a.isNumber,l=a.pick,u=a.removeEvent;D=a.Point=function(){};D.prototype={init:function(a,c,f){this.series=a;this.color=a.color;this.applyOptions(c,f);a.options.colorByPoint?
(c=a.options.colors||a.chart.options.colors,this.color=this.color||c[a.colorCounter],c=c.length,f=a.colorCounter,a.colorCounter++,a.colorCounter===c&&(a.colorCounter=0)):f=a.colorIndex;this.colorIndex=l(this.colorIndex,f);a.chart.pointCount++;return this},applyOptions:function(a,c){var d=this.series,f=d.options.pointValKey||d.pointValKey;a=D.prototype.optionsToObject.call(this,a);G(this,a);this.options=this.options?G(this.options,a):a;a.group&&delete this.group;f&&(this.y=this[f]);this.isNull=l(this.isValid&&
!this.isValid(),null===this.x||!v(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===c&&d.xAxis&&d.xAxis.hasNames&&(this.x=d.xAxis.nameToX(this));void 0===this.x&&d&&(this.x=void 0===c?d.autoIncrement(this):c);return this},optionsToObject:function(a){var c={},d=this.series,f=d.options.keys,h=f||d.pointArrayMap||["y"],m=h.length,b=0,l=0;if(v(a)||null===a)c[h[0]]=a;else if(p(a))for(!f&&a.length>m&&(d=typeof a[0],"string"===d?c.name=a[0]:"number"===d&&(c.x=a[0]),b++);l<m;)f&&void 0===
a[b]||(c[h[l]]=a[b]),b++,l++;else"object"===typeof a&&(c=a,a.dataLabels&&(d._hasPointLabels=!0),a.marker&&(d._hasPointMarkers=!0));return c},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className:"")},
getZone:function(){var a=this.series,c=a.zones,a=a.zoneAxis||"y",f=0,h;for(h=c[f];this[a]>=h.value;)h=c[++f];h&&h.color&&!this.options.color&&(this.color=h.color);return h},destroy:function(){var a=this.series.chart,c=a.hoverPoints,f;a.pointCount--;c&&(this.setState(),I(c,this),c.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)u(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(f in this)this[f]=null},destroyElements:function(){for(var a=
["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],c,f=6;f--;)c=a[f],this[c]&&(this[c]=this[c].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var c=this.series,d=c.tooltipOptions,h=l(d.valueDecimals,""),t=d.valuePrefix||"",m=d.valueSuffix||"";C(c.pointArrayMap||["y"],function(b){b="{point."+b;
if(t||m)a=a.replace(b+"}",t+b+"}"+m);a=a.replace(b+"}",b+":,."+h+"f}")});return f(a,{point:this,series:this.series})},firePointEvent:function(a,c,f){var d=this,n=this.series.options;(n.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();"click"===a&&n.allowPointSelect&&(f=function(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});h(this,a,c,f)},visible:!0}})(L);(function(a){var D=a.addEvent,C=a.animObject,G=a.arrayMax,I=a.arrayMin,h=a.correctFloat,
f=a.Date,p=a.defaultOptions,v=a.defaultPlotOptions,l=a.defined,u=a.each,d=a.erase,c=a.extend,n=a.fireEvent,y=a.grep,t=a.isArray,m=a.isNumber,b=a.isString,q=a.merge,z=a.pick,F=a.removeEvent,e=a.splat,r=a.SVGElement,x=a.syncTimeout,A=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",
lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,
directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var k=this,e,d,g=a.series,f;k.chart=a;k.options=b=k.setOptions(b);k.linkedSeries=[];k.bindAxes();c(k,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});d=b.events;for(e in d)D(k,e,d[e]);if(d&&d.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;k.getColor();k.getSymbol();u(k.parallelArrays,function(a){k[a+"Data"]=[]});k.setData(b.data,
!1);k.isCartesian&&(a.hasCartesianSeries=!0);g.length&&(f=g[g.length-1]);k._i=z(f&&f._i,-1)+1;for(a=this.insert(g);a<g.length;a++)g[a].index=a,g[a].name=g[a].name||"Series "+(g[a].index+1)},insert:function(a){var b=this.options.index,c;if(m(b)){for(c=a.length;c--;)if(b>=z(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return z(c,a.length-1)},bindAxes:function(){var b=this,c=b.options,e=b.chart,d;u(b.axisTypes||[],function(k){u(e[k],function(a){d=
a.options;if(c[k]===d.index||void 0!==c[k]&&c[k]===d.id||void 0===c[k]&&0===d.index)b.insert(a.series),b[k]=a,a.isDirty=!0});b[k]||b.optionalAxis===k||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,k=arguments,e=m(b)?function(g){var k="y"===g&&c.toYData?c.toYData(a):a[g];c[g+"Data"][b]=k}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(k,2))};u(c.parallelArrays,e)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,e=a.pointIntervalUnit,
b=z(b,a.pointStart,0);this.pointInterval=c=z(this.pointInterval,a.pointInterval,1);e&&(a=new f(b),"day"===e?a=+a[f.hcSetDate](a[f.hcGetDate]()+c):"month"===e?a=+a[f.hcSetMonth](a[f.hcGetMonth]()+c):"year"===e&&(a=+a[f.hcSetFullYear](a[f.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options.plotOptions,b=b.userOptions||{},k=b.plotOptions||{},e=c[this.type];this.userOptions=a;c=q(e,c.series,a);this.tooltipOptions=q(p.tooltip,p.plotOptions[this.type].tooltip,
b.tooltip,k.series&&k.series.tooltip,k[this.type]&&k[this.type].tooltip,a.tooltip);null===e.marker&&delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();!c.negativeColor&&!c.negativeFillColor||c.zones||a.push({value:c[this.zoneAxis+"Threshold"]||c.threshold||0,className:"highcharts-negative",color:c.negativeColor,fillColor:c.negativeFillColor});a.length&&l(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return c},getCyclic:function(a,b,c){var k,e=this.userOptions,
g=a+"Index",d=a+"Counter",f=c?c.length:z(this.chart.options.chart[a+"Count"],this.chart[a+"Count"]);b||(k=z(e[g],e["_"+g]),l(k)||(e["_"+g]=k=this.chart[d]%f,this.chart[d]+=1),c&&(b=c[k]));void 0!==k&&(this[g]=k);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||v[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,
setData:function(c,e,d,f){var k=this,g=k.points,h=g&&g.length||0,n,r=k.options,w=k.chart,l=null,q=k.xAxis,p=r.turboThreshold,x=this.xData,A=this.yData,F=(n=k.pointArrayMap)&&n.length;c=c||[];n=c.length;e=z(e,!0);if(!1!==f&&n&&h===n&&!k.cropped&&!k.hasGroupedData&&k.visible)u(c,function(a,b){g[b].update&&a!==r.data[b]&&g[b].update(a,!1,null,!1)});else{k.xIncrement=null;k.colorCounter=0;u(this.parallelArrays,function(a){k[a+"Data"].length=0});if(p&&n>p){for(d=0;null===l&&d<n;)l=c[d],d++;if(m(l))for(d=
0;d<n;d++)x[d]=this.autoIncrement(),A[d]=c[d];else if(t(l))if(F)for(d=0;d<n;d++)l=c[d],x[d]=l[0],A[d]=l.slice(1,F+1);else for(d=0;d<n;d++)l=c[d],x[d]=l[0],A[d]=l[1];else a.error(12)}else for(d=0;d<n;d++)void 0!==c[d]&&(l={series:k},k.pointClass.prototype.applyOptions.apply(l,[c[d]]),k.updateParallelArrays(l,d));b(A[0])&&a.error(14,!0);k.data=[];k.options.data=k.userOptions.data=c;for(d=h;d--;)g[d]&&g[d].destroy&&g[d].destroy();q&&(q.minRange=q.userMinRange);k.isDirty=w.isDirtyBox=!0;k.isDirtyData=
!!g;d=!1}"point"===r.legendType&&(this.processData(),this.generatePoints());e&&w.redraw(d)},processData:function(b){var c=this.xData,k=this.yData,e=c.length,d;d=0;var g,f,m=this.xAxis,h,n=this.options;h=n.cropThreshold;var l=this.getExtremesFromAll||n.getExtremesFromAll,r=this.isCartesian,n=m&&m.val2lin,q=m&&m.isLog,t,p;if(r&&!this.isDirty&&!m.isDirty&&!this.yAxis.isDirty&&!b)return!1;m&&(b=m.getExtremes(),t=b.min,p=b.max);if(r&&this.sorted&&!l&&(!h||e>h||this.forceCrop))if(c[e-1]<t||c[0]>p)c=[],
k=[];else if(c[0]<t||c[e-1]>p)d=this.cropData(this.xData,this.yData,t,p),c=d.xData,k=d.yData,d=d.start,g=!0;for(h=c.length||1;--h;)e=q?n(c[h])-n(c[h-1]):c[h]-c[h-1],0<e&&(void 0===f||e<f)?f=e:0>e&&this.requireSorting&&a.error(15);this.cropped=g;this.cropStart=d;this.processedXData=c;this.processedYData=k;this.closestPointRange=f},cropData:function(a,b,c,e){var k=a.length,g=0,d=k,f=z(this.cropShoulder,1),h;for(h=0;h<k;h++)if(a[h]>=c){g=Math.max(0,h-f);break}for(c=h;c<k;c++)if(a[c]>e){d=c+f;break}return{xData:a.slice(g,
d),yData:b.slice(g,d),start:g,end:d}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,f=this.processedYData,g=this.pointClass,h=d.length,m=this.cropStart||0,n,r=this.hasGroupedData,l,q=[],t;b||r||(b=[],b.length=a.length,b=this.data=b);for(t=0;t<h;t++)n=m+t,r?(l=(new g).init(this,[d[t]].concat(e(f[t]))),l.dataGroup=this.groupMap[t]):(l=b[n])||void 0===a[n]||(b[n]=l=(new g).init(this,a[n],d[t])),l.index=n,q[t]=l;if(b&&(h!==(c=b.length)||r))for(t=0;t<c;t++)t!==m||
r||(t+=h),b[t]&&(b[t].destroyElements(),b[t].plotX=void 0);this.data=b;this.points=q},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,e,k=[],g=0;e=this.xAxis.getExtremes();var d=e.min,f=e.max,h,n,l,r;a=a||this.stackedYData||this.processedYData||[];e=a.length;for(r=0;r<e;r++)if(n=c[r],l=a[r],h=(m(l,!0)||t(l))&&(!b.isLog||l.length||0<l),n=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[r+1]||n)>=d&&(c[r-1]||n)<=f,h&&n)if(h=l.length)for(;h--;)null!==l[h]&&(k[g++]=
l[h]);else k[g++]=l;this.dataMin=I(k);this.dataMax=G(k)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,c=this.xAxis,e=c.categories,d=this.yAxis,g=this.points,f=g.length,n=!!this.modifyValue,r=a.pointPlacement,t="between"===r||m(r),q=a.threshold,p=a.startFromThreshold?q:0,x,u,A,F,v=Number.MAX_VALUE;"between"===r&&(r=.5);m(r)&&(r*=z(a.pointRange||c.pointRange));for(a=0;a<f;a++){var y=g[a],C=y.x,D=y.y;u=y.low;var G=b&&d.stacks[(this.negStacks&&
D<(p?0:q)?"-":"")+this.stackKey],I;d.isLog&&null!==D&&0>=D&&(y.isNull=!0);y.plotX=x=h(Math.min(Math.max(-1E5,c.translate(C,0,0,0,1,r,"flags"===this.type)),1E5));b&&this.visible&&!y.isNull&&G&&G[C]&&(F=this.getStackIndicator(F,C,this.index),I=G[C],D=I.points[F.key],u=D[0],D=D[1],u===p&&F.key===G[C].base&&(u=z(q,d.min)),d.isLog&&0>=u&&(u=null),y.total=y.stackTotal=I.total,y.percentage=I.total&&y.y/I.total*100,y.stackY=D,I.setOffset(this.pointXOffset||0,this.barW||0));y.yBottom=l(u)?d.translate(u,0,
1,0,1):null;n&&(D=this.modifyValue(D,y));y.plotY=u="number"===typeof D&&Infinity!==D?Math.min(Math.max(-1E5,d.translate(D,0,1,0,1)),1E5):void 0;y.isInside=void 0!==u&&0<=u&&u<=d.len&&0<=x&&x<=c.len;y.clientX=t?h(c.translate(C,0,0,0,1,r)):x;y.negative=y.y<(q||0);y.category=e&&void 0!==e[y.x]?e[y.x]:y.x;y.isNull||(void 0!==A&&(v=Math.min(v,Math.abs(x-A))),A=x);y.zone=this.zones.length&&y.getZone()}this.closestPointRangePx=v},getValidPoints:function(a,b){var c=this.chart;return y(a||this.points||[],
function(a){return b&&!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,e=b.renderer,k=b.inverted,g=this.clipBox,d=g||b.clipBox,f=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,d.height,c.xAxis,c.yAxis].join(),h=b[f],m=b[f+"m"];h||(a&&(d.width=0,b[f+"m"]=m=e.clipRect(-99,k?-b.plotLeft:-b.plotTop,99,k?b.chartWidth:b.chartHeight)),b[f]=h=e.clipRect(d),h.count={length:0});a&&!h.count[this.index]&&(h.count[this.index]=!0,h.count.length+=
1);!1!==c.clip&&(this.group.clip(a||g?h:b.clipRect),this.markerGroup.clip(m),this.sharedClipKey=f);a||(h.count[this.index]&&(delete h.count[this.index],--h.count.length),0===h.count.length&&f&&b[f]&&(g||(b[f]=b[f].destroy()),b[f+"m"]&&(b[f+"m"]=b[f+"m"].destroy())))},animate:function(a){var b=this.chart,c=C(this.options.animation),e;a?this.setClip(c):(e=this.sharedClipKey,(a=b[e])&&a.animate({width:b.plotSizeX},c),b[e+"m"]&&b[e+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();
n(this,"afterAnimate")},drawPoints:function(){var a=this.points,b=this.chart,c,e,d,g,f=this.options.marker,h,n,r,l,t=this.markerGroup,q=z(f.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>2*f.radius);if(!1!==f.enabled||this._hasPointMarkers)for(e=a.length;e--;)d=a[e],c=d.plotY,g=d.graphic,h=d.marker||{},n=!!d.marker,r=q&&void 0===h.enabled||h.enabled,l=d.isInside,r&&m(c)&&null!==d.y?(c=z(h.symbol,this.symbol),d.hasImage=0===c.indexOf("url"),r=this.markerAttribs(d,d.selected&&"select"),
g?g[l?"show":"hide"](!0).animate(r):l&&(0<r.width||d.hasImage)&&(d.graphic=g=b.renderer.symbol(c,r.x,r.y,r.width,r.height,n?h:f).add(t)),g&&g.attr(this.pointAttribs(d,d.selected&&"select")),g&&g.addClass(d.getClassName(),!0)):g&&(d.graphic=g.destroy())},markerAttribs:function(a,b){var c=this.options.marker,e=a&&a.options,k=e&&e.marker||{},e=z(k.radius,c.radius);b&&(c=c.states[b],b=k.states&&k.states[b],e=z(b&&b.radius,c&&c.radius,e+(c&&c.radiusPlus||0)));a.hasImage&&(e=0);a={x:Math.floor(a.plotX)-
e,y:a.plotY-e};e&&(a.width=a.height=2*e);return a},pointAttribs:function(a,b){var c=this.options.marker,e=a&&a.options,k=e&&e.marker||{},g=this.color,d=e&&e.color,f=a&&a.color,e=z(k.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;g=d||a||f||g;a=k.fillColor||c.fillColor||g;g=k.lineColor||c.lineColor||g;b&&(c=c.states[b],b=k.states&&k.states[b]||{},e=z(b.lineWidth,c.lineWidth,e+z(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,g=b.lineColor||c.lineColor||g);return{stroke:g,"stroke-width":e,
fill:a}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(A.navigator.userAgent),e,f=a.data||[],g,h,m;n(a,"destroy");F(a);u(a.axisTypes||[],function(b){(m=a[b])&&m.series&&(d(m.series,a),m.isDirty=m.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(e=f.length;e--;)(g=f[e])&&g.destroy&&g.destroy();a.points=null;clearTimeout(a.animationTimeout);for(h in a)a[h]instanceof r&&!a[h].survive&&(e=c&&"group"===h?"hide":"destroy",a[h][e]());b.hoverSeries===a&&(b.hoverSeries=
null);d(b.series,a);for(h in a)delete a[h]},getGraphPath:function(a,b,c){var e=this,k=e.options,g=k.step,d,f=[],h=[],m;a=a||e.points;(d=a.reversed)&&a.reverse();(g={right:1,center:2}[g]||g&&3)&&d&&(g=4-g);!k.connectNulls||b||c||(a=this.getValidPoints(a));u(a,function(d,n){var r=d.plotX,t=d.plotY,q=a[n-1];(d.leftCliff||q&&q.rightCliff)&&!c&&(m=!0);d.isNull&&!l(b)&&0<n?m=!k.connectNulls:d.isNull&&!b?m=!0:(0===n||m?n=["M",d.plotX,d.plotY]:e.getPointSpline?n=e.getPointSpline(a,d,n):g?(n=1===g?["L",q.plotX,
t]:2===g?["L",(q.plotX+r)/2,q.plotY,"L",(q.plotX+r)/2,t]:["L",r,q.plotY],n.push("L",r,t)):n=["L",r,t],h.push(d.x),g&&h.push(d.x),f.push.apply(f,n),m=!1)});f.xMap=h;return e.graphPath=f},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),e=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];u(this.zones,function(c,g){e.push(["zone-graph-"+g,"highcharts-graph highcharts-zone-graph-"+g+" "+(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});
u(e,function(e,g){var k=e[0],d=a[k];d?(d.endX=c.xMap,d.animate({d:c})):c.length&&(a[k]=a.chart.renderer.path(c).addClass(e[1]).attr({zIndex:1}).add(a.group),d={stroke:e[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},e[3]?d.dashstyle=e[3]:"square"!==b.linecap&&(d["stroke-linecap"]=d["stroke-linejoin"]="round"),d=a[k].attr(d).shadow(2>g&&b.shadow));d&&(d.startX=c.xMap,d.isArea=c.isArea)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,e=this.zones,d,g,f=this.clips||[],
h,m=this.graph,n=this.area,r=Math.max(b.chartWidth,b.chartHeight),l=this[(this.zoneAxis||"y")+"Axis"],q,t,p=b.inverted,x,A,F,y,v=!1;e.length&&(m||n)&&l&&void 0!==l.min&&(t=l.reversed,x=l.horiz,m&&m.hide(),n&&n.hide(),q=l.getExtremes(),u(e,function(e,k){d=t?x?b.plotWidth:0:x?0:l.toPixels(q.min);d=Math.min(Math.max(z(g,d),0),r);g=Math.min(Math.max(Math.round(l.toPixels(z(e.value,q.max),!0)),0),r);v&&(d=g=l.toPixels(q.max));A=Math.abs(d-g);F=Math.min(d,g);y=Math.max(d,g);l.isXAxis?(h={x:p?y:F,y:0,width:A,
height:r},x||(h.x=b.plotHeight-h.x)):(h={x:0,y:p?y:F,width:r,height:A},x&&(h.y=b.plotWidth-h.y));p&&c.isVML&&(h=l.isXAxis?{x:0,y:t?F:y,height:h.width,width:b.chartWidth}:{x:h.y-b.plotLeft-b.spacingBox.x,y:0,width:h.height,height:b.chartHeight});f[k]?f[k].animate(h):(f[k]=c.clipRect(h),m&&a["zone-graph-"+k].clip(f[k]),n&&a["zone-area-"+k].clip(f[k]));v=e.value>q.max}),this.clips=f)},invertGroups:function(a){function b(){var b={width:c.yAxis.len,height:c.xAxis.len};u(["group","markerGroup"],function(e){c[e]&&
c[e].attr(b).invert(a)})}var c=this,e;c.xAxis&&(e=D(c.chart,"resize",b),D(c,"destroy",e),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,e,d){var g=this[a],k=!g;k&&(this[a]=g=this.chart.renderer.g(b).attr({zIndex:e||.1}).add(d),g.addClass("highcharts-series-"+this.index+" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+" "+(this.options.className||"")));g.attr({visibility:c})[k?"attr":"animate"](this.getPlotBox());return g},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=
this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,e=a.options,d=!!a.animate&&b.renderer.isSVG&&C(e.animation).duration,g=a.visible?"inherit":"hidden",f=e.zIndex,h=a.hasRendered,m=b.seriesGroup,n=b.inverted;c=a.plotGroup("group","series",g,f,m);a.markerGroup=a.plotGroup("markerGroup","markers",g,f,m);d&&a.animate(!0);c.inverted=a.isCartesian?n:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());
a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(n);!1===e.clip||a.sharedClipKey||h||c.clip(b.clipRect);d&&a.animate();h||(a.animationTimeout=x(function(){a.afterAnimate()},d));a.isDirty=a.isDirtyData=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,e=this.xAxis,d=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:z(e&&
e.left,a.plotLeft),translateY:z(d&&d.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdDimensions:1,kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,e=this.yAxis,d=this.chart.inverted;return this.searchKDTree({clientX:d?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:d?e.len-a.chartX+e.pos:a.chartY-e.pos},b)},buildKDTree:function(){function a(c,e,g){var d,k;if(k=c&&c.length)return d=b.kdAxisArray[e%g],c.sort(function(a,b){return a[d]-b[d]}),k=Math.floor(k/
2),{point:c[k],left:a(c.slice(0,k),e+1,g),right:a(c.slice(k+1),e+1,g)}}var b=this,c=b.kdDimensions;delete b.kdTree;x(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c)},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,f,h){var m=b.point,n=e.kdAxisArray[f%h],r,q,t=m;q=l(a[d])&&l(m[d])?Math.pow(a[d]-m[d],2):null;r=l(a[g])&&l(m[g])?Math.pow(a[g]-m[g],2):null;r=(q||0)+(r||0);m.dist=l(r)?Math.sqrt(r):Number.MAX_VALUE;m.distX=l(q)?Math.sqrt(q):Number.MAX_VALUE;n=a[n]-m[n];r=
0>n?"left":"right";q=0>n?"right":"left";b[r]&&(r=c(a,b[r],f+1,h),t=r[k]<t[k]?r:m);b[q]&&Math.sqrt(n*n)<t[k]&&(a=c(a,b[q],f+1,h),t=a[k]<t[k]?a:t);return t}var e=this,d=this.kdAxisArray[0],g=this.kdAxisArray[1],k=b?"distX":"dist";this.kdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,this.kdDimensions,this.kdDimensions)}})})(L);(function(a){function D(a,d,c,f,h){var n=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=d;this.x=f;this.total=null;this.points={};this.stack=h;this.rightCliff=
this.leftCliff=0;this.alignOptions={align:d.align||(n?c?"left":"right":"center"),verticalAlign:d.verticalAlign||(n?"middle":c?"bottom":"top"),y:l(d.y,n?4:c?14:-6),x:l(d.x,n?c?-6:6:0)};this.textAlign=d.textAlign||(n?c?"right":"left":"center")}var C=a.Axis,G=a.Chart,I=a.correctFloat,h=a.defined,f=a.destroyObjectProperties,p=a.each,v=a.format,l=a.pick;a=a.Series;D.prototype={destroy:function(){f(this,this.axis)},render:function(a){var d=this.options,c=d.format,c=c?v(c,this):d.formatter.call(this);this.label?
this.label.attr({text:c,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(c,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,d){var c=this.axis,f=c.chart,h=f.inverted,l=c.reversed,l=this.isNegative&&!l||!this.isNegative&&l,m=c.translate(c.usePercentage?100:this.total,0,0,0,1),c=c.translate(0),c=Math.abs(m-c);a=f.xAxis[0].translate(this.x)+a;var b=f.plotHeight,h={x:h?l?m:m-c:a,y:h?b-a-d:l?b-m-c:b-m,width:h?
c:d,height:h?d:c};if(d=this.label)d.align(this.alignOptions,null,h),h=d.alignAttr,d[!1===this.options.crop||f.isInsidePlot(h.x,h.y)?"show":"hide"](!0)}};G.prototype.getStacks=function(){var a=this;p(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});p(a.series,function(d){!d.options.stacking||!0!==d.visible&&!1!==a.options.chart.ignoreHiddenSeries||(d.stackKey=d.type+l(d.options.stack,""))})};C.prototype.buildStacks=function(){var a=this.series,d,c=l(this.options.reversedStacks,
!0),f=a.length,h;if(!this.isXAxis){this.usePercentage=!1;for(h=f;h--;)a[c?h:f-h-1].setStackedPoints();for(h=f;h--;)d=a[c?h:f-h-1],d.setStackCliffs&&d.setStackCliffs();if(this.usePercentage)for(h=0;h<f;h++)a[h].setPercentStacks()}};C.prototype.renderStackTotals=function(){var a=this.chart,d=a.renderer,c=this.stacks,f,h,l=this.stackTotalGroup;l||(this.stackTotalGroup=l=d.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());l.translate(a.plotLeft,a.plotTop);for(f in c)for(h in a=c[f],a)a[h].render(l)};
C.prototype.resetStacks=function(){var a=this.stacks,d,c;if(!this.isXAxis)for(d in a)for(c in a[d])a[d][c].touched<this.stacksTouched?(a[d][c].destroy(),delete a[d][c]):(a[d][c].total=null,a[d][c].cum=null)};C.prototype.cleanStacks=function(){var a,d,c;if(!this.isXAxis)for(d in this.oldStacks&&(a=this.stacks=this.oldStacks),a)for(c in a[d])a[d][c].cum=a[d][c].total};a.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var a=
this.processedXData,d=this.processedYData,c=[],f=d.length,p=this.options,t=p.threshold,m=p.startFromThreshold?t:0,b=p.stack,p=p.stacking,q=this.stackKey,v="-"+q,F=this.negStacks,e=this.yAxis,r=e.stacks,x=e.oldStacks,A,k,w,C,J,G,g;e.stacksTouched+=1;for(J=0;J<f;J++)G=a[J],g=d[J],A=this.getStackIndicator(A,G,this.index),C=A.key,w=(k=F&&g<(m?0:t))?v:q,r[w]||(r[w]={}),r[w][G]||(x[w]&&x[w][G]?(r[w][G]=x[w][G],r[w][G].total=null):r[w][G]=new D(e,e.options.stackLabels,k,G,b)),w=r[w][G],null!==g&&(w.points[C]=
w.points[this.index]=[l(w.cum,m)],h(w.cum)||(w.base=C),w.touched=e.stacksTouched,0<A.index&&!1===this.singleStacks&&(w.points[C][0]=w.points[this.index+","+G+",0"][0])),"percent"===p?(k=k?q:v,F&&r[k]&&r[k][G]?(k=r[k][G],w.total=k.total=Math.max(k.total,w.total)+Math.abs(g)||0):w.total=I(w.total+(Math.abs(g)||0))):w.total=I(w.total+(g||0)),w.cum=l(w.cum,m)+(g||0),null!==g&&(w.points[C].push(w.cum),c[J]=w.cum);"percent"===p&&(e.usePercentage=!0);this.stackedYData=c;e.oldStacks={}}};a.prototype.setPercentStacks=
function(){var a=this,d=a.stackKey,c=a.yAxis.stacks,f=a.processedXData,h;p([d,"-"+d],function(d){for(var m=f.length,b,n;m--;)if(b=f[m],h=a.getStackIndicator(h,b,a.index,d),b=(n=c[d]&&c[d][b])&&n.points[h.key])n=n.total?100/n.total:0,b[0]=I(b[0]*n),b[1]=I(b[1]*n),a.stackedYData[m]=b[1]})};a.prototype.getStackIndicator=function(a,d,c,f){!h(a)||a.x!==d||f&&a.key!==f?a={x:d,index:0,key:f}:a.index++;a.key=[c,d,a.index].join();return a}})(L);(function(a){var D=a.addEvent,C=a.animate,G=a.Axis,I=a.createElement,
h=a.css,f=a.defined,p=a.each,v=a.erase,l=a.extend,u=a.fireEvent,d=a.inArray,c=a.isNumber,n=a.isObject,y=a.merge,t=a.pick,m=a.Point,b=a.Series,q=a.seriesTypes,z=a.setAnimation,F=a.splat;l(a.Chart.prototype,{addSeries:function(a,b,c){var e,d=this;a&&(b=t(b,!0),u(d,"addSeries",{options:a},function(){e=d.initSeries(a);d.isDirtyLegend=!0;d.linkSeries();b&&d.redraw(c)}));return e},addAxis:function(a,b,c,d){var e=b?"xAxis":"yAxis",f=this.options;a=y(a,{index:this[e].length,isX:b});new G(this,a);f[e]=F(f[e]||
{});f[e].push(a);t(c,!0)&&this.redraw(d)},showLoading:function(a){var b=this,c=b.options,e=b.loadingDiv,d=c.loading,f=function(){e&&h(e,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};e||(b.loadingDiv=e=I("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=I("span",{className:"highcharts-loading-inner"},null,e),D(b,"redraw",f));e.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;h(e,l(d.style,
{zIndex:10}));h(b.loadingSpan,d.labelStyle);b.loadingShown||(h(e,{opacity:0,display:""}),C(e,{opacity:d.style.opacity||.5},{duration:d.showDuration||0}));b.loadingShown=!0;f()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",C(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){h(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions".split(" "),update:function(a,b){var e,h={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},k=a.chart,m,n;if(k){y(!0,this.options.chart,k);"className"in k&&this.setClassName(k.className);if("inverted"in k||"polar"in k)this.propFromSeries(),m=!0;for(e in k)k.hasOwnProperty(e)&&(-1!==d("chart."+e,this.propsRequireUpdateSeries)&&(n=!0),-1!==d(e,this.propsRequireDirtyBox)&&(this.isDirtyBox=
!0));"style"in k&&this.renderer.setStyle(k.style)}for(e in a){if(this[e]&&"function"===typeof this[e].update)this[e].update(a[e],!1);else if("function"===typeof this[h[e]])this[h[e]](a[e]);"chart"!==e&&-1!==d(e,this.propsRequireUpdateSeries)&&(n=!0)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&y(!0,this.options.plotOptions,a.plotOptions);p(["xAxis","yAxis","series"],function(b){a[b]&&p(F(a[b]),function(a){var c=f(a.id)&&this.get(a.id)||this[b][0];c&&c.coll===b&&c.update(a,!1)},this)},this);
m&&p(this.axes,function(a){a.update({},!1)});n&&p(this.series,function(a){a.update({},!1)});a.loading&&y(!0,this.options.loading,a.loading);e=k&&k.width;k=k&&k.height;c(e)&&e!==this.chartWidth||c(k)&&k!==this.chartHeight?this.setSize(e,k):t(b,!0)&&this.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});l(m.prototype,{update:function(a,b,c,d){function e(){f.applyOptions(a);null===f.y&&m&&(f.graphic=m.destroy());n(a,!0)&&(m&&m.element&&a&&a.marker&&a.marker.symbol&&(f.graphic=m.destroy()),
a&&a.dataLabels&&f.dataLabel&&(f.dataLabel=f.dataLabel.destroy()));l=f.index;h.updateParallelArrays(f,l);r.data[l]=n(r.data[l],!0)?f.options:a;h.isDirty=h.isDirtyData=!0;!h.fixedBox&&h.hasCartesianSeries&&(g.isDirtyBox=!0);"point"===r.legendType&&(g.isDirtyLegend=!0);b&&g.redraw(c)}var f=this,h=f.series,m=f.graphic,l,g=h.chart,r=h.options;b=t(b,!0);!1===d?e():f.firePointEvent("update",{options:a},e)},remove:function(a,b){this.series.removePoint(d(this,this.series.data),a,b)}});l(b.prototype,{addPoint:function(a,
b,c,d){var e=this.options,f=this.data,h=this.chart,m=this.xAxis&&this.xAxis.names,n=e.data,g,l,r=this.xData,q,p;b=t(b,!0);g={series:this};this.pointClass.prototype.applyOptions.apply(g,[a]);p=g.x;q=r.length;if(this.requireSorting&&p<r[q-1])for(l=!0;q&&r[q-1]>p;)q--;this.updateParallelArrays(g,"splice",q,0,0);this.updateParallelArrays(g,q);m&&g.name&&(m[p]=g.name);n.splice(q,0,a);l&&(this.data.splice(q,0,null),this.processData());"point"===e.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?
f[0].remove(!1):(f.shift(),this.updateParallelArrays(g,"shift"),n.shift()));this.isDirtyData=this.isDirty=!0;b&&h.redraw(d)},removePoint:function(a,b,c){var e=this,d=e.data,f=d[a],h=e.points,m=e.chart,n=function(){h&&h.length===d.length&&h.splice(a,1);d.splice(a,1);e.options.data.splice(a,1);e.updateParallelArrays(f||{series:e},"splice",a,1);f&&f.destroy();e.isDirty=!0;e.isDirtyData=!0;b&&m.redraw()};z(c,m);b=t(b,!0);f?f.firePointEvent("remove",null,n):n()},remove:function(a,b,c){function e(){d.destroy();
f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();t(a,!0)&&f.redraw(b)}var d=this,f=d.chart;!1!==c?u(d,"remove",null,e):e()},update:function(a,b){var c=this,e=this.chart,d=this.userOptions,f=this.type,h=a.type||d.type||e.options.chart.type,m=q[f].prototype,n=["group","markerGroup","dataLabelsGroup"],g;if(h&&h!==f||void 0!==a.zIndex)n.length=0;p(n,function(a){n[a]=c[a];delete c[a]});a=y(d,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1,null,!1);for(g in m)this[g]=
void 0;l(this,q[h||f].prototype);p(n,function(a){c[a]=n[a]});this.init(e,a);e.linkSeries();t(b,!0)&&e.redraw(!1)}});l(G.prototype,{update:function(a,b){var c=this.chart;a=c.options[this.coll][this.options.index]=y(this.userOptions,a);this.destroy(!0);this.init(c,l(a,{events:void 0}));c.isDirtyBox=!0;t(b,!0)&&c.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,e=this.series,d=e.length;d--;)e[d]&&e[d].remove(!1);v(b.axes,this);v(b[c],this);b.options[c].splice(this.options.index,1);p(b[c],
function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;t(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(L);(function(a){var D=a.color,C=a.each,G=a.map,I=a.pick,h=a.Series,f=a.seriesType;f("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(){var a=[],f=[],h=this.xAxis,u=this.yAxis,d=u.stacks[this.stackKey],c={},n=this.points,y=this.index,t=u.series,m=t.length,b,q=I(u.options.reversedStacks,
!0)?1:-1,z,F;if(this.options.stacking){for(z=0;z<n.length;z++)c[n[z].x]=n[z];for(F in d)null!==d[F].total&&f.push(F);f.sort(function(a,b){return a-b});b=G(t,function(){return this.visible});C(f,function(e,n){var l=0,r,k;if(c[e]&&!c[e].isNull)a.push(c[e]),C([-1,1],function(a){var h=1===a?"rightNull":"leftNull",l=0,t=d[f[n+a]];if(t)for(z=y;0<=z&&z<m;)r=t.points[z],r||(z===y?c[e][h]=!0:b[z]&&(k=d[e].points[z])&&(l-=k[1]-k[0])),z+=q;c[e][1===a?"rightCliff":"leftCliff"]=l});else{for(z=y;0<=z&&z<m;){if(r=
d[e].points[z]){l=r[1];break}z+=q}l=u.toPixels(l,!0);a.push({isNull:!0,plotX:h.toPixels(e,!0),plotY:l,yBottom:l})}})}return a},getGraphPath:function(a){var f=h.prototype.getGraphPath,l=this.options,p=l.stacking,d=this.yAxis,c,n,y=[],t=[],m=this.index,b,q=d.stacks[this.stackKey],z=l.threshold,F=d.getThreshold(l.threshold),e,l=l.connectNulls||"percent"===p,r=function(c,e,f){var k=a[c];c=p&&q[k.x].points[m];var h=k[f+"Null"]||0;f=k[f+"Cliff"]||0;var n,l,k=!0;f||h?(n=(h?c[0]:c[1])+f,l=c[0]+f,k=!!h):!p&&
a[e]&&a[e].isNull&&(n=l=z);void 0!==n&&(t.push({plotX:b,plotY:null===n?F:d.getThreshold(n),isNull:k}),y.push({plotX:b,plotY:null===l?F:d.getThreshold(l),doCurve:!1}))};a=a||this.points;p&&(a=this.getStackPoints());for(c=0;c<a.length;c++)if(n=a[c].isNull,b=I(a[c].rectPlotX,a[c].plotX),e=I(a[c].yBottom,F),!n||l)l||r(c,c-1,"left"),n&&!p&&l||(t.push(a[c]),y.push({x:c,plotX:b,plotY:e})),l||r(c,c+1,"right");c=f.call(this,t,!0,!0);y.reversed=!0;n=f.call(this,y,!0,!0);n.length&&(n[0]="L");n=c.concat(n);f=
f.call(this,t,!1,l);n.xMap=c.xMap;this.areaPath=n;return f},drawGraph:function(){this.areaPath=[];h.prototype.drawGraph.apply(this);var a=this,f=this.areaPath,l=this.options,u=[["area","highcharts-area",this.color,l.fillColor]];C(this.zones,function(d,c){u.push(["zone-area-"+c,"highcharts-area highcharts-zone-area-"+c+" "+d.className,d.color||a.color,d.fillColor||l.fillColor])});C(u,function(d){var c=d[0],h=a[c];h?(h.endX=f.xMap,h.animate({d:f})):(h=a[c]=a.chart.renderer.path(f).addClass(d[1]).attr({fill:I(d[3],
D(d[2]).setOpacity(I(l.fillOpacity,.75)).get()),zIndex:0}).add(a.group),h.isArea=!0);h.startX=f.xMap;h.shiftUnit=l.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);(function(a){var D=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,G,I){var h=G.plotX,f=G.plotY,p=a[I-1];I=a[I+1];var v,l,u,d;if(p&&!p.isNull&&!1!==p.doCurve&&I&&!I.isNull&&!1!==I.doCurve){a=p.plotY;u=I.plotX;I=I.plotY;var c=0;v=(1.5*h+p.plotX)/2.5;l=(1.5*f+a)/2.5;u=(1.5*h+u)/2.5;d=(1.5*f+I)/2.5;
u!==v&&(c=(d-l)*(u-h)/(u-v)+f-d);l+=c;d+=c;l>a&&l>f?(l=Math.max(a,f),d=2*f-l):l<a&&l<f&&(l=Math.min(a,f),d=2*f-l);d>I&&d>f?(d=Math.max(I,f),l=2*f-d):d<I&&d<f&&(d=Math.min(I,f),l=2*f-d);G.rightContX=u;G.rightContY=d}G=["C",D(p.rightContX,p.plotX),D(p.rightContY,p.plotY),D(v,h),D(l,f),h,f];p.rightContX=p.rightContY=null;return G}})})(L);(function(a){var D=a.seriesTypes.area.prototype,C=a.seriesType;C("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:D.getStackPoints,getGraphPath:D.getGraphPath,
setStackCliffs:D.setStackCliffs,drawGraph:D.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);(function(a){var D=a.animObject,C=a.color,G=a.each,I=a.extend,h=a.isNumber,f=a.merge,p=a.pick,v=a.Series,l=a.seriesType,u=a.svg;l("column","line",{borderRadius:0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,
y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){v.prototype.init.apply(this,arguments);var a=this,c=a.chart;c.hasRendered&&G(c.series,function(c){c.type===a.type&&(c.isDirty=!0)})},getColumnMetrics:function(){var a=this,c=a.options,f=a.xAxis,h=a.yAxis,l=f.reversed,m,b={},q=0;!1===c.grouping?q=1:G(a.chart.series,function(c){var e=
c.options,d=c.yAxis,f;c.type===a.type&&c.visible&&h.len===d.len&&h.pos===d.pos&&(e.stacking?(m=c.stackKey,void 0===b[m]&&(b[m]=q++),f=b[m]):!1!==e.grouping&&(f=q++),c.columnIndex=f)});var u=Math.min(Math.abs(f.transA)*(f.ordinalSlope||c.pointRange||f.closestPointRange||f.tickInterval||1),f.len),F=u*c.groupPadding,e=(u-2*F)/q,c=Math.min(c.maxPointWidth||f.len,p(c.pointWidth,e*(1-2*c.pointPadding)));a.columnMetrics={width:c,offset:(e-c)/2+(F+((a.columnIndex||0)+(l?1:0))*e-u/2)*(l?-1:1)};return a.columnMetrics},
crispCol:function(a,c,f,h){var d=this.chart,m=this.borderWidth,b=-(m%2?.5:0),m=m%2?.5:1;d.inverted&&d.renderer.isVML&&(m+=1);f=Math.round(a+f)+b;a=Math.round(a)+b;h=Math.round(c+h)+m;b=.5>=Math.abs(c)&&.5<h;c=Math.round(c)+m;h-=c;b&&h&&(--c,h+=1);return{x:a,y:c,width:f-a,height:h}},translate:function(){var a=this,c=a.chart,f=a.options,h=a.dense=2>a.closestPointRange*a.xAxis.transA,h=a.borderWidth=p(f.borderWidth,h?0:1),l=a.yAxis,m=a.translatedThreshold=l.getThreshold(f.threshold),b=p(f.minPointLength,
5),q=a.getColumnMetrics(),u=q.width,F=a.barW=Math.max(u,1+2*h),e=a.pointXOffset=q.offset;c.inverted&&(m-=.5);f.pointPadding&&(F=Math.ceil(F));v.prototype.translate.apply(a);G(a.points,function(d){var f=p(d.yBottom,m),h=999+Math.abs(f),h=Math.min(Math.max(-h,d.plotY),l.len+h),k=d.plotX+e,n=F,q=Math.min(h,f),r,t=Math.max(h,f)-q;Math.abs(t)<b&&b&&(t=b,r=!l.reversed&&!d.negative||l.reversed&&d.negative,q=Math.abs(q-m)>b?f-b:m-(r?b:0));d.barX=k;d.pointWidth=u;d.tooltipPos=c.inverted?[l.len+l.pos-c.plotLeft-
h,a.xAxis.len-k-n/2,t]:[k+n/2,h+l.pos-c.plotTop,t];d.shapeType="rect";d.shapeArgs=a.crispCol.apply(a,d.isNull?[d.plotX,l.len/2,0,0]:[k,q,n,t])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,c){var d=this.options,f,h=this.pointAttrToOptions||{};f=h.stroke||"borderColor";var m=h["stroke-width"]||"borderWidth",b=a&&a.color||this.color,l=a[f]||d[f]||this.color||
b,p=a[m]||d[m]||this[m]||0,h=d.dashStyle;a&&this.zones.length&&(b=(b=a.getZone())&&b.color||a.options.color||this.color);c&&(a=d.states[c],c=a.brightness,b=a.color||void 0!==c&&C(b).brighten(a.brightness).get()||b,l=a[f]||l,p=a[m]||p,h=a.dashStyle||h);f={fill:b,stroke:l,"stroke-width":p};d.borderRadius&&(f.r=d.borderRadius);h&&(f.dashstyle=h);return f},drawPoints:function(){var a=this,c=this.chart,l=a.options,p=c.renderer,t=l.animationLimit||250,m;G(a.points,function(b){var d=b.graphic;if(h(b.plotY)&&
null!==b.y){m=b.shapeArgs;if(d)d[c.pointCount<t?"animate":"attr"](f(m));else b.graphic=d=p[b.shapeType](m).attr({"class":b.getClassName()}).add(b.group||a.group);d.attr(a.pointAttribs(b,b.selected&&"select")).shadow(l.shadow,null,l.stacking&&!l.borderRadius)}else d&&(b.graphic=d.destroy())})},animate:function(a){var c=this,d=this.yAxis,f=c.options,h=this.chart.inverted,m={};u&&(a?(m.scaleY=.001,a=Math.min(d.pos+d.len,Math.max(d.pos,d.toPixels(f.threshold))),h?m.translateX=a-d.len:m.translateY=a,c.group.attr(m)):
(m[h?"translateX":"translateY"]=d.pos,c.group.animate(m,I(D(c.options.animation),{step:function(a,d){c.group.attr({scaleY:Math.max(.001,d.pos)})}})),c.animate=null))},remove:function(){var a=this,c=a.chart;c.hasRendered&&G(c.series,function(c){c.type===a.type&&(c.isDirty=!0)});v.prototype.remove.apply(a,arguments)}})})(L);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(L);(function(a){var D=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,kdDimensions:2,drawGraph:function(){this.options.lineWidth&&D.prototype.drawGraph.call(this)}})})(L);(function(a){var D=a.pick,C=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,I=this.chart,h=2*(a.slicedOffset||0),f=I.plotWidth-2*h,I=I.plotHeight-
2*h,p=a.center,p=[D(p[0],"50%"),D(p[1],"50%"),a.size||"100%",a.innerSize||0],v=Math.min(f,I),l,u;for(l=0;4>l;++l)u=p[l],a=2>l||2===l&&/%$/.test(u),p[l]=C(u,[f,I,v,p[2]][l])+(a?h:0);p[3]>p[2]&&(p[3]=p[2]);return p}}})(L);(function(a){var D=a.addEvent,C=a.defined,G=a.each,I=a.extend,h=a.inArray,f=a.noop,p=a.pick,v=a.Point,l=a.Series,u=a.seriesType,d=a.setAnimation;u("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return null===this.y?
void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var c=this,d=c.points,f=c.startAngleRad;a||(G(d,function(a){var b=
a.graphic,d=a.shapeArgs;b&&(b.attr({r:a.startR||c.center[3]/2,start:f,end:f}),b.animate({r:d.r,start:d.start,end:d.end},c.options.animation))}),c.animate=null)},updateTotals:function(){var a,d=0,f=this.points,h=f.length,m,b=this.options.ignoreHiddenPoint;for(a=0;a<h;a++)m=f[a],0>m.y&&(m.y=null),d+=b&&!m.visible?0:m.y;this.total=d;for(a=0;a<h;a++)m=f[a],m.percentage=0<d&&(m.visible||!b)?m.y/d*100:0,m.total=d},generatePoints:function(){l.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();
var c=0,d=this.options,f=d.slicedOffset,h=f+(d.borderWidth||0),b,l,u,F=d.startAngle||0,e=this.startAngleRad=Math.PI/180*(F-90),F=(this.endAngleRad=Math.PI/180*(p(d.endAngle,F+360)-90))-e,r=this.points,x=d.dataLabels.distance,d=d.ignoreHiddenPoint,A,k=r.length,w;a||(this.center=a=this.getCenter());this.getX=function(b,c){u=Math.asin(Math.min((b-a[1])/(a[2]/2+x),1));return a[0]+(c?-1:1)*Math.cos(u)*(a[2]/2+x)};for(A=0;A<k;A++){w=r[A];b=e+c*F;if(!d||w.visible)c+=w.percentage/100;l=e+c*F;w.shapeType=
"arc";w.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*b)/1E3,end:Math.round(1E3*l)/1E3};u=(l+b)/2;u>1.5*Math.PI?u-=2*Math.PI:u<-Math.PI/2&&(u+=2*Math.PI);w.slicedTranslation={translateX:Math.round(Math.cos(u)*f),translateY:Math.round(Math.sin(u)*f)};b=Math.cos(u)*a[2]/2;l=Math.sin(u)*a[2]/2;w.tooltipPos=[a[0]+.7*b,a[1]+.7*l];w.half=u<-Math.PI/2||u>Math.PI/2?1:0;w.angle=u;h=Math.min(h,x/5);w.labelPos=[a[0]+b+Math.cos(u)*x,a[1]+l+Math.sin(u)*x,a[0]+b+Math.cos(u)*h,a[1]+l+Math.sin(u)*
h,a[0]+b,a[1]+l,0>x?"center":w.half?"right":"left",u]}},drawGraph:null,drawPoints:function(){var a=this,d=a.chart.renderer,f,h,m,b,l=a.options.shadow;l&&!a.shadowGroup&&(a.shadowGroup=d.g("shadow").add(a.group));G(a.points,function(c){if(null!==c.y){h=c.graphic;b=c.shapeArgs;f=c.sliced?c.slicedTranslation:{};var n=c.shadowGroup;l&&!n&&(n=c.shadowGroup=d.g("shadow").add(a.shadowGroup));n&&n.attr(f);m=a.pointAttribs(c,c.selected&&"select");h?h.setRadialReference(a.center).attr(m).animate(I(b,f)):(c.graphic=
h=d[c.shapeType](b).addClass(c.getClassName()).setRadialReference(a.center).attr(f).add(a.group),c.visible||h.attr({visibility:"hidden"}),h.attr(m).attr({"stroke-linejoin":"round"}).shadow(l,n))}})},searchPoint:f,sortByAngle:function(a,d){a.sort(function(a,c){return void 0!==a.angle&&(c.angle-a.angle)*d})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:f},{init:function(){v.prototype.init.apply(this,arguments);var a=this,d;a.name=p(a.name,"Slice");
d=function(c){a.slice("select"===c.type)};D(a,"select",d);D(a,"unselect",d);return a},setVisible:function(a,d){var c=this,f=c.series,m=f.chart,b=f.options.ignoreHiddenPoint;d=p(d,b);a!==c.visible&&(c.visible=c.options.visible=a=void 0===a?!c.visible:a,f.options.data[h(c,f.data)]=c.options,G(["graphic","dataLabel","connector","shadowGroup"],function(b){if(c[b])c[b][a?"show":"hide"](!0)}),c.legendItem&&m.legend.colorizeItem(c,a),a||"hover"!==c.state||c.setState(""),b&&(f.isDirty=!0),d&&m.redraw())},
slice:function(a,f,l){var c=this.series;d(l,c.chart);p(f,!0);this.sliced=this.options.sliced=a=C(a)?a:!this.sliced;c.options.data[h(this,c.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)},haloPath:function(a){var c=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.x,c.y,c.r+a,c.r+a,{innerR:this.shapeArgs.r,start:c.start,end:c.end})}})})(L);(function(a){var D=
a.addEvent,C=a.arrayMax,G=a.defined,I=a.each,h=a.extend,f=a.format,p=a.map,v=a.merge,l=a.noop,u=a.pick,d=a.relativeLength,c=a.Series,n=a.seriesTypes,y=a.stableSort;a.distribute=function(a,c){function b(a,b){return a.target-b.target}var d,f=!0,h=a,e=[],m;m=0;for(d=a.length;d--;)m+=a[d].size;if(m>c){y(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(m=d=0;m<=c;)m+=a[d].size,d++;e=a.splice(d-1,a.length)}y(a,b);for(a=p(a,function(a){return{size:a.size,targets:[a.target]}});f;){for(d=a.length;d--;)f=
a[d],m=(Math.min.apply(0,f.targets)+Math.max.apply(0,f.targets))/2,f.pos=Math.min(Math.max(0,m-f.size/2),c-f.size);d=a.length;for(f=!1;d--;)0<d&&a[d-1].pos+a[d-1].size>a[d].pos&&(a[d-1].size+=a[d].size,a[d-1].targets=a[d-1].targets.concat(a[d].targets),a[d-1].pos+a[d-1].size>c&&(a[d-1].pos=c-a[d-1].size),a.splice(d,1),f=!0)}d=0;I(a,function(a){var b=0;I(a.targets,function(){h[d].pos=a.pos+b;b+=h[d].size;d++})});h.push.apply(h,e);y(h,b)};c.prototype.drawDataLabels=function(){var a=this,c=a.options,
b=c.dataLabels,d=a.points,l,n,e=a.hasRendered||0,r,p,A=u(b.defer,!0),k=a.chart.renderer;if(b.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(b),p=a.plotGroup("dataLabelsGroup","data-labels",A&&!e?"hidden":"visible",b.zIndex||6),A&&(p.attr({opacity:+e}),e||D(a,"afterAnimate",function(){a.visible&&p.show(!0);p[c.animation?"animate":"attr"]({opacity:1},{duration:200})})),n=b,I(d,function(e){var d,m=e.dataLabel,q,g,t=e.connector,F=!0,x,A={};l=e.dlOptions||e.options&&e.options.dataLabels;
d=u(l&&l.enabled,n.enabled)&&null!==e.y;if(m&&!d)e.dataLabel=m.destroy();else if(d){b=v(n,l);x=b.style;d=b.rotation;q=e.getLabelConfig();r=b.format?f(b.format,q):b.formatter.call(q,b);x.color=u(b.color,x.color,a.color,"#000000");if(m)G(r)?(m.attr({text:r}),F=!1):(e.dataLabel=m=m.destroy(),t&&(e.connector=t.destroy()));else if(G(r)){m={fill:b.backgroundColor,stroke:b.borderColor,"stroke-width":b.borderWidth,r:b.borderRadius||0,rotation:d,padding:b.padding,zIndex:1};"contrast"===x.color&&(A.color=b.inside||
0>b.distance||c.stacking?k.getContrast(e.color||a.color):"#000000");c.cursor&&(A.cursor=c.cursor);for(g in m)void 0===m[g]&&delete m[g];m=e.dataLabel=k[d?"text":"label"](r,0,-9999,b.shape,null,null,b.useHTML,null,"data-label").attr(m);m.addClass("highcharts-data-label-color-"+e.colorIndex+" "+(b.className||"")+(b.useHTML?"highcharts-tracker":""));m.css(h(x,A));m.add(p);m.shadow(b.shadow)}m&&a.alignDataLabel(e,m,b,null,F)}})};c.prototype.alignDataLabel=function(a,c,b,d,f){var m=this.chart,e=m.inverted,
l=u(a.plotX,-9999),n=u(a.plotY,-9999),p=c.getBBox(),k,q=b.rotation,t=b.align,v=this.visible&&(a.series.forceDL||m.isInsidePlot(l,Math.round(n),e)||d&&m.isInsidePlot(l,e?d.x+1:d.y+d.height-1,e)),z="justify"===u(b.overflow,"justify");v&&(k=b.style.fontSize,k=m.renderer.fontMetrics(k,c).b,d=h({x:e?m.plotWidth-n:l,y:Math.round(e?m.plotHeight-l:n),width:0,height:0},d),h(b,{width:p.width,height:p.height}),q?(z=!1,e=m.renderer.rotCorr(k,q),e={x:d.x+b.x+d.width/2+e.x,y:d.y+b.y+{top:0,middle:.5,bottom:1}[b.verticalAlign]*
d.height},c[f?"attr":"animate"](e).attr({align:t}),l=(q+720)%360,l=180<l&&360>l,"left"===t?e.y-=l?p.height:0:"center"===t?(e.x-=p.width/2,e.y-=p.height/2):"right"===t&&(e.x-=p.width,e.y-=l?0:p.height)):(c.align(b,null,d),e=c.alignAttr),z?this.justifyDataLabel(c,b,e,p,d,f):u(b.crop,!0)&&(v=m.isInsidePlot(e.x,e.y)&&m.isInsidePlot(e.x+p.width,e.y+p.height)),b.shape&&!q&&c.attr({anchorX:a.plotX,anchorY:a.plotY}));v||(c.attr({y:-9999}),c.placed=!1)};c.prototype.justifyDataLabel=function(a,c,b,d,f,h){var e=
this.chart,m=c.align,l=c.verticalAlign,n,k,p=a.box?0:a.padding||0;n=b.x+p;0>n&&("right"===m?c.align="left":c.x=-n,k=!0);n=b.x+d.width-p;n>e.plotWidth&&("left"===m?c.align="right":c.x=e.plotWidth-n,k=!0);n=b.y+p;0>n&&("bottom"===l?c.verticalAlign="top":c.y=-n,k=!0);n=b.y+d.height-p;n>e.plotHeight&&("top"===l?c.verticalAlign="bottom":c.y=e.plotHeight-n,k=!0);k&&(a.placed=!h,a.align(c,null,f))};n.pie&&(n.pie.prototype.drawDataLabels=function(){var d=this,f=d.data,b,h=d.chart,l=d.options.dataLabels,n=
u(l.connectorPadding,10),e=u(l.connectorWidth,1),r=h.plotWidth,v=h.plotHeight,A,k=l.distance,w=d.center,y=w[2]/2,D=w[1],G=0<k,g,B,L,M,R=[[],[]],E,H,P,Q,O=[0,0,0,0];d.visible&&(l.enabled||d._hasPointLabels)&&(c.prototype.drawDataLabels.apply(d),I(f,function(a){a.dataLabel&&a.visible&&(R[a.half].push(a),a.dataLabel._pos=null)}),I(R,function(c,e){var f,m,q=c.length,t,u,F;if(q)for(d.sortByAngle(c,e-.5),0<k&&(f=Math.max(0,D-y-k),m=Math.min(D+y+k,h.plotHeight),t=p(c,function(a){if(a.dataLabel)return F=
a.dataLabel.getBBox().height||21,{target:a.labelPos[1]-f+F/2,size:F,rank:a.y}}),a.distribute(t,m+F-f)),Q=0;Q<q;Q++)b=c[Q],L=b.labelPos,g=b.dataLabel,P=!1===b.visible?"hidden":"inherit",u=L[1],t?void 0===t[Q].pos?P="hidden":(M=t[Q].size,H=f+t[Q].pos):H=u,E=l.justify?w[0]+(e?-1:1)*(y+k):d.getX(H<f+2||H>m-2?u:H,e),g._attr={visibility:P,align:L[6]},g._pos={x:E+l.x+({left:n,right:-n}[L[6]]||0),y:H+l.y-10},L.x=E,L.y=H,null===d.options.size&&(B=g.width,E-B<n?O[3]=Math.max(Math.round(B-E+n),O[3]):E+B>r-n&&
(O[1]=Math.max(Math.round(E+B-r+n),O[1])),0>H-M/2?O[0]=Math.max(Math.round(-H+M/2),O[0]):H+M/2>v&&(O[2]=Math.max(Math.round(H+M/2-v),O[2])))}),0===C(O)||this.verifyDataLabelOverflow(O))&&(this.placeDataLabels(),G&&e&&I(this.points,function(a){var b;A=a.connector;if((g=a.dataLabel)&&g._pos&&a.visible){P=g._attr.visibility;if(b=!A)a.connector=A=h.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(d.dataLabelsGroup),A.attr({"stroke-width":e,stroke:l.connectorColor||
a.color||"#666666"});A[b?"attr":"animate"]({d:d.connectorPath(a.labelPos)});A.attr("visibility",P)}else A&&(a.connector=A.destroy())}))},n.pie.prototype.connectorPath=function(a){var c=a.x,b=a.y;return u(this.options.dataLabels.softConnector,!0)?["M",c+("left"===a[6]?5:-5),b,"C",c,b,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",c+("left"===a[6]?5:-5),b,"L",a[2],a[3],"L",a[4],a[5]]},n.pie.prototype.placeDataLabels=function(){I(this.points,function(a){var c=a.dataLabel;c&&a.visible&&((a=c._pos)?
(c.attr(c._attr),c[c.moved?"animate":"attr"](a),c.moved=!0):c&&c.attr({y:-9999}))})},n.pie.prototype.alignDataLabel=l,n.pie.prototype.verifyDataLabelOverflow=function(a){var c=this.center,b=this.options,f=b.center,h=b.minSize||80,l,e;null!==f[0]?l=Math.max(c[2]-Math.max(a[1],a[3]),h):(l=Math.max(c[2]-a[1]-a[3],h),c[0]+=(a[3]-a[1])/2);null!==f[1]?l=Math.max(Math.min(l,c[2]-Math.max(a[0],a[2])),h):(l=Math.max(Math.min(l,c[2]-a[0]-a[2]),h),c[1]+=(a[0]-a[2])/2);l<c[2]?(c[2]=l,c[3]=Math.min(d(b.innerSize||
0,l),l),this.translate(c),this.drawDataLabels&&this.drawDataLabels()):e=!0;return e});n.column&&(n.column.prototype.alignDataLabel=function(a,d,b,f,h){var l=this.chart.inverted,e=a.series,m=a.dlBox||a.shapeArgs,n=u(a.below,a.plotY>u(this.translatedThreshold,e.yAxis.len)),p=u(b.inside,!!this.options.stacking);m&&(f=v(m),0>f.y&&(f.height+=f.y,f.y=0),m=f.y+f.height-e.yAxis.len,0<m&&(f.height-=m),l&&(f={x:e.yAxis.len-f.y-f.height,y:e.xAxis.len-f.x-f.width,width:f.height,height:f.width}),p||(l?(f.x+=n?
0:f.width,f.width=0):(f.y+=n?f.height:0,f.height=0)));b.align=u(b.align,!l||p?"center":n?"right":"left");b.verticalAlign=u(b.verticalAlign,l||p?"middle":n?"top":"bottom");c.prototype.alignDataLabel.call(this,a,d,b,f,h)})})(L);(function(a){var D=a.Chart,C=a.each,G=a.pick,I=a.addEvent;D.prototype.callbacks.push(function(a){function f(){var f=[];C(a.series,function(a){var h=a.options.dataLabels,p=a.dataLabelCollections||["dataLabel"];(h.enabled||a._hasPointLabels)&&!h.allowOverlap&&a.visible&&C(p,function(d){C(a.points,
function(a){a[d]&&(a[d].labelrank=G(a.labelrank,a.shapeArgs&&a.shapeArgs.height),f.push(a[d]))})})});a.hideOverlappingLabels(f)}f();I(a,"redraw",f)});D.prototype.hideOverlappingLabels=function(a){var f=a.length,h,v,l,u,d,c,n,y,t,m=function(a,c,d,f,e,h,l,m){return!(e>a+d||e+l<a||h>c+f||h+m<c)};for(v=0;v<f;v++)if(h=a[v])h.oldOpacity=h.opacity,h.newOpacity=1;a.sort(function(a,c){return(c.labelrank||0)-(a.labelrank||0)});for(v=0;v<f;v++)for(l=a[v],h=v+1;h<f;++h)if(u=a[h],l&&u&&l.placed&&u.placed&&0!==
l.newOpacity&&0!==u.newOpacity&&(d=l.alignAttr,c=u.alignAttr,n=l.parentGroup,y=u.parentGroup,t=2*(l.box?0:l.padding),d=m(d.x+n.translateX,d.y+n.translateY,l.width-t,l.height-t,c.x+y.translateX,c.y+y.translateY,u.width-t,u.height-t)))(l.labelrank<u.labelrank?l:u).newOpacity=0;C(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(L);(function(a){var D=a.addEvent,
C=a.Chart,G=a.createElement,I=a.css,h=a.defaultOptions,f=a.defaultPlotOptions,p=a.each,v=a.extend,l=a.fireEvent,u=a.hasTouch,d=a.inArray,c=a.isObject,n=a.Legend,y=a.merge,t=a.pick,m=a.Point,b=a.Series,q=a.seriesTypes,z=a.svg;a=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,d=function(a){for(var c=a.target,e;c&&!e;)e=c.point,c=c.parentNode;if(void 0!==e&&e!==b.hoverPoint)e.onMouseOver(a)};p(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?
a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(p(a.trackerGroups,function(b){if(a[b]){a[b].addClass("highcharts-tracker").on("mouseover",d).on("mouseout",function(a){c.onTrackerMouseOut(a)});if(u)a[b].on("touchstart",d);a.options.cursor&&a[b].css(I).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),f=d.length,h=a.chart,l=h.pointer,m=h.renderer,n=h.options.tooltip.snap,
q=a.tracker,g,t=function(){if(h.hoverSeries!==a)a.onMouseOver()},v="rgba(192,192,192,"+(z?.0001:.002)+")";if(f&&!c)for(g=f+1;g--;)"M"===d[g]&&d.splice(g+1,0,d[g+1]-n,d[g+2],"L"),(g&&"M"===d[g]||g===f)&&d.splice(g,0,"L",d[g-2]+n,d[g-1]);q?q.attr({d:d}):a.graph&&(a.tracker=m.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:v,fill:c?v:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*n),zIndex:2}).add(a.group),p([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",
t).on("mouseout",function(a){l.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(u)a.on("touchstart",t)}))}};q.column&&(q.column.prototype.drawTracker=a.drawTrackerPoint);q.pie&&(q.pie.prototype.drawTracker=a.drawTrackerPoint);q.scatter&&(q.scatter.prototype.drawTracker=a.drawTrackerPoint);v(n.prototype,{setItemEvents:function(a,b,c){var e=this,d=e.chart,f="highcharts-legend-"+(a.series?"point":"series")+"-active";(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");d.seriesGroup.addClass(f);
b.css(e.options.itemHoverStyle)}).on("mouseout",function(){b.css(a.visible?e.itemStyle:e.itemHiddenStyle);d.seriesGroup.removeClass(f);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):l(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=G("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);D(a.checkbox,
"click",function(b){l(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});h.legend.itemStyle.cursor="pointer";v(C.prototype,{showResetZoom:function(){var a=this,b=h.lang,c=a.options.chart.resetZoomButton,d=c.theme,f=d.states,k="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,f&&f.hover).attr({align:c.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position,
!1,k)},zoomOut:function(){var a=this;l(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,d=this.pointer,f=!1,h;!a||a.resetSelection?p(this.axes,function(a){b=a.zoom()}):p(a.xAxis.concat(a.yAxis),function(a){var c=a.axis;d[c.isXAxis?"zoomX":"zoomY"]&&(b=c.zoom(a.min,a.max),c.displayBtn&&(f=!0))});h=this.resetZoomButton;f&&!h?this.showResetZoom():!f&&c(h)&&(this.resetZoomButton=h.destroy());b&&this.redraw(t(this.options.chart.animation,a&&a.animation,100>this.pointCount))},
pan:function(a,b){var c=this,e=c.hoverPoints,d;e&&p(e,function(a){a.setState()});p("xy"===b?[1,0]:[1],function(b){b=c[b?"xAxis":"yAxis"][0];var e=b.horiz,f=a[e?"chartX":"chartY"],e=e?"mouseDownX":"mouseDownY",h=c[e],k=(b.pointRange||0)/2,g=b.getExtremes(),l=b.toValue(h-f,!0)+k,k=b.toValue(h+b.len-f,!0)-k,m=k<l,h=m?k:l,l=m?l:k,k=Math.min(g.dataMin,g.min)-h,g=l-Math.max(g.dataMax,g.max);b.series.length&&0>k&&0>g&&(b.setExtremes(h,l,!1,!1,{trigger:"pan"}),d=!0);c[e]=f});d&&c.redraw(!1);I(c.container,
{cursor:"move"})}});v(m.prototype,{select:function(a,b){var c=this,e=c.series,f=e.chart;a=t(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;e.options.data[d(c,e.data)]=c.options;c.setState(a&&"select");b||p(f.getSelectedPoints(),function(a){a.selected&&a!==c&&(a.selected=a.options.selected=!1,e.options.data[d(a,e.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a,b){var c=this.series,e=c.chart,d=
e.tooltip,f=e.hoverPoint;if(this.series){if(!b){if(f&&f!==this)f.onMouseOut();if(e.hoverSeries!==c)c.onMouseOver();e.hoverPoint=this}!d||d.shared&&!c.noSharedTooltip?d||this.setState("hover"):(this.setState("hover"),d.refresh(this,a));this.firePointEvent("mouseOver")}},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;this.firePointEvent("mouseOut");b&&-1!==d(this,b)||(this.setState(),a.hoverPoint=null)},importEvents:function(){if(!this.hasImportedEvents){var a=y(this.series.options.point,
this.options).events,b;this.events=a;for(b in a)D(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a,b){var c=Math.floor(this.plotX),d=this.plotY,e=this.series,h=e.options.states[a]||{},l=f[e.type].marker&&e.options.marker,m=l&&!1===l.enabled,n=l&&l.states&&l.states[a]||{},p=!1===n.enabled,g=e.stateMarkerGraphic,q=this.marker||{},u=e.chart,y=e.halo,z,F=l&&e.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===h.enabled||a&&(p||m&&!1===n.enabled)||a&&q.states&&
q.states[a]&&!1===q.states[a].enabled)){F&&(z=e.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.attr(e.pointAttribs(this,a)),z&&this.graphic.animate(z,t(u.options.chart.animation,n.animation,l.animation)),g&&g.hide();else{if(a&&n){l=q.symbol||e.symbol;g&&g.currentSymbol!==l&&(g=g.destroy());if(g)g[b?"animate":"attr"]({x:z.x,y:z.y});else l&&(e.stateMarkerGraphic=g=u.renderer.symbol(l,
z.x,z.y,z.width,z.height).add(e.markerGroup),g.currentSymbol=l);g&&g.attr(e.pointAttribs(this,a))}g&&(g[a&&u.isInsidePlot(c,d,u.inverted)?"show":"hide"](),g.element.point=this)}(c=h.halo)&&c.size?(y||(e.halo=y=u.renderer.path().add(F?e.markerGroup:e.group)),y[b?"animate":"attr"]({d:this.haloPath(c.size)}),y.attr({"class":"highcharts-halo highcharts-color-"+t(this.colorIndex,e.colorIndex)}),y.point=this,y.attr(v({fill:this.color||e.color,"fill-opacity":c.opacity,zIndex:-1},c.attributes))):y&&y.point&&
y.point.haloPath&&y.animate({d:y.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});v(b.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&l(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();
this&&a.events.mouseOut&&l(this,"mouseOut");!c||a.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,c=b.options,d=b.graph,f=c.states,h=c.lineWidth,c=0;a=a||"";if(b.state!==a&&(p([b.group,b.markerGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!f[a]||!1!==f[a].enabled)&&(a&&(h=f[a].lineWidth||h+(f[a].lineWidthPlus||0)),d&&!d.dashstyle))for(f={"stroke-width":h},d.attr(f);b["zone-graph-"+
c];)b["zone-graph-"+c].attr(f),c+=1},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,h=d.options.chart.ignoreHiddenSeries,m=c.visible;f=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!m:a)?"show":"hide";p(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&p(d.series,function(a){a.options.stacking&&
a.visible&&(a.isDirty=!0)});p(c.linkedSeries,function(b){b.setVisible(a,!1)});h&&(d.isDirtyBox=!0);!1!==b&&d.redraw();l(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);l(this,a?"select":"unselect")},drawTracker:a.drawTrackerGraph})})(L);(function(a){var D=a.Chart,C=a.each,G=a.inArray,I=a.isObject,h=a.pick,f=a.splat;D.prototype.setResponsive=function(a){var f=this.options.responsive;
f&&f.rules&&C(f.rules,function(f){this.matchResponsiveRule(f,a)},this)};D.prototype.matchResponsiveRule=function(f,v){var l=this.respRules,p=f.condition,d;d=p.callback||function(){return this.chartWidth<=h(p.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=h(p.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=h(p.minWidth,0)&&this.chartHeight>=h(p.minHeight,0)};void 0===f._id&&(f._id=a.uniqueKey());d=d.call(this);!l[f._id]&&d?f.chartOptions&&(l[f._id]=this.currentOptions(f.chartOptions),this.update(f.chartOptions,
v)):l[f._id]&&!d&&(this.update(l[f._id],v),delete l[f._id])};D.prototype.currentOptions=function(a){function h(a,d,c){var l,p;for(l in a)if(-1<G(l,["series","xAxis","yAxis"]))for(a[l]=f(a[l]),c[l]=[],p=0;p<a[l].length;p++)c[l][p]={},h(a[l][p],d[l][p],c[l][p]);else I(a[l])?(c[l]={},h(a[l],d[l]||{},c[l])):c[l]=d[l]||null}var l={};h(a,this.options,l);return l}})(L);return L});
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//





//
// Bower packages


//
;
