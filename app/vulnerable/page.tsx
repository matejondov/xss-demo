'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function VulnerableContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || '';

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-block mb-6 text-foreground hover:text-muted-foreground font-semibold"
                >
                    ← Back to Home
                </Link>

                <div className="bg-card rounded-lg shadow-xl p-8 mb-8 border">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        🚨 Vulnerable Page - Reflected XSS
                    </h1>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">
                            Welcome Message:
                        </h2>
                        {/* VULNERABLE: This will execute any HTML/JavaScript in the name parameter */}
                        <div
                            className="p-6 bg-muted rounded-lg border text-foreground"
                            dangerouslySetInnerHTML={{ __html: `Welcome, ${name || 'Guest'}!` }}
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                Try These Examples:
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 bg-muted border rounded-lg">
                                    <h4 className="font-bold text-foreground mb-2">
                                        1. Simple Alert:
                                    </h4>
                                    <code className="block bg-background border p-3 rounded text-sm overflow-x-auto mb-2 text-foreground">
                                        ?name=&lt;img src=x onerror="alert('XSS Attack!')"&gt;
                                    </code>
                                    <button
                                        onClick={() => {
                                            window.location.href = "/vulnerable?name=" + encodeURIComponent('<img src=x onerror="alert(\'XSS Attack!\')">');
                                        }}
                                        className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                                    >
                                        Test This Attack
                                    </button>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Note: Some browsers like Brave may block script tags. This uses an img tag with onerror event instead.
                                    </p>
                                </div>

                                <div className="p-4 bg-muted border rounded-lg">
                                    <h4 className="font-bold text-foreground mb-2">
                                        2. Phishing Attack (Fake Login Form):
                                    </h4>
                                    <code className="block bg-background border p-3 rounded text-sm overflow-x-auto mb-2 break-all text-foreground">
                                        ?name=&lt;div style=&quot;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center&quot;&gt;&lt;div style=&quot;background:white;padding:40px;border-radius:10px;max-width:400px&quot;&gt;&lt;h2 style=&quot;color:red;margin-bottom:20px&quot;&gt;Session Expired&lt;/h2&gt;&lt;p style=&quot;margin-bottom:20px&quot;&gt;Please log in again:&lt;/p&gt;&lt;form onsubmit=&quot;alert('Credentials stolen!\\nUsername: ' + this.username.value + '\\nPassword: ' + this.password.value); return false;&quot;&gt;&lt;input name=&quot;username&quot; placeholder=&quot;Username&quot; style=&quot;width:100%;padding:10px;margin-bottom:10px;border:1px solid #ccc;border-radius:5px&quot;&gt;&lt;input name=&quot;password&quot; type=&quot;password&quot; placeholder=&quot;Password&quot; style=&quot;width:100%;padding:10px;margin-bottom:20px;border:1px solid #ccc;border-radius:5px&quot;&gt;&lt;button type=&quot;submit&quot; style=&quot;width:100%;padding:10px;background:#007bff;color:white;border:none;border-radius:5px;cursor:pointer&quot;&gt;Login&lt;/button&gt;&lt;/form&gt;&lt;/div&gt;&lt;/div&gt;
                                    </code>
                                    <button
                                        onClick={() => {
                                            const phishingPayload = `<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center"><div style="background:white;padding:40px;border-radius:10px;max-width:400px"><h2 style="color:red;margin-bottom:20px">Session Expired</h2><p style="margin-bottom:20px;color:black">Please log in again:</p><form onsubmit="alert('Credentials stolen!\\nUsername: ' + this.username.value + '\\nPassword: ' + this.password.value); return false;"><input name="username" placeholder="Username" style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ccc;border-radius:5px;color:black"><input name="password" type="password" placeholder="Password" style="width:100%;padding:10px;margin-bottom:20px;border:1px solid #ccc;border-radius:5px;color:black"><button type="submit" style="width:100%;padding:10px;background:#007bff;color:white;border:none;border-radius:5px;cursor:pointer">Login</button></form></div></div>`;
                                            window.location.href = `/vulnerable?name=${encodeURIComponent(phishingPayload)}`;
                                        }}
                                        className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                                    >
                                        Test Phishing Attack
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg">
                            <h3 className="text-xl font-bold text-green-600 mb-3">
                                🛡️ How This Should Be Fixed:
                            </h3>
                            <div className="space-y-4 text-foreground">
                                <div>
                                    <h4 className="font-semibold text-black mb-1">❌ Vulnerable Code:</h4>
                                    <code className="block bg-background border p-3 rounded text-sm text-foreground">
                                        dangerouslySetInnerHTML=&#123;&#123; __html: `Welcome, $&#123;name&#125;!` &#125;&#125;
                                    </code>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-black mb-1">✅ Safe Alternative:</h4>
                                    <code className="block bg-background border p-3 rounded text-sm text-foreground">
                                        &lt;div&gt;Welcome, &#123;name&#125;!&lt;/div&gt;
                                    </code>
                                    <p className="text-sm mt-2 text-muted-foreground">
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-foreground">Loading...</div>}>
            <VulnerableContent />
        </Suspense>
    );
}
