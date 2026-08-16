import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Info {
	event: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	pronouns?: string;
	accessSource?: string;
	reasonForAttending?: string;
	school?: string;
	grade?: string;
}

interface FormProps {
	event: string;
}

const Form = ({ event }: FormProps) => {
	const [selectedPronoun, setSelectedPronoun] = useState('');
	const [info, setInfo] = useState<Info>({ event });
	const [message, setMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const { user } = useUser();

	const changeInfo = (key: keyof Info, value: string) => {
		setInfo((prev) => ({ ...prev, [key]: value }));
	};

	async function submitForm(e: any) {
		e.preventDefault();
		setLoading(true);
		setMessage(null);

		try {
			const finalPayload = {
				...info,
				email: user?.primaryEmailAddress?.emailAddress ?? '',
			};

			const res = await fetch('/api/eventSignup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(finalPayload),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error || 'Something went wrong');

			setMessage('Signup Successful!');
			setInfo({ event });
		} catch (err: any) {
			setMessage(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			onSubmit={submitForm}
			className="mx-auto max-w-4xl bg-cardColor/40 backdrop-blur-md border border-brand/30 rounded-2xl p-8 shadow-lg space-y-6 text-white"
		>
			<h2 className="text-2xl font-semibold text-center mb-2">Event Signup</h2>
			<p className="text-sm text-center text-brand-dark mb-6">
				Fill out the form below to reserve your spot for <span className="font-medium text-brand">{event}</span>.
			</p>

			{/* Row 1 */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<label className="block mb-1 text-sm font-medium">First Name</label>
					<input
						type="text"
						className="w-full rounded-lg border-2 border-brand bg-cardColor text-white px-3 py-2 placeholder-brand focus:outline-none focus:ring-2 focus:ring-brand-light transition-all"
						onChange={(e) => changeInfo('firstName', e.target.value)}
                        defaultValue={user?.firstName || ''}

					/>
				</div>
				<div>
					<label className="block mb-1 text-sm font-medium">Last Name</label>
					<input
						type="text"
						className="w-full rounded-lg border-2 border-brand bg-cardColor text-white px-3 py-2 placeholder-brand focus:outline-none focus:ring-2 focus:ring-brand-light transition-all"
						onChange={(e) => changeInfo('lastName', e.target.value)}
                        defaultValue={user?.lastName || ''}
					/>
				</div>
				<div>
					<label className="block mb-1 text-sm font-medium">Email</label>
					<input
						type="email"
						className="w-full rounded-lg border-2 border-brand bg-cardColor text-white px-3 py-2 placeholder-brand focus:outline-none focus:ring-2 focus:ring-brand-light transition-all"
                        defaultValue={user?.primaryEmailAddress?.emailAddress || ''}
                        />
				</div>
			</div>

			{/* Pronouns */}
			<div>
				<label className="block mb-1 text-sm font-medium">Pronouns</label>
				<div className="flex gap-2 items-center">
					<select
						className="flex-1 rounded-lg border-2 border-brand bg-cardColor px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-light transition-all"
						value={info.pronouns || 'default'}
						onChange={(e) => {
							setSelectedPronoun(e.target.value);
							changeInfo('pronouns', e.target.value);
						}}
					>
						<option value="default" disabled className='text-brand'>
							Select your pronouns
						</option>
						{[
							'She/Her',
							'He/Him',
							'They/Them',
							'She/They',
							'He/They',
							'They/She',
							'They/He',
							'Prefer not to answer',
							'Other',
						].map((pronoun) => (
							<option key={pronoun} value={pronoun}>
								{pronoun}
							</option>
						))}
					</select>

					<AnimatePresence>
						{selectedPronoun === 'Other' && (
							<motion.input
								initial={{ opacity: 0, width: 0 }}
								animate={{ opacity: 1, width: '10rem' }}
								exit={{ opacity: 0, width: 0 }}
								transition={{ duration: 0.3 }}
								type="text"
								placeholder="Custom..."
								className="rounded-lg border-2 border-brand bg-cardColor px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-light placeholder-gray-300/60"
								onChange={(e) => changeInfo('pronouns', e.target.value)}
							/>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* Textareas */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block mb-1 text-sm font-medium">How did you hear about us?</label>
					<textarea
						className="w-full h-28 rounded-lg border-2 border-brand bg-cardColor px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-brand-light placeholder-gray-300/60 transition-all"
						placeholder="Type here..."
						onChange={(e) => changeInfo('accessSource', e.target.value)}
					/>
				</div>
				<div>
					<label className="block mb-1 text-sm font-medium">Why did you decide to attend?</label>
					<textarea
						className="w-full h-28 rounded-lg border-2 border-brand bg-cardColor px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-brand-light placeholder-gray-300/60 transition-all"
						placeholder="Type here..."
						onChange={(e) => changeInfo('reasonForAttending', e.target.value)}
					/>
				</div>
			</div>

			{/* Row 3 */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="md:col-span-3">
					<label className="block mb-1 text-sm font-medium">School</label>
					<input
						type="text"
						className="w-full rounded-lg border-2 border-brand bg-cardColor px-3 py-2 placeholder-gray-300/60 focus:outline-none focus:ring-2 focus:ring-brand-light transition-all"
						placeholder="Your school name"
						onChange={(e) => changeInfo('school', e.target.value)}
					/>
				</div>
				<div>
					<label className="block mb-1 text-sm font-medium">Grade</label>
					<input
						type="number"
						className="w-full rounded-lg border-2 border-brand bg-cardColor px-3 py-2 placeholder-gray-300/60 focus:outline-none focus:ring-2 focus:ring-brand-light transition-all"
						placeholder="9–12"
						onChange={(e) => changeInfo('grade', e.target.value)}
					/>
				</div>
			</div>

			{/* Submit */}
			<div className="flex justify-center pt-4">
				<button
					type="submit"
					disabled={loading}
					className="w-full md:w-1/2 bg-redBrand hover:bg-redBrand-light transition-all rounded-lg py-3 font-semibold text-white disabled:opacity-70 disabled:cursor-not-allowed"
				>
					{loading ? 'Submitting...' : 'Submit'}
				</button>
			</div>

			{/* Message */}
			<AnimatePresence>
				{message && (
					<motion.p
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -5 }}
						className={`text-center text-sm font-medium ${
							message.startsWith('Signup Successful') ? 'text-green-400' : 'text-red-400'
						}`}
					>
						{message}
					</motion.p>
				)}
			</AnimatePresence>
		</form>
	);
};

export default Form;
