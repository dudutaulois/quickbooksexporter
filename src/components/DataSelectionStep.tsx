import React from 'react';
import { ArrowLeft, ArrowRight, Users, FileText, Database } from 'lucide-react';
import { DataType } from '../App';

interface DataSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
  selectedData: DataType[];
  onDataChange: (data: DataType[]) => void;
}

export const DataSelectionStep: React.FC<DataSelectionStepProps> = ({
  onNext,
  onBack,
  selectedData,
  onDataChange,
}) => {
  const toggleDataType = (dataType: DataType) => {
    if (selectedData.includes(dataType)) {
      onDataChange(selectedData.filter(type => type !== dataType));
    } else {
      onDataChange([...selectedData, dataType]);
    }
  };

  const canProceed = selectedData.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <Database className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Select Data to Migrate
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Choose which data types you want to export from QuickBooks. We recommend selecting both 
          customers and invoices to maintain complete business records.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div
          onClick={() => toggleDataType('customers')}
          className={`cursor-pointer border-2 rounded-lg p-6 transition-all duration-200 ${
            selectedData.includes('customers')
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${
              selectedData.includes('customers') ? 'bg-blue-600' : 'bg-gray-100'
            }`}>
              <Users className={`w-6 h-6 ${
                selectedData.includes('customers') ? 'text-white' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Customers</h3>
              <p className="text-sm text-gray-600">
                Export customer information including names, contact details, and IDs
              </p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedData.includes('customers')
                ? 'border-blue-600 bg-blue-600'
                : 'border-gray-300'
            }`}>
              {selectedData.includes('customers') && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Includes: Name, Email, Phone, Address, Customer ID
          </div>
        </div>

        <div
          onClick={() => toggleDataType('invoices')}
          className={`cursor-pointer border-2 rounded-lg p-6 transition-all duration-200 ${
            selectedData.includes('invoices')
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${
              selectedData.includes('invoices') ? 'bg-blue-600' : 'bg-gray-100'
            }`}>
              <FileText className={`w-6 h-6 ${
                selectedData.includes('invoices') ? 'text-white' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Invoices</h3>
              <p className="text-sm text-gray-600">
                Export all invoice data including amounts, dates, and customer relationships
              </p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedData.includes('invoices')
                ? 'border-blue-600 bg-blue-600'
                : 'border-gray-300'
            }`}>
              {selectedData.includes('invoices') && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Includes: Invoice Number, Date, Amount, Status, Customer ID
          </div>
        </div>
      </div>

      {selectedData.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h4 className="font-medium text-blue-800 mb-2">Selected for Migration:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedData.includes('customers') && (
              <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                Customers
              </div>
            )}
            {selectedData.includes('invoices') && (
              <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                Invoices
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold 
                   py-2 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};