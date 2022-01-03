import dotenv from 'dotenv';
dotenv.config();

import IORedis from "ioredis";
import _SuperRequestable from './lib/SuperRequestable';
import RequestableClient from './lib/RequestableClient';
import Method from "./lib/model/Method";
import { requestable } from './lib/Requestable';

/**
 * Allows to start a `SuperRequestable` server session.
 */
export class SuperRequestable {
	/**
	 * Starts the SuperRequestable server.
	 */
	public static start(redis: IORedis.Redis | string): void {
		_SuperRequestable.start(redis);
	}
}

export { RequestableClient };
export { Method };
export { requestable };