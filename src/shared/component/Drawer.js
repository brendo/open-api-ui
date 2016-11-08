import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

import './Drawer.scss';

export default class Drawer extends Component {
  render() {
    const { tags } = this.props;
    return (
      <ul
        ref={ref => {
          const offset = $(ref).offset() || {};
          const top = offset.top;
          $(ref).pushpin({ top });

          $(window).scroll(() => {
            $('.side-nav li').removeClass('active');
            $('.side-nav li .collapsible-body').css('display', 'none');
            $('.side-nav li .collapsible-body ul li a').parent().removeClass('active');

            const activeAnchor = $('.side-nav li .collapsible-body ul li .active').first();
            activeAnchor.parent().parent().parent().parent()
              .addClass('active');
            activeAnchor.parent().parent().parent().css('display', 'block');
            activeAnchor.parent().addClass('active');
          });
        }}
        id="slide-out"
        className="side-nav fixed collapsible drawer-taglist"
        data-collapsible="accordion"
      >
        <li>
          <a className="waves-effect waves-teal" href="#api-description">Api Description</a>
        </li>
        {tags.map(tag =>
          <li key={tag.name}>
            <a className="collapsible-header waves-effect waves-light" href={`#${tag.name}`}>
              {tag.name}
              <span className="grey-text">{_.truncate(tag.description)}</span>
            </a>
            <div className="collapsible-body">
              <ul>
                {tag.entrypoints.map(entrypoint =>
                  <li key={entrypoint.method + entrypoint.path}>
                    <a
                      href={`#${_.kebabCase(entrypoint.method + entrypoint.path)}`}
                      className="waves-effect waves-light truncate"
                    >{entrypoint.method.toUpperCase()} {entrypoint.path}</a>
                  </li>
                )}
              </ul>
            </div>
          </li>
        )}
      </ul>
    );
  }
}

Drawer.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    entrypoints: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      method: PropTypes.string,
    })),
  })),
};
