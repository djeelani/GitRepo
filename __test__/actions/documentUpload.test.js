import {
  fileUploadSuccess,
  fileRemoveSuccess,
  dashboardFileUploadApplicationId,
} from '../../src/actions/documentUpload';
import base64_arraybuffer from 'base64-arraybuffer';
import * as types from '../../src/actions/actionTypes';

describe('upload actions', () => {
  const upload = {
    applicationId: 1,
    name: 'abc.txt',
    url: '/path',
    hash: '1a2b3c',
  };
  it('handles the fileUploadSuccess action creator', () => {
    const action = { type: types.FILE_UPLOAD__SUCCESS, upload };
    expect(fileUploadSuccess(upload)).toEqual(action);
  });

  it('handles the fileRemoveSuccess action creator', () => {
    const action = { type: types.FILE_REMOVE__SUCCESS };
    expect(fileRemoveSuccess()).toEqual(action);
  });

  it('handles the dashboardUploadSuccess action creator', () => {
    const action = {
      type: types.FILE_UPLOAD_DASHBOARD__APPID,
      upload,
    };
    expect(dashboardFileUploadApplicationId(upload)).toEqual(action);
  });

  it('handles the base64ArrayBuffer action', () => {
    let arrayBuffer = new Uint16Array([1, 2, 3]).buffer;
    const encodedBase64 = base64_arraybuffer.encode(arrayBuffer);
    expect(base64_arraybuffer.decode(encodedBase64)).toEqual(arrayBuffer);
  });
});
