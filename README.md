# Check out the live demo

# [Demo](https://users-list-ijyz3sbxe-seriuksergiis-projects.vercel.app)

## Installation

## To run this project locally:

1.	Create and open new directory: mkdir users-list/ cd users-list

2.	Clone the Repository:

        git clone https://github.com/seriuksergii/users-list.git

3.	Install dependencies:

          npm install

4.	Start the application:
 
          npm run dev

 ## TASK CONDITION
 
## Cookies:

Create a component with a select dropdown and a checkbox. Depending on the checkbox selection, the data from the select will either be saved in cookies (with a 15-minute expiration) or not. The task assumes that no external libraries will be used to work with cookies.

## REST API:

Implement a page displaying a list of users. For each user, display their name and company information. Additionally, you should implement actions for adding, deleting, and editing users. Use the data from the JSONPlaceholder API: https://jsonplaceholder.typicode.com/users

It is acceptable to use external libraries like axios or tanstack query to complete this task.

## Store set, get (pinia)

For this task, you need to add an array of objects in the store, which can be added to, deleted from, or edited. Deletion and editing should happen strictly by ID. (The task assumes that nested elements of the object will be edited).

The array elements will have the following structure:
```
[
  {
    id: 1,
    title: 'sample text',
    description: 'sample',
    assignedUser: {
      id: 1,
      name: 'sample',
      email: 'sample@sample.com'
    }
  }, {
    id: 2,
    title: 'sample text2',
    description: 'sample2',
    assignedUser: {
      id: 2,
      name: 'sample2',
      email: 'sample2@sample.com'
    }
  }
]
```


## Technologies Used:

•	Vue3

•	TypeScript

•	CSS

•        API JSONPlaceholder

•        Pinia

•        UUID

•        axios
