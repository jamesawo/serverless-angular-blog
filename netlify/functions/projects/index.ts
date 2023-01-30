import { Handler } from '@netlify/functions';
import { get } from '../../functions/projects/get';

const handler: Handler = async (event, context) => {
	let body;
	try {
		switch (event.httpMethod) {
			case 'GET':
				body = await get(event);
				break;

			case 'POST':
				break;

			case 'PUT':
				break;

			case 'DELETE':
				break;

			default:
				return {
					statusCode: 405,
					body: JSON.stringify({ message: 'Method not supported' })
				}
		}

		return {
			statusCode: 200,
			body: JSON.stringify({ data: body })
		};

	} catch (err: any) {

		return {
			statusCode: 500,
			body: JSON.stringify({ message: err.toString() })
		}
	}
}

export { handler };
