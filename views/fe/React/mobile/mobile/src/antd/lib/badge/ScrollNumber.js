'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _cssAnimation = require('css-animation');

function getNumberArray(num) {
  return num ? num.toString().split('').reverse().map(function (i) {
    return Number(i);
  }) : [];
}

var AntScrollNumber = (function (_React$Component) {
  _inherits(AntScrollNumber, _React$Component);

  function AntScrollNumber(props) {
    _classCallCheck(this, AntScrollNumber);

    _get(Object.getPrototypeOf(AntScrollNumber.prototype), 'constructor', this).call(this, props);
    this.state = {
      animateStarted: true,
      count: props.count
    };
  }

  _createClass(AntScrollNumber, [{
    key: 'getPositionByNum',
    value: function getPositionByNum(num, i) {
      if (this.state.animateStarted) {
        return 10 + num;
      }
      var currentDigit = getNumberArray(this.state.count)[i];
      var lastDigit = getNumberArray(this.lastCount)[i];
      // 同方向则在同一侧切换数字
      if (this.state.count > this.lastCount) {
        if (currentDigit >= lastDigit) {
          return 10 + num;
        } else {
          return 20 + num;
        }
      } else {
        if (currentDigit <= lastDigit) {
          return 10 + num;
        } else {
          return num;
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this = this;

      if ('count' in nextProps && nextProps.count) {
        if (this.lastCount === this.state.count) {
          return;
        }
        this.lastCount = this.state.count;
        // 复原数字初始位置
        this.setState({
          animateStarted: true
        }, function () {
          // 等待数字位置复原完毕
          // 开始设置完整的数字
          setTimeout(function () {
            _this.setState({
              animateStarted: false,
              count: nextProps.count
            }, function () {
              _this.props.onAnimated();
            });
          }, 5);
        });
      }
    }
  }, {
    key: 'renderNumberList',
    value: function renderNumberList() {
      var childrenToReturn = [];
      for (var i = 0; i < 30; i++) {
        childrenToReturn.push(_react2['default'].createElement(
          'p',
          { key: i },
          i % 10
        ));
      }
      return childrenToReturn;
    }
  }, {
    key: 'renderCurrentNumber',
    value: function renderCurrentNumber(num, i) {
      var position = this.getPositionByNum(num, i);
      var height = this.props.height;
      var removeTransition = this.state.animateStarted || getNumberArray(this.lastCount)[i] === undefined;
      return (0, _react.createElement)('span', {
        className: this.props.prefixCls + '-only',
        style: {
          transition: removeTransition && 'none',
          transform: 'translate3d(0, ' + -position * height + 'px, 0)',
          height: height
        },
        key: i
      }, this.renderNumberList());
    }
  }, {
    key: 'renderNumberElement',
    value: function renderNumberElement() {
      var _this2 = this;

      var state = this.state;
      if (!state.count || isNaN(state.count)) {
        return state.count;
      }
      return getNumberArray(state.count).map(function (num, i) {
        return _this2.renderCurrentNumber(num, i);
      }).reverse();
    }
  }, {
    key: 'render',
    value: function render() {
      var props = (0, _objectAssign2['default'])({}, this.props, {
        className: this.props.prefixCls + ' ' + this.props.className
      });
      var isBrowser = typeof document !== 'undefined' && typeof window !== 'undefined';
      if (isBrowser && _cssAnimation.isCssAnimationSupported) {
        return (0, _react.createElement)(this.props.component, props, this.renderNumberElement());
      } else {
        return (0, _react.createElement)(this.props.component, props, props.count);
      }
    }
  }]);

  return AntScrollNumber;
})(_react2['default'].Component);

AntScrollNumber.defaultProps = {
  prefixCls: 'ant-scroll-number',
  count: null,
  component: 'sup',
  onAnimated: function onAnimated() {},
  height: 20
};

AntScrollNumber.propTypes = {
  count: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
  component: _react2['default'].PropTypes.string,
  onAnimated: _react2['default'].PropTypes.func,
  height: _react2['default'].PropTypes.number
};

exports['default'] = AntScrollNumber;
module.exports = exports['default'];