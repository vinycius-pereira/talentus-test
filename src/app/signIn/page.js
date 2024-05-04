'use client'
import {useState} from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import {useRouter} from 'next/navigation';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter()

    const handleSignIn = async () => {
        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log({res});
            sessionStorage.setItem('user', true)
            setEmail('');
            setPassword('');
            router.push('/')
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-8 rounded-md shadow-md bg-amber-100 text-black w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
                <div className="mb-4">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="border bg-gray-900 text-white rounded-md p-2 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="border bg-gray-900 text-white rounded-md p-2 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        className="bg-gray-900 text-white font-semibold w-1/2 py-2 px-4 rounded-md hover:bg-gray-800"
                        onClick={handleSignIn}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}
