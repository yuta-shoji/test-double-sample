import {describe, expect, test} from 'vitest'
import {DefaultStudentService, Student} from "../StudentService.ts";

describe('DefaultStudentService', () => {
    describe('setStudents', () => {
        test('受け取った文字列を分解し、正しくStudentをセットする', () => {
            const studentText1 = '1 taro 18 2006-01-01 HogeHighSchool 3'
            const studentText2 = '2 jiro 17 2007-02-02 HogeHighSchool 2'
            const text = `${studentText1},${studentText2}`
            const studentService = new DefaultStudentService()

            studentService.setStudents(text)

            const actualStudents = studentService.students
            const expectedStudents = [
                {
                    attendanceNumber: 1,
                    name: 'taro',
                    age: 18,
                    birthday: new Date('2006-01-01'),
                    schoolName: 'HogeHighSchool',
                    gradeInSchool: 3,
                },
                {
                    attendanceNumber: 2,
                    name: 'jiro',
                    age: 17,
                    birthday: new Date('2007-02-02'),
                    schoolName: 'HogeHighSchool',
                    gradeInSchool: 2,
                },
            ]
            expect(actualStudents).toEqual(expectedStudents)
        })
    })

    describe('getStudentBy', () => {
        test('schoolNameとgradeInSchoolで絞って返す', () => {
            const studentService = new DefaultStudentService()
            const expectedStudent = StudentBuilder.build({schoolName: 'School B', gradeInSchool: 3})
            studentService.students = [
                StudentBuilder.build({schoolName: 'School A', gradeInSchool: 2}),
                StudentBuilder.build({schoolName: 'School A', gradeInSchool: 3}),
                StudentBuilder.build({schoolName: 'School B', gradeInSchool: 2}),
                expectedStudent,
                StudentBuilder.build({schoolName: 'School C', gradeInSchool: 3}),
                StudentBuilder.build({schoolName: 'School C', gradeInSchool: 2}),
            ]

            const actualStudents = studentService.getStudentsBy('School B', 3)

            expect(actualStudents.length).toEqual(1)
            expect(actualStudents[0]).toEqual(expectedStudent)
        })
    })
})

class StudentBuilder {
    static build(overrides: Partial<Student> = {}): Student {
        return {
            attendanceNumber: 0,
            name: '',
            age: 0,
            birthday: new Date(),
            schoolName: '',
            gradeInSchool: 0,
            ...overrides,
        }
    }
}