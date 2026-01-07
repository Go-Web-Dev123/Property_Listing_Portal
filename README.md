
*(These are demo-only credentials stored locally.)*

# Property Listing React App

## Demo Credentials
Use the following credentials to log in to the application:

Email: demo@property.com
Password: Demo@123

---

## Navigation Flow
The application supports the following navigation behavior:

1. **Login Page (`/`)**
   - Users authenticate using the demo credentials above.
   - On successful login, a local authorization token is created and stored in `localStorage`.

2. **Search Results Page**
   - Fetches a list of properties from the API and displays them in a responsive card grid.
   - Users can filter results by:
     - Number of bedrooms
     - Neighborhood name (prefix-based search)
     - Minimum & maximum price
   - Clicking **"View Details"** on any property card triggers navigation to the detail view.

3. **Dynamic Detail View**
   - Shows a very large property image on the left and property details on the right.
   - **"Back to Search"** button is placed at the top navigation bar for easy return.

4. **Logout**
   - Logout clears the locally stored authorization token and redirects the user back to the login page.

---

## Tech Stack
- React JS (Create React App)
- Bootstrap for responsive layout & styling
- Local `localStorage` based authorization guard

---

## How to Run on Localhost

### 1. Install Dependencies
Open a terminal inside the `my-app` project root and run:

**npm install**
**npm start**
The application will launch at: http://localhost:3000


