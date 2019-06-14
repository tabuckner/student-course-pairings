/**
 * You are a developer for a university. Your current project is to develop a system for students to find courses they share with friends.
 * The university has a system for querying courses students are enrolled in, returned as a list of (ID, course) pairs.
 * 
 * Write a function that takes in a list of (student ID number, course name) pairs and returns, for every pair of students, a list of all courses they share.
 * 
 * SAMPLE OUTPUT:
 * {
 *   [58, 17]: ["Software Design", "Linear Algebra"]
 *   [58, 94]: ["Economics"]
 *   [17, 94]: []
 * }
 */
const studentCoursePairs = [
  ["58", "Software Design"],
  ["58", "Linear Algebra"],
  ["94", "Art History"],
  ["94", "Operating Systems"],
  ["17", "Software Design"],
  ["58", "Mechanics"],
  ["58", "Economics"],
  ["17", "Linear Algebra"],
  ["17", "Political Science"],
  ["94", "Economics"]
];

/**
 * Given an array indicating a students courses, will return an object containing pairs of students with shared courses
 * when calling `.findPairs()`.
 */
class StudentCoursePairer {

  constructor(_studentCourseArr) {
    this.studentCourseArr = _studentCourseArr;
    this.returnObj = {};
  }

  /**
   * Main Method.
   */
  findPairs() {
    this.setUpStudentPairs();
    this.removeNonPairableCourses();
    return this.returnObj;
  }

  /**
   * Initializes the return object keys for all possible student pairs.
   * NOTE: Needed to account for AC for empty array value in example.
   */
  setUpStudentPairs() {
    const studentIds = [];
    const studentIdPairsArr = [];
    for (const element of this.studentCourseArr) {
      const studentId = element[0];
      const studentIdAccountedFor = studentIds.indexOf(studentId) > -1;
      if (!studentIdAccountedFor) {
        studentIds.push(studentId);
      }
    }

    for (let i = 0; i < studentIds.length; i++) {
      for (let j = i + 1; j < studentIds.length; j++) {
        studentIdPairsArr.push([studentIds[i], studentIds[j]]);
      }
    }

    for (const studentIdPair of studentIdPairsArr) {
      if (!(this.returnObj[studentIdPair])) {
        this.returnObj[studentIdPair] = [];
      }
    }

    // console.log(this.returnObj)
  }

  /**
   * Mutates the class property `studentCoursesArr` to remove any courses that are not able to be paired.
   */
  removeNonPairableCourses(){
    const courseFrequency = {};
    for (const element of this.studentCourseArr) {
      const studentId = element[0];
      const courseName = element[1];

      if (!(courseName in courseFrequency)) {
        courseFrequency[courseName] = [];
        courseFrequency[courseName].push(studentId);
      } else if (courseName in courseFrequency) {
        const studentAlreadyCounted = courseFrequency[courseName].indexOf(studentId) > -1;
        if (!studentAlreadyCounted) {
          courseFrequency[courseName].push(studentId);
        }
      }
    }
    // console.log(courseFrequency)

    for (const course in courseFrequency) {
      if (courseFrequency[course].length < 2) {
        delete courseFrequency[course];
      }
    }
    // console.log(courseFrequency)

    for (const course in courseFrequency) {
      if (courseFrequency[course] in this.returnObj) {
        this.returnObj[courseFrequency[course]].push(course); // This does not take into account order of student IDs. Need to sort?
      }
    }

    // console.log(this.returnObj);
  }

};

console.log(new StudentCoursePairer(studentCoursePairs).findPairs())