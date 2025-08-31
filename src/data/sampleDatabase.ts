// Sample database tables for query practice
export const sampleTables = {
  students: [
    { id: 1, name: 'Alice Johnson', email: 'alice@email.com', major: 'Computer Science', age: 20, enrollment_date: '2023-09-01' },
    { id: 2, name: 'Bob Smith', email: 'bob@email.com', major: 'Mathematics', age: 21, enrollment_date: '2023-09-01' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@email.com', major: 'Computer Science', age: 19, enrollment_date: '2023-09-01' },
    { id: 4, name: 'Diana Prince', email: 'diana@email.com', major: 'Physics', age: 22, enrollment_date: '2023-09-01' },
    { id: 5, name: 'Eve Wilson', email: 'eve@email.com', major: 'Mathematics', age: 20, enrollment_date: '2023-09-01' },
    { id: 6, name: 'Frank Miller', email: 'frank@email.com', major: 'Computer Science', age: 21, enrollment_date: '2023-09-01' },
    { id: 7, name: 'Grace Lee', email: 'grace@email.com', major: 'Physics', age: 19, enrollment_date: '2023-09-01' },
    { id: 8, name: 'Henry Davis', email: 'henry@email.com', major: 'Mathematics', age: 23, enrollment_date: '2023-09-01' }
  ],
  
  courses: [
    { id: 101, title: 'Introduction to Programming', credits: 3, department: 'Computer Science', instructor: 'Dr. Smith' },
    { id: 102, title: 'Database Systems', credits: 4, department: 'Computer Science', instructor: 'Dr. Johnson' },
    { id: 103, title: 'Calculus I', credits: 4, department: 'Mathematics', instructor: 'Prof. Brown' },
    { id: 104, title: 'Linear Algebra', credits: 3, department: 'Mathematics', instructor: 'Prof. Davis' },
    { id: 105, title: 'Physics I', credits: 4, department: 'Physics', instructor: 'Dr. Wilson' },
    { id: 106, title: 'Data Structures', credits: 3, department: 'Computer Science', instructor: 'Dr. Miller' },
    { id: 107, title: 'Discrete Mathematics', credits: 3, department: 'Mathematics', instructor: 'Prof. Lee' }
  ],
  
  enrollments: [
    { id: 1, student_id: 1, course_id: 101, grade: 92.5, semester: 'Fall 2023', enrollment_date: '2023-09-01' },
    { id: 2, student_id: 1, course_id: 102, grade: 88.0, semester: 'Fall 2023', enrollment_date: '2023-09-01' },
    { id: 3, student_id: 2, course_id: 103, grade: 95.0, semester: 'Fall 2023', enrollment_date: '2023-09-01' },
    { id: 4, student_id: 2, course_id: 104, grade: 91.5, semester: 'Fall 2023', enrollment_date: '2023-09-01' },
    { id: 5, student_id: 3, course_id: 101, grade: 87.5, semester: 'Fall 2023', enrollment_date: '2023-09-01' },
    { id: 6, student_id: 3, course_id: 106, grade: 93.0, semester: 'Fall 2023', enrollment_date: '2023-09-01' },
    { id: 7, student_id: 4, course_id: 105, grade: 89.5, semester: 'Fall 2023', enrollment_date: '2023-09-01' },
    { id: 8, student_id: 5, course_id: 103, grade: 96.5, semester: 'Fall 2023', enrollment_date: '2023-09-01' },
    { id: 9, student_id: 5, course_id: 107, grade: 94.0, semester: 'Fall 2023', enrollment_date: '2023-09-01' },
    { id: 10, student_id: 6, course_id: 101, grade: 85.5, semester: 'Fall 2023', enrollment_date: '2023-09-01' },
    { id: 11, student_id: 6, course_id: 102, grade: 90.0, semester: 'Fall 2023', enrollment_date: '2023-09-01' },
    { id: 12, student_id: 7, course_id: 105, grade: 92.0, semester: 'Fall 2023', enrollment_date: '2023-09-01' },
    { id: 13, student_id: 8, course_id: 104, grade: 88.5, semester: 'Fall 2023', enrollment_date: '2023-09-01' }
  ],
  
  departments: [
    { id: 1, name: 'Computer Science', head: 'Dr. Anderson', budget: 500000, building: 'Science Hall' },
    { id: 2, name: 'Mathematics', head: 'Prof. Thompson', budget: 300000, building: 'Math Building' },
    { id: 3, name: 'Physics', head: 'Dr. Rodriguez', budget: 400000, building: 'Physics Lab' }
  ]
};

// Simple SQL query executor (mock implementation)
export function executeQuery(query: string): any[] {
  try {
    const normalizedQuery = query.trim().toLowerCase();
    
    // Handle basic SELECT queries
    if (normalizedQuery.startsWith('select')) {
      return executeSelectQuery(query);
    }
    
    // Handle other query types
    if (normalizedQuery.startsWith('insert') || 
        normalizedQuery.startsWith('update') || 
        normalizedQuery.startsWith('delete')) {
      throw new Error('INSERT, UPDATE, and DELETE operations are not supported in practice mode');
    }
    
    throw new Error('Unsupported query type');
  } catch (error) {
    throw error;
  }
}

function executeSelectQuery(query: string): any[] {
  const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
  
  // Simple SELECT * FROM table queries
  if (normalizedQuery.match(/^select \* from (\w+)$/)) {
    const tableName = normalizedQuery.match(/from (\w+)$/)?.[1];
    if (tableName && sampleTables[tableName as keyof typeof sampleTables]) {
      return sampleTables[tableName as keyof typeof sampleTables];
    }
  }
  
  // SELECT * FROM table LIMIT n
  const limitMatch = normalizedQuery.match(/^select \* from (\w+) limit (\d+)$/);
  if (limitMatch) {
    const [, tableName, limitStr] = limitMatch;
    const limit = parseInt(limitStr);
    if (tableName && sampleTables[tableName as keyof typeof sampleTables]) {
      return sampleTables[tableName as keyof typeof sampleTables].slice(0, limit);
    }
  }
  
  // Handle simple JOINs for demonstration
  if (normalizedQuery.includes('join')) {
    return executeJoinQuery();
  }
  
  // Handle WHERE clauses
  if (normalizedQuery.includes('where')) {
    return executeWhereQuery(normalizedQuery);
  }
  
  // Default case - return students if no specific table found
  return sampleTables.students.slice(0, 5);
}

function executeJoinQuery(): any[] {
  // Mock JOIN result showing students with their course enrollments
  return [
    { name: 'Alice Johnson', title: 'Introduction to Programming', grade: 92.5 },
    { name: 'Alice Johnson', title: 'Database Systems', grade: 88.0 },
    { name: 'Bob Smith', title: 'Calculus I', grade: 95.0 },
    { name: 'Bob Smith', title: 'Linear Algebra', grade: 91.5 },
    { name: 'Charlie Brown', title: 'Introduction to Programming', grade: 87.5 },
    { name: 'Charlie Brown', title: 'Data Structures', grade: 93.0 },
    { name: 'Diana Prince', title: 'Physics I', grade: 89.5 },
    { name: 'Eve Wilson', title: 'Calculus I', grade: 96.5 }
  ];
}

function executeWhereQuery(query: string): any[] {
  // Simple WHERE clause handling
  if (query.includes('grade >') || query.includes('grade>')) {
    return [
      { name: 'Alice Johnson', title: 'Introduction to Programming', grade: 92.5 },
      { name: 'Bob Smith', title: 'Calculus I', grade: 95.0 },
      { name: 'Bob Smith', title: 'Linear Algebra', grade: 91.5 },
      { name: 'Charlie Brown', title: 'Data Structures', grade: 93.0 },
      { name: 'Eve Wilson', title: 'Calculus I', grade: 96.5 },
      { name: 'Eve Wilson', title: 'Discrete Mathematics', grade: 94.0 }
    ];
  }
  
  if (query.includes("major = 'computer science'") || query.includes('major = "computer science"')) {
    return sampleTables.students.filter(s => s.major === 'Computer Science');
  }
  
  // Default WHERE result
  return sampleTables.students.slice(0, 3);
}