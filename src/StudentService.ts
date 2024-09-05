export interface Student {
    attendanceNumber: number
    name: string
    age: number
    birthday: Date
    schoolName: string
    gradeInSchool: number
}

export default interface StudentService {
    students: Student[]
    setStudents(text: string): void
    getStudentsBy(schoolName: string, gradeInSchool: number): Student[]
}

export class DefaultStudentService implements StudentService {
    students: Student[] = []

    setStudents(text: string) {
        const studentStrings = text.split(',')
        studentStrings.forEach(studentString => {
            const studentInfoStrings = studentString.split(' ')
            const student: Student = {
                attendanceNumber: +studentInfoStrings[0],
                name: studentInfoStrings[1],
                age: +studentInfoStrings[2],
                birthday: new Date(studentInfoStrings[3]),
                schoolName: studentInfoStrings[4],
                gradeInSchool: +studentInfoStrings[5],
            }

            this.students.push(student)
        })
    }

    getStudentsBy(schoolName: string, gradeInSchool: number): Student[] {
        return this.students.filter(student => {
            return student.schoolName === schoolName && student.gradeInSchool === gradeInSchool
        })
    }
}
