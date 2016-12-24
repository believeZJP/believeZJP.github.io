'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _gregorianCalendarLibLocaleZh_CN = require('gregorian-calendar/lib/locale/zh_CN');

var _gregorianCalendarLibLocaleZh_CN2 = _interopRequireDefault(_gregorianCalendarLibLocaleZh_CN);

var _rcTimePickerLibLocaleZh_CN = require('rc-time-picker/lib/locale/zh_CN');

var _rcTimePickerLibLocaleZh_CN2 = _interopRequireDefault(_rcTimePickerLibLocaleZh_CN);

// 统一合并为完整的 Locale
var locale = (0, _objectAssign2['default'])({}, _gregorianCalendarLibLocaleZh_CN2['default']);
locale.lang = (0, _objectAssign2['default'])({
  placeholder: '请选择时间'
}, _rcTimePickerLibLocaleZh_CN2['default']);

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

exports['default'] = locale;
module.exports = exports['default'];