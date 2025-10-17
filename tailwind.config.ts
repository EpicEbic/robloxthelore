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
        wiki: {
          DEFAULT: 'hsl(var(--wiki))',
          foreground: 'hsl(var(--wiki-foreground))',
          neutral: 'hsl(var(--wiki-neutral))',
          good: 'hsl(var(--wiki-good))',
          evil: 'hsl(var(--wiki-evil))',
          location: 'hsl(var(--wiki-location))',
          power: 'hsl(var(--wiki-power))',
          equipment: 'hsl(var(--wiki-equipment))',
          faction: 'hsl(var(--wiki-faction))'
        }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'card-fade-in': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'image-fade-in': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        'slide-in': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'stat-fill': {
          '0%': { 
            width: '0%',
            opacity: '0'
          },
          '100%': { 
            width: '100%',
            opacity: '1'
          }
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.5)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(var(--primary-rgb), 0.8)',
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          }
        },
        'rotate-in': {
          '0%': {
            opacity: '0',
            transform: 'rotate(-10deg) scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'rotate(0deg) scale(1)',
          }
        },
        'slide-in-3d': {
          '0%': {
            opacity: '0',
            transform: 'perspective(1000px) rotateX(-15deg) translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'perspective(1000px) rotateX(0deg) translateY(0)',
          }
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 1.2s ease-out',
        'fade-up': 'fade-up 0.6s ease-out',
        'card-fade-in': 'card-fade-in 0.6s ease-out forwards',
        'image-fade-in': 'image-fade-in 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
        'stat-fill': 'stat-fill 0.8s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'rotate-in': 'rotate-in 0.6s ease-out',
        'slide-in-3d': 'slide-in-3d 0.6s ease-out'
			},
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            '[class~="lead"]': {
              color: 'var(--tw-prose-lead)',
            },
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            h1: {
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              textDecoration: 'none',
            },
            h2: {
              fontFamily: 'var(--font-serif)',
              fontWeight: '600',
              textDecoration: 'none',
            },
            h3: {
              fontFamily: 'var(--font-serif)',
              fontWeight: '600',
              textDecoration: 'none',
            },
            h4: {
              fontFamily: 'var(--font-serif)',
              fontWeight: '600',
              textDecoration: 'none',
            },
          }
        }
      }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
