import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {NuqsAdapter} from 'nuqs/adapters/next/app';
import {Toaster} from '@/components/ui/sonner';

import '@liveblocks/react-ui/styles.css';
import '@liveblocks/react-tiptap/styles.css';
import './globals.css';

import {ConvexClientProvider} from '@/components/convex-client-provider';

const inter = Inter({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'G Docs',
	description: 'A google docs clone',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<NuqsAdapter>
					<ConvexClientProvider>
						<Toaster />
						{children}
					</ConvexClientProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
