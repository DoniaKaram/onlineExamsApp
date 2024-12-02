import React from 'react';
import Image from 'next/image';
function Footer() {
  return (
    <>
     <div className="flex flex-col gap-4 justify-center items-center">
    <div>
    <div className=" flex gap-3 items-center">
        <div className="divider h-[1px] bg-[#E7E7E7] w-12"></div>
        <p> or Continue with</p>
        <div className="divider  h-[1px] bg-[#E7E7E7] w-12"></div>
      </div>
    </div>
    <div>
    <div className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
          <Image width={20} height={20} alt="google" src={"/Facebook Button.png"} />
        </div>
        <div className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
          <Image width={20} height={20} alt="google" src={"/Apple Button.png"} />
        </div>
        <div className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
          <Image width={20} height={20} alt="google" src={"/Twitter Button.png"} />
        </div>
        <div
          
          className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer"
        >
          <Image width={20} height={20} alt="google" src={"/Google Button.png"} />
        </div>
    </div>
        
      </div>
    </>
  );
}

export default Footer;
