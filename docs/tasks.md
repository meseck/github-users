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
    - [x] Add Styled components

2. Get First Data
    - [x] ~~Get API key & save it in an environment variable (Dot.env)~~  
          Authentication is not necessary for the users / search endpoint. The limit of 10 request per minute for the search endpoint and 60 requests per hour for the users endpoint, should be no problem.  
          [Search rate limit](https://docs.github.com/en/rest/reference/search#rate-limit)

    - [x] Install [octokit/request.js](https://github.com/octokit/request.js) (Official client for the GitHub API)
    - [x] Write function to fetch data from endpoint (/users/:username)
    - [x] Write tests for it

3. Form View
    - [x] Write SWR hook for fetchUser
    - [x] Display API data
    - [x] Write test for hook 
    - [x] Add SearchUser component
    - [x] Write debounce hook
    - [x] Write validation function and implement it 
    - [x] Show fetched user data
    - [x] Write function to fetch data from search endpoint (/search/users)
    - [x] Write SWR hook for search endpoint
    - [x] List search output (picture, username)
    - [x] Link users to username slug (/users/:username)
    - [x] Add previous / next page button
    - [x] Write tests for hooks, api & utils 

4. Results View (User Page)
    - [x] Create dynamic routing with slug (/users/:username)
    - [x] Show username
    - [x] Show full name 
    - [x] Show profile picture
    - [x] Show additional information

5. UI / UX
    - [x] Setup global normalize, theme & styles 
    - [x] Structure UI components
    - [x] Create search & show view
    - [x] Add web fonts
    - [x] Add icons
    - [x] Make everthing responsiv
    - [x] Add Octocat
    - [x] Check semantic HTML

6. Final Steps
    - [x] Refactoring
    - [x] Add additional comments
    - [x] Update project structure in the documentation
    - [x] Add screenshot
    - [x] Add links for used tools
    - [x] Write summary
    - [x] Final changes to the documentation
    - [x] Deploy
    
-> WIP
    - [ ] Implement theming and add a button to switch between light / dark theme
    - [ ] Write tests for pages & views
