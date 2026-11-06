import Link from 'next/link';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import type { ComponentProps } from 'react';

function MdxLink({ href, children, ...props }: ComponentProps<'a'>) {
	if (href?.startsWith('http')) {
		return (
			<a href={href} target="_blank" rel="noreferrer" {...props}>
				{children}
			</a>
		);
	}

	return (
		<Link href={href ?? '#'} {...props}>
			{children}
		</Link>
	);
}

function MdxImage({ alt = '', ...props }: ComponentProps<'img'>) {
	// eslint-disable-next-line @next/next/no-img-element
	return <img alt={alt} loading="lazy" {...props} />;
}

const components = {
	a: MdxLink,
	img: MdxImage,
};

const options: NonNullable<MDXRemoteProps['options']> = {
	mdxOptions: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: 'github-dark',
					keepBackground: false,
				},
			],
		],
	},
};

export function MdxContent({ source }: { source: string }) {
	return <MDXRemote source={source} components={components} options={options} />;
}
