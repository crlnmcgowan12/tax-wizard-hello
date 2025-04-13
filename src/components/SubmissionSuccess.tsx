
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTaxStore } from '@/store/taxStore';
import { useNavigate } from 'react-router-dom';

const SubmissionSuccess = () => {
  const { resetForm } = useTaxStore();
  const navigate = useNavigate();

  const handleStartOver = () => {
    resetForm();
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-tax-success" />
          </div>
          <CardTitle className="text-2xl text-tax-success">Success!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Your tax information has been successfully submitted.
          </p>
          <p className="text-sm text-muted-foreground">
            Thank you for using our tax service. You will receive a confirmation email shortly.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleStartOver}>
            Start a New Submission
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubmissionSuccess;
