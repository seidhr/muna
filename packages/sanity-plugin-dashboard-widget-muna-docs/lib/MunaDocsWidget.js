"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ui = require("@sanity/ui");

var _reactMunaLogo = require("@seidhr/react-muna-logo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MunaDocsWidget = () => {
  return /*#__PURE__*/_react.default.createElement(_ui.Card, {
    padding: [3, 3, 4],
    radius: 3,
    height: "fill"
  }, /*#__PURE__*/_react.default.createElement(_reactMunaLogo.SeidhrLogo, {
    style: {
      display: 'block',
      margin: 'auto'
    },
    width: "10em",
    height: "10em"
  }), /*#__PURE__*/_react.default.createElement(_ui.Heading, {
    as: "h2",
    size: 4,
    align: "center"
  }, "\u16D7\u16A2\u16BE\u16A8"), /*#__PURE__*/_react.default.createElement(_ui.Text, null, /*#__PURE__*/_react.default.createElement("p", null, " Muna or \u16D7\u16A2\u16BE\u16A8 means remember in norse. Muna is a schema for Sanity that enables detailed descriptions of cultural heritage objects and knowledge about their contexts."), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("a", {
    href: "https://muna.xyz/docs/model/introduction",
    target: "_blank",
    rel: "noreferrer"
  }, "Muna documentation"))));
};

var _default = MunaDocsWidget;
exports.default = _default;
//# sourceMappingURL=MunaDocsWidget.js.map