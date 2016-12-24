'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

exports['default'] = _react2['default'].createClass({
  displayName: 'index',

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'ant-alert'
    };
  },
  getInitialState: function getInitialState() {
    return {
      closing: true,
      closed: false
    };
  },
  handleClose: function handleClose(e) {
    e.preventDefault();
    var dom = _reactDom2['default'].findDOMNode(this);
    dom.style.height = dom.offsetHeight + 'px';
    // Magic code
    // 重复一次后才能正确设置 height
    dom.style.height = dom.offsetHeight + 'px';

    this.setState({
      closing: false
    });
    if (this.props.onClose) {
      this.props.onClose.call(this, e);
    }
  },
  animationEnd: function animationEnd() {
    this.setState({
      closed: true,
      closing: true
    });
  },
  render: function render() {
    var iconClass = this.props.description ? 'ant-alert-with-description-icon' : 'ant-alert-icon';
    var iconType = '';
    switch (this.props.type) {
      case 'success':
        iconType = 'check-circle';
        break;
      case 'info':
        iconType = 'info-circle';
        break;
      case 'error':
        iconType = 'exclamation-circle';
        break;
      case 'warn':
        iconType = 'question-circle';
        break;
      default:
        iconType = 'default';
    }
    var html = undefined;
    var closeName = !this.state.closing ? ' ' + this.props.prefixCls + '-close' : '';
    if (this.props.description) {
      var _close = this.props.closable ? _react2['default'].createElement(
        'a',
        { onClick: this.handleClose, className: 'ant-alert-with-description-close-icon' },
        _react2['default'].createElement('span', { className: 'ant-alert-with-description-close-icon-x' })
      ) : '';
      html = _react2['default'].createElement(
        'div',
        { 'data-show': this.state.closing, className: 'ant-alert-with-description ant-alert-with-description-' + this.props.type + closeName },
        _react2['default'].createElement(_icon2['default'], { className: iconClass, type: iconType }),
        _react2['default'].createElement(
          'p',
          { className: 'ant-alert-with-description-message' },
          this.props.message
        ),
        _react2['default'].createElement(
          'span',
          { className: 'ant-alert-with-description-description' },
          this.props.description
        ),
        _close
      );
    } else {
      if (this.props.closeText) {
        html = _react2['default'].createElement(
          'div',
          { 'data-show': this.state.closing, className: 'ant-alert ant-alert-' + this.props.type + closeName },
          _react2['default'].createElement(_icon2['default'], { className: iconClass, type: iconType }),
          _react2['default'].createElement(
            'span',
            { className: 'ant-alert-description' },
            this.props.message
          ),
          _react2['default'].createElement(
            'span',
            { onClick: this.handleClose, className: 'ant-alert-close-text' },
            this.props.closeText
          )
        );
      } else {
        var _close2 = this.props.closable ? _react2['default'].createElement(
          'a',
          { onClick: this.handleClose, className: 'ant-alert-close-icon' },
          _react2['default'].createElement('span', { className: 'ant-alert-close-icon-x' })
        ) : '';
        html = _react2['default'].createElement(
          'div',
          { 'data-show': this.state.closing, className: 'ant-alert ant-alert-' + this.props.type + closeName },
          _react2['default'].createElement(_icon2['default'], { className: iconClass, type: iconType }),
          _react2['default'].createElement(
            'span',
            { className: 'ant-alert-description' },
            this.props.message
          ),
          _close2
        );
      }
    }
    return this.state.closed ? null : _react2['default'].createElement(
      _rcAnimate2['default'],
      {
        component: '',
        showProp: 'data-show',
        transitionName: 'slide-up',
        onEnd: this.animationEnd },
      html
    );
  }
});
module.exports = exports['default'];