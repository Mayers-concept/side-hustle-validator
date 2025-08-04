import React, { useState } from 'react';

const SideHustleValidator = () => {
  const [currentStep, setCurrentStep] = useState('input');
  const [idea, setIdea] = useState('');
  const [validationScore, setValidationScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const validationQuestions = [
    {
      id: 'market_size',
      question: "How many people in your area have this exact problem daily?",
      placeholder: "e.g., 1000+ dog owners in my city struggle with...",
      category: "Market Demand"
    },
    {
      id: 'payment_willingness',
      question: "What do people currently pay to solve this problem?",
      placeholder: "e.g., $50/month for gym membership, $200 for consultant...",
      category: "Revenue Potential"
    },
    {
      id: 'competition_gap',
      question: "What's missing from existing solutions?",
      placeholder: "e.g., too expensive, poor customer service, outdated...",
      category: "Competitive Advantage"
    },
    {
      id: 'execution_feasibility',
      question: "Can you create a basic version in 30 days with your current skills?",
      placeholder: "e.g., Yes - I can build a simple website and...",
      category: "Execution Risk"
    },
    {
      id: 'personal_advantage',
      question: "What unique advantage do you have for this idea?",
      placeholder: "e.g., 10 years experience in this industry, network of...",
      category: "Personal Fit"
    }
  ];

  const handleIdeaSubmit = () => {
    if (idea.trim()) {
      setCurrentStep('validation');
      setCurrentQuestionIndex(0);
    }
  };

  const handleAnswerSubmit = (answer) => {
    const currentQuestion = validationQuestions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    
    if (currentQuestionIndex < validationQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate final score
      const finalAnswers = { ...answers, [currentQuestion.id]: answer };
      const score = Object.keys(finalAnswers).reduce((total, key) => {
        const answer = finalAnswers[key];
        if (key === 'market_size' && answer?.length > 20) total += 20;
        if (key === 'payment_willingness' && answer?.includes('$')) total += 25;
        if (key === 'competition_gap' && answer?.length > 15) total += 20;
        if (key === 'execution_feasibility' && answer?.toLowerCase().includes('yes')) total += 20;
        if (key === 'personal_advantage' && answer?.length > 20) total += 15;
        return total;
      }, 0);
      
      setValidationScore(score);
      setCurrentStep('results');
      
      if (score >= 40) {
        setTimeout(() => setShowEmailCapture(true), 2000);
      }
    }
  };

  const resetValidator = () => {
    setCurrentStep('input');
    setIdea('');
    setAnswers({});
    setValidationScore(0);
    setCurrentQuestionIndex(0);
    setShowEmailCapture(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return "🚀 High Potential! This idea shows strong validation signals.";
    if (score >= 60) return "⚡ Moderate Potential. Address the gaps to improve viability.";
    return "⚠️ Needs Work. Consider pivoting or strengthening weak areas.";
  };

  if (currentStep === 'input') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 25px 45px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              fontSize: '60px',
              marginBottom: '20px'
            }}>💡</div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 20px 0'
            }}>
              Side Hustle Validator
            </h1>
            <p style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.8)',
              margin: '0 0 40px 0'
            }}>
              Validate your business idea in 5 minutes with our AI-powered coach
            </p>
          </div>

          <div>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '18px',
              fontWeight: '500',
              marginBottom: '15px'
            }}>
              What's your side hustle idea?
            </label>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., A meal prep service for busy professionals in my neighborhood..."
              style={{
                width: '100%',
                height: '120px',
                padding: '15px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '16px',
                resize: 'none',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            onClick={handleIdeaSubmit}
            disabled={!idea.trim()}
            style={{
              width: '100%',
              background: idea.trim() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#999',
              color: 'white',
              fontWeight: 'bold',
              padding: '15px 30px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '18px',
              cursor: idea.trim() ? 'pointer' : 'not-allowed',
              marginTop: '20px',
              transition: 'all 0.3s ease'
            }}
          >
            Start Validation →
          </button>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              Join 10,000+ entrepreneurs who've validated their ideas
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'validation') {
    const currentQuestion = validationQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / validationQuestions.length) * 100;

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 25px 45px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ color: 'white', fontWeight: '500' }}>
                {currentQuestion.category}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                {currentQuestionIndex + 1} of {validationQuestions.length}
              </span>
            </div>
            
            <div style={{
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '10px',
              height: '8px',
              marginBottom: '30px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                height: '8px',
                borderRadius: '10px',
                width: `${progress}%`,
                transition: 'width 0.5s ease'
              }}></div>
            </div>

            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 30px 0'
            }}>
              {currentQuestion.question}
            </h2>
          </div>

          <QuestionInput
            placeholder={currentQuestion.placeholder}
            onSubmit={handleAnswerSubmit}
          />
        </div>
      </div>
    );
  }

  if (currentStep === 'results') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '800px',
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 25px 45px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              fontSize: '120px',
              fontWeight: 'bold',
              color: getScoreColor(validationScore),
              marginBottom: '20px'
            }}>
              {validationScore}
            </div>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 20px 0'
            }}>
              Validation Score
            </h2>
            <p style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.8)',
              margin: '0 0 40px 0'
            }}>
              {getScoreMessage(validationScore)}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '30px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 20px 0'
              }}>Your Idea</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>{idea}</p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '30px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 20px 0'
              }}>Validation Breakdown</h3>
              <div>
                {validationQuestions.map((q) => {
                  const hasAnswer = answers[q.id]?.length > 0;
                  return (
                    <div key={q.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <span style={{
                        color: hasAnswer ? '#10B981' : '#999',
                        marginRight: '10px'
                      }}>
                        {hasAnswer ? '✓' : '○'}
                      </span>
                      <span style={{
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: '14px'
                      }}>
                        {q.category}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {showEmailCapture && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(245,101,101,0.2) 100%)',
              borderRadius: '15px',
              padding: '30px',
              marginBottom: '30px',
              border: '1px solid rgba(251,191,36,0.3)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 20px 0'
              }}>
                🎉 Get Your Detailed Validation Report
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '20px'
              }}>
                Your idea shows promise! Enter your email to receive a detailed business plan template and next steps.
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                <button style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  Get Report
                </button>
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={resetValidator}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: '500',
                padding: '15px 30px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🔄 Validate Another Idea
            </button>
          </div>
        </div>
      </div>
    );
  }
};

const QuestionInput = ({ placeholder, onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        style={{
          width: '100%',
          height: '120px',
          padding: '15px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '10px',
          color: 'white',
          fontSize: '16px',
          resize: 'none',
          outline: 'none',
          boxSizing: 'border-box',
          marginBottom: '20px'
        }}
      />
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '14px',
          margin: 0
        }}>
          Ctrl + Enter to submit
        </p>
        <button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          style={{
            background: answer.trim() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#999',
            color: 'white',
            fontWeight: 'bold',
            padding: '12px 30px',
            borderRadius: '10px',
            border: 'none',
            cursor: answer.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease'
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default SideHustleValidator;
