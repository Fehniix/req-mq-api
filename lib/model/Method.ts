enum Methods {
	GET = 'GET',
	POST = 'POST'
}

/**
 * The methods available to make requests.
 */
type Method = keyof typeof Methods;

export default Method;