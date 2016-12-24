'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gregorianCalendarFormat = require('gregorian-calendar-format');

var _gregorianCalendarFormat2 = _interopRequireDefault(_gregorianCalendarFormat);

var _rcTimePickerLibTimePicker = require('rc-time-picker/lib/TimePicker');

var _rcTimePickerLibTimePicker2 = _interopRequireDefault(_rcTimePickerLibTimePicker);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _localeZh_CN = require('./locale/zh_CN');

var _localeZh_CN2 = _interopRequireDefault(_localeZh_CN);

var AntTimepicker = _react2['default'].createClass({
  displayName: 'AntTimepicker',

  getDefaultProps: function getDefaultProps() {
    return {
      format: 'HH:mm:ss',
      prefixCls: 'ant-timepicker',
      onChange: function onChange() {},
      locale: {},
      align: {
        offset: [0, -2]
      },
      open: false,
      disabled: false,
      hourOptions: undefined,
      minuteOptions: undefined,
      secondOptions: undefined,
      size: '',
      placement: 'bottomLeft',
      transitionName: 'slide-up'
    };
  },

  /**
   * 获得输入框的 className
   */
  getSizeClass: function getSizeClass() {
    var sizeClass = '';
    if (this.props.size === 'large') {
      sizeClass = ' ant-input-lg';
    } else if (this.props.size === 'small') {
      sizeClass = ' ant-input-sm';
    }
    return sizeClass;
  },

  /**
   * 获得输入框的默认值
   */
  getDefaultValue: function getDefaultValue(formatter) {
    var defaultValue = this.props.defaultValue;
    if (defaultValue) {
      return formatter.parse(defaultValue, {
        locale: this.getLocale(),
        obeyCount: true
      });
    }
    return undefined;
  },

  handleChange: function handleChange(value) {
    var args = null;
    if (value) {
      args = new Date(value.getTime());
    }
    this.props.onChange(args);
  },

  getLocale: function getLocale() {
    // 统一合并为完整的 Locale
    var locale = (0, _objectAssign2['default'])({}, _localeZh_CN2['default'], this.props.locale);
    locale.lang = (0, _objectAssign2['default'])({}, _localeZh_CN2['default'].lang, this.props.locale.lang);
    return locale;
  },

  render: function render() {
    var format = this.props.format;

    var formatter = new _gregorianCalendarFormat2['default'](format);
    var placeholder = 'placeholder' in this.props ? this.props.placeholder : this.getLocale().lang.placeholder;
    return _react2['default'].createElement(_rcTimePickerLibTimePicker2['default'], _extends({}, this.props, {
      inputClassName: 'ant-input ' + this.getSizeClass(),
      formatter: formatter,
      defaultValue: this.getDefaultValue(formatter),
      placeholder: placeholder,
      onChange: this.handleChange
    }));
  }

});

exports['default'] = AntTimepicker;
module.exports = exports['default'];