
const Hero = () => {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Venezuelan flag color accents */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600"></div>
      
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-black mb-8 leading-[0.8]">
          CÉSAR
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl text-black font-medium mb-4 max-w-3xl mx-auto leading-tight">
          Wanna-be UN Ambassador → <span className="text-blue-600 font-black">Venezuelan</span> builder creating
          <span className="text-red-600 font-black"> AI tools</span> and
          <span className="text-yellow-600 font-black"> nonprofit tech</span>
        </p>

        <div className="flex items-center justify-center gap-2 mb-16">
          <span className="text-4xl">🇻🇪</span>
          <span className="text-2xl">→</span>
          <span className="text-4xl">🌎</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#about"
            className="px-8 py-4 bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            LEARN MORE
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-4 border-red-600 text-red-600 font-bold text-lg hover:bg-red-600 hover:text-white transition-colors"
          >
            CONTACT
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;