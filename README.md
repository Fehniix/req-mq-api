# SuperRequestable

![Code Size](https://img.shields.io/github/languages/code-size/fehniix/superrequestable)
![npm Total Downloads](https://img.shields.io/npm/dt/superrequestable)
![GitHub Open Issues](https://img.shields.io/github/issues-raw/fehniix/superrequestable)

**SuperRequestable** is a very small TypeScript package that allows two NodeJS processes to exchange data asynchronously in a "REST-like" fashion.

## Quick Look

Mark a class method as `@requestable` on your serving process:

```typescript
class MyClass {
    @requestable('GET')
    public gimmeChocolate(amount: number) {
        return `${amount} bars of chocolate to you!`;
    }
}
```

Make a "GET" request on your client process:

```typescript
const chocolate: number = await RequestableClient.get('gimmeChocolate', 9999); 
// Output: 9999 bars of chocolate to you!
```

## Install & usage notes

Install the package via npm:

`> npm install -S superrequestable`

### Server-side

Start the SuperRequestable server service by providing the `start()` method either a `IORedis` instance or a valid Redis URL:

```typescript
import { SuperRequestable } from 'superrequestable';

SuperRequestable.start(process.env.REDIS_URL!);
```

You can then start to mark your class methods as `@requestable`:

```typescript
class MyClass {
    @requestable('GET')
    private async sayHello(to: string): Promise<string> {
        return `Hello, ${to}!`;
    }
}
```

The decorated method will be registered by its name and will be accessible from the client via the same method name - be aware it is case-sensitive!
The `@requestable` decorator accepts two parameters:

1. The request method, it can be either `"GET"` or `"POST"`, borrowing the semantic meaning of both terms from the HTTP protocol. `GET` "requestables" (methods marked as `@requestable`) must be called by `.get()` requests, and `POST` requestables via `.post()` requests: `GET` and `POST` requests with the same name can in fact coexist.
2. `echoError`: if set to `false` (default), the requestable would return a generic error response. If set to `true`, the requestable echoes the original error message as-is.

### Client-side

Start the SuperRequestable client service by providing the `start()` method either a `IORedis` instance or a valid Redis URL:

```typescript
import { RequestableClient } from 'superrequestable';

RequestableClient.start(process.env.REDIS_URL!);
```

And make `GET` and `POST` requests to your server service:

```typescript
const greeting: string = await RequestableClient.get('sayHello', 'world');

// Output: Hello, world!
```

You can make `POST` requests by calling the `RequestableClient.post()` method. `.get()` and `.post()` accept the same arguments:

- `functionName: string`, string representing the exact, case-sensitive name of the requestable method
- `...args: any[]`: parameters to be passed as-is to the requestable method on the server service

## Tests

To run tests without debug logs:
`npm test`

To run tests with debug logs:
`npm run test-dev`

## Debug Logs

The available debug (npm debug package) namespaces are:

- superrequestable (logs registrations)
- superrequestable:requestable (logs decorator registrations)
- superrequestable:client (logs requests to the server service)

You can enable all logs by setting the `DEBUG` environment variable to `superrequestable,superrequestable:*`:

`> export DEBUG=superrequestable,superrequestable:*`

## Current Limitations

- Any method belonging to different classes with the same name cannot be both `requestable`-decorated, as they would both refer to the same, last-registered, method.

## License

MIT. Do as you please with this package. Contributions and pull requests are very well accepted, would be my pleasure to review and integrate. Thank you!
