
import React from 'react';
import { useTaxStore } from '@/store/taxStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ExpensesForm = () => {
  const { expenses, setExpenses } = useTaxStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow numbers and decimal points
    if (/^(\d*\.?\d*)$/.test(value) || value === '') {
      setExpenses({ [name]: value });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">S-Corp Expenses</CardTitle>
        <CardDescription className="text-center">
          Enter your S-Corporation's expenses for the tax year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="generalExpenses">General Expenses ($)</Label>
            <Input
              id="generalExpenses"
              name="generalExpenses"
              value={expenses.generalExpenses}
              onChange={handleChange}
              placeholder="0.00"
              className="text-right"
            />
            <p className="text-sm text-muted-foreground">
              Include rent, utilities, supplies, and other regular business expenses
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownersWithdrawals">Owner's Withdrawals ($)</Label>
            <Input
              id="ownersWithdrawals"
              name="ownersWithdrawals"
              value={expenses.ownersWithdrawals}
              onChange={handleChange}
              placeholder="0.00"
              className="text-right"
            />
            <p className="text-sm text-muted-foreground">
              Money withdrawn as an owner (not including salary)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="extraFundDistribution">Extra Fund Distribution ($)</Label>
            <Input
              id="extraFundDistribution"
              name="extraFundDistribution"
              value={expenses.extraFundDistribution}
              onChange={handleChange}
              placeholder="0.00"
              className="text-right"
            />
            <p className="text-sm text-muted-foreground">
              Additional distributions or dividends paid out
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otherExpenses">Other Expenses ($)</Label>
            <Input
              id="otherExpenses"
              name="otherExpenses"
              value={expenses.otherExpenses}
              onChange={handleChange}
              placeholder="0.00"
              className="text-right"
            />
            <p className="text-sm text-muted-foreground">
              Any other business expenses not covered above
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesForm;
