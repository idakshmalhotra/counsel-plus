# Mobile Access Testing Guide

## Quick Tests

### 1. Test Backend Health
```bash
# From your phone browser, try:
http://13.62.48.182:3000/health
http://13.62.48.182:3000/
```

### 2. Test Frontend
```bash
# If frontend is on same server:
http://13.62.48.182
http://13.62.48.182:80

# If frontend is on S3:
http://counsel-app-plus.s3-website.eu-north-1.amazonaws.com
```

## Common Mobile Issues

### Issue 1: "This site can't be reached"
**Solution**: Check AWS Security Groups
- Ensure port 80 and 3000 are open
- Allow traffic from 0.0.0.0/0

### Issue 2: "Connection timeout"
**Solution**: Check if server is running
```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@13.62.48.182

# Check if Node.js is running
ps aux | grep node
pm2 status

# Check if nginx is running
sudo systemctl status nginx
```

### Issue 3: "CORS error on mobile"
**Solution**: Updated CORS configuration (already done)

### Issue 4: "SSL/HTTPS issues"
**Solution**: Use HTTP for testing
- Try `http://` instead of `https://`
- Mobile browsers are stricter with HTTPS

## Mobile-Specific Troubleshooting

### 1. Clear Mobile Browser Cache
- Safari: Settings → Safari → Clear History and Website Data
- Chrome: Settings → Privacy → Clear browsing data

### 2. Try Different Mobile Browsers
- Safari (iOS)
- Chrome (Android/iOS)
- Firefox (Android/iOS)

### 3. Test on Mobile Data vs WiFi
- Some networks block certain ports
- Try switching between WiFi and mobile data

### 4. Check Mobile Network Restrictions
- Some corporate/school networks block external IPs
- Try on different networks

## Debug Commands

### On EC2 Instance:
```bash
# Check if ports are listening
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :80

# Check firewall status
sudo ufw status

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Check application logs
pm2 logs
```

### Test from EC2 instance:
```bash
# Test backend locally
curl http://localhost:3000/health

# Test from external IP
curl http://13.62.48.182:3000/health
``` 