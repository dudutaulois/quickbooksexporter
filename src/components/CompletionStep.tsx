import React from 'react';
import { CheckCircle, RefreshCw, Download, ExternalLink, BookOpen } from 'lucide-react';

interface CompletionStepProps {
  onRestart: () => void;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({ onRestart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Migration Successful!
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your QuickBooks data has been successfully exported and is ready for import into your chosen platform. 
          Your business data is now preserved and secure.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div className="bg-blue-600 p-3 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Data Exported</h3>
          <p className="text-sm text-gray-600">
            Your data has been safely extracted from QuickBooks and formatted for easy import.
          </p>
        </div>

        <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
          <div className="bg-green-600 p-3 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Instructions Included</h3>
          <p className="text-sm text-gray-600">
            Detailed step-by-step instructions are included to help you import your data seamlessly.
          </p>
        </div>

        <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
          <div className="bg-purple-600 p-3 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Business Continuity</h3>
          <p className="text-sm text-gray-600">
            Your business operations can continue without interruption in your new platform.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4 text-center">What's Next?</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">
              1
            </div>
            <div>
              <p className="font-medium text-gray-900">Open your migration package</p>
              <p className="text-sm text-gray-600">Extract the ZIP file and review the included CSV files and README instructions.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">
              2
            </div>
            <div>
              <p className="font-medium text-gray-900">Import into your chosen platform</p>
              <p className="text-sm text-gray-600">Follow the detailed instructions to import your customers and invoices.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">
              3
            </div>
            <div>
              <p className="font-medium text-gray-900">Verify your data</p>
              <p className="text-sm text-gray-600">Double-check that all your important business data has been imported correctly.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">
              ✓
            </div>
            <div>
              <p className="font-medium text-gray-900">Continue your business operations</p>
              <p className="text-sm text-gray-600">Your data is now preserved and ready for use in your new platform!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <div className="flex items-start space-x-3">
          <BookOpen className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-800">Need Help?</h4>
            <p className="text-sm text-yellow-700 mt-1">
              If you encounter any issues during the import process, refer to the detailed README file included 
              in your migration package, or consult your platform's official documentation.
            </p>
            <div className="mt-2 flex space-x-4">
              <a
                href="https://www.notion.so/help/import-data"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-yellow-700 hover:text-yellow-800 underline flex items-center space-x-1"
              >
                <span>Notion Import Guide</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://support.airtable.com/hc/en-us/articles/203313915"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-yellow-700 hover:text-yellow-800 underline flex items-center space-x-1"
              >
                <span>Airtable Import Guide</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onRestart}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors 
                   border border-gray-300 hover:border-gray-400 py-2 px-6 rounded-lg"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Start New Migration</span>
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg 
                   transition-colors duration-200 flex items-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Migration Complete</span>
        </button>
      </div>

      <div className="text-center mt-6 text-sm text-gray-500">
        <p>Thank you for trusting us with your data migration. Your business continuity is our priority.</p>
      </div>
    </div>
  );
};