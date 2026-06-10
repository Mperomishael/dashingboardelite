# EliteBlockMarket - Visual Design Guide

## 🎨 Color Palette

### Primary Colors
- **Gold/Amber**: `#fbbf24` - Main brand color, used for accents and highlights
- **Dark Slate**: `#0f172a` - Primary background
- **Slate 900**: `#0f172a` - Secondary background

### Accent Colors
- **Emerald**: `#10b981` - Positive/Growth indicator
- **Red**: `#ef4444` - Negative/Warning indicator  
- **Cyan**: `#06b6d4` - Market data/Info
- **Purple**: `#a855f7` - Secondary accent
- **Blue**: `#3b82f6` - Profit/Balance indicator

## 🎭 Typography Scale

### Headings
- **H1**: 48-56px, font-black (900), tracking-wider
- **H2**: 32-40px, font-bold (700), uppercase
- **H3**: 20-28px, font-bold (700), tracking-wide
- **H4**: 16-20px, font-semibold (600), uppercase

### Body Text
- **Large**: 18px, font-semibold (600)
- **Base**: 16px, font-medium (500)
- **Small**: 14px, font-normal (400)
- **Extra Small**: 12px, font-semibold (600), uppercase, tracking-wide

## 🎯 Component Styling

### Balance Card (Hero Section)
```
Background: gradient (amber-950/40 → slate-950)
Border: amber-500/20
Padding: 24-32px
Border Radius: 24px
Font: Gold gradient text, font-black
```

### Stats Cards (Grid)
```
Individual colors: emerald, red, cyan, purple
Background: gradient with opacity (color-950/40 → slate-900/60)
Border: color-500/30
Hover Border: color-500/60
Glow: shadow-lg shadow-{color}-500/20
Transition: all 200ms
```

### Chart
```
Background: gradient (slate-900/60 → slate-950)
Border: amber-500/10
Chart Color: #fbbf24 (gold)
Glow Filter: feGaussianBlur 2px
Gradient Fill: amber gradient with opacity steps
```

### Action Buttons
```
Type: Gradient button
Add Fund: emerald-600 → emerald-500
Withdraw: red-600 → red-500
Hover: lighter shade gradient
Shadow: color-500/30 (30% opacity)
Hover Shadow: color-500/50 (50% opacity)
```

### Crypto Price Cards
```
Background: gradient (slate-900/40 → slate-900/20)
Border: amber-500/10
Hover Border: amber-500/30
Border Radius: 12px
Padding: 16px
Hover Shadow: shadow-lg shadow-amber-500/10
```

## 📐 Spacing System

- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 12px (0.75rem)
- **lg**: 16px (1rem)
- **xl**: 24px (1.5rem)
- **2xl**: 32px (2rem)

## ✨ Effects & Animations

### Hover States
- Slight scale increase: `hover:scale-[1.02]`
- Border color transition
- Shadow enhancement
- Text color shift

### Active States
- Scale down: `active:scale-95`
- Immediate response

### Loading/Pulse
- Glow effect: `animate-pulse`
- Applied to important indicators

### Transitions
- Duration: 200-300ms
- Easing: ease-in-out
- Properties: colors, borders, shadows, transforms

## 🔤 Typography Examples

### Section Headers
```
font-black text-lg md:text-xl
bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent
uppercase tracking-wide
```

### Label Text
```
text-xs uppercase tracking-wide font-semibold
color: amber-400/80
```

### Large Numbers
```
font-black text-4xl md:text-5xl
color: amber-300 or color-specific
```

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px (md)
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Scaling
- Text sizes adjust with `md:` prefix
- Padding increases with `md:p-` prefixes
- Grid columns adjust: `grid-cols-2` (mobile) → maintains for most screens

## 🏷️ Branding Elements

### Logo
- Path: `/logo.png`
- Size: 40x40px (mobile nav), 32x32px (inline), 96x96px (auth page)
- Fallback: Used throughout interface

### Platform Name
- **Visible Text**: "EliteBlockMarket"
- **Website**: www.eliteblockmarket.com
- **Support Email**: support@eliteblockmarket.com

## 🎪 Premium Feel Techniques

1. **Gradient Overlays**: Multiple color transitions for depth
2. **Glow Effects**: Subtle box-shadows and filter glows
3. **Gold Accents**: Premium color as primary brand color
4. **Uppercase Tracking**: Letter spacing for luxury feel
5. **Font Weights**: Heavy use of font-black (900) and font-bold (700)
6. **Elevation**: Layered shadows and z-index management
7. **Spacing**: Generous padding for premium layout
8. **Micro-interactions**: Subtle hover and active states

## 🔄 Theme Consistency

All components should:
- Use amber/gold as primary accent
- Maintain dark theme (slate-950/900)
- Include gradient backgrounds where appropriate
- Apply consistent border styles (amber-500 with low opacity)
- Use uppercase labels and tracking for premium feel
- Include glow effects on important elements

---

**Last Updated**: 2024
**Version**: 1.0
**Status**: Active EliteBlockMarket Branding
