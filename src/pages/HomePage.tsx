import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="logo-circle"></div>
        <h1>InGood: Helps You Invest Smarter</h1>
        <p>InGood is designed to make investing easier, flexible, and practical for everyday people. Using our Self-Adjusting SIP system, the platform adapts to your cash flow, helping you invest more when you have extra funds and less when your expenses are high. With real-time cash flow monitoring and insights from your spending habits, InGood ensures that investing never disrupts your daily finances. Build financial habits, grow your wealth, and manage your money smarter—all in one app.</p>
      </section>

      {/* About Section */}
      <section id="about">
        <h2>About InGood</h2>
        <p>InGood, powered by InGoodfinserv, is a modern fintech platform that combines intelligent technology with practical investing. Our platform studies your spending patterns, identifies extra or unused funds, and makes automatic investments securely from your bank account. Unlike traditional fixed SIPs, InGood's Self-Adjusting SIP system ensures that your investments are flexible and in sync with your real cash flow. By combining smart automation with simple, user-friendly tools, InGood helps everyday users make better financial decisions without stress.</p>
        <p>Whether it's tracking expenses, analyzing cash flow, or monitoring investments, InGood offers features that empower you to take control of your financial future. Smart Sweep Automation moves idle funds to investments while keeping enough liquidity for your daily needs. InGood is more than just an investment app; it's a financial companion that grows with your life, making it easier to build wealth over time while maintaining financial flexibility.</p>
      </section>

      {/* Features Section */}
      <section id="features">
        <h2>Our Features</h2>
        <p><strong>Smart Sweep Automation:</strong> InGood's Smart Sweep Automation continuously monitors your bank balance and identifies idle funds that can be safely invested without affecting your daily expenses. The system automatically transfers these idle funds into your investment portfolio, maximizing your returns while maintaining sufficient liquidity for everyday spending. This ensures that your money is always working for you, even when you're not actively managing it.</p>
        
        <p><strong>Self-Adjusting SIP:</strong> Unlike traditional fixed SIPs, InGood uses a Self-Adjusting SIP system that dynamically adjusts the investment amount based on your real-time cash flow. When your expenses are lower, more funds are allocated to your investments. Conversely, when spending increases, the SIP contribution decreases to prevent over-committing funds. This approach removes the stress of manual investment planning and aligns perfectly with your financial lifestyle.</p>
        
        <p><strong>Expense & Cash Flow Tracking:</strong> InGood provides detailed insights into your spending habits, categorizes your expenses, and helps identify patterns that could be optimized. By understanding your cash inflow and outflow, the platform can suggest smarter investment opportunities and highlight areas where you can save. This feature ensures that your financial planning is holistic, taking into account both your spending and investment goals.</p>
        
        <p><strong>Secure & Transparent Investments:</strong> All investments made through InGood are executed securely using your linked bank account. The platform ensures full transparency, providing detailed records of each transaction and real-time updates on your portfolio performance. With robust security protocols and encryption standards, your money remains safe while you focus on building wealth steadily and confidently.</p>
      </section>

      {/* Social Section */}
      <section id="social">
        <h2>Connect With Us</h2>
        <div className="social-links">
          <a href="https://www.instagram.com/ingoodfinserv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" target="_blank" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://x.com/IngoodFin" target="_blank" aria-label="X / Twitter">
            <i className="fab fa-x-twitter"></i>
          </a>
          <a href="https://in.linkedin.com/company/ingood-finserv-private-limited" target="_blank" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://ingood.in/" target="_blank" aria-label="Website">
            <img src="https://ingood.in/wp-content/uploads/2025/07/ingood-new-logo.png" alt="InGood Website Logo" />
          </a>
        </div>
      </section>
    </div>
  );
}
