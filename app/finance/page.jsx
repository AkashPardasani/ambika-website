"use client"
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ParallaxBackground = ({ children, imageUrl, className = "", speed = 0.5 }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translateY(${scrollY * speed}px)`,
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, change, isPositive }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        {change && (
          <div className={`flex items-center mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-red-50 rounded-full">
        <Icon className="w-6 h-6 text-red-600" />
      </div>
    </div>
  </div>
);

const HoldingCard = ({ company, ticker, logo, price, change, isPositive }) => (
  <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">{logo}</span>
        </div>
        <div>
          <h3 className="text-white font-semibold">{company}</h3>
          <p className="text-gray-400 text-sm">{ticker}</p>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-white text-xl font-bold">${price}</span>
      <div className={`flex items-center ${isPositive ? 'text-yellow-400' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        <span className="font-medium">{change}</span>
      </div>
    </div>
  </div>
);

const TransactionRow = ({ date, type, asset, amount, price }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
    <td className="py-4 px-6 text-gray-800">{date}</td>
    <td className="py-4 px-6">
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        type === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {type}
      </span>
    </td>
    <td className="py-4 px-6 text-gray-800 font-medium">{asset}</td>
    <td className="py-4 px-6 text-gray-800">{amount}</td>
    <td className="py-4 px-6 text-gray-800 font-bold">${price}</td>
  </tr>
);

const LineChart = () => {
  const data = [
    { month: 'Jan', value: 8.2 },
    { month: 'Feb', value: 6.8 },
    { month: 'Mar', value: 9.1 },
    { month: 'Apr', value: 11.4 },
    { month: 'May', value: 7.9 },
    { month: 'Jun', value: 12.6 },
    { month: 'Jul', value: 15.2 },
    { month: 'Aug', value: 10.8 },
    { month: 'Sep', value: 13.7 },
    { month: 'Oct', value: 9.3 },
    { month: 'Nov', value: 14.1 },
    { month: 'Dec', value: 12.4 }
  ];

  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Returns (%)</h3>
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 800 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={i * 40}
              x2="800"
              y2={i * 40}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Chart line */}
          <polyline
            fill="none"
            stroke="#D32F2F"
            strokeWidth="3"
            points={data.map((d, i) => 
              `${(i * 70) + 40},${200 - (d.value / maxValue) * 160}`
            ).join(' ')}
          />
          
          {/* Data points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={(i * 70) + 40}
              cy={200 - (d.value / maxValue) * 160}
              r="4"
              fill="#D32F2F"
            />
          ))}
        </svg>
        
        {/* Month labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8">
          {data.map((d, i) => (
            <span key={i} className="text-gray-600 text-sm">{d.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const FinancePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const stats = [
    { icon: DollarSign, title: "Portfolio Value", value: "$1.2M", change: "+8.4%", isPositive: true },
    { icon: TrendingUp, title: "ROI This Year", value: "12.4%", change: "+2.1%", isPositive: true },
    { icon: PieChart, title: "Active Investments", value: "24", change: "+3", isPositive: true },
    { icon: Users, title: "Support Tickets", value: "8", change: "-2", isPositive: true }
  ];

  const holdings = [
    { company: "Apple Inc.", ticker: "AAPL", logo: "A", price: "182.52", change: "+2.4%", isPositive: true },
    { company: "Microsoft Corp.", ticker: "MSFT", logo: "M", price: "378.85", change: "+1.8%", isPositive: true },
    { company: "Tesla Inc.", ticker: "TSLA", logo: "T", price: "248.42", change: "-0.9%", isPositive: false },
    { company: "Amazon.com Inc.", ticker: "AMZN", logo: "A", price: "151.94", change: "+3.2%", isPositive: true },
    { company: "Alphabet Inc.", ticker: "GOOGL", logo: "G", price: "138.21", change: "+1.5%", isPositive: true },
    { company: "Meta Platforms", ticker: "META", logo: "M", price: "484.49", change: "-2.1%", isPositive: false }
  ];

  const transactions = [
    { date: "Dec 15, 2024", type: "Buy", asset: "AAPL", amount: "50 shares", price: "9,126.00" },
    { date: "Dec 12, 2024", type: "Sell", asset: "TSLA", amount: "25 shares", price: "6,210.50" },
    { date: "Dec 10, 2024", type: "Buy", asset: "MSFT", amount: "30 shares", price: "11,365.50" },
    { date: "Dec 08, 2024", type: "Buy", asset: "AMZN", amount: "75 shares", price: "11,395.50" },
    { date: "Dec 05, 2024", type: "Sell", asset: "META", amount: "20 shares", price: "9,689.80" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax */}
      <section id="hero" className="relative">
        <ParallaxBackground 
          imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          className="min-h-screen flex items-center"
          speed={0.3}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Your Financial <span className="text-yellow-400">Dashboard</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Real-time insights, anywhere. Take control of your financial future with our comprehensive platform.
            </p>
            
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </ParallaxBackground>
      </section>

      {/* Latest Performance Section */}
      <section id="performance" className="py-20 bg-gray-50">
        <ParallaxBackground 
          imageUrl="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          className="py-20"
          speed={0.2}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Latest <span className="text-yellow-400">Performance</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Track your portfolio's growth with detailed analytics and insights across all your investments.
              </p>
            </div>
            
            <div className="mb-8">
              <LineChart />
            </div>
            
            <div className="text-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg">
                View Full Report
              </button>
            </div>
          </div>
        </ParallaxBackground>
      </section>

      {/* Top Holdings Section */}
      <section id="holdings" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Top <span className="text-yellow-400">Holdings</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Monitor your biggest investments and their real-time performance across global markets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {holdings.map((holding, index) => (
              <HoldingCard key={index} {...holding} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Transactions Section */}
      <section id="transactions" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Recent <span className="text-red-600">Transactions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Keep track of all your buying and selling activity with detailed transaction history.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-4 px-6 text-left text-gray-800 font-semibold">Date</th>
                    <th className="py-4 px-6 text-left text-gray-800 font-semibold">Type</th>
                    <th className="py-4 px-6 text-left text-gray-800 font-semibold">Asset</th>
                    <th className="py-4 px-6 text-left text-gray-800 font-semibold">Amount</th>
                    <th className="py-4 px-6 text-left text-gray-800 font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <TransactionRow key={index} {...transaction} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & CTA Section */}
      <section id="contact" className="relative">
        <ParallaxBackground 
          imageUrl="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          className="py-20"
          speed={0.4}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-600/20" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Get <span className="text-yellow-400">Started?</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Connect with our financial experts and take the first step toward achieving your investment goals.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                    placeholder="Tell us about your investment goals..."
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg transform hover:scale-105"
                  >
                    Get a Free Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ParallaxBackground>
      </section>
    </div>
  );
};

export default FinancePage;