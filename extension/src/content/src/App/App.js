import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import { connect } from 'react-redux';

import { exampleAction } from '../_reduxState/actions';

import Button from '../components/Button';
import Modal from '../containers/Modal';

import './App.css';

class App extends Component {
  static propTypes = {
    store: shape({}).isRequired,
    dispatch: func.isRequired,
  };

  state = {
    showModal: false,
  };

  openModal = () => {
    this.setState({ showModal: true });
    this.props.dispatch(exampleAction({ content_script: 'is loaded.' }));
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div id="injected-app">
        <Button onClick={this.openModal}>
          <span>Open Modal</span>
        </Button>
        {this.state.showModal && (
          <Modal onClose={this.closeModal}>
            <p>Redux State: {JSON.stringify(this.props.store)}</p>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ InjectedApp }) => ({
  store: InjectedApp,
});

export default connect(mapStateToProps)(App);
