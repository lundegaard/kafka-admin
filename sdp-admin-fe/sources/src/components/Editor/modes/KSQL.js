import { acequire } from 'brace';

const { TextHighlightRules } = acequire('./mode/text_highlight_rules');
const { Mode } = acequire('./mode/text');
const { WorkerClient } = acequire('./worker/worker_client');

class HighlightRules extends TextHighlightRules {
  constructor(props) {
    super(props);

    const keywords = ('AND|AS|ASC|BY|CASE|CAST|CREATE|CROSS|DATABASE|DEFAULT|DELETE|DESC|DROP|ELSE|END|FOREIGN|FROM|GRANT|GROUP|HAVING|HOPPING|IF|INNER|INSERT|JOIN|KEY|LEFT|LIKE|LIMIT|LIST|NATURAL|NOT|NULL|OFFSET|ON|OR|ORDER|OUTER|PRIMARY|PRINT|PROPERTIES|REFERENCES|QUERIES|RIGHT|SELECT|SET|SESSION|SHOW|STREAM|STREAMS|TABLE|TABLES|TOPICS|TYPE|TUMBLING|UNION|UPDATE|WHEN|WHERE|WINDOW|WITH');
    const dataTypes = ('BIGINT|BINARY|BIT|CHAR|DATE|DECIMAL|DOUBLE|FLOAT|INT|INTEGER|MONEY|NUMBER|NUMERIC|REAL|TEXT|TIMESTAMP|VARCHAR');
    const functions = ('AVG|COALESCE|CONCAT|COUNT|FIRST|FORMAT|IFNULL|ISNULL|LAST|LCASE|LEN|MAX|MID|MIN|NOW|NVL|RANK|ROUND|SUM|UCASE');
    const constants = ('false|true');

    const keywordMapper = this.createKeywordMapper({
      keyword: keywords,
      'storage.type': dataTypes,
      'support.function': functions,
      'constant.language': constants,
    }, 'identifier', true);

    this.$rules = {
      start: [{
        token: 'comment',
        regex: '--.*$',
      }, {
        token: 'comment',
        start: '/\\*',
        end: '\\*/',
      }, {
        token: 'string',
        regex: '".*?"',
      }, {
        token: 'string',
        regex: '\'.*?\'',
      }, {
        token: 'string',
        regex: '`.*?`',
      }, {
        token: 'constant.numeric',
        regex: '[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b',
      }, {
        token: keywordMapper,
        regex: '[a-zA-Z_$][a-zA-Z0-9_$]*\\b',
      }, {
        token: 'keyword.operator',
        regex: '\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|=',
      }, {
        token: 'paren.lparen',
        regex: '[\\(]',
      }, {
        token: 'paren.rparen',
        regex: '[\\)]',
      }, {
        token: 'text',
        regex: '\\s+',
      }],
    };

    this.normalizeRules();
  }
}

class KSQL extends Mode {
  constructor(props) {
    super(props);

    this.HighlightRules = HighlightRules;
  }

  createWorker(session) {
    this.$worker = new WorkerClient(['ace'], {
      id: '',
    });

    this.$worker.attachToDocument(session.getDocument());

    this.$worker.on('errors', e => session.setAnnotations(e.data));
    this.$worker.on('annotate', e => session.setAnnotations(e.data));
    this.$worker.on('terminate', () => session.clearAnnotations());

    return this.$worker;
  }
}

export default KSQL;
