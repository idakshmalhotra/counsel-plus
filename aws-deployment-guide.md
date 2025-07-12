# AWS Deployment Guide for Admission Management System

## 🚀 AWS Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Route 53      │    │   CloudFront    │    │   S3 Bucket     │
│   (Domain)      │───▶│   (CDN)         │───▶│   (Frontend)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   MongoDB       │    │   EC2/ECS       │    │   Application   │
│   Atlas         │◀───│   (Backend)     │◀───│   Load Balancer │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

1. **AWS Account** with appropriate permissions
2. **Domain Name** (optional, but recommended)
3. **MongoDB Atlas** account for database
4. **Cloudinary** account for file uploads

## 🛠️ Step-by-Step Deployment

### Step 1: Prepare Your Application

1. **Update API URLs for Production**
   ```bash
   # In your frontend code, update all API calls to use environment variables
   # Example: Replace hardcoded URLs with VITE_API_URL
   ```

2. **Create Production Environment Files**
   ```bash
   # Frontend (.env.production)
   VITE_API_URL=https://your-api-domain.com
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   
   # Backend (.env.production)
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=production
   PORT=3000
   ```

### Step 2: Deploy Frontend to S3 + CloudFront

#### 2.1 Create S3 Bucket
```bash
# Using AWS CLI
aws s3 mb s3://your-admission-app-frontend
aws s3 website s3://your-admission-app-frontend --index-document index.html --error-document index.html
```

#### 2.2 Build and Upload Frontend
```bash
# Build the application
cd frontend/admission\ management
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-admission-app-frontend --delete
```

