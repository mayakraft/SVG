/**
* vkBeautify
*  
* Version - 0.99.00.beta 
* Copyright (c) 2012 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/vkbeautify/
* 
* MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*/

export default function(text, step) {
	var ar = text.replace(/>\s{0,}</g,"><")
				 .replace(/</g,"~::~<")
				 .replace(/\s*xmlns\:/g,"~::~xmlns:")
				 // .replace(/\s*xmlns\=/g,"~::~xmlns=")
				 .split('~::~'),
		len = ar.length,
		inComment = false,
		deep = 0,
		str = '',
		ix = 0,
		space = (step != null && typeof step === "string" ? step : "\t");
	var shift = ['\n'];
	for(let si=0; si<100; si++){
		shift.push(shift[si]+space); 
	}
	for (let ix=0;ix<len;ix++) {
		// start comment or <![CDATA[...]]> or <!DOCTYPE //
		if(ar[ix].search(/<!/) > -1) { 
			str += shift[deep]+ar[ix];
			inComment = true; 
			// end comment  or <![CDATA[...]]> //
			if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1
				|| ar[ix].search(/!DOCTYPE/) > -1 ) { 
				inComment = false; 
			}
		}
		// end comment  or <![CDATA[...]]> //
		else if (ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) { 
			str += ar[ix];
			inComment = false; 
		}
		// <elm></elm> //
		else if ( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
			/^<[\w:\-\.\,]+/.exec(ar[ix-1])
			== /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/','')) { 
			str += ar[ix];
			if (!inComment) { deep--; }
		}
		 // <elm> //
		else if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1
			&& ar[ix].search(/\/>/) == -1 ) {
			str = !inComment ? str += shift[deep++]+ar[ix] : str += ar[ix];
		}
		 // <elm>...</elm> //
		else if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
			str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
		}
		// </elm> //
		else if(ar[ix].search(/<\//) > -1) { 
			str = !inComment ? str += shift[--deep]+ar[ix] : str += ar[ix];
		}
		// <elm/> //
		else if(ar[ix].search(/\/>/) > -1 ) { 
			str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
		}
		// <? xml ... ?> //
		else if(ar[ix].search(/<\?/) > -1) { 
			str += shift[deep]+ar[ix];
		}
		// xmlns //
		else if(ar[ix].search(/xmlns\:/) > -1 || ar[ix].search(/xmlns\=/) > -1){
			console.log("xmlns at level", deep);
			str += shift[deep]+ar[ix];
		} 
		else {
			str += ar[ix];
		}
	}
	return  (str[0] == '\n') ? str.slice(1) : str;
}
