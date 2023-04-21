export default class SpaceXError extends Error {
    constructor(message) {
      super(message);
      this.name = "SpaceXError";
    }
}