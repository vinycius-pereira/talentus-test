"use client"
import Image from "next/image";
import React, {useEffect, useState} from 'react'
import {IoAddSharp} from "react-icons/io5";
import {FaRegTrashCan} from "react-icons/fa6";
import {Modal} from "@/app/components/Modal";
import {ToastContainer, Slide, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    collection,
    addDoc,
    query,
    onSnapshot,
    deleteDoc,
    doc,
} from "firebase/firestore";
import {db} from "./firebase/config";

export default function Home() {
    const [contacts, setContacts] = useState([{
        name: "Denise England",
        email: "katokato110@freeprodesign.com",
        phoneNumber: "(11) 91234-5678"
    }, {
        name: "Maizie Perez",
        email: "einbezog@gmailod.com",
        phoneNumber: "(11) 91234-5678"
    }, {
        name: "Arjan Bean",
        email: "2c35417c@freeprodesign.com",
        phoneNumber: "(11) 91234-5678"
    }, {
        name: "Everly Mclean",
        email: "6990@velabilke.com",
        phoneNumber: "(11) 91234-5678"
    }, {
        name: "Dawid Sims",
        email: "natashacheypesh@54.mk",
        phoneNumber: "(11) 91234-5678"
    }
    ])
    const [message, setMessage] = useState("")
    const [selectedContact, setSelectedContact] = useState("")
    const [selectedContactToUpdate, setSelectedContactToUpdate] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [messagesSent, setMessagesSent] = useState([])


    const handleContactSelected = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const submitMessage = async (e) => {
        e.preventDefault()

        if (!message || message.length <= 0) {
            return
        }

        await addDoc(collection(db, "messages"), {
            receiverName: selectedContact.name,
            receiverEmail: selectedContact.email,
            receiverPhoneNumber: selectedContact.phoneNumber,
            message: message,
            date: new Date()
        });

        toast.success('Message submitted successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "dark",
            transition: Slide,
        });

        setIsModalOpen(false)
    }

    useEffect(() => {
        const q = query(collection(db, 'messages'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let itemsArr = [];

            querySnapshot.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id});
            });
            setMessagesSent(itemsArr);
            return () => unsubscribe();
        });
    }, []);

    const deleteItem = async (id) => {
        await deleteDoc(doc(db, 'messages', id));
    };

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
                    <div className='flex items-center p-4'>
                        <h1 className='text-4xl mr-12'>Contacts</h1>
                    </div>
                    <div>
                        <ul className='flex flex-wrap'>
                            {contacts.map((contact, key) => (
                                <li key={key} className='w-1/3'>
                                    <div
                                        className='flex flex-col bg-amber-100 p-6 m-4 text-black hover:bg-amber-200'>
                                        <span className='text-2xl p-2'>{contact.name}</span>
                                        <span className='p-2'>{contact.email}</span>
                                        <span className='p-2'>{contact.phoneNumber}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border border-amber-100 w-1.0 bg-amber-100 m-6"></div>
                    <div className='flex items-center p-4'>
                        <h1 className='text-4xl mr-12'>Messages</h1>
                        <button className='bg-amber-100 text-black p-4 rounded-full  hover:bg-amber-300'
                                onClick={handleContactSelected}>
                            <IoAddSharp/>
                        </button>
                    </div>
                    {(messagesSent && messagesSent.length > 0) && (
                        <div>
                            <ul>
                                {messagesSent.map((message, key) => (
                                    <li key={key} className='w-full'>
                                        <div
                                            className='flex flex-col bg-amber-100 p-6 m-4 text-black hover:bg-amber-200 relative'>
                                            <span className='text-2xl p-2'>{`To: ${message.receiverName}`}</span>
                                            <span className='p-2'>{message.message}</span>
                                            <div
                                                className="absolute top-1/2 right-20 transform translate-x-1/2 -translate-y-1/2 hover:text-red-500 hover:cursor-pointer"
                                                onClick={(() => deleteItem(message.id))}
                                            >
                                                <FaRegTrashCan size="2em"/>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <Modal
                        modalIsOpen={isModalOpen}
                        toggleModal={closeModal}
                    >
                        <form onSubmit={(e) => submitMessage(e)}>
                            <div className="flex flex-col space-y-4">
                                <label htmlFor="contact" className="text-gray-600">Name:</label>
                                <select
                                    id="contact"
                                    name="contact"
                                    className="border border-gray-300 rounded-md p-2"
                                    onChange={(e) => {
                                        const selectedContact = contacts.find(contact => contact.name === e.target.value);
                                        setSelectedContact(selectedContact)
                                    }}
                                    value={selectedContact.name}
                                >
                                    {contacts.map(contact => (
                                        <option value={contact.name}>{contact.name}</option>
                                    ))}
                                </select>
                                <label htmlFor="message" className="text-gray-600">Message:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="border border-gray-300 rounded-md p-2"
                                    onChange={(e) => {
                                        setMessage(e.target.value)
                                    }}
                                ></textarea>
                                <button
                                    type="submit"
                                    className="bg-gray-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Modal>
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        transition="Slide"
                    />
                </div>
            </main>
        </>
    );
}
