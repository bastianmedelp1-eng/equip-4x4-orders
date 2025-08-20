import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Business theme colors
				navy: {
					DEFAULT: 'hsl(var(--navy))',
					dark: 'hsl(var(--navy-dark))',
					light: 'hsl(var(--navy-light))'
				},
				orange: {
					DEFAULT: 'hsl(var(--orange))',
					light: 'hsl(var(--orange-light))'
				},
				gray: {
					50: 'hsl(var(--gray-50))',
					100: 'hsl(var(--gray-100))',
					200: 'hsl(var(--gray-200))',
					700: 'hsl(var(--gray-700))',
					800: 'hsl(var(--gray-800))',
					900: 'hsl(var(--gray-900))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Google Material Design Colors
				google: {
					blue: '#1a73e8',
					'blue-50': '#e8f0fe',
					'blue-100': '#d2e3fc',
					'blue-600': '#1a73e8',
					'blue-700': '#1967d2',
					red: '#ea4335',
					'red-50': '#fce8e6',
					'red-100': '#f9dedc',
					'red-600': '#ea4335',
					yellow: '#fbbc04',
					'yellow-50': '#fef7e0',
					'yellow-100': '#feefc3',
					'yellow-600': '#fbbc04',
					green: '#34a853',
					'green-50': '#e6f4ea',
					'green-100': '#ceead6',
					'green-600': '#34a853',
					'green-700': '#137333',
					gray: {
						50: '#fafafa',
						100: '#f5f5f5',
						200: '#e0e0e0',
						300: '#bdbdbd',
						400: '#9e9e9e',
						500: '#757575',
						600: '#616161',
						700: '#424242',
						800: '#212121',
						900: '#121212'
					}
				},
				// Minimalist Elegant Colors
				minimal: {
					slate: {
						50: '#f8fafc',
						100: '#f1f5f9',
						200: '#e2e8f0',
						300: '#cbd5e1',
						400: '#94a3b8',
						500: '#64748b',
						600: '#475569',
						700: '#334155',
						800: '#1e293b',
						900: '#0f172a'
					},
					blue: {
						50: '#eff6ff',
						100: '#dbeafe',
						200: '#bfdbfe',
						300: '#93c5fd',
						400: '#60a5fa',
						500: '#3b82f6',
						600: '#2563eb',
						700: '#1d4ed8',
						800: '#1e40af',
						900: '#1e3a8a'
					},
					emerald: {
						50: '#ecfdf5',
						100: '#d1fae5',
						200: '#a7f3d0',
						300: '#6ee7b7',
						400: '#34d399',
						500: '#10b981',
						600: '#059669',
						700: '#047857',
						800: '#065f46',
						900: '#064e3b'
					},
					rose: {
						50: '#fff1f2',
						100: '#ffe4e6',
						200: '#fecdd3',
						300: '#fda4af',
						400: '#fb7185',
						500: '#f43f5e',
						600: '#e11d48',
						700: '#be123c',
						800: '#9f1239',
						900: '#881337'
					},
					amber: {
						50: '#fffbeb',
						100: '#fef3c7',
						200: '#fde68a',
						300: '#fcd34d',
						400: '#fbbf24',
						500: '#f59e0b',
						600: '#d97706',
						700: '#b45309',
						800: '#92400e',
						900: '#78350f'
					}
				}
			},
			fontFamily: {
				'roboto': ['Roboto', 'sans-serif'],
				'google-sans': ['Google Sans', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-subtle': 'var(--gradient-subtle)'
			},
			boxShadow: {
				sm: 'var(--shadow-sm)',
				md: 'var(--shadow-md)',
				lg: 'var(--shadow-lg)',
				xl: 'var(--shadow-xl)'
			},
			transitionProperty: {
				base: 'var(--transition-base)',
				colors: 'var(--transition-colors)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'cloud-drift': {
					'0%': {
						transform: 'translateX(-100%) translateY(0px)',
						opacity: '0.3'
					},
					'25%': {
						opacity: '0.6'
					},
					'50%': {
						opacity: '0.4'
					},
					'75%': {
						opacity: '0.7'
					},
					'100%': {
						transform: 'translateX(100%) translateY(-2px)',
						opacity: '0.2'
					}
				},
				'cloud-drift-reverse': {
					'0%': {
						transform: 'translateX(100%) translateY(-3px)',
						opacity: '0.2'
					},
					'25%': {
						opacity: '0.5'
					},
					'50%': {
						opacity: '0.8'
					},
					'75%': {
						opacity: '0.4'
					},
					'100%': {
						transform: 'translateX(-100%) translateY(1px)',
						opacity: '0.3'
					}
				},
				'aura-breathing': {
					'0%': {
						transform: 'scale(1)',
						opacity: '0.4'
					},
					'50%': {
						transform: 'scale(1.15)',
						opacity: '0.7'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '0.4'
					}
				},
				'aura-pulse': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0.8'
					},
					'25%': {
						transform: 'scale(1.1)',
						opacity: '0.5'
					},
					'50%': {
						transform: 'scale(1.3)',
						opacity: '0.3'
					},
					'75%': {
						transform: 'scale(1.1)',
						opacity: '0.5'
					},
					'100%': {
						transform: 'scale(0.8)',
						opacity: '0.8'
					}
				},
				'aura-drift': {
					'0%': {
						transform: 'rotate(0deg) scale(1)',
						filter: 'blur(8px)'
					},
					'33%': {
						transform: 'rotate(120deg) scale(1.05)',
						filter: 'blur(10px)'
					},
					'66%': {
						transform: 'rotate(240deg) scale(0.95)',
						filter: 'blur(12px)'
					},
					'100%': {
						transform: 'rotate(360deg) scale(1)',
						filter: 'blur(8px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'cloud-slow': 'cloud-drift 8s ease-in-out infinite',
				'cloud-slower': 'cloud-drift 12s ease-in-out infinite',
				'cloud-reverse': 'cloud-drift-reverse 10s ease-in-out infinite',
				'aura-breathe': 'aura-breathing 4s ease-in-out infinite',
				'aura-pulse-slow': 'aura-pulse 6s ease-in-out infinite',
				'aura-drift-slow': 'aura-drift 15s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
