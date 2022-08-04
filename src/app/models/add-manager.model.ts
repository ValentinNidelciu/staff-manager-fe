export interface AddManagerDTO {
    name: string,
    email: string,
    dateOfBirth: Date,
    departmentId: string,
    subordinatedEmployeeIds: string[]
}