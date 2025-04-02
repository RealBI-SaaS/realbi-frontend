import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { Card } from "antd";

const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {isOpen && (
        <Card className="w-80 bg-gray-50 p-4 shadow-md rounded-md">
          <h2 className="text-lg font-bold">AI Chat, Comming Soon ...</h2>
          <p>How can I help you today?</p>
          <input className=" w-full outline-gray-600 rounded-sm p-2" placeholder="type here" />
        </Card>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 text-white p-3 rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-gray-400 transition-all "
      >
        <AiOutlineMessage className="text-3xl " />
      </button>
    </div>
  );
};

export default AiChat;
