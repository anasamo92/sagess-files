//Dependencies
import React, { Component } from 'react';
import FileUploadZone from '../component';
import config from './config.json';
import './style.scss';
import store from '../store/built-in-store';

export default class ExampleApp extends Component {
    constructor(props) {
        super(props);
        this.state = {files: []};
        this.displayName = 'FileExample';
    }

    componentDidMount() {
        store.addFilesChangeListener(this._onFilesChange);
    }

    componentWillUnmount() {
        store.removeFilesChangeListener(this._onFilesChange);
    }

    _onFilesChange= () => {
        const files = store.getFiles();
        this.setState({files});
    }

    render() {
        const {files} = this.state;
        return (
            <div data-focus='example'>
                <h1>File upload</h1>
                <FileUploadZone url={`${config.rootURL}/${config.fileURL}`}/>
                <div data-focus='files'>
                    <div data-focus='success'>
                        <h4>Files</h4>
                        <ul>
                            {files.filter(file => 'success' === file.status).map(file => <li>{file.name}</li>)}
                        </ul>
                    </div>
                    <div data-focus='log'>
                        <h4>Log</h4>
                        <ul>
                            {files.map(file => <li>{file.name} - <b style={{color: 'success' === file.status ? 'green' : 'red'}}>{file.status}</b></li>)}
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}

ExampleApp.displayName = 'ExampleApp';
