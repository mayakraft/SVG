/**
 * Rabbit Ear (c) Kraft
 */
import args from "./arguments.js";
import curve_methods from "./methods.js";
import { str_path } from "../../../environment/strings.js";

export default {
	curve: {
		nodeName: str_path,
		attributes: ["d"],
		args, // one function
		methods: curve_methods, // object of functions
	},
};
