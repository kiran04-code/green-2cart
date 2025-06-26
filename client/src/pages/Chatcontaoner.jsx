import React, { useState, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ChatContainers = () => {
    const { socket } = useAppContext();
    const [message, setMessage] = useState([]);
    const [rcmessage, setrcmessage] = useState([]);
    const [fromseller,setfromseller] = useState([])

    useEffect(() => {
        const reciceDataFRomUser = (data) => {
            setrcmessage((prev) => [...prev, data]);
        };
        const reciceDataseller = (data) => {
            setfromseller((prev) => [...prev, data]);
        };
        socket.on("recive-this-message-seller", reciceDataFRomUser);
        socket.on("recive-this-message-foruser", reciceDataseller);
        return () => {
            socket.off("recive-this-message-seller", reciceDataFRomUser);
            socket.off("recive-this-message-foruser", reciceDataseller);
        };
    }, [socket]);

    const handlesubmiit = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;
        socket.emit("sendmessage-to-seller", message);
        setMessage('');
    };

    return (
        <div className="w-full max-w-lg mx-auto mt-10 p-4 bg-white shadow-xl rounded-2xl border border-gray-200">
            {/* Chat header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Chat with Shop</h2>
                <h1></h1>
                <span className="text-xs text-green-600">Online</span>
            </div>

            {/* Chat box */}
            <div className="h-64 overflow-y-auto flex flex-col gap-2 p-2 bg-gray-50 rounded-xl">
                 {fromseller.map((items, index) => (
                    <div className="self-start bg-[#f1f5f9] text-gray-800 px-4 py-2 rounded-2xl max-w-[75%]">
                   shop: {items}
                </div>
                ))}

                {rcmessage.map((items, index) => (
                    <div key={index} className="self-end bg-[#25704d] text-white px-4 py-2 rounded-2xl max-w-[75%]">
                        {items}
                    </div>
                ))}
            </div>

            {/* Message input */}
            <form onSubmit={handlesubmiit} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#25704d]"
                />
                <button
                    type="submit"
                    className="bg-[#25704d] text-white p-2 rounded-full hover:bg-[#1e5d3f] transition"
                >
                    <SendHorizonal size={18} />
                </button>
            </form>
        </div>
    );
};

export default ChatContainers;
