import { render } from 'solid-js/web';
import '@vscode/codicons/dist/codicon.css';
import App from './App';
import { installTextInputShortcutGuard } from './inputShortcuts';
import './styles.css';
const removeInputShortcutGuard = installTextInputShortcutGuard(document);
const dispose = render(() => <App />, document.getElementById('root')!);
window.addEventListener('unload', () => {
	removeInputShortcutGuard();
	dispose();
}, { once: true });
