import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';

chai.use(chaiAsPromised);
chai.should();

export const mochaHooks = {
	async afterAll() {
		setTimeout(() => { process.exit(); }, 200);
	}
}