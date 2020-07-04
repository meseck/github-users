# ☑️ Tasks

1. Setup
    - [x] Brainstorm and research which tools are best suited for the job
    - [x] Write README.md
    - [x] Structure documentation
    - [x] Write down first tasks
    - [x] Structure project
    - [x] Add & config TypeScript
    - [x] Add & config ESLint, Stylelint and Prettier
    - [x] Add & config Jest
    - [x] Add scrips to package.json and add them to README.md
    - [x] Add Styled Components

2. Get First Data
    - [x] ~~Get API key & save it in an environment variable (Dot.env)~~  
          Authentication is not necessary for the user / search endpoint. The limit of 10 request per minute should be no problem.  
          [Search rate limit](https://docs.github.com/en/rest/reference/search#rate-limit)  
    - [x] Install [octokit/request.js](https://github.com/octokit/request.js) (Official client for the GitHub API)
    - [x] Write function to fetch data from endpoint (/users/:username)
    - [x] Write tests for it
    
3. Form View
    - [x] Write hook for fetchUser
    - [x] Display API data
    - [ ] Write tests for hook 
    - [ ] Add searchUser component
    - [ ] Write input handler
    - [ ] Write debounce function and implement it
    - [ ] Write validation function and implement it 
    - [ ] Show output of fetched user
    - [ ] Write function to fetch data from search endpoint
    - [ ] List search output (picture, username, name, location)
    - [ ] Link users to username slug (/users/:username)

4. Results View (User Page)
    - [x] Create dynamic routing with slug (/users/:username)
    - [x] Show username
    - [x] Show full name 
    - [ ] Show profile picture
    - [ ] Show additional information

5. UI / UX
    - [ ] Typography
    - [ ] Layout
    - [ ] Responsiv
    - [ ] Animations?

6. Final Steps
    - [ ] Add screenshot
    - [ ] Deploy

