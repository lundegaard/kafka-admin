import {
  __,
  all,
  always,
  ascend,
  clamp,
  compose,
  cond,
  curry,
  defaultTo,
  descend,
  divide,
  endsWith,
  equals,
  filter,
  find,
  isEmpty,
  isNil,
  map,
  match,
  not,
  o,
  path,
  pick,
  prop,
  propEq,
  sortWith,
  T,
  useWith,
} from 'ramda';
import {
  isNilOrEmpty,
  isObject,
  notNil,
} from 'ramda-extension';
import moment from 'moment/moment';
import { DEFAULT_TOPIC_INFO_MESSAGES_NUMBER } from '../constants';
import commonMessages from '../components/commonMessages';

export const openInNewTab = (url) => {
  const win = window.open(url, '_blank');
  win.focus();
};

export const nonNegative = clamp(0, Infinity);

export const mapNames = map(prop('name'));

export const defaultToEmptyList = defaultTo([]);

export const findTopicInfo = useWith(find, [propEq('name')]);

export const falseIfOneNil = (array) => not(all(notNil, array));

export const JSONFormattedInput = (input) => JSON.stringify(input, null, 4);

// eslint-disable-next-line no-underscore-dangle
export const convertMsToS = divide(__, 1000);

export const JSONFormattedInputWithParse = (input) => {
  try {
    return JSONFormattedInput(JSON.parse(input));
  } catch (e) {
    return input;
  }
};

export const jsonParse = (value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

export const isJson = (value) => {
  try {
    const json = JSON.parse(value);
    return !(isNilOrEmpty(json) || !isObject(json));
  } catch (e) {
    return false;
  }
};

export const diffNumber = curry((property, a, b) => prop(property, a) - prop(property, b));

export const diffString = curry((property, a, b) => `${prop(property, a)}`.localeCompare(
  prop(property, b),
  undefined,
  {
    numeric: true,
    sensitivity: 'variant',
  },
));

export const getFirstPartitionFromTopicInfo = path(['partitions', '0', 'partition']);

export const getBeginningOffsetFromTopicInfo = (partition, topicInfo) => compose(
  defaultTo(0),
  path(['beginningOffset']),
  find(propEq('partition', partition)),
  path(['partitions']),
)(topicInfo);

export const getEndOffsetFromTopicInfo = (partition, topicInfo) => compose(
  defaultTo(0),
  path(['endOffset']),
  find(propEq('partition', partition)),
  path(['partitions']),
)(topicInfo);

export const getLastMessagesOffsetFromTopicInfo = (topicInfo, partition = 0) => {
  const end = getEndOffsetFromTopicInfo(partition, topicInfo);
  const start = getBeginningOffsetFromTopicInfo(partition, topicInfo);
  if ((end - start) >= DEFAULT_TOPIC_INFO_MESSAGES_NUMBER) {
    return end - DEFAULT_TOPIC_INFO_MESSAGES_NUMBER;
  }
  return start;
};

export const getRegExpGI = (pattern) => {
  try {
    return new RegExp(pattern, 'gi');
  } catch (e) {
    return null;
  }
};

export const sortTopicPartitions = o(
  sortWith([
    descend(prop('endOffset')),
    ascend(prop('partition')),
  ]),
  prop('partitions'),
);

export const sortTopicMessages = sortWith([
  descend(prop('offset')),
]);

export const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

export const filterConfigsByName = (filterValue, configs) => {
  if (isNilOrEmpty(filterValue)) {
    return configs;
  }
  const reg = getRegExpGI(filterValue);
  if (isNil(reg)) { return []; }
  return filter((e) => !isEmpty(match(reg, prop('name', e))), configs);
};

const getScreenObject = (width, height) => ({ width, height });

export const getViewportSize = (screen, document) => {
  const { body, documentElement } = document;

  const visibleBody = body && body.clientWidth && body.clientHeight;
  const visibleDocEl = documentElement
    && documentElement.clientWidth
    && documentElement.clientHeight;

  return visibleDocEl && (document.compatMode === 'CSS1Compat' || !visibleBody)
    ? getScreenObject(documentElement.clientWidth, documentElement.clientHeight)
    : visibleBody && getScreenObject(body.clientWidth, body.clientHeight);
};

/**
 * Compare specific props in two objects, example:
 *
 * o1 = { a: 1, b: "2", c: "foo" }
 * o2 = { a: 1, b: "2", c: "bar" }
 * equalProps(['a', 'b'],      o1, o2) => true
 * equalProps(['a', 'b', 'c'], o1, o2) => false
 *
 * @param xs array of props
 * @param o1 object1
 * @param o2 object2
 * @returns true if all specified props are equals, else false
 */
export const equalProps = curry((xs, o1, o2) => equals(
  pick(xs, o1),
  pick(xs, o2),
));

export const messageRejectOrApproved = (bool, formatMessage) => cond([
  [equals(true), always(formatMessage(commonMessages.approved))],
  [equals(false), always(formatMessage(commonMessages.reject))],
  [T, always(formatMessage(commonMessages.unknown))],
])(bool);

export const messageYesOrNo = (bool, formatMessage) => cond([
  [equals(true), always(formatMessage(commonMessages.yes))],
  [equals(false), always(formatMessage(commonMessages.no))],
  [T, always(formatMessage(commonMessages.unknown))],
])(bool);

export const toStringOrUnknownOrEmpty = (value, formatMessage) => cond([
  [isNil, always(formatMessage(commonMessages.unknown))],
  [isEmpty, always(formatMessage(commonMessages.empty))],
  [T, (v) => v.toString()],
])(value);

export const millisToDays = (value) => moment.duration(Number(value)).asDays();

export const getCustomConfigTooltipTitle = (name, value, formatMessage) => {
  if (endsWith('.ms', name)) {
    const duration = moment.duration(Number(value));
    if (duration.asYears() >= 1) {
      return formatMessage(commonMessages.formatYear, {value: duration.asYears()});
    } else if (duration.asDays() >= 1) {
      return formatMessage(commonMessages.formatDay, {value: duration.asDays()});
    } else if (duration.asHours() >= 1) {
      return formatMessage(commonMessages.formatHour, {value: duration.asHours()});
    } else if (duration.asMinutes() >= 1) {
      return formatMessage(commonMessages.formatMinute, {value: duration.asMinutes()});
    } else if (duration.asSeconds() >= 1) {
      return formatMessage(commonMessages.formatSecond, {value: duration.asSeconds()});
    } else if (duration.asMilliseconds() >= 1) {
      return formatMessage(commonMessages.formatMillisecond, {value: duration.asMilliseconds()});
    }
  } else if (endsWith('.bytes', name)) {
    const bytes = Number(value);
    if (bytes / (2**40) >= 1) {
      return formatMessage(commonMessages.formatTerabytes, {value: bytes / (2**40)});
    } else if (bytes / (2**30) >= 1) {
      return formatMessage(commonMessages.formatGigabytes, {value: bytes / (2**30)});
    } else if (bytes / (2**20) >= 1) {
      return formatMessage(commonMessages.formatMegabytes, {value: bytes / (2**20)});
    } else if (bytes / (2**10) >= 1) {
      return formatMessage(commonMessages.formatKilobytes, {value: bytes / (2**10)});
    } else if (bytes >= 1) {
      return formatMessage(commonMessages.formatBytes, {value: bytes});
    }
  }
  return "";
};
