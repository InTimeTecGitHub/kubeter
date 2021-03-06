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

import { Canvas } from './shapes/k8s/Canvas';

import { ExpandBar } from './ui/expand-bar';
import { Tab } from './ui/tab';

(async () => {
    console.log('👋 This message is being logged by "renderer.js", included via webpack');
    await new ExpandBar({
        content: 'main_window/assets/html/editor.html',
        button: 'main_window/assets/html/editor-button.html'
    }).render();

    await new ExpandBar({
        content: 'main_window/assets/html/kube-items.html',
        button: 'main_window/assets/html/kube-items-button.html'
    }).select().render();

    new Canvas({
        container: new Tab().active().Id,
        width: window.innerWidth,
        height: window.innerHeight,
    });

    document.getElementById('newTab').addEventListener('click', e => {
        e.preventDefault();

        new Canvas({
            container: new Tab().active().Id,
            width: window.innerWidth,
            height: window.innerHeight,
        });
    });

})();

