import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import type { SolidDemoHostMessage, SolidDemoWebviewMessage } from '../../src/types/solidWebviewMessages';
import { getVsCodeApi } from '../shared/vscodeApi';

interface DemoState {
	count: number;
}

const vscode = getVsCodeApi<DemoState>();

export function App() {
	const restoredState = vscode.getState();
	const [count, setCount] = createSignal(restoredState?.count ?? 0);
	const [hostDescription, setHostDescription] = createSignal('正在等待扩展宿主…');
	const [roundTrip, setRoundTrip] = createSignal('尚未测试');

	createEffect(() => {
		vscode.setState({ count: count() });
	});

	onMount(() => {
		const handleMessage = (event: MessageEvent<SolidDemoHostMessage>) => {
			const message = event.data;
			if (message.type === 'hostReady') {
				setHostDescription(`插件 ${message.payload.extensionVersion} · ${message.payload.language}`);
				return;
			}

			if (message.type === 'pong') {
				setRoundTrip(`通信成功，宿主于 ${message.payload.receivedAt} 响应`);
			}
		};

		window.addEventListener('message', handleMessage);
		onCleanup(() => window.removeEventListener('message', handleMessage));

		const readyMessage: SolidDemoWebviewMessage = { type: 'ready' };
		vscode.postMessage(readyMessage);
	});

	const pingHost = () => {
		setRoundTrip('等待宿主响应…');
		const message: SolidDemoWebviewMessage = {
			type: 'ping',
			payload: {
				requestId: `${Date.now()}-${count()}`,
				count: count(),
			},
		};
		vscode.postMessage(message);
	};

	return (
		<main class="page-shell">
			<section class="card" aria-labelledby="demo-title">
				<p class="eyebrow">SOLID + TYPESCRIPT + VITE</p>
				<h1 id="demo-title">Webview 基础流程已连接</h1>
				<p class="description">
					这个页面用于验证构建、VS Code 主题变量、状态恢复以及双向消息通信。
				</p>

				<dl class="status-grid">
					<div>
						<dt>扩展宿主</dt>
						<dd>{hostDescription()}</dd>
					</div>
					<div>
						<dt>消息往返</dt>
						<dd>{roundTrip()}</dd>
					</div>
				</dl>

				<div class="counter" aria-live="polite">
					<span>可恢复计数</span>
					<strong>{count()}</strong>
				</div>

				<div class="actions">
					<button type="button" onClick={() => setCount((value) => value + 1)}>
						增加计数
					</button>
					<button type="button" class="secondary" onClick={pingHost}>
						测试宿主通信
					</button>
				</div>
			</section>
		</main>
	);
}
