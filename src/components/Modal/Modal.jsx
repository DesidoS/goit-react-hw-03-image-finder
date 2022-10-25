import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modalRoot');

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      return this.props.toggleModal();
    }
  };
  onClickClose = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <Overlay onClick={this.onClickClose}>
        <ModalDiv>{children}</ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}
