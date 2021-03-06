import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import SUPPORTED_LOCALES from '../../../constants/supported-locales';
// import styles from './styles/header-styles.scss';

class LocaleSelector extends Component {
  render() {
    const localeSelectorMarkup = Object.keys(SUPPORTED_LOCALES).map((localeKey, idx) => {
      return(<MenuItem eventKey={localeKey} key={`locale-menu-item-${ localeKey }`} onSelect={ this.props.setLocale }>
              { SUPPORTED_LOCALES[localeKey] }
            </MenuItem>);
    });

    // TODO: Title
    return (
      <dd className="icon-block user-link-block">
        <DropdownButton dropup={ true } title={ SUPPORTED_LOCALES[this.props.currentLocale] } id='user-account-dropdown'>
          { localeSelectorMarkup }
        </DropdownButton>
      </dd>
    );
  }
}

export default LocaleSelector;
