# 🚀 AWS Quick Start Guide

## Prerequisites Setup (5 minutes)

### 1. Install AWS CLI
```bash
# macOS
brew install awscli

# Or download from AWS website
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

### 2. Configure AWS CLI
```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter your default region (e.g., us-east-1)
# Enter your output format (json)
```

### 3. Install Docker (for containerized deployment)
```bash
# macOS
brew install --cask docker
```

## 🎯 Quick Deployment Steps

### Step 1: Create AWS Resources (10 minutes)

#### 1.1 Create S3 Bucket for Frontend
```bash
# Replace with your unique bucket name
aws s3 mb s3://your-admission-app-frontend-$(date +%s)
aws s3 website s3://your-admission-app-frontend-$(date +%s) --index-document index.html --error-document index.html
```

#### 1.2 Launch EC2 Instance
```bash
# Create security group
aws ec2 create-security-group --group-name admission-app-sg --description "Security group for admission app"

# Add rules
aws ec2 authorize-security-group-ingress --group-name admission-app-sg --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name admission-app-sg --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name admission-app-sg --protocol tcp --port 443 --cidr 0.0.0.0/0

# Launch instance (replace with your key pair name)
aws ec2 run-instances \
  --image-id ami-0c02fb55956c7d316 \
  --count 1 \
  --instance-type t3.small \
  --key-name your-key-pair \
  --security-groups admission-app-sg \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=admission-app-backend}]'
```

### Step 2: Update Configuration (2 minutes)

#### 2.1 Update deployment script variables
```bash
# Edit deploy-aws.sh and update these variables:
BUCKET_NAME="your-actual-bucket-name"
EC2_INSTANCE_IP="your-ec2-ip"
EC2_KEY_PATH="path/to/your-key.pem"
```

#### 2.2 Create environment files
```bash
# Backend environment
cp backend/env.example backend/.env
# Edit backend/.env with your production values

# Frontend environment
cp frontend/admission\ management/env.example frontend/admission\ management/.env.production
# Edit with your production API URL
```

### Step 3: Deploy (5 minutes)

#### 3.1 Run the deployment script
```bash
./deploy-aws.sh
```

#### 3.2 Or deploy manually
```bash
# Build and deploy frontend
cd frontend/admission\ management
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete

# Deploy backend
cd ../../backend
# Follow the EC2 setup instructions in aws-deployment-guide.md
```

## 🔧 Alternative: Docker Deployment

### Quick Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Or deploy to ECS
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com

# Build and push images
docker build -t admission-backend .
docker tag admission-backend:latest your-account.dkr.ecr.us-east-1.amazonaws.com/admission-backend:latest
docker push your-account.dkr.ecr.us-east-1.amazonaws.com/admission-backend:latest
```

## 🌐 Domain Setup (Optional)

### 1. Register Domain in Route 53
```bash
# Or use existing domain
aws route53 create-hosted-zone --name yourdomain.com --caller-reference $(date +%s)
```

### 2. Create SSL Certificate
```bash
# Request certificate
aws acm request-certificate --domain-name yourdomain.com --validation-method DNS
```

### 3. Update DNS Records
```bash
# Create A record for frontend (CloudFront)
# Create A record for backend (EC2)
```

## 📊 Monitoring Setup (5 minutes)

### 1. CloudWatch Alarms
```bash
# CPU utilization alarm
aws cloudwatch put-metric-alarm \
  --alarm-name "admission-app-cpu" \
  --alarm-description "CPU utilization high" \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2
```

### 2. Log Monitoring
```bash
# Install CloudWatch agent on EC2
sudo yum install amazon-cloudwatch-agent -y
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

## 💰 Cost Optimization

### Estimated Monthly Costs (US East 1)
- **EC2 t3.small**: ~$15/month
- **S3 (1GB)**: ~$0.023/month
- **CloudFront**: ~$0.085/GB
- **Route 53**: ~$0.50/month per hosted zone
- **Total**: ~$20-30/month

### Cost Saving Tips
1. Use Spot Instances for development
2. Enable S3 lifecycle policies
3. Use CloudFront caching
4. Monitor and right-size instances

## 🆘 Troubleshooting

### Common Issues
1. **CORS Errors**: Update backend CORS configuration
2. **SSL Issues**: Verify certificate configuration
3. **Database Connection**: Check MongoDB Atlas network access
4. **Permission Errors**: Verify IAM roles and policies

### Useful Commands
```bash
# Check application status
ssh -i your-key.pem ec2-user@your-ip "pm2 status"

# View logs
ssh -i your-key.pem ec2-user@your-ip "pm2 logs admission-backend"

# Check S3 bucket
aws s3 ls s3://your-bucket-name

# Test API
curl http://your-ec2-ip:3000
```

## 🎉 Success!

Your application should now be running at:
- **Frontend**: `https://your-bucket-name.s3-website-us-east-1.amazonaws.com`
- **Backend**: `http://your-ec2-ip:3000`

## 📚 Next Steps

1. **Set up monitoring** with CloudWatch
2. **Configure backups** for your database
3. **Set up CI/CD** with GitHub Actions
4. **Implement security** best practices
5. **Scale** based on usage patterns

---

**Need help?** Check the full `aws-deployment-guide.md` for detailed instructions! 