
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Brain, Database, Search, FileText, Lightbulb, ShieldCheck, Check, Book, Link as LinkIcon, List } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Navigation */}
      <header className="bg-legal-navy text-white py-4 px-6 md:px-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-legal-gold" />
            <span className="text-xl font-bold">Precedence AI</span>
          </div>
          <div className="flex gap-4">
            {user ? (
              <Link to="/">
                <Button variant="outline" className="border-legal-gold text-legal-gold hover:bg-legal-gold/10">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="border-legal-gold text-legal-gold hover:bg-legal-gold/10">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="legal-gradient text-white py-16 px-6 md:px-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Transforming Legal Research with AI
              </h1>
              <p className="text-xl mb-8">
                Leverage the power of artificial intelligence with South Africa's comprehensive legal databases to enhance your legal decision-making.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={user ? "/legal-research" : "/auth"}>
                  <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy font-bold px-6 py-6 text-lg">
                    <Search className="mr-2 h-5 w-5" />
                    Start Researching
                  </Button>
                </Link>
                <Link to={user ? "/" : "/auth"}>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-6 py-6 text-lg">
                    <Brain className="mr-2 h-5 w-5" />
                    Try LexAI Assistant
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-legal-gold/20 p-2">
                    <Brain className="h-6 w-6 text-legal-gold" />
                  </div>
                  <h3 className="text-xl font-semibold">LexAI Assistant</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded p-3 animate-fadeIn">
                    <p className="text-sm font-light italic">What are the requirements for proving negligence in medical malpractice cases?</p>
                  </div>
                  <div className="bg-legal-gold/10 rounded p-3 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
                    <p className="text-sm">In South African law, proving medical negligence requires demonstrating that the healthcare provider deviated from the standard of care expected of a reasonable professional, as established in <span className="text-legal-gold font-medium">Van Wyk v Lewis (1924)</span> and reaffirmed in <span className="text-legal-gold font-medium">Michael & Another v Linksfield Park Clinic (2001)</span>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-10 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-legal-navy">Powerful Legal Research Tools</h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI technology with extensive legal databases to provide comprehensive research capabilities.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-legal-navy/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-legal-navy" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-legal-navy">SAFLII Integration</h3>
              <p className="text-gray-600">
                Direct access to Southern African Legal Information Institute's comprehensive database of case law, legislation, and legal resources.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-legal-gold/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-legal-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-legal-navy">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                Leverage advanced AI models to analyze complex legal questions and provide insights based on relevant case law and precedents.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-legal-navy/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-legal-navy" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-legal-navy">LexisNexis Reference</h3>
              <p className="text-gray-600">
                Enhanced research capabilities with references to LexisNexis content, providing comprehensive coverage of legal resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 md:px-10 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-legal-navy">How It Works</h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our platform simplifies legal research by combining traditional database searches with AI-powered insights.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="rounded-full bg-legal-navy text-white h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-legal-navy">Enter Your Legal Query</h3>
                    <p className="text-gray-600">
                      Input your research question using natural language or specific legal terminology.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-full bg-legal-navy text-white h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-legal-navy">AI Analysis & Database Search</h3>
                    <p className="text-gray-600">
                      Our system processes your query using AI while simultaneously searching through SAFLII and referencing LexisNexis resources.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-full bg-legal-navy text-white h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-legal-navy">Comprehensive Results</h3>
                    <p className="text-gray-600">
                      Receive curated results with relevant case law, statutes, and AI-generated insights, all with proper citations and sources.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-5 w-5 text-legal-navy" />
                  <h3 className="text-lg font-medium">Legal Research Example</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded p-3">
                    <p className="text-sm font-medium">Query:</p>
                    <p className="text-sm">Directors' fiduciary duties in business rescue proceedings</p>
                  </div>
                  <div className="bg-legal-navy/5 rounded p-3">
                    <p className="text-sm font-medium">Results:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-legal-navy mt-1 flex-shrink-0" />
                        <span><strong>Oakdene Square Properties v Farm Bothasfontein</strong> - Directors' fiduciary duties during business rescue</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <LinkIcon className="h-4 w-4 text-legal-navy mt-1 flex-shrink-0" />
                        <span><strong>Companies Act 71 of 2008</strong> - Section 136(2) on directors' duties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-legal-gold mt-1 flex-shrink-0" />
                        <span><strong>AI Insight:</strong> Directors retain fiduciary duties during business rescue, but with modified scope</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 md:px-10 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-legal-navy">Benefits for Legal Professionals</h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our platform enhances your legal research workflow and decision-making capabilities.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-legal-navy flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-legal-navy">Enhanced Accuracy</h3>
                  <p className="text-sm text-gray-600">
                    Reduce research errors with AI validation and comprehensive database coverage.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-legal-navy flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-legal-navy">Time Efficiency</h3>
                  <p className="text-sm text-gray-600">
                    Cut research time by up to 70% with AI-powered search and analysis.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-6 w-6 text-legal-gold flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-legal-navy">Strategic Insights</h3>
                  <p className="text-sm text-gray-600">
                    Gain deeper understanding of legal precedents and argument strategies.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <Book className="h-6 w-6 text-legal-navy flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-legal-navy">Source Verification</h3>
                  <p className="text-sm text-gray-600">
                    All information is provided with full citations and links to original sources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="legal-gradient text-white py-16 px-6 md:px-10">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Legal Research?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join legal professionals across South Africa who are leveraging AI and comprehensive legal databases to enhance their practice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={user ? "/legal-research" : "/auth"}>
              <Button className="bg-legal-gold hover:bg-legal-gold/90 text-legal-navy font-bold px-6 py-6 text-lg">
                <Search className="mr-2 h-5 w-5" />
                Start Researching
              </Button>
            </Link>
            <Link to={user ? "/" : "/auth"}>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-6 py-6 text-lg">
                <Brain className="mr-2 h-5 w-5" />
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6 md:px-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-legal-gold" />
                <span className="text-xl font-bold">Precedence AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transforming legal research with AI and comprehensive database integration.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span>SAFLII Integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>AI-Powered Research</span>
                </li>
                <li className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  <span>LexisNexis Reference</span>
                </li>
                <li className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span>Case Law Analysis</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>SAFLII Database</li>
                <li>South African Case Law</li>
                <li>Legal Research Tools</li>
                <li>AI in Legal Practice</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Precedence AI. All rights reserved.</p>
            <p className="mt-2">
              This is a demo application. Not for commercial use.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
