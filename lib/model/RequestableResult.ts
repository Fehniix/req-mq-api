/**
 * Represents the result of a request.
 */
export interface RequestableResult<T = any> {
	value?: T,
	error?: Error
}