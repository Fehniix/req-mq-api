import IORedis from 'ioredis';

class Redis {
	/**
	 * The Redis connection object.
	 */
	private redisConnection?: IORedis.Redis;

	/**
	 * Creates an ioredis connection to the remote ioredis instance.
	 * @param redis Can be either an instance of `ioredis.Redis` or the connection URL.
	 * @returns A duplicated `ioredis.Redis` connection object.
	 */
	public async createConnection(redis: IORedis.Redis | string): Promise<IORedis.Redis> {
		if (redis === undefined)
			throw new Error('"redis" cannot be undefined.');
			
		if (typeof redis === 'string')
			this.redisConnection = new IORedis(redis, {
				maxRetriesPerRequest: null,
				enableReadyCheck: false
			});
		else
			this.redisConnection = redis;

		this.redisConnection.on('error', err => {
			if (err instanceof Error)
				throw err;
			if (typeof err === 'string')
				throw new Error(err);
		});

		return this.redisConnection.duplicate();
	}
}

export default new Redis();