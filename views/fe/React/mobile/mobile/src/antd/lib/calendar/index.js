'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gregorianCalendar = require('gregorian-calendar');

var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);

var _localeZh_CN = require('./locale/zh_CN');

var _localeZh_CN2 = _interopRequireDefault(_localeZh_CN);

var _rcCalendarLibFullCalendar = require('rc-calendar/lib/FullCalendar');

var _rcCalendarLibFullCalendar2 = _interopRequireDefault(_rcCalendarLibFullCalendar);

var _Constants = require('./Constants');

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function noop() {
  return null;
}

function zerofixed(v) {
  if (v < 10) return '0' + v;
  return v + '';
}

var Calendar = (function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    _get(Object.getPrototypeOf(Calendar.prototype), 'constructor', this).call(this, props);
    this.state = {
      value: this.parseDateFromValue(props.value || new Date()),
      mode: props.mode
    };
  }

  _createClass(Calendar, [{
    key: 'parseDateFromValue',
    value: function parseDateFromValue(value) {
      var date = new _gregorianCalendar2['default'](this.props.locale);
      date.setTime(+value);
      return date;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: this.parseDateFromValue(nextProps.value)
        });
      }
    }
  }, {
    key: 'monthCellRender',
    value: function monthCellRender(value, locale) {
      var prefixCls = this.props.prefixCls;
      var month = value.getMonth();
      return _react2['default'].createElement(
        'div',
        { className: prefixCls + '-month' },
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-value' },
          locale.format.shortMonths[month]
        ),
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-content' },
          this.props.monthCellRender(value)
        )
      );
    }
  }, {
    key: 'dateCellRender',
    value: function dateCellRender(value) {
      var prefixCls = this.props.prefixCls;
      return _react2['default'].createElement(
        'div',
        { className: prefixCls + '-date' },
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-value' },
          zerofixed(value.getDayOfMonth())
        ),
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-content' },
          this.props.dateCellRender(value)
        )
      );
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (!('value' in this.props) && this.state.value !== value) {
        this.setState({ value: value });
      }
      this.props.onPanelChange(value, this.state.mode);
    }
  }, {
    key: 'setType',
    value: function setType(type) {
      var mode = type === 'date' ? 'month' : 'year';
      if (this.state.mode !== mode) {
        this.setState({ mode: mode });
        this.props.onPanelChange(this.state.value, mode);
      }
    }
  }, {
    key: 'onPanelSelect',
    value: function onPanelSelect(value, e) {
      if (e && e.target === 'month') {
        // Because the fullcalendars'type will automaticlly change to 'date' when select month cell
        // but we didn't want this, so we force update view to get things right
        // since ours 'mode' would not change.
        this.forceUpdate();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var _state = this.state;
      var value = _state.value;
      var mode = _state.mode;
      var locale = props.locale;
      var prefixCls = props.prefixCls;
      var style = props.style;
      var className = props.className;
      var fullscreen = props.fullscreen;

      var type = mode === 'year' ? 'month' : 'date';

      var cls = className || '';
      if (fullscreen) {
        cls += ' ' + prefixCls + '-fullscreen';
      }

      return _react2['default'].createElement(
        'div',
        { className: cls, style: style },
        _react2['default'].createElement(_Header2['default'], {
          fullscreen: fullscreen,
          type: type,
          value: value,
          locale: locale.lang,
          prefixCls: prefixCls,
          onTypeChange: this.setType.bind(this),
          onValueChange: this.setValue.bind(this) }),
        _react2['default'].createElement(_rcCalendarLibFullCalendar2['default'], _extends({}, props, {
          locale: locale.lang,
          type: type,
          prefixCls: prefixCls,
          showHeader: false,
          onSelect: this.onPanelSelect.bind(this),
          value: value,
          monthCellRender: this.monthCellRender.bind(this),
          dateCellRender: this.dateCellRender.bind(this) }))
      );
    }
  }]);

  return Calendar;
})(_react.Component);

Calendar.propTypes = {
  monthCellRender: _react.PropTypes.func,
  dateCellRender: _react.PropTypes.func,
  fullscreen: _react.PropTypes.bool,
  locale: _react.PropTypes.object,
  prefixCls: _react.PropTypes.string,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  onPanelChange: _react.PropTypes.func,
  value: _react.PropTypes.instanceOf(Date)
};

Calendar.defaultProps = {
  monthCellRender: noop,
  dateCellRender: noop,
  locale: _localeZh_CN2['default'],
  fullscreen: true,
  prefixCls: _Constants.PREFIX_CLS,
  onPanelChange: noop,
  mode: 'month'
};

exports['default'] = Calendar;
module.exports = exports['default'];