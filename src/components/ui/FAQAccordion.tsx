import { useState } from "react";

const faqs = [
  {
    question: "What is the standard CGPA to percentage conversion formula in India?",
    answer: "The CGPA to percentage conversion formula in India depends on your specific university or board. For instance, the standard CBSE CGPA to percentage formula involves multiplying your CGPA by 9.5. However, universities like SPPU or Mumbai University may use a multiplier of 10 or a custom formula. You can use our CGPA to percentage calculator to quickly find your exact percentage without any manual math."
  },
  {
    question: "How can I calculate my overall CGPA from all my semesters?",
    answer: "You can easily find your final grade using our all semester SGPA to CGPA calculator. Just enter the SGPA and total credits for each completed semester. This total SGPA to CGPA calculator uses the weighted average method to give you an accurate result. It perfectly supports various university guidelines, including those looking for a convert SGPA to CGPA calculator VTU format."
  },
  {
    question: "How do I know how many classes I need to attend to maintain 75%?",
    answer: "Our 75 attendance calculator is designed exactly for this! By entering your total conducted classes and attended classes into our college attendance calculator, the tool will instantly tell you how many upcoming classes you must attend to reach the safe 75% mark, or how many you can safely bunk."
  },
  {
    question: "Can I calculate my SGPA using individual subject grades?",
    answer: "Yes, absolutely. If you don't know your final semester score yet, you can use our subject wise SGPA calculator. Simply input the credit points and the grade you expect (or received) for each subject, and the tool will accurately generate your SGPA for that specific semester."
  },
  {
    question: "How does the CGPA target calculator work?",
    answer: "If you have a dream company or placement criteria in mind, our CGPA target calculator is your best friend. You just need to enter your current CGPA, the number of semesters completed, and your target CGPA. The calculator will tell you the exact minimum SGPA you need to score in your remaining semesters to hit your goal."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`rounded-[8px] border transition-colors duration-200 ${isOpen ? 'border-ink bg-canvas shadow-level-1' : 'border-hairline bg-canvas-soft hover:bg-canvas'}`}
          >
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              onClick={() => toggleAccordion(index)}
              aria-expanded={isOpen}
            >
              <span className="body-lg font-medium text-ink pr-4">{faq.question}</span>
              <span className="flex-shrink-0 text-mute transition-transform duration-200" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="px-5 pb-5 pt-1">
                <p className="body-md text-body">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
