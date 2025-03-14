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





<div class="flex h-screen">
  <!-- Sidebar -->
  <aside class="w-64 bg-black text-white flex flex-col">
    <div class="p-4 font-bold text-xl">My Fitness</div>
    <nav class="flex flex-col mt-6 space-y-4">
      <a href="#" class="hover:bg-slate-700 px-4 py-2 rounded">Dashboard</a>
      <a href="#" class="hover:bg-slate-700 px-4 py-2 rounded">Course Schedule</a>
      <a href="#" class="hover:bg-slate-700 px-4 py-2 rounded">Yoga</a>
      <a href="#" class="hover:bg-slate-700 px-4 py-2 rounded">Meals</a>
      <a href="#" class="hover:bg-slate-700 px-4 py-2 rounded">Chat</a>
      <a href="#" class="hover:bg-slate-700 px-4 py-2 rounded">Profile</a>
    </nav>
    <div class="relative group mt-auto p-4 ">
      <button class="w-full bg-slate-900 text-white px-6 py-3 rounded-lg overflow-hidden relative hover:bg-slate-700">
    Logout
  </button></div>
  </aside>

  <!-- Main Content -->
  <main class="flex-grow bg-gradient-to-br from-black via-blue-950 to-cyan-950 p-6">
    <!-- Header -->
    <header class="flex justify-between items-center bg-slate-900 shadow-cyan-500/50 text-cyan-100 p-4 rounded-md">
      <div>Hello Juli! Stay hydrated today.</div>
      <div>18 Mar 2025, Wednesday</div>
    </header>

    <!-- Dashboard Content -->
    <section class="mt-6 grid grid-cols-3 gap-6">
      <!-- Metric Cards -->
      <div class="bg-slate-900 text-cyan-100 p-4 rounded-lg shadow-md">
        <h3>Heart Rate</h3>
        <p>72 BPM</p>
      </div>
      <div class="bg-slate-900 text-cyan-100 p-4 rounded-lg shadow-md">
        <h3>Energy Burn</h3>
        <p>120 kcal</p>
      </div>
      <div class="bg-slate-900 text-cyan-100 p-4 rounded-lg shadow-md">
        <h3>Swimming</h3>
        <p>01 hrs</p>
      </div>
    </section>

    <!-- Additional Sections -->
    <section class="mt-6 grid grid-cols-[2fr_1fr] gap-x-[20px]">
      <!-- Yoga Activity Chart -->
      <div class="bg-slate-900 text-cyan-100 shadow-md p-6 rounded-lg">
        <h3>Yoga Activity</h3>
        <!-- Add chart here or placeholder -->
        <div class="grid grid-cols-[repeat(7,_1fr)] gap-x-[10px] mt-[20px]">
          <!-- Example Bars -->
          <div class="h-[50px] bg-blue-[500]"></div>
          <!-- Repeat similar divs for other days -->
        </div>
      </div>

      <!-- Meal Statistics -->
      <div class="bg-slate-900 text-cyan-100 shadow-md p-6 rounded-lg">
        <h3>Meal Statistics</h3>
        <!-- Add chart or placeholder -->
        <p>230 kcal</p>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="mt-[20px] flex justify-between space-x-[10px] ">
    </section>




