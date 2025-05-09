import React, { useState, useRef, useEffect } from 'react';
import { ButtonHover } from './ui/button-hover';
import { cn } from '@/lib/utils';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    
    // Debug: Check if environment variables are loaded
    console.log('Environment variables:', {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setFormStatus(null);

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      if (result.text === 'OK') {
        console.log('Email sent successfully');
        setFormStatus('success');
        setFormData({ user_name: '', user_email: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark-300">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get In <span className="heading-highlight">Touch</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Interested in working together or have a question? Feel free to reach out and I'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="opacity-0 animate-slide-in-left">
            <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-dark-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email</h4>
                  <p className="text-neutral-400">
                    <a href="mailto:contact@karllegson.com" className="hover:text-highlight transition-colors">
                      klegson48@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-dark-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Phone</h4>
                  <p className="text-neutral-400">
                    <a href="tel:+1234567890" className="hover:text-highlight transition-colors">
                      +1 (209) 494-4563
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-dark-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Location</h4>
                  <p className="text-neutral-400">California, USA</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-white mt-10 mb-4">Connect With Me</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/karllegson" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-100 p-3 rounded-lg text-neutral-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/karl-legson/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-100 p-3 rounded-lg text-neutral-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="opacity-0 animate-slide-in-right">
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-neutral-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className="w-full bg-dark-100 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight/50 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="user_email" className="block text-sm font-medium text-neutral-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    className="w-full bg-dark-100 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight/50 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full bg-dark-100 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight/50 focus:border-transparent transition-all resize-none"
                    required
                  ></textarea>
                </div>
              </div>
              
              <ButtonHover 
                className={cn(
                  "w-full justify-center bg-highlight hover:bg-highlight/90 text-white",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </ButtonHover>
              
              {formStatus && (
                <div 
                  className={cn(
                    "mt-4 p-4 rounded-lg text-center",
                    formStatus === 'success' ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                  )}
                >
                  {formStatus === 'success' 
                    ? "Thank you! Your message has been sent successfully!" 
                    : "There was an error sending your message. Please try again."}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
