# MileSton - Blog Management Application

A modern, full-stack blog management application built with React, Vite, and Appwrite. This application provides user authentication, post creation, editing, and management capabilities with a clean and responsive UI.

## 🚀 Features

- **User Authentication**: Complete signup and login system with form validation
- **Post Management**: Create, read, update, and delete blog posts
- **File Upload**: Upload and manage featured images for posts
- **Responsive Design**: Modern UI built with Tailwind CSS
- **State Management**: Redux Toolkit for efficient state management
- **Form Handling**: React Hook Form for robust form validation
- **Rich Text Editor**: TinyMCE integration for content creation

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1, Vite 7.1.2
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: Redux Toolkit 2.8.2, React Redux 9.2.0
- **Backend**: Appwrite 19.0.0
- **Forms**: React Hook Form 7.62.0
- **Rich Text Editor**: TinyMCE React 6.3.0
- **Build Tool**: Vite with ESLint configuration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mileSton.git
   cd mileSton
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Appwrite configuration:
   ```env
   VITE_APPWRITE_URL=your_appwrite_url
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
mileSton/
├── public/
│   └── vite.svg
├── src/
│   ├── appwrite/
│   │   ├── auth.js          # Authentication services
│   │   └── Configure.js     # Appwrite configuration
│   ├── components/
│   │   ├── AuthLayout.jsx   # Authentication layout
│   │   ├── Button.jsx       # Reusable button component
│   │   ├── Input.jsx        # Reusable input component
│   │   ├── Login.jsx        # Login form
│   │   ├── Signup.jsx       # Registration form
│   │   ├── PostCard.jsx     # Post display component
│   │   ├── Header/          # Header components
│   │   ├── Footer/          # Footer components
│   │   └── Container/       # Container components
│   ├── config/
│   │   └── config.js        # App configuration
│   ├── store/
│   │   ├── authSlice.js     # Authentication state
│   │   └── store.js         # Redux store configuration
│   ├── App.jsx              # Main application component
│   ├── App.css              # Global styles
│   ├── index.css            # Tailwind CSS imports
│   └── main.jsx             # Application entry point
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Appwrite Setup

1. Create an Appwrite account at [appwrite.io](https://appwrite.io)
2. Create a new project
3. Set up a database and collection for posts
4. Configure file storage bucket for images
5. Set up authentication methods
6. Update the configuration in `src/config/config.js`

### Database Schema

The application expects the following document structure in your Appwrite collection:

```json
{
  "title": "string",
  "content": "string", 
  "featuredImage": "string (file ID)",
  "status": "string (active/inactive)",
  "userId": "string"
}
```

## 🎨 Features Overview

### Authentication
- User registration with email validation
- Secure login system
- Session management with Redux
- Protected routes

### Post Management
- Create new blog posts with rich text editor
- Upload and manage featured images
- Edit existing posts
- Delete posts
- View post details

### UI/UX
- Responsive design for all screen sizes
- Modern, clean interface
- Form validation with helpful error messages
- Loading states and error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io) for backend services
- [React](https://reactjs.org) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Vite](https://vitejs.dev) for build tooling

## 📞 Support

If you have any questions or need help with setup, please open an issue or contact the development team.

---

**Happy Coding! 🚀**
