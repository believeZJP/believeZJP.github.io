'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _gregorianCalendarLibLocaleEn_US = require('gregorian-calendar/lib/locale/en_US');

var _gregorianCalendarLibLocaleEn_US2 = _interopRequireDefault(_gregorianCalendarLibLocaleEn_US);

var _rcTimePickerLibLocaleEn_US = require('rc-time-picker/lib/locale/en_US');

var _rcTimePickerLibLocaleEn_US2 = _interopRequireDefault(_rcTimePickerLibLocaleEn_US);

// 统一合并为完整的 Locale
var locale = (0, _objectAssign2['default'])({}, _gregorianCalendarLibLocaleEn_US2['default']);
locale.lang = (0, _objectAssign2['default'])({
  placeholder: 'Select a time'
}, _rcTimePickerLibLocaleEn_US2['default']);

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

exports['default'] = locale;
module.exports = exports['default'];