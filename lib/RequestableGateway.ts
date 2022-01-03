import { Job, Queue, Worker } from "bullmq";
import { RequestableError } from "./model/RequestableErrors";
import { RequestableResult } from "./model/RequestableResult";
import Redis from "./Redis";
import IORedis from "ioredis";
import Method from "./model/Method";
import SuperRequestable from "./SuperRequestable";

/**
 * Handles the underlying BullMQ communication.
 */
class RequestableGateway {
	/**
	 * The BullMQ Worker responsible for processing incoming requests.
	 */
	private bmqWorker!: Worker;

	/**
	 * The BullMQ Queue responsible for sending responses.
	 */
	private bmqQueue!: Queue;

	/**
	 * The IORedis instance.
	 */
	private redisConnection?: IORedis.Redis;

	/**
	 * Instantiates the BullMQ `Worker` and `Queue`.
	 * @param redis The Redis instance on which BullMQ will operate.
	 */
	public async start(redis: IORedis.Redis | string) {
		this.redisConnection = Redis.createConnection(redis);

		this.bmqWorker = new Worker<RequestJob>('superrequestable:request', this.process.bind(this), {
			connection: this.redisConnection
		});

		this.bmqQueue = new Queue<ResponseJob>('superrequestable:response', {
			connection: this.redisConnection?.duplicate()
		})
	}

	/**
	 * Processes incoming BullMQ jobs containing requests.
	 */
	private async process(job: Job<RequestJob>): Promise<void> {
		if (job.data.id === undefined || job.data.functionName === undefined) {
			this.sendResponse(job.data.id, { error: RequestableError.BAD_REQUEST });
			return;
		}

		const result: RequestableResult = await SuperRequestable.request(job.data.functionName, job.data.method, job.data.args);

		this.sendResponse(job.data.id, result);
	}

	/**
	 * Enqueues a response job for the client to process.
	 */
	private async sendResponse(id: string, result: RequestableResult): Promise<void> {
		this.bmqQueue.add(`superrequestable:response:${id}`, {
			id: id,
			result: result
		});
	}
}

/**
 * The BullMQ Job containing a SuperRequestable request.
 */
export interface RequestJob {
	/**
	 * Represents the unique identifier for the current request.
	 */
	id: string;

	/**
	 * The name of the requestable function that will be called.
	 */
	functionName: string;

	/**
	 * The request's method.
	 */
	method: Method;

	/**
	 * The arguments that will be passed to the requestable function.
	 */
	args?: any[]
}

/**
 * The BullMQ Job containing a SuperRequestable response.
 */
export interface ResponseJob {
	/**
	 * Represents the unique identifier that was sent over with the request.
	 */
	id: string;

	/**
	 * The result of the execution of the requestable function.
	 */
	result: RequestableResult;
}

export default new RequestableGateway();