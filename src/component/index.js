//Dependencies
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import DropzoneFocus from 'dropzone';
import './style/index.scss';

const propTypes = {
    withCredentials: PropTypes.bool,
    style: PropTypes.object,
    url: PropTypes.string,
    paramName: PropTypes.string,
    previewTemplate: PropTypes.string,
    removalTimeout: PropTypes.number,
    onFileSuccess: PropTypes.func,
    onFileComplete: PropTypes.func
};

const defaultProps = {
    paramName: 'upfile',
    removalTimeout: 1500
};

/**
 * Component use for uploading files.
 * 
 * @class FileUploadZone
 * @extends {Component}
 */
class FileUploadZone extends Component {
    /**
     * Creates an instance of FileUploadZone.
     * @param {any} props props received
     * @memberof FileUploadZone
     */
    constructor(props) {
        super(props);
        this.state = {
            dragging: false,
            fileId: uuid()
        };
    }

    /**
    * Component did mount
    */
    componentDidMount() {
        const { fileId } = this.state;
        this.dropzone = new DropzoneFocus(`div[data-file-upload='${fileId}']`, this.props);
        this.dropzone.on('complete', this._onFileComplete);
        this.dropzone.on('success', this._onFileSuccess);
    }

    /**
     * Component will receive props.
     * 
     * @param {object} newProps the new props
     * @memberof FileUploadZone
     */
    componentWillReceiveProps(newProps) {
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

    _onFileComplete = file => {
        const { removalTimeout } = this.props;
        setTimeout(() => {
            this.dropzone.removeFile(file);
        }, removalTimeout);

        if (this.props.onFileComplete) {
            this.props.onFileComplete(file);
        }
    }
    /**
     * Function called on file success. See Dropzone doc for more informations.
     * @param {any} file the file returned by dropzone.
     * @param {any} response the response returned by dropzone.
     * 
     * @memberof FileUploadZone
     */
    _onFileSuccess = (file, response) => {
        if (this.props.onFileSuccess) {
            this.props.onFileSuccess(file, response);
        }
    }

    /**
    * Render the component
    * @return {JSX} The rendered component
    */
    render() {
        const { fileId } = this.state;
        return (
            <div data-focus='file-upload'>
                <div className='dz-clickable' data-file-upload={fileId} data-focus='file-upload-dropzone'>
                    <div className='dz-message needsclick'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

FileUploadZone.displayName = 'FileUploadZone';
FileUploadZone.defaultProps = defaultProps;
FileUploadZone.propTypes = propTypes;

export default FileUploadZone;
