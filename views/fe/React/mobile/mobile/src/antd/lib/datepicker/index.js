'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcCalendar = require('rc-calendar');

var _rcCalendar2 = _interopRequireDefault(_rcCalendar);

var _rcCalendarLibMonthCalendar = require('rc-calendar/lib/MonthCalendar');

var _rcCalendarLibMonthCalendar2 = _interopRequireDefault(_rcCalendarLibMonthCalendar);

var _rcCalendarLibPicker = require('rc-calendar/lib/Picker');

var _rcCalendarLibPicker2 = _interopRequireDefault(_rcCalendarLibPicker);

var _gregorianCalendar = require('gregorian-calendar');

var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);

var _localeZh_CN = require('./locale/zh_CN');

var _localeZh_CN2 = _interopRequireDefault(_localeZh_CN);

var _rcCalendarLibLocaleZh_CN = require('rc-calendar/lib/locale/zh_CN');

var _rcCalendarLibLocaleZh_CN2 = _interopRequireDefault(_rcCalendarLibLocaleZh_CN);

var _gregorianCalendarFormat = require('gregorian-calendar-format');

var _gregorianCalendarFormat2 = _interopRequireDefault(_gregorianCalendarFormat);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function createPicker(TheCalendar, defaultFormat) {
  return _react2['default'].createClass({
    getDefaultProps: function getDefaultProps() {
      return {
        format: defaultFormat || 'yyyy-MM-dd',
        transitionName: 'slide-up',
        popupStyle: {},
        onSelect: null, // 向前兼容
        onChange: function onChange() {}, // onChange 可用于 Validator
        locale: {},
        align: {
          offset: [0, -9]
        },
        open: false
      };
    },
    getInitialState: function getInitialState() {
      return {
        value: this.parseDateFromValue(this.props.value || this.props.defaultValue)
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: this.parseDateFromValue(nextProps.value)
        });
      }
    },
    getLocale: function getLocale() {
      // 统一合并为完整的 Locale
      var locale = (0, _objectAssign2['default'])({}, _localeZh_CN2['default'], this.props.locale);
      locale.lang = (0, _objectAssign2['default'])({}, _localeZh_CN2['default'].lang, this.props.locale.lang);
      return locale;
    },
    getFormatter: function getFormatter() {
      var formats = this.formats = this.formats || {};
      var format = this.props.format;
      if (formats[format]) {
        return formats[format];
      }
      formats[format] = new _gregorianCalendarFormat2['default'](format, this.getLocale().lang.format);
      return formats[format];
    },
    parseDateFromValue: function parseDateFromValue(value) {
      if (value) {
        if (typeof value === 'string') {
          return this.getFormatter().parse(value, { locale: this.getLocale() });
        } else if (value instanceof Date) {
          var date = new _gregorianCalendar2['default'](this.getLocale());
          date.setTime(value);
          return date;
        }
      } else if (value === null) {
        return value;
      }
      return undefined;
    },
    // remove input readonly warning
    handleInputChange: function handleInputChange() {},
    toggleOpen: function toggleOpen(e) {
      this.setState({
        open: e.open
      });
    },
    handleChange: function handleChange(value) {
      this.setState({ value: value });
      var timeValue = value ? new Date(value.getTime()) : null;
      // onSelect 为向前兼容.
      if (this.props.onSelect) {
        require('util-deprecate')(this.props.onSelect, 'onSelect property of Datepicker is deprecated, use onChange instead')(timeValue);
      }
      this.props.onChange(timeValue);
    },
    render: function render() {
      var _this = this;

      var locale = this.getLocale();
      // 以下两行代码
      // 给没有初始值的日期选择框提供本地化信息
      // 否则会以周日开始排
      var defaultCalendarValue = new _gregorianCalendar2['default'](locale);
      defaultCalendarValue.setTime(Date.now());

      var placeholder = 'placeholder' in this.props ? this.props.placeholder : locale.lang.placeholder;
      var calendar = _react2['default'].createElement(TheCalendar, {
        disabledDate: this.props.disabledDate,
        locale: locale.lang,
        defaultValue: defaultCalendarValue,
        dateInputPlaceholder: placeholder,
        showTime: this.props.showTime,
        prefixCls: 'ant-calendar',
        showOk: this.props.showTime,
        showClear: true });

      var sizeClass = '';
      if (this.props.size === 'large') {
        sizeClass = ' ant-input-lg';
      } else if (this.props.size === 'small') {
        sizeClass = ' ant-input-sm';
      }

      var pickerClass = 'ant-calendar-picker';
      if (this.state.open) {
        pickerClass += ' ant-calendar-picker-open';
      }

      return _react2['default'].createElement(
        'span',
        { className: pickerClass },
        _react2['default'].createElement(
          _rcCalendarLibPicker2['default'],
          {
            transitionName: this.props.transitionName,
            disabled: this.props.disabled,
            calendar: calendar,
            value: this.state.value,
            prefixCls: 'ant-calendar-picker-container',
            style: this.props.popupStyle,
            align: this.props.align,
            onOpen: this.toggleOpen,
            onClose: this.toggleOpen,
            onChange: this.handleChange },
          function (_ref) {
            var value = _ref.value;

            return _react2['default'].createElement(
              'span',
              null,
              _react2['default'].createElement('input', { disabled: _this.props.disabled,
                onChange: _this.handleInputChange,
                value: value && _this.getFormatter().format(value),
                placeholder: placeholder,
                style: _this.props.style,
                className: 'ant-calendar-picker-input ant-input' + sizeClass }),
              _react2['default'].createElement('span', { className: 'ant-calendar-picker-icon' })
            );
          }
        )
      );
    }
  });
}

var AntDatePicker = createPicker(_rcCalendar2['default']);
var AntMonthPicker = createPicker(_rcCalendarLibMonthCalendar2['default'], 'yyyy-MM');

var AntCalendar = _react2['default'].createClass({
  displayName: 'AntCalendar',

  getDefaultProps: function getDefaultProps() {
    return {
      locale: _rcCalendarLibLocaleZh_CN2['default'],
      prefixCls: 'ant-calendar'
    };
  },
  render: function render() {
    return _react2['default'].createElement(_rcCalendar2['default'], this.props);
  }
});

AntDatePicker.Calendar = AntCalendar;
AntDatePicker.MonthPicker = AntMonthPicker;

exports['default'] = AntDatePicker;
module.exports = exports['default'];