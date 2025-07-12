#!/bin/bash

# AWS Deployment Script for Admission Management System
# Make sure to configure AWS CLI and set your variables below

set -e

# Configuration Variables - UPDATE THESE
BUCKET_NAME="your-admission-app-frontend"
DISTRIBUTION_ID="your-cloudfront-distribution-id"
EC2_INSTANCE_IP="your-ec2-ip"
EC2_KEY_PATH="path/to/your-key.pem"
EC2_USER="ec2-user"
APP_NAME="admission-backend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if AWS CLI is configured
check_aws_cli() {
    print_status "Checking AWS CLI configuration..."
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS CLI is not configured. Please run 'aws configure' first."
        exit 1
    fi
    print_success "AWS CLI is configured"
}

# Build frontend
build_frontend() {
    print_status "Building frontend application..."
    cd "frontend/admission management"
    
    if ! npm run build; then
        print_error "Frontend build failed"
        exit 1
    fi
    
    print_success "Frontend built successfully"
    cd ../..
}

# Deploy frontend to S3
deploy_frontend_to_s3() {
    print_status "Deploying frontend to S3..."
    
    if ! aws s3 sync "frontend/admission management/dist/" "s3://$BUCKET_NAME" --delete; then
        print_error "Failed to upload to S3"
        exit 1
    fi
    
    print_success "Frontend deployed to S3"
}

# Invalidate CloudFront cache
invalidate_cloudfront() {
    print_status "Invalidating CloudFront cache..."
    
    if ! aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"; then
        print_warning "Failed to invalidate CloudFront cache"
    else
        print_success "CloudFront cache invalidated"
    fi
}

# Deploy backend to EC2
deploy_backend_to_ec2() {
    print_status "Deploying backend to EC2..."
    
    # Create deployment script for EC2
    cat > deploy-ec2.sh << 'EOF'
#!/bin/bash
set -e

echo "Updating application..."
cd /home/ec2-user/admission-app

# Pull latest changes
git pull origin main

# Install dependencies
cd backend
npm install

# Restart application
pm2 restart admission-backend || pm2 start src/server.js --name admission-backend

echo "Backend deployment completed"
EOF

    # Copy deployment script to EC2
    scp -i "$EC2_KEY_PATH" deploy-ec2.sh "$EC2_USER@$EC2_INSTANCE_IP:/home/ec2-user/"
    
    # Execute deployment script on EC2
    ssh -i "$EC2_KEY_PATH" "$EC2_USER@$EC2_INSTANCE_IP" "chmod +x /home/ec2-user/deploy-ec2.sh && /home/ec2-user/deploy-ec2.sh"
    
    # Clean up local deployment script
    rm deploy-ec2.sh
    
    print_success "Backend deployed to EC2"
}

# Check application health
check_health() {
    print_status "Checking application health..."
    
    # Check frontend (CloudFront)
    if curl -f -s "https://$BUCKET_NAME.s3-website-$(aws configure get region).amazonaws.com" > /dev/null; then
        print_success "Frontend is accessible"
    else
        print_warning "Frontend health check failed"
    fi
    
    # Check backend
    if ssh -i "$EC2_KEY_PATH" "$EC2_USER@$EC2_INSTANCE_IP" "curl -f -s http://localhost:3000" > /dev/null; then
        print_success "Backend is accessible"
    else
        print_warning "Backend health check failed"
    fi
}

# Main deployment function
main() {
    echo "🚀 Starting AWS deployment..."
    echo "=================================="
    
    # Check prerequisites
    check_aws_cli
    
    # Deploy frontend
    build_frontend
    deploy_frontend_to_s3
    invalidate_cloudfront
    
    # Deploy backend
    deploy_backend_to_ec2
    
    # Health check
    check_health
    
    echo "=================================="
    print_success "Deployment completed successfully!"
    echo ""
    echo "Frontend URL: https://$BUCKET_NAME.s3-website-$(aws configure get region).amazonaws.com"
    echo "Backend URL: http://$EC2_INSTANCE_IP:3000"
    echo ""
    echo "Remember to:"
    echo "- Update DNS records if using custom domain"
    echo "- Monitor application logs"
    echo "- Set up CloudWatch alarms"
}

# Run main function
main "$@" 