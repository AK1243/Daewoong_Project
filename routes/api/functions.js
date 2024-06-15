const express = require('express');
const router = express.Router();
const Subject = require('../../models/subjects');
const Student = require('../../models/students');
const Teacher = require('../../models/teachers');
const Class = require('../../models/classes');
const Grade = require('../../models/grades');

//Subject apis
router.post("/subjects", async (req, res) => {
    const subject = new Subject(req.body);
    await subject.save();
    return res.status(200).json(subject);
})

//Student apis
router.post("/students", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    return res.status(200).json(student);
})

router.get('/students/:studentId/gpa/:semester/:year', async (req, res) => {
    const { studentId, semester, year } = req.params;
    const grades = await Grade.find({ student_id: studentId, semester, year });

    if (!(grades.length >= 1))
        return res.status(404).json("No grades found for the given data.");

    let total = 0;
    for (let g of grades) {
        if (g.grade === 'A') {
            total += 4;
        } else if (g.grade === 'B') {
            total += 3;
        } else if (g.grade === 'C') {
            total += 2;
        } else if (g.grade === 'D') {
            total += 1;
        } else if (g.grade === 'F') {
            total += 0;
        }
    }

    const gpa = total / grades.length;

    return res.status(200).json(gpa);
});

router.get('/students/:studentId/gpa', async (req, res) => {
    const grades = await Grade.find({ student_id: req.params.studentId });

    if (!(grades.length >= 1))
        return res.status(404).json("No grades found for the given data.");

    let total = 0;
    for (let g of grades) {
        if (g.grade === 'A') {
            total += 4;
        } else if (g.grade === 'B') {
            total += 3;
        } else if (g.grade === 'C') {
            total += 2;
        } else if (g.grade === 'D') {
            total += 1;
        } else if (g.grade === 'F') {
            total += 0;
        }
    }

    const gpa = total / grades.length;

    return res.status(200).json(gpa);
});

router.get('/students/:studentId/grades', async (req, res) => {
    const grades = await Grade.find({ student_id: req.params.studentId });
    return res.status(200).json(grades);
});

//Teacher apis
router.post('/teachers', async (req, res) => {
    const teacher = new Teacher(req.body);
    await teacher.save();
    return res.status(200).json(teacher);
});

router.get('/teachers/:teacherId/classes', async (req, res) => {
    const classes = await Class.find({ teacher_id: req.params.teacherId });
    return res.status(200).json(classes);
});

//Class apis
router.post('/classes', async (req, res) => {
    const class1 = new Class(req.body);
    await class1.save();
    return res.status(200).json(class1);
});

router.put('/classes/:classId/enroll', async (req, res) => {
    const class1 = await Class.findById(req.params.classId);
    class1.student_ids.push(...req.body.student_ids);
    await class1.save();
    return res.status(200).json(class1);
});

router.delete('/classes/:classId/drop', async (req, res) => {
    const class1 = await Class.findById(req.params.classId);
    for (let i = class1.student_ids.length; i > 0; i--) {
        if (class1.student_ids[i - 1] === req.body.student_id)
            class1.student_ids.splice(i - 1, i)
    }
    await class1.save();
    return res.status(200).json(class1);
});

//Grade apis
router.post('/grades', async (req, res) => {
    const grade = new Grade(req.body);
    await grade.save();
    return res.status(200).json(grade);
});

router.put('/grades/:gradeId', async (req, res) => {
    const grade = req.body.grade;
    const newGrade = await Grade.findByIdAndUpdate(req.params.gradeId, { grade }, { new: true });
    return res.status(200).json(newGrade);
});

router.get('/grades/class/:classId', async (req, res) => {
    const grades = await Grade.find({ class_id: req.params.classId });
    return res.status(200).json(grades);
});

module.exports = router;