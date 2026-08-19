'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Navbar from '@/components/navbar';
import PageTitle from '@/components/pageTitle';
import Newsletter from '@/components/newsletter';
import { Toaster } from '@/components/ui/toaster';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider
			afterSignOutUrl={'/'}
			afterSignInUrl={'/'}
			appearance={{
				baseTheme: dark,
				variables: {
					colorPrimary: '#cc1616', // redBrand
					colorBackground: '#678cc1', // cardColor
					colorInputBackground: '#5070a0', // cardColor-dark
					colorInputText: '#ffffff',
					colorText: '#ffffff',
					colorTextSecondary: '#e5eef7',
					colorDanger: '#e34040', // redBrand-light
					borderRadius: '1rem',
				},
				elements: {
					card: 'border-2 border-brand shadow-lg',
					headerTitle: 'text-white font-extrabold',
					headerSubtitle: 'text-white/70',
					formButtonPrimary: 'bg-redBrand hover:bg-redBrand-light transition-colors',
					footerActionLink: 'text-brand hover:text-brand-light',
					formFieldLabel: 'text-white',
					formFieldInput: 'border-2 border-brand focus:ring-brand-light',
					socialButtonsBlockButton: 'border-2 border-brand text-white hover:bg-cardColor-light',
					dividerLine: 'bg-brand/40',
					dividerText: 'text-white/60',
					userButtonPopoverCard: 'border-2 border-brand',
				},
			}}
		>
			<Navbar />
			<PageTitle />
			{children}
			<Newsletter />
			<Toaster />
		</ClerkProvider>
	);
}
