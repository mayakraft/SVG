/**
 * SVG (c) Kraft
 */
import args from "./arguments";
import curve_methods from "./methods";
import * as S from "../../../environment/strings";

export default {
	curve: {
		nodeName: S.str_path,
		attributes: ["d"],
		args, // one function
		methods: curve_methods, // object of functions
	},
};
