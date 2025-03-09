
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  FileUp, 
  FileText, 
  Check, 
  AlertCircle, 
  Info, 
  ArrowRight 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const DocumentAnalyzer = () => {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'analyzing' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  
  // Simulate the document upload and analysis process
  const handleUpload = () => {
    setUploadState('uploading');
    setProgress(0);
    
    const uploadInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploadState('analyzing');
          simulateAnalysis();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const simulateAnalysis = () => {
    setProgress(0);
    
    const analysisInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(analysisInterval);
          setUploadState('complete');
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-legal-navy">Document Analyzer</CardTitle>
        <CardDescription>
          Upload legal documents for AI-powered analysis
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {uploadState === 'idle' && (
          <div 
            className="border-2 border-dashed border-muted rounded-lg p-10 text-center cursor-pointer hover:bg-legal-grey transition-colors"
            onClick={handleUpload}
          >
            <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-1">Upload Document</h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop your document or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Supports PDF, DOCX, and TXT (Max 10MB)
            </p>
          </div>
        )}
        
        {(uploadState === 'uploading' || uploadState === 'analyzing') && (
          <div className="p-6 text-center">
            <FileText className="h-10 w-10 text-legal-gold mx-auto mb-4 animate-pulse" />
            <h3 className="font-medium mb-3">
              {uploadState === 'uploading' ? 'Uploading Document...' : 'Analyzing Document...'}
            </h3>
            
            <Progress value={progress} className="h-2 mb-2" />
            
            <p className="text-sm text-muted-foreground">
              {uploadState === 'uploading' 
                ? 'Please wait while we upload your document'
                : 'Our AI is analyzing your document for legal insights'}
            </p>
          </div>
        )}
        
        {uploadState === 'complete' && (
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-green-50 text-green-700 rounded border border-green-200">
              <Check className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="text-sm font-medium">Analysis complete</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-legal-lightBlue rounded">
                <Info className="h-5 w-5 text-legal-navy mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Key Legal Points</h4>
                  <p className="text-sm text-muted-foreground">Document contains 3 contractual clauses that may need review</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-amber-50 rounded">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Potential Issues</h4>
                  <p className="text-sm text-muted-foreground">Identified references to outdated legislation</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        {uploadState === 'complete' && (
          <Button className="w-full" variant="outline">
            View Detailed Analysis
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