#### 2.3 Configure S3 Bucket Policy
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-admission-app-frontend/*"
        }
    ]
}
```

#### 2.4 Create CloudFront Distribution
1. Go to CloudFront console
2. Create distribution
3. Origin: S3 bucket (your-admission-app-frontend)
4. Default root object: index.html
5. Error pages: Redirect 403/404 to /index.html (for SPA routing)

### Step 3: Deploy Backend to EC2

#### 3.1 Launch EC2 Instance
```bash
# Recommended specifications:
# - Instance Type: t3.small or t3.medium
# - OS: Amazon Linux 2 or Ubuntu 20.04
# - Storage: 20GB GP2
# - Security Group: Allow HTTP(80), HTTPS(443), SSH(22)
```

#### 3.2 Connect and Setup EC2
```bash
# Connect to your EC2 instance
ssh -i your-key.pem ec2-user@your-ec2-ip

# Update system
sudo yum update -y  # For Amazon Linux
# OR
sudo apt update && sudo apt upgrade -y  # For Ubuntu

# Install Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2
```

#### 3.3 Deploy Backend Code
```bash
# Clone your repository
git clone https://github.com/your-username/your-repo.git
cd your-repo/backend

# Install dependencies
npm install

# Create production environment file
nano .env
# Add your production environment variables

# Start the application with PM2
pm2 start src/server.js --name "admission-backend"
pm2 startup
pm2 save
```

#### 3.4 Configure Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo yum install nginx -y

# Configure Nginx
sudo nano /etc/nginx/conf.d/admission-app.conf
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-api-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### Step 4: Setup SSL with AWS Certificate Manager

#### 4.1 Request SSL Certificate
1. Go to AWS Certificate Manager
2. Request certificate for your domain
3. Validate via DNS or email

#### 4.2 Update CloudFront Distribution
1. Edit your CloudFront distribution
2. Add SSL certificate
3. Update behaviors to redirect HTTP to HTTPS

#### 4.3 Update Nginx for SSL (if using custom domain)
```nginx
server {
    listen 443 ssl;
    server_name your-api-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:3000;
        # ... other proxy settings
    }
}
```

### Step 5: Setup Domain and DNS

#### 5.1 Route 53 Configuration
1. Create hosted zone for your domain
2. Create A record pointing to CloudFront distribution
3. Create A record for API pointing to EC2 instance (or load balancer)

#### 5.2 Update Environment Variables
```bash
# Update frontend .env.production
VITE_API_URL=https://api.yourdomain.com

# Update backend .env
FRONTEND_URL=https://yourdomain.com
```

### Step 6: Monitoring and Logging

#### 6.1 CloudWatch Setup
```bash
# Install CloudWatch agent
sudo yum install amazon-cloudwatch-agent -y

# Configure CloudWatch
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

#### 6.2 PM2 Monitoring
```bash
# Monitor your application
pm2 monit

# View logs
pm2 logs admission-backend
```

## 🔧 Alternative: ECS Deployment (Recommended for Production)

### Step 1: Create Dockerfile for Backend
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Step 2: Create ECS Task Definition
```json
{
    "family": "admission-backend",
    "networkMode": "awsvpc",
    "requiresCompatibilities": ["FARGATE"],
    "cpu": "256",
    "memory": "512",
    "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
    "containerDefinitions": [
        {
            "name": "admission-backend",
            "image": "your-ecr-repo/admission-backend:latest",
            "portMappings": [
                {
                    "containerPort": 3000,
                    "protocol": "tcp"
                }
            ],
            "environment": [
                {
                    "name": "NODE_ENV",
                    "value": "production"
                }
            ],
            "secrets": [
                {
                    "name": "MONGO_URI",
                    "valueFrom": "arn:aws:secretsmanager:region:account:secret:mongodb-uri"
                }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "/ecs/admission-backend",
                    "awslogs-region": "us-east-1",
                    "awslogs-stream-prefix": "ecs"
                }
            }
        }
    ]
}
```

### Step 3: Create ECS Service
1. Create ECS cluster
2. Create service with load balancer
3. Configure auto-scaling policies

## 🔒 Security Best Practices

### 1. IAM Roles and Policies
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::your-bucket/*"
        }
    ]
}
```

### 2. Security Groups
```bash
# Frontend (CloudFront handles security)
# Backend Security Group
- Inbound: HTTP(80), HTTPS(443), SSH(22) from your IP
- Outbound: All traffic
```

### 3. Environment Variables
- Use AWS Secrets Manager for sensitive data
- Never commit .env files to version control
- Use IAM roles for EC2/ECS instances

## 📊 Monitoring and Alerts

### 1. CloudWatch Alarms
- CPU utilization > 80%
- Memory utilization > 80%
- HTTP 5xx errors > 1%
- Response time > 2 seconds

### 2. Application Monitoring
- Set up CloudWatch Logs
- Configure log retention policies
- Create custom metrics

## 🚀 Deployment Scripts

### Automated Deployment Script
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Starting deployment..."

# Build frontend
echo "📦 Building frontend..."
cd frontend/admission\ management
npm run build

# Upload to S3
echo "📤 Uploading to S3..."
aws s3 sync dist/ s3://your-admission-app-frontend --delete

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

# Deploy backend (if using EC2)
echo "🔧 Deploying backend..."
ssh -i your-key.pem ec2-user@your-ec2-ip "cd /path/to/app && git pull && npm install && pm2 restart admission-backend"

echo "✅ Deployment completed!"
```

## 💰 Cost Optimization

### 1. EC2 Instance Sizing
- Start with t3.small for development
- Monitor usage and scale accordingly
- Use reserved instances for production

### 2. S3 and CloudFront
- Enable S3 lifecycle policies
- Configure CloudFront caching
- Use S3 Intelligent Tiering

### 3. Database
- Use MongoDB Atlas free tier for development
- Scale based on usage patterns

## 🆘 Troubleshooting

### Common Issues:
1. **CORS Errors**: Update CORS configuration in backend
2. **SSL Issues**: Verify certificate configuration
3. **Database Connection**: Check MongoDB Atlas network access
4. **Performance**: Monitor CloudWatch metrics

### Useful Commands:
```bash
# Check application status
pm2 status
pm2 logs admission-backend

# Check nginx status
sudo systemctl status nginx
sudo nginx -t

# Check CloudWatch logs
aws logs describe-log-groups
aws logs tail /ecs/admission-backend --follow
```

---

**Happy Deploying on AWS! 🚀** 