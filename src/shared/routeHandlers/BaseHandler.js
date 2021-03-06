import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDefinition } from '../actions/definitionActions';
import Header from '../component/Header';
import Drawer from '../component/Drawer';
import ApiDescriptionField from '../component/ApiDescriptionField';
import TaggedEntrypoints from '../container/TaggedEntrypoints';
import DownloadButton from '../component/DownloadButton';
import LoadingBar from '../component/LoadingBar';
import LoadingError from '../component/LoadingError';
import { SwaggerLoadingStatus } from '../constants/constants';

import './base.scss';

class BaseHandler extends Component {
  constructor(props) {
    super(props);
    this.swaggerURL = this.props.location.query.url;
  }

  componentDidMount() {
    const { fetchDefinition } = this.props;
    fetchDefinition(this.swaggerURL);
  }

  render() {
    const { definition } = this.props;

    if (definition.swaggerLoadingStatus === SwaggerLoadingStatus.INITIAL) {
      return <LoadingBar/>;
    } else if (definition.swaggerLoadingStatus === SwaggerLoadingStatus.LOADING_FAILED) {
      return <LoadingError error={definition.swaggerLoadingError}/>;
    }

    const store = definition.store;
    const title = store.info ? store.info.title : '';
    const baseUrl = store.basePath ? store.basePath : '';
    const apiVersion = store.info ? store.info.version : '';
    const host = store.host ? store.host : '';
    const description = store.info ? store.info.description : '';

    return (
      <div className="app">
        <Header title={title} baseUrl={baseUrl} apiVersion={apiVersion} host={host}/>
        <Drawer />
        <main className="main">
          <div className="container">
            <ApiDescriptionField description={description}/>
            <DownloadButton url={this.swaggerURL}/>
            <TaggedEntrypoints className="apiContent"/>
          </div>
        </main>
      </div>
    );
  }
}

BaseHandler.propTypes = {
  location: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  definition: state.definition
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDefinition
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BaseHandler);
