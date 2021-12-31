import { requestable } from "./Requestable";

class MyClass {
	@requestable('GET')
	public test(myArg1: number, myArg2: string): void {

	}
}

const t = new MyClass();
t.test(123, 'abc')