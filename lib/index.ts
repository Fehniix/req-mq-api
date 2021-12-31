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
}

SuperRequestable.start(process.env.REDIS_URL!);
RequestableClient.get<string>('test', 123).then(r => {console.log(r)}).catch(err => {
	console.log(err);
});

const t = new MyClass();