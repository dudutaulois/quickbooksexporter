import React from 'react';
import { ArrowLeft, ArrowRight, Database, Table } from 'lucide-react';
import { TargetPlatform } from '../App';

interface PlatformSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
  selectedPlatform: TargetPlatform | null;
  onPlatformChange: (platform: TargetPlatform) => void;
}

export const PlatformSelectionStep: React.FC<PlatformSelectionStepProps> = ({
  onNext,
  onBack,
  selectedPlatform,
  onPlatformChange,
}) => {
  const platforms = [
    {
      id: 'notion' as TargetPlatform,
      name: 'Notion',
      icon: Database,
      description: 'Perfect for teams who want a flexible workspace with databases, notes, and collaboration features.',
      features: ['Rich text editing', 'Database relationships', 'Team collaboration', 'Template system'],
      color: 'purple',
    },
    {
      id: 'airtable' as TargetPlatform,
      name: 'Airtable',
      icon: Table,
      description: 'Ideal for businesses that need powerful database features with spreadsheet-like interface.',
      features: ['Advanced filtering', 'Multiple views', 'API access', 'Automation features'],
      color: 'orange',
    },
  ];

  const canProceed = selectedPlatform !== null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="bg-purple-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <Table className="w-10 h-10 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choose Your Destination Platform
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Select where you'd like to import your QuickBooks data. Both platforms offer excellent 
          database features and will preserve your data relationships.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = selectedPlatform === platform.id;
          const colorClasses = {
            purple: {
              border: 'border-purple-600 bg-purple-50',
              icon: 'bg-purple-600 text-white',
              unselected: 'border-gray-200 hover:border-gray-300',
              iconUnselected: 'bg-gray-100 text-gray-600',
            },
            orange: {
              border: 'border-orange-600 bg-orange-50',
              icon: 'bg-orange-600 text-white',
              unselected: 'border-gray-200 hover:border-gray-300',
              iconUnselected: 'bg-gray-100 text-gray-600',
            },
          };

          return (
            <div
              key={platform.id}
              onClick={() => onPlatformChange(platform.id)}
              className={`cursor-pointer border-2 rounded-lg p-6 transition-all duration-200 ${
                isSelected 
                  ? colorClasses[platform.color].border 
                  : colorClasses[platform.color].unselected
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-lg ${
                  isSelected 
                    ? colorClasses[platform.color].icon 
                    : colorClasses[platform.color].iconUnselected
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{platform.name}</h3>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? `border-${platform.color}-600 bg-${platform.color}-600`
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{platform.description}</p>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {platform.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {selectedPlatform && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <h4 className="font-medium text-green-800 mb-2">
            Great choice! We'll prepare your data for {selectedPlatform === 'notion' ? 'Notion' : 'Airtable'}.
          </h4>
          <p className="text-sm text-green-700">
            Your migration package will include CSV files formatted specifically for {selectedPlatform === 'notion' ? 'Notion' : 'Airtable'} 
            and detailed import instructions.
          </p>
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
          <span>Start Migration</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};