import { setupServer } from 'msw/node';
import { rest } from 'msw';

type RequestParameters = {
  user: string;
};

// Mock GitHub REST API
export const server = setupServer(
  // Set request handler for /users/:user endpoint
  rest.get('https://api.github.com/users/:user', (req, res, ctx) => {
    // Save url slugs (request parameter) in variable
    const { user } = req.params as RequestParameters;

    // Define response
    return res(
      ctx.status(200),
      ctx.json({
        login: user,
        name: "Fool's Mate",
      })
    );
  }),
  // Set fallback request handler (prevents from send a GET request to the real API when URL is wrong)
  rest.get('*', (req, res, ctx) => {
    const requestUrl = req.url.toString();
    console.error(`MSW: Please add request handler for: ${requestUrl}`);

    // Define response
    return res(
      ctx.status(404),
      ctx.json({ error: `MSW: Please add request handler for: ${requestUrl}` })
    );
  })
);
