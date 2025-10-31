import React from 'react'

import HeroSection from '../components/home/HeroSection'
import About from '../utils/footer/About'
import Footer from '../utils/footer/Footer'
import FeatureSection from '../components/home/FeatureSection'
import HowItWorks from '../components/home/HowItWorks'
import TrendingJobs from '../components/home/TrendingJobs'
import SkillAssessments from '../components/home/SkillAssessments'

import Testimonials from '../components/home/Testimonials'
import CallToAction from '../components/home/CallToAction'

const Homepage = () => {
  return <>
  <div className="bg-gradient-to-b from-white via-sky-50 to-blue-100/30 min-h-screen">
  <HeroSection></HeroSection>
 <FeatureSection></FeatureSection>
 <HowItWorks></HowItWorks>
 <TrendingJobs></TrendingJobs>
 <SkillAssessments></SkillAssessments>

 <Testimonials></Testimonials>
 <CallToAction></CallToAction>
 
  <About></About>
  <Footer></Footer>
  </div>
  </>
}

export default Homepage