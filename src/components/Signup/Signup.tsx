import { useState, FC, ChangeEvent, FormEvent } from 'react';
import * as yup from 'yup';
import { IconAt } from '@tabler/icons-react';
import { Input } from '../Input/Input';
import { SignupProps } from './Signup.types';

const initialSignupState = {
	name: '',
	nickname: '',
	email: '',
	gender: '',
	password: '',
	confirmPassword: '',
};

const signupSchema = yup.object().shape({
	name: yup.string().required('Введите имя.'),
	nickname: yup.string().required('Введите ник.'),
	email: yup.string().email('Введите корректный email.').required('Email обязателен.'),
	gender: yup.string().required('Выберите пол.'),
	password: yup
		.string()
		.min(6, 'Пароль должен быть не менее 6 символов.')
		.required('Введите пароль.'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Пароли не совпадают.')
		.required('Подтвердите пароль.'),
});

export const Signup: FC<SignupProps> = ({ onSubmit }) => {
	const [inputs, setInputs] = useState(initialSignupState);

	const [errors, setErrors] = useState(initialSignupState);

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
			await signupSchema.validate(inputs, { abortEarly: false });
			return true;
		} catch (validationErrors) {
			const newErrors = (validationErrors as yup.ValidationError).inner.reduce(
				(acc, err) => ({
					...acc,
					[err.path || '']: err.message,
				}),
				{}
			);
			setErrors(newErrors as typeof initialSignupState);
			return false;
		}
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (await validateForm()) {
			onSubmit(inputs);
			setInputs(initialSignupState);
			setErrors(initialSignupState);
		}
	};

	return (
		<form onSubmit={handleSubmit} noValidate>
			<Input
				type="text"
				name="name"
				label="Имя"
				placeholder="Введите ваше имя"
				required
				withAsterisk
				radius="lg"
				size="md"
				onChange={handleChange}
				value={inputs.name}
				error={errors.name}
			/>

			<Input
				type="text"
				name="nickname"
				label="Ник"
				placeholder="Введите ваш ник"
				required
				withAsterisk
				radius="lg"
				size="md"
				onChange={handleChange}
				value={inputs.nickname}
				error={errors.nickname}
			/>
			<Input
				type="email"
				name="email"
				label="Ваш email"
				placeholder="Введите email"
				required
				radius="lg"
				size="md"
				icon={<IconAt size={24} />}
				onChange={handleChange}
				value={inputs.email}
				error={errors.email}
			/>

			<div className="input-wrapper">
				<label className="input-label">
					Пол {<span className="asterisk">*</span>}
				</label>
				<div>
					<label>
						<input
							type="radio"
							name="gender"
							value="male"
							onChange={handleChange}
							checked={inputs.gender === 'male'}
						/>
						Мужской
					</label>
					<label style={{ marginLeft: '1rem' }}>
						<input
							type="radio"
							name="gender"
							value="female"
							onChange={handleChange}
							checked={inputs.gender === 'female'}
						/>
						Женский
					</label>
				</div>
				{errors.gender && <div className="form-error">{errors.gender}</div>}
			</div>

			<Input
				type="password"
				name="password"
				label="Пароль"
				placeholder="Введите пароль"
				required
				withAsterisk
				radius="lg"
				size="md"
				onChange={handleChange}
				value={inputs.password}
				error={errors.password}
			/>
			<Input
				type="password"
				name="confirmPassword"
				label="Повторите пароль"
				placeholder="Повторите пароль"
				required
				withAsterisk
				radius="lg"
				size="md"
				onChange={handleChange}
				value={inputs.confirmPassword}
				error={errors.confirmPassword}
			/>
			<button type="submit">Зарегистрироваться</button>
		</form>
	);
};
