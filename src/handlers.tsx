import {http, HttpResponse} from 'msw';

export const handlers = {
  success: [
    http.get('https://dummyjson.com/users', () => {
      return HttpResponse.json({
        users: [
          {id: 1, firstName: 'Parth'},
          {id: 2, firstName: 'Nisarg'},
        ],
      });
    }),
  ],
  error: [
    http.get('https://dummyjson.com/users', () => {
      return new HttpResponse(null, {status: 500});
    }),
  ],
};
