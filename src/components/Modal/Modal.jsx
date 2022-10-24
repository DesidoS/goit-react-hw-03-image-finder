import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modalRoot');

export default class Modal extends Component {
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
    return createPortal(
      <Overlay onClick={this.onClickClose}>
        <ModalDiv>
          <img src={this.props.bigPic} alt={this.props.tags}></img>
        </ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}
