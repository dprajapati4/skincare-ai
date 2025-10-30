const Footer = () => {
  return (
    <footer className="w-full bg-[var(--color-sand)] text-center py-8 px-6 mt-auto">
      <p className="text-ink text-sm mb-3">
        &copy; {new Date().getFullYear()} Skincare AI
      </p>
      <p className="text-ink text-xs mb-4 max-w-2xl mx-auto">
        This tool provides general skincare suggestions based on your input. It
        is not a substitute for professional medical advice, diagnosis, or
        treatment. Always consult a dermatologist or healthcare provider for
        personalized skincare recommendations.
      </p>
      <div className="mb-6">
        <p className="text-ink text-sm font-semibold mb-2">Connect With Me</p>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/dprajapati4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mauve hover:text-[var(--color-gold)] transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/deepprajapati/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mauve hover:text-[var(--color-gold)] transition-colors text-sm"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
