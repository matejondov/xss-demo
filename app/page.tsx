'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            ⚠️ XSS Vulnerability Demo
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            This is an educational demonstration of Cross-Site Scripting (XSS) vulnerabilities.
            <strong className="text-red-600"> DO NOT use these patterns in production code!</strong>
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            What is XSS?
          </h2>
          <p className="text-gray-600 mb-4">
            Cross-Site Scripting (XSS) attacks are injection attacks where malicious scripts
            are injected into trusted websites. XSS occurs when an attacker uses a web application to send
            malicious code to a different end user.
          </p>
        </div>

        <div className="flex flex-row justify-evenly">
          <Link
            href="/vulnerable"
            className="inline-block mb-6 text-red-600 hover:text-red-800 font-semibold bg-red-100 px-4 py-2 rounded-lg"
          >
            ⚠️ Go to Vulnerable Page
          </Link>
          <Link
            href="/safe"
            className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg"
          >
            ✅ Go to Safe Page
          </Link>
        </div>

        {/* Prevention Methods */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            ✅ How to Prevent XSS Attacks
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Practices:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Always use React's JSX (auto-escapes values)</li>
                <li>Never use dangerouslySetInnerHTML with user input</li>
                <li>Validate and sanitize all user input</li>
                <li>Use Content Security Policy (CSP) headers</li>
                <li>Set HttpOnly flag on session cookies</li>
                <li>Use SameSite cookie attribute</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Security Headers:</h3>
              <code className="block bg-gray-100 p-4 rounded text-xs overflow-x-auto">
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
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-blue-700 mb-3">
            Educational Use & Disclaimer
          </h3>
          <div className="text-gray-700 space-y-2">
            <p>
              This demonstration is designed for educational purposes to help developers, security professionals,
              and students understand XSS vulnerabilities and prevention techniques.
            </p>
            <p className="text-sm font-semibold text-blue-800">
              By using this site, you agree to use this knowledge responsibly and only for educational purposes.
              Do not test these attacks on websites you do not own or have permission to test.
            </p>
          </div>
        </div>

        <footer className="text-center text-gray-600 text-sm mt-8 mb-4">
        </footer>
      </div>
    </div >
  );
}
