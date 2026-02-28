// src/pages/Home.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CountUp from "react-countup";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgImage from "../assets/bg.jpeg";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    const cursorGlow = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorGlow);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const magneticButtons = document.querySelectorAll('a, button');
    magneticButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      button.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });

    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', handleMouseMove);
      updateCursor();
    }

    const reveals = document.querySelectorAll(".fade-in");
    reveals.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero-parallax');
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (cursor.parentNode) cursor.remove();
      if (cursorGlow.parentNode) cursorGlow.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'blur(6px)',
          opacity: 0.18,
          transform: 'scale(1.05)',
          pointerEvents: 'none'
        }}
      />

      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center hero-parallax relative z-10">
        <div className="animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              AkshayPatra
            </span>
          </h1>
          <p className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            From Surplus to Smiles
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            Connecting donors and NGOs to fight hunger — ensuring no plate is left empty.
          </p>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Join the Movement
          </Link>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="max-w-7xl mx-auto px-6 py-20 fade-in relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 md:p-16 border border-green-100 dark:border-green-900/30">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Our Impact
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-2">
                <CountUp end={2456} duration={2.5} separator="," />
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">kg Food Saved</div>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-2">
                <CountUp end={9824} duration={2.5} separator="," />
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Meals Provided</div>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-2">
                <CountUp end={156} duration={2.5} />
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Active Donors</div>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-2">
                <CountUp end={312} duration={2.5} />
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Families Helped</div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌾 FARMER PLATFORM SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 fade-in relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 md:p-16 border border-green-100 dark:border-green-900/30 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Also Built for Farmers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
            AkshayPatra Harvest is our dedicated platform helping farmers sell surplus produce,
            reduce waste, and connect directly with buyers.
          </p>
          <a
            href="https://akshaypatra-harvest.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-green-600 to-emerald-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Explore AkshayPatra Harvest →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-8 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} AkshayPatra — From Surplus to Smiles
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;