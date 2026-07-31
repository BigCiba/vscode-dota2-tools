/* @refresh reload */
import { render } from 'solid-js/web';
import { App } from './App';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
	throw new Error('Dota 2 Items Game Webview root element was not found.');
}

render(() => <App />, root);
