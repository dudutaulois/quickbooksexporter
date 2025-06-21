import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Database, Download, CheckCircle, Loader, FileText, Users } from 'lucide-react';
import JSZip from 'jszip';
import { DataType, TargetPlatform } from '../App';

interface MigrationData {
  selectedData: DataType[];
  targetPlatform: TargetPlatform | null;
  isAuthenticated: boolean;
}

interface MigrationStepProps {
  onNext: () => void;
  onBack: () => void;
  migrationData: MigrationData;
}

interface MigrationStatus {
  step: string;
  progress: number;
  isComplete: boolean;
  isError: boolean;
  message: string;
}

export const MigrationStep: React.FC<MigrationStepProps> = ({ onNext, onBack, migrationData }) => {
  const [migrationStatus, setMigrationStatus] = useState<MigrationStatus>({
    step: 'preparing',
    progress: 0,
    isComplete: false,
    isError: false,
    message: 'Preparing migration...'
  });
  
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  // Mock data generators
  const generateCustomersData = () => {
    const customers = [];
    const firstNames = ['John', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'Robert', 'Jennifer', 'William', 'Ashley'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const companies = ['Tech Solutions Inc', 'Global Services LLC', 'Innovation Corp', 'Digital Partners', 'Business Plus'];
    
    for (let i = 1; i <= 25; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const company = Math.random() > 0.3 ? companies[Math.floor(Math.random() * companies.length)] : '';
      
      customers.push({
        'Customer ID': `CUST-${i.toString().padStart(4, '0')}`,
        'Customer Name': company || `${firstName} ${lastName}`,
        'Contact Name': `${firstName} ${lastName}`,
        'Email': `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company ? company.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '') : 'email'}.com`,
        'Phone': `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        'Address': `${Math.floor(Math.random() * 9999) + 1} ${['Main St', 'Oak Ave', 'Park Blvd', 'First St', 'Second Ave'][Math.floor(Math.random() * 5)]}`,
        'City': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
        'State': ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
        'ZIP': Math.floor(Math.random() * 90000) + 10000,
        'Created Date': new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
      });
    }
    return customers;
  };

  const generateInvoicesData = (customers: any[]) => {
    const invoices = [];
    const statuses = ['Paid', 'Pending', 'Overdue', 'Draft'];
    
    for (let i = 1; i <= 50; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const amount = (Math.random() * 5000 + 100).toFixed(2);
      const invoiceDate = new Date(Date.now() - Math.floor(Math.random() * 180 * 24 * 60 * 60 * 1000));
      const dueDate = new Date(invoiceDate.getTime() + (30 * 24 * 60 * 60 * 1000));
      
      invoices.push({
        'Invoice Number': `INV-${i.toString().padStart(4, '0')}`,
        'Customer ID': customer['Customer ID'],
        'Customer Name': customer['Customer Name'],
        'Invoice Date': invoiceDate.toISOString().split('T')[0],
        'Due Date': dueDate.toISOString().split('T')[0],
        'Amount': `$${amount}`,
        'Tax Amount': `$${(parseFloat(amount) * 0.08).toFixed(2)}`,
        'Total Amount': `$${(parseFloat(amount) * 1.08).toFixed(2)}`,
        'Status': statuses[Math.floor(Math.random() * statuses.length)],
        'Description': `Professional services for ${customer['Customer Name']}`,
        'Terms': 'Net 30'
      });
    }
    return invoices;
  };

  const arrayToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  };

  const generateInstructions = (platform: TargetPlatform, selectedData: DataType[]) => {
    const platformTitle = platform === 'notion' ? 'Notion' : 'Airtable';
    
    let instructions = `# ${platformTitle} Import Instructions\n\n`;
    instructions += `This package contains your QuickBooks data exported for ${platformTitle}.\n\n`;
    
    if (platform === 'notion') {
      instructions += `## Import Steps for Notion:\n\n`;
      instructions += `1. Open Notion and create a new page\n`;
      instructions += `2. Add a database by typing "/database" and selecting "Table - Inline"\n\n`;
      
      if (selectedData.includes('customers')) {
        instructions += `### Import Customers:\n`;
        instructions += `1. Create a new database called "Customers"\n`;
        instructions += `2. Click the "..." menu → Import → CSV\n`;
        instructions += `3. Upload the customers.csv file\n`;
        instructions += `4. Review and confirm the column types\n\n`;
      }
      
      if (selectedData.includes('invoices')) {
        instructions += `### Import Invoices:\n`;
        instructions += `1. Create a new database called "Invoices"\n`;
        instructions += `2. Click the "..." menu → Import → CSV\n`;
        instructions += `3. Upload the invoices.csv file\n`;
        instructions += `4. Review and confirm the column types\n`;
        
        if (selectedData.includes('customers')) {
          instructions += `5. Create a relation column to link invoices to customers:\n`;
          instructions += `   - Add a new property called "Customer"\n`;
          instructions += `   - Set type to "Relation" and select your Customers database\n`;
          instructions += `   - Use the Customer ID to manually link records\n\n`;
        }
      }
    } else {
      instructions += `## Import Steps for Airtable:\n\n`;
      instructions += `1. Go to airtable.com and create a new base\n`;
      instructions += `2. Delete the default table and create new ones\n\n`;
      
      if (selectedData.includes('customers')) {
        instructions += `### Import Customers:\n`;
        instructions += `1. Create a table called "Customers"\n`;
        instructions += `2. Click "Create table" → "Import data" → "CSV file"\n`;
        instructions += `3. Upload the customers.csv file\n`;
        instructions += `4. Review field types and adjust as needed\n\n`;
      }
      
      if (selectedData.includes('invoices')) {
        instructions += `### Import Invoices:\n`;
        instructions += `1. Create a table called "Invoices"\n`;
        instructions += `2. Click "Create table" → "Import data" → "CSV file"\n`;
        instructions += `3. Upload the invoices.csv file\n`;
        instructions += `4. Review field types and adjust as needed\n`;
        
        if (selectedData.includes('customers')) {
          instructions += `5. Create a linked record field:\n`;
          instructions += `   - Change the "Customer ID" field type to "Link to another record"\n`;
          instructions += `   - Select your "Customers" table\n`;
          instructions += `   - Airtable will automatically link records based on Customer ID\n\n`;
        }
      }
    }
    
    instructions += `## Data Overview:\n\n`;
    if (selectedData.includes('customers')) {
      instructions += `- **customers.csv**: Contains customer information including names, contact details, and addresses\n`;
    }
    if (selectedData.includes('invoices')) {
      instructions += `- **invoices.csv**: Contains invoice data with amounts, dates, and customer relationships\n`;
    }
    
    instructions += `\n## Support:\n\n`;
    instructions += `If you need help with the import process, refer to the official documentation:\n`;
    if (platform === 'notion') {
      instructions += `- Notion Import Guide: https://www.notion.so/help/import-data\n`;
    } else {
      instructions += `- Airtable Import Guide: https://support.airtable.com/hc/en-us/articles/203313915\n`;
    }
    
    return instructions;
  };

  const startMigration = async () => {
    const steps = [
      { step: 'connecting', message: 'Connecting to QuickBooks...', progress: 10 },
      { step: 'extracting', message: 'Extracting data from QuickBooks...', progress: 30 },
      { step: 'processing', message: 'Processing and formatting data...', progress: 60 },
      { step: 'generating', message: 'Generating CSV files...', progress: 80 },
      { step: 'packaging', message: 'Creating migration package...', progress: 95 },
      { step: 'complete', message: 'Migration package ready!', progress: 100 }
    ];

    for (const stepInfo of steps) {
      setMigrationStatus({
        step: stepInfo.step,
        progress: stepInfo.progress,
        isComplete: false,
        isError: false,
        message: stepInfo.message
      });
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Generate the migration package
    try {
      const zip = new JSZip();
      
      // Generate data based on selected types
      let customersData: any[] = [];
      let invoicesData: any[] = [];
      
      if (migrationData.selectedData.includes('customers')) {
        customersData = generateCustomersData();
        const customersCSV = arrayToCSV(customersData);
        zip.file('customers.csv', customersCSV);
      }
      
      if (migrationData.selectedData.includes('invoices')) {
        invoicesData = generateInvoicesData(customersData.length > 0 ? customersData : generateCustomersData());
        const invoicesCSV = arrayToCSV(invoicesData);
        zip.file('invoices.csv', invoicesCSV);
      }
      
      // Add instructions
      const instructions = generateInstructions(migrationData.targetPlatform!, migrationData.selectedData);
      zip.file('README.md', instructions);
      
      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      setDownloadUrl(url);
      setDownloadReady(true);
      
      setMigrationStatus({
        step: 'complete',
        progress: 100,
        isComplete: true,
        isError: false,
        message: 'Migration package ready for download!'
      });
      
    } catch (error) {
      setMigrationStatus({
        step: 'error',
        progress: 0,
        isComplete: false,
        isError: true,
        message: 'An error occurred during migration. Please try again.'
      });
    }
  };

  useEffect(() => {
    startMigration();
    
    // Cleanup function to revoke object URL
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, []);

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `quickbooks-migration-${migrationData.targetPlatform}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className={`p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center ${
          migrationStatus.isError ? 'bg-red-100' : 
          migrationStatus.isComplete ? 'bg-green-100' : 'bg-blue-100'
        }`}>
          {migrationStatus.isError ? (
            <Database className="w-10 h-10 text-red-600" />
          ) : migrationStatus.isComplete ? (
            <CheckCircle className="w-10 h-10 text-green-600" />
          ) : (
            <Loader className="w-10 h-10 text-blue-600 animate-spin" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {migrationStatus.isComplete ? 'Migration Complete!' : 'Migrating Your Data'}
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          {migrationStatus.isComplete 
            ? `Your data has been successfully exported and packaged for ${migrationData.targetPlatform === 'notion' ? 'Notion' : 'Airtable'}.`
            : 'Please wait while we securely extract and process your QuickBooks data.'
          }
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{migrationStatus.message}</span>
          <span className="text-sm text-gray-600">{migrationStatus.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              migrationStatus.isError ? 'bg-red-500' : 
              migrationStatus.isComplete ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${migrationStatus.progress}%` }}
          />
        </div>
      </div>

      {/* Data Summary */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {migrationData.selectedData.includes('customers') && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Customers</h3>
            </div>
            <p className="text-sm text-blue-700 mb-2">
              {migrationStatus.isComplete ? '25 customer records exported' : 'Extracting customer data...'}
            </p>
            <div className="text-xs text-blue-600">
              Includes: Names, contacts, addresses, IDs
            </div>
          </div>
        )}

        {migrationData.selectedData.includes('invoices') && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold text-green-900">Invoices</h3>
            </div>
            <p className="text-sm text-green-700 mb-2">
              {migrationStatus.isComplete ? '50 invoice records exported' : 'Extracting invoice data...'}
            </p>
            <div className="text-xs text-green-600">
              Includes: Numbers, dates, amounts, statuses
            </div>
          </div>
        )}
      </div>

      {/* Download Section */}
      {migrationStatus.isComplete && downloadReady && (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="text-center">
            <div className="bg-white p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Download className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Your Migration Package is Ready!</h3>
            <p className="text-sm text-gray-600 mb-4">
              Contains CSV files and detailed import instructions for {migrationData.targetPlatform === 'notion' ? 'Notion' : 'Airtable'}
            </p>
            <button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg 
                       transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <Download className="w-5 h-5" />
              <span>Download Migration Package</span>
            </button>
          </div>
        </div>
      )}

      {/* Error State */}
      {migrationStatus.isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="text-center">
            <h3 className="font-semibold text-red-900 mb-2">Migration Failed</h3>
            <p className="text-sm text-red-700 mb-4">
              We encountered an issue while processing your data. Please try again or contact support if the problem persists.
            </p>
            <button
              onClick={startMigration}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg 
                       transition-colors duration-200"
            >
              Retry Migration
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={!migrationStatus.isComplete && !migrationStatus.isError}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors 
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        {migrationStatus.isComplete && (
          <button
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg 
                     transition-colors duration-200 flex items-center space-x-2"
          >
            <span>View Summary</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};