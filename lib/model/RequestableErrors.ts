/**
 * List of possible `Requestable` error messages.
 */
export enum RequestableError {
	INVALID_METHOD = 'The provided method is invalid.',
	REQUESTABLE_NOT_FOUND = 'The provided requestable function was not found.',
	DEFAULT_ERROR = 'An exception was thrown.',
	BAD_REQUEST = 'The request was not properly formatted.',
}