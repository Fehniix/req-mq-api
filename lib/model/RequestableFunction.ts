/**
 * Describes a `Requestable` function that can echo back `Error`s.
 */
export interface RequestableFunction {
	/**
	 * The `Requestable` function.
	 */
	_function: Function,

	/**
	 * Whether a potential `Error` should be echoed back as-is.
	 */
	shouldEchoErrors: boolean;
}