/**
 * Marks a method as "requestable".
 * A "requestable" method can be called by a remote client that will be able to also capture its returning value.
 * A "requestable" method can throw an exception: the exception may or may not be echoed back to the remote client.
 * @param method Can be either 'GET' or 'POST', as in HTTP requests. A 'GET' requestable is called through `.get()`, a 'POST' method through `.post()`.
 * @param echoError Whether the an eventual error should be echoed back to the client - if set to `true`, any error thrown by the decorated method will be echoed **as is** to the remote client! 
 */
export function requestable(method: 'GET' | 'POST', echoError: boolean = false) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		descriptor.value = function (...args: any[]) {
			originalMethod.apply(this, args);
		}
	}
};