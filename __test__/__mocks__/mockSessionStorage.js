class SessionStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  removeItem(key) {
    delete this.store[key];
  }

  getItem(key) {
    return this.store[key];
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }
}

global.sessionStorage = new SessionStorageMock();
