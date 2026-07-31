/* eslint-disable @typescript-eslint/naming-convention -- Solid components and CSS keys intentionally use framework-native names. */
import type { JSX } from 'solid-js';
import { Show, onMount } from 'solid-js';
import { handleDialogKey } from '../uiUtils';
import { Icon } from './Icon';

export interface ModalShellProps {
	ariaLabel: string;
	title: JSX.Element;
	eyebrow?: string;
	subtitle?: JSX.Element;
	class?: string;
	dialogRef?(element: HTMLElement): void;
	initialFocus?: string;
	footer?: JSX.Element;
	onCancel(): void;
	children: JSX.Element;
}

export function ModalShell(props: ModalShellProps) {
	let dialogElement!: HTMLElement;
	onMount(() => queueMicrotask(() => {
		const preferred = props.initialFocus ? dialogElement.querySelector<HTMLElement>(props.initialFocus) : undefined;
		const fallback = dialogElement.querySelector<HTMLElement>('input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])');
		(preferred ?? fallback)?.focus();
	}));

	return <div class="modal-backdrop" onMouseDown={(event) => {
		if (event.target === event.currentTarget) {
			props.onCancel();
		}
	}} onKeyDown={(event) => handleDialogKey(event, props.onCancel)}>
		<section ref={(element) => {dialogElement = element; props.dialogRef?.(element);}} class={`modal ${props.class ?? ''}`} role="dialog" aria-modal="true" aria-label={props.ariaLabel}>
			<header class="modal-heading">
				<div>
					<Show when={props.eyebrow}>{(eyebrow) => <span class="dialog-eyebrow">{eyebrow()}</span>}</Show>
					<strong>{props.title}</strong>
					<Show when={props.subtitle}>{(subtitle) => <small>{subtitle()}</small>}</Show>
				</div>
				<button type="button" class="icon-button" aria-label="关闭" onClick={props.onCancel}><Icon name="close" /></button>
			</header>
			<div class="modal-body">{props.children}</div>
			<Show when={props.footer}><footer>{props.footer}</footer></Show>
		</section>
	</div>;
}
export interface ModalFormShellProps extends Omit<ModalShellProps, 'children'> {
	children: JSX.Element;
	onSubmit(event: SubmitEvent): void;
}

export function ModalFormShell(props: ModalFormShellProps) {
	let dialogElement!: HTMLFormElement;
	onMount(() => queueMicrotask(() => {
		const preferred = props.initialFocus ? dialogElement.querySelector<HTMLElement>(props.initialFocus) : undefined;
		const fallback = dialogElement.querySelector<HTMLElement>('input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])');
		(preferred ?? fallback)?.focus();
	}));

	return <div class="modal-backdrop" onMouseDown={(event) => {
		if (event.target === event.currentTarget) {
			props.onCancel();
		}
	}} onKeyDown={(event) => handleDialogKey(event, props.onCancel)}>
		<form ref={(element) => {dialogElement = element; props.dialogRef?.(element);}} class={`modal ${props.class ?? ''}`} role="dialog" aria-modal="true" aria-label={props.ariaLabel} onSubmit={props.onSubmit}>
			<header class="modal-heading">
				<div>
					<Show when={props.eyebrow}>{(eyebrow) => <span class="dialog-eyebrow">{eyebrow()}</span>}</Show>
					<strong>{props.title}</strong>
					<Show when={props.subtitle}>{(subtitle) => <small>{subtitle()}</small>}</Show>
				</div>
				<button type="button" class="icon-button" aria-label="关闭" onClick={props.onCancel}><Icon name="close" /></button>
			</header>
			<div class="modal-body">{props.children}</div>
			<Show when={props.footer}><footer>{props.footer}</footer></Show>
		</form>
	</div>;
}