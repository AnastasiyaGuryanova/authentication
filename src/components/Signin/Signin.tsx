import { FC, ChangeEvent, FormEvent, useState } from 'react';
import * as yup from 'yup';
import { IconAt } from '@tabler/icons-react';
import { Input } from '../Input/Input';
import { SigninProps } from './Signin.types';

const initialSigninState = {
	email: '',
	password: '',
};

const signinSchema = yup.object().shape({
	email: yup.string().email('Введите корректный email.').required('Email обязателен.'),
	password: yup
		.string()
		.min(6, 'Пароль должен быть не менее 6 символов.')
		.required('Пароль обязателен.'),
});

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

	const validateForm = async () => {
		try {
			await signinSchema.validate(inputs, { abortEarly: false });
			return true;
		} catch (validationErrors) {
			const newErrors = (validationErrors as yup.ValidationError).inner.reduce(
				(acc, err) => ({
					...acc,
					[err.path || '']: err.message,
				}),
				{}
			);
			setErrors(newErrors as typeof initialSigninState);
			return false;
		}
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (await validateForm()) {
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
