import * as UtilsObject from '../utils-object';

it('should equal true', () => {
  const objs = [
    { name: 'somet', value: 121 },
    { name: 'sianjeg' },
    { omegalul: 1 },
    { omegalol: 0 }
  ];
  expect(UtilsObject.indexOfFilter(objs, { value: 121 })).toBe(0);
});
