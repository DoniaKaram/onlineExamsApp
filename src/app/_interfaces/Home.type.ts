export type catogeryType={
    _id:string,
    name:string,
    icon:string,
    createdAt:string
}
export type examType={
    _id:string,
    title:string,
    duration:number,
    subject:string,
    numberOfQuestions:number,
    active:boolean,
    createdAt:string
}
export type questionType={
    answers:string[
    ]
    correct:string,
    createdAt:string,
    exam:object
    question:string,
    subject:object,
    type:string,
    _id:string
}
