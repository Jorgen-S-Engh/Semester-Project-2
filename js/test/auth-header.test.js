import { postOptions, getOptions } from '../components/auth-header';

test('postOptions has method property set to "POST"', () => {

  expect(postOptions.method).toBe("POST");
});

test('getOptions has method property set to "GET"', () => {
  expect(getOptions.method).toBe("GET");
});