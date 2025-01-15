import { FC } from 'react';
import { InputProps } from './Input.types';
import './Input.css';

export const Input: FC<InputProps> = ({
	type = 'text',
	placeholder = '',
	label = '',
	description = '',
	error = '',
	variant = 'filled',
	radius = 'sm',
	size = 'sm',
	withAsterisk = false,
	disabled = false,
	icon = null,
	name = '',
	value,
	onChange,
	...props
}) => {
	const inputClassNames = [
		'input',
		`input-variant-${variant}`,
		`input-radius-${radius}`,
		`input-size-${size}`,
		error && 'input-error',
		disabled && 'input-disabled',
		icon && 'input-with-icon',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className="input-wrapper">
			{label && (
				<label className="input-label">
					{label} {withAsterisk && <span className="asterisk">*</span>}
				</label>
			)}

			{description && <div className="input-description">{description}</div>}

			<div className={`input-field-wrapper input-size-${size}`}>
				{icon && <span className="input-icon">{icon}</span>}

				<input
					type={type}
					className={inputClassNames}
					placeholder={placeholder}
					disabled={disabled}
					name={name}
					value={value}
					onChange={onChange}
					{...props}
				/>
			</div>

			{error && <div className="input-error-message">{error}</div>}
		</div>
	);
};
