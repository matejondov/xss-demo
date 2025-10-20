'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function SafeContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || '';

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-semibold"
                >
                    ← Back to Home
                </Link>

                <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
                    <h1 className="text-3xl font-bold text-green-600 mb-4">
                        ✅ Safe Page - XSS Protected
                    </h1>

                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                        <p className="text-green-800">
                            <strong>✅ SAFE:</strong> This page properly escapes user input using React's default JSX behavior.
                            Scripts in the URL will be displayed as text, not executed!
                        </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Welcome Message:
                        </h2>
                        {/* SAFE: React automatically escapes the value */}
                        <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                            Welcome, {name || 'Guest'}!
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
                            <h3 className="text-xl font-bold text-blue-700 mb-3">
                                🛡️ How This Works:
                            </h3>
                            <div className="space-y-4 text-gray-700">
                                <div>
                                    <h4 className="font-semibold mb-2">✅ Safe Code:</h4>
                                    <code className="block bg-white p-3 rounded text-sm mb-2">
                                        &lt;div&gt;Welcome, &#123;name&#125;!&lt;/div&gt;
                                    </code>
                                    <p className="text-sm text-gray-600">
                                        React automatically escapes all values in JSX curly braces. Any HTML or JavaScript
                                        will be rendered as plain text, preventing XSS attacks.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                Try These Examples:
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        1. Try Script Injection (Won't Work):
                                    </h4>
                                    <Link
                                        href="/safe?name=<script>alert('XSS Attack!')</script>"
                                        className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Test Attack (Safe)
                                    </Link>
                                    <p className="text-sm text-gray-600 mt-2">
                                        The script tag will be displayed as text, not executed.
                                    </p>
                                </div>

                                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        2. Try HTML Injection (Won't Work):
                                    </h4>
                                    <Link
                                        href="/safe?name=<h1>Injected HTML</h1>"
                                        className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Test HTML Injection (Safe)
                                    </Link>
                                    <p className="text-sm text-gray-600 mt-2">
                                        The HTML will be displayed as text, not rendered as HTML.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                            <h3 className="text-xl font-bold text-green-700 mb-3">
                                🎯 Key Takeaways:
                            </h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Always use React's default JSX syntax for user input</li>
                                <li>React automatically escapes values in &#123;&#125;</li>
                                <li>Never use dangerouslySetInnerHTML with user input</li>
                                <li>If you must render HTML, sanitize it with a library like DOMPurify</li>
                                <li>Validate and sanitize all user input on the server side</li>
                            </ul>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                href="/vulnerable"
                                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                            >
                                See Vulnerable Version →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SafePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SafeContent />
        </Suspense>
    );
}
