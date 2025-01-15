export interface SignupProps {
	onSubmit: (formData: {
		name: string;
		nickname: string;
		email: string;
		gender: string;
		password: string;
		confirmPassword: string;
	}) => void;
}
