import { defineMessages } from 'react-intl';

export default defineMessages({
  titleCreateTopic: {
    id: 'Component.FormModalCreateTopic.Title',
    defaultMessage: 'Create a new topic',
  },
  errorTopicMsg: {
    id: 'Component.FormModalCreateTopic.Error.Topic',
    defaultMessage: 'Please input the name of the topic!',
  },
  errorEmptyField: {
    id: 'Component.FormModalCreateTopic.Error.EmptyField',
    defaultMessage: 'This field is required!',
  },
  errorNumber: {
    id: 'Component.FormModalCreateTopic.Error.Number',
    defaultMessage: 'Value is not a valid number!',
  },
  fieldTopic: {
    id: 'Component.FormModalCreateTopic.Field.Topic',
    defaultMessage: 'Topic name:',
  },
  fieldPartitions: {
    id: 'Component.FormModalCreateTopic.Field.Partitions',
    defaultMessage: 'Partitions:',
  },
  fieldReplications: {
    id: 'Component.FormModalCreateTopic.Field.Replications',
    defaultMessage: 'Replication factor:',
  },
});
