
/**
 * Scheme Importer Utility
 * 
 * This utility helps import schemes from various data formats.
 */
import * as XLSX from 'xlsx';

// Define the Scheme interface to match our application's scheme structure
export interface Scheme {
  id: number;
  title: string;
  category: string;
  eligibility: string;
  documents: string[];
  description: string;
  benefits: string;
}

/**
 * Import schemes from a CSV string
 * Expected format:
 * id,title,category,eligibility,documents,description,benefits
 */
export const importFromCSV = (csvContent: string): Scheme[] => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  
  const schemes: Scheme[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',');
    
    // Basic validation
    if (values.length < headers.length) continue;
    
    const scheme: any = {
      id: parseInt(values[0]),
      title: values[1],
      category: values[2],
      eligibility: values[3],
      documents: values[4].split(';'),
      description: values[5],
      benefits: values[6]
    };
    
    schemes.push(scheme as Scheme);
  }
  
  return schemes;
};

/**
 * Import schemes from a JSON string or object
 */
export const importFromJSON = (jsonContent: string | object): Scheme[] => {
  let schemes: any[] = [];
  
  if (typeof jsonContent === 'string') {
    try {
      schemes = JSON.parse(jsonContent);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return [];
    }
  } else {
    schemes = jsonContent as any[];
  }
  
  // Validate each scheme has required fields
  return schemes.filter(scheme => 
    scheme.id && scheme.title && scheme.category && 
    scheme.eligibility && Array.isArray(scheme.documents) && 
    scheme.description && scheme.benefits
  );
};

/**
 * Import schemes from an Excel file
 * @param excelBuffer The ArrayBuffer containing the Excel file data
 */
export const importFromExcel = (excelBuffer: ArrayBuffer): Scheme[] => {
  try {
    // Read the Excel file
    const workbook = XLSX.read(excelBuffer, { type: 'array' });
    
    // Assume the first sheet contains the data
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    // Process the data to match our Scheme interface
    const schemes = jsonData.map((row: any, index) => {
      // Handle documents array (assuming they're separated by semicolons in the Excel cell)
      const documents = row.documents ? 
        (typeof row.documents === 'string' ? row.documents.split(';') : [row.documents.toString()]) : 
        [];
      
      return {
        id: row.id || index + 1, // Use provided ID or generate one
        title: row.title || '',
        category: row.category || '',
        eligibility: row.eligibility || '',
        documents: documents,
        description: row.description || '',
        benefits: row.benefits || ''
      } as Scheme;
    });
    
    // Filter out invalid schemes
    return schemes.filter(scheme => 
      scheme.title && scheme.category && 
      scheme.eligibility && scheme.documents.length > 0 && 
      scheme.description && scheme.benefits
    );
  } catch (error) {
    console.error('Failed to parse Excel file:', error);
    return [];
  }
};

/**
 * Add imported schemes to the existing schemes array
 * This can be replaced with actual DB integration later
 */
export const addImportedSchemesToExistingArray = (
  existingSchemes: Scheme[],
  newSchemes: Scheme[]
): Scheme[] => {
  // Get highest ID to avoid duplicates
  const highestId = Math.max(...existingSchemes.map(scheme => scheme.id), 0);
  
  // Assign new IDs to imported schemes to avoid conflicts
  const processedNewSchemes = newSchemes.map((scheme, index) => ({
    ...scheme,
    id: highestId + index + 1
  }));
  
  return [...existingSchemes, ...processedNewSchemes];
};

/**
 * Convert schemes to CSV format for export
 */
export const exportToCSV = (schemes: Scheme[]): string => {
  const headers = 'id,title,category,eligibility,documents,description,benefits';
  
  const rows = schemes.map(scheme => {
    const documents = scheme.documents.join(';');
    return `${scheme.id},"${scheme.title}","${scheme.category}","${scheme.eligibility}","${documents}","${scheme.description}","${scheme.benefits}"`;
  });
  
  return [headers, ...rows].join('\n');
};

/**
 * Export schemes to Excel format
 */
export const exportToExcel = (schemes: Scheme[]): ArrayBuffer => {
  // Format the data for Excel
  const excelData = schemes.map(scheme => ({
    id: scheme.id,
    title: scheme.title,
    category: scheme.category,
    eligibility: scheme.eligibility,
    documents: scheme.documents.join(';'),
    description: scheme.description,
    benefits: scheme.benefits
  }));
  
  // Create a worksheet from the data
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  
  // Create a workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Schemes");
  
  // Generate the Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  return excelBuffer;
};
