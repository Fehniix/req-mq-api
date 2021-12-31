import Method from './model/Method';
import SuperRequestable from './SuperRequestable';

import _debug from 'debug';
const debug = _debug('superrequestable:requestable');

/**
 * Marks a method as "requestable".
 * A "requestable" method can be called by a remote client that will be able to also capture its returning value.
 * A "requestable" method can throw an exception: the exception may or may not be echoed back to the remote client.
 * @param method Can be either 'GET' or 'POST', as in HTTP requests. A 'GET' requestable is called through `.get()`, a 'POST' method through `.post()`.
 * @param echoError Whether the an eventual error should be echoed back to the client - if set to `true`, any error thrown by the decorated method will be echoed **as is** to the remote client! 
 */
export function requestable(method: Method, echoError: boolean = false) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		debug(`Registering "${target?.constructor?.name}#${propertyKey}" function as ${method}-requestable.`);
		SuperRequestable.register(descriptor.value, method, echoError);
	}
};