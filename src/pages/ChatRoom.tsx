import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dataTypes } from "./Landing";
import { CONNECTION_URL } from "../constants";

const ChatRoom = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const socketRef = useRef<WebSocket>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const messageData = location.state || {};

  const [roomKey, setRoomKey] = useState("");
  const [roomName, setRoomName] = useState("");

  const [messages, setMessages] = useState<any[]>([
    {
      senderId: "sender",
      receiverId: "reciever",
      message: "msg",
    }
  ]);
  const [isValidConnection, setIsValidConnection] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(CONNECTION_URL);

    socketRef.current = ws;

    ws.onopen = () => {
      try {
        const savedRoom = localStorage.getItem("roomInfo");
        if (!savedRoom) {
          ws.send(JSON.stringify(messageData));
        } else {
          const newMessageData = {
            type: dataTypes.join,
            payload: {
              roomKey: JSON.parse(savedRoom).roomKey,
            },
          };
          ws.send(JSON.stringify(newMessageData));
        }
      } catch (error) {
        console.log(error);
        toast(error as string);
      }
    };

    ws.onmessage = (event) => {
      try {
        const serverData = JSON.parse(event.data.toString());

        if (!serverData || !serverData?.success) {
          toast(serverData?.message || "Something went wrong.");
          return;
        }

        if (
          serverData.type === dataTypes.create ||
          serverData.type === dataTypes.join
        ) {
          setRoomKey(serverData?.data?.roomKey);
          setRoomName(serverData?.data?.roomName);
          setIsValidConnection(true);
        }

        if (serverData.type === dataTypes.chat)
          setMessages((message) => [...message, serverData?.data]);
      } catch (error) {
        console.log(error);
        toast(error as string);
      }
    };
    ws.onerror = (error) => {
      console.log("Websocket error:", error);
    };

    return () => {
      localStorage.clear();
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (roomKey && roomName) {
      !localStorage.getItem("roomInfo") &&
        localStorage.setItem(
          "roomInfo",
          JSON.stringify({
            roomKey: roomKey,
            roomName: roomName,
          })
        );
    }
  }, [roomKey, roomName]);

  const sendMessage = () => {
    const inputValue = inputRef?.current?.value.trim() ?? "";
    if (!inputValue) {
      toast("message can not be empty");
      return;
    }
    const data = {
      type: dataTypes.chat,
      payload: {
        message: inputValue,
      },
    };
    if(inputRef.current)inputRef.current.value = ""
    try {
      socketRef.current?.send(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      toast(error as string);
    }
  };

  return (
    <>
      <div className="bg-slate-900 min-h-screen flex justify-center items-center">
        <div className="flex  flex-col h-[80vh] min-w-[75vw] justify-between  ">
          <div className="flex justify-between mb-2">
            <div className="text-white px-3 py-2 text-sm w-fit  rounded-full bg-fuchsia-950 ">
              Room Name: <span className="font-bold text-md">{roomName}</span>
            </div>
            <div className="text-white px-3 py-2 text-sm w-fit  rounded-full bg-fuchsia-950 ">
              Room Key: <span className="font-bold text-md">{roomKey}</span>
            </div>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="px-6 text-white bg-red-900 rounded-full"
            >
              Exit
            </button>
          </div>
          <div className="h-[90vh] bg-gray-500/75 text-white overflow-y-auto rounded-lg p-6 flex flex-col hover:border-2 hover:border-[#D4C9BE] ">
            {true ? (
              messages.map((message, key) => (
                <>
                  {message?.senderId === message?.receiverId ? (
                    <div  key={key} className="w-full h-fit flex p-2 justify-end">
                      <span
                        key={key}
                        className="bg-blue-200 w-fit p-2 rounded-br-xl rounded-t-xl text-slate-800"
                      >
                        {message?.message}
                      </span>
                    </div>
                  ) : (
                    <div  key={key} className="w-full h-fit flex p-2 ">
                      <span
                       
                        className="bg-white w-fit p-2 rounded-br-xl rounded-t-xl text-slate-800"
                      >
                        {message?.message}
                      </span>
                    </div>
                  )}
                </>
              ))
            ) : (
              <div className="flex justify-center items-center min-w-full min-h-full">
                <div className="border-2 border-white border-t-transparent rounded-full w-[3vw] h-[3vw] animate-spin" />
              </div>
            )}
          </div>
          {isValidConnection && (
            <div className="text-white flex items-center gap-2 p-2">
              <input
                ref={inputRef}
                className="p-2 w-full bg-white text-slate-800  rounded"
                placeholder="Message... "
              ></input>
              <button
                onClick={sendMessage}
                className="w-full bg-green-400  hover:animate-pulse  p-2 rounded-lg"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
