/**
 * SVG (c) Kraft
 */
const makeUUID = () => Math.random()
	.toString(36)
	.replace(/[^a-z]+/g, "")
	.concat("aaaaa")
	.substr(0, 5);

export default makeUUID;
