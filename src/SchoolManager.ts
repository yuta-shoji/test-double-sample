import StudentService, {Student} from "./StudentService.ts";

export interface School {
    name: string
    thirdStudents: Student[]
}

export default interface SchoolManager {
    school: School
    createSchool(texts: string[]): School
}

export class DefaultSchoolManager implements SchoolManager {
    school: School = {name: '', thirdStudents: []}

    constructor(
        schoolName: string,
        private studentService: StudentService,
    ) {
        this.school.name = schoolName
    }

    createSchool(studentTexts: string[]): School {
        studentTexts.forEach(studentText => {
            this.studentService.setStudent(studentText)
            const thirdStudents = this.studentService.getStudentsBy(this.school.name, 3)
            this.school.thirdStudents.push(...thirdStudents)
        })

        return this.school
    }
}