import React from 'react';
import { Button } from './ui/button'; // Assuming button component is available

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header/Navbar (Placeholder) */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">SkillRelay</div>
        <nav>
          {/* <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-primary">Features</a></li>
            <li><a href="#" className="hover:text-primary">How It Works</a></li>
            <li><a href="#" className="hover:text-primary">Contact</a></li>
          </ul> */}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center py-20 md:py-32 px-4 bg-gradient-to-br from-background to-secondary/10">
        <div className="max-w-4xl mx-auto z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground mb-6">
            Unlock Your Potential with <span className="text-primary">SkillRelay</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            A progressive web app for learners and creators to access, upload, and monetize short-form skills.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full text-lg shadow-lg transition duration-300">
              Start Learning
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-accent/10 px-8 py-3 rounded-full text-lg shadow-lg transition duration-300">
              Become a Creator
            </Button>
          </div>
        </div>
        {/* Optional: Background shapes/graphics */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          How SkillRelay Empowers You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1: Access */}
          <div className="bg-card rounded-xl shadow-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-primary mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-5 4v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2a1 1 0 01-1-1zm-7-4h4a1 1 0 011 1v4a1 1 0 01-1 1H3a1 1 0 01-1-1v-4a1 1 0 011-1z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Access Diverse Skills</h3>
            <p className="text-muted-foreground">
              Explore a vast and growing library of short-form video tutorials on a wide range of topics, from coding to cooking.
            </p>
          </div>

          {/* Feature Card 2: Upload */}
          <div className="bg-card rounded-xl shadow-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-primary mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Upload & Share Your Expertise</h3>
            <p className="text-muted-foreground">
              Easily upload your own short-form skill videos, build your audience, and establish yourself as an expert.
            </p>
          </div>

          {/* Feature Card 3: Monetize */}
          <div className="bg-card rounded-xl shadow-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-primary mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 12m-6-4h4a2 2 0 012 2v4a2 2 0 01-2 2h4m-7 0H3a2 2 0 01-2-2v-4a2 2 0 012-2h4m7-4v2m-6 0H9"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Monetize Your Skills</h3>
            <p className="text-muted-foreground">
              Turn your passion into profit by monetizing your content through various flexible options.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Skill Journey?</h2>
          <p className="text-lg md:text-xl mb-8">
            Join SkillRelay today and begin learning, creating, and earning.
          </p>
          <Button className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-10 py-4 rounded-full text-xl font-semibold shadow-lg transition duration-300">
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-8 text-center">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} SkillRelay. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;