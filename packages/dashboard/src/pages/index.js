import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const OrangeButton = ({ text, link }) => {
  const router = useRouter();

  const buttonStyle = {
    backgroundColor: 'orange',
    color: 'white',
    borderRadius: '20px', // Adjust the radius as needed
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  };

  const handleButtonClick = () => {
    router.push(link);
  };

  return (
    <button style={buttonStyle} onClick={handleButtonClick}>
      {text}
    </button>
  );
};



export default function TitleImageLayout() {
  return (
    <div>
      <div className="flex items-center justify-center p-8">
        <div className="max-w-2xl text-center pr-8 font-serif">
          <h1 className="text-4xl font-bold mb-4 text-left"> Innovating Customer Support</h1>
          <p className="text-gray-600 text-left">The GitHelp app is an embedded tool for websites that leverages artificial intelligence to categorize and prioritize customer complaints. Using this data, the app automatically generates GitHub issues for companies, streamlining the issue resolution process. Additionally, it facilitates connections between companies and potential workers with the expertise to address specific complaints, fostering efficient issue resolution and collaboration.</p>
        </div>
        <div className="flex-shrink-0">
          <Image
            src="https://i.imgur.com/Jx0zvxo.pngg"
            alt="Your Image"
            width={400}
            height={300}
          />
        </div>
      </div>
      <div className="text-center pr-8 font-serif">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="max-w-2xl text-center pr-8 font-serif">
          <h1 className="text-4xl mb-4 text-left"> Receive Complaints</h1>
          <p className="text-gray-600 text-left">GitHelp empowers you with an easily embeddable widget, ensuring a seamless customer feedback integration into your platform. </p>
        </div>
        <div className="max-w-2xl text-center pr-8 font-serif">
          <h1 className="text-4xl mb-4 text-left"> Categorize Problems</h1>
          <p className="text-gray-600 text-left">This widget stores all of the customer complaints and harnesses the power of artificial intelligence to efficiently categorize and prioritize customer complaints</p>
        </div>
        <div className="max-w-2xl text-center pr-8 font-serif">
          <h1 className="text-4xl mb-4 text-left"> Tag Issues</h1>
          <p className="text-gray-600 text-left">As a result, it automatically generates GitHub issues, streamlining the resolution process for your company</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <OrangeButton text="Sign Up" link="/login" />
      </div>
    </div>
  );
}
