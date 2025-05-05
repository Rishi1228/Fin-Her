
/**
 * Scheme Importer Utility
 * 
 * This utility helps import schemes from various data formats.
 */

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
