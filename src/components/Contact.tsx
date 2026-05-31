
const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-black mb-8">
            CONTACT
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="border-4 border-black p-6 sm:p-8 md:p-12">
            <h3 className="text-3xl font-black text-black mb-8">LET'S CONNECT</h3>
            <p className="text-xl text-black font-medium mb-8 leading-relaxed">
              Always open to conversations about AI, global payments, multilingual technology,
              and where it's all heading. Whether you're building something interesting, thinking
              about the same problems, or just want to connect — reach out.
            </p>
            <p className="text-lg text-black leading-relaxed">
              Also happy to chat about the MBA journey, product management, or what it's like
              building agentic infrastructure at global scale.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-l-4 border-black pl-8">
              <h4 className="text-2xl font-black text-black mb-4">EMAIL</h4>
              <a href="mailto:cesar.monagas@utexas.edu" className="text-xl text-black font-medium hover:underline break-all">
                cesar.monagas@utexas.edu
              </a>
            </div>

            <div className="border-l-4 border-black pl-8">
              <h4 className="text-2xl font-black text-black mb-4">LINKEDIN</h4>
              <a href="https://linkedin.com/in/cesarmonagasromero" target="_blank" rel="noopener noreferrer" className="text-xl text-black font-medium hover:underline break-all">
                linkedin.com/in/cesarmonagasromero
              </a>
            </div>

            <div className="border-l-4 border-black pl-8">
              <h4 className="text-2xl font-black text-black mb-4">GITHUB</h4>
              <a href="https://github.com/cesarmonagas15" target="_blank" rel="noopener noreferrer" className="text-xl text-black font-medium hover:underline break-all">
                github.com/cesarmonagas15
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-20 pt-12 border-t-4 border-black">
          <p className="text-black font-bold text-lg">
            © 2026 CÉSAR MONAGAS ROMERO • BUILT WITH REACT & TAILWIND CSS
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;