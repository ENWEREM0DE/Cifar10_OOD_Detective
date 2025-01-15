'use client'
import React, { useState, useEffect } from 'react';
import { Search, Coffee } from 'lucide-react';

const CaseFiles: React.FC = () => {
  const [typedText, setTypedText] = useState<string>(''); // Added type for state
  const [showToasterMessage, setShowToasterMessage] = useState<boolean>(false); // Added type for state

  useEffect(() => {
    const text =
      "Picture this: you've trained a robot to recognize cats, dogs, and birds. It's crushing it—until someone shows it a toaster.";
    let i = 0;
    const typingEffect: NodeJS.Timeout = setInterval(() => { // Explicitly typed setInterval
      if (i < text.length) {
        setTypedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 50);

    return () => clearInterval(typingEffect); // Cleanup interval
  }, []);

  return (
    <section id="case-files" className="my-8 bg-[#1A1A2E] p-6 rounded-lg shadow-md border border-[#FFD700]">
      <h2 className="font-serif text-3xl font-bold text-[#FFD700] mb-6 flex items-center">
        <Search className="mr-2" />
        The Case Files
      </h2>
      <div className="md:columns-2 gap-8 text-[#F5F5DC] space-y-4 font-serif text-lg leading-relaxed">
        <p>
          {typedText}
          <span className="text-[#FFD700] font-bold"> "Ah, the rare metallic bird!"</span> it exclaims. Enter Out of
          Distribution (OOD) Data—the chaos when your model faces the unknown and starts guessing wildly. Detecting OOD
          data gives your model the superpower to say, <span className="text-[#FFD700] italic">"No clue what this is, but it's definitely not a cat."</span>
        </p>
        <p>
          Meet the CIFAR-10 OOD Detective! Trained on CIFAR-10's 10 classes—airplane, automobile, bird, cat, deer, dog,
          frog, horse, ship, and truck—it doesn't just classify images. Feed it something bizarre (like a pizza, dragon,
          or grandma's knitting), and instead of winging it, it flags the oddball with a confident{' '}
          <span className="text-[#FFD700] font-bold">"Not in my league!"</span> Think of it as a bouncer for your model,
          ensuring only familiar data gets in while the weird stuff stays out. Because let's be honest, not everything
          in life is a truck or a frog.
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          className="bg-[#1A1A2E] text-[#FFD700] border-2 border-[#FFD700] px-6 py-3 rounded-full font-serif text-lg font-bold flex items-center hover:bg-[#800020] transition-colors duration-300"
          onClick={() => (window.location.href = '#interrogate')}
        >
          Interrogate an Image <Search className="ml-2" />
        </button>
      </div>
      <div
        className="mt-4 text-center cursor-pointer"
        onClick={() => setShowToasterMessage(true)}
        onMouseLeave={() => setShowToasterMessage(false)}
      >
        <Coffee className="inline-block text-[#FFD700] mr-2" />
        <span className="text-[#F5F5DC] underline">Click here for a surprise!</span>
      </div>
      {showToasterMessage && (
        <div className="fixed bottom-4 right-4 bg-[#FFD700] text-[#1A1A2E] p-4 rounded-lg shadow-lg">
          Definitely not a bird!
        </div>
      )}
    </section>
  );
};

export default CaseFiles;
