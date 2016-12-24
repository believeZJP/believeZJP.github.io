'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Form = (function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    _classCallCheck(this, Form);

    _get(Object.getPrototypeOf(Form.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Form, [{
    key: 'render',
    value: function render() {
      var _formClassName;

      var prefixCls = this.props.prefixCls;
      var formClassName = (_formClassName = {}, _defineProperty(_formClassName, prefixCls + '-horizontal', this.props.horizontal), _defineProperty(_formClassName, prefixCls + '-inline', this.props.inline), _formClassName);
      var classes = (0, _classnames2['default'])(formClassName);

      return _react2['default'].createElement(
        'form',
        _extends({}, this.props, { className: classes }),
        this.props.children
      );
    }
  }]);

  return Form;
})(_react2['default'].Component);

Form.propTypes = {
  prefixCls: _react2['default'].PropTypes.string,
  horizontal: _react2['default'].PropTypes.bool,
  inline: _react2['default'].PropTypes.bool,
  children: _react2['default'].PropTypes.any,
  onSubmit: _react2['default'].PropTypes.func
};

Form.defaultProps = {
  prefixCls: 'ant-form'
};

module.exports = Form;