import { get, writable } from '@square/svelte-store';
import type { SvelteComponent } from 'svelte';

export interface ModalProps {
	onClose: () => void;
	callback?: (data: unknown) => void;
	node: SvelteComponent;
	maskClosable: boolean;
	keyboardClosable: boolean;
	overlayClass?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	contentProps?: any;
}

export const modalStore = writable<ModalProps[]>([]);

export const renderModal = (props: ModalProps) => {
	const $modalStore = get(modalStore);
	if ($modalStore.find(({ node }) => node === props.node)) return;
	modalStore.update((state) => [...state, props]);
};

export const unRenderModal = (contentNode: SvelteComponent) => {
	const $modalStore = get(modalStore);
	if (!$modalStore.find(({ node }) => node === contentNode)) return;

	modalStore.update((state) => [...state.filter((d) => d.node !== contentNode)]);
};

export default modalStore;
