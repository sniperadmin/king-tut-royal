# UI Design Template Documentation

This document outlines the UI design template used in the Luxury Travel Exclusive application. The design is based on a modern, elegant, and luxurious aesthetic, primarily utilizing Tailwind CSS for styling and Vue 3 components for structure.

## 1. Color Palette

The application uses a sophisticated color palette defined in `tailwind.config.ts` and `src/index.css`.

- **Primary Accent:** Gold (`--primary`, `--accent`): Used for highlights, interactive elements, and key visual components.
- **Backgrounds:** Dark tones (`--background` in dark mode, `--card` in dark mode) and light tones (`--background` in light mode, `--card` in light mode) to create contrast and depth.
- **Text:** White (`--foreground` in dark mode) and dark grey (`--foreground` in light mode) for readability.
- **Borders & Inputs:** Subtle grey tones (`--border`, `--input`).

**Tailwind CSS Color Definitions:**
```javascript
// tailwind.config.ts
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
  }
},
```

**CSS Variable Definitions (src/index.css):**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 5%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 5%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 5%;
  --primary: 45 100% 50%; /* Gold */
  --primary-foreground: 0 0% 5%;
  --secondary: 0 0% 96%;
  --secondary-foreground: 0 0% 5%;
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 45%;
  --accent: 45 100% 50%; /* Gold */
  --accent-foreground: 0 0% 5%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 90%;
  --input: 0 0% 90%;
  --ring: 45 100% 50%;
  --radius: 0.5rem;
}

.dark {
  --background: 0 0% 5%;
  --foreground: 0 0% 95%;
  --card: 0 0% 8%;
  --card-foreground: 0 0% 95%;
  --popover: 0 0% 5%;
  --popover-foreground: 0 0% 95%;
  --primary: 45 100% 50%; /* Gold */
  --primary-foreground: 0 0% 5%;
  --secondary: 0 0% 15%;
  --secondary-foreground: 0 0% 95%;
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 65%;
  --accent: 45 100% 50%; /* Gold */
  --accent-foreground: 0 0% 5%;
  --destructive: 0 62% 30%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 20%;
  --input: 0 0% 20%;
  --ring: 45 100% 50%;
}
```

## 2. Typography

The primary font used across the application is 'Cormorant Garamond', a serif font that conveys elegance and luxury. Defined in `tailwind.config.ts` and `src/index.css`.

**Font Family Definition:**
```javascript
// tailwind.config.ts
fontFamily: {
  sans: ['Cormorant Garamond', 'serif'],
  serif: ['Cormorant Garamond', 'serif'],
  mono: ['Cormorant Garamond', 'serif'],
  royal: ['Cormorant Garamond', 'serif'],
},
```

**Global Typography Styles (src/index.css):**
```css
body {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.3;
}

h1 {
  font-size: 3.5rem;
  font-weight: 700;
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
}

h3 {
  font-size: 2rem;
  font-weight: 600;
}

h4 {
  font-size: 1.5rem;
  font-weight: 600;
}

p, span, div {
  font-weight: 500;
  line-height: 1.6;
}

@media (max-width: 768px) {
  body {
    font-size: 16px;
  }
  
h1 {
    font-size: 2.5rem;
  }
  
h2 {
    font-size: 2rem;
  }
  
h3 {
    font-size: 1.5rem;
  }
}
```

## 3. Gradients and Shadows

Custom CSS classes are defined in `src/index.css` for specific visual effects:

- **`.luxury-gradient`**: A dark, subtle gradient for background elements.
- **`.gold-gradient`**: A vibrant gold gradient for prominent elements like buttons.
- **`.elegant-shadow`**: A soft shadow effect for depth and emphasis.

```css
.luxury-gradient {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
}

.gold-gradient {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
}

.elegant-shadow {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
```

## 4. Component Structure

The application is built using Vue 3 components, organized within the `src/components` directory. Key components include:

- **`AppLayout.vue`**: The main layout component that orchestrates the display of various sections.
- **`Navigation.vue`**: Handles site navigation.
- **`HeroSection.vue`**: The main introductory section, often featuring a large image and call to action.
- **`MediaSliderSection.vue`**: Displays a carousel or slider of media.
- **`PackagesSection.vue`**: Showcases different travel packages.
- **`WhyChooseSection.vue`**: Highlights the unique selling points.
- **`BookingSection.vue`**: Provides a form or interface for booking.
- **`Footer.vue`**: The application footer.

Additionally, the components use Vue 3 Composition API with TypeScript for type safety and reactivity.

## 5. Responsiveness

The design incorporates responsive considerations using Tailwind CSS utility classes and media queries defined in `src/index.css` to ensure optimal viewing across various devices.

## 6. Animations

Subtle animations are used to enhance user experience, defined in `tailwind.config.ts`:

- **`fade-in`**: For elements appearing gradually.
- **`slide-in`**: For elements sliding into view.

```javascript
// tailwind.config.ts
keyframes: {
  'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
  'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
  'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
  'slide-in': { from: { transform: 'translateY(10px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
},
animation: {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'fade-in': 'fade-in 0.3s ease-out',
  'slide-in': 'slide-in 0.3s ease-out',
},
```

This documentation serves as a guide for maintaining and extending the UI design of the Luxury Travel Exclusive application.