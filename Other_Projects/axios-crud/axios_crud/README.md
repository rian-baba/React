# Axios CRUD Application

## Project Overview
Ye ek simple React application hai jo Axios library ka use karke CRUD (Create, Read, Update, Delete) operations perform karta hai. Is application mein user posts create, view, update aur delete kar sakta hai.

## Features
- **Create**: Naye posts add karne ki functionality
- **Read**: Existing posts ko display karne ki functionality
- **Update**: Existing posts ko edit karne ki functionality
- **Delete**: Posts ko delete karne ki functionality

## Technologies Used
- **React**: UI components ke liye
- **Axios**: API requests handle karne ke liye
- **Tailwind CSS**: Styling ke liye
- **Vite**: Development environment ke liye

## Project Structure
```
axios_crud/
├── src/
│   ├── App.jsx           # Main application component
│   ├── App.css           # Main CSS file
│   ├── Component/
│   │   ├── get.jsx       # Posts display aur delete functionality
│   │   └── postforms.jsx # Create aur update forms
│   └── api/
│       └── axios.js      # API calls ke functions
```

## Installation
1. Repository ko clone karein:
```
git clone <repository-url>
```

2. Project directory mein jaayein:
```
cd axios_crud
```

3. Dependencies install karein:
```
npm install
```

4. Application ko run karein:
```
npm run dev
```

## Usage
- Home page par aapko existing posts ki list dikhegi
- "Add" button se aap new post create kar sakte hain
- Har post ke saath "Edit" aur "Delete" buttons hain
- "Edit" button click karke aap post ko update kar sakte hain
- "Delete" button click karke aap post ko delete kar sakte hain

## API Integration
Is application mein external API se data fetch kiya jata hai aur CRUD operations perform kiye jate hain. API calls ke liye Axios library ka use kiya gaya hai.

## Contributing
Agar aap is project mein contribute karna chahte hain, to please fork karein aur pull request submit karein.

## License
MIT
