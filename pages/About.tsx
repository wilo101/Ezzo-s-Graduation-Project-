import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-40 pb-20 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-[var(--text-primary)] tracking-tight">
            Truth in the age of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] to-purple-500">Synthetic Media.</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            We are building the trust layer for the internet. Detecting deepfakes, verifying audio origin, and protecting digital integrity.
          </p>
        </motion.div>
      </div>

      {/* Mission Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-32">
        {[
          { icon: ShieldCheck, title: "Verify Reality", desc: "Our engine analyzes spectral artifacts invisble to humans to determine 99.8% authenticity." },
          { icon: Cpu, title: "AI vs AI", desc: "Using adversarial networks to detect the latest generation of voice clones and TTS engines." },
          { icon: Users, title: "Democratized Truth", desc: "Providing accessible forensic tools to journalists, researchers, and the public." }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-8 rounded-3xl text-center hover:bg-[var(--bg-surface)] transition-colors group shadow-[var(--glass-shadow)]"
          >
            <div className="w-16 h-16 mx-auto bg-[var(--bg-primary)] rounded-2xl flex items-center justify-center mb-6 text-[var(--accent-color)] group-hover:scale-110 transition-transform shadow-inner">
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">{item.title}</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Story Section */}
      <div className="max-w-5xl mx-auto bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[3rem] overflow-hidden shadow-2xl mb-24">
        <div className="grid md:grid-cols-2">
          <div className="p-12 md:p-16 flex flex-col justify-center">
            <div className="uppercase tracking-widest text-xs font-bold text-[var(--accent-color)] mb-4">The Origin</div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Born from Necessity</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              As AI voice synthesis technology advanced, the line between reality and fabrication blurred.
              TrustEra was founded to provide journalists, legal experts, and security professionals with
              the tools needed to verify audio authenticity.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We believe that digital truth is a fundamental right, not a luxury.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-primary)] p-12 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--accent-color)]/5"></div>
            {/* Abstract Art */}
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 border-2 border-[var(--accent-color)]/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 border-2 border-purple-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Award className="w-16 h-16 text-[var(--accent-color)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pb-20">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Ready to secure your content?</h2>
        <Link
          to={AppRoute.ANALYZER}
          className="inline-flex items-center gap-2 bg-[var(--accent-color)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
        >
          Start Analysis <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default About;