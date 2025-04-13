
import { create } from 'zustand';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IncomeValues {
  personalIncome: string;
  sCorpIncome: string;
}

export interface Expenses {
  generalExpenses: string;
  ownersWithdrawals: string;
  extraFundDistribution: string;
  otherExpenses: string;
}

export interface ReasonableSalary {
  salary: string;
}

export interface TaxState {
  currentStep: number;
  personalInfo: PersonalInfo;
  incomeValues: IncomeValues;
  expenses: Expenses;
  reasonableSalary: ReasonableSalary;
  setCurrentStep: (step: number) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setIncomeValues: (values: Partial<IncomeValues>) => void;
  setExpenses: (expenses: Partial<Expenses>) => void;
  setReasonableSalary: (salary: Partial<ReasonableSalary>) => void;
  resetForm: () => void;
}

const initialPersonalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};

const initialIncomeValues: IncomeValues = {
  personalIncome: '',
  sCorpIncome: '',
};

const initialExpenses: Expenses = {
  generalExpenses: '',
  ownersWithdrawals: '',
  extraFundDistribution: '',
  otherExpenses: '',
};

const initialReasonableSalary: ReasonableSalary = {
  salary: '',
};

export const useTaxStore = create<TaxState>((set) => ({
  currentStep: 1,
  personalInfo: initialPersonalInfo,
  incomeValues: initialIncomeValues,
  expenses: initialExpenses,
  reasonableSalary: initialReasonableSalary,

  setCurrentStep: (step) => set({ currentStep: step }),
  
  setPersonalInfo: (info) => 
    set((state) => ({ 
      personalInfo: { ...state.personalInfo, ...info } 
    })),
  
  setIncomeValues: (values) => 
    set((state) => ({ 
      incomeValues: { ...state.incomeValues, ...values } 
    })),
  
  setExpenses: (expenses) => 
    set((state) => ({ 
      expenses: { ...state.expenses, ...expenses } 
    })),
  
  setReasonableSalary: (salary) => 
    set((state) => ({ 
      reasonableSalary: { ...state.reasonableSalary, ...salary } 
    })),
  
  resetForm: () => set({
    currentStep: 1,
    personalInfo: initialPersonalInfo,
    incomeValues: initialIncomeValues,
    expenses: initialExpenses,
    reasonableSalary: initialReasonableSalary,
  }),
}));
