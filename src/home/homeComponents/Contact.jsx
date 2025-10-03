"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  Mail, 
  MapPin, 
  MessageCircle,
  Phone, 
  Send,
  Car, // Added relevant GPS/IoT Icon
  Server // Added relevant GPS/IoT Icon
} from 'lucide-react';
// This import assumes you have this file structure in your project.
import { useSendContactMutation } from '../../app/api/authApiSlice';

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// A new component for the thank you page
const ThankYouPage = () => {
  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center bg-white p-10 rounded-2xl shadow-2xl"
      >
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Your message has been received. Our GPS Tracking team will connect with you shortly.
        </p>
         <div className="mt-8 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
            />
        </div>
      </motion.div>
    </div>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  // State to manage which "page" is shown
  const [currentPage, setCurrentPage] = useState('contact');
  const [sendContact, { isLoading }] = useSendContactMutation();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendContact(formData).unwrap();
      
      // Clear form and switch to the thank you page
      setFormData({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
      setCurrentPage('thankyou');

      // After 5 seconds, switch back to the contact page
      setTimeout(() => {
        setCurrentPage('contact');
      }, 5000);

    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Something went wrong! Please try again.");
    }
  };

  // If on the thank you page, render only that component
  if (currentPage === 'thankyou') {
    return <ThankYouPage />;
  }

  // Otherwise, render the main contact page
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 text-gray-900 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
               Connect with Our GPS & Telematics Experts
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              We’re ready to assist with your Fleet Management, IoT Asset Tracking, or Real-time GPS integration needs. Let's discuss how our solutions can optimize your operations.
              </p>
          
            </motion.div>
          </div>
        </div>

      {/* Contact Form and Info Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Form Container */}
            <AnimatedSection className="lg:col-span-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Inquire About Our GPS Solutions</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="+91 12345 67890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    {/* Updated options for GPS/IoT focus */}
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="pricing">Pricing for Fleet/IoT Tracking</option>
                      <option value="custom-solution">Custom Telematics API Integration</option>
                      <option value="bulk-verification">Bulk Device/Asset Tracking Requirements</option>
                      <option value="technical-support">Technical Support (Hardware/Platform)</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us about your fleet size, asset type, and tracking needs..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                  </motion.button>
                  
                </form>
              </div>
            </AnimatedSection>
            
            {/* Office Info Card */}
            <AnimatedSection className="lg:col-span-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Telematics Center</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Headquarters (Data & Support)</h4>
                      <p className="text-gray-600">
                         Dwarka sector 19B, <br />
                        New Delhi 110071,<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Telematics Support Hours</h4>
                      <p className="text-gray-600">
                        Monday - Saturday: 10:00 AM - 7:00 PM<br />
                        
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-48 bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/self-taken/image/upload/v1759515665/GPS_Controller_Buiding_okytpn.png"
                    alt="GPS/IoT Monitoring Center"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p className="font-medium mb-1">Key Landmarks (Near Our Data Hub):</p>
                  <ul className="space-y-1">
                    <li>• 5 minutes from Saritavihar Metro Station</li>
                    <li>• Next to Tata Motor Service center</li>
                    <li>• Near to Air Liquid</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="mt-8">
            <div className="w-full bg-white rounded-2xl shadow-xl p-8 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0184801166723!2d77.36493931492027!3d28.627338382418994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5081e611bfb%3A0x37f95780f9c6a61e!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh%20201309!5e0!3m2!1sen!2sin!4v1627900126520!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </AnimatedSection>

          {/* Quick and Department Contacts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <AnimatedSection>
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Sales Inquiry</p>
                      <p className="text-blue-600">sales@gpscontroller.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Technical Support</p>
                      <p className="text-green-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Fleet Onboarding Support</p>
                      <p className="text-purple-600">+91 98765 43211</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Department Contacts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Sales & Pricing</span>
                    <span className="text-blue-600 font-medium">sales@gpscontroller.com</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">API & Integration Support</span>
                    <span className="text-green-600 font-medium">api@gpscontroller.com</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Partnership & Media</span>
                    <span className="text-purple-600 font-medium">media@gpscontroller.com</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;