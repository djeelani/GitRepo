import uploadDocuments from '../../src/reducers/uploadDocument';

describe('uploadDocument reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      document: [],
      applicationId: 0,
      fileUploadObject: {},
      spinnerUpload: false,
    };
  });

  it('handles default state', () => {
    expect(uploadDocuments(undefined, {})).toEqual(initialState);
  });

  it('handles FILE_UPLOAD__SUCCESS action', () => {
    const upload = { name: 'abc.txt', url: '/path' };
    const action = {
      type: 'FILE_UPLOAD__SUCCESS',
      upload,
    };
    const expected = {
      applicationId: 0,
      document: [upload],
      fileUploadObject: upload,
      spinnerUpload: false,
    };
    expect(uploadDocuments(initialState, action)).toEqual(expected);
  });

  it('handles FILE_REMOVE__SUCCESS action', () => {
    const upload = { name: 'abc.txt', url: '/path' };
    var state = {
      document: [upload],
      fileUploadObject: upload,
      spinnerUpload: false,
    };
    const fileName = 'abc.txt';
    const action = {
      type: 'FILE_REMOVE__SUCCESS',
      fileName,
    };
    const expected = {
      document: [],
      fileUploadObject: {},
      spinnerUpload: false,
    };
    expect(uploadDocuments(state, action)).toEqual(expected);
  });

  it('handles FILE_UPLOAD_DASHBOARD__APPID action', () => {
    const upload = { applicationId: 1, name: 'file.txt', url: '/path' };
    const action = {
      type: 'FILE_UPLOAD_DASHBOARD__APPID',
      upload,
    };
    const expected = {
      applicationId: 1,
      document: [],
      fileUploadObject: upload,
      spinnerUpload: false,
    };
    expect(uploadDocuments(initialState, action)).toEqual(expected);
  });
});
