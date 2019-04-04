import Cache from '../cache';

it('should return cache object', () => {
  Cache.put('something-really-big', { value: 1 });

  expect(Cache.retrieve('something-really-big')).toBe({ value: 1 });
});
