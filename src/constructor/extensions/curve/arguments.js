/**
 * Rabbit Ear (c) Kraft
 */
import makeCoordinates from "../../../arguments/makeCoordinates.js";
import makeCurvePath from "./makeCurvePath.js";

const curveArguments = (...args) => [
	makeCurvePath(makeCoordinates(...args.flat())),
];

export default curveArguments;
