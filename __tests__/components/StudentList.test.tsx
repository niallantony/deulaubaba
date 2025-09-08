// __tests__/components/StudentList.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { StudentList, StudentRow } from "@/components/StudentList";
import { useStudentStore } from "@/store/currentStudent";

// Mock the global store hook
jest.mock("@/store/currentStudent", () => ({
  useStudentStore: jest.fn(),
}));

describe("Student Components", () => {
  const sampleStudents = [
    { name: "Alice", studentId: "1", imagesrc: "alice.png" },
    { name: "Bob", studentId: "2", imagesrc: "bob.png" },
  ];

  describe("StudentList", () => {
    it("renders student rows and add row", () => {
      const { getAllByText } = render(
        <StudentList studentsData={{ status: 200, students: sampleStudents }} selectedStudent={null} />
      );

      expect(getAllByText(/Alice|Bob|학생 추/)).toHaveLength(3);
    });
  });

  describe("StudentRow", () => {
    it("renders student info correctly", () => {
      const { getByText } = render(
        <StudentRow student={sampleStudents[0]} selected={false} />
      );

      expect(getByText("Alice")).toBeTruthy();
    });

    it("applies selected styles when selected", () => {
      const { getByText } = render(
        <StudentRow student={sampleStudents[0]} selected={true} />
      );

      const nameText = getByText("Alice");
      expect(nameText.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ color: expect.any(String) })])
      );
    });

  });

});
