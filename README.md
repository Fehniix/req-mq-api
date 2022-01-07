# SuperRequestable

**SuperRequestable** is a very small TypeScript package that allows two NodeJS processes to exchange data asynchronously in a "REST-like" fashion.

## Quick Look

Mark a class method as "requestable" on your serving process:

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
const chocolate: number = await SuperRequestable.get('gimmeChocolate', 9999); 
// Output: 9999 bars of chocolate to you!
```

## Current Limitations

- Any method belonging to different classes with the same name cannot be both `requestable`-decorated, as they would both refer to the same, last-registered, method.

## To-Do

- Make `.get()` and `.post()` accept as arguments either spreaded objects or a single query-like object.
