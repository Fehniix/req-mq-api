import dotenv from 'dotenv';
dotenv.config();

import IORedis from "ioredis";
import _SuperRequestable from './lib/SuperRequestable';
import RequestableClient from './lib/RequestableClient';
import Method from "./lib/model/Method";

/**
 * Allows to start a `SuperRequestable` server session.
 */
class SuperRequestable {
	/**
	 * Starts the SuperRequestable server.
	 */
	public start(redis: IORedis.Redis | string): void {
		_SuperRequestable.start(redis);
	}
}

export default new SuperRequestable();
export { RequestableClient };
export { Method };