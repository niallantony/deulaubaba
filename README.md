# 들어바바 (Deulaubaba)

## What is it?

들어바바 (Deulaubaba) is an application developed in conjunction with
researchers in the Special Education of Ewha Women's University in South Korea,
with the aim of simplifying collaboration between educators and parent/guardians
of students with special needs. The application allows dictionaries of student's
communicative behaviours to be synchronised between stakeholders, and for
'projects' aimed at teaching new behaviours to be done collaboratively between
stakeholders.

## Tech Stack

### Application:
<a href="https://skillicons.dev">
  <img src="https://skillicons.dev/icons?i=react,ts,jest" />
</a>

The mobile application was developed in **React-Native** using the **Expo** framework.

Server-side state management is handled using **Tanstack-Query** and local state
management using **Zustand**.

Testing is done using **Jest** and **Testing-Library**

Development uses **TypeScript**.

## Features

### Authentication

<p align="middle">
  <img src="/screenshots/splash.png" width="200" alt="splash page" />
</p>

A JWT authentication flow using Auth0 allows ensures security through a trusted
third-party authentication service.

### Student Management

<p align="middle">
  <img src="/screenshots/student.png" width="200" alt="student profile page" />
  <img src="/screenshots/student_code.png" width="200" alt="student sharing" />
</p>

Student information is kept to only relevent details like age, schools,
education setting and disability. Students are shared through a code which can
be accessed by any user connected with the student. 

<p align="middle">
  <img src="/screenshots/student_feed.png" width="200" alt="a student's feed" />
</p>

Users also have access to a student feed which can be used by all associated
users to share details of a student's progress or behaviour. The feed loads
comments dynamically when the student scrolls up.

<p align="middle">
    <img src="/screenshots/new_student.png" width="200" alt="adding a new student" />
    <img src="/screenshots/new_student_form.png" width="200" alt="new student form" />
</p>

When adding a new student users can manually input the details themselves with
the relevent details. This student is then added to their list and they can
begin sharing it with other stakeholders.

<p align="middle">
    <img src="/screenshots/new_student_code.png" width="200" alt="adding a new student" />
    <img src="/screenshots/new_student_confirm.png" width="200" alt="new student form" />
</p>

Users can also add students which are already in the database using a code they
have received from another user.

### Dictionaries

<p align="middle">
  <img src="/screenshots/dictionary_entry.png" width="200" alt="a dictionary
  entry" />
  <img src="/screenshots/dictionary_entries.png" width="200" alt="all entries" />
</p>

Student's personal 'dictionaries' are created and shared by stakeholders. The
entries in these dictionaries outline the student's communicative behaviours for
other stakeholders to reference. These entries are organised by 'communication
types' (verbal, facial, etc) and 'communication purpose' (pain, refusal, etc).

<p align="middle">
  <img src="/screenshots/dictionary_new_entry_1.png" width="200" alt="making a
  new entry" />
  <img src="/screenshots/dictionary_new_entry_2.png" width="200" alt="entering
  details" />
  <img src="/screenshots/category_picker.png" width="200" alt="picking the
  communication category" />
</p>

Users can create new dictionary entries easily, and each entry is sorted by
'communication type'. The creator of the entry can also edit any details.

