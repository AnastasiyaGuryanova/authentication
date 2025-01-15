export interface SigninProps {
	onSubmit: (formData: { email: string; password: string }) => void;
}
