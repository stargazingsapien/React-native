import '@testing-library/react-native'
import {setupServer} from 'msw/node';
import {handlers} from './handlers';

export const server = setupServer(...handlers.success,...handlers.error);



beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

server.events.on('request:match', ({ request }) => {
    console.log('MSW request:match:-------->', request.method, request.url)
  })

  server.events.on('request:unhandled', ({ request }) => {
    console.log('MSW request:unhandled:-------->', request.method, request.url)
  })

  server.events.on('unhandledException', ({ request }) => {
    console.log('MSW request:unhandledException :-------->', request.method, request.url)
  })
