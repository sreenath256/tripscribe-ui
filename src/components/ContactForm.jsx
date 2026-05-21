import { useState } from "react";
import { Mail } from "lucide-react";

const ContactForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // 2. Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Handle Form Submission (WhatsApp Integration)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill in all fields before sending.");
            return;
        }

        // Format the message
        const phoneNumber = "8138099941";
        const text = `*New Inquiry from Tripscribe Website*%0a%0a*Name:* ${formData.name}%0a*Email:* ${formData.email}%0a*Message:* ${formData.message}`;

        // Create the WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, "_blank");

        // 🔄 Reset form
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-widest text-white/60 uppercase font-sans">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-widest text-white/60 uppercase font-sans">
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email Address"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-teal-500/20 p-1 rounded">
                            <Mail size={16} className="text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Message */}
            <div>
                <label className="block text-xs tracking-widest text-white/60 uppercase font-sans mb-4">
                    Comments / Questions
                </label>
                <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message Here"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                ></textarea>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-primary hover:bg-white text-white hover:text-black transition duration-200 border border-white/10  cursor-pointer font-semibold text-sm tracking-wider uppercase py-4 rounded-xl  active:scale-[0.99] md:mt-4"
            >
                Send Message
            </button>
        </form>
    )
}


export default ContactForm