import {
  isJson,
  parseAfsAlertsObjIntoFlatArray,
  greenOrRedClassName,
  roundToPercentOrZero,
} from '../src/utils';

test('isJson', () => {
  expect(isJson("{ \"foo\": \"bar\" }")).toBeTruthy();
  expect(isJson("{ \"foo\": 1234 }")).toBeTruthy();

  expect(isJson(undefined)).toBeFalsy();
  expect(isJson(null)).toBeFalsy();
  expect(isJson([])).toBeFalsy();
  expect(isJson({})).toBeFalsy();
  expect(isJson("")).toBeFalsy();
  expect(isJson("{}")).toBeFalsy();
  expect(isJson("[]")).toBeFalsy();
  expect(isJson("123")).toBeFalsy();
  expect(isJson(1)).toBeFalsy();
  expect(isJson(true)).toBeFalsy();
  expect(isJson(false)).toBeFalsy();
});

test('parseAfsAlertsObjIntoFlatArray', () => {
  expect(parseAfsAlertsObjIntoFlatArray({
    alert1: false,
    alert2: true,
    alert3: "{\"alert31\": true, \"alert32\": false}",
    alert4: "ignoreNonBoolean, or string Json nonBoolean values",
    alert5: 25,
    alert6: [{ key: 'alert1', value: false }],
    alert7: undefined,
    alert8: null,
    alert9: true,
  })).toEqual([
    { key: 'alert1', value: false },
    { key: 'alert2', value: true },
    { key: 'alert3.alert31', value: true },
    { key: 'alert3.alert32', value: false },
    { key: 'alert9', value: true },
  ]);
});

test('greenOrRedClassName', () => {
  expect(greenOrRedClassName(true)).toEqual('color--dark-green');
  expect(greenOrRedClassName(false)).toEqual('color--dark-red');
  expect(greenOrRedClassName(5)).toEqual('');
  expect(greenOrRedClassName(undefined)).toEqual('');
  expect(greenOrRedClassName(null)).toEqual('');
  expect(greenOrRedClassName(NaN)).toEqual('');
  expect(greenOrRedClassName({})).toEqual('');
  expect(greenOrRedClassName([])).toEqual('');
  expect(greenOrRedClassName("")).toEqual('');
  expect(greenOrRedClassName("foo")).toEqual('');
});

test('roundToPercentOrZero', () => {
  expect(roundToPercentOrZero(0.4554)).toEqual(46);
  expect(roundToPercentOrZero(0.9321)).toEqual(93);
  expect(roundToPercentOrZero(undefined)).toEqual(0);
  expect(roundToPercentOrZero(null)).toEqual(0);
  expect(roundToPercentOrZero(NaN)).toEqual(0);
  expect(roundToPercentOrZero("")).toEqual(0);
  expect(roundToPercentOrZero({})).toEqual(0);
  expect(roundToPercentOrZero([])).toEqual(0);
});
