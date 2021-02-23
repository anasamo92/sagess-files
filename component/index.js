'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uuid = require('uuid');

var _dropzone = require('dropzone');

var _dropzone2 = _interopRequireDefault(_dropzone);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Dependencies


var propTypes = {
    withCredentials: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    url: _propTypes2.default.string,
    paramName: _propTypes2.default.string,
    previewTemplate: _propTypes2.default.string,
    removalTimeout: _propTypes2.default.number,
    onFileSuccess: _propTypes2.default.func,
    onFileComplete: _propTypes2.default.func
};

var defaultProps = {
    paramName: 'upfile',
    removalTimeout: 1500
};

/**
 * Component use for uploading files.
 * 
 * @class FileUploadZone
 * @extends {Component}
 */

var FileUploadZone = function (_Component) {
    _inherits(FileUploadZone, _Component);

    /**
     * Creates an instance of FileUploadZone.
     * @param {any} props props received
     * @memberof FileUploadZone
     */
    function FileUploadZone(props) {
        _classCallCheck(this, FileUploadZone);

        var _this = _possibleConstructorReturn(this, (FileUploadZone.__proto__ || Object.getPrototypeOf(FileUploadZone)).call(this, props));

        _this._onFileComplete = function (file) {
            var removalTimeout = _this.props.removalTimeout;

            setTimeout(function () {
                _this.dropzone.removeFile(file);
            }, removalTimeout);

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
         * Component will receive props.
         * 
         * @param {object} newProps the new props
         * @memberof FileUploadZone
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

        /**
         * Function called on file completion. See Dropzone doc for more informations.
         * @param {any} file the file returned by dropzone.
         * @memberof FileUploadZone
         */

        /**
         * Function called on file success. See Dropzone doc for more informations.
         * @param {any} file the file returned by dropzone.
         * @param {any} response the response returned by dropzone.
         * 
         * @memberof FileUploadZone
         */

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