import { useState, FC, ChangeEvent, FormEvent } from 'react';
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

	const validateForm = () => {
		const newErrors = {
			name: inputs.name ? '' : 'Введите имя.',
			nickname: inputs.nickname ? '' : 'Введите ник.',
			email: /\S+@\S+\.\S+/.test(inputs.email) ? '' : 'Введите корректный email.',
			gender: inputs.gender ? '' : 'Выберите пол.',
			password: inputs.password ? '' : 'Введите пароль.',
			confirmPassword:
				inputs.password === inputs.confirmPassword ? '' : 'Пароли не совпадают.',
		};
		setErrors(newErrors);

		return Object.values(newErrors).every((error) => error === '');
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (validateForm()) {
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
