'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-card rounded-lg shadow-xl p-8 mb-8 border">
          <Image
            src="/hero.png"
            alt="XSS Demo Hero Image"
            width={1920}
            height={1080}
            className="mb-4"
          />
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            XSS Vulnerability Demo
          </h1>
          <p className="text-foreground text-lg mb-6">
            This is an educational demonstration of Cross-Site Scripting (XSS) vulnerabilities.
            <strong className="text-red-600"> DO NOT use these patterns in production code!</strong>
          </p>

          <div className="flex flex-row justify-evenly pt-4">
            <Link
              href="/vulnerable"
              className="inline-block mb-6 text-red-600 hover:text-red-700 font-semibold bg-red-50 px-4 py-2 rounded-lg border border-red-200"
            >
              Go to Vulnerable Page
            </Link>
            <Link
              href="/safe"
              className="inline-block mb-6 text-green-600 hover:text-green-700 font-semibold bg-green-50 px-4 py-2 rounded-lg border border-green-200"
            >
              Go to Safe Page
            </Link>
          </div>
        </div>



        {/* Prevention Methods */}
        <div className="bg-card rounded-lg shadow-xl p-8 mb-8 border">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            ✅ How to Prevent XSS Attacks
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Best Practices:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Always use React's JSX (auto-escapes values)</li>
                <li>Never use dangerouslySetInnerHTML with user input</li>
                <li>Validate and sanitize all user input</li>
                <li>Use Content Security Policy (CSP) headers</li>
                <li>Set HttpOnly flag on session cookies</li>
                <li>Use SameSite cookie attribute</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Security Headers:</h3>
              <code className="block bg-muted p-4 rounded text-xs overflow-x-auto text-foreground border">
                <pre>{`Content-Security-Policy: 
  script-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Set-Cookie: session=xyz; 
  HttpOnly; Secure; SameSite=Strict`}</pre>
              </code>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-card rounded-lg shadow-xl p-8 mb-8 border">
          <h3 className="text-xl font-bold text-foreground mb-3">
            Educational Use & Disclaimer
          </h3>
          <div className="text-foreground space-y-2">
            <p>
              This demonstration is designed for educational purposes to help developers, security professionals,
              and students understand XSS vulnerabilities and prevention techniques.
            </p>
            <p className="text-sm font-semibold text-muted-foreground">
              By using this site, you agree to use this knowledge responsibly and only for educational purposes.
              Do not test these attacks on websites you do not own or have permission to test.
            </p>
          </div>
        </div>

        <footer className="text-center text-muted-foreground text-sm mt-8 mb-4">
        </footer>
      </div>
    </div >
  );
}
