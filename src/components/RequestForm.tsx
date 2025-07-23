import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './RequestForm.module.css';

type Inputs = {
	projectType: string;
	budget: string;
	deadline: string;
	name: string;
	contact: string;
	details: string;
};

const RequestForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = data => {
		console.log(data);
		// Here you would typically send the data to a server
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h2>Оставить заявку</h2>

			<div className={styles.formGroup}>
				<label htmlFor="projectType">Тип проекта</label>
				<select id="projectType" {...register('projectType', { required: true })}>
					<option value="app">Приложение</option>
					<option value="website">Сайт</option>
					<option value="ux-audit">UX Аудит</option>
					<option value="art">Арт-проект</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="budget">Минимальный бюджет (предоплата 50%)</label>
				<input id="budget" type="text" {...register('budget', { required: 'Это поле обязательно' })} />
				{errors.budget && <p className={styles.error}>{errors.budget.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="deadline">Желаемый срок выполнения</label>
				<input id="deadline" type="date" {...register('deadline', { required: 'Это поле обязательно' })} />
				{errors.deadline && <p className={styles.error}>{errors.deadline.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="name">Имя для связи</label>
				<input id="name" type="text" {...register('name', { required: 'Это поле обязательно' })} />
				{errors.name && <p className={styles.error}>{errors.name.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="contact">Email/телефон для связи</label>
				<input id="contact" type="text" {...register('contact', { required: 'Это поле обязательно' })} />
				{errors.contact && <p className={styles.error}>{errors.contact.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="details">Дополнительные детали</label>
				<textarea id="details" {...register('details')} rows={4}></textarea>
			</div>

			<button type="submit" className={styles.submitButton}>
				Отправить
			</button>
		</form>
	);
};

export default RequestForm; 