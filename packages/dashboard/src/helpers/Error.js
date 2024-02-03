/* eslint-disable max-classes-per-file */

class GitHelpError extends Error {
  constructor(type, params = {}) {
    super(params.message);

    this.type = type;
    this.code = params.code;
    this.recipe = params.recipe;
    this.message = params.message;
  }
}

class InvalidRequestError extends GitHelpError {
  constructor(params) {
    super('invalid_request_error', params);
  }
}

module.exports.InvalidRequestError = InvalidRequestError;
