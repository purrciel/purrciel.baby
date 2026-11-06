import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { AudioProvider } from '@/components/providers/AudioProvider';
import { CommandPaletteProvider } from '@/components/providers/CommandPaletteProvider';
import { SoundProvider } from '@/components/providers/SoundProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllNotes } from '@/lib/content';
import { labProjects } from '@/lib/lab';
import { site } from '@/lib/site';

import './globals.css';

const pixelify = localFont({
	src: [
		{ path: '../assets/fonts/pixelify-sans-400.ttf', weight: '400', style: 'normal' },
		{ path: '../assets/fonts/pixelify-sans-700.ttf', weight: '700', style: 'normal' },
	],
	variable: '--font-pixelify',
	display: 'swap',
});

const pressStart = localFont({
	src: '../assets/fonts/press-start-2p.ttf',
	weight: '400',
	style: 'normal',
	variable: '--font-press',
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: site.title,
		template: `%s — ${site.name}`,
	},
	description: site.description,
	applicationName: site.name,
	authors: [{ name: site.author.name, url: site.author.url }],
	creator: site.author.name,
	publisher: site.author.name,
	keywords: ['purrciel', 'личный сайт', 'заметки', 'пиксельный', 'undertale', 'next.js'],
	alternates: {
		canonical: '/',
		types: {
			'application/rss+xml': '/feed.xml',
		},
	},
	openGraph: {
		type: 'website',
		locale: site.locale,
		url: site.url,
		siteName: site.name,
		title: site.title,
		description: site.description,
		images: [
			{
				url: '/opengraph-image',
				width: 1200,
				height: 630,
				alt: site.name,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: site.title,
		description: site.description,
		images: ['/opengraph-image'],
	},
	icons: {
		icon: [
			{ url: '/favicon.svg', type: 'image/svg+xml' },
			{ url: '/favicon.ico', sizes: 'any' },
		],
	},
	manifest: '/manifest.webmanifest',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
		},
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
	themeColor: '#000000',
	colorScheme: 'dark',
};

const websiteJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: site.name,
	url: site.url,
	description: site.description,
	inLanguage: 'ru',
	author: {
		'@type': 'Person',
		name: site.author.name,
		url: site.author.url,
	},
};

export default async function RootLayout({ children }: { children: ReactNode }) {
	const notes = getAllNotes().map((note) => ({
		slug: note.slug,
		title: note.title,
		description: note.description,
		tags: note.tags,
	}));

	const projects = labProjects.map((project) => ({
		title: project.title,
		description: project.description,
		href: project.href,
		repo: project.repo,
	}));

	return (
		<html
			lang={site.lang}
			className={`${pixelify.variable} ${pressStart.variable}`}
			data-scroll-behavior="smooth"
		>
			<body className="flex min-h-svh flex-col">
				<JsonLd data={websiteJsonLd} />

				<a
					href="#content"
					className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:border-4 focus:border-line focus:bg-paper focus:px-3 focus:py-2 focus:text-sm"
				>
					К содержимому
				</a>

				<AudioProvider src="/audio/theme.mp3">
					<SoundProvider>
						<CommandPaletteProvider notes={notes} projects={projects}>
							<Header />

							<main id="content" className="flex flex-1 flex-col">
								<PageTransition>{children}</PageTransition>
							</main>

							<Footer />
						</CommandPaletteProvider>
					</SoundProvider>
				</AudioProvider>

				<div className="scanlines" aria-hidden="true" />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
