const theme = require('tailwindcss/defaultTheme');
const typography = require('@tailwindcss/typography');

//const colorBrand = 'var(--color-pretty)';

// Utils
const round = (num) => num.toFixed(7).replace(/(\.[0-9]+?)0+$/, '$1').replace(/\.0$/, '');
const rem = (px) => `${round(px / 16)}rem`;
const em = (px, base) => `${round(px / base)}em`;
const px = (px) => `${px}px`;

module.exports = {
	dark: 'class',
	important: true, // See https://tailwindcss.com/docs/configuration#important
	experimental: {
		// See https://github.com/tailwindlabs/tailwindcss/pull/2159
		applyComplexClasses: true,
		darkModeVariant: true,
	},
	future: {
		removeDeprecatedGapUtilities: true,
		standardFontWeights: true,
		purgeLayersByDefault: true,
	},
	purge: {
		enabled: process.env.HUGO_ENVIRONMENT === 'production',
		content: [ './hugo_stats.json' ],
		mode: 'all',
		options: {
			//whitelist: [ 'pl-1', 'pl-3' ],
			defaultExtractor: (content) => {
				let els = JSON.parse(content).htmlElements;
				els = els.tags.concat(els.classes, els.ids);
				return els;
			}
		}
	},
	plugins: [ typography ],
	corePlugins: {
		fontStyle: false,
	},
	theme: {
		fontSize: {
			xs: ['0.75rem', { lineHeight: '1rem' }],
			sm: ['0.875rem', { lineHeight: '1.25rem' }],
			base: ['1rem', { lineHeight: '1.5rem' }],
			lg: ['1.125rem', { lineHeight: '1.75rem' }],
			xl: ['1.25rem', { lineHeight: '1.75rem' }],
			'2xl': ['1.5rem', { lineHeight: '2rem' }],
			'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
			'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
			'5xl': ['3rem', { lineHeight: '1' }],
			'6xl': ['4rem', { lineHeight: '1' }],
		},
		extend: {
			zIndex: {
				'-10': '-10',
			},
			screens: {
				'dark': { 'raw': '(prefers-color-scheme: dark)' },
			},
			colors: {
				'solarized': {
					'base03': '#002b36',
					'base02': '#073642',
					'base01': '#586e75',
					'base00': '#657b83',

					'base0': '#839496',
					'base1': '#93a1a1',
					'base2': '#eee8d5',
					'base3': '#fdf6e3',

					'yellow': '#b58900',
					'orange': '#cb4b16',
					'red': '#dc322f',
					'magenta': '#d33682',
					'violet': '#6c71c4',
					'blue': '#268bd2',
					'cyan': '#2aa198',
					'green': '#859900',
				}
			},
		},
		typography: (theme) => ({
			default: {
				css: {
					color: theme('colors.red.500'),

					a: {
						color: theme('colors.red.500'),
						'&:hover': {
							color: theme('colors.red.700'),
						},
					},
				},
			},

			dark: {
				css: {
					color: theme('colors.blue.500'),

					a: {
						color: theme('colors.blue.100'),
						'&:hover': {
							color: theme('colors.blue.700'),
						},
					},
				},
			},
		}),
	},
	variants: {
		borderWidth: ['responsive', 'last', 'hover', 'focus'],
		gradientColorStops: ['dark'],
		backgroundColor: ['dark'],
		textColor: ['hover', 'dark'],
		typography: ['responsive', 'hover', 'dark'],
		transitionProperty: ['responsive', 'hover', 'focus', 'active'],
	},
};
