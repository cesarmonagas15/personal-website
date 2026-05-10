import headshotImg from '../assets/headshot.png';
import graduationImg from '../assets/graduation.jpeg';

const About = () => {
  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-8">
            ABOUT
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 mb-16">
          {/* Left Column: Photos */}
          <div className="space-y-6">
            <div className="border-4 border-white">
              <img 
                src={headshotImg}
                alt="César Monagas Romero"
                className="w-full aspect-square object-cover object-[40%_70%]"
              />
            </div>
            <div className="border-4 border-white">
              <img 
                src={graduationImg}
                alt="Graduation at UT Austin"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          {/* Middle Column: Info Blocks */}
          <div className="space-y-8">
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-2xl font-bold text-white mb-4">EDUCATION</h3>
              <p className="text-white font-medium mb-2">University of Texas at Austin</p>
              <p className="text-gray-300 mb-1">Double Major: Management Information Systems & French Studies</p>
              <p className="text-gray-300 mb-1">Minor: Computer Science</p>
              <p className="text-gray-400">Graduating December 2025</p>
            </div>

            <div className="border-l-4 border-white pl-6">
              <h3 className="text-2xl font-bold text-white mb-4">LOCATION</h3>
              <p className="text-white font-medium">Austin, TX</p>
              <p className="text-gray-300">Originally from Venezuela 🇻🇪</p>
              <p className="text-gray-400">U.S. Citizen • No work restrictions</p>
            </div>

            <div className="border-l-4 border-white pl-6">
              <h3 className="text-2xl font-bold text-white mb-4">LANGUAGES</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-white font-medium mb-2">FLUENT</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-red-600 text-white font-medium">SPANISH</span>
                    <span className="px-3 py-1 bg-blue-600 text-white font-medium">ENGLISH</span>
                    <span className="px-3 py-1 bg-yellow-600 text-black font-medium">FRENCH</span>
                    <span className="px-3 py-1 bg-purple-600 text-white font-medium">ASL</span>
                  </div>
                </div>
                <div>
                  <p className="text-white font-medium mb-2">LEARNING</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 border-2 border-white text-white font-medium">GERMAN</span>
                    <span className="px-3 py-1 border-2 border-white text-white font-medium">PORTUGUESE</span>
                    <span className="px-3 py-1 border-2 border-white text-white font-medium">CATALAN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Skills */}
          <div className="space-y-8">
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-2xl font-bold text-white mb-4">TECHNICAL</h3>
              <ul className="text-white space-y-2">
                <li>Full-Stack Development</li>
                <li>AI/ML Platforms</li>
                <li>System Architecture</li>
                <li>Database Design</li>
                <li>API Development</li>
              </ul>
            </div>

            <div className="border-l-4 border-white pl-6">
              <h3 className="text-2xl font-bold text-white mb-4">BUSINESS</h3>
              <ul className="text-white space-y-2">
                <li>Product Management</li>
                <li>Strategy Consulting</li>
                <li>Cross-functional Leadership</li>
                <li>Agile Methodologies</li>
                <li>Stakeholder Management</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Bio Text */}
        <div className="max-w-5xl mx-auto">
          <div className="border-4 border-white p-6 sm:p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-8">MY STORY</h3>
            
            <div className="grid lg:grid-cols-2 gap-12 text-white text-lg leading-relaxed">
              <div className="space-y-6">
                <p>
                  My journey began in Venezuela, where I lived until high school when my family and I 
                  moved to the United States fleeing political unrest. Arriving without speaking 
                  any English, I discovered a deep passion for languages that has shaped who I am today.
                </p>

                <p>
                  This linguistic curiosity mirrors my approach to technology: always eager to learn new 
                  "languages," whether programming or human. I thrive at the intersection of technical 
                  depth and business strategy.
                </p>
              </div>
              
              <div className="space-y-6">
                <p>
                  My experience spans software engineering, strategy consulting, and product management for 
                  AI/ML platforms. I leverage my multicultural perspective to help organizations solve 
                  complex challenges and drive meaningful outcomes.
                </p>

                <p>
                  Currently seeking full-time opportunities where I can contribute my diverse background, 
                  resilience, and passion for innovation to help companies succeed in our connected world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;