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