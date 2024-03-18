'use client'
import ConnectionForm from "./_components/connection-form";

const MeetUp = () => {  
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="p-[3rem] border shadow-lg rounded-md">
        <h2 className="mb-6 text-3xl font-bold text-center">
          Connect to your <span className="text-accent-text">mentors</span> Worldwide!
        </h2>
        <ConnectionForm />
      </div>
    </main>
  );
};

export default MeetUp;