import { FC, useState } from 'react';
import { Signin, Signup } from './components';
import { SigninFormData, SignupFormData } from './App.types';
import './App.css';

export const App: FC = () => {
	const [isSignin, setIsSignin] = useState(true);

	const handleSigninSubmit = (formData: SigninFormData) => {
		console.log('Signin form submitted:', formData);
	};

	const handleSignupSubmit = (formData: SignupFormData) => {
		console.log('Signup form submitted:', formData);
	};

	return (
		<div className="app">
			{isSignin ? (
				<>
					<h2>Вход</h2>
					<Signin onSubmit={handleSigninSubmit} />
					<p>
						Нет аккаунта?{' '}
						<span className="switch-link" onClick={() => setIsSignin(false)}>
							Зарегистрироваться
						</span>
					</p>
				</>
			) : (
				<>
					<h2>Регистрация</h2>
					<Signup onSubmit={handleSignupSubmit} />
					<p>
						Уже есть аккаунт?{' '}
						<span className="switch-link" onClick={() => setIsSignin(true)}>
							Войти
						</span>
					</p>
				</>
			)}
		</div>
	);
};
