import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, UserIcon, EnvelopeIcon, ChatBubbleLeftRightIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import DarkVeil from '../../components/ui/DarkVeil';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    title: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        title: '',
        description: ''
      });
    }, 3000);
  };

  const isFormValid = formData.fullName && formData.email && formData.title && formData.description;

  return (
    <div className="min-h-screen relative pt-20 pb-12">
      <div className="absolute inset-0">
        <DarkVeil 
          hueShift={180}
          noiseIntensity={0.1}
          scanlineIntensity={0.05}
          speed={0.3}
          scanlineFrequency={0.01}
          warpAmount={0.1}
        />
      </div>
      <div className="absolute inset-0 bg-primary-dark/30"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 mt-[45px]"
        >
          <h1 className="text-4xl md:text-5xl font-bitcount text-secondary mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-300 font-dmsans text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from you. 
            Send me a message and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <PaperAirplaneIcon className="w-8 h-8 text-primary-dark" />
              </div>
              <h3 className="text-2xl font-bitcount text-secondary mb-2">Message Sent!</h3>
              <p className="text-gray-300 font-dmsans">
                Thank you for reaching out. I'll get back to you soon!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label htmlFor="fullName" className="block text-sm font-dmsans font-medium text-gray-300 mb-2">
                    <UserIcon className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-primary-dark border border-gray-600 rounded-lg text-white font-dmsans placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                    placeholder="Enter your full name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label htmlFor="email" className="block text-sm font-dmsans font-medium text-gray-300 mb-2">
                    <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-primary-dark border border-gray-600 rounded-lg text-white font-dmsans placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                    placeholder="Enter your email address"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label htmlFor="title" className="block text-sm font-dmsans font-medium text-gray-300 mb-2">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-2" />
                  Subject
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary-dark border border-gray-600 rounded-lg text-white font-dmsans placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                  placeholder="What's this about?"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label htmlFor="description" className="block text-sm font-dmsans font-medium text-gray-300 mb-2">
                  <DocumentTextIcon className="w-4 h-4 inline mr-2" />
                  Message
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-primary-dark border border-gray-600 rounded-lg text-white font-dmsans placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors resize-none"
                  placeholder="Tell me more about your project or inquiry..."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex justify-center"
              >
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`px-8 py-4 rounded-lg font-dmsans font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isFormValid && !isSubmitting
                      ? 'bg-secondary text-primary-dark hover:bg-secondary/90 hover:scale-105 shadow-lg hover:shadow-secondary/25'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-dark border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 font-dmsans text-sm">
            You can also reach me directly at{' '}
            <a href="mailto:your.email@example.com" className="text-secondary hover:underline">
              your.email@example.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;