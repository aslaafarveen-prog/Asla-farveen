# Asla Farveen — Personal Portfolio Website

A minimal, editorial, and responsive single-page portfolio landing page created for **Asla Farveen**, Graphic Designer & Digital Marketing Professional based in Othukkungal, Malappuram, Kerala, India.

---

## 📁 Project Structure

```text
├── index.html            # Semantic HTML5 single-page structure with SEO & Schema markup
├── style.css             # Vanilla CSS design system (Light/Dark themes, responsive, animations)
├── script.js             # Interactions (theme switcher, smooth scroll, mobile menu, toast)
├── robots.txt            # Search engine crawler configuration
├── sitemap.xml           # XML Sitemap placeholder for SEO indexing
├── assets/
│   ├── asla-farveen.jpg  # Profile portrait photo
│   ├── favicon.svg       # Custom AF monogram vector favicon
│   └── hero-graphic.svg  # Geometric design graphic
└── README.md             # Project documentation
```

---

## 🚀 How to Run Locally

You can run this website directly in any browser:

1. **Direct file open**: Double-click `index.html` in your file explorer to open it in Chrome, Edge, Safari, or Firefox.
2. **Local HTTP server**:
   - Using Python: `python -m http.server 3000`
   - Using Node: `npx serve .`

---

## ✏️ How to Customize Placeholders

All placeholders in this portfolio are designed to be easily replaced:

### 1. Adding Your Profile Photo
- Put your portrait photo into the `assets/` folder (e.g. `assets/asla-portrait.jpg`).
- In `index.html`, inside the `<div class="hero-visual-wrapper">`, replace the `<img src="assets/hero-graphic.svg">` with:
  ```html
  <img src="assets/asla-portrait.jpg" alt="Asla Farveen portrait" class="hero-canvas-graphic" style="object-fit: cover;">
  ```

### 2. Social Media Links
In `index.html`, in the **Contact** section:
- Email is configured as `aslaafarveen@gmail.com` with a direct `mailto:` link and click-to-copy button.
- Replace `[LinkedIn]` and `[Instagram]` links with your actual profile URLs:
  ```html
  <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" class="social-pill">
    <span>LinkedIn</span>
  </a>
  ```

### 3. Connecting the Contact Form
To receive messages directly to your inbox, you can link the `<form id="contactForm">` to [Formspree](https://formspree.io):
```html
<form action="https://formspree.io/f/your-form-id" method="POST" class="contact-form">
```

---

## 🎨 Design Features
- **Strictly Authentic**: Uses only confirmed facts — no exaggerated claims, fake clients, or unconfirmed software skills.
- **Minimal Editorial Aesthetic**: Refined off-white and charcoal tones with a warm terracotta accent (`#E05A47`).
- **Dark Mode Support**: Built-in toggle supporting both Light and Dark editorial palettes.
- **100% Responsive**: Tested across desktop (1440px), laptop (1024px), tablet (768px), and mobile (480px, 360px).
- **Zero Heavy Dependencies**: Pure semantic HTML5, Vanilla CSS3, and modern JavaScript for instant loading and performance.
