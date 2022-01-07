import { RequestableClient } from "..";
import { RequestableError } from '../lib/model/RequestableErrors';

describe('Requestable Decorator - RequestableClient', function() {
	this.timeout(5000);
	this.slow(5000);

	describe('GET Requests', function() {
		describe('not existing function', function() {
			it('should throw an error', function() {
				return RequestableClient.get('notExisting').should.be.rejectedWith(RequestableError.REQUESTABLE_NOT_FOUND);
			});
		});

		describe('#noEchoString', function() {
			it('should return "ok"', function() {
				return RequestableClient.get('noEchoStringGET').should.become('ok');
			});
		});

		describe('#noEchoNumber', function() {
			it('should return 200', function() {
				return RequestableClient.get('noEchoNumberGET').should.become(200);
			});
		});

		describe('#noEchoObject', function() {
			it('should return a deep-matched copy of the test object', function() {
				return RequestableClient.get('noEchoObjectGET').should.become({
					num: 200,
					str: 'ok'
				});
			});
		});

		describe('#noEchoSimpleError', function() {
			it('should throw a default error', function() {
				return RequestableClient.get('noEchoSimpleErrorGET').should.be.rejectedWith(RequestableError.DEFAULT_ERROR);
			});
		});

		describe('#echoSimpleError', function () {
			it('should throw a domain-specific error', function () {
				return RequestableClient.get('echoSimpleErrorGET').should.be.rejectedWith('cannot divide by zero!');
			});
		});

		describe('#echoArg', function() {
			it('should correctly process arguments', function() {
				return RequestableClient.get('echoArg', 999, 'hello', { content: 'world' }).should.become({
					num: 1000,
					str: 'hello world',
					obj: {
						content: 'world, hello!'
					}
				});
			});
		});
	});

	describe('POST Requests', function() {
		describe('#noEchoString', function () {
			it('should return "ok"', function () {
				return RequestableClient.post('noEchoStringPOST').should.become('ok');
			});
		});

		describe('#noEchoNumber', function () {
			it('should return 200', function () {
				return RequestableClient.post('noEchoNumberPOST').should.become(200);
			});
		});

		describe('#noEchoObject', function () {
			it('should return a deep-matched copy of the test object', function () {
				return RequestableClient.post('noEchoObjectPOST').should.become({
					num: 200,
					str: 'ok'
				});
			});
		});
	});

	describe('Multiple parallel requests', function() {
		context('When different asynchronous methods get called in parallel', function() {
			it('they should all be correctly executed and return the correct value.', function () {
				const promises = [];

				for (let i = 1; i < 5; i++)
					promises.push(RequestableClient.get(`parallel${i}`).should.become(i));

				return Promise.all(promises);
			});
		});

		context('When the same asynchronous method gets called multiple times in parallel', function() {
			it('it should preserve the expected result of each individual request', function() {
				const promises = [];

				for (let i = 0; i < 5; i++) {
					const r = Math.random();
					promises.push(RequestableClient.get('parallelN', r).should.become(r));
				}

				return Promise.all(promises);
			});
		});
	});
});