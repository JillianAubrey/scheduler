import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe("Appointment Form", () => {

  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  const interviewer = 1;
  const student = "Lydia Miller-Jones"
  
  it("renders without crashing", () => {
    render(
      <Form
        interviewers={interviewers}
      />
    );
  });
  
  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form
        interviewers={interviewers}
      />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });
  
  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form
        interviewers={interviewers}
        student={student}
      />
    );
    expect(getByTestId("student-name-input")).toHaveValue(student);
  });
  
  it("validates that the student name is not blank", () => {
    const onSave = jest.fn()

    const { getByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        interviewer={interviewer}
      />
    );
    
    fireEvent.click(getByText("Save"));
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn()

    const { getByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        student={student}
      />
    );

    fireEvent.click(getByText("Save"));
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name and interviewer are defined", () => {
    const onSave = jest.fn()

    const { queryByText, getByText } = render(
      <Form 
        interviewers={interviewers}
        onSave={onSave}
        student={student}
        interviewer={interviewer} 
      />
    );

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(student, interviewer);
  });

  it("submits the name entered by the user", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form 
        interviewers={interviewers}
        onSave={onSave}
        interviewer={interviewer}
      />
    );
  
    const input = getByPlaceholderText("Enter Student Name");
  
    fireEvent.change(input, { target: { value: student } });
    fireEvent.click(getByText("Save"));
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(student, interviewer);
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        interviewer={interviewer}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: student }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(student, 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student={student}
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: student}
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
})