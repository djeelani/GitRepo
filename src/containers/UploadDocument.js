import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileUpload from 'react-md/lib/FileInputs/FileUpload';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';
import map from 'lodash/map';

import * as uploadFileAction from '../actions/documentUpload';

import { spinnerUploadTrue } from '../actions/auth';
import { createErrorMessage } from '../actions/flashMessages';
import RenderSpinner from '../components/RenderSpinner';
import '../assets/stylesheets/UploadDocument.scss';

class UploadDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    this.createUploadUI = this.createUploadUI.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleSetFile = this.handleSetFile.bind(this);
    this.setUpload = this.setUpload.bind(this);
  }

  setUpload(upload) {
    this.upload = upload;
  }

  handleOnLoad(file, uploadResult) {
    const { name } = file;
    let documentFile = {};
    documentFile.name = name;
    documentFile.uploadResult = uploadResult;
    if (this.props.transactionApplicationId) {
      for (var i = 0; i < this.props.tradeTransactions.length; i++) {
        if (
          this.props.transactionApplicationId ===
          this.props.tradeTransactions[i].id
        ) {
          this.props.tradeTransactions[i].spinnerUpload = true;
          this.props.tradeTransactions[i].errorMessage = '';
        }
      }
      this.props.dispatch(
        uploadFileAction.dashboardFileUploadSpinnerTrueOrFalse(
          documentFile.name
        )
      );
    } else {
      this.props.dispatch(createErrorMessage(''));
      this.props.dispatch(spinnerUploadTrue());
    }
    this.props.dispatch(
      uploadFileAction.upload(
        documentFile,
        this.props.transactionApplicationId,
        this.props.tradeTransactions
      )
    );
  }

  handleSetFile(file) {
    this.setState({ file });
  }

  handleOnClose(fileName, event) {
    event.preventDefault();
    this.props.dispatch(uploadFileAction.removeUpload(fileName));
  }

  handleInputFile(event) {
    event.preventDefault();
  }

  handleMultipleCalls(uploadedDocuments, fileUploadObject) {
    for (var i = 0; i < uploadedDocuments.length; i++) {
      if (uploadedDocuments[i].url === fileUploadObject.url) {
        return uploadedDocuments.splice(i, 1);
      }
    }
  }

  createUploadUI() {
    const {
      documents,
      uploadedDocuments,
      transactionApplicationId,
      fileUploadObject,
    } = this.props;

    if (uploadedDocuments === undefined) {
      return map(documents, (doc, i) => {
        return (
          <a key={i}>
            <div title={doc.name}>
              <TextField
                inputClassName="upload-document__file-input  font_size__normal"
                className="upload-document__file"
                fullWidth={false}
                value={doc.name}
                onChange={this.handleInputFile.bind(this)}
                disabled={true}
                leftIcon={
                  <FontIcon className="upload-document__file-icon">
                    description
                  </FontIcon>
                }
                rightIcon={
                  <FontIcon
                    onClick={this.handleOnClose.bind(this, doc.name)}
                    className="upload-document__remove-icon"
                  >
                    close
                  </FontIcon>
                }
              />
            </div>
          </a>
        );
      });
    } else {
      if (this.props.applicationId === transactionApplicationId) {
        this.handleMultipleCalls(uploadedDocuments, fileUploadObject);
        if (fileUploadObject.name !== undefined) {
          uploadedDocuments.push(fileUploadObject);
        }
      }
      if (uploadedDocuments.length > 0) {
        return map(uploadedDocuments, (doc, i) => {
          return (
            <div className="upload-document__file-dashboard-file-list">
              <a href={doc.url} key={i} download={doc.url}>
                <TextField
                  inputClassName="upload-document__dashboard-file-input  font_size__normal"
                  fullWidth={false}
                  value={doc.name}
                  onChange={this.handleInputFile.bind(this)}
                  disabled={true}
                  leftIcon={
                    <FontIcon className="upload-document__file-icon">
                      description
                    </FontIcon>
                  }
                />
              </a>
            </div>
          );
        });
      } else {
        return (
          <div className="upload-document__file-dashboard-file-emptylist">
            There are currently no documents for this trade-transaction.
          </div>
        );
      }
    }
  }

  fileUploadButton() {
    const {
      uploadedDocuments,
      transactionApplicationId,
      spinnerUpload,
      disable,
      transactionSpinnerUpload,
    } = this.props;
    if (uploadedDocuments === undefined) {
      return (
        <div>
          <RenderSpinner spinner={spinnerUpload} />
          <FileUpload
            disabled={spinnerUpload}
            accept="*/*"
            className="upload-document__multi-file"
            id="multiFileUpload"
            label="UPLOAD DOCUMENT"
            name="mutlipart-file-upload"
            onLoad={this.handleOnLoad}
            onLoadStart={this.handleSetFile}
            ref={this.setUpload}
            iconBefore
            secondary
            flat
          />
        </div>
      );
    } else {
      return (
        <div>
          <RenderSpinner
            spinner={transactionSpinnerUpload}
            className="dashboard-btn-upload-spinner"
          />
          <FileUpload
            disabled={disable || transactionSpinnerUpload}
            accept="*/*"
            className="upload-document__multi-dashboard-file"
            id={transactionApplicationId}
            label="UPLOAD DOCUMENT"
            name="mutlipart-file-upload"
            onLoad={this.handleOnLoad}
            onLoadStart={this.handleSetFile}
            ref={this.setUpload}
            iconBefore
            secondary
            flat
          />
        </div>
      );
    }
  }

  fileUploadErrorMessage() {
    const {
      uploadedDocuments,
      message,
      transactionSpinnerErrorMessage,
    } = this.props;
    if (uploadedDocuments) {
      return (
        <span className="upload-dashboard-document__message">
          {transactionSpinnerErrorMessage}
        </span>
      );
    } else {
      return (
        <span className="upload-document__message">
          {message}
        </span>
      );
    }
  }

  render() {
    return (
      <div className="upload-document">
        <div className="upload-document__file-list">
          {this.createUploadUI()}
        </div>
        {this.fileUploadButton()}
        {this.fileUploadErrorMessage()}
      </div>
    );
  }
}

UploadDocument.propTypes = {
  dispatch: PropTypes.func,
  documents: PropTypes.arrayOf(PropTypes.object),
  message: PropTypes.string,
  uploadedDocuments: PropTypes.arrayOf(PropTypes.object),
  transactionApplicationId: PropTypes.number,
  applicationId: PropTypes.number,
  fileUploadObject: PropTypes.object,
  spinnerUpload: PropTypes.bool,
  disable: PropTypes.bool,
  tradeTransactions: PropTypes.array,
  transactionSpinnerUpload: PropTypes.bool,
  transactionSpinnerErrorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

function mapState(state) {
  return {
    documents: state.uploadDocument.document,
    fileUploadObject: state.uploadDocument.fileUploadObject,
    applicationId: state.uploadDocument.applicationId,
    file: PropTypes.object,
    message: state.message.message,
    spinnerUpload: state.uploadDocument.spinnerUpload,
  };
}

export default connect(mapState)(UploadDocument);
