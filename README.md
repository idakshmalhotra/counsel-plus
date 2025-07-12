# Admission Management System

A full-stack web application for managing college admission applications with user authentication, form submission, and admin dashboard.

## 🚀 Features

- **User Authentication**: JWT-based login/signup system
- **Multi-step Form**: Personal details, address, education, and branch preference
- **Admin Dashboard**: View and manage all submissions
- **File Upload**: Support for document uploads
- **Responsive Design**: Mobile-friendly interface
- **Real-time Validation**: Form validation with Yup
- **Excel Export**: Export submissions to Excel format

## 📁 Project Structure

```
counsel-plus/
├── frontend/admission management/    # React frontend (Vite)
├── backend/                         # Node.js/Express backend
├── admin-panel/                     # Admin panel (separate frontend)
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Redux Toolkit
- Formik & Yup
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (file uploads)
- Multer

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Cloudinary account (for file uploads)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd counsel-plus
```

2. **Install Frontend Dependencies**
```bash
cd frontend/admission\ management
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../../backend
npm install
```

4. **Environment Setup**
Create `.env` files in the backend directory:

```env
# Backend .env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=3000
```

5. **Start Development Servers**

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend/admission\ management
npm run dev
```

## 🚀 Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### Frontend Deployment (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set build settings:
   - Build Command: `cd frontend/admission\ management && npm install && npm run build`
   - Output Directory: `frontend/admission management/dist`
   - Install Command: `cd frontend/admission\ management && npm install`

#### Backend Deployment (Railway)
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Set the root directory to `backend`
4. Railway will automatically detect and deploy your Node.js app

### Option 2: Netlify + Render

#### Frontend Deployment (Netlify)
1. Connect your repository to Netlify
2. Set build settings:
   - Build Command: `cd frontend/admission\ management && npm install && npm run build`
   - Publish Directory: `frontend/admission management/dist`

#### Backend Deployment (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables
4. Set root directory to `backend`

### Option 3: AWS/Google Cloud/Azure

For enterprise deployments, consider:
- **Frontend**: AWS S3 + CloudFront, Google Cloud Storage, or Azure Blob Storage
- **Backend**: AWS EC2, Google Cloud Run, or Azure App Service
- **Database**: MongoDB Atlas (cloud-hosted MongoDB)

## 🔧 Production Configuration

### Frontend Configuration
Update API endpoints in your frontend code to point to your production backend URL.

### Backend Configuration
1. Set production environment variables
2. Configure CORS for your frontend domain
3. Set up proper logging and monitoring
4. Configure rate limiting and security headers

### Database Setup
1. Use MongoDB Atlas for cloud-hosted database
2. Set up proper indexes for performance
3. Configure backup and monitoring

## 📝 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data to version control
2. **CORS**: Configure CORS to only allow your frontend domain
3. **Rate Limiting**: Implement rate limiting on your API endpoints
4. **Input Validation**: Validate all user inputs on both frontend and backend
5. **HTTPS**: Always use HTTPS in production
6. **JWT Security**: Use strong JWT secrets and implement proper token expiration

## 📊 Monitoring & Analytics

Consider implementing:
- Application performance monitoring (APM)
- Error tracking (Sentry)
- User analytics
- Database performance monitoring
- Uptime monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Happy Deploying! 🚀**
