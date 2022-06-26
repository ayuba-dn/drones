
export default interface Course {
    title:string,
    code:string,
    department:string,
    level: number,
    catscore: number, //this is the score alloted to each student for continuous assessment
    catcap: number, //this is the highest score for continuous assessment
    examscore: number, // this is the score alloted to each student for continuous assessment
    examcap: number, //this is the highest score a student can get in an examination
    semester: string,
    units: number,
    type: string
}


