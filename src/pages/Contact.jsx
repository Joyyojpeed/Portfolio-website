import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "react-feather";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/mvgkeakj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Form submit failed");
      }

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="page-inner">
        <div className="section-header">
          <span className="section-number">03</span>
          <h1 className="section-title">
            <span className="gridless-zone">Contact</span>
          </h1>
          <div className="section-divider" />
        </div>

        <div className="contact-grid">
          <div>
            <h2 className="contact-title">
              <span className="gridless-zone">
                Let&apos;s work <span>together.</span>
              </span>
            </h2>
            <p className="contact-copy">Fill out the form and I&apos;ll get back to you as soon as possible.</p>

            <div className="contact-info-list">
              <div className="contact-info-item snap-card">
                <span className="info-icon">
                  <Phone size={16} />
                </span>
                <div>
                  <div className="info-label">Phone</div>
                  <div className="info-value">+91 7596923557</div>
                </div>
              </div>

              <div className="contact-info-item snap-card">
                <span className="info-icon">
                  <Mail size={16} />
                </span>
                <div>
                  <div className="info-label">Email</div>
                  <div className="info-value">jds472016@gmail.com</div>
                </div>
              </div>

              <div className="contact-info-item snap-card">
                <span className="info-icon">
                  <MapPin size={16} />
                </span>
                <div>
                  <div className="info-label">Address</div>
                  <div className="info-value">Kolkata, West Bengal, India</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-surface contact-form-wrap snap-card">
            {submitStatus === "success" && (
              <div className="form-status success">Message sent successfully! I&apos;ll get back to you soon.</div>
            )}

            {submitStatus === "error" && (
              <div className="form-status error">
                Failed to send message. Please try again later or contact me directly at jds472016@gmail.com.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <input
                  className="form-field snap-control"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-field snap-control"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-grid form-grid-offset">
                <input
                  className="form-field snap-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-field snap-control"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <textarea
                className="form-field form-textarea"
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button className="btn-primary form-submit snap-control" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={14} />
                    Let&apos;s Connect
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
