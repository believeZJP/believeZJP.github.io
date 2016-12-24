'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _progress = require('../progress');

var prefixCls = 'ant-upload';
exports['default'] = _react2['default'].createClass({
  displayName: 'uploadList',

  getDefaultProps: function getDefaultProps() {
    return {
      items: [],
      progressAttr: {
        strokeWidth: 3,
        showInfo: false
      }
    };
  },
  handleClose: function handleClose(file) {
    this.props.onRemove(file);
  },
  render: function render() {
    var _this = this;

    var list = this.props.items.map(function (file) {
      var progress = undefined;
      var infoUploadingClass = '';
      if (file.status === 'uploading') {
        progress = _react2['default'].createElement(
          'div',
          { className: prefixCls + '-list-item-progress' },
          _react2['default'].createElement(_progress.Line, _extends({}, _this.props.progressAttr, { percent: file.percent }))
        );
        infoUploadingClass = ' ' + prefixCls + '-list-item-uploading';
      }
      return _react2['default'].createElement(
        'div',
        { className: prefixCls + '-list-item' + infoUploadingClass, key: file.uid },
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-list-item-info' },
          _react2['default'].createElement(_icon2['default'], { type: 'paper-clip' }),
          _react2['default'].createElement(
            'span',
            { className: 'ant-upload-item-name' },
            file.name
          ),
          _react2['default'].createElement(_icon2['default'], { type: 'cross', ref: 'theCloseBtn',
            onClick: _this.handleClose.bind(_this, file) })
        ),
        progress
      );
    });
    return _react2['default'].createElement(
      'div',
      { className: prefixCls + '-list' },
      _react2['default'].createElement(
        _rcAnimate2['default'],
        { transitionName: prefixCls + '-margin-top' },
        list
      )
    );
  }
});
module.exports = exports['default'];