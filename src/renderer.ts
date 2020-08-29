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

let $ = require('jquery');

console.log('👋 This message is being logged by "renderer.js", included via webpack');
// new Canvas({
//     container: K8sCanvasID,
//     width: window.innerWidth,
//     height: window.innerHeight,
// });


$('aside a.setting-item').on('click', function () {
    let id = $(this).attr('href');
    $('.settings-expand-bar .item').css('z-index', '');
    $('.settings-bar a.setting-item').removeClass('highlight');
    $(this).addClass('highlight');
    $(id).css('z-index', '999');
});