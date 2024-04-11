/**
 * Rabbit Ear (c) Kraft
 */
import ArrowMethods from "./methods.js";
import init from "./init.js";

export default {
	arrow: {
		nodeName: "g",
		attributes: [],
		args: () => [], // one function
		methods: ArrowMethods, // object of functions
		init,
	},
};
