import dotenv from 'dotenv';
dotenv.config();

import { requestable } from "./Requestable";
import SuperRequestable from "./SuperRequestable";
import RequestableClient from "./RequestableClient";

class MyClass {
	@requestable('GET', true)
	public test(myArg1: number, myArg2: string): string {
		return 'woah';
	}

	@requestable('POST')
	public deleteAll(myArg1: number, myArg2: string) {
		return {
			a: myArg1 + 1,
			b: myArg2 + '10'
		}
	}
}

SuperRequestable.start(process.env.REDIS_URL!);
RequestableClient.start(process.env.REDIS_URL!);

RequestableClient.get<string>('test', 123).then(r => {
	console.log(r);
}).catch(err => {
	console.log(err);
});

RequestableClient.post<{
	a: number,
	b: string
}>('deleteAll', 999, 'myNumber: ').then(r => {
	console.log(r);
}).catch(ex => {
	console.log(ex);
});

const t = new MyClass();