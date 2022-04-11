import { RequestableClient } from '..';
import { Server } from './model/Server';

describe('SuperRequestable Setup', function() {
	context('Given the `Client` and `Server` objects, and a valid Redis URL', function() {
		it('The .start() of both objects should be called without errors', async function() {
			await RequestableClient.start(process.env.REDIS_URL!);
			Server.start();
		});
	});
});