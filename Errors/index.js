class NotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundException";
    this.ErrorMessage = message;
    this.code = 404;
    console.log(this);
  }
}

module.exports = { NotFoundException };
