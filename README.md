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

 Main Requirements:

List of Heroes: Using the API sw-api.starnavi.io, display a list of all Star Wars heroes.   The list should be paginated or have infinite scroll, based on your choice.
Detailed Information about a Hero: When clicking on a specific hero, display detailed information in the form of a graph, where:  
The main node is the selected hero.  
There are connections from the hero to the movies in which they appeared.
From each movie, there are connections to the starships that the hero traveled on.
Technologies:

React.js
Graph Visualization: React Flow
Testing: Jest or Vitest
TypeScript is recommended.
 
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

React.js:
For building the user interface and creating components.
React Router:
For routing and navigation within the application (BrowserRouter, Routes, Route).
SCSS:
For styling components (e.g., index.scss, App.scss, HeroGraph.scss, FilmNode.scss).
React Flow:
For visualizing graphs and managing nodes and edges.
TypeScript:
For adding type safety to the code and defining component props (e.g., HeroGraphProps, FilmNodeProps).
Jest:
For testing components, including assertions (e.g., @testing-library/react, @testing-library/jest-dom).
Fetch API:
For making asynchronous requests to the Star Wars API to retrieve hero and film data.
Functions and Features
Hero Details and Graph Visualization:
Fetches and displays details of a selected hero using a visual graph with nodes for films and starships.
Pagination or Infinite Scroll:
The design suggests implementing pagination or infinite scroll for the hero list.
Modal Component:
Utilizes a modal (HeroModal) to display additional information about the hero.
