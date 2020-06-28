// append this library to be a part of the larger library

const applyToRabbitEar = (svg, RabbitEar) => {
  RabbitEar.svg = svg;
};

const Append = function (library) {
  // is RabbitEar?
  if (typeof library.cp === "function"
    && typeof library.graph === "function"
    && typeof library.origami === "function") {
    applyToRabbitEar(this, library);
  }
};

export default Append;
