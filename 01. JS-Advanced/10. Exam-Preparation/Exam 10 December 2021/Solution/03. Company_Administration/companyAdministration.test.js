const companyAdministration = require('./companyAdministration.js')
const { assert } = require('chai').assert;

describe("Tests companyAdministration", function () {
    describe("hiringEmployee", function () {
        it("Should throw error if position is not programmer", function () {
            let name = 'Valentin';
            let position = 'Fighter';
            let yearsExperience = 3;

            assert.throws(() => companyAdministration.hiringEmployee(name, position, yearsExperience), Error, `We are not looking for workers for this position.`);
        });

        it("Should return correct message if years are >= 3", function () {
            let name = 'Valentin';
            let position = 'Programmer';
            let yearsExperience = 3;

            let expectedResult = `${name} was successfully hired for the position ${position}.`;

            assert.equal(companyAdministration.hiringEmployee(name, position, yearsExperience), expectedResult);

            yearsExperience = 5;

            assert.equal(companyAdministration.hiringEmployee(name, position, yearsExperience), expectedResult);
        });

        it("Should return correct message if years < 3", function () {
            let name = 'Valentin';
            let position = 'Programmer';
            let yearsExperience = 2;

            let expectedResult = `${name} is not approved for this position.`;

            assert.equal(companyAdministration.hiringEmployee(name, position, yearsExperience), expectedResult);

            yearsExperience = 0;

            assert.equal(companyAdministration.hiringEmployee(name, position, yearsExperience), expectedResult);
        });
    });

    describe("calculateSalary", function () {
        it("Should throw error if hours is not a number", function () {
            let hours1 = '4';
            let hours2 = 'Hello';
            let hours3 = false;
            let hours4 = undefined;
            let hours5 = [];
            let hours6 = {};

            assert.throws(() => companyAdministration.calculateSalary(hours1), Error, "Invalid hours");

            assert.throws(() => companyAdministration.calculateSalary(hours2), Error, "Invalid hours");

            assert.throws(() => companyAdministration.calculateSalary(hours3), Error, "Invalid hours");

            assert.throws(() => companyAdministration.calculateSalary(hours4), Error, "Invalid hours");

            assert.throws(() => companyAdministration.calculateSalary(hours5), Error, "Invalid hours");

            assert.throws(() => companyAdministration.calculateSalary(hours6), Error, "Invalid hours");
        });

        it("Should throw error if hours < 0", function () {
            let hours1 = -1;
            let hours2 = -4.5;
            let hours3 = -8;


            assert.throws(() => companyAdministration.calculateSalary(hours1), Error, "Invalid hours");

            assert.throws(() => companyAdministration.calculateSalary(hours2), Error, "Invalid hours");

            assert.throws(() => companyAdministration.calculateSalary(hours3), Error, "Invalid hours");
        });

        it("Should return correct amount if hours <= 160", function () {
            let hours1 = 160;
            let hours2 = 100;

            let expectedResult1 = 15 * hours1;
            let expectedResult2 = 15 * hours2;

            assert.equal(companyAdministration.calculateSalary(hours1), expectedResult1);
            assert.equal(companyAdministration.calculateSalary(hours2), expectedResult2);
        });

        it("Should return correct amount if hours > 160", function () {
            let hours1 = 161;
            let hours2 = 200;

            let expectedResult1 = (15 * hours1) + 1000;
            let expectedResult2 = (15 * hours2) + 1000;

            assert.equal(companyAdministration.calculateSalary(hours1), expectedResult1);
            assert.equal(companyAdministration.calculateSalary(hours2), expectedResult2);
        });
    });

    describe("firedEmployee", function () {
        it("Should throw error if employees isnt an array", function () {
            let employees1 = 'Test';
            let employees2 = {};
            let employees3 = 5;
            let employees4 = true;
            let employees5 = undefined;

            let index = 1;

            assert.throws(() => companyAdministration.firedEmployee(employees1, index), Error, "Invalid input");

            assert.throws(() => companyAdministration.firedEmployee(employees2, index), Error, "Invalid input");

            assert.throws(() => companyAdministration.firedEmployee(employees3, index), Error, "Invalid input");

            assert.throws(() => companyAdministration.firedEmployee(employees4, index), Error, "Invalid input");

            assert.throws(() => companyAdministration.firedEmployee(employees5, index), Error, "Invalid input");
        });

        it("Should throw error if index isnt integer", function () {
            let employees = [];

            let index1 = '5';
            let index2 = 2.5;
            let index3 = false;
            let index4 = [];
            let index5 = {};
            let index6 = undefined;

            assert.throws(() => companyAdministration.firedEmployee(employees, index1), Error, "Invalid input");

            assert.throws(() => companyAdministration.firedEmployee(employees, index2), Error, "Invalid input");

            assert.throws(() => companyAdministration.firedEmployee(employees, index3), Error, "Invalid input");

            assert.throws(() => companyAdministration.firedEmployee(employees, index4), Error, "Invalid input");

            assert.throws(() => companyAdministration.firedEmployee(employees, index5), Error, "Invalid input");

            assert.throws(() => companyAdministration.firedEmployee(employees, index6), Error, "Invalid input");
        });

        it("Should throw error if index isnt correct", function () {
            let employees = ["Petar", "Ivan", "George"];

            let index1 = -1;
            let index2 = -5
            let index3 = 3;
            let index4 = 5;

            assert.throws(() => companyAdministration.firedEmployee(employees, index1), Error, "Invalid input");

            assert.throws(() => companyAdministration.firedEmployee(employees, index2), Error, "Invalid input");

            assert.throws(() => companyAdministration.firedEmployee(employees, index3), Error, "Invalid input");

            assert.throws(() => companyAdministration.firedEmployee(employees, index4), Error, "Invalid input");
        });

        it("Should return correct message", function () {
            let employees = ["Petar", "Ivan", "George"];

            let index = 1;

            let expectedResult = 'Petar, George';

            assert.equal(companyAdministration.firedEmployee(employees, index), expectedResult);
        });
    });
});