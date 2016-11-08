import { connect } from 'react-redux';
import _ from 'lodash';
import EntrypointList from '../component/EntrypointLists';

const TaggedEntrypoints = connect(
  state => ({
    lists: _.map(state.definition.tags,
      tag => ({
        title: tag.name,
        description: tag.description,
        entrypoints: _.filter(state.definition.entrypoints,
          entrypoint => _.includes(entrypoint.operation.tags, tag.name)),
      })),
  }),
  () => ({})
)(EntrypointList);

export default TaggedEntrypoints;
