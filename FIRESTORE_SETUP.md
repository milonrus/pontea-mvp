# Firestore Setup Instructions

## The Issue
You're seeing the error "Missing or insufficient permissions" because Firestore security rules haven't been deployed yet.

## Solution: Deploy Firestore Security Rules

### Option 1: Using Firebase Console (Easiest)

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **pontea-lab-2**
3. Click on **Firestore Database** in the left sidebar
4. Click on the **Rules** tab at the top
5. Replace the existing rules with the content from `firestore.rules`:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Questions collection
    match /questions/{questionId} {
      // Allow anyone to read questions (for the assessment)
      allow read: if true;

      // Only authenticated users can write (create, update, delete) questions
      allow write: if request.auth != null;
    }

    // Default deny all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

6. Click **Publish** to deploy the rules

### Option 2: Using Firebase CLI

1. Install Firebase CLI (if not already installed):
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project (if not already done):
```bash
firebase init firestore
```
- Select your existing project: **pontea-lab-2**
- Use the default `firestore.rules` file

4. Deploy the rules:
```bash
firebase deploy --only firestore:rules
```

## What These Rules Do

- **Read Access**: Anyone can read questions (needed for the assessment to work)
- **Write Access**: Only authenticated users can create, update, or delete questions (protects your data)

## Testing

After deploying the rules:

1. Make sure you're signed in with Firebase Authentication
2. Navigate to `/admin` in your app
3. Try adding a new question
4. The error should be resolved!

## Important Notes

- You must be authenticated (signed in) to add questions
- The admin page at `/admin` checks for authentication automatically
- If you're not signed in, you'll see an "Access Denied" message
