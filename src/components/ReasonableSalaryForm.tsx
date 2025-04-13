
import React from 'react';
import { useTaxStore } from '@/store/taxStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ReasonableSalaryForm = () => {
  const { reasonableSalary, setReasonableSalary } = useTaxStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow numbers and decimal points
    if (/^(\d*\.?\d*)$/.test(value) || value === '') {
      setReasonableSalary({ [name]: value });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Reasonable Salary</CardTitle>
        <CardDescription className="text-center">
          Enter your reasonable salary from the S-Corporation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="salary">Reasonable Salary ($)</Label>
            <Input
              id="salary"
              name="salary"
              value={reasonableSalary.salary}
              onChange={handleChange}
              placeholder="0.00"
              className="text-right"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">What is a Reasonable Salary?</h3>
            <p className="text-sm text-blue-700">
              A "reasonable salary" is what the IRS requires S-Corporation owners to pay themselves as W-2 employees. 
              It should be comparable to what other businesses would pay for similar services in your industry.
            </p>
            <p className="text-sm text-blue-700 mt-2">
              The IRS scrutinizes S-Corporation owner salaries to ensure they're not being artificially lowered 
              to avoid payroll taxes. Your salary should reflect your qualifications, duties, time commitment,
              and industry standards.
            </p>
            <p className="text-sm text-blue-700 mt-2">
              Setting too low a salary may trigger an IRS audit, while setting it too high might eliminate the tax 
              benefits of having an S-Corporation. Consult with a tax professional for guidance specific to your situation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReasonableSalaryForm;
