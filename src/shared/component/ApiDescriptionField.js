import React, { PropTypes, Component } from 'react';
import marked from 'marked';
//import 'github-markdown-css/github-markdown.css';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

export default class ApiDescriptionField extends Component {
  render() {
    const { description } = this.props;
    return (
      <article
        id="api-description"
        name="api-description"
        className="markdown-body scrollspy"
        dangerouslySetInnerHTML={{ __html: marked(description) }}
        ref={ref => $(document).ready(() => $(ref).scrollSpy())}
      />
    );
  }
}

ApiDescriptionField.propTypes = {
  description: PropTypes.string,
};
