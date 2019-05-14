import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Card, Table } from 'antd';

import Link from '../../containers/Link';
import messages from './messages';
import { CONFIGS_TO_SHOW, url } from '../../constants';
import { BROKER_SHAPE } from '../../constants/Shapes';

const onSelectBroker = (selectBroker, broker, redirect) => () => {
  selectBroker(broker);
  redirect(`${url.BROKER}/${broker.id}`);
};

const CardBrokers = ({
  brokers,
  className,
  intl: { formatMessage },
  redirect,
  selectBroker,
}) => (
  <Card title={formatMessage(messages.title)} className={className}>
    <Table
      rowKey="id"
      size="small"
      columns={[
        {
          title: formatMessage(messages.tableBrokerId),
          dataIndex: 'id',
          render: (text, record) => (
            <Link onClick={onSelectBroker(selectBroker, record, redirect)}>
              {record.id}
            </Link>
          ),
        },
        {
          title: formatMessage(messages.tableBrokerConfigs),
          dataIndex: 'configs',
          width: '90%',
          render: (text, record) => (
            record.configs
              .filter(config => CONFIGS_TO_SHOW.indexOf(config.name) >= 0)
              .map(config => (
                <span key={config.name}>
                  <strong>
                    {config.name}
:
                    {' '}
                  </strong>
                  {config.value}
;
                  {' '}
                </span>
              ))
          ),
        },
      ]}
      dataSource={brokers}
      rowClassName="pointer"
      onRow={record => ({
        onClick: onSelectBroker(selectBroker, record, redirect),
      })}
    />
  </Card>
);

CardBrokers.propTypes = {
  brokers: PropTypes.arrayOf(PropTypes.shape(BROKER_SHAPE)).isRequired,
  className: PropTypes.string,
  intl: intlShape.isRequired,
  redirect: PropTypes.func.isRequired,
  selectBroker: PropTypes.func.isRequired,
};

CardBrokers.defaultProps = {
  className: '',
};

export default injectIntl(CardBrokers);
