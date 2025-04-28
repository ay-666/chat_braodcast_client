import React, { useEffect, useRef } from "react";
import InputTaker from "../components/InputTaker";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export enum dataTypes{
  chat= "chat",
  create = "create",
  join = "join"
}



const Landing = () => {
    const keyRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    

    const navigate = useNavigate();
    
    const createRoom = () =>{
      const roomName = nameRef?.current?.value.trim() ?? "";
      if(!roomName){
        toast("Room name can not be empty.")
        return;
      }
      const data = {
        type:dataTypes.create,
        payload:{
          roomName:roomName
        }
      };
      
      



      navigate('/chat',{
        state:data
      });


    }

    const joinRoom = () =>{
      const roomKey = keyRef?.current?.value.trim() ?? "";
      if(!roomKey){
        toast("Room key can not be empty.")
        return;
      }
      const data = {
        type:dataTypes.join,
        payload:{
          roomKey:roomKey
        }
      }
      navigate('/chat',{
        state:data
      }) 
    }
   

  return (
    <div>
      <div className="bg-slate-900 min-h-screen flex justify-center items-center">
        <div className="flex  flex-col h-[80vh] min-w-[75vw] justify-between  ">
            <div className="border-2 p-4 text-white border-[#D4C9BE] h-full rounded-xl bg-gray-900">
                <div className="text-center font-semibold font-serif md:text-xl lg:text-3xl">Welcome to Chatify...</div>
                <div className=" flex flex-col justify-evenly items-center  h-full ">
                   <div className="flex font-semibold justify-between  items-center gap-10">
                   <InputTaker ref={keyRef} text="Enter Room Key"></InputTaker>
                   <button onClick={joinRoom} className="text-green-700 hover:animate-pulse p-3 rounded-lg bg-[#D4C9BE]">Join a Room</button>
                   </div>
                   <div className="flex w-[50%] items-center">
                   <div className="border-b-2 border-[#D4C9BE]/50 w-[50%]"></div>
                   <div className="text-lg">OR</div>
                   <div className="border-b-2 border-[#D4C9BE]/50 w-[50%]"></div>
                   </div>
                    <div className="flex font-semibold justify-between  items-center gap-10">
                    <InputTaker ref={nameRef} text="Enter Room Name"></InputTaker>
                    <button onClick={createRoom} className=" p-3 hover:animate-pulse text-purple-800 rounded-lg bg-[#D4C9BE]">Create a Room</button>
                    </div>
                </div>
                
            </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
