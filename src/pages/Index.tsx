
import React, { useState } from 'react';
import { useTaxStore } from '@/store/taxStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Check, CheckCircle, CircleUser, DollarSign, Receipt, Briefcase } from 'lucide-react';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import IncomeForm from '@/components/IncomeForm';
import ExpensesForm from '@/components/ExpensesForm';
import ReasonableSalaryForm from '@/components/ReasonableSalaryForm';

const Index = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, personalInfo, incomeValues, expenses, reasonableSalary } = useTaxStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      id: 1,
      name: 'Personal Info',
      icon: <CircleUser className="h-6 w-6" />,
      component: <PersonalInfoForm />,
    },
    {
      id: 2,
      name: 'Income',
      icon: <DollarSign className="h-6 w-6" />,
      component: <IncomeForm />,
    },
    {
      id: 3,
      name: 'Expenses',
      icon: <Receipt className="h-6 w-6" />,
      component: <ExpensesForm />,
    },
    {
      id: 4,
      name: 'Salary',
      icon: <Briefcase className="h-6 w-6" />,
      component: <ReasonableSalaryForm />,
    },
  ];

  const validateStep = (step: number) => {
    if (step === 1) {
      const { firstName, lastName, email } = personalInfo;
      if (!firstName || !lastName || !email) {
        toast.error('Please fill out required fields');
        return false;
      }
    } else if (step === 2) {
      if (!incomeValues.personalIncome && !incomeValues.sCorpIncome) {
        toast.error('Please enter at least one income value');
        return false;
      }
    }
    // We'll allow expenses and salary to be optional
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const formData = {
        personalInfo,
        incomeValues,
        expenses,
        reasonableSalary,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '46207cfa-0ec1-48db-a4c7-6ec6306f329d',
          subject: `Tax Submission for ${personalInfo.firstName} ${personalInfo.lastName}`,
          from_name: `${personalInfo.firstName} ${personalInfo.lastName}`,
          form_data: formData,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        navigate('/success');
      } else {
        toast.error('Something went wrong. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-center mb-6">Tax Wizard</h1>
      <p className="text-center text-muted-foreground mb-8">
        Hello World! Complete your tax information in a few easy steps.
      </p>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <button
                type="button"
                onClick={() => validateStep(currentStep) && setCurrentStep(step.id)}
                className={`flex flex-col items-center ${
                  step.id < currentStep
                    ? 'text-tax-primary'
                    : step.id === currentStep
                    ? 'text-tax-primary'
                    : 'text-gray-400'
                }`}
                aria-current={currentStep === step.id ? 'step' : undefined}
              >
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    step.id < currentStep
                      ? 'bg-tax-primary text-white border-tax-primary'
                      : step.id === currentStep
                      ? 'border-tax-primary text-tax-primary'
                      : 'border-gray-300'
                  }`}
                >
                  {step.id < currentStep ? <Check className="h-5 w-5" /> : step.icon}
                </span>
                <span className="mt-2 text-sm font-medium">{step.name}</span>
              </button>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-200 mx-2">
                  <div
                    className="h-full bg-tax-primary"
                    style={{
                      width: currentStep > index + 1 ? '100%' : '0%',
                      transition: 'width 0.3s ease-in-out',
                    }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={step.id === currentStep ? 'block' : 'hidden'}
          >
            {step.component}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        {currentStep < steps.length ? (
          <Button onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-tax-success hover:bg-tax-success/90"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;
