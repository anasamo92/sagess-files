'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _store = require('focus-core/store');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Dependencies.


var definition = {
    files: 'files'
};

/**
* Class standing for the account relative data store.
*/

var FileStore = function (_CoreStore) {
    _inherits(FileStore, _CoreStore);

    function FileStore(conf) {
        _classCallCheck(this, FileStore);

        conf = conf || {};
        conf.definition = conf.definition || definition;
        return _possibleConstructorReturn(this, (FileStore.__proto__ || Object.getPrototypeOf(FileStore)).call(this, conf));
    }

    return FileStore;
}(_store.CoreStore);

exports.default = FileStore;
module.exports = exports['default'];