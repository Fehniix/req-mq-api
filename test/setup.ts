import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';

chai.use(chaiAsPromised);
chai.should();

import { SuperRequestable } from '../index';
SuperRequestable.start(process.env.REDIS_URL!);

export const mochaHooks = {
	async afterAll() {
		setTimeout(() => { process.exit(); }, 200);
	}
}