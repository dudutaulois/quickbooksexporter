import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Shield, CheckCircle, Loader } from 'lucide-react';

interface AuthStepProps {
  onNext: () => void;
  onBack: () => void;
  onAuthenticate: () => void;
  isAuthenticated: boolean;
}

export const AuthStep: React.FC<AuthStepProps> = ({ onNext, onBack, onAuthenticate, isAuthenticated }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuthenticate = async () => {
    setIsAuthenticating(true);
    // Simulate OAuth process
    await new Promise(resolve => setTimeout(resolve, 2000));
    onAuthenticate();
    setIsAuthenticating(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <Shield className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Connect to QuickBooks
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          We'll securely connect to your QuickBooks account to access your data. 
          Your credentials are never stored on our servers.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Security Features</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">OAuth 2.0 secure authentication</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">No credentials stored locally</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Read-only access to your data</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">SSL encrypted data transfer</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mb-8">
        {!isAuthenticated ? (
          <button
            onClick={handleAuthenticate}
            disabled={isAuthenticating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold 
                     py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
          >
            {isAuthenticating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Connecting to QuickBooks...</span>
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                <span>Connect to QuickBooks</span>
              </>
            )}
          </button>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="text-green-800 font-medium">Successfully connected to QuickBooks!</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        {isAuthenticated && (
          <button
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg 
                     transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};