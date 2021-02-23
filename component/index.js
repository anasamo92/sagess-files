'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builtInStore = require('../store/built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

var _uuid = require('uuid');

var _focusCore = require('focus-core');

var _dropzone = require('dropzone');

var _dropzone2 = _interopRequireDefault(_dropzone);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Dependencies


var propTypes = {
    withCredentials: _react.PropTypes.bool,
    style: _react.PropTypes.object,
    url: _react.PropTypes.string,
    paramName: _react.PropTypes.string,
    previewTemplate: _react.PropTypes.string,
    removalTimeout: _react.PropTypes.number,
    store: _react.PropTypes.object,
    onFileSuccess: _react.PropTypes.func,
    onFileComplete: _react.PropTypes.func
};

var defaultProps = {
    paramName: 'upfile',
    removalTimeout: 1500,
    store: _builtInStore2.default
};

/**
* Component use for uploading files.
*/

var FileUploadZone = function (_Component) {
    _inherits(FileUploadZone, _Component);

    function FileUploadZone(props) {
        _classCallCheck(this, FileUploadZone);

        var _this = _possibleConstructorReturn(this, (FileUploadZone.__proto__ || Object.getPrototypeOf(FileUploadZone)).call(this, props));

        _this._onFileComplete = function (file) {
            var _this$props = _this.props,
                removalTimeout = _this$props.removalTimeout,
                store = _this$props.store;

            setTimeout(function () {
                _this.dropzone.removeFile(file);
            }, removalTimeout);
            var files = store.getFiles() || [];
            files.push(file);
            _focusCore.dispatcher.handleServerAction({
                data: { files: files },
                type: 'update'
            });
            if (_this.props.onFileComplete) {
                _this.props.onFileComplete(file);
            }
        };

        _this._onFileSuccess = function (file, response) {
            if (_this.props.onFileSuccess) {
                _this.props.onFileSuccess(file, response);
            }
        };

        _this.state = {
            dragging: false,
            fileId: (0, _uuid.v4)()
        };
        return _this;
    }

    /**
    * Component did mount
    */


    _createClass(FileUploadZone, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var fileId = this.state.fileId;

            this.dropzone = new _dropzone2.default('div[data-file-upload=\'' + fileId + '\']', this.props);
            this.dropzone.on('complete', this._onFileComplete);
            this.dropzone.on('success', this._onFileSuccess);
        }

        /**
        * Component will receive props
        */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (newProps.url) {
                this.dropzone.options.url = newProps.url;
            }
            if (newProps.headers) {
                this.dropzone.options.headers = newProps.headers;
            }
        }
    }, {
        key: 'render',


        /**
        * Render the component
        * @return {JSX} The rendered component
        */
        value: function render() {
            var fileId = this.state.fileId;

            return _react2.default.createElement(
                'div',
                { 'data-focus': 'file-upload' },
                _react2.default.createElement(
                    'div',
                    { className: 'dz-clickable', 'data-file-upload': fileId, 'data-focus': 'file-upload-dropzone' },
                    _react2.default.createElement(
                        'div',
                        { className: 'dz-message needsclick' },
                        this.props.children
                    )
                )
            );
        }
    }]);

    return FileUploadZone;
}(_react.Component);

FileUploadZone.displayName = 'FileUploadZone';
FileUploadZone.defaultProps = defaultProps;
FileUploadZone.propTypes = propTypes;

exports.default = FileUploadZone;
module.exports = exports['default'];