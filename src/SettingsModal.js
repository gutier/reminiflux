import React from 'react';
import Modal from 'react-modal';
import './SettingsModal.css';

class SettingsModal extends React.Component {
	constructor(props) {
	  super(props);
      this.state = {
		  isOpen: false
	  }
	  this.closeSettings = this.closeSettings.bind(this);
	  this.clearCache = this.clearCache.bind(this);
	  this.hostInput = React.createRef();
	  this.apikeyInput = React.createRef();
	  this.limitInput = React.createRef();
	}
	
	componentDidMount() {
		this.setState({isOpen: true});
	}
	
	clearCache() {
		localStorage.removeItem('favicons');
		this.forceUpdate();
	}

	closeSettings() {
	  localStorage.setItem('miniflux_server', this.hostInput.current.value);
	  localStorage.setItem('miniflux_api_key', this.apikeyInput.current.value);
	  localStorage.setItem('fetch_limit', parseInt(this.limitInput.current.value) || 100);
	  this.setState({isOpen: false});
	  this.props.onClose();
	}
  
	render() {
		return (
		  <Modal isOpen={this.state.isOpen} ariaHideApp={false} className="settingsmodal" overlayClassName="settingsoverlay">
		  <h3>Configure connection to Miniflux</h3>
		  <p>
			<b>Host</b> (without /v1, e.g. <i>https://miniflux.mydomain.tld</i>):
			<br/>
			<input ref={this.hostInput} defaultValue={localStorage.getItem('miniflux_server')} />
		  </p>
		  <p>
			<b>API key</b> (generated in Miniflux):
			<br />
			<input ref={this.apikeyInput} defaultValue={localStorage.getItem('miniflux_api_key')} />
		  </p>
		  <p>
			<b>Maximum number of items to fetch</b>:
			<br />
			<input ref={this.limitInput} defaultValue={localStorage.getItem('fetch_limit')} />
		  </p>
		  <p>
			<b>Icon cache size</b>: { localStorage.getItem('favicons') ? Math.round(localStorage.getItem('favicons').length / 1024) : 0 }k
			<br />
			<button onClick={this.clearCache}>Clear cache</button>
		   </p>
		  <button onClick={this.closeSettings}>OK</button>
		</Modal>
		);
	  }
	}

  export default SettingsModal;
  