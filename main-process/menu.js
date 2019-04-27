const Store = require('electron-store');
const store = new Store();
let _let_language = store.get('languageStore');
console.log(_let_language);
let getLocalMenu = 'zh-menu.js';
switch (_let_language) {
    case "ru":
        getLocalMenu = "ru-menu.js"
        break;
    case "us":
        getLocalMenu = "us-menu.js"
        break;
    case "cn":
        getLocalMenu = "zh-menu.js"
        break;
}

require('../menu/' + getLocalMenu)
