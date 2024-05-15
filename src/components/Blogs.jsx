import { Helmet } from "react-helmet-async";

const Blogs = () => {
    return (
        <div className="mt-8 dark:text-[#E7F6F2]">
            <Helmet>
                <title>JobQuest | Blogs</title>
            </Helmet>
            <h1 className="text-center text-3xl font-bold">Demystifying JWT Tokens, Express.js, and Nest.js: A Comprehensive Guide</h1>
            <h2 className="text-2xl font-bold mt-10">JSON Web Tokens (JWT)</h2>
            <h3 className="text-xl font-semibold mt-5">What are JWTs?</h3>
            <p className="mt-2 text-justify">JSON Web Tokens (JWTs) are an open, industry-standard method for securely representing claims between two parties. They are compact, self-contained, and often used for authentication and authorization purposes. JWTs consist of three parts: header, payload, and signature. The header specifies the algorithm used for signing, the payload contains the claims (e.g., user ID, roles), and the signature ensures the token&apos;s integrity.</p>
            <h3 className="text-xl font-semibold mt-5">Access Tokens and Refresh Tokens</h3>
            <ul className="mt-2 list-disc text-justify pl-8">
                <li><p><span className="font-bold">Access Token:</span> An access token is a short-lived token that grants access to specific resources (e.g., APIs, services). It typically includes information about the user and their permissions.</p></li>
                <li><p><span className="font-bold">Refresh Token:</span> A refresh token is a long-lived token used to obtain a new access token without requiring the user to log in again. It’s stored securely (e.g., in an HTTP-only cookie) and exchanged for a fresh access token when needed.</p></li>
            </ul>
            <h3 className="text-xl font-semibold mt-5">Where to Store Tokens on the Client Side?</h3>
            <ul className="mt-2 list-disc text-justify pl-8">
                <li><p><span className="font-bold">Access Token:</span> Store access tokens in memory (e.g., JavaScript variables) or in an HTTP-only cookie. Cookies are more secure because they are not accessible via JavaScript, reducing the risk of cross-site scripting (XSS) attacks.</p></li>
                <li><p><span className="font-bold">Refresh Token:</span> Store refresh tokens securely in an HTTP-only cookie. This prevents client-side JavaScript from accessing them directly.</p></li>
            </ul>
            <h2 className="text-2xl font-bold mt-10">Express.js</h2>
            <h3 className="text-xl font-semibold mt-5">What is Express.js?</h3>
            <p className="mt-2 text-justify">Express.js is a fast, unopinionated, and minimalist web framework for Node.js. It provides essential features for building web applications, APIs, and middleware. Here&apos;s a simple example of an Express route:</p>
            <div className="bg-[#2C3333] dark:bg-gray-900 rounded-md text-white mt-4 overflow-x-auto">
                <pre>
                    <code>
                        {`
    const express = require('express');
    const app = express();

    // Define a route
    app.get('/', (req, res) => {
    res.send('Hello, Express!');
    });

    // Start the server
    app.listen(3000, () => {
    console.log('Server running on port 3000');
    });
                        `}
                    </code>
                </pre>
            </div>
            <p className="mt-4">In this example:</p>
            <ul className="mt-2 list-disc text-justify pl-8">
                <li><p>We create an Express app.</p></li>
                <li><p>Define a route for the root URL <code>(“/”)</code> that responds with <code>“Hello, Express!”</code>.</p></li>
                <li><p>Start the server on port 3000.</p></li>
            </ul>
            <h2 className="text-2xl font-bold mt-10">Nest.js</h2>
            <h3 className="text-xl font-semibold mt-5">What is Nest.js?</h3>
            <p className="mt-2 text-justify">Nest.js is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It combines elements of object-oriented programming (OOP), functional programming (FP), and reactive programming (FRP). Key features include:</p>
            <ul className="mt-2 list-disc text-justify pl-8">
                <li><p><span className="font-bold">Modularity:</span> Organize applications into self-contained modules.</p></li>
                <li><p><span className="font-bold">Dependency Injection:</span> Enhance testability by injecting dependencies.</p></li>
                <li><p><span className="font-bold">Type Safety:</span> Built with TypeScript, providing robust type checking.</p></li>
                <li><p><span className="font-bold">Rich Ecosystem:</span> Offers tools for REST APIs, GraphQL, real-time apps, and more.</p></li>
            </ul>
            <div className="bg-[#2C3333] dark:bg-gray-900 rounded-md text-white mt-4 overflow-x-auto">
                <pre>
                    <code>
                        {`
    import { Injectable } from '@nestjs/common';

    @Injectable()
    export class AppService {
        getHello(): string {
        return 'Hello, world!';
        }
    }
        
                        `}
                    </code>
                </pre>
            </div>
            <p className="mt-4">In this example:</p>
            <ul className="mt-2 list-disc text-justify pl-8">
                <li><p>We create an <code>AppService</code> class with a <code>getHello</code> method.</p></li>
                <li><p>The <code>@Injectable()</code> decorator marks it as a service.</p></li>
                <li><p>The method returns <code>“Hello, world!”</code>.</p></li>
            </ul>
            <p className="mt-2">Nest.js provides a well-structured foundation for building enterprise-grade applications, including microservices and web apps.</p>
        </div>
    );
};

export default Blogs;