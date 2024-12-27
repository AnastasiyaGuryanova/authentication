import { FC, ChangeEvent, FormEvent, useState } from 'react';
import { IconAt } from '@tabler/icons-react';
import { Input } from '../Input/Input';
import { SigninProps } from './Signin.types';

const initialSigninState = {
	email: '',
	password: '',
};

export const Signin: FC<SigninProps> = ({ onSubmit }) => {
	const [inputs, setInputs] = useState(initialSigninState);
	const [errors, setErrors] = useState(initialSigninState);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputs({
			...inputs,
			[event.target.name]: event.target.value,
		});
		setErrors({
			...errors,
			[event.target.name]: '',
		});
	};

	const validateForm = () => {
		const newErrors = {
			email: /\S+@\S+\.\S+/.test(inputs.email) ? '' : 'Введите корректный email.',
			password:
				inputs.password.length >= 6
					? ''
					: 'Пароль должен быть не менее 6 символов.',
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => error === '');
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (validateForm()) {
			onSubmit(inputs);
			setInputs(initialSigninState);
			setErrors(initialSigninState);
		}
	};

	return (
		<form onSubmit={handleSubmit} noValidate>
			<Input
				type="email"
				name="email"
				label="Ваш email"
				placeholder="Введите email"
				required
				withAsterisk
				radius="lg"
				size="md"
				icon={<IconAt size={24} />}
				value={inputs.email}
				onChange={handleChange}
				error={errors.email}
			/>
			<Input
				type="password"
				name="password"
				label="Пароль"
				placeholder="Введите пароль"
				required
				withAsterisk
				radius="lg"
				size="md"
				value={inputs.password}
				onChange={handleChange}
				error={errors.password}
			/>

			<button type="submit">Войти</button>
		</form>
	);
};
