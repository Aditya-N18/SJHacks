// import React, { useState, useRef, useEffect } from 'react';
// import { MessageCircle, X, Send } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Button from '../ui/Button';
// import { generateResponse } from '../../utils/openai';
// import { ChatMessage } from '../../types';

// const ChatbotButton: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: '1',
//       sender: 'bot',
//       content: "Hello! I'm here to help you find resources and support. How can I assist you today?",
//       timestamp: new Date()
//     }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (inputValue.trim() === '' || isLoading) return;

//     const userMessage: ChatMessage = {
//       id: Date.now().toString(),
//       sender: 'user',
//       content: inputValue.trim(),
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputValue('');
//     setIsLoading(true);

//     try {
//       const formattedMessages = messages
//         .concat(userMessage)
//         .map(msg => ({
//           role: msg.sender === 'user' ? 'user' : 'assistant' as const,
//           content: msg.content
//         }));

//       const response = await generateResponse(formattedMessages);

//       const botMessage: ChatMessage = {
//         id: (Date.now() + 1).toString(),
//         sender: 'bot',
//         content: response || "I apologize, but I'm having trouble responding right now. Please try again.",
//         timestamp: new Date()
//       };

//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       const errorMessage: ChatMessage = {
//         id: (Date.now() + 1).toString(),
//         sender: 'bot',
//         content: "I apologize, but I'm having trouble connecting right now. Please try again later.",
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const quickQuestions = [
//     { text: "Where can I find food near me?", icon: "🍽️" },
//     { text: "I need shelter tonight", icon: "🏠" },
//     { text: "Where can I get medical help?", icon: "🩺" },
//     { text: "Help me find a job", icon: "💼" }
//   ];

//   return (
//     <>
//       <motion.button
//         className="fixed bottom-6 right-6 z-40 bg-primary-400 text-white p-4 rounded-full shadow-lg hover:bg-primary-500 transition-colors duration-200 flex items-center justify-center"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setIsOpen(true)}
//       >
//         <MessageCircle size={24} />
//       </motion.button>

//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.5 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black z-40"
//               onClick={() => setIsOpen(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, y: 100, scale: 0.9 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 100, scale: 0.9 }}
//               transition={{ type: 'spring', damping: 25, stiffness: 300 }}
//               className="fixed bottom-6 right-6 z-50 bg-white w-[350px] sm:w-[400px] rounded-xl shadow-2xl overflow-hidden flex flex-col"
//               style={{ maxHeight: 'calc(100vh - 100px)' }}
//             >
//               <div className="bg-primary-400 text-white p-4 flex justify-between items-center">
//                 <div className="flex items-center">
//                   <MessageCircle size={20} className="mr-2" />
//                   <h3 className="font-medium">RiseUp AI Assistant</h3>
//                 </div>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="text-white hover:text-neutral-200 transition-colors"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <div
//                 className="p-4 overflow-y-auto flex-grow bg-neutral-50"
//                 style={{ maxHeight: '400px' }}
//               >
//                 {messages.map((message, index) => (
//                   <div
//                     key={message.id}
//                     className={`mb-4 flex ${
//                       message.sender === 'user' ? 'justify-end' : 'justify-start'
//                     }`}
//                   >
//                     <div
//                       className={`max-w-[80%] p-3 rounded-lg ${
//                         message.sender === 'user'
//                           ? 'bg-primary-100 text-primary-900 rounded-tr-none'
//                           : 'bg-neutral-100 text-neutral-800 rounded-tl-none'
//                       }`}
//                     >
//                       <p className="whitespace-pre-wrap">{message.content}</p>
//                       <div
//                         className={`text-xs mt-1 ${
//                           message.sender === 'user'
//                             ? 'text-primary-500'
//                             : 'text-neutral-500'
//                         }`}
//                       >
//                         {message.timestamp.toLocaleTimeString([], {
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />

//                 {isLoading && (
//                   <div className="flex justify-start mb-4">
//                     <div className="bg-neutral-100 rounded-lg rounded-tl-none p-3 max-w-[80%]">
//                       <div className="flex space-x-2">
//                         <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
//                         <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
//                         <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {messages.length <= 3 && (
//                 <div className="p-4 border-t border-neutral-100 bg-neutral-50">
//                   <p className="text-sm text-neutral-500 mb-3">Quick questions:</p>
//                   <div className="grid grid-cols-2 gap-2">
//                     {quickQuestions.map((question, index) => (
//                       <Button
//                         key={index}
//                         variant="outline"
//                         size="sm"
//                         fullWidth
//                         className="justify-start"
//                         onClick={() => {
//                           setInputValue(question.text);
//                           setTimeout(() => handleSendMessage(), 100);
//                         }}
//                       >
//                         <span className="mr-2">{question.icon}</span> {question.text}
//                       </Button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="p-4 border-t border-neutral-100 bg-white">
//                 <div className="flex items-center">
//                   <input
//                     type="text"
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                     placeholder="Type your message..."
//                     className="flex-grow p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
//                     disabled={isLoading}
//                   />
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={inputValue.trim() === '' || isLoading}
//                     className={`ml-2 p-3 rounded-lg transition-colors ${
//                       inputValue.trim() === '' || isLoading
//                         ? 'bg-neutral-200 text-neutral-400'
//                         : 'bg-primary-400 text-white hover:bg-primary-500'
//                     }`}
//                   >
//                     <Send size={20} />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ChatbotButton;