import { useRef } from "react";
import InputTaker from "./InputTaker";
interface InputModalType {
  open: boolean;
  closeCall: () => void;
  type: string;
}
const InputModal = ({ open, closeCall, type }: InputModalType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {open && (
        <div className="bg-gray-500/30 min-h-screen min-w-screen">
          <InputTaker ref={inputRef} text="Enter Room Id"></InputTaker>
          <button className="text-green-700 p-3 rounded-lg bg-[#F1EFEC]">
            Join a Room
          </button>
        </div>
      )}
    </>
  );
};

export default InputModal;
