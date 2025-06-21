import React from 'react';
import { ArrowRight, AlertTriangle, Database, FileText, Users } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          QuickBooks Is Discontinuing Services
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Don't lose your valuable business data. Our migration tool helps you safely export your 
          QuickBooks data and import it into modern platforms like Notion or Airtable.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <Database className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Preserve Your Data</h3>
          <p className="text-sm text-gray-600">
            Export all your customers and invoices in a format that's compatible with modern tools.
          </p>
        </div>
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Continue Operations</h3>
          <p className="text-sm text-gray-600">
            Seamlessly transition to Notion or Airtable with your data intact and relationships preserved.
          </p>
        </div>
        <div className="text-center p-6 bg-purple-50 rounded-lg">
          <FileText className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Easy Import</h3>
          <p className="text-sm text-gray-600">
            Get detailed instructions and properly formatted CSV files for quick setup.
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-800">Time-Sensitive Migration</h4>
            <p className="text-sm text-yellow-700 mt-1">
              QuickBooks will be discontinuing services soon. Start your data migration today to ensure 
              business continuity and prevent data loss.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg 
                   transition-colors duration-200 flex items-center space-x-2 mx-auto"
        >
          <span>Start Migration Process</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-sm text-gray-500 mt-3">
          Secure process • No data stored on our servers • Free migration
        </p>
      </div>
    </div>
  );
};