/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Layout from './components/Layout';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Portfolio from './components/Portfolio';
import Quiz from './components/Quiz';
import Advantages from './components/Advantages';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import CTAFinal from './components/CTAFinal';
import Footer from './components/Footer';
import TimedPopup from './components/TimedPopup';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollProgress from './components/ScrollProgress';
import { sectionVariants } from './lib/motion';

const sectionViewport = { once: true, margin: '-60px' as const };

export default function App() {
  return (
    <Layout>
      <ScrollProgress />
      <Header />

      <Hero />

      <motion.div initial="hidden" whileInView="visible" viewport={sectionViewport} variants={sectionVariants}>
        <TrustBar />
      </motion.div>

      {/* Components below have their own whileInView animations — no outer wrapper */}
      <Portfolio />

      <motion.div initial="hidden" whileInView="visible" viewport={sectionViewport} variants={sectionVariants}>
        <Quiz />
      </motion.div>

      <Advantages />

      <Process />

      <Pricing />

      <Reviews />

      <motion.div initial="hidden" whileInView="visible" viewport={sectionViewport} variants={sectionVariants}>
        <FAQ />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={sectionViewport} variants={sectionVariants}>
        <CTAFinal />
      </motion.div>

      <Footer />

      <TimedPopup />
      <WhatsAppButton />
    </Layout>
  );
}
