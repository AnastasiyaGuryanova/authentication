export interface InputProps {
	type?: string;
	placeholder?: string;
	label?: string;
	description?: string;
	error?: string;
	variant?: 'filled' | 'unstyled';
	radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	withAsterisk?: boolean;
	disabled?: boolean;
	icon?: React.ReactNode;
	name?: string;
	value?: string | number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	[key: string]: any;
}
