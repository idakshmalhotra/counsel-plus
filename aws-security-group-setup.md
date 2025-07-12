# AWS Security Group Configuration for Mobile Access

## Required Security Group Rules

### For Frontend (Port 80/443):
```
Type: HTTP
Protocol: TCP
Port: 80
Source: 0.0.0.0/0 (Anywhere)

Type: HTTPS  
Protocol: TCP
Port: 443
Source: 0.0.0.0/0 (Anywhere)
```

### For Backend (Port 3000):
```
Type: Custom TCP
Protocol: TCP
Port: 3000
Source: 0.0.0.0/0 (Anywhere)
```

## Steps to Configure:

1. Go to AWS Console → EC2 → Security Groups
2. Select your instance's security group
3. Click "Edit inbound rules"
4. Add the rules above
5. Save changes

## Test Commands:
```bash
# Test from your phone's browser
http://YOUR_EC2_PUBLIC_IP

# Test backend API
http://YOUR_EC2_PUBLIC_IP:3000
``` 