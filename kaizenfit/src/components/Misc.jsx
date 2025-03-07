export default function Misc(){

    return(
        <>
<div className="relative h-screen w-full bg-gradient-to-bl from-cyan-900 via-slate-900 to-black">
    
<div className="absolute top-4 right-4 flex space-x-4">
  <button className="px-6 py-3 bg-cyan-700 text-white rounded-lg hover:bg-cyan-500 transition duration-300 ease-in-out transform hover:scale-105">
    Get Started
  </button>
  <button className="px-6 py-3 border border-gray-500 text-white rounded-lg hover:bg-cyan-500 transition duration-200 ease-in-out transform hover:scale-105">
    Request a Demo →
  </button>
</div>


<section className="h-full flex flex-col justify-center items-center text-white text-center">
  <h1 className="text-4xl md:text-6xl font-bold">
    Transform Your Business <br /> With Our 
    <span className="italic text-cyan-400"> SaaS Solution</span>
  </h1>
  <p className="mt-4 text-gray-300 text-lg max-w-2xl">
    Streamline operations, boost productivity, and enhance customer satisfaction with cutting-edge technology.
  </p>
</section>
</div>

<section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white">
<div className="max-w-6xl mx-auto px-6 text-center">
<h2 className="text-4xl md:text-5xl font-extrabold text-cyan-400">
Why Choose Our Fitness Tracker?
</h2>
<p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
Elevate your fitness journey with AI-driven analytics, real-time tracking, and personalized workout plans.
</p>


<div className="mt-12 grid md:grid-cols-3 gap-10">

<div className="p-6 bg-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 hover:scale-105 transition duration-300">
  <div className="text-5xl text-cyan-400">🔥</div>
  <h3 className="mt-4 text-xl font-bold">AI-Powered Workouts</h3>
  <p className="mt-2 text-gray-400">
    Get personalized routines with AI-driven recommendations based on your performance.
  </p>
</div>


<div className="p-6 bg-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 hover:scale-105 transition duration-300">
  <div className="text-5xl text-cyan-400">📊</div>
  <h3 className="mt-4 text-xl font-bold">Real-Time Performance Tracking</h3>
  <p className="mt-2 text-gray-400">
    Monitor your heart rate, calories burned, and progress in real-time.
  </p>
</div>


<div className="p-6 bg-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 hover:scale-105 transition duration-300">
  <div className="text-5xl text-cyan-400">🌍</div>
  <h3 className="mt-4 text-xl font-bold">Global Fitness Community</h3>
  <p className="mt-2 text-gray-400">
    Join a community of fitness enthusiasts, compete in challenges, and stay motivated.
  </p>
</div>
</div>
</div>
</section>
</>);

}