/* eslint-disable @typescript-eslint/naming-convention -- Solid component names intentionally use framework-native casing. */
export function Icon(props: { name: string; spin?: boolean }) {
	return <span class={`codicon codicon-${props.name}${props.spin ? ' codicon-modifier-spin' : ''}`} aria-hidden="true" />;
}
