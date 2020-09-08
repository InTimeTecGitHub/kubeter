/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './sass/styles.scss';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/jquery/dist/jquery.min.js';

import { Canvas } from './shapes/k8s/Canvas';
import { K8sCanvasID } from './constants';
import { gitFetch, gitPull } from '../src/gitIntegration/gitOperations';

let $ = require('jquery');

console.log('👋 This message is being logged by "renderer.js", included via webpack');
// new Canvas({
//     container: K8sCanvasID,
//     width: window.innerWidth,
//     height: window.innerHeight,
// });
const sidebar = document.querySelector('aside.settings-bar');
const expandbar = document.querySelector('.settings-expand-bar');

const highlighted = (el: Element) => el.querySelector('.highlight');
const active = (el: Element) => el.querySelector('.active');
const remover = (cl: string) => (el: Element) => el.classList.remove(cl);
const adder = (cl: string) => (el: Element) => el.classList.add(cl);
const addHighlight = adder('highlight');
const removeHighlight = remover('highlight');
const addActive = adder('active');
const removeActive = remover('active');

const stylizer = (style: string) => (el: Element) => el.setAttribute('style', style);
const toTop = stylizer('z-index:999');
const unStyle = stylizer('');

const getHref = (node: Element) => node.getAttribute('href');

const navtab = document.querySelector('#tabHeader');
const tabcontent = document.querySelector('#tabContent');

const gitTab = document.querySelector('#four');
const summary= document.getElementById('gitSummary');

sidebar.querySelectorAll('a.setting-item').forEach(node => node.addEventListener('click', e => {
    const href = getHref(node);
    const item = expandbar.querySelector('.item');
    removeHighlight(highlighted(sidebar));
    unStyle(item);
    toTop(document.querySelector(href));
    addHighlight(node);
}));

document.getElementById('newTab').addEventListener('click', e => {
    e.preventDefault();
    newTab();
});


gitTab.querySelectorAll('a.row').forEach(node => node.addEventListener('click', e => {
    summary.innerHTML= "";
    const href = getHref(node);
    switch (href) {
        case "#gitFetch":
            gitFetch().then((fetchSummary)=>{
                summary.innerHTML= fetchSummary;
            });
            break;
        case "#gitCommit":
            //todo: Implement commit
            break;
        case "#gitPull":
            gitPull().then((pullSummary)=>{
                summary.innerHTML= pullSummary;
            });
            break;
        case "#gitPush":
            //todo: Implement Push
            break;
        default:
            break;

    }
}));

navtab.querySelectorAll('div.tab-item').forEach(node => node.addEventListener('click', e => {
    e.preventDefault();
    const href = getHref(node);
    removeActive(active(navtab));
    removeActive(active(tabcontent));
    addActive(node);
    addActive(document.querySelector(href));
}));

navtab.querySelectorAll('div.tab-item > a.close').forEach(node => node.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target !== this) {
        e.stopPropagation();
    }
    // Remove tab code here.
}));

function newTab() {
    let tabId = 'tab' + Math.floor((Math.random() * 100) + 1);
    let tab = document.createElement('div');
    tab.setAttribute('href', '#' + tabId);
    tab.setAttribute('class', 'tab-item');
    tab.innerHTML = 'untitled <a href="" class="close"><i class="fa fa-times"></i></a>';
    let tabContent = document.createElement('div');
    tabContent.setAttribute('id', tabId);
    tabContent.setAttribute('class', 'tab');
    // Binding click event to new tab. Move this code to a function instead of re-writing above code.
    tab.addEventListener('click', e => {
        e.preventDefault();
        const href = getHref(tab);
        removeActive(active(navtab));
        removeActive(active(tabcontent));
        addActive(tab);
        addActive(document.querySelector(href));
    });
    document.getElementById('tabContent').appendChild(tabContent);
    document.getElementById('tabHeader').appendChild(tab);
}